# Replace value-prop visuals with audit-report-matching JSX snippets

Mirror the actual CRO Score Report design (navy/amber/blue/green) so visitors recognize each visual as a section of the report they'll receive.

## 1. Update `ValuePropRow.tsx`
Add `visual?: React.ReactNode` prop. Render priority: `visual` > `image` > icon-tile fallback. Outer rounded-3xl gradient frame stays the same.

## 2. Create three visual components in `src/components/landing/visuals/`

The patch's code blocks were stripped of JSX by markdown. I'll reconstruct each component faithfully from the spec, using the exact hex values and structure described.

### `CustomerJourneyVisual.tsx`
Top of the report. Vertical stack inside a white card:
- **Navy header bar** (`#0E1E3F`, rounded-t): tiny green "HLPR" caps left, white "Your CRO Score Report" right
- **Score gauge** (centered): SVG circle, amber `#D97706` 4px ring at 72% fill, white inner, navy serif "72" centered. Below: "FREE CRO SCORE" small caps muted gray, "Good — Room to Grow" amber
- **Revenue gap callout**: cream `#FAEEDA` bg, 3px amber `#D97706` left border. "ESTIMATED MONTHLY REVENUE GAP" dark amber small caps, "$2,800–$5,200" big mid-amber

### `RevenueImpactVisual.tsx`
"Key Findings" navy heading + 3 stacked finding cards. Each card:
- Severity pill top-left (critical `#FCEBEB`/`#791F1F`, high `#FAC775`/`#633806`, medium `#FAEEDA`/`#633806`)
- Category tag muted gray, bold navy title (2 lines), green `#1D9E75` "Potential: $X–$Y/mo"

Findings: Critical/Technical Performance/"Speed Index critically slow…"/$800–$1,200; High/UX/"No exit-intent popup…"/$600–$900; Medium/Conversion/"No live chat…"/$400–$700.

### `PrioritizedActionVisual.tsx`
"Top Priorities" navy heading + 3 numbered rows. Each row:
- Blue `#1AA3FF` numbered circle (white numeral)
- Bold navy title, muted gray meta line ("Impact: High · Effort: … · Est. $X/mo")

Three priorities as listed in the spec.

### Color usage notes
All three components use literal hex values via inline `style` (not Tailwind tokens) because they must match the report's literal colors regardless of site theme. This is an intentional exception to the design-system rule for these report-mirror visuals.

## 3. Wire into `src/pages/Index.tsx`
- Add three imports
- Remove `illustrationJourney`, `illustrationRevenue`, `illustrationPlaybook` imports
- Replace `image=` / `imageAlt=` props on each of the three `<ValuePropRow />` calls with `visual={<CustomerJourneyVisual />}` etc.

## 4. Delete orphan illustration PNGs
After Step 3, `illustration-journey.png`, `illustration-revenue.png`, `illustration-playbook.png` have no remaining imports. Delete all three from `src/assets/`.

## Files touched
1. `src/components/landing/ValuePropRow.tsx` — add `visual` prop
2. `src/components/landing/visuals/CustomerJourneyVisual.tsx` — create
3. `src/components/landing/visuals/RevenueImpactVisual.tsx` — create
4. `src/components/landing/visuals/PrioritizedActionVisual.tsx` — create
5. `src/pages/Index.tsx` — swap imports + props
6. `src/assets/illustration-journey.png` — delete
7. `src/assets/illustration-revenue.png` — delete
8. `src/assets/illustration-playbook.png` — delete

## Out of scope
No copy changes, no structural changes to other sections, no spacing/typography adjustments beyond the visual components themselves.
