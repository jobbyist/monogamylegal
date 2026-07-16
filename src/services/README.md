# Document Workflow Service

## Overview

The `workflow.ts` service implements the complete Human-in-the-Loop (HITL) state machine for document lifecycle management in the Monogamy.legal platform.

## State Machine

```
drafted → pending_review → attorney_approved → sent_to_client
```

### State Descriptions

1. **drafted** - User inputs variables, AI generates contract from template
2. **pending_review** - Document locked, routed to verified attorney
3. **attorney_approved** - Attorney reviews, edits, and seals document
4. **sent_to_client** - Watermarked PDF generated and sent to client

---

## API Reference

### `DocumentWorkflow.createDraft()`

Create a new document draft from a template.

**Parameters:**
- `templateId: string` - UUID of the template to use
- `variables: Record<string, any>` - Template variables (e.g., `{party_name: "John Doe"}`)
- `clientId: string` - UUID of the client creating the document
- `jurisdiction: CountryCode` - 'ZA' | 'KE' | 'NG'
- `practiceArea: string` - e.g., "Employment Law", "Contract Law"

**Returns:** `Promise<WorkflowResult>`

**Example:**
```typescript
import { DocumentWorkflow } from '@/services/workflow';

const result = await DocumentWorkflow.createDraft(
  '123e4567-e89b-12d3-a456-426614174000',
  {
    employer_name: 'Tech Corp Ltd',
    employee_name: 'Jane Smith',
    position: 'Software Engineer',
    salary: '50000',
    notice_period: '30'
  },
  currentUserId,
  'ZA',
  'Employment Law'
);

if (result.success) {
  console.log('Document created:', result.data.documentId);
}
```

---

### `DocumentWorkflow.submitForReview()`

Submit a drafted document for attorney review.

**Parameters:**
- `documentId: string` - UUID of the document to submit

**Returns:** `Promise<WorkflowResult>`

**Example:**
```typescript
const result = await DocumentWorkflow.submitForReview(documentId);

if (result.success) {
  console.log('Assigned to attorney:', result.data.attorneyId);
  // Show confirmation: "Your document has been sent to a verified attorney"
}
```

**What Happens:**
1. Document status changes from `drafted` to `pending_review`
2. System matches document to qualified attorney based on:
   - Practice area match
   - Jurisdiction match
   - Attorney availability and verification status
3. Attorney is notified via email/SMS
4. Document is locked (client cannot edit)

---

### `DocumentWorkflow.approveDocument()`

Attorney reviews and approves the document.

**Parameters:**
- `documentId: string` - UUID of the document to approve
- `attorneyId: string` - UUID of the approving attorney
- `finalText: string` - Final edited contract text
- `reviewNotes?: string` - Optional notes from attorney

**Returns:** `Promise<WorkflowResult>`

**Example:**
```typescript
const result = await DocumentWorkflow.approveDocument(
  documentId,
  attorneyId,
  editedContractText,
  'Reviewed for BCEA compliance. Added termination clause as required.'
);

if (result.success) {
  // Show attorney: "Document approved. Client will be notified."
}
```

**What Happens:**
1. Document status changes from `pending_review` to `attorney_approved`
2. Final text and attorney notes are saved
3. Document is sealed (no further edits allowed)
4. Ready for final delivery to client

---

### `DocumentWorkflow.sendToClient()`

Generate final PDF and deliver to client.

**Parameters:**
- `documentId: string` - UUID of the document to send

**Returns:** `Promise<WorkflowResult>`

**Example:**
```typescript
const result = await DocumentWorkflow.sendToClient(documentId);

if (result.success) {
  console.log('Download URL:', result.data.downloadUrl);
  // Send email with download link
}
```

**What Happens:**
1. System generates watermarked PDF
2. PDF is uploaded to Supabase Storage
3. Document status changes to `sent_to_client`
4. Client receives email notification with secure download link
5. Attorney receives copy for records

---

## Integration Examples

### Complete Flow in a React Component

```typescript
import { useState } from 'react';
import { DocumentWorkflow } from '@/services/workflow';
import { useAuth } from '@/hooks/useAuth';

export function DocumentCreator() {
  const { user } = useAuth();
  const [documentId, setDocumentId] = useState<string | null>(null);
  
  const handleCreateDraft = async (templateId: string, variables: any) => {
    const result = await DocumentWorkflow.createDraft(
      templateId,
      variables,
      user.id,
      'ZA',
      'Employment Law'
    );
    
    if (result.success) {
      setDocumentId(result.data.documentId);
      toast.success('Draft created successfully!');
    } else {
      toast.error(result.message);
    }
  };
  
  const handleSubmitForReview = async () => {
    const result = await DocumentWorkflow.submitForReview(documentId);
    
    if (result.success) {
      toast.success('Sent to attorney for review');
      // Redirect to dashboard
    }
  };
  
  // ... rest of component
}
```

---

## Error Handling

All methods return a `WorkflowResult` object:

```typescript
interface WorkflowResult {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}
```

**Example:**
```typescript
const result = await DocumentWorkflow.createDraft(...);

if (!result.success) {
  console.error('Error:', result.message, result.error);
  // Show user-friendly error message
  showErrorToast(result.message);
}
```

---

## Security Notes

1. **Authentication Required**: All methods require authenticated Supabase session
2. **Authorization**: RLS policies enforce:
   - Clients can only access their own documents
   - Attorneys can only approve assigned documents
   - Admin has full access
3. **State Validation**: Methods check current document state before transitions
4. **Audit Trail**: All state changes are timestamped in the database

---

## Database Queries

### Get Documents by Status

```typescript
const { data: drafts } = await supabase
  .from('documents')
  .select('*')
  .eq('client_id', userId)
  .eq('status', 'drafted')
  .order('created_at', { ascending: false });
```

### Get Attorney Pending Reviews

```typescript
const { data: pending } = await supabase
  .from('documents')
  .select('*, profiles!documents_client_id_fkey(full_name)')
  .eq('attorney_id', attorneyId)
  .eq('status', 'pending_review')
  .order('created_at', { ascending: true });
```

### Get AI Analysis

```typescript
const { data: document } = await supabase
  .from('documents')
  .select('ai_analysis')
  .eq('id', documentId)
  .single();

const analysis = document.ai_analysis;
console.log('Risk Rating:', analysis.risk_rating);
console.log('Summary:', analysis.summary);
```

---

## Testing

See `workflow.test.ts` for unit tests and integration tests.

Run tests:
```bash
npm test src/services/workflow.test.ts
```

---

## Support

For questions or issues with the workflow service, contact the development team or refer to the main documentation.
