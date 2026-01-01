import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { formData, sessionId } = await req.json();
    
    console.log('Lead qualifier received:', { formData, sessionId });

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are an AI lead qualifier for Royal Solutions, a company that helps businesses with digital transformation, automation, and AI solutions.

Analyze the lead information provided and return a JSON response with:
- score: number from 1-100 indicating lead quality
- priority: "high", "medium", or "low"
- insights: brief analysis of the lead (2-3 sentences)
- recommended_action: what the sales team should do next
- tags: array of relevant tags (e.g., "small-business", "tech-savvy", "urgent", "local")

Consider factors like:
- Business name (established vs new)
- Location (Texas focus is a plus)
- Completeness of information provided
- Notes content for intent signals`;

    const userMessage = `Qualify this lead:
Business Name: ${formData.business_name || 'Not provided'}
City: ${formData.city || 'Not provided'}
State: ${formData.state || 'Not provided'}
Phone: ${formData.phone ? 'Provided' : 'Not provided'}
Email: ${formData.email ? 'Provided' : 'Not provided'}
Notes: ${formData.notes || 'None'}

Session ID: ${sessionId}`;

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
          { role: "user", content: userMessage }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "qualify_lead",
              description: "Return the lead qualification analysis",
              parameters: {
                type: "object",
                properties: {
                  score: { 
                    type: "number", 
                    description: "Lead quality score from 1-100" 
                  },
                  priority: { 
                    type: "string", 
                    enum: ["high", "medium", "low"],
                    description: "Lead priority level" 
                  },
                  insights: { 
                    type: "string", 
                    description: "Brief analysis of the lead" 
                  },
                  recommended_action: { 
                    type: "string", 
                    description: "What the sales team should do next" 
                  },
                  tags: { 
                    type: "array", 
                    items: { type: "string" },
                    description: "Relevant tags for the lead" 
                  }
                },
                required: ["score", "priority", "insights", "recommended_action", "tags"],
                additionalProperties: false
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "qualify_lead" } }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ 
          error: "Rate limit exceeded, please try again later",
          fallback: true 
        }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      if (response.status === 402) {
        return new Response(JSON.stringify({ 
          error: "Service temporarily unavailable",
          fallback: true 
        }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const aiResponse = await response.json();
    console.log('AI response:', JSON.stringify(aiResponse));

    // Extract the tool call result
    const toolCall = aiResponse.choices?.[0]?.message?.tool_calls?.[0];
    if (toolCall && toolCall.function?.arguments) {
      const qualification = JSON.parse(toolCall.function.arguments);
      console.log('Lead qualification result:', qualification);
      
      return new Response(JSON.stringify({
        success: true,
        qualification,
        sessionId
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fallback if no tool call
    return new Response(JSON.stringify({
      success: true,
      qualification: {
        score: 50,
        priority: "medium",
        insights: "Lead received, standard processing",
        recommended_action: "Follow up within 24 hours",
        tags: ["new-lead"]
      },
      sessionId
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error('Error in lead-qualifier function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ 
      error: errorMessage,
      fallback: true 
    }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
