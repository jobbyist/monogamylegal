-- Extensions
create extension if not exists vector with schema extensions;

-- Core Tables
create table if not exists public.profiles (
    id uuid references auth.users(id) on delete cascade primary key,
    role text check (role in ('client', 'attorney', 'admin')) default 'client',
    country text check (country in ('ZA', 'KE', 'NG')) default 'ZA',
    subscription_status text default 'inactive',
    plan_tier text check (plan_tier in ('essential', 'professional', 'enterprise')) default null,
    stitch_token text, -- For recurring billing card tokenization
    remaining_consults_count int default 0,
    remaining_custom_drafts_count int default 0,
    onboarding_completed boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.attorney_profiles (
    id uuid references public.profiles(id) on delete cascade primary key,
    bar_number text not null,
    verified boolean default false,
    ai_chatbot_enabled boolean default false,
    practice_areas text[] not null,
    payout_details jsonb, -- Stitch account details
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.templates (
    id uuid default gen_random_uuid() primary key,
    title text not null,
    description text not null,
    category text not null,
    raw_markdown_content text not null,
    jurisdiction text check (jurisdiction in ('ZA', 'KE', 'NG', 'GLOBAL')) not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.documents (
    id uuid default gen_random_uuid() primary key,
    client_id uuid references public.profiles(id) on delete cascade,
    attorney_id uuid references public.attorney_profiles(id) on delete set null,
    title text not null,
    status text check (status in ('drafted', 'pending_review', 'attorney_approved', 'sent_to_client')) default 'drafted',
    file_path text, -- Supabase Storage reference
    raw_text text,
    ai_analysis jsonb, -- Audit results: loopholes, missing clauses, risk rating
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.document_chunks (
    id uuid default gen_random_uuid() primary key,
    document_id uuid references public.documents(id) on delete cascade,
    content text not null,
    embedding vector(1024), -- Optimized for voyage-law-2 dimension
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.consultations (
    id uuid default gen_random_uuid() primary key,
    client_id uuid references public.profiles(id) on delete cascade,
    attorney_id uuid references public.attorney_profiles(id) on delete cascade,
    scheduled_at timestamp with time zone not null,
    status text check (status in ('scheduled', 'completed', 'cancelled')) default 'scheduled',
    meeting_link text,
    notes text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists public.concierge_audit_logs (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references public.profiles(id) on delete set null,
    tokens_used int,
    tool_invocations text[],
    query text,
    response text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Search Index and RPC Similarity Matching
create index if not exists document_chunks_embedding_idx 
on public.document_chunks using hnsw (embedding vector_cosine_ops);

create or replace function match_document_chunks (
  query_embedding vector(1024),
  match_threshold float,
  match_count int,
  filter_document_id uuid default null
)
returns table (
  id uuid,
  document_id uuid,
  content text,
  similarity float
)
language plpgsql stable as $$ begin   return query   select     document_chunks.id,     document_chunks.document_id,     document_chunks.content,     1 - (document_chunks.embedding <=> query_embedding) as similarity   from document_chunks   where 1 - (document_chunks.embedding <=> query_embedding) > match_threshold     and (filter_document_id is null or document_chunks.document_id = filter_document_id)   order by document_chunks.embedding <=> query_embedding asc   limit match_count; end; $$;

-- RLS Configuration
alter table public.profiles enable row level security;
alter table public.attorney_profiles enable row level security;
alter table public.templates enable row level security;
alter table public.documents enable row level security;
alter table public.document_chunks enable row level security;
alter table public.consultations enable row level security;
alter table public.concierge_audit_logs enable row level security;

-- Policies (Clients access their own data, Attorneys access assigned work, Public can read templates)
create policy "Read public templates" on public.templates for select using (true);
create policy "Clients/Attorneys manage own profile" on public.profiles for all using (auth.uid() = id);
create policy "Clients manage own docs" on public.documents for all using (auth.uid() = client_id);
create policy "Attorneys read assigned docs" on public.documents for select using (auth.uid() = attorney_id);

-- Additional RLS for attorney_profiles
create policy "Attorneys manage own profile" on public.attorney_profiles for all using (auth.uid() = id);
create policy "Admins manage attorney profiles" on public.attorney_profiles for all using (exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'));
create policy "Public read verified attorneys" on public.attorney_profiles for select using (verified = true);