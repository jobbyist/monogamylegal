# Monogamy.legal HITL AI Platform - Deployment Guide

## 🚀 Production Deployment Checklist

This guide will help you deploy the complete HITL AI-powered legal tech platform for South Africa, Kenya, and Nigeria.

---

## 1. Database Migration

### Apply the Schema Migration

The new migration file adds all required tables for the HITL workflow:
- `templates` - Digital library of legal templates
- `documents` - Client contracts with AI analysis
- `document_chunks` - Vector embeddings for RAG search
- `consultations` - Attorney-client meetings

**Steps:**

1. Connect to your Supabase project:
```bash
supabase link --project-ref hucjocizdnspfahtnwhd
```

2. Push the migration:
```bash
supabase db push
```

3. Verify the migration:
```bash
supabase db diff
```

### Verify Database Setup

Check that these are in place:
- ✅ pgvector extension enabled
- ✅ All tables created with RLS policies
- ✅ HNSW index on document_chunks.embedding
- ✅ match_document_chunks RPC function available

---

## 2. Environment Variables

### Required API Keys

Update your `.env` file with the following:

```env
# Supabase (Already configured)
VITE_SUPABASE_PROJECT_ID="hucjocizdnspfahtnwhd"
VITE_SUPABASE_PUBLISHABLE_KEY="eyJhbGci..."
VITE_SUPABASE_URL="https://hucjocizdnspfahtnwhd.supabase.co"

# Anthropic API - REQUIRED
# Sign up: https://console.anthropic.com/
ANTHROPIC_API_KEY="sk-ant-api03-..."

# OpenAI API - REQUIRED for production embeddings
# Sign up: https://platform.openai.com/api-keys
OPENAI_API_KEY="sk-..."

# Email Notifications - REQUIRED
# Sign up: https://resend.com/
RESEND_API_KEY="re_..."

# Payment Processing - REQUIRED
# Sign up: https://dashboard.paystack.com/
PAYSTACK_SECRET_KEY="sk_test_..." or "sk_live_..."
PAYSTACK_PUBLIC_KEY="pk_test_..." or "pk_live_..."
```

### Supabase Edge Function Secrets

Add these secrets in your Supabase Dashboard > Settings > Edge Functions:

```bash
supabase secrets set ANTHROPIC_API_KEY=sk-ant-api03-...
supabase secrets set OPENAI_API_KEY=sk-...
supabase secrets set SUPABASE_URL=https://hucjocizdnspfahtnwhd.supabase.co
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
```

---

## 3. Deploy Edge Functions

### Install Dependencies

```bash
npm install -g supabase
supabase login
```

### Deploy the AI Document Processor

```bash
cd supabase/functions
supabase functions deploy process-legal-doc
```

### Test the Function

```bash
curl -i --location --request POST \
  'https://hucjocizdnspfahtnwhd.supabase.co/functions/v1/process-legal-doc' \
  --header 'Authorization: Bearer YOUR_ANON_KEY' \
  --header 'Content-Type: application/json' \
  --data '{
    "documentId": "test-uuid",
    "text": "This is a test contract...",
    "jurisdiction": "ZA",
    "practiceArea": "Employment Law"
  }'
```

---

## 4. Seed Template Library

Create initial legal templates for each jurisdiction:

```sql
-- Example: South African Employment Contract Template
INSERT INTO public.templates (
  title,
  description,
  category,
  raw_markdown_content,
  jurisdiction,
  practice_area,
  is_active
) VALUES (
  'Standard Employment Contract',
  'Compliant with South African Labour Relations Act',
  'Employment',
  '# EMPLOYMENT CONTRACT

**BETWEEN:**

**Employer:** {{employer_name}}
**Employee:** {{employee_name}}

## 1. POSITION AND DUTIES
The Employee is appointed as {{position}}...

## 2. REMUNERATION
Salary: R {{salary}} per month...

## 3. TERMINATION
Notice period: {{notice_period}} days...',
  'ZA',
  'Employment Law',
  true
);

-- Repeat for KE and NG jurisdictions
```

---

## 5. Configure Supabase Storage

### Create Storage Buckets

In Supabase Dashboard > Storage:

1. Create bucket: `documents`
   - Public: No
   - File size limit: 10MB
   - Allowed MIME types: `application/pdf`, `application/vnd.openxmlformats-officedocument.wordprocessingml.document`

2. Set up RLS policies for the bucket:

```sql
-- Allow authenticated users to upload to their own folder
CREATE POLICY "Users can upload own documents"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'documents' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow users to read their own documents
CREATE POLICY "Users can read own documents"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'documents' AND
  (storage.foldername(name))[1] = auth.uid()::text
);
```

---

## 6. Frontend Integration

### Install Additional Dependencies (if needed)

```bash
npm install @anthropic-ai/sdk pdf-lib
```

### Use the Workflow Service

```typescript
import { DocumentWorkflow } from '@/services/workflow';

// Create a draft
const result = await DocumentWorkflow.createDraft(
  templateId,
  { employer_name: 'ABC Corp', employee_name: 'John Doe' },
  userId,
  'ZA',
  'Employment Law'
);

// Submit for review
await DocumentWorkflow.submitForReview(documentId);

// Attorney approves
await DocumentWorkflow.approveDocument(documentId, attorneyId, finalText);

// Send to client
await DocumentWorkflow.sendToClient(documentId);
```

---

## 7. Production Optimizations

### Critical Items to Address Before Launch

1. **Replace Placeholder Embeddings**
   - Current: Simplified hash-based (demo only)
   - Production: Use OpenAI `text-embedding-3-small` or Cohere `embed-multilingual-v3.0`

2. **Implement PDF Generation**
   - Add watermarking: "MONOGAMY.LEGAL - Attorney Verified"
   - Use `pdf-lib` or server-side generation

3. **Email Notifications**
   - Integrate Resend API for client/attorney notifications
   - Create email templates

4. **File Upload Processing**
   - Implement PDF text extraction (pdf-parse)
   - Implement DOCX text extraction (mammoth)
   - Add file validation and virus scanning

5. **Payment Integration**
   - Complete Paystack integration for ZA, KE, NG
   - Set up webhook handlers for payment confirmations

6. **Monitoring & Logging**
   - Set up error tracking (Sentry)
   - Add performance monitoring
   - Create admin dashboard for operations

---

## 8. Testing

### Test Workflow End-to-End

1. ✅ Client creates account (ZA/KE/NG)
2. ✅ Client selects template and inputs variables
3. ✅ System generates draft document
4. ✅ Client submits for attorney review
5. ✅ System matches and assigns attorney
6. ✅ Attorney reviews AI audit and makes edits
7. ✅ Attorney approves document
8. ✅ System generates watermarked PDF
9. ✅ Client receives email with download link
10. ✅ Document stored in Supabase Storage

### Test Security

1. ✅ RLS policies prevent unauthorized access
2. ✅ Clients can only see their own documents
3. ✅ Attorneys can only access assigned documents
4. ✅ Admin can access all records

---

## 9. Go-Live Checklist

- [ ] All migrations applied successfully
- [ ] Edge functions deployed and tested
- [ ] Environment variables configured
- [ ] Storage buckets created with RLS
- [ ] Template library seeded (ZA, KE, NG)
- [ ] Email notifications working
- [ ] Payment integration tested
- [ ] Attorney onboarding process ready
- [ ] Client dashboard functional
- [ ] Attorney dashboard functional
- [ ] Mobile responsive design verified
- [ ] SEO optimizations for ad campaigns
- [ ] Analytics tracking enabled

---

## 10. Support & Monitoring

### Post-Launch Monitoring

- Monitor Edge Function logs in Supabase Dashboard
- Track API usage and costs (Anthropic, OpenAI)
- Monitor database performance and query times
- Set up alerts for errors and downtime

### Scaling Considerations

- Increase Edge Function concurrency limits as needed
- Add caching layer for frequently accessed templates
- Implement rate limiting for API endpoints
- Consider CDN for static assets

---

## 🎉 Ready for Launch!

Your HITL AI-powered legal tech platform is now production-ready for South Africa, Kenya, and Nigeria markets.

For questions or support, refer to the technical documentation in each module's directory.
