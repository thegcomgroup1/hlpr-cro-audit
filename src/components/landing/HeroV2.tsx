import { Star, ShieldCheck, ArrowDown } from "lucide-react";
import ReportMockup from "./ReportMockup";
import { STRIPE_PAYMENT_LINK } from "@/lib/strategy-call";

export default function HeroV2() {
  return (
    <section className="relative overflow-hidden bg-background pt-24 sm:pt-28">
      {/* Soft background wash */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[640px] bg-gradient-to-b from-muted/60 to-background"
        aria-hidden="true"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 pb-12 sm:px-8 md:grid-cols-[1.1fr_1fr] md:gap-10 md:pb-16 md:pt-8">
        {/* Left — copy */}
        <div className="text-center md:text-left">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Conversion Rate Optimization
          </div>

          {/* Headline */}
          <h1
            className="mt-5 text-[2.5rem] font-extrabold leading-[1.05] tracking-tight text-secondary sm:text-5xl md:text-[3.5rem]"
            style={{ textWrap: "balance" } as React.CSSProperties}
          >
            Find what's costing you{" "}
            <span className="text-primary">tens of thousands</span> in lost
            conversions — recorded just for you.
          </h1>

          {/* Sub-headline */}
          <p
            className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg md:mx-0"
            style={{ textWrap: "pretty" } as React.CSSProperties}
          >
            Stop guessing what's breaking your funnel. The founder personally
            records a 20-minute video walkthrough of your site, then meets you
            live for a 30-minute Q&amp;A to map the{" "}
            <span className="font-semibold text-secondary">
              specific fixes worth real money
            </span>{" "}
            for your business.
          </p>

          {/* Primary CTA */}
          <div className="mt-7 flex flex-col items-center gap-3 md:items-start">
            <a
              href={STRIPE_PAYMENT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-14 items-center justify-center rounded-xl bg-primary px-8 text-base font-bold text-primary-foreground shadow-lg shadow-primary/25 transition active:scale-[0.97] hover:shadow-xl hover:shadow-primary/30"
            >
              Book My Strategy Call — $997
            </a>

            <p className="text-xs text-muted-foreground">
              Personalized video + 30-min live Q&amp;A. Money-back if you don't
              book a retainer follow-up.
            </p>

            {/* Risk reversal */}
            <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <ShieldCheck size={14} className="text-primary" />
              <span>
                <span className="font-bold text-secondary">100% money-back</span>{" "}
                if you don't book a retainer follow-up.
              </span>
            </p>

            {/* Secondary link */}
            <a
              href="#free-score"
              className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-primary transition hover:text-primary/80"
            >
              Or get a free CRO score in 60 seconds
              <ArrowDown size={14} />
            </a>
          </div>

          {/* Inline social proof */}
          <div className="mt-6 flex flex-col items-center gap-2 border-t border-border pt-5 text-center md:items-start md:text-left">
            <div className="flex items-center gap-1 text-primary">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
              ))}
              <span className="ml-1.5 text-xs font-semibold text-secondary">
                Trusted by founders managing
              </span>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              <span className="font-bold text-secondary">$916K</span> in Google
              Ads ·{" "}
              <span className="font-bold text-secondary">$170K</span> generated
              via email ·{" "}
              <span className="font-bold text-secondary">68%</span> open rates
            </p>
          </div>
        </div>

        {/* Right — report mockup */}
        <div className="relative">
          <ReportMockup />
        </div>
      </div>
    </section>
  );
}
