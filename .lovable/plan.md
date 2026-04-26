## What you'll get

1. **Plain-text mega-prompt** (`/mnt/documents/hlpr-mega-prompt-v2.txt`) — copy-paste ready for Google Docs.
2. **A formatted Google Doc** (`hlpr-mega-prompt-v2.docx`) with both the `mini` and `full` system + user templates, neatly sectioned with headings.
3. **Standalone intake form preview** at `/audit/intake-preview` — renders the real `IntakeForm` component with a tier toggle (Mini $29 / Full $99), so you can click through all 5 steps without going through the checkout modal.

## Why a preview route (not editing the modal flow)

Your real funnel is: landing → contact step → intake → Stripe. We don't want to break that. A separate preview route lets you QA the form in isolation, and we'll keep the production flow untouched.

---

## Implementation

### 1. Export the active prompts (one-shot, plan mode → build mode)

- Pull both active rows from `audit_prompt_templates` (v2.0 mini + full) — already confirmed present (4,529 / 2,914 char system prompts).
- Write to `/mnt/documents/hlpr-mega-prompt-v2.txt` with clear section dividers:
  ```
  ============================================================
  HLPR MEGA-PROMPT v2.0 — MINI ($29)
  ============================================================
  [SYSTEM PROMPT]
  ...
  [USER PROMPT TEMPLATE]
  ...
  [VARIABLES REFERENCE]
  business_name, industry, primary_offer, dream_outcome, ...
  ```
- Generate `/mnt/documents/hlpr-mega-prompt-v2.docx` using the docx skill (Arial, proper headings, code-style blocks for the prompts) so you can open it in Google Docs directly via "Open with → Google Docs".
- Deliver both via `<lov-artifact>` tags so you can preview/download in chat.

### 2. Standalone intake preview page

- New route: `/audit/intake-preview`
- New file: `src/pages/IntakePreview.tsx`
  - Branded HLPR header (logo + "Preview mode" badge).
  - Tier toggle: Mini / Full chips that swap `tierLabel` and `tierPrice` props passed to `IntakeForm`.
  - Renders `<IntakeForm onComplete={...}>` in a card that mimics the modal's max-width / padding so it looks identical to production.
  - On `onComplete`, shows a JSON preview panel of the captured `IntakeAnswers` (no Stripe call) so you can verify field mapping to mega-prompt variables.
  - "Reset draft" button that clears `localStorage` key `hlpr_intake_draft_v2`.
- Register the route in `src/App.tsx` above the catch-all.
- No changes to `AuditCheckoutModal`, `create-audit-checkout`, or any production path.

### 3. Optional small win (included)

Add a tiny "View raw answers" debug toggle on the preview page that copies the JSON to clipboard — handy when sandboxing prompt edits.

---

## Files

**New**
- `src/pages/IntakePreview.tsx`
- `/mnt/documents/hlpr-mega-prompt-v2.txt`
- `/mnt/documents/hlpr-mega-prompt-v2.docx`

**Edited**
- `src/App.tsx` (add `<Route path="/audit/intake-preview" element={<IntakePreview />} />`)

## How you'll use it

- Visit `https://audit.hlpr.io/audit/intake-preview` (or the lovable preview URL) → click through all 5 steps, toggle tiers, see the JSON output.
- Open the `.docx` artifact in Google Docs to read/edit the mega-prompt; paste from the `.txt` if you prefer.
