import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { WEBSITE_TEMPLATE as FALLBACK_TEMPLATE } from "./template.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

/**
 * Replaces placeholders in the HTML template with actual agent data.
 */
function generateHtml(template: string, data: any): string {
    let html = template;

    // Strict validation - fail if core data is missing
    if (!data.agent_name) throw new Error("Missing 'agent_name' for site generation");
    if (!data.email) throw new Error("Missing 'email' for site generation");
    // Phone is optional but recommended; others like city_area can be inferred or left generic

    const agentConfig = {
        name: data.agent_name,
        title: "Luxury Real Estate",
        brokerage: data.brokerage || "Real Estate Brokerage",
        location: (data.city_area || "Your City") + ", TX",
        brokerPageNote: "Broker Page Only",
        email: data.email,
        phone: data.phone || "",
        phoneClean: (data.phone || "").replace(/\D/g, ""),
        social: {
            instagram: data.social?.instagram || "#",
            linkedin: data.social?.linkedin || "#",
            zillow: data.social?.zillow || "#",
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
                years: data.years_experience ? `${data.years_experience}+` : "10+",
                yearsLabel: "Years Experience",
                producer: "Top 1%",
                producerLabel: "Producer",
                availability: "24/7",
                availabilityLabel: "Availability"
            },
            image: data.headshot_url || "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop"
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

    const configScript = `<script>const agentConfig = ${JSON.stringify(agentConfig, null, 4)};</script>`;

    const simplePlaceholders = ['agent_name', 'brokerage', 'bio', 'city_area', 'phone', 'email'];
    simplePlaceholders.forEach(key => {
        const regex = new RegExp(`{{${key}}}`, 'g');
        html = html.replace(regex, data[key] || '');
    });

    return html.replace("{{AGENT_CONFIG_SCRIPT}}", configScript);
}

serve(async (req: Request) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const { agent_data, save_to_storage } = await req.json();

        if (!agent_data) {
            throw new Error("Missing agent_data in request body");
        }

        console.log(`Starting static provisioning for: ${agent_data.agent_name}`);

        // Initialize Supabase client
        const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
        const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
        const supabase = createClient(supabaseUrl, supabaseKey);

        // Fetch template from DB or use fallback
        let templateHtml = FALLBACK_TEMPLATE;
        
        // 1. Direct HTML injection (Highest Priority)
        if (agent_data.custom_template_html) {
             console.log("Using custom template HTML from request payload");
             templateHtml = agent_data.custom_template_html;
        } 
        // 2. Fetch by ID
        else if (agent_data.preferred_template) {
             const { data: templateData, error } = await supabase
                .from('website_templates')
                .select('html_content')
                .eq('id', agent_data.preferred_template)
                .maybeSingle();
             
             if (templateData) {
                 console.log("Using custom template from DB:", agent_data.preferred_template);
                 templateHtml = templateData.html_content;
             } else {
                 console.warn("Template ID provided but not found or table missing. Using fallback.", error);
             }
        } 
        // 3. Default active template from DB
        else {
             // Try to find a default active template if none specified
             const { data: defaultTemplate, error } = await supabase
                .from('website_templates')
                .select('html_content')
                .eq('is_active', true)
                .order('created_at', { ascending: false })
                .limit(1)
                .maybeSingle();

             if (defaultTemplate) {
                 console.log("Using latest active template from DB");
                 templateHtml = defaultTemplate.html_content;
             } else {
                 console.warn("No active template found in DB. Using hardcoded fallback.", error);
             }
        }

        const generatedHtml = generateHtml(templateHtml, agent_data);
        let storageUrl = "";
        let uploadErrorDetail = null;

        if (save_to_storage) {
            console.log("Saving to Supabase Storage...");
            
            const { error: bucketError } = await supabase.storage.getBucket("sites");
            if (bucketError) {
                console.log("Bucket 'sites' not found, creating...");
                await supabase.storage.createBucket("sites", {
                    public: true,
                    fileSizeLimit: 10485760,
                    allowedMimeTypes: ["text/html"]
                });
            }

            const slug = agent_data.agent_name.toLowerCase().replace(/[^a-z0-9]/g, "-") + "-" + Date.now();
            const filename = `${slug}.html`;

            const { error: uploadError } = await supabase
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
