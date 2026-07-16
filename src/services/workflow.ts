// MODULE 3: HITL Workflow Automation
// State machine and business logic for document lifecycle

import { supabase } from '@/integrations/supabase/client';

export type DocumentStatus = 'drafted' | 'pending_review' | 'attorney_approved' | 'sent_to_client';
export type CountryCode = 'ZA' | 'KE' | 'NG';

export interface Document {
  id: string;
  client_id: string;
  attorney_id: string | null;
  template_id: string | null;
  title: string;
  status: DocumentStatus;
  file_path: string | null;
  raw_text: string | null;
  ai_analysis: any;
  variables: Record<string, any>;
  practice_area: string | null;
  jurisdiction: CountryCode | null;
  created_at: string;
  updated_at: string;
}

export interface AttorneyProfile {
  id: string;
  practice_areas: string[];
  jurisdictions: string[];
  verified: boolean;
  accepting_clients: boolean;
  hourly_rate: number | null;
}

export interface WorkflowResult {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}

/**
 * State machine for document workflow
 * Transitions: drafted → pending_review → attorney_approved → sent_to_client
 */
export class DocumentWorkflow {
  /**
   * STATE: DRAFTED
   * User inputs variables and AI drafts a contract based on template
   */
  static async createDraft(
    templateId: string,
    variables: Record<string, any>,
    clientId: string,
    jurisdiction: CountryCode,
    practiceArea: string
  ): Promise<WorkflowResult> {
    try {
      // Input validation
      if (!templateId || !clientId || !jurisdiction) {
        return {
          success: false,
          message: 'Missing required parameters',
          error: 'templateId, clientId, and jurisdiction are required',
        };
      }

      // Fetch template
      const { data: template, error: templateError } = await supabase
        .from('templates')
        .select('*')
        .eq('id', templateId)
        .eq('jurisdiction', jurisdiction)
        .single();

      if (templateError || !template) {
        console.error('Template fetch error:', templateError);
        return {
          success: false,
          message: 'Template not found or unavailable',
          error: templateError?.message,
        };
      } catch (fetchError: any) {
        console.error('Supabase query error:', fetchError);
        return { success: false, message: 'Database connection error', error: fetchError.message };
      }

      // Process template with variables
      let draftedText = template.raw_markdown_content;
      
      // Simple variable substitution
      Object.entries(variables).forEach(([key, value]) => {
        const placeholder = `{{${key}}}`;
        draftedText = draftedText.replace(new RegExp(placeholder, 'g'), String(value));
      });

      // Create document record
      const { data: document, error: insertError } = await supabase
        .from('documents')
        .insert({
          client_id: clientId,
          template_id: templateId,
          title: `${template.title} - Draft`,
          status: 'drafted',
          raw_text: draftedText,
          variables,
          practice_area: practiceArea,
          jurisdiction,
        })
        .select()
        .single();

      if (insertError || !document) {
        return {
        console.error('Document insert error:', insertError);
          success: false,
          message: 'Failed to create document',
          error: insertError?.message,
        };
      }

      return {
        success: true,
        message: 'Draft created successfully',
        data: { documentId: document.id, document },
      };
    } catch (error: any) {
      console.error('Unexpected error in createDraft:', error);
      return {
        success: false,
        message: 'Error creating draft',
        error: error.message,
      };
    }
  }

  /**
   * STATE: DRAFTED → PENDING_REVIEW
   * Lock document and route to vetted attorney
   */
  static async submitForReview(documentId: string): Promise<WorkflowResult> {
    try {
      // Input validation
      if (!documentId) {
        return {
          success: false,
          message: 'Document ID is required',
        };
      }

      // Fetch document
      const { data: document, error: docError } = await supabase
        .from('documents')
        .select('*')
        .eq('id', documentId)
        .single();

      } catch (fetchError: any) {
        console.error('Document fetch error:', fetchError);
        return { success: false, message: 'Failed to fetch document', error: fetchError.message };
      }

      if (docError || !document) {
        console.error('Document not found:', docError);
        return {
          success: false,
          message: 'Document not found',
          error: docError?.message,
        };
      }

      // Verify document is in correct state
      if (document.status !== 'drafted') {
        return {
          success: false,
          message: `Cannot submit document in status: ${document.status}`,
        };
      }

      // Find matching attorney
      const matchedAttorney = await this.findMatchingAttorney(
        document.practice_area,
        document.jurisdiction
      );
      ).catch((error) => {
        console.error('Attorney matching error:', error);
        return null;
      });
      if (!matchedAttorney) {
        return {
        console.warn('No available attorneys for:', document.practice_area, document.jurisdiction);
          success: false,
          message: 'No available attorneys found for this practice area and jurisdiction',
        };
      }

      // Update document status and assign attorney
      const { error: updateError } = await supabase
        .from('documents')
        .update({
          status: 'pending_review',
          attorney_id: matchedAttorney.id,
          updated_at: new Date().toISOString(),
        })
        .eq('id', documentId);

      if (updateError) {
        console.error('Document update error:', updateError);
        return {
          success: false,
          message: 'Failed to update document status',
          error: updateError.message,
        };
      }

      // Send notification to attorney (implement email/SMS notification)
      await this.notifyAttorney(matchedAttorney.id, documentId);

      return {
        success: true,
        message: 'Document submitted for attorney review',
        data: { attorneyId: matchedAttorney.id },
      };
    } catch (error: any) {
      console.error('Unexpected error in submitForReview:', error);
      return {
        success: false,
        message: 'Error submitting for review',
        error: error.message,
      };
    }
  }

  /**
   * STATE: PENDING_REVIEW → ATTORNEY_APPROVED
   * Attorney reviews, edits, and approves the document
   */
  static async approveDocument(
    documentId: string,
    attorneyId: string,
    finalText: string,
    reviewNotes?: string
  ): Promise<WorkflowResult> {
    try {
      // Fetch document
      const { data: document, error: docError } = await supabase
        .from('documents')
        .select('*')
        .eq('id', documentId)
        .single();

      if (docError || !document) {
        return {
          success: false,
          message: 'Document not found',
          error: docError?.message,
        };
      }

      // Verify attorney is assigned to this document
      if (document.attorney_id !== attorneyId) {
        return {
          success: false,
          message: 'Not authorized to approve this document',
        };
        console.warn('Invalid document status for approval:', document.status);
      }

      // Verify document is in correct state
      if (document.status !== 'pending_review') {
        return {
          success: false,
          message: `Cannot approve document in status: ${document.status}`,
        };
      }

      // Update document with attorney's final version
      const { error: updateError } = await supabase
        .from('documents')
        .update({
          status: 'attorney_approved',
          raw_text: finalText,
          ai_analysis: {
            ...document.ai_analysis,
            attorney_notes: reviewNotes,
            approved_at: new Date().toISOString(),
            approved_by: attorneyId,
          },
          updated_at: new Date().toISOString(),
        })
        .eq('id', documentId);

      if (updateError) {
        console.error('Document approval error:', updateError);
        return {
          success: false,
          message: 'Failed to approve document',
          error: updateError.message,
        };
      }

      return {
        success: true,
        message: 'Document approved by attorney',
        data: { documentId },
      };
    } catch (error: any) {
      console.error('Unexpected error in approveDocument:', error);
      return {
        success: false,
        message: 'Error approving document',
        error: error.message,
      };
    }
  }

  /**
   * STATE: ATTORNEY_APPROVED → SENT_TO_CLIENT
   * Generate watermarked PDF and notify client
   */
  static async sendToClient(documentId: string): Promise<WorkflowResult> {
    try {
      // Fetch document
      const { data: document, error: docError } = await supabase
        .from('documents')
        .select('*, profiles!documents_client_id_fkey(full_name, phone)')
        .eq('id', documentId)
        .single();

      if (docError || !document) {
        return {
          success: false,
          message: 'Document not found',
          error: docError?.message,
        };
      }

      // Verify document is in correct state
      if (document.status !== 'attorney_approved') {
        return {
          success: false,
          message: `Cannot send document in status: ${document.status}`,
        };
      }

      // Generate watermarked PDF
      const pdfResult = await this.generateWatermarkedPDF(document);
      const pdfResult = await this.generateWatermarkedPDF(document).catch((error) => ({
        success: false, message: 'PDF generation failed', error: error.message }));
      if (!pdfResult.success) {
        return pdfResult;
      }

      // Update document status and file path
      const { error: updateError } = await supabase
        .from('documents')
        .update({
          status: 'sent_to_client',
          file_path: pdfResult.data.filePath,
          updated_at: new Date().toISOString(),
        })
        .eq('id', documentId);

      if (updateError) {
        return {
        console.error('Document send error:', updateError);
          success: false,
          message: 'Failed to update document status',
          error: updateError.message,
        };
      }

      // Send notification to client
      await this.notifyClient(document.client_id, documentId, pdfResult.data.downloadUrl);

      return {
        success: true,
        message: 'Document sent to client',
        data: {
          documentId,
          downloadUrl: pdfResult.data.downloadUrl,
        },
      };
    } catch (error: any) {
      console.error('Unexpected error in sendToClient:', error);
      return {
        success: false,
        message: 'Error sending document to client',
        error: error.message,
      };
    }
  }

  /**
   * Find matching attorney based on practice area and jurisdiction
   */
  private static async findMatchingAttorney(
    practiceArea: string | null,
    jurisdiction: CountryCode | null
  ): Promise<AttorneyProfile | null> {
    try {
      const { data: attorneys, error } = await supabase
        .from('attorney_profiles')
        .select('*')
        .eq('verified', true)
        .eq('accepting_clients', true);

      if (error) {
        console.error('Attorney query error:', error);
        return null;
      }

      if (!attorneys || attorneys.length === 0) {
        console.warn('No attorneys available in database');
        return null;
      }
    } catch (error: any) {
      console.error('Unexpected error in findMatchingAttorney:', error);
      return null;
    }

    // Score and rank attorneys
    const scored = attorneys.map((attorney) => {
      let score = 0;
      
      // Match practice area
      if (practiceArea && attorney.practice_areas?.includes(practiceArea)) {
        score += 10;
      }
      
      // Match jurisdiction
      if (jurisdiction && attorney.jurisdictions?.includes(jurisdiction)) {
        score += 5;
      }
      
      return { attorney, score };
    });

    // Sort by score and return best match
    scored.sort((a, b) => b.score - a.score);
    return scored[0]?.attorney || attorneys[0];
  }

  /**
   * Generate watermarked PDF and upload to Supabase Storage
   */
  private static async generateWatermarkedPDF(document: any): Promise<WorkflowResult> {
    try {
    // TODO: Implement PDF generation with watermark
    // Use libraries like pdfkit, jsPDF, or server-side generation
    // Add watermark: "MONOGAMY.LEGAL - Verified Attorney Approved"
    
    const fileName = `${document.id}_${Date.now()}.pdf`;
    const filePath = `documents/${document.client_id}/${fileName}`;
    
    // For now, return placeholder
    // In production, generate actual PDF and upload to storage
    const downloadUrl = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/documents/${filePath}`;
    
    return {
      success: true,
      message: 'PDF generated',
      data: { filePath, downloadUrl },
    } catch (error: any) {
      console.error('PDF generation error:', error);
      return { success: false, message: 'Failed to generate PDF', error: error.message };
    }
    };
  }

  /**
   * Send notification to attorney
   */
  private static async notifyAttorney(attorneyId: string, documentId: string): Promise<void> {
    // TODO: Implement email/SMS notification via Resend or Twilio
    console.log(`Notify attorney ${attorneyId} about document ${documentId}`);
  }

  /**
   * Send notification to client with download link
   */
  private static async notifyClient(
    clientId: string,
    documentId: string,
    downloadUrl: string
  ): Promise<void> {
    // TODO: Implement email notification via Resend
    console.log(`Notify client ${clientId} about completed document ${documentId}: ${downloadUrl}`);
  }
}
