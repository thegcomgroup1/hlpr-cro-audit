# Tighten spacing across the landing page (Rule of 8s)

The transcript's core spacing guidance:
- **Rule of 8s**: every gap is a multiple of 8 (8, 16, 24, 32, 48, 64, 80)
- **Closely related elements → tight**; less related → more space
- Premium feel comes from a **consistent, deliberate rhythm**, not generous whitespace
- Massive whitespace actually *reduces* conversions

The current page uses `py-20 md:py-28` on almost every section (80px → 112px) and `mt-12` between heading and content. That's too airy for a Meta-traffic landing page on mobile. We'll tighten the vertical rhythm everywhere.

## New spacing scale (applied globally)

| Context | Current | New |
|---|---|---|
| Section vertical padding | `py-20 md:py-28` (80/112px) | `py-14 md:py-20` (56/80px) |
| Lighter sections (HowItWorks, Credibility) | `py-20 md:py-24` | `py-12 md:py-16` |
| Strip sections (FUD, SocialProof) | `py-8`–`py-12` | keep `py-8 md:py-10` |
| Heading → content block | `mt-12`–`mt-14` | `mt-8 md:mt-10` |
| Eyebrow → H2 | `mt-3` | `mt-2` (tight pair) |
| H2 → subhead paragraph | `mt-3` | `mt-3` (keep — related) |
| Grid gaps inside sections | `gap-10` / `gap-12` | `gap-6 md:gap-8` |
| CTA button top margin in pricing card | `mt-8` | `mt-6` |
| "Not ready?" link below pricing | `mt-10` | `mt-8` |
| Footer | `py-12` | `py-10` |
| Hero bottom padding | `pb-16 md:pb-24` | `pb-12 md:pb-16` |
| ValuePropRow vertical | `py-16 md:py-24` | `py-12 md:py-16` |
| ValuePropRow column gap | `gap-10 md:gap-16` | `gap-8 md:gap-12` |

## Files to update

1. **src/pages/Index.tsx** — `HowItWorksSection`, `PricingSection`, `CredibilitySection`, `FAQSection`, `Footer` inner spacing
2. **src/components/landing/HeroV2.tsx** — tighten hero bottom + intra-hero gaps
3. **src/components/landing/PainPointSection.tsx** — `py-20 md:py-28` → `py-14 md:py-20`, `mt-10` → `mt-8`
4. **src/components/landing/ValuePropRow.tsx** — `py-16 md:py-24` → `py-12 md:py-16`, gap `10/16` → `8/12`
5. **src/components/landing/PortfolioStrip.tsx** — `py-20 md:py-28` → `py-14 md:py-20`, `mt-12` → `mt-8`
6. **src/components/landing/WallOfLove.tsx** — same section padding tighten, `mt-12` → `mt-8`
7. **src/components/landing/DifferentiatorSection.tsx** — same
8. **src/components/landing/WhatHappensAfter.tsx** — same
9. **src/components/landing/FounderSection.tsx** — `py-20 md:py-28` → `py-14 md:py-20`, gap-10 → gap-8
10. **src/components/landing/FreeScoreSection.tsx** — `py-20 md:py-24` → `py-12 md:py-16`
11. **src/components/landing/FinalCtaBand.tsx** — `py-20 md:py-24` → `py-14 md:py-20`
12. **src/components/landing/FudStrip.tsx** — confirm `py-12` → `py-10`
13. **src/components/landing/SocialProofBar.tsx** — keep `py-8` (already on rhythm)

## What we are NOT changing

- Copy, headlines, CTAs, components structure
- Colors, fonts, design tokens
- Image sizing, the hero content, the pricing tier logic
- Any backend / form / Stripe / Supabase code
- The `AuditArc` motif and other visual signature elements

## Result

The page becomes ~25–30% shorter on mobile, with the same content density and a tighter, more deliberate "every-8px" rhythm — closer to the premium-trust feel the transcript describes. No content removed.
