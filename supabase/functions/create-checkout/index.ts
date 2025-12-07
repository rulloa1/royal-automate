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

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-CHECKOUT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const { packageType, email, name } = await req.json();
    logStep("Request received", { packageType, email, name });

    if (!packageType || !PRICES[packageType as keyof typeof PRICES]) {
      throw new Error("Invalid package type");
    }

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

    const origin = req.headers.get("origin") || "https://royaisolutions.me";
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
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
