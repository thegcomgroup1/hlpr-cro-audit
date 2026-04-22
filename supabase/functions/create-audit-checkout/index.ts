import { createClient } from "jsr:@supabase/supabase-js@2";
import { corsHeaders } from "jsr:@supabase/supabase-js@2/cors";
import { z } from "npm:zod@3.23.8";

const BodySchema = z.object({
  name: z.string().trim().min(1, "Name required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(7, "Phone required").max(30),
  website_url: z
    .string()
    .trim()
    .min(4, "URL too short")
    .max(2048)
    .refine((v) => v.includes("."), { message: "URL must contain a period" })
    .refine((v) => /[a-zA-Z]/.test(v), { message: "URL must contain at least one letter" }),
  tier: z.enum(["mini", "full"]),
});

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY");
    const STRIPE_PRICE_ID_MINI = Deno.env.get("STRIPE_PRICE_ID_MINI");
    const STRIPE_PRICE_ID_FULL = Deno.env.get("STRIPE_PRICE_ID_FULL");

    if (!STRIPE_SECRET_KEY || !STRIPE_PRICE_ID_MINI || !STRIPE_PRICE_ID_FULL) {
      console.error("Missing Stripe env vars");
      return new Response(JSON.stringify({ error: "Server misconfigured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const json = await req.json().catch(() => null);
    const parsed = BodySchema.safeParse(json);
    if (!parsed.success) {
      return new Response(
        JSON.stringify({
          error: "Invalid input",
          details: parsed.error.flatten().fieldErrors,
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const { name, email, phone, website_url, tier } = parsed.data;
    const priceId = tier === "mini" ? STRIPE_PRICE_ID_MINI : STRIPE_PRICE_ID_FULL;

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // 1. Insert audit_requests row
    const { data: inserted, error: insertError } = await supabase
      .from("audit_requests")
      .insert({ name, email, phone, website_url, tier })
      .select("id")
      .single();

    if (insertError || !inserted) {
      console.error("Insert error:", insertError);
      return new Response(JSON.stringify({ error: "Failed to save request" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const auditRequestId = inserted.id;

    // 2. Create Stripe Checkout Session via REST API (form-encoded)
    const params = new URLSearchParams();
    params.append("mode", "payment");
    params.append("line_items[0][price]", priceId);
    params.append("line_items[0][quantity]", "1");
    params.append("success_url", "https://audit.hlpr.io/thank-you?session_id={CHECKOUT_SESSION_ID}");
    params.append("cancel_url", "https://audit.hlpr.io");
    params.append("customer_email", email);
    params.append("metadata[name]", name);
    params.append("metadata[email]", email);
    params.append("metadata[phone]", phone);
    params.append("metadata[website_url]", website_url);
    params.append("metadata[tier]", tier);
    params.append("metadata[audit_request_id]", auditRequestId);

    const stripeRes = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const stripeJson = await stripeRes.json();

    if (!stripeRes.ok) {
      console.error("Stripe error:", stripeJson);
      return new Response(JSON.stringify({ error: "Failed to create checkout session" }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 3. Update row with stripe session id
    const { error: updateError } = await supabase
      .from("audit_requests")
      .update({ stripe_session_id: stripeJson.id })
      .eq("id", auditRequestId);

    if (updateError) {
      console.error("Update error:", updateError);
      // non-fatal — we still return checkout URL
    }

    return new Response(JSON.stringify({ checkout_url: stripeJson.url }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(JSON.stringify({ error: "Unexpected error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
