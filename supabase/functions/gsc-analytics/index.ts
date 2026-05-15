// Live GSC analytics for the SEO dashboard. Pulls multiple slices in parallel
// and returns a single payload. Admin-only.
// deno-lint-ignore-file no-explicit-any
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const GATEWAY = "https://connector-gateway.lovable.dev/google_search_console";
const SITE_URL = "https://audit.hlpr.io/";
const SITE_ENC = encodeURIComponent(SITE_URL);

function isoDate(d: Date) {
  return d.toISOString().slice(0, 10);
}
function daysAgo(n: number) {
  return isoDate(new Date(Date.now() - n * 86400000));
}

async function gscQuery(body: Record<string, unknown>) {
  const lovableKey = Deno.env.get("LOVABLE_API_KEY");
  const gscKey = Deno.env.get("GOOGLE_SEARCH_CONSOLE_API_KEY");
  if (!lovableKey || !gscKey) throw new Error("GSC connector not configured");
  const res = await fetch(
    `${GATEWAY}/webmasters/v3/sites/${SITE_ENC}/searchAnalytics/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": gscKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );
  const data = await res.json();
  if (!res.ok) throw new Error(`GSC ${res.status}: ${JSON.stringify(data)}`);
  return data;
}

async function gscSitemaps() {
  const lovableKey = Deno.env.get("LOVABLE_API_KEY");
  const gscKey = Deno.env.get("GOOGLE_SEARCH_CONSOLE_API_KEY");
  const res = await fetch(
    `${GATEWAY}/webmasters/v3/sites/${SITE_ENC}/sitemaps`,
    {
      headers: {
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": gscKey,
      },
    },
  );
  if (!res.ok) return { sitemap: [] };
  return await res.json();
}

// 5-min in-memory cache per isolate
const cache = new Map<string, { at: number; data: unknown }>();
const TTL = 5 * 60 * 1000;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    // Verify caller is an admin
    const authHeader = req.headers.get("Authorization") ?? "";
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { global: { headers: { Authorization: authHeader } } },
    );
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id);
    const isAdmin = (roles ?? []).some((r: any) => r.role === "admin");
    if (!isAdmin) {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Date ranges (GSC has ~2 day lag)
    const end = daysAgo(2);
    const start = daysAgo(2 + 28);
    const prevEnd = daysAgo(2 + 29);
    const prevStart = daysAgo(2 + 28 + 28);
    const trendStart = daysAgo(2 + 90);

    const cacheKey = `${start}-${end}`;
    const hit = cache.get(cacheKey);
    if (hit && Date.now() - hit.at < TTL) {
      return new Response(JSON.stringify(hit.data), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const [current, previous, trend, queries, pages, opportunities, sitemaps] =
      await Promise.all([
        gscQuery({ startDate: start, endDate: end }),
        gscQuery({ startDate: prevStart, endDate: prevEnd }),
        gscQuery({ startDate: trendStart, endDate: end, dimensions: ["date"], rowLimit: 100 }),
        gscQuery({ startDate: start, endDate: end, dimensions: ["query"], rowLimit: 25 }),
        gscQuery({ startDate: start, endDate: end, dimensions: ["page"], rowLimit: 25 }),
        gscQuery({ startDate: start, endDate: end, dimensions: ["query", "page"], rowLimit: 250 }),
        gscSitemaps(),
      ]);

    const payload = {
      range: { start, end },
      previousRange: { start: prevStart, end: prevEnd },
      current,
      previous,
      trend,
      queries,
      pages,
      opportunities,
      sitemaps,
    };

    cache.set(cacheKey, { at: Date.now(), data: payload });

    return new Response(JSON.stringify(payload), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("gsc-analytics error", e);
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
