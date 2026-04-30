# Wire Strategy Call CTAs to Stripe Payment Link

Replace the current `window.prompt()` + `create-audit-checkout` edge-function flow with direct anchor links to the Stripe Payment Link. Centralize the URLs in one config file. Defaults: send sticky-nav straight to Stripe (Option default), and update the founder section to the new $997 calendar (Option A).

## Files to create

**`src/lib/strategy-call.ts`** (new)
- Export `STRIPE_PAYMENT_LINK = "https://book.stripe.com/8x24gsgmTa1CgUQadG8IU02"`
- Export `STRATEGY_CALL_BOOKING_LINK = "https://links.hlpr.io/booking/TO8SkIKU2m4j6qJjvnA4/sv/69f3cac89a99e04cc6338d42"`
- Header comment documenting that Stripe handles the post-payment redirect via dashboard config.

## Files to edit

**`src/pages/Index.tsx`**
- Add `import { STRIPE_PAYMENT_LINK } from "@/lib/strategy-call"`.
- Delete the entire `StrategyCallButton` component (lines 155–208) and its `window.prompt` checkout logic.
- Remove now-unused imports: `useState` (verify no other usage in file), `supabase` from `@/integrations/supabase/client`, and `toast` from `@/hooks/use-toast` if not referenced elsewhere.
- In `PricingSection`, replace `<StrategyCallButton …>Book Strategy Call — $997</StrategyCallButton>` (line 305) with an `<a href={STRIPE_PAYMENT_LINK} target="_blank" rel="noopener noreferrer">` styled identically (minus `disabled:opacity-70`).
- In the sticky nav (line 522), change `href="#strategy-call"` to `href={STRIPE_PAYMENT_LINK}` and add `target="_blank" rel="noopener noreferrer"`.

**`src/components/landing/HeroV2.tsx`**
- Imports: drop `Loader2`, `useState`, `supabase`, `toast`. Add `import { STRIPE_PAYMENT_LINK } from "@/lib/strategy-call"`.
- Delete the `loading` state and `handleBookStrategy` function.
- Replace the primary CTA `<button>` with `<a href={STRIPE_PAYMENT_LINK} target="_blank" rel="noopener noreferrer">` styled identically (drop the spinner + `disabled:opacity-70`).

**`src/components/landing/FinalCtaBand.tsx`**
- Add `import { STRIPE_PAYMENT_LINK } from "@/lib/strategy-call"`.
- Delete the `handleClick` scroll function.
- Replace the `<button onClick={handleClick}>` with `<a href={STRIPE_PAYMENT_LINK} target="_blank" rel="noopener noreferrer">` styled identically.

**`src/components/landing/WhatHappensAfter.tsx`**
- Add `import { STRIPE_PAYMENT_LINK } from "@/lib/strategy-call"`.
- For the third path entry (the "deeper systemic issues" card): change `href: "#strategy-call"` to `href: STRIPE_PAYMENT_LINK` and `external: true` so the existing render path applies `target="_blank" rel="noopener noreferrer"`.

**`src/components/landing/FounderSection.tsx`**
- Add `import { STRATEGY_CALL_BOOKING_LINK } from "@/lib/strategy-call"`.
- Replace the line-82 `href="https://links.hlpr.io/booking/aiMEM9Qf7GmaU0L6sTYT"` with `href={STRATEGY_CALL_BOOKING_LINK}`. Keep label, icon, and styling.

**`src/pages/ThankYou.tsx`**
- Add `import { STRATEGY_CALL_BOOKING_LINK } from "@/lib/strategy-call"`.
- Change `const BOOKING_URL = "https://api.leadconnectorhq.com/widget/booking/aiMEM9Qf7GmaU0L6sTYT"` to `const BOOKING_URL = STRATEGY_CALL_BOOKING_LINK`.

## Sweeps after edits

1. `rg "aiMEM9Qf7GmaU0L6sTYT" src/` — expect zero hits in audit-page code paths after the founder + thank-you updates.
2. `rg "create-audit-checkout|tier.*\"strategy\"|window\\.prompt" src/` — expect zero hits.
3. `rg "STRIPE_PRICE_ID_STRATEGY" src/` — expect zero hits (frontend no longer depends on it).

The `create-audit-checkout` edge function is left untouched (dormant strategy branch preserved).

## Out of scope

- Stripe dashboard "After payment" redirect config (Part 2 of the patch — done by user, not code).
- End-to-end test in Stripe test mode (Part 3 — manual QA by user).

## Deliverables on completion

1. List of files touched + one-liner per file.
2. Confirmation no `window.prompt()` remains for the strategy call.
3. Confirmation no frontend code references `STRIPE_PRICE_ID_STRATEGY` or `create-audit-checkout`.
4. Confirmation Hero, Pricing card, Sticky nav, FinalCtaBand, and WhatHappensAfter card 3 all link to `STRIPE_PAYMENT_LINK`.
5. Confirmation FounderSection uses `STRATEGY_CALL_BOOKING_LINK`.
