import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { WEBSITE_TEMPLATE } from "./template.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

/**
 * Replaces placeholders in the HTML template with actual agent data.
 */
function generateHtml(template: string, data: any): string {
    let html = template;

    // Construct the agent configuration object
    const agentConfig = {
        name: data.agent_name || "Agent Name",
        title: "Luxury Real Estate",
        brokerage: data.brokerage || "Real Estate Brokerage",
        location: (data.city_area || "City") + ", TX",
        brokerPageNote: "Broker Page Only",

        email: "contact@example.com", // You might want to pass this in agent_data if available
        phone: "(555) 123-4567",
        phoneClean: "5551234567",

        social: {
            instagram: "#",
            linkedin: "#",
            zillow: "#",
            website: "#"
        },

        hero: {
            headline: `ELEVATED LIVING<br><span class='italic text-monarch-gold font-light'>IN ${(data.city_area || "YOUR CITY").toUpperCase()}</span>`,
            backgroundImage: "https://images.unsplash.com/photo-1600596542815-2495db9dc2c3?q=80&w=2070&auto=format&fit=crop"
        },

        philosophy: {
            headline: "Market expertise,<br><span class='italic text-monarch-dark/80'>unwavering</span><br>dedication.",
            text: data.bio || "Representing the finest properties. My philosophy blends data-driven market insight with the art of luxury service.",
            stats: {
                years: "10+",
                yearsLabel: "Years Experience",
                producer: "Top 1%",
                producerLabel: "Producer",
                availability: "24/7",
                availabilityLabel: "Availability"
            },
            image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop"
        },

        portfolio: {
            active: {
                title: "The Woodlands Estate",
                price: "$2,850,000",
                specs: "5 Bed | 5.5 Bath",
                image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop",
                hotspots: [
                    { title: "Carlton Woods", desc: "Premier gated community featuring world-class golf and amenities." },
                    { title: "Grand Facade", desc: "Classic architecture with modern sensibilities and expansive grounds." }
                ]
            },
            sold: {
                title: "Benders Landing",
                status: "Sold Above Asking",
                image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
            }
        },

        locationData: [
            { time: 10, text: "TO THE WOODLANDS<br>WATERWAY" },
            { time: 25, text: "TO AIRPORT" },
            { time: 5, text: "TO EXXONMOBIL<br>CAMPUS" },
            { time: 35, text: "TO DOWNTOWN" }
        ],

        services: [
            { title: "Market Analysis", desc: "Deep analytical insight into real estate trends.", icon: "fa-chart-line" },
            { title: "Luxury Staging", desc: "Curating environments that resonate.", icon: "fa-couch" },
            { title: "Global Reach", desc: "Connecting with buyers from relocation hotspots.", icon: "fa-globe" }
        ]
    };

    // Inject the config as a script tag
    const configScript = `<script>const agentConfig = ${JSON.stringify(agentConfig, null, 4)};</script>`;

    // Replace simple handlebars-style placeholders
    const simplePlaceholders = [
        'agent_name', 'brokerage', 'bio', 'city_area', 'phone', 'email'
    ];
    
    simplePlaceholders.forEach(key => {
        const regex = new RegExp(`{{${key}}}`, 'g');
        html = html.replace(regex, data[key] || '');
    });

    return html.replace("{{AGENT_CONFIG_SCRIPT}}", configScript);
}

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ... existing code ...

// Declare Deno for TypeScript if not in a Deno-aware environment
declare const Deno: any;

Deno.serve(async (req: Request) => {
    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

  try {
    const { agentName, agentConfig, slug } = await req.json();

        if (!agent_data) {
            throw new Error("Missing agent_data in request body");
        }

        console.log(`Starting static provisioning for: ${agent_data.agent_name}`);

        // Generate the HTML
        const generatedHtml = generateHtml(WEBSITE_TEMPLATE, agent_data);
        let storageUrl = "";
        let uploadErrorDetail = null;

        // Save to Storage if requested
        if (save_to_storage) {
            console.log("Saving to Supabase Storage...");
            const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
            const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
            const supabase = createClient(supabaseUrl, supabaseKey);

            // Ensure bucket exists
            const { data: bucketData, error: bucketError } = await supabase.storage.getBucket("sites");
            if (bucketError) {
                console.log("Bucket 'sites' not found, creating...");
                const { error: createError } = await supabase.storage.createBucket("sites", {
                    public: true,
                    fileSizeLimit: 10485760, // 10MB
                    allowedMimeTypes: ["text/html"]
                });
                if (createError) {
                    console.error("Failed to create bucket:", createError);
                    // Fallback: Try to upload anyway, maybe getBucket failed but it exists? 
                    // Or just let the upload fail and catch it there.
                }
            }

            // Create a slug for the filename
            const slug = agent_data.agent_name.toLowerCase().replace(/[^a-z0-9]/g, "-") + "-" + Date.now();
            const filename = `${slug}.html`;

            const { data: uploadData, error: uploadError } = await supabase
                .storage
                .from("sites")
                .upload(filename, generatedHtml, {
                    contentType: "text/html",
                    upsert: true
                });

            if (uploadError) {
                console.error("Storage upload failed:", uploadError);
                uploadErrorDetail = uploadError;
            } else {
                const { data: { publicUrl } } = supabase.storage.from("sites").getPublicUrl(filename);
                storageUrl = publicUrl;
                console.log(`Saved to: ${storageUrl}`);
            }
        }

        console.log("HTML generated successfully.");

        return new Response(
            JSON.stringify({
                status: "created",
                website_url: storageUrl || "generated_content_returned",
                html_content: generatedHtml,
                details: {
                    method: "static_template_replacement",
                    storage_enabled: !!save_to_storage,
                    upload_error: uploadErrorDetail
                }
            }),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 200,
            }
        );
    } catch (error: any) {
        console.error("Provisioning error:", error);
        return new Response(
            JSON.stringify({ error: error.message || "Unknown error" }),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 400,
            }
        );
    }
});
