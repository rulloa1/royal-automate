import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface LeadInfo {
  business_name?: string;
  contact_name?: string;
  email?: string;
  phone?: string;
  interests?: string[];
  pain_points?: string;
  qualification_score?: number;
  priority?: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, sessionId } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Initialize Supabase client for lead storage
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const systemPrompt = `You are a friendly and professional sales assistant for Roy's Company, an AI automation agency. Your role is to:

1. Warmly greet visitors and learn about their business
2. Understand their pain points and challenges
3. Explain how Roy's Company services (AI Automation, Web Development, Lead Generation) can help
4. Guide qualified leads toward booking a consultation or trial
5. Naturally collect contact information (business name, their name, email, phone) when appropriate

Be conversational, helpful, and not pushy. Ask one question at a time. Keep responses concise (2-3 sentences max).

Services we offer:
- AI Automation: Custom AI agents, chatbots, workflow automation
- Web Development: Modern, high-converting websites
- Lead Generation: AI-powered lead qualification and nurturing

Always be honest if something is outside our scope. Focus on understanding the customer's needs first.`;

    // Get chat response
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        max_tokens: 300,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "I apologize, I'm having trouble responding. Please try again.";

    // Extract lead information from conversation (after 3+ messages)
    if (messages.length >= 3 && sessionId) {
      try {
        const extractionPrompt = `Analyze this sales conversation and extract any lead information mentioned. Return a JSON object with these fields (use null for unknown):
{
  "business_name": string or null,
  "contact_name": string or null,
  "email": string or null,
  "phone": string or null,
  "interests": array of strings (services they're interested in) or [],
  "pain_points": string summary of their challenges or null,
  "qualification_score": number 1-100 based on buying intent,
  "priority": "high" | "medium" | "low"
}

Conversation:
${messages.map((m: { role: string; content: string }) => `${m.role}: ${m.content}`).join("\n")}

Return ONLY valid JSON, no markdown or explanation.`;

        const extractResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${LOVABLE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-2.5-flash",
            messages: [{ role: "user", content: extractionPrompt }],
            max_tokens: 500,
          }),
        });

        if (extractResponse.ok) {
          const extractData = await extractResponse.json();
          const extractedText = extractData.choices?.[0]?.message?.content || "{}";
          
          // Parse the JSON response
          let leadInfo: LeadInfo = {};
          try {
            // Clean up potential markdown formatting
            const cleanJson = extractedText.replace(/```json\n?|\n?```/g, "").trim();
            leadInfo = JSON.parse(cleanJson);
          } catch {
            console.log("Could not parse lead info:", extractedText);
          }

          // Only save if we have meaningful information
          const hasInfo = leadInfo.business_name || leadInfo.contact_name || leadInfo.email || 
                         leadInfo.phone || (leadInfo.interests && leadInfo.interests.length > 0);

          if (hasInfo) {
            // Check if lead already exists for this session
            const { data: existingLead } = await supabase
              .from("leads")
              .select("id")
              .eq("session_id", sessionId)
              .maybeSingle();

            const leadData = {
              session_id: sessionId,
              business_name: leadInfo.business_name || null,
              contact_name: leadInfo.contact_name || null,
              email: leadInfo.email || null,
              phone: leadInfo.phone || null,
              interests: leadInfo.interests || [],
              pain_points: leadInfo.pain_points || null,
              qualification_score: leadInfo.qualification_score || 0,
              priority: leadInfo.priority || "medium",
              conversation_summary: messages.slice(-4).map((m: { role: string; content: string }) => 
                `${m.role}: ${m.content}`
              ).join("\n"),
            };

            if (existingLead) {
              // Update existing lead
              await supabase
                .from("leads")
                .update(leadData)
                .eq("id", existingLead.id);
              console.log("Updated lead:", existingLead.id);
            } else {
              // Insert new lead
              const { data: newLead, error: insertError } = await supabase
                .from("leads")
                .insert(leadData)
                .select("id")
                .single();
              
              if (insertError) {
                console.error("Error saving lead:", insertError);
              } else {
                console.log("Created new lead:", newLead?.id);
              }
            }
          }
        }
      } catch (extractError) {
        console.error("Lead extraction error:", extractError);
        // Don't fail the main response if extraction fails
      }
    }

    return new Response(
      JSON.stringify({ content }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Sales chat error:", error);
    const errorMessage = error instanceof Error ? error.message : "An error occurred";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
