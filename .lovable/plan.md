# HLPR Landing Page Overhaul + Universal Audit Mega-Prompt + Intake Form

Built from: ThrillX 3-video framework, Hormozi value equation, ThrillX prompt doc, ThrillX **B2B/General V1** wireframe (best fit for HLPR — service business, not pure e-com), and existing brand rules (lowercase "hlpr" logo, primary blue + dark navy, SVG/Lucide only, **no stock photography**).

Three parts, one build:
1. Landing page rebuild (`/`)
2. Universal audit "mega prompt" template (DB-stored, versioned)
3. Structured intake form that feeds the mega-prompt

---

## Part 1 — Landing page rebuild (`/`)

### Section order (mirrors ThrillX B2B/General V1)

```text
1.  Sticky nav                          (keep — already correct)
2.  Hero / above-the-fold               (REBUILD — new ATF formula)
3.  Social proof bar                    (NEW — logos + stat row, just below fold)
4.  Pain-point section                  (NEW — Problem / Agitate / Solve)
5.  Value Prop #1 + visual              (NEW — alternating image/text)
6.  Value Prop #2 + visual              (NEW)
7.  Value Prop #3 + visual              (NEW)
8.  Wall of Love                        (NEW — 6 testimonials, objection-tagged)
9.  Benefit-driven differentiator       (NEW — "how you do it differently")
10. How It Works (3 steps)              (keep, tighten)
11. Pricing (3 tiers)                   (REWORK — anchoring + middle-option bias)
12. FUD elimination strip               (NEW — money-back, secure, 48h, no hidden fees)
13. Founder section                     (NEW — humanize the brand)
14. Free CRO Score form                 (MOVED here from hero — soft fallback)
15. Credibility stats                   (keep)
16. FAQ                                 (EXPAND — 8 questions, niche objections)
17. Final CTA band                      (NEW — repeat hero CTA + risk reversal)
18. Footer                              (keep)
```

### Above-the-fold formula (Video 3, Trick #3 — the highest-leverage section)

Four mandatory pieces:

1. **Headline** (3–4× body size, Hormozi formula = dream outcome + functional benefit + timeframe + mechanism):
   - *"Find the $4K–$8K/month your store is leaking — in 48 hours, with a data-driven CRO audit."*
2. **Sub-headline** (pain → unique mechanism → time-bound benefit, per ThrillX prompt):
   - *"Stop guessing why visitors don't convert. We audit your homepage, product pages, checkout, mobile UX, email capture, and site speed, then hand you a prioritized fix list with revenue-impact estimates within 48 hours."*
3. **Single, obvious, benefit-led CTA**:
   - Primary: *"Get My Revenue Leak Report — $29"* → opens checkout modal (Mini)
   - Secondary text link below: *"Or get a free CRO score first ↓"* → smooth-scroll to free form
4. **Supporting visual** demonstrating the deliverable — an **SVG mockup of the audit report** (stylized PDF preview: HLPR header, score gauge, scored category list, sample finding card). Pure SVG + Tailwind, no stock photos.

Plus directly under the CTA:
- **Risk reversal**: *"100% money-back if we don't surface at least 5 revenue-impacting fixes."*
- **Inline social proof row**: ★★★★★ "$916K Google Ads · $170K via email · 68% open rates"

### Visual hierarchy & scannability rules (Tricks #4 and #10)

- Headlines 3–4× body size (target: 48–57px desktop hero, 16px body).
- Replace any paragraph >3 lines with bullet rows + Lucide icons.
- Primary blue used for CTAs only — never for body links inside cards.
- Bold every dollar figure, percentage, and timeframe (`$4K–$8K`, `48h`, `$29`, `100%`).
- One accent color, max 2 type weights per section.

### Pricing section rework (Trick #6 reduction + Trick #7 anchoring)

- Add `compare at` strikethrough prices: Mini **$29** (was ~~$79~~), Full **$99** (was ~~$249~~).
- Make Mini visually dominant (middle-option bias) — slightly larger card, "Most Popular" badge already exists.
- Demote the free-score tier card to a low-prominence text link at the bottom of the pricing section ("Not ready? Get a free CRO score instead →"). Removes a competing CTA from this critical section.
- "You save $X" called out in the headline of each card, not buried in body (Trick #7 — don't make users do math).

### What gets removed (Trick #6 — reduction)

- Hero URL+email form (moved down to a dedicated free-score section).
- The 4 trust-badge chips below the hero form (redundant with new social-proof row).
- Free-score tier card at the top of pricing (becomes a footer link in pricing).

### Files touched (Part 1)

- **Edit** `src/pages/Index.tsx` — restructure to the section order above.
- **New** `src/components/landing/HeroV2.tsx`
- **New** `src/components/landing/ReportMockup.tsx` — reusable SVG of the audit deliverable
- **New** `src/components/landing/SocialProofBar.tsx`
- **New** `src/components/landing/PainPointSection.tsx` — PAS framework
- **New** `src/components/landing/ValuePropRow.tsx` — reusable alternating image/text
- **New** `src/components/landing/WallOfLove.tsx` — 6 testimonial cards w/ objection tags + `TODO_TESTIMONIAL` placeholders
- **New** `src/components/landing/DifferentiatorSection.tsx`
- **New** `src/components/landing/FudStrip.tsx` — 4 trust icons
- **New** `src/components/landing/FounderSection.tsx`
- **New** `src/components/landing/FreeScoreSection.tsx` — relocates the URL+email form
- **New** `src/components/landing/FinalCtaBand.tsx`
- No new dependencies. All visuals = SVG + Lucide, per brand rules.

---

## Part 2 — Universal HLPR Audit Mega-Prompt (template engine)

One prompt that, given a filled intake form, produces a real CRO audit for **any business in any niche** — not just e-com. n8n calls this after Stripe payment lands.

### Where it lives

- **New table** `audit_prompt_templates` (versioned, so prompts can iterate without breaking n8n):
  - `id uuid pk`, `version text` (e.g. `v1.0`), `tier text` (`mini` | `full`), `system_prompt text`, `user_prompt_template text`, `is_active boolean`, `created_at`
  - RLS: service-role read only; no public access.
- **New edge function** `get-audit-prompt` — returns the active template for `?tier=mini|full`. n8n calls this instead of hard-coding the prompt, so prompt updates happen in the DB, not in n8n.

### Mega-prompt structure (stored in `user_prompt_template`)

Generalized beyond e-com using ThrillX prompt-doc patterns + Hormozi value equation. `{{variable}}` placeholders get filled from the intake row.

```text
You are a senior CRO strategist who has audited 400+ landing pages across
80+ niches. Deliver a {{tier}} CRO audit of {{business_name}} ({{website_url}})
that surfaces revenue-impacting fixes the owner can act on this week.

BUSINESS CONTEXT
- Industry / niche: {{industry}}
- Business model: {{business_model}}   (e-com | services | SaaS | local | info-product | other)
- Primary offer: {{primary_offer}}
- AOV / contract value: {{aov}}
- Monthly traffic: {{monthly_traffic}}
- Current conversion rate (if known): {{current_cvr}}
- Top customer pain points: {{pain_points}}
- Top objections heard: {{top_objections}}
- Existing social-proof assets: {{social_proof_assets}}
- Primary KPI the owner cares about: {{primary_kpi}}
- What the owner has already tried: {{prior_attempts}}

DELIVERABLE
Use the Hormozi value equation (dream outcome × likelihood ÷ time × effort)
as the lens for every recommendation. Apply the ThrillX 11 quick wins where
relevant.

1. EXECUTIVE SUMMARY  (3–5 sentences, biggest leak first, dollar impact.)
2. OVERALL CRO SCORE  (0–100, plus sub-scores: ATF, social proof, visual
   hierarchy, offer clarity, FUD reduction, mobile UX, speed, checkout/lead
   capture flow.)
3. TOP {{finding_count}} FINDINGS  (each: what's wrong, why it costs money,
   the fix, revenue-impact range, effort 1–5, priority 1–5.)
4. PRIORITIZED ACTION PLAN  (sequenced by impact ÷ effort.)
5. NEXT STEPS  (free → mini → full → retainer upsell tailored to KPI.)

STYLE
- Direct response voice. No em dashes. No clever wordplay.
- Bold every dollar figure, percentage, timeframe.
- Every recommendation answers "what's in it for me" for the visitor.
- Mark unsubstantiated claims [NEEDS VERIFICATION] rather than inventing.

TIER RULES
- mini → 10–15 findings, 1500–2500 words.
- full → 25+ findings, 4000–6000 words, include wireframe descriptions for
  the top 5 fixes.
```

### End-to-end flow

```text
Customer fills intake → Stripe checkout → webhook → n8n
n8n: GET active prompt from get-audit-prompt
n8n: GET intake answers from audit_requests by stripe_session_id
n8n: substitute {{vars}} → call LLM → render PDF → email
n8n: PATCH audit_requests.payment_status = 'completed'
```

You stay in full control: edit the prompt row → next audit uses the new version. No n8n redeploy.

### Files / DB touched (Part 2)

- **New migration** — `audit_prompt_templates` table + RLS + seed v1.0 mini & full rows.
- **New edge function** `supabase/functions/get-audit-prompt/index.ts` (service-role only).
- No frontend admin UI in v1 — edit the row directly via the backend view. Admin page can come later if you want it.

---

## Part 3 — Universal intake form

Captures every variable the mega-prompt needs. Replaces the current 2-field hero form **for paid tiers only** — the free CRO score keeps the simple URL+email form (low friction is correct there).

### Where it appears

- **Mini & Full purchases**: shown inside `AuditCheckoutModal` as **Step 1**, *before* Stripe. Pay button stays disabled until intake validates. Answers stored on the `audit_requests` row so n8n has them when the webhook fires.
- **Free CRO score**: keep the 2-field form (URL + email) unchanged.

### Fields (~12 questions, ~2 minutes)

1. **Business**: Website URL · Business name · Industry (single-select + "Other") · Model (e-com/services/SaaS/local/info/other)
2. **Offer & economics**: Primary offer (1 sentence) · AOV/contract value · Monthly traffic (range select) · Current CVR (optional)
3. **Customer insight**: Top 3 customer pain points · Top objections you hear · What you've already tried (optional)
4. **Goals**: Primary KPI (radio) · Anything else? (optional)
5. **Contact**: Email (prefilled) · Best follow-up contact (optional)

### Friction-reduction patterns (from videos)

- Single column, big inputs, generous spacing.
- Multi-step with progress indicator ("Step 2 of 4").
- Inline validation (no form-wide error on submit).
- "Why we ask" tooltips on harder fields (AOV, CVR).
- Risk-reversal copy directly above the pay button.

### Files touched (Part 3)

- **New migration** — add `intake_answers jsonb`, `intake_completed_at timestamptz` to `audit_requests`.
- **New** `src/components/audit/IntakeForm.tsx` — multi-step with progress bar.
- **Edit** `src/components/AuditCheckoutModal.tsx` — IntakeForm becomes Step 1; Stripe redirect becomes Step 2.
- **Edit** `supabase/functions/create-audit-checkout/index.ts` — accept and persist intake payload.

---

## Summary of everything created/edited

**Frontend** (12 new components, 2 edits)
- New: `HeroV2`, `ReportMockup`, `SocialProofBar`, `PainPointSection`, `ValuePropRow`, `WallOfLove`, `DifferentiatorSection`, `FudStrip`, `FounderSection`, `FreeScoreSection`, `FinalCtaBand`, `IntakeForm`
- Edit: `Index.tsx`, `AuditCheckoutModal.tsx`

**Backend (Lovable Cloud)**
- New table: `audit_prompt_templates` (versioned prompts, RLS = service-role only)
- New columns on `audit_requests`: `intake_answers jsonb`, `intake_completed_at timestamptz`
- New edge function: `get-audit-prompt`
- Edit edge function: `create-audit-checkout` (persists intake before Stripe redirect)

**Out of scope (n8n owns)**
- LLM call, PDF render, email send, `payment_status` flip. We just hand n8n clean data + the active prompt.

After approval I'll build Part 1 (landing page) first so you can see it live, then Parts 2 & 3 in the same loop. End state: new ATF → click pay → multi-step intake → Stripe → thank-you page → n8n picks it up with everything it needs.
