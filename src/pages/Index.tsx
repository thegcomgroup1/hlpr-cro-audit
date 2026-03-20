import { useState } from "react";
import {
  Search,
  BarChart3,
  ShoppingCart,
  DollarSign,
  Globe,
  FileText,
  Wrench,
  Check,
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  ExternalLink,
  TrendingUp,
  Target,
  Zap,
  Award,
  Clock,
  FileCheck,
  LayoutGrid,
} from "lucide-react";

const WEBHOOK_URL = "https://your-webhook-url.com/cro-score";
const STRIPE_MINI = "https://buy.stripe.com/placeholder-mini-audit";
const STRIPE_FULL = "https://buy.stripe.com/placeholder-full-audit";

function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`font-extrabold tracking-tight ${className}`}>hlpr</span>
  );
}

function HeroSection() {
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    setSubmitting(true);
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
    } catch {
      // placeholder — silently handle
    }
    setSubmitting(false);
  };

  return (
    <section className="relative overflow-hidden bg-background">
      <div className="mx-auto max-w-3xl px-5 pb-20 pt-28 text-center sm:px-8 md:pt-36 md:pb-28">
        <h1
          className="text-4xl font-extrabold leading-[1.08] tracking-tight text-secondary sm:text-5xl md:text-[3.5rem]"
          style={{ textWrap: "balance" } as React.CSSProperties}
        >
          Your Store Is Leaking Revenue.
          <br className="hidden sm:block" /> We'll Show You Where.
        </h1>
        <p
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground"
          style={{ textWrap: "pretty" } as React.CSSProperties}
        >
          Get a data-driven CRO audit of your e-commerce site. We analyze your
          homepage, product pages, checkout flow, mobile experience, email
          capture, and site speed — then give you a prioritized fix list with
          estimated revenue impact.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-10 flex max-w-lg flex-col gap-3 sm:flex-row"
        >
          <input
            type="url"
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter your store URL"
            className="h-12 flex-1 rounded-lg border border-input bg-background px-4 text-base shadow-sm outline-none ring-ring transition placeholder:text-muted-foreground focus:ring-2"
          />
          <button
            type="submit"
            disabled={submitting}
            className="h-12 shrink-0 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-md transition active:scale-[0.97] hover:shadow-lg disabled:opacity-60"
          >
            {submitting ? "Submitting…" : "Get My Free CRO Score"}
          </button>
        </form>
        <p className="mt-3 text-sm text-muted-foreground">
          Takes 30 seconds. No credit card required.
        </p>

        {/* Trust badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Award size={14} /> Trusted by e-commerce brands
          </span>
          <span className="hidden h-4 w-px bg-border sm:block" />
          <span className="flex items-center gap-1.5">
            <Zap size={14} /> 50+ conversion factors
          </span>
          <span className="hidden h-4 w-px bg-border sm:block" />
          <span className="flex items-center gap-1.5">
            <Target size={14} /> Data-driven insights
          </span>
        </div>
      </div>
    </section>
  );
}

function ProblemSection() {
  const stats = [
    {
      value: "0.5–3%",
      label: "Average e-commerce conversion rate",
      icon: BarChart3,
    },
    { value: "70%", label: "Cart abandonment rate", icon: ShoppingCart },
    {
      value: "$4K–$8K/mo",
      label: "Revenue most stores leave on the table",
      icon: DollarSign,
    },
  ];

  return (
    <section className="bg-secondary text-secondary-foreground">
      <div className="mx-auto max-w-5xl px-5 py-20 text-center sm:px-8 md:py-28">
        <h2
          className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl"
          style={{ textWrap: "balance" } as React.CSSProperties}
        >
          97% of Your Visitors Leave Without Buying
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {stats.map((s) => (
            <div
              key={s.value}
              className="rounded-xl bg-white/[0.07] p-8 backdrop-blur-sm"
            >
              <s.icon className="mx-auto mb-4 opacity-60" size={28} />
              <p className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                {s.value}
              </p>
              <p className="mt-2 text-sm leading-relaxed opacity-75">
                {s.label}
              </p>
            </div>
          ))}
        </div>
        <p
          className="mx-auto mt-10 max-w-2xl text-base leading-relaxed opacity-75"
          style={{ textWrap: "pretty" } as React.CSSProperties}
        >
          The difference between a 1% and 3% conversion rate on a site with
          10,000 monthly visitors is{" "}
          <strong className="text-primary-foreground">
            $20,000+ per year
          </strong>{" "}
          in additional revenue.
        </p>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      num: 1,
      title: "Enter Your URL",
      desc: "We crawl your site and analyze 50+ conversion factors across 6 categories.",
      icon: Globe,
    },
    {
      num: 2,
      title: "Get Your Score",
      desc: "Receive a detailed report with section-by-section scoring, findings, and fix recommendations.",
      icon: FileText,
    },
    {
      num: 3,
      title: "Fix & Grow",
      desc: "Use the report to fix issues yourself, or hire HLPR to implement everything for you.",
      icon: Wrench,
    },
  ];

  return (
    <section className="bg-muted">
      <div className="mx-auto max-w-5xl px-5 py-20 text-center sm:px-8 md:py-28">
        <h2 className="text-3xl font-extrabold tracking-tight text-secondary sm:text-4xl">
          How It Works
        </h2>
        <div className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-8">
          {steps.map((s) => (
            <div key={s.num} className="flex flex-col items-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground shadow-md">
                {s.num}
              </div>
              <s.icon
                className="mt-5 text-primary"
                size={32}
                strokeWidth={1.5}
              />
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
  const tiers = [
    {
      name: "CRO Score",
      price: "FREE",
      features: [
        "3–5 key findings",
        "Overall score out of 100",
        "Top 3 quick wins",
        "Delivered instantly by email",
      ],
      cta: "Get Free Score",
      href: "#hero",
      highlight: false,
    },
    {
      name: "Mini Audit",
      price: "$29",
      features: [
        "10–15 detailed findings",
        "Section-by-section scoring",
        "Prioritized fix list",
        "Revenue impact estimates",
        "Delivered within 48 hours",
      ],
      cta: "Get Mini Audit",
      href: STRIPE_MINI,
      highlight: true,
    },
    {
      name: "Full CRO Audit",
      price: "$99",
      features: [
        "25+ detailed findings",
        "Complete page-by-page analysis",
        "Custom recommendations with wireframes",
        "Revenue gap calculation",
        "Priority action plan with effort/impact matrix",
        "Delivered within 5 business days",
      ],
      cta: "Get Full Audit",
      href: STRIPE_FULL,
      highlight: false,
    },
  ];

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-5xl px-5 py-20 text-center sm:px-8 md:py-28">
        <h2 className="text-3xl font-extrabold tracking-tight text-secondary sm:text-4xl">
          Choose Your Audit Level
        </h2>
        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative flex flex-col rounded-2xl border bg-card p-8 text-left shadow-sm transition hover:shadow-md ${
                t.highlight
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-border"
              }`}
            >
              {t.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground shadow">
                  Most Popular
                </span>
              )}
              <h3 className="text-lg font-bold text-secondary">{t.name}</h3>
              <p className="mt-2 text-3xl font-extrabold tracking-tight text-secondary">
                {t.price}
              </p>
              <ul className="mt-6 flex flex-1 flex-col gap-3">
                {t.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-sm leading-snug text-muted-foreground"
                  >
                    <Check
                      size={16}
                      className="mt-0.5 shrink-0 text-primary"
                    />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={t.href}
                className={`mt-8 block rounded-lg py-3 text-center text-sm font-semibold transition active:scale-[0.97] ${
                  t.highlight
                    ? "bg-primary text-primary-foreground shadow-md hover:shadow-lg"
                    : "border border-primary text-primary hover:bg-primary/5"
                }`}
              >
                {t.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CredibilitySection() {
  const stats = [
    { value: "$916K", label: "in Google Ads managed", icon: TrendingUp },
    { value: "$341K", label: "in Meta Ads managed", icon: Target },
    { value: "68%", label: "email open rates achieved", icon: Mail },
    {
      value: "$170K",
      label: "revenue generated through email",
      icon: DollarSign,
    },
  ];

  return (
    <section className="bg-muted">
      <div className="mx-auto max-w-5xl px-5 py-20 text-center sm:px-8 md:py-28">
        <h2 className="text-3xl font-extrabold tracking-tight text-secondary sm:text-4xl">
          Why Trust HLPR?
        </h2>
        <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.value}
              className="rounded-xl bg-card p-6 shadow-sm"
            >
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
      q: "What do you analyze?",
      a: "Homepage, product pages, checkout flow, mobile experience, email capture strategy, and site speed/technical performance.",
    },
    {
      q: "How is this different from a free tool like PageSpeed Insights?",
      a: "We analyze the full customer journey, not just technical speed. We look at UX, copy, offer strategy, trust signals, and conversion flow — things no automated tool can evaluate.",
    },
    {
      q: "What if I want you to fix what you find?",
      a: "We offer full implementation services starting at $1,500/month. Most audit buyers become retainer clients because the ROI is clear from the report.",
    },
    {
      q: "Is the free score actually useful?",
      a: "Yes. You'll get your overall conversion health score and the top 3 things killing your conversions right now. Most stores can implement at least one fix immediately.",
    },
  ];

  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-2xl px-5 py-20 sm:px-8 md:py-28">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-secondary sm:text-4xl">
          Frequently Asked Questions
        </h2>
        <div className="mt-12 divide-y divide-border">
          {faqs.map((f, i) => (
            <div key={i}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between py-5 text-left text-base font-semibold text-secondary transition hover:text-primary"
              >
                {f.q}
                {open === i ? (
                  <ChevronUp size={18} className="shrink-0 ml-4" />
                ) : (
                  <ChevronDown size={18} className="shrink-0 ml-4" />
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
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-5 py-12 text-center sm:px-8">
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
            <Phone size={14} /> (302) 922-1428
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
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5 sm:px-8">
          <Logo className="text-xl text-secondary" />
          <a
            href="#pricing"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow transition active:scale-[0.97] hover:shadow-md"
          >
            Get Your Score
          </a>
        </div>
      </nav>

      <div id="hero">
        <HeroSection />
      </div>
      <ProblemSection />
      <HowItWorksSection />
      <div id="pricing">
        <PricingSection />
      </div>
      <CredibilitySection />
      <FAQSection />
      <Footer />
    </div>
  );
}
