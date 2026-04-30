## Strategy & approach

This is a marketing-surface pivot, fully reversible. Backend infra (`cro-score` edge fn, `create-audit-checkout`, `IntakeForm`, `AuditCheckoutModal`, Stripe webhooks, `audit_requests`, `get-audit-prompt`) stays in place but stops being triggered from any visible UI. Only `cro_score_requests` gets a schema change for the new revenue qualifier.

### Strategy Call payment

You picked **Stripe Payment Link** for the $997 button. I'll:
1. Ask you to add a new `STRIPE_PRICE_ID_STRATEGY` secret (one Stripe price ID for the $997 strategy call).
2. Extend `create-audit-checkout` to support a `strategy` tier in addition to `mini`/`full`, returning a Checkout session URL.
3. Wire all "Book Strategy Call — $997" buttons to call `supabase.functions.invoke("create-audit-checkout", { body: { tier: "strategy", … } })` and `window.location` to the returned URL. No new modal — buttons go straight to Stripe Checkout (we already collect name/email there).

If you'd rather paste a raw Stripe Payment Link URL instead of using a price ID + Checkout session, say so before approving and I'll switch to a plain `<a href="…">` approach.

## Files I will change

### Marketing copy / UI

1. **`src/components/landing/HeroV2.tsx`** — new headline ("Find what's costing you tens of thousands…"), new sub-head (Loom + 30-min Q&A), new CTA "Book My Strategy Call — $997" wired to Stripe Checkout, new risk-reversal line ("if you don't book a retainer follow-up"), updated free-score link copy.

2. **`src/pages/Index.tsx`**
   - Replace `PricingSection` + `Tier` type with single Strategy Call card (Step 1 The Loom · Step 2 The Live Q&A, $997, money-back-if-no-retainer, anchor `#strategy-call`).
   - Remove `onSelectTier` prop on `PricingSection`; keep `<div id="pricing">` wrapper but also expose `id="strategy-call"` on the section itself.
   - `HeroV2` and `FinalCtaBand` keep their props; `setModalTier` stays declared so `AuditCheckoutModal` keeps working if ever re-triggered. Actually: switch `HeroV2`/`FinalCtaBand` to a new `onBookStrategy` callback that calls the strategy checkout. `AuditCheckoutModal` stays mounted but inert (`modalTier` never set).
   - FAQ updates: turnaround answer (free score 60s / Loom 48h), refund answer (refund if no retainer), replace any Mini-vs-Full Q with the new "Why $997 instead of a cheaper PDF audit?" Q.
   - Update `WhatHappensAfter`-equivalent cards (see #4).

3. **`src/components/landing/FinalCtaBand.tsx`** — repivot headline/subcopy to Strategy Call, button "Book Strategy Call — $997", refund line updated.

4. **`src/components/landing/WhatHappensAfter.tsx`** — rewrite the three card bodies and Card 3's CTA to "Book Strategy Call — $997" linking to `#strategy-call`.

5. **`src/components/landing/FudStrip.tsx`** — replace Mini/Full delivery body with "Free CRO Score in 60 seconds. Strategy Call Loom in 48 hours." Audit other badges and update any $29/$99 references.

6. **`src/components/landing/DifferentiatorSection.tsx`** — update Speed row to "60-second Free Score · 48-hour Strategy Loom". (No pricing row currently exists, so no second edit needed.)

7. **`src/components/landing/FreeScoreSection.tsx`** — add required `monthly_revenue` field as a 4-button radio group (`<25k`, `25k-100k`, `100k-500k`, `500k+`) using `sr-only` inputs for a11y; pass it in the edge-function invoke body.

8. **`src/pages/ThankYou.tsx`** — update step-3 body and hero subcopy to reference the Loom + live Q&A flow instead of Mini/Full delivery.

### Backend

9. **`supabase/functions/cro-score/index.ts`** — extend `BodySchema` with `monthly_revenue: z.enum([...])`, include in insert.

10. **`supabase/functions/create-audit-checkout/index.ts`** — add `strategy` tier mapped to `STRIPE_PRICE_ID_STRATEGY`. (Will read this file during build to confirm exact shape.)

11. **DB migration** — `ALTER TABLE public.cro_score_requests ADD COLUMN IF NOT EXISTS monthly_revenue TEXT;` plus column comment.

12. **Secret** — request `STRIPE_PRICE_ID_STRATEGY` via `add_secret`.

### Files NOT touched (intentional)

- `src/components/AuditCheckoutModal.tsx` — stays mounted in `Index`, just never opened.
- `src/components/audit/IntakeForm.tsx` — unused on landing now, kept for backend compatibility.
- `supabase/functions/get-audit-prompt/index.ts` — N8N still uses it.
- `src/pages/IntakePreview.tsx` — internal preview page, not linked from landing.

## Final sweep

After edits, ripgrep `src/` for `Mini Audit`, `Full Audit`, `Full CRO Audit`, `$29`, `$99`, `Get Mini Audit`, `Get Full Audit`, `Revenue Leak Report`, `5+ revenue-impacting fixes`, `5 revenue-impacting fixes`. Anything in user-facing copy gets updated; anything in `AuditCheckoutModal`/`IntakeForm`/`IntakePreview`/edge functions stays (backend-only).

## Deliverables on completion

1. List of every file touched + one-line note.
2. Confirmation no user-facing landing component references Mini/Full/$29/$99.
3. Confirmation Free Score form requires monthly revenue.
4. Confirmation `cro-score` edge fn + `cro_score_requests` table accept `monthly_revenue`.
5. Screenshots of new Hero, new Strategy Call pricing card, updated Free Score form (via browser tools).

## Order of operations

1. Run DB migration (await your approval).
2. Request `STRIPE_PRICE_ID_STRATEGY` secret (await you adding it).
3. Edit edge functions (`cro-score`, `create-audit-checkout`).
4. Edit all marketing components in parallel.
5. Final sweep + screenshots.
