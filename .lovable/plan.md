

# Two Tweaks Before Launch

## 1. Logo color — brand blue
Change `Logo` usage in the nav (line 475) from `text-secondary` to `text-primary` so it renders in `#038FF0` instead of dark navy.

## 2. Email field in hero form
Add an email input alongside the URL input in the hero form. On mobile (default), both fields stack vertically. On `sm:` breakpoints, lay them out in a row with the button. The webhook payload will include both `url` and `email`.

### Form layout
```text
Mobile:              Desktop (sm+):
┌──────────────┐     ┌────────────┐ ┌─────────────┐ ┌──────────────────┐
│ Store URL    │     │ Store URL  │ │ Your email  │ │ Get My Free ...  │
└──────────────┘     └────────────┘ └─────────────┘ └──────────────────┘
┌──────────────┐
│ Your email   │
└──────────────┘
┌──────────────┐
│ Get My Free…│
└──────────────┘
```

### Changes in `src/pages/Index.tsx`
- **Line 36**: Add `const [email, setEmail] = useState("")`
- **Line 41**: Update guard to also check `email.trim()`
- **Line 48**: Include `email` in the JSON body
- **Lines 75-93**: Add an email `<input type="email">` between the URL input and the submit button
- **Line 475**: Change `text-secondary` → `text-primary` on the Logo

