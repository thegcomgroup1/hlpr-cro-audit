
# Mega-Prompt v2 + Branded Intake Form

Goal: ship a single universal "mega-prompt" template that can audit ANY business/niche, plus a redesigned intake form that captures every variable the prompt needs — branded, friction-light, with CRO trust elements at every step.

---

## Part 1 — The Mega-Prompt (universal CRO audit template)

Stored as a new active row in `audit_prompt_templates` (version `v2.0`, the v1.0 row gets `is_active = false`). Two tiers (`mini`, `full`) share the same intake schema; the `full` prompt unlocks more sections and deliverables.

### Variables the prompt consumes (must match intake form 1:1)

```text
{{business_name}}            {{industry}}                {{business_model}}
{{primary_offer}}            {{dream_outcome}}           {{target_customer}}
{{aov}}                      {{monthly_traffic}}         {{current_cvr}}
{{primary_kpi}}              {{secondary_kpi}}
{{pain_points}}              {{top_objections}}          {{social_proof_assets}}
{{competitors}}              {{differentiator}}
{{prior_attempts}}           {{traffic_sources}}
{{website_url}}              {{additional_notes}}
```

### Prompt structure (system + user template)

System prompt — sets persona, frameworks, output contract:
- Persona: "You are HLPR, a senior CRO strategist trained on the ThrillX 4-step landing page method (Hook → Problem → Solution → CTA), Hormozi's Value Equation (Dream Outcome × Likelihood ÷ Time × Effort), and 11 quick-win conversion levers (above-fold clarity, social proof density, hero contrast 3–4x, FUD strip, sticky CTA, objection-defusing testimonials, risk reversal, urgency, mobile-first, page speed, copy specificity)."
- Rules: cite the section of the page being audited, quantify revenue impact in dollars when possible (uses `aov × monthly_traffic × CVR delta`), prioritize fixes by ICE score, output strict JSON.
- Output contract (JSON schema): `summary`, `cro_score` (0–100), `top_issues[]` (with section, severity, evidence, recommendation, ICE, est_revenue_lift_monthly_usd), `quick_wins[]` (mini tier stops here), `framework_audit` (full tier only — Hook/Problem/Solution/CTA + Value Equation breakdown), `priority_action_plan[]` (full tier only).

User template — interpolates intake answers + scraped page data into a brief the model can act on. Includes a "Voice of Customer" section (pain_points + objections), an "Economics" section (aov × traffic for revenue math), and a "Constraints" section (prior_attempts so we don't re-recommend what failed).

Mini tier returns 5 quick wins + score. Full tier returns the complete framework audit + 90-day action plan.

### Seeding

Insert two new rows via the insert tool (data, not schema): `v2.0 / mini / active=true` and `v2.0 / full / active=true`. Flip the existing v1.0 rows to `is_active = false`. The `get-audit-prompt` edge function already reads `is_active=true` so n8n picks up v2 automatically.

---

## Part 2 — Branded, CRO-optimized intake form

Redesign `src/components/audit/IntakeForm.tsx` from a generic 4-step form into a 5-step branded experience that doubles as a conversion asset. Every step has a trust/CRO element and the heaviest fields are deferred until commitment is high.

### Step layout (progressive friction)

```text
Step 1 — Quick Win    (lowest friction, builds momentum)
  • Business name
  • Industry (chips)
  • Business model (chips)
  → Trust element: "🔒 Takes ~2 min. 100% money-back guarantee."

Step 2 — The Offer    (still easy)
  • Primary offer (1 sentence)
  • Dream outcome for your customer  ← NEW (Hormozi)
  • Target customer (1 sentence)     ← NEW
  → Trust element: avatar row "Join 200+ founders who got their audit"

Step 3 — Economics    (the "why we ask" step)
  • AOV / contract value  (with $ revenue-impact tooltip)
  • Monthly traffic (range chips)
  • Current CVR (optional)
  • Primary traffic source ← NEW (chips: Paid ads / SEO / Social / Email / Other)
  → Trust element: "We use these numbers to estimate $ lift per fix."

Step 4 — Voice of Customer    (the gold)
  • Top 3 pain points
  • Top objections before they buy
  • Social proof assets you have ← NEW (chips multi: reviews, case studies, press, none)
  • Main competitor + your differentiator ← NEW (2 short fields)
  → Trust element: testimonial card "This is the question that unlocked our 2.3x lift" — Sarah, DTC founder

Step 5 — Goals & Anything Else    (commitment + finish line)
  • Primary KPI (chips)
  • Secondary KPI (chips, optional) ← NEW
  • What you've already tried (optional)
  • Anything else (optional)
  → Trust element: green checkmark stack — "✓ Encrypted  ✓ Never shared  ✓ Delivered in 24h"
  → CTA: "Continue to Secure Checkout →"
```

### Branding & UX upgrades (vs. current form)

- Brand: HLPR primary blue header band per step, rounded chip-style selectors (replace native `<select>` for Industry, Traffic, Traffic source), iconography from `lucide-react` per step, smooth step transitions.
- Friction reducers: chips/radios over text where possible; only 4 fields require typing per step max; tooltips kept for "why we ask" copy.
- CRO trust elements per step (see above) — mini testimonial / guarantee / encryption row rotated so the user always sees a reason to keep going.
- Persistent footer: progress bar (already exists), money-back badge, tier + price ("Full Audit — $99 • 24h delivery").
- Mobile: chips wrap to 2-col, sticky bottom CTA bar on small screens.
- Save-on-blur to `localStorage` so a refresh doesn't lose answers (key: `hlpr_intake_draft`).
- Validation: inline, friendly, no red until blur.

### Field → Prompt variable mapping (1:1 contract)

```text
business_name        → {{business_name}}
industry             → {{industry}}
business_model       → {{business_model}}
primary_offer        → {{primary_offer}}
dream_outcome        → {{dream_outcome}}            NEW
target_customer      → {{target_customer}}          NEW
aov                  → {{aov}}
monthly_traffic      → {{monthly_traffic}}
current_cvr          → {{current_cvr}}
traffic_sources      → {{traffic_sources}}          NEW
pain_points          → {{pain_points}}
top_objections       → {{top_objections}}
social_proof_assets  → {{social_proof_assets}}      NEW
competitors          → {{competitors}}              NEW
differentiator       → {{differentiator}}           NEW
primary_kpi          → {{primary_kpi}}
secondary_kpi        → {{secondary_kpi}}            NEW
prior_attempts       → {{prior_attempts}}
additional_notes     → {{additional_notes}}
website_url          → {{website_url}}              (already collected in modal step 1)
```

---

## Part 3 — Backend wiring

- `IntakeAnswers` interface in `IntakeForm.tsx` extended with the 7 new fields above.
- `create-audit-checkout/index.ts`: extend the `IntakeAnswers` interface and the field-length-capped allowlist to include the new keys. Already stores everything to `audit_requests.intake_answers` as JSONB — no schema change needed (jsonb is open).
- `audit_prompt_templates`: insert v2 mini + v2 full rows; deactivate v1. n8n keeps using `get-audit-prompt?tier=…` and now receives v2.
- No DB migration needed; only data inserts.

---

## Technical details

- Files created/edited:
  - edit `src/components/audit/IntakeForm.tsx` — restructure to 5 steps, add chip selectors, trust elements, new fields, localStorage draft.
  - edit `src/components/AuditCheckoutModal.tsx` — minor: pass tier label/price into IntakeForm footer.
  - edit `supabase/functions/create-audit-checkout/index.ts` — extend `IntakeAnswers` keys.
  - data insert (no migration) — seed v2 mini + full prompts in `audit_prompt_templates`, deactivate v1.
- The `get-audit-prompt` edge function and DB schema do not change.
- Output contract for n8n stays JSON; n8n's templating engine substitutes `{{variable}}` from the audit_request row's `intake_answers` jsonb + top-level `website_url`.

