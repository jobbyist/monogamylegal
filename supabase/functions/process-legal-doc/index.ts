// MODULE 2: AI Document Parser & RAG Pipeline
// Supabase Edge Function for processing legal documents with Claude 3.5 Sonnet

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import Anthropic from "https://esm.sh/@anthropic-ai/sdk@0.20.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface DocumentProcessRequest {
  documentId: string;
  fileContent?: string; // Base64 encoded
  text?: string; // Raw text if already extracted
  jurisdiction: "ZA" | "KE" | "NG";
  practiceArea?: string;
}

interface AIAnalysis {
  summary: string[];
  risk_rating: "low" | "medium" | "high" | "critical";
  loopholes: string[];
  missing_clauses: string[];
  jurisdictional_issues: string[];
  recommendations: string[];
  compliance_score: number;
}

// Chunk text with overlap for better context preservation
function chunkText(text: string, chunkSize = 1000, overlap = 200): string[] {
  const chunks: string[] = [];
  let start = 0;

  while (start < text.length) {
    const end = Math.min(start + chunkSize, text.length);
    chunks.push(text.slice(start, end));
    start += chunkSize - overlap;
  }

  return chunks;
}

// Generate embeddings using Anthropic's approach (simplified - in production use OpenAI or Cohere)
async function generateEmbedding(text: string): Promise<number[]> {
  // Note: Anthropic doesn't provide embeddings directly
  // In production, use OpenAI's text-embedding-3-small or Cohere
  // For now, we'll create a placeholder that should be replaced
  
  // This is a simplified hash-based approach for demonstration
  // REPLACE THIS WITH ACTUAL EMBEDDING API CALL IN PRODUCTION
  const embedding = new Array(1536).fill(0);
  
  // Simple character-based feature extraction (NOT production-ready)
  for (let i = 0; i < text.length && i < 1536; i++) {
    embedding[i % 1536] += text.charCodeAt(i) / 1000;
  }
  
  // Normalize
  const magnitude = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0));
  return embedding.map(val => val / (magnitude || 1));
}

serve(async (req) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    // Get user from auth header
    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(token);

    if (authError || !user) {
      throw new Error("Unauthorized");
    }

    const requestData: DocumentProcessRequest = await req.json();
    const { documentId, fileContent, text, jurisdiction, practiceArea } = requestData;

    // Fetch document from database
    const { data: document, error: docError } = await supabaseClient
      .from("documents")
      .select("*")
      .eq("id", documentId)
      .single();

    if (docError || !document) {
      throw new Error("Document not found");
    }

    // Verify user owns the document
    if (document.client_id !== user.id) {
      throw new Error("Forbidden");
    }

    // Extract text content
    let documentText = text || document.raw_text || "";

    if (!documentText && fileContent) {
      // If file content provided, use Claude to extract text
      const anthropic = new Anthropic({
        apiKey: Deno.env.get("ANTHROPIC_API_KEY") ?? "",
      });

      // Note: Claude can process documents directly
      // This is a simplified approach - expand based on file type
      documentText = fileContent; // Placeholder - implement actual extraction
    }

    if (!documentText) {
      throw new Error("No document text to process");
    }

    // Initialize Anthropic client
    const anthropic = new Anthropic({
      apiKey: Deno.env.get("ANTHROPIC_API_KEY") ?? "",
    });

    // Jurisdiction-specific compliance rules
    const jurisdictionRules = {
      ZA: "South African contract law, including Consumer Protection Act and Labour Relations Act compliance",
      KE: "Kenyan contract law, including the Law of Contract Act and Competition Act compliance",
      NG: "Nigerian contract law, including the Land Use Act and Companies and Allied Matters Act compliance",
    };

    // AI Contract Audit using Claude 3.5 Sonnet
    const auditPrompt = `You are an expert legal contract auditor specializing in ${jurisdiction === "ZA" ? "South African" : jurisdiction === "KE" ? "Kenyan" : "Nigerian"} law.

Analyze the following contract for:
1. Common loopholes that could be exploited
2. Missing critical clauses
3. Jurisdictional compliance issues (${jurisdictionRules[jurisdiction]})
4. Overall risk assessment
5. Specific recommendations for improvement

Practice Area: ${practiceArea || "General"}

Contract Text:
${documentText.slice(0, 100000)} 

Provide your analysis in the following JSON format:
{
  "summary": ["5 bullet points of critical issues"],
  "risk_rating": "low|medium|high|critical",
  "loopholes": ["list of potential loopholes"],
  "missing_clauses": ["list of missing or inadequate clauses"],
  "jurisdictional_issues": ["compliance issues specific to ${jurisdiction}"],
  "recommendations": ["prioritized recommendations"],
  "compliance_score": 0-100
}`;

    const auditResponse = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 4096,
      messages: [
        {
          role: "user",
          content: auditPrompt,
        },
      ],
    });

    // Parse AI response
    let aiAnalysis: AIAnalysis;
    try {
      const responseText = auditResponse.content[0].type === "text"
        ? auditResponse.content[0].text
        : "";
      
      // Extract JSON from response (handle markdown code blocks)
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        aiAnalysis = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Could not parse AI response");
      }
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      // Fallback analysis
      aiAnalysis = {
        summary: [
          "Document processed but detailed analysis unavailable",
          "Manual review recommended",
          "Contact attorney for comprehensive audit",
          "Ensure all parties sign and date",
          "Verify jurisdiction-specific requirements",
        ],
        risk_rating: "medium",
        loopholes: ["Analysis pending"],
        missing_clauses: ["Analysis pending"],
        jurisdictional_issues: ["Analysis pending"],
        recommendations: ["Schedule attorney consultation"],
        compliance_score: 50,
      };
    }

    // Ensure summary has exactly 5 points
    if (aiAnalysis.summary.length > 5) {
      aiAnalysis.summary = aiAnalysis.summary.slice(0, 5);
    } else if (aiAnalysis.summary.length < 5) {
      while (aiAnalysis.summary.length < 5) {
        aiAnalysis.summary.push("Additional review recommended");
      }
    }

    // Update document with AI analysis
    const { error: updateError } = await supabaseClient
      .from("documents")
      .update({
        raw_text: documentText,
        ai_analysis: aiAnalysis,
        updated_at: new Date().toISOString(),
      })
      .eq("id", documentId);

    if (updateError) {
      throw new Error(`Failed to update document: ${updateError.message}`);
    }

    // Chunk the document for RAG
    const chunks = chunkText(documentText, 1000, 200);

    // Generate embeddings and store chunks
    const chunkInserts = [];
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      const embedding = await generateEmbedding(chunk);

      chunkInserts.push({
        document_id: documentId,
        content: chunk,
        embedding: `[${embedding.join(",")}]`, // pgvector format
        chunk_index: i,
        metadata: {
          jurisdiction,
          practice_area: practiceArea,
          chunk_length: chunk.length,
        },
      });
    }

    // Delete existing chunks for this document
    await supabaseClient
      .from("document_chunks")
      .delete()
      .eq("document_id", documentId);

    // Insert new chunks
    if (chunkInserts.length > 0) {
      const { error: chunksError } = await supabaseClient
        .from("document_chunks")
        .insert(chunkInserts);

      if (chunksError) {
        console.error("Failed to insert chunks:", chunksError);
        // Don't fail the whole operation
      }
    }

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        documentId,
        analysis: aiAnalysis,
        chunks_created: chunkInserts.length,
        message: "Document processed successfully",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error processing document:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: error.message === "Unauthorized" ? 401 : error.message === "Forbidden" ? 403 : 500,
      }
    );
  }
});

/* 
PRODUCTION DEPLOYMENT NOTES:

1. Replace the placeholder embedding function with a real embedding service:
   - OpenAI: text-embedding-3-small or text-embedding-ada-002
   - Cohere: embed-multilingual-v3.0
   - Voyage AI: voyage-2

2. Add proper PDF/DOCX extraction:
   - Use pdf-parse or similar for PDF files
   - Use mammoth or docx for DOCX files
   - Consider using Claude's native document processing capabilities

3. Environment variables required in Supabase Edge Function:
   - ANTHROPIC_API_KEY
   - SUPABASE_URL
   - SUPABASE_SERVICE_ROLE_KEY
   - OPENAI_API_KEY (if using OpenAI embeddings)

4. Error handling improvements:
   - Add retry logic for API calls
   - Implement rate limiting
   - Add detailed logging/monitoring

5. Security enhancements:
   - Validate file types and sizes
   - Scan for malicious content
   - Implement request throttling

6. Performance optimizations:
   - Batch embedding generation
   - Use streaming for large documents
   - Cache frequently accessed data
*/
