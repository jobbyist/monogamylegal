# Monogamy.legal HITL AI Platform - Technical Specification

## Executive Summary

This document outlines the complete technical implementation of the Monogamy.legal Human-in-the-Loop (HITL) AI-powered legal tech platform for South Africa, Kenya, and Nigeria markets.

---

## System Architecture

### Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Vite
- **Backend**: Supabase (PostgreSQL, Edge Functions, Auth, Storage)
- **AI**: Claude 3.5 Sonnet (Anthropic API)
- **Vector Search**: pgvector with HNSW indexing
- **Payments**: Paystack (ZA, KE, NG)
- **Email**: Resend API

### Architecture Diagram

```
┌─────────────────┐
│   React App     │
│   (Frontend)    │
└────────┬────────┘
         │
         ├──────────────────┐
         │                  │
         ▼                  ▼
┌─────────────────┐  ┌──────────────────┐
│   Supabase      │  │  Anthropic API   │
│   PostgreSQL    │  │  (Claude 3.5)    │
│   + pgvector    │  │                  │
└─────────────────┘  └──────────────────┘
         │
         ├─────────────┬──────────────┬───────────────┐
         ▼             ▼              ▼               ▼
  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
  │   Auth   │  │  Storage │  │   Edge   │  │ Realtime │
  │          │  │          │  │ Functions│  │          │
  └──────────┘  └──────────┘  └──────────┘  └──────────┘
```

---

## Database Schema

### Core Tables

#### `profiles`
Extended user profile information
- Links to `auth.users`
- Stores: country (ZA/KE/NG), role, onboarding status

#### `attorney_profiles`
Attorney-specific information
- Links to `auth.users`
- Stores: bar_number, verified status, practice_areas, jurisdictions
- Payment details (Paystack) stored in `paystack_payout_details` JSONB

#### `templates`
Digital library of legal document templates
- Markdown-based templates with variable placeholders
- Jurisdictionally-specific (ZA, KE, NG)
- Practice area categorization

#### `documents`
Client contracts with full lifecycle tracking
- **States**: drafted → pending_review → attorney_approved → sent_to_client
- Stores: raw_text, ai_analysis (JSONB), variables, file_path
- Foreign keys: client_id, attorney_id, template_id

#### `document_chunks`
Vector embeddings for RAG search
- Stores text chunks with 1536-dimensional embeddings
- HNSW index for fast similarity search
- Linked to parent document

#### `consultations`
Attorney-client meeting scheduling
- Status tracking: scheduled, completed, canceled
- Optional document reference
- Meeting URL and notes storage

### Security: Row Level Security (RLS)

All tables have strict RLS policies:
- **Clients**: Can only access their own documents and consultations
- **Attorneys**: Can access assigned documents and their consultations
- **Admin**: Full access to all records
- **Templates**: Public read for active templates

---

## Document Workflow State Machine

### State Transitions

```
1. DRAFTED
   ↓ (client submits)
2. PENDING_REVIEW
   ↓ (attorney approves)
3. ATTORNEY_APPROVED
   ↓ (system generates PDF)
4. SENT_TO_CLIENT
```

### State Descriptions

**1. DRAFTED**
- User selects template
- Inputs variables (party names, dates, amounts, etc.)
- AI generates contract from template
- Client can edit and refine
- Action: Client clicks "Submit for Review"

**2. PENDING_REVIEW**
- Document is locked (no client edits)
- System matches to qualified attorney based on:
  - Practice area match
  - Jurisdiction match
  - Verification status
  - Availability
- Attorney receives notification
- Attorney reviews AI audit report
- Attorney can make edits
- Action: Attorney clicks "Approve & Seal"

**3. ATTORNEY_APPROVED**
- Document is sealed (no further edits)
- Final text includes attorney's edits
- Attorney notes stored in ai_analysis
- Ready for final delivery
- Action: System automatically processes

**4. SENT_TO_CLIENT**
- Watermarked PDF generated
- Uploaded to Supabase Storage
- Client receives email with download link
- Attorney receives copy for records
- Action: Client downloads final document

---

## AI Document Processing Pipeline

### Edge Function: `process-legal-doc`

**Purpose**: AI-powered contract auditing and RAG preparation

**Process Flow**:

1. **Input**: Document ID, text/file content, jurisdiction, practice area
2. **AI Analysis** (Claude 3.5 Sonnet):
   - Detect common loopholes
   - Identify missing critical clauses
   - Check jurisdictional compliance (ZA/KE/NG specific)
   - Generate 5-bullet summary
   - Assign risk rating (low/medium/high/critical)
   - Provide recommendations
3. **Chunking**: Split document into ~1000 char chunks with 200 char overlap
4. **Embeddings**: Generate 1536-dimensional vectors (OpenAI/Cohere)
5. **Storage**: Save chunks and embeddings to `document_chunks`
6. **Output**: Analysis stored in `documents.ai_analysis`

**Example AI Analysis Output**:
```json
{
  "summary": [
    "Missing termination clause details",
    "Unclear dispute resolution process",
    "Non-compliance with BCEA notice period",
    "Ambiguous intellectual property rights",
    "Incomplete confidentiality provisions"
  ],
  "risk_rating": "high",
  "loopholes": ["Vague termination terms allow exploitation"],
  "missing_clauses": ["BCEA-compliant notice period", "Dispute resolution"],
  "jurisdictional_issues": ["SA Labour Relations Act requirements not met"],
  "recommendations": ["Add CCMA arbitration clause", "Specify 30-day notice"],
  "compliance_score": 62
}
```

---

## Vector Search (RAG)

### pgvector Configuration

- **Extension**: pgvector 0.5.0+
- **Dimensions**: 1536 (compatible with OpenAI text-embedding-3-small)
- **Index**: HNSW with cosine distance
- **Parameters**: m=16, ef_construction=64

### RPC Function: `match_document_chunks`

**Parameters**:
- `query_embedding`: vector(1536) - The search query embedding
- `match_threshold`: float (default 0.7) - Minimum similarity score
- `match_count`: int (default 10) - Max results to return
- `filter_document_id`: uuid (optional) - Limit to specific document

**Returns**: Array of matching chunks with similarity scores

**Use Cases**:
- "Find similar clauses in past contracts"
- "Search for precedents in this jurisdiction"
- "Locate relevant case law references"

---

## API Integrations

### Anthropic Claude 3.5 Sonnet
- **Purpose**: Contract analysis and auditing
- **Model**: claude-3-5-sonnet-20241022
- **Max tokens**: 4096 for analysis output
- **Cost**: ~$3 per 1M input tokens, ~$15 per 1M output tokens

### OpenAI Embeddings (Production)
- **Purpose**: Generate vector embeddings for RAG
- **Model**: text-embedding-3-small
- **Dimensions**: 1536
- **Cost**: ~$0.02 per 1M tokens

### Paystack Payments
- **Purpose**: Payment processing for ZA, KE, NG
- **Features**: Card payments, mobile money, bank transfers
- **Webhooks**: Payment confirmations, subscription renewals

### Resend Email
- **Purpose**: Transactional emails
- **Use Cases**: 
  - Attorney assignment notifications
  - Document completion alerts
  - Download link delivery

---

## Security Considerations

### Authentication
- Supabase Auth with JWT tokens
- Row Level Security (RLS) on all tables
- Service role key only in Edge Functions (server-side)

### Data Protection
- **PII**: Client names, contact info stored encrypted at rest
- **Documents**: Stored in private Supabase Storage buckets
- **API Keys**: Stored in Supabase Secrets (never in code)

### Compliance
- **POPIA** (South Africa): Data protection compliance
- **DPA** (Kenya): Data Protection Act compliance
- **NDPR** (Nigeria): Nigeria Data Protection Regulation

### Vulnerabilities Addressed
- **CWE-89**: SQL injection prevented by Supabase parameterized queries
- **CWE-79**: XSS prevented by React's automatic escaping
- **CWE-200**: Information exposure prevented by RLS policies
- **CWE-285**: Improper authorization prevented by role-based access control

---

## Performance Optimization

### Database Indexes
- **documents**: client_id, attorney_id, status, practice_area
- **document_chunks**: document_id, embedding (HNSW)
- **consultations**: client_id, attorney_id, scheduled_at
- **attorney_profiles**: verified (partial index), practice_areas (GIN)

### Caching Strategy
- Template library cached on frontend
- Attorney profiles cached for matching
- Document chunks loaded on-demand

### Edge Function Optimization
- Use streaming for large documents
- Batch embedding generation
- Timeout: 60 seconds max

---

## Monitoring & Observability

### Metrics to Track
- **Documents**: Creation rate, completion rate, average time in each state
- **Attorneys**: Match success rate, approval time, workload distribution
- **AI**: Analysis accuracy, token usage, cost per document
- **Errors**: Edge function failures, API timeouts, database errors

### Recommended Tools
- **Error Tracking**: Sentry
- **Analytics**: PostHog or Mixpanel
- **Uptime**: Supabase built-in monitoring
- **Costs**: Anthropic/OpenAI usage dashboards

---

## Scaling Considerations

### Current Capacity
- Supabase Free Tier: 500MB database, 2GB bandwidth/month
- Pro Tier ($25/mo): 8GB database, 50GB bandwidth

### Growth Strategy
1. **100 users**: Free tier sufficient
2. **1,000 users**: Upgrade to Pro, add CDN
3. **10,000 users**: Enterprise tier, dedicated resources
4. **100,000+ users**: Consider multi-region deployment

### Bottlenecks to Watch
- Edge function concurrency (50 concurrent on Pro)
- Database connections (max 500 on Pro)
- Anthropic API rate limits (10 req/min for tier 1)
- Storage bandwidth for PDF downloads

---

## Development Workflow

### Local Development
```bash
# Start Supabase locally
supabase start

# Run frontend dev server
npm run dev

# Test Edge Functions locally
supabase functions serve
```

### Testing Strategy
- **Unit Tests**: Workflow state transitions
- **Integration Tests**: Database operations, RLS policies
- **E2E Tests**: Complete document lifecycle
- **Load Tests**: Edge function performance under load

### Deployment Pipeline
1. Commit to main branch
2. GitHub Actions runs tests
3. Supabase migrations auto-applied
4. Edge Functions deployed
5. Frontend built and deployed (Vercel/Netlify)

---

## Cost Estimates (Monthly)

### For 1,000 Active Users

- **Supabase Pro**: $25
- **Anthropic Claude** (avg 50 docs/day): ~$150
- **OpenAI Embeddings** (avg 50 docs/day): ~$5
- **Resend Email** (10,000 emails): $20
- **Paystack** (transaction fees): Variable
- **Total**: ~$200-250/month + payment processing fees

### Revenue Model
- Client pays per document review: $50-200 (depending on complexity)
- Platform takes 30% commission
- Attorney receives 70% payout via Paystack

---

## Future Enhancements

### Phase 2 (Q2 2025)
- [ ] Mobile apps (React Native)
- [ ] Multi-language support (English, Afrikaans, Swahili)
- [ ] Video consultation integration (Zoom/Google Meet)
- [ ] E-signature integration (DocuSign/HelloSign)

### Phase 3 (Q3 2025)
- [ ] Expand to Ghana, Uganda, Tanzania
- [ ] AI-powered contract negotiation assistant
- [ ] Court filing automation
- [ ] Attorney performance analytics dashboard

---

## Support & Maintenance

### Regular Tasks
- **Daily**: Monitor error logs, check API quotas
- **Weekly**: Review pending documents, attorney response times
- **Monthly**: Analyze costs, optimize queries, update templates
- **Quarterly**: Security audit, dependency updates, feature releases

### Incident Response
1. **Critical** (app down): Fix within 1 hour
2. **High** (feature broken): Fix within 4 hours
3. **Medium** (degraded performance): Fix within 24 hours
4. **Low** (minor bugs): Fix in next sprint

---

## Conclusion

This implementation provides a complete, production-ready HITL AI platform for legal document automation. All modules are designed for scalability, security, and maintainability.

**Ready for Launch**: South Africa, Kenya, Nigeria markets
**Timeline**: Production deployment possible within 24 hours of API key configuration

For questions or clarifications, refer to the code documentation in each module.
