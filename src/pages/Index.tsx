import { useState } from "react";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  ExternalLink,
  TrendingUp,
  Target,
  DollarSign,
  Globe,
  Search,
  LineChart,
  ListChecks,
} from "lucide-react";
import { STRIPE_PAYMENT_LINK } from "@/lib/strategy-call";
import HeroV2 from "@/components/landing/HeroV2";
import SocialProofBar from "@/components/landing/SocialProofBar";
import PainPointSection from "@/components/landing/PainPointSection";
import ValuePropRow from "@/components/landing/ValuePropRow";
import WallOfLove from "@/components/landing/WallOfLove";
import DifferentiatorSection from "@/components/landing/DifferentiatorSection";
import FudStrip from "@/components/landing/FudStrip";
import FounderSection from "@/components/landing/FounderSection";
import FreeScoreSection from "@/components/landing/FreeScoreSection";
import FinalCtaBand from "@/components/landing/FinalCtaBand";
import PortfolioStrip from "@/components/landing/PortfolioStrip";
import WhatHappensAfter from "@/components/landing/WhatHappensAfter";
import AuditArc from "@/components/landing/visuals/AuditArc";
import CustomerJourneyVisual from "@/components/landing/visuals/CustomerJourneyVisual";
import RevenueImpactVisual from "@/components/landing/visuals/RevenueImpactVisual";
import PrioritizedActionVisual from "@/components/landing/visuals/PrioritizedActionVisual";

function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`font-extrabold tracking-tight ${className}`}>hlpr</span>
  );
}

function ScoreGaugeSnippet() {
  return (
    <div className="mt-5 flex flex-col items-center">
      <div className="relative flex h-[60px] w-[60px] items-center justify-center">
        <svg viewBox="0 0 36 36" className="h-[60px] w-[60px] -rotate-90">
          <circle cx="18" cy="18" r="15.9" fill="none" className="stroke-muted" strokeWidth="3" />
          <circle
            cx="18"
            cy="18"
            r="15.9"
            fill="none"
            className="stroke-primary"
            strokeWidth="3"
            strokeDasharray="72, 100"
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute text-[22px] font-bold leading-none text-secondary">72</span>
      </div>
      <span className="mt-1.5 text-[9px] font-semibold uppercase tracking-widest text-muted-foreground">
        Free CRO score
      </span>
    </div>
  );
}

function PrioritiesSnippet() {
  const items = [
    { n: 1, title: "Remove unused JS", meta: "$1,000/mo · High impact" },
    { n: 2, title: "Add exit-intent popup", meta: "$750/mo · Quick win" },
    { n: 3, title: "Install live chat", meta: "$550/mo · Quick win" },
  ];
  return (
    <div className="mt-5 w-full max-w-[220px] space-y-2">
      {items.map((it) => (
        <div key={it.n} className="flex items-start gap-2 rounded-lg border border-border bg-card p-2 text-left shadow-sm">
          <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
            {it.n}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[11px] font-bold text-secondary">{it.title}</p>
            <p className="text-[9px] text-muted-foreground">{it.meta}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      num: 1,
      title: "Tell us about your business",
      desc: "A short intake teaches us your business so we audit through your customers' eyes — not against a generic checklist.",
      visual: <Globe className="mt-5 text-primary" size={32} strokeWidth={1.5} />,
    },
    {
      num: 2,
      title: "We hand-audit your site",
      desc: "We score 50+ conversion factors across 6 categories and rank fixes by impact ÷ effort.",
      visual: <ScoreGaugeSnippet />,
    },
    {
      num: 3,
      title: "Ship fixes that pay you back",
      desc: "You get a prioritized playbook with revenue estimates. Implement yourself or hire us to do it.",
      visual: <PrioritiesSnippet />,
    },
  ];

  return (
    <section className="bg-muted/40">
      <div className="mx-auto max-w-5xl px-5 py-12 text-center sm:px-8 md:py-16">
        <div className="flex justify-center">
          <AuditArc size={28} className="text-primary/70" />
        </div>
        <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-primary">
          How it works
        </p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-secondary sm:text-4xl">
          From paying for traffic to converting it — in 3 steps.
        </h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-8">
          {steps.map((s) => (
            <div key={s.num} className="flex flex-col items-center">
              <div className="relative">
                <AuditArc
                  size={64}
                  className="absolute inset-0 -m-2 text-primary/40"
                />
                <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground shadow-md">
                  {s.num}
                </div>
              </div>
              {s.visual}
              <h3 className="mt-4 text-lg font-bold text-secondary">
                {s.title}
              </h3>
              <p
                className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground"
                style={{ textWrap: "pretty" } as React.CSSProperties}
              >
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section id="strategy-call" className="bg-background">
      <div className="mx-auto max-w-3xl px-5 py-14 text-center sm:px-8 md:py-20">
        <div className="flex justify-center">
          <AuditArc size={28} className="text-primary/70" />
        </div>
        <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-primary">
          The strategy call
        </p>
        <h2
          className="mt-3 text-3xl font-extrabold tracking-tight text-secondary sm:text-4xl"
          style={{ textWrap: "balance" } as React.CSSProperties}
        >
          Find what's worth fixing first.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
          90 minutes of dedicated work on your business. The founder personally
          analyzes your site, records a 20-minute walkthrough, then meets you
          live for a 30-minute Q&amp;A.
        </p>

        <div className="mt-10">
          <div className="relative mx-auto max-w-2xl overflow-hidden rounded-2xl border border-primary bg-card p-6 text-left shadow-lg ring-2 ring-primary/15 sm:p-10">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground shadow">
              For brands doing $100K+/month
            </span>
            <AuditArc size={48} className="absolute right-4 top-4 text-primary/30" />

            <div>
              <h3 className="text-2xl font-bold text-secondary">
                The Founder Strategy Call
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Recorded walkthrough + live working session
              </p>
            </div>

            <div className="mt-5 flex items-baseline gap-2">
              <span className="text-5xl font-extrabold tracking-tight text-secondary">
                $997
              </span>
              <span className="text-base font-medium text-muted-foreground">
                one-time
              </span>
            </div>
            <p className="mt-1 text-xs font-bold uppercase tracking-widest text-primary">
              Money-back if you don't book a retainer follow-up
            </p>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-muted/40 p-4">
                <p className="text-xs font-bold uppercase tracking-widest text-primary">
                  Step 1 · The Loom
                </p>
                <p className="mt-2 text-sm leading-relaxed text-secondary">
                  Within 48 hours of booking, we deliver a 20-minute
                  personalized video walkthrough of your site. Mobile UX,
                  homepage, product pages, email capture, checkout — every
                  click that's costing you money.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-muted/40 p-4">
                <p className="text-xs font-bold uppercase tracking-widest text-primary">
                  Step 2 · The Live Q&amp;A
                </p>
                <p className="mt-2 text-sm leading-relaxed text-secondary">
                  After you watch the Loom, we meet for 30 minutes live. Bring
                  questions, push back on findings, talk through priorities.
                  This is where the real strategy lands.
                </p>
              </div>
            </div>

            <ul className="mt-6 flex flex-col gap-3">
              {[
                "Founder-recorded — no junior consultants, no offshored review",
                "Loom recording is yours to keep, share with team, or revisit",
                "Live Q&A doubles as a working session — we map the next 90 days",
                "Walk away with a prioritized fix list and an honest read on whether you need a retainer",
              ].map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2 text-sm leading-snug text-muted-foreground"
                >
                  <Check
                    size={16}
                    className="mt-0.5 shrink-0 text-primary"
                    strokeWidth={2.5}
                  />
                  {f}
                </li>
              ))}
            </ul>

            <a
              href={STRIPE_PAYMENT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 block w-full rounded-lg bg-primary py-3 text-center text-sm font-bold text-primary-foreground shadow-md transition active:scale-[0.97] hover:shadow-lg"
            >
              Book Strategy Call — $997
            </a>

            <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">
              For brands doing $100K+/month. Sub-$100K? Get the free CRO score
              instead — most fixes route into our $500–$1,500 setup tiers at{" "}
              <a
                href="https://solutions.hlpr.io"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary transition hover:text-primary/80"
              >
                solutions.hlpr.io
              </a>
              .
            </p>
          </div>
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          Not ready for a paid call?{" "}
          <a
            href="#free-score"
            className="font-semibold text-primary transition hover:text-primary/80"
          >
            Get a free CRO score instead →
          </a>
        </p>
      </div>
    </section>
  );
}

function CredibilitySection() {
  const stats = [
    { value: "$916K", label: "in Google Ads managed", icon: TrendingUp },
    { value: "$341K", label: "in Meta Ads managed", icon: Target },
    { value: "68%", label: "email open rates achieved", icon: Mail },
    { value: "$170K", label: "revenue generated through email", icon: DollarSign },
  ];

  return (
    <section className="bg-muted/40">
      <div className="mx-auto max-w-5xl px-5 py-12 text-center sm:px-8 md:py-16">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          Track record
        </p>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-secondary sm:text-4xl">
          Numbers we've actually moved.
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.value} className="rounded-xl bg-card p-6 shadow-sm">
              <s.icon
                className="mx-auto mb-3 text-primary"
                size={24}
                strokeWidth={1.5}
              />
              <p className="text-2xl font-extrabold tracking-tight text-secondary sm:text-3xl">
                {s.value}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    {
      q: "Does this work for my niche?",
      a: "Yes. Our intake form captures industry, business model (e-com, services, SaaS, local, info), AOV, and customer pain points so the audit is shaped to your business — not a generic e-com checklist.",
    },
    {
      q: "What if I don't have a website yet?",
      a: "If you have a live website, landing page, or booking page — we can audit it. If you have nothing live yet, book a strategy call and we'll scope the right starting point together.",
    },
    {
      q: "How is this different from PageSpeed Insights or a free tool?",
      a: "Free tools score technical speed. We audit the full customer journey: copy, offer clarity, social proof placement, FUD reduction, mobile UX, and checkout flow — judgment calls no automated tool can make.",
    },
    {
      q: "What if the strategy call doesn't lead anywhere?",
      a: "If you book the strategy call but don't end up wanting to follow up with a retainer call afterward, we refund the $997 in full. The strategy call is structured as a self-funding intro: it pays for itself if you take the next step, costs you nothing if you don't.",
    },
    {
      q: "Who actually runs the audit?",
      a: "Tim, founder of hlpr — 10+ years running paid traffic, email, and CRO across $1M+ in managed ad spend. No outsourced contractors, no AI-generated reports.",
    },
    {
      q: "How long does it take?",
      a: "Free CRO Score: emailed within 60 seconds of submission. Strategy Call: Loom delivered within 48 hours of booking, live Q&A scheduled at your preferred time after.",
    },
    {
      q: "What if I want you to fix what you find?",
      a: "Yes — full implementation services are available. Email retainers start at $500. Website builds start at $1,500 plus monthly support. The strategy call's ROI estimates usually make the right tier obvious, and most callers convert to retainer because the math speaks for itself.",
    },
    {
      q: "Why $997 instead of a cheaper PDF audit?",
      a: "Because cheap audits don't move the needle. A 20-page PDF you read once doesn't change anything — your team still won't ship the fixes. The strategy call is built differently: live work with the founder, recording you can replay, and a structured next step into a real retainer if it's the right fit. We charge for outcomes, not deliverables.",
    },
    {
      q: "Is the free score actually useful?",
      a: "Yes — you'll get your overall conversion health score plus the top 3 fixes killing your conversions right now. Most stores can implement at least one immediately.",
    },
  ];

  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-2xl px-5 py-14 sm:px-8 md:py-20">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-primary">
          FAQ
        </p>
        <h2 className="mt-3 text-center text-3xl font-extrabold tracking-tight text-secondary sm:text-4xl">
          Frequently asked questions
        </h2>
        <div className="mt-8 divide-y divide-border">
          {faqs.map((f, i) => (
            <div key={i}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between py-5 text-left text-base font-semibold text-secondary transition hover:text-primary"
              >
                {f.q}
                {open === i ? (
                  <ChevronUp size={18} className="ml-4 shrink-0" />
                ) : (
                  <ChevronDown size={18} className="ml-4 shrink-0" />
                )}
              </button>
              {open === i && (
                <p className="pb-5 text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-secondary text-secondary-foreground">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-5 py-10 text-center sm:px-8">
        <p className="border-b border-border/30 pb-5 text-xs text-secondary-foreground/70">
          Sister brands:{" "}
          <a
            href="https://solutions.hlpr.io"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary-foreground transition hover:text-primary"
          >
            HLPR Solutions
          </a>{" "}
          (full-service builds) ·{" "}
          <a
            href="https://ministries.hlpr.io"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary-foreground transition hover:text-primary"
          >
            HLPR for Ministries
          </a>{" "}
          (church websites)
        </p>
        <Logo className="text-2xl text-primary-foreground" />
        <p className="text-sm opacity-70">
          Email Marketing & Automation for E-Commerce
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm opacity-70">
          <a
            href="mailto:tim@hlpr.io"
            className="flex items-center gap-1.5 transition hover:opacity-100"
          >
            <Mail size={14} /> tim@hlpr.io
          </a>
          <a
            href="tel:+13029221428"
            className="flex items-center gap-1.5 transition hover:opacity-100"
          >
            <Phone size={14} /> (302) 550-8521
          </a>
          <a
            href="https://hlpr.io"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 transition hover:opacity-100"
          >
            <ExternalLink size={14} /> hlpr.io
          </a>
        </div>
        <p className="mt-4 text-xs opacity-40">
          © {new Date().getFullYear()} HLPR. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default function Index() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Sticky nav */}
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 sm:px-8">
          <Logo className="text-xl text-primary" />
          <a
            href={STRIPE_PAYMENT_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow transition active:scale-[0.97] hover:shadow-md"
          >
            Book Strategy Call
          </a>
        </div>
      </nav>

      <HeroV2 />
      <SocialProofBar />
      <PainPointSection />

      <ValuePropRow
        eyebrow="Customer-journey audit"
        headline="See your store the way your customers actually do."
        body="We audit homepage, product pages, mobile UX, and checkout flow as a single connected journey — not isolated pages — so we catch the friction that costs you the sale."
        bullets={[
          "6 categories scored 0–100",
          "Mobile + desktop reviewed separately",
          "Full funnel from ad click to confirmation",
        ]}
        icon={Search}
        visual={<CustomerJourneyVisual />}
      />

      <ValuePropRow
        reverse
        eyebrow="Revenue-impact estimates"
        headline="Every finding comes with a dollar figure attached."
        body="We don't just say 'fix this.' We tell you what it's costing you and what it'll be worth — so you can sequence your roadmap by impact, not opinion."
        bullets={[
          "Estimated monthly revenue lift per fix",
          "Effort score 1–5 for engineering",
          "Sequenced by impact ÷ effort",
        ]}
        icon={LineChart}
        visual={<RevenueImpactVisual />}
      />

      <ValuePropRow
        eyebrow="Prioritized action plan"
        headline="What to fix first. Ranked by ROI."
        body="No 100-item dump. We give you the top fixes ranked by ROI, with the wording, layout, and offers your visitors actually need to convert."
        bullets={[
          "Top 3 quick wins for week 1",
          "Mid-priority improvements for the next sprint",
          "Long-term structural fixes flagged separately",
        ]}
        icon={ListChecks}
        visual={<PrioritizedActionVisual />}
      />

      <PortfolioStrip />
      <WallOfLove />
      <DifferentiatorSection />
      <HowItWorksSection />

      <div id="pricing">
        <PricingSection />
      </div>

      <WhatHappensAfter />
      <FudStrip />
      <FounderSection />
      <FreeScoreSection />
      <CredibilitySection />
      <FAQSection />
      <FinalCtaBand />
      <Footer />
    </div>
  );
}
