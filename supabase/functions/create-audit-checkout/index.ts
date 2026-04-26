import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface IntakeAnswers {
  business_name?: string;
  industry?: string;
  business_model?: string;
  primary_offer?: string;
  dream_outcome?: string;
  target_customer?: string;
  aov?: string;
  monthly_traffic?: string;
  current_cvr?: string;
  traffic_sources?: string;
  pain_points?: string;
  top_objections?: string;
  social_proof_assets?: string;
  competitors?: string;
  differentiator?: string;
  primary_kpi?: string;
  secondary_kpi?: string;
  prior_attempts?: string;
  additional_notes?: string;
  contact_phone?: string;
}

interface RequestBody {
  name: string;
  email: string;
  phone: string;
  website_url: string;
  tier: "mini" | "full";
  intake_answers?: IntakeAnswers;
}

function validate(body: unknown): { ok: true; data: RequestBody } | { ok: false; error: string } {
  if (!body || typeof body !== "object") return { ok: false, error: "Body must be a JSON object" };
  const b = body as Record<string, unknown>;

  const name = typeof b.name === "string" ? b.name.trim() : "";
  if (!name || name.length > 100) return { ok: false, error: "Invalid name" };

  const email = typeof b.email === "string" ? b.email.trim() : "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255) {
    return { ok: false, error: "Invalid email" };
  }

  const phone = typeof b.phone === "string" ? b.phone.trim() : "";
  if (phone.length < 7 || phone.length > 30) return { ok: false, error: "Invalid phone" };

  const website_url = typeof b.website_url === "string" ? b.website_url.trim() : "";
  if (
    website_url.length < 4 ||
    website_url.length > 2048 ||
    !website_url.includes(".") ||
    !/[a-zA-Z]/.test(website_url)
  ) {
    return { ok: false, error: "Invalid website URL" };
  }

  const tier = b.tier;
  if (tier !== "mini" && tier !== "full") return { ok: false, error: "Invalid tier" };

  // Intake answers are optional and free-form (jsonb). Cap each string field
  // length defensively so an attacker can't dump megabytes into our DB.
  let intake_answers: IntakeAnswers | undefined;
  if (b.intake_answers && typeof b.intake_answers === "object") {
    const raw = b.intake_answers as Record<string, unknown>;
    intake_answers = {};
    for (const [k, v] of Object.entries(raw)) {
      if (typeof v === "string" && v.length <= 2000) {
        (intake_answers as Record<string, string>)[k] = v.trim();
      }
    }
  }

  return { ok: true, data: { name, email, phone, website_url, tier, intake_answers } };
}

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
    const parsed = validate(json);
    if (!parsed.ok) {
      return new Response(JSON.stringify({ error: parsed.error }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { name, email, phone, website_url, tier, intake_answers } = parsed.data;
    const priceId = tier === "mini" ? STRIPE_PRICE_ID_MINI : STRIPE_PRICE_ID_FULL;

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // 1. Insert audit_requests row (with intake answers if provided)
    const insertPayload: Record<string, unknown> = {
      name,
      email,
      phone,
      website_url,
      tier,
    };
    if (intake_answers && Object.keys(intake_answers).length > 0) {
      insertPayload.intake_answers = intake_answers;
      insertPayload.intake_completed_at = new Date().toISOString();
    }

    const { data: inserted, error: insertError } = await supabase
      .from("audit_requests")
      .insert(insertPayload)
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
