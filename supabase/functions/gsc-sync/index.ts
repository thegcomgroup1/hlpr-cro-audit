// Daily GSC sync: pulls Search Console data, writes snapshots, computes alerts.
// deno-lint-ignore-file no-explicit-any
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const GATEWAY = "https://connector-gateway.lovable.dev/google_search_console";
const SITE_URL = "https://audit.hlpr.io/";
const SITE_ENC = encodeURIComponent(SITE_URL);

function isoDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

async function gscQuery(start: string, end: string, dimensions: string[]) {
  const lovableKey = Deno.env.get("LOVABLE_API_KEY");
  const gscKey = Deno.env.get("GOOGLE_SEARCH_CONSOLE_API_KEY");
  if (!lovableKey) throw new Error("LOVABLE_API_KEY not configured");
  if (!gscKey) throw new Error("GOOGLE_SEARCH_CONSOLE_API_KEY not configured");

  const res = await fetch(`${GATEWAY}/webmasters/v3/sites/${SITE_ENC}/searchAnalytics/query`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": gscKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      startDate: start,
      endDate: end,
      dimensions,
      rowLimit: 1000,
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`GSC ${res.status}: ${JSON.stringify(data)}`);
  return data.rows ?? [];
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Fetch yesterday per page (GSC has ~2 day lag, but we'll request yesterday and accept zero rows)
    const today = new Date();
    const yest = new Date(today);
    yest.setUTCDate(yest.getUTCDate() - 2); // 2-day lag buffer
    const ystr = isoDate(yest);

    const dailyRows = await gscQuery(ystr, ystr, ["page"]);

    // Upsert daily snapshots
    if (dailyRows.length > 0) {
      const records = dailyRows.map((r: any) => ({
        snapshot_date: ystr,
        page: r.keys[0],
        clicks: r.clicks ?? 0,
        impressions: r.impressions ?? 0,
        ctr: r.ctr ?? 0,
        position: r.position ?? 0,
      }));
      const { error } = await supabase
        .from("seo_page_snapshots")
        .upsert(records, { onConflict: "snapshot_date,page" });
      if (error) throw error;
    }

    // ---- Compute alerts ----
    const alerts: Array<{ alert_type: string; page: string; message: string; metric_value: number }> = [];

    // 30-day per-page totals
    const start30 = isoDate(new Date(Date.now() - 30 * 86400000));
    const { data: snap30 } = await supabase
      .from("seo_page_snapshots")
      .select("page, clicks, impressions")
      .gte("snapshot_date", start30);

    const totals30 = new Map<string, { clicks: number; impressions: number }>();
    (snap30 ?? []).forEach((r: any) => {
      const t = totals30.get(r.page) ?? { clicks: 0, impressions: 0 };
      t.clicks += r.clicks;
      t.impressions += r.impressions;
      totals30.set(r.page, t);
    });

    // 7-day vs previous-7-day clicks
    const last7Start = isoDate(new Date(Date.now() - 7 * 86400000));
    const prev7Start = isoDate(new Date(Date.now() - 14 * 86400000));
    const prev7End = isoDate(new Date(Date.now() - 8 * 86400000));

    const { data: last7 } = await supabase
      .from("seo_page_snapshots")
      .select("page, clicks")
      .gte("snapshot_date", last7Start);
    const { data: prev7 } = await supabase
      .from("seo_page_snapshots")
      .select("page, clicks")
      .gte("snapshot_date", prev7Start)
      .lte("snapshot_date", prev7End);

    const sumByPage = (rows: any[]) => {
      const m = new Map<string, number>();
      rows.forEach((r) => m.set(r.page, (m.get(r.page) ?? 0) + r.clicks));
      return m;
    };
    const last7Map = sumByPage(last7 ?? []);
    const prev7Map = sumByPage(prev7 ?? []);

    // First impressions ever
    for (const [page, t] of totals30) {
      if (t.impressions > 0) {
        const { count } = await supabase
          .from("seo_page_snapshots")
          .select("*", { count: "exact", head: true })
          .eq("page", page)
          .lt("snapshot_date", ystr)
          .gt("impressions", 0);
        if ((count ?? 0) === 0) {
          alerts.push({
            alert_type: "first_impressions",
            page,
            message: `New page started showing in Google search`,
            metric_value: t.impressions,
          });
        }
      }
    }

    // Crossed 100 impressions (30-day rolling)
    for (const [page, t] of totals30) {
      if (t.impressions >= 100) {
        // Was previous total < 100?
        const prevTotal = t.impressions - (dailyRows.find((r: any) => r.keys[0] === page)?.impressions ?? 0);
        if (prevTotal < 100) {
          alerts.push({
            alert_type: "crossed_100",
            page,
            message: `Page crossed 100 impressions (30-day)`,
            metric_value: t.impressions,
          });
        }
      }
    }

    // Clicks drop > 50%
    for (const [page, prevClicks] of prev7Map) {
      if (prevClicks >= 10) {
        const cur = last7Map.get(page) ?? 0;
        if (cur < prevClicks * 0.5) {
          const dropPct = Math.round((1 - cur / prevClicks) * 100);
          alerts.push({
            alert_type: "clicks_drop",
            page,
            message: `Clicks dropped ${dropPct}% week-over-week (${prevClicks} → ${cur})`,
            metric_value: dropPct,
          });
        }
      }
    }

    // Low CTR with >500 impressions
    for (const [page, t] of totals30) {
      if (t.impressions > 500) {
        const ctr = t.impressions ? t.clicks / t.impressions : 0;
        if (ctr < 0.02) {
          alerts.push({
            alert_type: "low_ctr",
            page,
            message: `CTR ${(ctr * 100).toFixed(2)}% on ${t.impressions} impressions — improve title/meta`,
            metric_value: Number((ctr * 100).toFixed(2)),
          });
        }
      }
    }

    // Insert alerts (dedupe: skip if same type+page exists in last 7 days)
    let inserted = 0;
    for (const a of alerts) {
      const sevenAgo = new Date(Date.now() - 7 * 86400000).toISOString();
      const { count } = await supabase
        .from("seo_alerts")
        .select("*", { count: "exact", head: true })
        .eq("alert_type", a.alert_type)
        .eq("page", a.page)
        .gte("created_at", sevenAgo);
      if ((count ?? 0) === 0) {
        const { error } = await supabase.from("seo_alerts").insert(a);
        if (!error) inserted++;
      }
    }

    return new Response(
      JSON.stringify({
        ok: true,
        synced_date: ystr,
        rows: dailyRows.length,
        alerts_evaluated: alerts.length,
        alerts_inserted: inserted,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error("gsc-sync error:", e);
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
