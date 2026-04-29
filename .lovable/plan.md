# Polish Patch — audit.hlpr.io

Marketing-surface only. No backend, intake, Stripe, or Supabase changes.

> **Pre-launch gate:** patch sets turnaround to **Mini = 60 min / Full = 24 hr**. Verify with Mo that the N8N pipeline (LLM → PDF → email) hits 60 min Mini end-to-end before paid traffic. If not, fix the workflow or revert this copy.

---

## 1. Real testimonials in `WallOfLove.tsx`

- Replace fabricated 6-card grid with the **4 real clients**: Ashleigh J. (Kaizen Beauty), Mike S. (Real Estate Connect), Louis F. (Streaming4YouNow), Gloria G. (Eden Cove).
- Extend `Testimonial` interface with `title`, `company`, `photo`, `result`, `rating`, `photo_position?`.
- New card layout: photo (top-left, rounded, `object-cover`, honor `photo_position`) + name/title/company stack, 5-star rating top-right, italic quote in body, colored result chip (`bg-primary/10 text-primary`) at bottom.
- Grid becomes 2×2 (`sm:grid-cols-2`) instead of 3-col.
- Section heading → **"Real names. Real results."** Remove eyebrow disclaimer / subtitle.
- Photos imported from `@/assets/testimonials/{ashleigh-j.jpg,mike-s.png,louis-f.jpg,gloria-g.png}` (uploaded later — broken thumbs are expected until then).

## 2. New `PortfolioStrip.tsx` (11 shipped sites)

- Create `src/components/landing/PortfolioStrip.tsx` with 11 entries (Eden Cove, Voir Homme, Olara, Kaizen Beauty, Streaming4YouNow, Dunamis Marketing, Real Estate Connect, Koven, Luna's Place, LifeWork Ministries, Saved Singles Summit).
- Layout: eyebrow "The track record" → H2 "11 sites shipped. $1.2M+ in client ad spend optimized." → supporting line → responsive grid (2 / 3 / 4 cols) of browser-chrome cards (3 traffic-light dots + screenshot + brand + category).
- Wire into `Index.tsx` **between the third `ValuePropRow` and `WallOfLove`**.

## 3. Audit-arc visual signature

- Create `src/components/landing/visuals/AuditArc.tsx` — SVG circle with `strokeDasharray` computed from `arcDegrees` (default 270°), `currentColor` stroke, `-rotate-90` so the gap sits bottom-right.
- Place subtly:
  - Centered ornament (size 28, `text-primary/70`) above H2 in: HeroV2 eyebrow row, HowItWorks, DifferentiatorSection, PricingSection, FounderSection.
  - Behind each How It Works step circle: wrap step number in `relative`, add `<AuditArc className="absolute -inset-2 text-primary/40" />`.
  - Top-right of the Mini Audit pricing card (`absolute top-3 right-3 text-primary/40`).

## 4. Report-snippet step visuals in `HowItWorksSection`

Replace generic Lucide icons in `Index.tsx` `HowItWorksSection`:

- **Step 1** — keep `Globe` icon.
- **Step 2** — small score-gauge (60px circle, 3px primary border, "72" in serif/heading 22px, label "FREE CRO SCORE" 9px uppercase muted). Same SVG ring style as `ReportMockup`.
- **Step 3** — mini priorities list, three rows: numbered primary circle (16px) + title + meta:
  1. "Remove unused JS" / "$1,000/mo · High impact"
  2. "Add exit-intent popup" / "$750/mo · Quick win"
  3. "Install live chat" / "$550/mo · Quick win"

Each visual mirrors `ReportMockup` zoomed-in → "this is what you get" preview x3 before pricing.

## 5. Turnaround sweep — 60 min / 24 hr

| File | Change |
|---|---|
| `HeroV2.tsx` L34 | `leaking — in 48 hours.` → `leaking — in 60 minutes.` |
| `HeroV2.tsx` L48 | `within 48 hours` → `within 60 minutes` |
| `HeroV2.tsx` (under CTA) | Add muted line: "Delivered to your inbox in 60 minutes. Money-back if it doesn't surface 5 fixes." |
| `PainPointSection.tsx` L54 | `48 hours` → `60 minutes` |
| `FinalCtaBand.tsx` L23 | `48 hours` → `60 minutes` |
| `DifferentiatorSection.tsx` L17 | `48-hour turnaround` → `60-minute Mini Audit · 24-hour Full Audit` |
| `FudStrip.tsx` L16 | `48-hour delivery` → `60-minute delivery` |
| `Index.tsx` Mini features L118 | `Delivered within 48 hours` → `Delivered within 60 minutes` |
| `Index.tsx` Full features | `Delivered within 5 business days` → `Delivered within 24 hours` |
| `Index.tsx` FAQ L297 | `Mini Audit: within 48 hours. Full Audit: within 5 business days.` → `Mini Audit: within 60 minutes. Full Audit: within 24 hours.` |
| `pages/ThankYou.tsx` L94, L111 | `48 hours` → tier-aware copy: "60 minutes (Mini) / 24 hours (Full)". If tier isn't readable on this page, default to "60 minutes for Mini Audits, 24 hours for Full Audits." |

Final `rg -n "48 hour\|48-hour"` sweep across `src/` to confirm zero remaining.

## 6. Founder section refresh (`FounderSection.tsx`)

- Replace SVG monogram block (lines 8–18) with `<img src={founderHeadshot} alt="Tim, founder of hlpr" className="h-32 w-32 rounded-full object-cover shadow-xl shadow-primary/30 sm:h-40 sm:w-40" />`. Import from `@/assets/founder-headshot.png`.
- Append two paragraphs to story:
  - "Eleven sites live across e-com, services, and ministries. $1.2M+ in client ad spend optimized. The audit you're about to buy is the diagnostic version of the methodology."
  - "When the audit reveals something that needs hands-on work — a website rebuild, an email system overhaul, a deeper strategy call — there's a full team standing by at solutions.hlpr.io. The audit is the diagnosis. The agency is the fix." (link `solutions.hlpr.io` text).
- Update existing booking link to `https://links.hlpr.io/booking/aiMEM9Qf7GmaU0L6sTYT` (current uses leadconnectorhq).
- Add Instagram link → `https://instagram.com/hlpr.agency`.

## 7. New `WhatHappensAfter.tsx`

- Create `src/components/landing/WhatHappensAfter.tsx` with three path cards (Mail / Globe / Compass icons): weak email capture → solutions.hlpr.io email plans; broken site → website builds; deeper issues → strategy call link.
- Standard section shell (eyebrow "After the audit", H2 "Three paths forward.", supporting copy, 3-col responsive grid).
- Each card: icon, headline, body, CTA link with `ArrowRight`.
- Wire into `Index.tsx` **between `<PricingSection />` block and `FudStrip`** (i.e. immediately after the `#pricing` div, before FudStrip — keeping FAQ position downstream).

## 8. Sister-brands strip in footer (`Index.tsx`)

- Above the existing `<Footer />` content (inside `Footer` function, top of inner container, with `border-b border-border/40 pb-6 mb-6`):
  - "Sister brands: **HLPR Solutions** (full-service builds) · **HLPR for Ministries** (church websites)" with links to `https://solutions.hlpr.io` and `https://ministries.hlpr.io`. Muted styling, centered.

## 9. Methodology-name sweep

- Already clean per current scan, but re-run `rg -n "Hormozi|ThrillX|NN/g|Nielsen|ICE-scored|ICE framework"` against `src/` after all edits to confirm new copy didn't slip any in.

## 10. Asset placeholder folders

- Create `src/assets/portfolio/.gitkeep` and `src/assets/testimonials/.gitkeep`.
- Note in commit / response: 16 image files (11 portfolio, 4 testimonial, 1 founder) to be uploaded manually; broken thumbs expected until then.

---

## Technical notes

- `AuditArc` uses `currentColor` so consumers control color via `text-*` classes; `strokeDasharray` math: `visible = (arcDegrees/360) * 2π r`.
- `PortfolioStrip` and `WhatHappensAfter` follow existing section conventions: `bg-background` or `bg-muted/40` alternating, `mx-auto max-w-6xl px-5 sm:px-8 py-20 md:py-28`, primary-color uppercase eyebrow, `text-secondary` H2.
- All new copy uses semantic tokens (`text-primary`, `text-secondary`, `bg-card`, `text-muted-foreground`) — no raw colors.
- Image imports use `@/assets/...` (Vite resolves), not the literal `/src/assets/...` paths shown in the patch source.
- Testimonial photos honor `photo_position` via `object-position-{top|center}` Tailwind utility (or inline style).

## Final section order in `Index.tsx`

```
HeroV2
SocialProofBar
PainPointSection
ValuePropRow x3
PortfolioStrip                  ← NEW
WallOfLove                      ← rewritten
DifferentiatorSection
HowItWorksSection               ← snippet visuals + arcs
PricingSection (#pricing)       ← arc on Mini card
WhatHappensAfter                ← NEW
FudStrip
FounderSection                  ← real photo + new copy
FreeScoreSection
CredibilitySection
FAQSection
FinalCtaBand
Footer (with sister-brands strip)
```

## Files touched

**Created:** `PortfolioStrip.tsx`, `WhatHappensAfter.tsx`, `visuals/AuditArc.tsx`, `assets/portfolio/.gitkeep`, `assets/testimonials/.gitkeep`.

**Edited:** `WallOfLove.tsx`, `HeroV2.tsx`, `PainPointSection.tsx`, `FinalCtaBand.tsx`, `DifferentiatorSection.tsx`, `FudStrip.tsx`, `FounderSection.tsx`, `pages/Index.tsx`, `pages/ThankYou.tsx`.

## Deliverable in final reply

1. File-by-file change log.
2. Confirmation of 4 real testimonials.
3. Confirmation of 3 new components wired in.
4. Methodology-name sweep result.
5. Any positioning gaps surfaced during implementation.
