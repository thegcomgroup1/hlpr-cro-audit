## Plan: SEO alert emails + admin access

### Part 1 — Admin signup (you do this now)

You're already on `/auth`. Steps:
1. Sign up with **tim@hlpr.io** + a password
2. Confirm via the verification email Lovable sends
3. Reply "signed up" — I'll run a one-line insert to grant your account the `admin` role
4. You'll then be able to load `/dashboard/seo`

### Part 2 — Email alerts (I build this)

**a. Scaffold transactional email infrastructure**
- Run `email_domain--scaffold_transactional_email` to create the `send-transactional-email` Edge Function, the unsubscribe handler, and a sample template directory
- Deploy the new functions

**b. Create one transactional template: `seo-alert`**
- File: `supabase/functions/_shared/transactional-email-templates/seo-alert.tsx`
- Props: `alertType`, `page`, `message`, `metricValue`, `dashboardUrl`
- Subject (function): `🚨 SEO alert — {alertLabel} on {page}`
- Branded with hlpr blue/navy, links to `/dashboard/seo`
- Register in `registry.ts`

**c. Modify `gsc-sync` to send emails when new alerts are inserted**
- After inserting each new alert, invoke `send-transactional-email` with:
  - `templateName: 'seo-alert'`
  - `recipientEmail: 'tim@hlpr.io'`
  - `idempotencyKey: \`seo-alert-${alert.id}\`` (one email per alert, retry-safe)
  - `templateData: { alertType, page, message, metricValue, dashboardUrl }`
- Update the inserted `seo_alerts` row to set `email_sent = true` (column already exists)
- Redeploy `gsc-sync`

**d. Daily digest? — No.** Each new alert gets its own email. Triggers fire at most once per type+page per 7-day window (already deduped in gsc-sync), so volume stays low (~0–5 emails/day).

### What you'll see
- Each new alert that passes the 7-day dedupe check → one email to tim@hlpr.io with the page, the trigger, and a "View dashboard" button
- In-dashboard alert feed continues to work exactly as before
- Email infra is already set up (notify.audit.hlpr.io); DNS will continue verifying in the background

### Technical notes
- No new tables, no schema changes — `seo_alerts.email_sent` already exists
- Total new files: 1 template (`seo-alert.tsx`); modified files: `registry.ts`, `gsc-sync/index.ts`
- All sends go through the durable email queue (auto-retry, suppression-aware)

### Open question
The first sync after deploy could fire several "first impressions" alerts at once (one per page Google has shown). Want me to:
- **A)** Send all of them (truthful but possibly 5–10 emails on day 1), or
- **B)** Cap day-1 emails to top 3 by impressions, mark the rest `email_sent=true` silently?

Default if you don't pick: **A**.