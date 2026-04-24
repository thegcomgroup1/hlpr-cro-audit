

## Add `/thank-you` confirmation page

After Stripe checkout completes, customers are redirected to `https://audit.hlpr.io/thank-you?session_id=cs_live_...`. Right now that route falls through to the 404 page. I'll add a clean, branded confirmation page that matches the existing site.

### What the user sees

- **Sticky nav**: same Logo + "Get Your Score" button as the landing page (consistent header)
- **Hero**: large brand-blue checkmark icon, headline "Payment confirmed. Your audit is on the way.", supporting copy about 48-hour delivery
- **What happens next**: three numbered steps with icons
  1. *We analyze your site* — homepage, mobile, checkout flow, product pages, email capture, site speed
  2. *We generate your report* — custom PDF with scored findings, priority fixes, estimated revenue impact
  3. *You get the playbook* — delivered to your inbox within 48 hours
- **Upsell CTA card**: "Want faster results? Book a free strategy call." with primary button → GHL booking link (`https://api.leadconnectorhq.com/widget/booking/aiMEM9Qf7GmaU0L6sTYT`), and a secondary "← Back to homepage" link to `/`
- **Footer**: same footer used on the landing page

**Fallback state**: if `?session_id=` is missing or doesn't start with `cs_`, swap the hero for a friendly "Looks like you landed here directly" message with a button back to home. No Stripe API calls — purely client-side display.

### Technical changes

1. **New file `src/pages/ThankYou.tsx`**
   - Reads `session_id` from `useSearchParams`
   - Validates: present and starts with `cs_` (live or test)
   - Uses existing design tokens (`bg-background`, `text-secondary`, `bg-primary`, etc.) — no new colors
   - Lucide icons: `CheckCircle2` (hero), `Search`/`FileText`/`Mail` (steps), `Calendar` (CTA), `Mail`/`Phone`/`ExternalLink` (footer)
   - Max content width `max-w-3xl`, mobile-first, generous whitespace
   - Logo and Footer kept inline (mirrors how `Index.tsx` is structured)

2. **Edit `src/App.tsx`**
   - Import `ThankYou`
   - Add `<Route path="/thank-you" element={<ThankYou />} />` above the catch-all `*` route

### Out of scope (handled by user in Stripe + n8n, not in code)

- Stripe webhook → n8n endpoint
- n8n metadata extraction, audit workflow, PDF generation, email delivery
- n8n PATCH back to `audit_requests` to flip `payment_status` to `completed`

These all happen outside the Lovable codebase. The `audit_requests` table already has `payment_status` (default `pending`) and `stripe_session_id`, so n8n has everything it needs to update rows by `audit_request_id` (passed in Stripe metadata by the existing edge function).

### Files touched

- **Created**: `src/pages/ThankYou.tsx`
- **Edited**: `src/App.tsx` (add one route)

