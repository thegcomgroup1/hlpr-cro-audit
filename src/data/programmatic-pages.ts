// Programmatic SEO landing pages. Each entry produces a route at /:slug
// with unique metadata + copy targeting a specific keyword.

export interface ProgrammaticPage {
  slug: string;
  title: string;          // <title> + OG title
  description: string;    // meta description + OG description
  eyebrow: string;        // small label above H1
  h1: string;             // primary headline
  subhead: string;        // sub-headline below H1
  intro: string;          // intro paragraph below the hero
  audienceLabel: string;  // e.g. "Shopify stores", "DTC brands"
  bullets: string[];      // 3 value bullets shown in hero card
  faqs: { q: string; a: string }[];
}

const SHARED_FAQS: { q: string; a: string }[] = [
  {
    q: "How long does the audit take?",
    a: "You get a recorded video walkthrough within 5 business days, plus a 30-minute live strategy call to walk through the prioritized fixes.",
  },
  {
    q: "Who actually does the audit?",
    a: "The founder personally records every audit. No junior analysts, no outsourced templates.",
  },
  {
    q: "What if I don't get value from the audit?",
    a: "Money-back guarantee if you don't book a follow-up retainer with us afterward. We're confident the call alone pays for itself.",
  },
];

export const PROGRAMMATIC_PAGES: ProgrammaticPage[] = [
  {
    slug: "cro-audit/shopify",
    title: "Shopify CRO Audit: 47-Point Conversion Review | hlpr",
    description:
      "Shopify CRO audit for stores doing $50K+/mo. Founder-led video walkthrough + 30-min strategy call. Find the leaks costing you ad ROI.",
    eyebrow: "Shopify CRO Audit",
    h1: "A Shopify CRO audit that finds the money your store is leaving on the table.",
    subhead:
      "We audit your Shopify store across 47 conversion factors — homepage, PDP, mobile UX, cart, checkout — and hand you a prioritized plan ranked by ROI, not opinion.",
    intro:
      "Most Shopify stores have 5–15% in conversion rate locked behind fixable friction. If you're spending on Meta or Google ads, that friction quietly burns ad spend every day. Our audit pinpoints exactly where it's happening — and what to fix first.",
    audienceLabel: "Shopify stores doing $50K+/mo",
    bullets: [
      "Mobile + desktop reviewed separately (most audits skip this)",
      "Each fix scored by estimated monthly revenue lift",
      "Top 3 quick wins you can ship in week one",
    ],
    faqs: [
      {
        q: "Do you only work with Shopify?",
        a: "Shopify is our specialty (we've audited 100+ stores), but we also audit WooCommerce, BigCommerce, and custom React/Next.js storefronts.",
      },
      {
        q: "Will you actually look at my checkout flow?",
        a: "Yes — including mobile checkout, which is where most stores hemorrhage revenue. We review every step from add-to-cart through order confirmation.",
      },
      ...SHARED_FAQS,
    ],
  },
  {
    slug: "cro-audit/ecommerce",
    title: "E-Commerce CRO Audit (Conversion Optimization Audit) | hlpr",
    description:
      "E-commerce CRO audit for $50K+/mo brands. We find the conversion leaks costing you ad ROI and rank the fixes by dollar impact.",
    eyebrow: "E-Commerce CRO Audit",
    h1: "An e-commerce CRO audit that pays for itself in the first fix.",
    subhead:
      "Stop guessing why your conversion rate is stuck. We audit your full funnel — ad click to confirmation page — and tell you exactly which fixes are worth real money.",
    intro:
      "Average e-commerce conversion rate sits around 2.5%. If yours is lower, there's a fixable reason — and if you're already spending on ads, every percentage point of CR is real margin. This audit finds those points.",
    audienceLabel: "E-commerce brands doing $50K+/mo on ads",
    bullets: [
      "Full-funnel review: ads → landing → PDP → cart → checkout",
      "Revenue-impact estimates on every finding",
      "30-min live walkthrough so you can ask 'why?' on every fix",
    ],
    faqs: [
      {
        q: "What platforms do you audit?",
        a: "Shopify, WooCommerce, BigCommerce, Magento, and custom builds. If it sells products online, we can audit it.",
      },
      {
        q: "How is this different from a free audit tool?",
        a: "Free tools surface generic best practices. We record a personalized 20-minute video of YOUR store and tell you what's actually broken, with revenue estimates attached.",
      },
      ...SHARED_FAQS,
    ],
  },
  {
    slug: "cro-consultant",
    title: "CRO Consultant for E-Commerce & SaaS | hlpr",
    description:
      "Hire a senior CRO consultant who's audited 100+ stores. Founder-led, prioritized by ROI, no fluff. Audit + strategy call from $997.",
    eyebrow: "CRO Consultant",
    h1: "A senior CRO consultant who tells you what to fix — and what to ignore.",
    subhead:
      "No 100-page reports. No agency layers. You get the founder, a recorded walkthrough of your site, and a live strategy call to map the fixes that move revenue.",
    intro:
      "Most CRO consultants either give you a checklist you've already seen, or sell you on a 6-month retainer before you know if they're any good. We do it backwards — pay for one audit, get the playbook, then decide if you want to keep working with us.",
    audienceLabel: "Founders & marketing leads at $50K+/mo brands",
    bullets: [
      "100+ store audits across DTC, SaaS, services",
      "Founder personally records every audit",
      "Money-back if you don't book a follow-up retainer",
    ],
    faqs: [
      {
        q: "What's your background?",
        a: "10+ years optimizing conversion for e-commerce and SaaS. Worked with 7-figure DTC brands, agencies, and venture-backed startups.",
      },
      {
        q: "Do you do retainers or just one-off audits?",
        a: "Both. Most clients start with a one-off audit ($997), then move to a retainer for implementation if it's a fit.",
      },
      ...SHARED_FAQS,
    ],
  },
  {
    slug: "conversion-rate-optimization-agency",
    title: "Conversion Rate Optimization Agency (Founder-Led) | hlpr",
    description:
      "A boutique conversion rate optimization agency. No account managers, no junior analysts — just senior CRO work for $50K+/mo brands.",
    eyebrow: "CRO Agency",
    h1: "The conversion rate optimization agency that doesn't act like one.",
    subhead:
      "No junior analysts. No 8-week 'discovery' phases. You hire us, you get the founder — recording your audit, running your tests, and shipping the fixes that actually move conversion.",
    intro:
      "Big CRO agencies bill $15K–$30K/mo and put a 25-year-old account manager on your account. We took the opposite approach: small, senior, founder-led. Same caliber of work, a fraction of the overhead.",
    audienceLabel: "Brands tired of agency overhead",
    bullets: [
      "Founder is your point of contact — not a project manager",
      "Audit-first engagement: prove value before you commit",
      "Most clients see ROI within 60 days",
    ],
    faqs: [
      {
        q: "What does engagement look like?",
        a: "Start with a $997 audit. If we're a fit, move to a monthly retainer (typically $4K–$8K/mo) covering testing, copy, and design implementation.",
      },
      {
        q: "How big is your team?",
        a: "Intentionally small. The founder leads every account, supported by specialists for design, copy, and dev as needed.",
      },
      ...SHARED_FAQS,
    ],
  },
  {
    slug: "cro-audit/dtc-brands",
    title: "CRO Audit for DTC Brands | hlpr",
    description:
      "CRO audit built specifically for DTC brands scaling on Meta and Google ads. Find the funnel leaks burning your ad spend.",
    eyebrow: "DTC CRO Audit",
    h1: "A CRO audit built for DTC brands burning ad spend on a leaky funnel.",
    subhead:
      "If you're scaling on Meta or Google ads but your conversion rate is stuck, the problem isn't your creative — it's your funnel. We find the leaks that are costing you 2–3x ROAS.",
    intro:
      "DTC economics are brutal. CACs are up, ROAS is down, and every percentage point of conversion rate is the difference between profitable and break-even. This audit is built to find those points fast.",
    audienceLabel: "DTC brands doing $50K+/mo on ads",
    bullets: [
      "Meta/Google ad-to-PDP handoff reviewed in detail",
      "Mobile-first audit (where 70%+ of DTC traffic lives)",
      "Subscription, bundle, and post-purchase flows included",
    ],
    faqs: [
      {
        q: "Do you understand DTC economics?",
        a: "Yes. Most of our clients are sub-$10M DTC brands scaling on paid social. We think in CAC, AOV, LTV, and contribution margin — not vanity metrics.",
      },
      {
        q: "Will you audit my Meta ads too?",
        a: "We focus on the post-click experience. We'll flag obvious ad-to-LP mismatch, but for full media buying audits we partner with specialist agencies.",
      },
      ...SHARED_FAQS,
    ],
  },
  {
    slug: "free-cro-tools",
    title: "Free CRO Tools & Resources for E-Commerce | hlpr",
    description:
      "Free CRO tools and resources to spot conversion leaks in your e-commerce store — including our free CRO score for any URL.",
    eyebrow: "Free CRO Resources",
    h1: "Free CRO tools to find conversion leaks before you spend a dollar.",
    subhead:
      "Get a free CRO score for your store, see how your conversion rate stacks up against your industry, and grab the same checklists we use on $5K paid audits.",
    intro:
      "Not ready for a paid audit? Start here. Drop your URL into our free CRO score below — you'll get an instant readout on the most common conversion leaks, with no strings attached.",
    audienceLabel: "Founders doing CRO themselves",
    bullets: [
      "Instant CRO score for any URL",
      "Industry conversion-rate benchmarks",
      "Same 47-point checklist we use on paid audits",
    ],
    faqs: [
      {
        q: "Is the free CRO score actually useful?",
        a: "Yes — it surfaces the 10–15 most common conversion leaks. It's not as deep as the paid audit, but it's a real starting point.",
      },
      {
        q: "Will you spam me?",
        a: "No. You'll get one email with your score. We only follow up if you reply.",
      },
      ...SHARED_FAQS,
    ],
  },
];

export function getPageBySlug(slug: string): ProgrammaticPage | undefined {
  return PROGRAMMATIC_PAGES.find((p) => p.slug === slug);
}
