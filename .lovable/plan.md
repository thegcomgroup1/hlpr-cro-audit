## Goal

Replace the current `/dashboard/seo` UI with the polished dashboard from the **HLPR Ministries** project — KPI cards with 28d-vs-prior deltas, 90-day trend chart, Top queries / Top pages, Opportunity queries (CTR-vs-baseline), and Sitemap coverage — pointed at `audit.hlpr.io`.

## What changes

### 1. New edge function: `gsc-analytics`
Single endpoint that returns one payload the dashboard renders. Pulls live from the Search Console connector (no DB round-trips, no 1–2 day snapshot lag). 5-min in-memory cache.

Returns:
- `range` / `previousRange` (last 28d, prior 28d)
- `current` / `previous` totals
- `trend` — daily clicks + impressions, last 90 days
- `queries` — top 25 by impressions, last 28d
- `pages` — top 25 by clicks, last 28d
- `opportunities` — query+page rows, last 28d
- `sitemaps` — `/webmasters/v3/sites/{site}/sitemaps` list

Auth: requires a logged-in admin (verifies JWT + `has_role(uid, 'admin')`). No password gate — we already have Supabase auth working.

### 2. Rewrite `src/pages/SeoDashboard.tsx`
Port the Ministries layout 1:1, adapted to this project:
- Header: "SEO Dashboard · audit.hlpr.io · {start} → {end}", Refresh + Sign out buttons
- 4 KPI cards (Clicks / Impressions / CTR / Avg position) with up/down delta vs prior 28d (lower-is-better for position)
- Daily clicks & impressions area chart (recharts, 90 days, dual axis)
- Two-column: Top queries + Top pages tables
- Opportunity queries card (position 5–20, ≥100 impressions, CTR < 80% of position baseline)
- Sitemap coverage card
- Keep the existing admin-role check + redirect-to-/auth guard

### 3. Keep, but de-emphasize, the alerts system
The `seo_alerts` + `seo_page_snapshots` tables and the daily `gsc-sync` cron stay (they power the email alerts you already wired up). The dashboard just stops rendering the alerts list and snapshot table — the alerts still fire by email. If you'd rather rip them out entirely, say so and I'll drop them in step 2.

## Technical notes

- `recharts` is already a dependency (used by `components/ui/chart.tsx`) — no new packages.
- Connector gateway calls reuse the existing pattern from `gsc-sync/index.ts` (`LOVABLE_API_KEY` + `X-Connection-Api-Key`, site = `https://audit.hlpr.io/`).
- Edge function uses `verify_jwt = true` (default) so `supabase.functions.invoke` from the browser passes the user JWT; inside the function we double-check the admin role with the service-role client.
- 5-min cache keyed by date range, in-memory per isolate — enough to make Refresh feel instant without hammering GSC quota.

## Open question

Want me to **remove** the alerts+snapshots tables/cron entirely (simpler, but you lose the daily email alerts), or **keep them running in the background** and just hide them from the dashboard? Default is keep.
