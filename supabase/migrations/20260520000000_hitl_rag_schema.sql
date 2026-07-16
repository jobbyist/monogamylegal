-- MODULE 1: HITL AI Platform Database Migration
-- Enable pgvector extension for RAG capabilities

CREATE EXTENSION IF NOT EXISTS vector WITH SCHEMA extensions;

-- Add new enums for document workflow
CREATE TYPE public.document_status AS ENUM (
  'drafted',
  'pending_review',
  'attorney_approved',
  'sent_to_client'
);

CREATE TYPE public.consultation_status AS ENUM (
  'scheduled',
  'completed',
  'canceled'
);

CREATE TYPE public.country_code AS ENUM ('ZA', 'KE', 'NG');

-- Extend profiles table with country and onboarding metadata
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS country country_code,
ADD COLUMN IF NOT EXISTS role app_role DEFAULT 'client',
ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS onboarding_metadata JSONB DEFAULT '{}';

-- Extend attorney_profiles table
ALTER TABLE public.attorney_profiles
ADD COLUMN IF NOT EXISTS verified BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS paystack_payout_details JSONB DEFAULT '{}';

-- Migrate existing is_verified to verified if needed
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
    AND table_name = 'attorney_profiles'
    AND column_name = 'is_verified'
  ) THEN
    UPDATE public.attorney_profiles SET verified = is_verified WHERE verified IS NULL;
  END IF;
END $$;

-- Templates table for digital library
CREATE TABLE IF NOT EXISTS public.templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  raw_markdown_content TEXT NOT NULL,
  jurisdiction country_code NOT NULL,
  practice_area TEXT,
  created_by UUID REFERENCES auth.users ON DELETE SET NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_templates_jurisdiction ON public.templates(jurisdiction);
CREATE INDEX idx_templates_category ON public.templates(category);

-- Documents table for client contracts
CREATE TABLE IF NOT EXISTS public.documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  attorney_id UUID REFERENCES auth.users ON DELETE SET NULL,
  template_id UUID REFERENCES public.templates ON DELETE SET NULL,
  title TEXT NOT NULL,
  status document_status NOT NULL DEFAULT 'drafted',
  file_path TEXT,
  raw_text TEXT,
  ai_analysis JSONB DEFAULT '{}',
  variables JSONB DEFAULT '{}',
  practice_area TEXT,
  jurisdiction country_code,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_documents_client ON public.documents(client_id);
CREATE INDEX idx_documents_attorney ON public.documents(attorney_id);
CREATE INDEX idx_documents_status ON public.documents(status);

-- Document chunks for RAG (vector embeddings)
CREATE TABLE IF NOT EXISTS public.document_chunks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID NOT NULL REFERENCES public.documents ON DELETE CASCADE,
  content TEXT NOT NULL,
  embedding vector(1536),
  chunk_index INT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.document_chunks ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_document_chunks_document ON public.document_chunks(document_id);

-- HNSW index for similarity search using cosine distance
CREATE INDEX IF NOT EXISTS idx_document_chunks_embedding_hnsw
ON public.document_chunks
USING hnsw (embedding vector_cosine_ops)
WITH (m = 16, ef_construction = 64);

-- Consultations table for attorney-client meetings
CREATE TABLE IF NOT EXISTS public.consultations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  attorney_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  document_id UUID REFERENCES public.documents ON DELETE SET NULL,
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration_minutes INT DEFAULT 30,
  status consultation_status NOT NULL DEFAULT 'scheduled',
  notes TEXT,
  meeting_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_consultations_client ON public.consultations(client_id);
CREATE INDEX idx_consultations_attorney ON public.consultations(attorney_id);
CREATE INDEX idx_consultations_scheduled ON public.consultations(scheduled_at);

-- RPC function for similarity search
CREATE OR REPLACE FUNCTION public.match_document_chunks(
  query_embedding vector(1536),
  match_threshold float DEFAULT 0.7,
  match_count int DEFAULT 10,
  filter_document_id uuid DEFAULT NULL
)
RETURNS TABLE (
  id uuid,
  document_id uuid,
  content text,
  similarity float,
  metadata jsonb
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT
    dc.id,
    dc.document_id,
    dc.content,
    1 - (dc.embedding <=> query_embedding) AS similarity,
    dc.metadata
  FROM public.document_chunks dc
  WHERE
    (filter_document_id IS NULL OR dc.document_id = filter_document_id)
    AND 1 - (dc.embedding <=> query_embedding) > match_threshold
  ORDER BY dc.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- Updated at triggers for new tables
CREATE TRIGGER trg_templates_touch
BEFORE UPDATE ON public.templates
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE TRIGGER trg_documents_touch
BEFORE UPDATE ON public.documents
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE TRIGGER trg_consultations_touch
BEFORE UPDATE ON public.consultations
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- RLS POLICIES

-- Templates: Public read for active templates, admin-only write
CREATE POLICY "templates_public_read"
ON public.templates FOR SELECT
USING (is_active = true);

CREATE POLICY "templates_admin_all"
ON public.templates FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Documents: Clients own their documents, attorneys can access assigned documents
CREATE POLICY "documents_client_select_own"
ON public.documents FOR SELECT
TO authenticated
USING (auth.uid() = client_id);

CREATE POLICY "documents_attorney_select_assigned"
ON public.documents FOR SELECT
TO authenticated
USING (
  auth.uid() = attorney_id
  OR (
    status = 'pending_review'
    AND EXISTS (
      SELECT 1 FROM public.attorney_profiles ap
      WHERE ap.id = auth.uid()
      AND ap.verified = true
      AND (
        practice_area = ANY(ap.practice_areas)
        OR ap.practice_areas = '{}'
      )
    )
  )
);

CREATE POLICY "documents_client_insert"
ON public.documents FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = client_id);

CREATE POLICY "documents_client_update_own"
ON public.documents FOR UPDATE
TO authenticated
USING (auth.uid() = client_id AND status = 'drafted')
WITH CHECK (auth.uid() = client_id);

CREATE POLICY "documents_attorney_update_assigned"
ON public.documents FOR UPDATE
TO authenticated
USING (
  auth.uid() = attorney_id
  AND status IN ('pending_review', 'attorney_approved')
)
WITH CHECK (auth.uid() = attorney_id);

CREATE POLICY "documents_admin_all"
ON public.documents FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Document chunks: Inherit document permissions
CREATE POLICY "document_chunks_client_select"
ON public.document_chunks FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.documents d
    WHERE d.id = document_id
    AND d.client_id = auth.uid()
  )
);

CREATE POLICY "document_chunks_attorney_select"
ON public.document_chunks FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.documents d
    WHERE d.id = document_id
    AND d.attorney_id = auth.uid()
  )
);

CREATE POLICY "document_chunks_admin_all"
ON public.document_chunks FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Consultations: Clients and attorneys can access their own consultations
CREATE POLICY "consultations_client_select"
ON public.consultations FOR SELECT
TO authenticated
USING (auth.uid() = client_id);

CREATE POLICY "consultations_attorney_select"
ON public.consultations FOR SELECT
TO authenticated
USING (auth.uid() = attorney_id);

CREATE POLICY "consultations_client_insert"
ON public.consultations FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = client_id);

CREATE POLICY "consultations_client_update"
ON public.consultations FOR UPDATE
TO authenticated
USING (auth.uid() = client_id)
WITH CHECK (auth.uid() = client_id);

CREATE POLICY "consultations_attorney_update"
ON public.consultations FOR UPDATE
TO authenticated
USING (auth.uid() = attorney_id)
WITH CHECK (auth.uid() = attorney_id);

CREATE POLICY "consultations_admin_all"
ON public.consultations FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Enable realtime for new tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.documents;
ALTER PUBLICATION supabase_realtime ADD TABLE public.consultations;

-- Revoke public execute on new RPC functions
REVOKE EXECUTE ON FUNCTION public.match_document_chunks(vector, float, int, uuid) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.match_document_chunks(vector, float, int, uuid) TO authenticated;

-- Create helpful indexes for queries
CREATE INDEX idx_documents_practice_area ON public.documents(practice_area);
CREATE INDEX idx_attorney_profiles_practice_areas ON public.attorney_profiles USING GIN(practice_areas);
CREATE INDEX idx_attorney_profiles_verified ON public.attorney_profiles(verified) WHERE verified = true;

-- Comment documentation
COMMENT ON TABLE public.templates IS 'Digital library templates for contract generation';
COMMENT ON TABLE public.documents IS 'Client contracts with AI analysis and workflow status';
COMMENT ON TABLE public.document_chunks IS 'Vector embeddings for RAG similarity search';
COMMENT ON TABLE public.consultations IS 'Scheduled attorney-client consultations';
COMMENT ON FUNCTION public.match_document_chunks IS 'Similarity search for document chunks using cosine distance';
