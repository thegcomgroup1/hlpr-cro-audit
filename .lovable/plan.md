

# Fix Stripe Payment Link Typo

## Problem
The Mini Audit Stripe URL has a typo: `59C` instead of `99C` in the checkout link, causing a "page not found" error on Stripe.

## Fix
In `src/pages/Index.tsx` line 26, change:
```
https://buy.stripe.com/7sYfZagmT2zafQM59C8IU00
```
to:
```
https://buy.stripe.com/7sYfZagmT2zafQM99C8IU00
```

Single character fix — `5` → `9`.

