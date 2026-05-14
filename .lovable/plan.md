## Goal

Get audit.hlpr.io ranking for "CRO audit" and adjacent terms, drive ~500–2,000 organic visits/mo within 90 days, then scale. Target audience: $50K+/mo ecommerce & service businesses already running ads who want better ROI.

## Part 1 — Finish Google Search Console (today, ~5 min)

I'll automate it via the GSC connector:

1. Request a META verification token from Google
2. Add `<meta name="google-site-verification" content="...">` to `index.html`
3. **You publish** (one click)
4. I call Google's verify endpoint, then register `https://audit.hlpr.io/` as a property
5. Submit `sitemap.xml` to GSC

After that you'll see impressions/clicks data flowing in within ~48 hrs.

## Part 2 — Keyword strategy (Semrush-grounded)

Quick read on the market (Semrush, US):

| Keyword | Volume/mo | Difficulty | Play |
|---|---|---|---|
| cro consultant | 590 | 12 (very easy) | **Primary target** |
| shopify conversion rate optimization | 590 | 17 (easy) | **Primary target** |
| cro audit | 1,000 | 23 (easy) | **Already aligned with homepage** |
| conversion rate optimization agency | 2,900 | 38 | Stretch goal — needs a dedicated page |
| ecommerce conversion rate | 1,300 | 41 | Pillar blog post |
| conversion rate optimization | 18,100 | 77 (hard) | Skip — dominated by HubSpot/Shopify |

Verdict: there are 5–10 winnable terms in the 12–40 difficulty range. A new site with focused content can realistically rank top-10 for several within 60–120 days.

## Part 3 — On-page SEO fixes (week 1)

- Tighten homepage `<title>` and H1 to include "CRO audit" + value prop
- Add an internal `Article` JSON-LD-ready blog architecture
- Generate a proper `og:image` (currently uses favicon — looks broken when shared on LinkedIn/Slack)
- Add FAQ schema to homepage (already have FAQ section — just wire JSON-LD)
- Add breadcrumbs schema sitewide

## Part 4 — Programmatic landing pages (weeks 1–2)

High-leverage pages targeting commercial-intent keywords. One template, many pages, each with unique copy:

1. `/cro-audit/shopify` — "Shopify CRO Audit" (KD 17)
2. `/cro-audit/ecommerce` — "Ecommerce CRO Audit" (KD ~25)
3. `/cro-consultant` — "CRO Consultant" (KD 12)
4. `/conversion-rate-optimization-agency` — Agency page (KD 38)
5. `/cro-audit/dtc-brands` — DTC niche
6. `/free-cro-tools` — lead magnet hub (KD low, links in)

Each ~800–1,200 words, with unique testimonials/case studies, FAQ, and CTA to your existing audit funnel.

## Part 5 — Blog engine (week 2)

You picked "no blog yet — other tactics first," so I'll **defer the blog build** and focus on programmatic pages + off-site tactics. When you're ready (Month 2), simplest path is **MDX in repo** — I draft, you review in Lovable, push live. No CMS overhead.

## Part 6 — Content calendar (12 posts/mo when blog launches)

Bucketed for SEO + sales enablement:

**Bottom-funnel (4/mo) — convert ad traffic & rank for buyer terms**
- "What is a CRO Audit? (And When You Actually Need One)"
- "Shopify CRO Audit Checklist: 47 Things We Look At"
- "How Much Does a CRO Audit Cost? (Real 2026 Pricing)"
- "CRO Consultant vs Agency vs DIY: Which Should You Pick?"

**Mid-funnel (4/mo) — capture researchers**
- "Average Ecommerce Conversion Rate by Industry [2026 Data]"
- "12 Reasons Your Shopify Store Has a Low Conversion Rate"
- "Cart Abandonment: The 8 Fixes That Actually Move the Needle"
- "Mobile Conversion Rate: Why You're Losing 60% of Buyers"

**Top-funnel (2/mo) — link bait + brand**
- "We Audited 100 Shopify Stores. Here's What We Found." (data study)
- "The State of DTC Conversion Rates 2026" (annual report → backlinks)

**Comparison/Versus (2/mo) — capture solution-aware searches**
- "Hotjar vs Microsoft Clarity for CRO"
- "Best CRO Audit Tools (Free + Paid)"

## Part 7 — Off-page / link building (ongoing)

1. **Free tool as link magnet** — your existing free CRO score IS the magnet. Promote it to ecom subreddits, IndieHackers, Twitter/X
2. **Guest posts** — pitch 2/mo to ecom blogs (Littledata, ConversionXL community, Shopify Partner blog)
3. **HARO / Qwoted / Featured.com** — answer 5 journalist queries/week (10–15 min each → high-DA backlinks)
4. **Podcast tour** — 1 ecommerce podcast/mo as guest
5. **Directory submissions** — Shopify Experts, Clutch, G2 (one-time setup)

## Part 8 — Tracking & iteration

- GSC weekly: which queries are getting impressions but no clicks → rewrite titles
- Semrush monthly: track ranked keywords, find new gaps
- GA4 (if not already installed) for funnel attribution

## 90-day milestone targets

| Month | Output | Expected result |
|---|---|---|
| 1 | GSC live, 6 programmatic pages, on-page fixes, 4 backlinks | Indexed, 50–200 visits/mo |
| 2 | Blog launch + 12 posts, 8 more backlinks | 200–800 visits/mo, 1–2 audit leads |
| 3 | 12 more posts, data study, 1 podcast | 500–2,000 visits/mo, 3–8 leads |

## What I'll do right after you approve

**Phase 1 (single message, ~15 min of your time):**
1. GSC verification flow (you publish, I verify)
2. On-page SEO fixes (titles, FAQ schema, OG image)
3. Build the 6 programmatic pages with shared template
4. Update sitemap

**Phase 2 (your call when ready):**
- Blog engine + first batch of posts
- I'll draft content; you review/edit in Lovable

## Technical notes

- GSC: meta-tag verification via Lovable's `google_search_console` connector — no DNS work needed
- Programmatic pages: one `<ProgrammaticAuditPage>` component + a TS data file with per-page copy. React Router dynamic routes. Each page gets its own `<Helmet>` (already installed) for unique title/description/canonical/JSON-LD
- Sitemap: migrate from hand-edited `public/sitemap.xml` to `scripts/generate-sitemap.ts` so new programmatic pages auto-register
- OG image: generate a 1200×630 branded image with `imagegen`
- No new dependencies needed (react-helmet-async already installed)

## What I need from you

1. **Approve this plan** (or tell me what to change)
2. **Hit Publish** when I prompt you (twice — once for GSC verify, once after Phase 1 build)
3. Optional: any case-study numbers, real client names/logos I can reference in the programmatic pages