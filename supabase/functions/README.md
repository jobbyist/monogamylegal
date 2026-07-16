# Supabase Edge Functions for Monogamy.legal

## Overview

This directory contains Supabase Edge Functions that power the HITL AI platform's document processing capabilities.

## Functions

### `process-legal-doc`

AI-powered document parser and RAG pipeline for legal contract analysis.

**Features:**
- Claude 3.5 Sonnet integration for contract auditing
- Automatic detection of loopholes and missing clauses
- Jurisdictional compliance checking (ZA, KE, NG)
- Vector embedding generation for RAG
- 5-bullet summary with risk ratings

**Endpoint:** `POST /functions/v1/process-legal-doc`

**Request Body:**
```json
{
  "documentId": "uuid",
  "fileContent": "base64_encoded_content (optional)",
  "text": "raw text content (optional)",
  "jurisdiction": "ZA|KE|NG",
  "practiceArea": "string (optional)"
}
```

**Response:**
```json
{
  "success": true,
  "documentId": "uuid",
  "analysis": {
    "summary": ["5 bullet points"],
    "risk_rating": "low|medium|high|critical",
    "loopholes": [],
    "missing_clauses": [],
    "jurisdictional_issues": [],
    "recommendations": [],
    "compliance_score": 85
  },
  "chunks_created": 15,
  "message": "Document processed successfully"
}
```

## Deployment

### Prerequisites

1. Install Supabase CLI:
```bash
npm install -g supabase
```

2. Login to Supabase:
```bash
supabase login
```

3. Link your project:
```bash
supabase link --project-ref hucjocizdnspfahtnwhd
```

### Deploy Functions

```bash
# Deploy all functions
supabase functions deploy

# Deploy specific function
supabase functions deploy process-legal-doc
```

### Set Environment Variables

In your Supabase Dashboard > Edge Functions > Secrets, add:

- `ANTHROPIC_API_KEY` - Your Anthropic API key
- `OPENAI_API_KEY` - Your OpenAI API key (for embeddings)
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Your service role key

## Testing Locally

```bash
# Serve functions locally
supabase functions serve process-legal-doc --env-file .env

# Test with curl
curl -i --location --request POST 'http://localhost:54321/functions/v1/process-legal-doc' \
  --header 'Authorization: Bearer YOUR_ANON_KEY' \
  --header 'Content-Type: application/json' \
  --data '{"documentId":"uuid","text":"contract text","jurisdiction":"ZA"}'
```

## Production Considerations

1. **Embeddings**: Replace the placeholder embedding function with a real service (OpenAI, Cohere, Voyage AI)

2. **File Processing**: Implement proper PDF/DOCX extraction using libraries or Claude's native capabilities

3. **Rate Limiting**: Add request throttling and retry logic

4. **Monitoring**: Set up logging and error tracking

5. **Security**: Validate file types, sizes, and scan for malicious content

## Support

For issues or questions, contact the development team.
