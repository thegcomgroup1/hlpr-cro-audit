import { Mail, Globe, Compass, ArrowRight } from "lucide-react";
import { STRIPE_PAYMENT_LINK } from "@/lib/strategy-call";

const PATHS = [
  {
    icon: Mail,
    headline: "Your audit reveals weak email capture",
    body:
      "Free 7-day popup install proves we can capture more leads. Then Bronze ($500), Silver ($1K/mo), or Gold ($1.5K/mo) builds the system that nurtures them into revenue.",
    cta: "See Email Plans",
    href: "https://solutions.hlpr.io/#email-pricing",
    external: true,
  },
  {
    icon: Globe,
    headline: "Your audit reveals a broken or outdated website",
    body:
      "We design, build, and manage a new conversion-focused site in 14 days. Free homepage preview in 72 hours — no payment until you approve. Builds start at $1,500.",
    cta: "See Website Builds",
    href: "https://solutions.hlpr.io/#website-pricing",
    external: true,
  },
  {
    icon: Compass,
    headline: "Your audit reveals deeper systemic issues",
    body:
      "The $997 strategy call is for brands at $100K+/mo who want senior eyes on the funnel. 90 minutes of dedicated work, money-back if you don't book a retainer follow-up.",
    cta: "Book Strategy Call — $997",
    href: STRIPE_PAYMENT_LINK,
    external: true,
  },
];

export default function WhatHappensAfter() {
  return (
    <section className="bg-muted/40">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 md:py-20">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            After the audit
          </p>
          <h2
            className="mt-3 text-3xl font-extrabold tracking-tight text-secondary sm:text-4xl"
            style={{ textWrap: "balance" } as React.CSSProperties}
          >
            Three paths forward.
          </h2>
          <p
            className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base"
            style={{ textWrap: "pretty" } as React.CSSProperties}
          >
            The audit ships you a prioritized fix list. What you do with it is
            up to you. Implement yourself, or pick the path that matches what
            we found.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {PATHS.map(({ icon: Icon, headline, body, cta, href, external }) => (
            <div
              key={headline}
              className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon size={20} strokeWidth={2} />
              </div>
              <h3 className="mt-4 text-base font-bold leading-snug text-secondary sm:text-lg">
                {headline}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {body}
              </p>
              <a
                href={href}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-primary transition hover:text-primary/80"
              >
                {cta}
                <ArrowRight size={14} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
