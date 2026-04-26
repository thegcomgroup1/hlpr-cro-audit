import { createClient } from "jsr:@supabase/supabase-js@2";
import { corsHeaders } from "jsr:@supabase/supabase-js@2/cors";

/**
 * Returns the active mega-prompt for a given tier.
 *
 * SECURITY: Service-role only. The Authorization header MUST contain the
 * Supabase service-role key. This function is called by n8n (or other backend
 * automations) — never directly by the browser. Returning prompt IP to the
 * public would let competitors scrape it.
 *
 * Usage:
 *   GET /get-audit-prompt?tier=mini
 *   Authorization: Bearer <service-role-key>
 */
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "GET") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Validate service-role key
  const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const authHeader = req.headers.get("authorization") ?? "";
  const presentedKey = authHeader.replace(/^Bearer\s+/i, "").trim();

  if (!SERVICE_ROLE_KEY || !presentedKey || presentedKey !== SERVICE_ROLE_KEY) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Validate tier param
  const url = new URL(req.url);
  const tier = url.searchParams.get("tier");
  if (tier !== "mini" && tier !== "full") {
    return new Response(
      JSON.stringify({ error: "Query param 'tier' must be 'mini' or 'full'" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      SERVICE_ROLE_KEY,
    );

    const { data, error } = await supabase
      .from("audit_prompt_templates")
      .select("id, version, tier, system_prompt, user_prompt_template, notes, created_at")
      .eq("tier", tier)
      .eq("is_active", true)
      .maybeSingle();

    if (error) {
      console.error("DB error:", error);
      return new Response(JSON.stringify({ error: "Database error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!data) {
      return new Response(
        JSON.stringify({ error: `No active prompt found for tier '${tier}'` }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(JSON.stringify(data), {
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
