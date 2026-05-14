import { useLocation, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Check, ChevronDown, ChevronUp, ExternalLink, Mail, Phone, ShieldCheck, Star } from "lucide-react";
import { useState } from "react";
import { STRIPE_PAYMENT_LINK } from "@/lib/strategy-call";
import SocialProofBar from "@/components/landing/SocialProofBar";
import PortfolioStrip from "@/components/landing/PortfolioStrip";
import WallOfLove from "@/components/landing/WallOfLove";
import FudStrip from "@/components/landing/FudStrip";
import FounderSection from "@/components/landing/FounderSection";
import FreeScoreSection from "@/components/landing/FreeScoreSection";
import FinalCtaBand from "@/components/landing/FinalCtaBand";
import WhatHappensAfter from "@/components/landing/WhatHappensAfter";
import { getPageBySlug, type ProgrammaticPage } from "@/data/programmatic-pages";

const BASE = "https://audit.hlpr.io";

function Logo({ className = "" }: { className?: string }) {
  return <span className={`font-extrabold tracking-tight ${className}`}>hlpr</span>;
}

function ProgrammaticHero({ page }: { page: ProgrammaticPage }) {
  return (
    <section className="relative overflow-hidden bg-background pt-24 sm:pt-28">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[640px] bg-gradient-to-b from-muted/60 to-background"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-6xl px-5 pb-12 sm:px-8 md:pb-16 md:pt-8">
        <nav aria-label="Breadcrumb" className="mb-4 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-secondary">{page.eyebrow}</span>
        </nav>

        <div className="grid items-center gap-8 md:grid-cols-[1.1fr_1fr] md:gap-10">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {page.eyebrow}
            </div>

            <h1
              className="mt-5 text-[2.25rem] font-extrabold leading-[1.05] tracking-tight text-secondary sm:text-5xl md:text-[3rem]"
              style={{ textWrap: "balance" } as React.CSSProperties}
            >
              {page.h1}
            </h1>

            <p
              className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg md:mx-0"
              style={{ textWrap: "pretty" } as React.CSSProperties}
            >
              {page.subhead}
            </p>

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
                For {page.audienceLabel}. Money-back guarantee.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground md:justify-start">
              <span className="inline-flex items-center gap-1.5">
                <Star size={14} className="fill-primary text-primary" /> 400+ audits delivered
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-primary" /> Money-back guarantee
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-lg">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              What you get
            </p>
            <ul className="mt-4 space-y-3">
              {page.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  <span className="text-sm leading-relaxed text-secondary">{b}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground">
              {page.intro}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProgrammaticFAQ({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-card">
      <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-secondary sm:text-4xl">
          Frequently asked questions
        </h2>
        <div className="mt-10 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="rounded-xl border border-border bg-background">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-base font-semibold text-secondary">{f.q}</span>
                  {isOpen ? (
                    <ChevronUp size={18} className="shrink-0 text-muted-foreground" />
                  ) : (
                    <ChevronDown size={18} className="shrink-0 text-muted-foreground" />
                  )}
                </button>
                {isOpen && (
                  <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Logo className="text-2xl text-primary-foreground" />
            <p className="mt-2 text-sm opacity-80">
              CRO audits for $50K+/mo e-commerce & service businesses.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm opacity-90">
            <a href="mailto:tim@hlpr.io" className="flex items-center gap-1.5 transition hover:opacity-100">
              <Mail size={14} /> tim@hlpr.io
            </a>
            <a href="tel:+13025508521" className="flex items-center gap-1.5 transition hover:opacity-100">
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
        </div>
        <p className="mt-4 text-xs opacity-70">© {new Date().getFullYear()} HLPR. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default function ProgrammaticAudit() {
  const location = useLocation();
  const slug = location.pathname.replace(/^\/+|\/+$/g, "");
  const page = getPageBySlug(slug);

  if (!page) return <Navigate to="/404" replace />;

  const url = `${BASE}/${page.slug}`;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE + "/" },
      { "@type": "ListItem", position: 2, name: page.eyebrow, item: url },
    ],
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.eyebrow,
    description: page.description,
    provider: { "@type": "Organization", name: "HLPR", url: BASE + "/" },
    areaServed: "Worldwide",
    offers: { "@type": "Offer", price: "997", priceCurrency: "USD" },
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Helmet>
        <title>{page.title}</title>
        <meta name="description" content={page.description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={page.title} />
        <meta property="og:description" content={page.description} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${BASE}/og-image.jpg`} />
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(serviceJsonLd)}</script>
      </Helmet>

      <nav className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 sm:px-8">
          <Link to="/" className="text-xl"><Logo className="text-primary" /></Link>
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

      <main>
        <ProgrammaticHero page={page} />
        <SocialProofBar />
        <PortfolioStrip />
        <WallOfLove />
        <WhatHappensAfter />
        <FudStrip />
        <FounderSection />
        <FreeScoreSection />
        <ProgrammaticFAQ faqs={page.faqs} />
        <FinalCtaBand />
      </main>
      <Footer />
    </div>
  );
}
