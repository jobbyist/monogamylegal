// Enhanced Supabase Edge Function for legal document processing with Voyage AI embeddings (1024-dim)
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { documentId, text, jurisdiction } = await req.json();

    // Fetch document
    const { data: document } = await supabase.from('documents').select('*').eq('id', documentId).single();

    let docText = text || document?.raw_text || '';

    // Voyage AI embedding (1024-dim for voyage-law-2)
    async function getVoyageEmbedding(text: string): Promise<number[]> {
      const response = await fetch('https://api.voyageai.com/v1/embeddings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Deno.env.get('VOYAGE_API_KEY')}`
        },
        body: JSON.stringify({
          input: text,
          model: 'voyage-law-2'
        })
      });
      const result = await response.json();
      return result.data[0].embedding;
    }

    // Chunk and embed
    const chunks = docText.match(/.{1,800}/g) || [];
    const chunkInserts = [];

    for (let i = 0; i < Math.min(chunks.length, 30); i++) {
      const embedding = await getVoyageEmbedding(chunks[i]);
      chunkInserts.push({
        document_id: documentId,
        content: chunks[i],
        embedding: embedding,
      });
    }

    await supabase.from('document_chunks').insert(chunkInserts);

    return new Response(JSON.stringify({ success: true, chunks: chunkInserts.length }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: corsHeaders });
  }
});
