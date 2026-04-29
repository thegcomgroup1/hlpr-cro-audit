import { Mail, Globe, Compass, ArrowRight } from "lucide-react";

const PATHS = [
  {
    icon: Mail,
    headline: "Your audit reveals weak email capture",
    body:
      "We install a custom email popup free for 7 days. If it captures more emails than your current setup, we discuss the full email retainer (Bronze, Silver, or Gold).",
    cta: "See Email Plans",
    href: "https://solutions.hlpr.io/#email-pricing",
  },
  {
    icon: Globe,
    headline: "Your audit reveals a broken or outdated website",
    body:
      "We design, build, and manage a new conversion-focused site in 14 days. Free homepage preview in 72 hours — no payment until you approve.",
    cta: "See Website Builds",
    href: "https://solutions.hlpr.io/#website-pricing",
  },
  {
    icon: Compass,
    headline: "Your audit reveals deeper systemic issues",
    body:
      "Book a free 20-minute strategy call and we'll map a 90-day plan for funnel, email, and growth.",
    cta: "Book Strategy Call",
    href: "https://links.hlpr.io/booking/aiMEM9Qf7GmaU0L6sTYT",
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
          {PATHS.map(({ icon: Icon, headline, body, cta, href }) => (
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
                target="_blank"
                rel="noopener noreferrer"
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
