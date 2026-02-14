import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Price IDs for different packages
const PRICES = {
  foundation: "price_1SbrSCAFk5ZoDrBAWTG2flFA", // $2,500 one-time
  growth: "price_1SbrSOAFk5ZoDrBAXneypcjR", // $997/month
};

// Simple in-memory rate limiting (resets on function cold start)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

const isRateLimited = (ip: string): boolean => {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  
  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }
  
  record.count++;
  return false;
};

// Input validation helpers
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
};

const sanitizeString = (str: string, maxLength: number): string => {
  return str.trim().slice(0, maxLength);
};

const logStep = (step: string, details?: unknown) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-CHECKOUT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    // Get client IP for rate limiting
    const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                     req.headers.get("cf-connecting-ip") || 
                     "unknown";
    
    // Check rate limit
    if (isRateLimited(clientIP)) {
      logStep("Rate limited", { ip: clientIP });
      return new Response(JSON.stringify({ error: "Too many requests. Please try again later." }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 429,
      });
    }

    const body = await req.json();
    
    // Validate packageType
    const packageType = body.packageType;
    if (!packageType || !["foundation", "growth"].includes(packageType)) {
      logStep("Invalid package type", { packageType });
      return new Response(JSON.stringify({ error: "Invalid package type" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Validate and sanitize email (optional but must be valid if provided)
    let email: string | undefined;
    if (body.email) {
      if (typeof body.email !== "string" || !isValidEmail(body.email)) {
        logStep("Invalid email format");
        return new Response(JSON.stringify({ error: "Invalid email format" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        });
      }
      email = sanitizeString(body.email, 255);
    }

    // Validate and sanitize name (optional)
    let name: string | undefined;
    if (body.name) {
      if (typeof body.name !== "string") {
        logStep("Invalid name format");
        return new Response(JSON.stringify({ error: "Invalid name format" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        });
      }
      name = sanitizeString(body.name, 100);
    }

    logStep("Request validated", { packageType, hasEmail: !!email, hasName: !!name });

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    // Check if customer exists
    let customerId: string | undefined;
    if (email) {
      const customers = await stripe.customers.list({ email, limit: 1 });
      if (customers.data.length > 0) {
        customerId = customers.data[0].id;
        logStep("Existing customer found", { customerId });
      }
    }

    const origin = req.headers.get("origin") || "https://www.royscompany.com";
    const isSubscription = packageType === "growth";

    // Build line items
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        price: PRICES[packageType as keyof typeof PRICES],
        quantity: 1,
      },
    ];

    // For growth package, add the setup fee
    if (packageType === "growth") {
      lineItems.push({
        price: PRICES.foundation,
        quantity: 1,
      });
    }

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      customer: customerId,
      customer_email: customerId ? undefined : email,
      line_items: lineItems,
      mode: isSubscription ? "subscription" : "payment",
      success_url: `${origin}/?payment=success`,
      cancel_url: `${origin}/?payment=canceled`,
      metadata: {
        package: packageType,
        customer_name: name || "",
      },
    };

    // For subscription mode with one-time items, we need to use subscription_data.items
    if (isSubscription) {
      // Subscriptions can't have one-time items in line_items
      // So we handle the setup fee separately via invoice_creation or just the subscription
      sessionParams.line_items = [
        {
          price: PRICES.growth,
          quantity: 1,
        },
      ];
    }

    const session = await stripe.checkout.sessions.create(sessionParams);
    logStep("Checkout session created", { sessionId: session.id });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    // Return generic error to client
    return new Response(JSON.stringify({ error: "Unable to create checkout session" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
