/**
 * Single source of truth for the HLPR Founder Strategy Call funnel.
 *
 * - STRIPE_PAYMENT_LINK is the public Stripe Payment Link the user clicks.
 *   Stripe collects payment, then auto-redirects to the GHL booking calendar
 *   per the Confirmation Page setting in the Stripe dashboard.
 *
 * - STRATEGY_CALL_BOOKING_LINK is referenced for any non-Stripe paths (e.g.
 *   the founder section button or the audit cross-link from solutions.hlpr.io
 *   if we ever surface a "book without paying" path for high-trust referrals).
 */

export const STRIPE_PAYMENT_LINK =
  "https://book.stripe.com/8x24gsgmTa1CgUQadG8IU02";

export const STRATEGY_CALL_BOOKING_LINK =
  "https://links.hlpr.io/booking/TO8SkIKU2m4j6qJjvnA4/sv/69f3cac89a99e04cc6338d42";
