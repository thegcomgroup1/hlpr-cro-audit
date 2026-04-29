## Problem

On mobile (390px), the "Other audits vs hlpr" table in `DifferentiatorSection.tsx` uses a fixed `grid-cols-[1fr_1fr_1.2fr]` layout at every breakpoint. Result: each cell is ~100px wide, words break mid-syllable ("CRO / strategist / who's / seen / 400+ / stores"), rows become very tall, and the comparison is hard to scan.

## Fix

Switch to a responsive layout:

- **Mobile (<sm):** Stack each row as a single card. Row label on top, then two side-by-side mini-columns ("Other audits" with red X / "hlpr" with blue check) so the contrast is still immediate but each side gets ~50% width instead of ~33%. Headers hidden on mobile (label is repeated inline per row).
- **Desktop (≥sm):** Keep the existing 3-column table layout unchanged.

### Implementation details (`src/components/landing/DifferentiatorSection.tsx`)

1. Hide the existing header row on mobile (`hidden sm:grid`).
2. For each row, render two trees:
   - Mobile card (`sm:hidden`): label as a small uppercase eyebrow, then a 2-col grid with "Other audits" label + X + text on the left, "hlpr" label + check + text on the right (highlighted bg). Tighter padding (`p-4`), `text-[13px]` for body, `leading-snug`.
   - Desktop grid (`hidden sm:grid`): the current 3-col layout.
3. Reduce section vertical padding slightly on mobile (`py-10 md:py-20`) and use `max-w-md sm:max-w-5xl` so the mobile card column isn't stretched edge-to-edge awkwardly.
4. Slightly tighten the H2 on mobile (`text-2xl sm:text-4xl`) and balance with `text-pretty` to prevent ugly orphan words.
5. Keep all colors via existing semantic tokens (`primary`, `secondary`, `muted-foreground`, `destructive`, `border`, `card`).

No changes to copy, no changes to other components, no business logic touched.

## Files

- `src/components/landing/DifferentiatorSection.tsx` — restructure render to mobile-stacked / desktop-grid dual layout.

## Verification

After implementation, view at 390px to confirm: no mid-word breaks, each row reads as a clean side-by-side comparison card, and the desktop layout (≥640px) is unchanged.