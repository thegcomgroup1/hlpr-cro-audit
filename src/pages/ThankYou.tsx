import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  ExternalLink,
  FileText,
  Mail,
  Phone,
  Search,
  Send,
} from "lucide-react";

const BOOKING_URL =
  "https://api.leadconnectorhq.com/widget/booking/aiMEM9Qf7GmaU0L6sTYT";

function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`font-extrabold tracking-tight ${className}`}>
      hlpr<span className="text-primary">.</span>
    </span>
  );
}

function Nav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5 sm:px-8">
        <Link to="/" aria-label="HLPR home">
          <Logo className="text-xl text-secondary" />
        </Link>
        <Link
          to="/#pricing"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow transition active:scale-[0.97] hover:shadow-md"
        >
          Get Your Score
        </Link>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-secondary text-secondary-foreground">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-5 py-12 text-center sm:px-8">
        <Logo className="text-2xl text-primary-foreground" />
        <p className="text-sm opacity-70">Email Marketing & Automation for E-Commerce</p>
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

const STEPS = [
  {
    icon: Search,
    title: "We analyze your site",
    body: "We dig into your homepage, mobile experience, checkout flow, product pages, email capture, and site speed.",
  },
  {
    icon: FileText,
    title: "We generate your report",
    body: "You get a custom PDF with scored findings, prioritized fixes, and estimated revenue impact.",
  },
  {
    icon: Send,
    title: "You get the playbook",
    body: "Delivered to your inbox in 60 minutes for Mini Audits, 24 hours for Full Audits — with clear, actionable recommendations you can ship this week.",
  },
];

function SuccessView() {
  return (
    <>
      {/* Hero */}
      <section className="px-5 pb-10 pt-32 sm:px-8 sm:pt-36">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 size={56} className="text-primary" strokeWidth={2.25} />
          </div>
          <h1 className="text-balance text-3xl font-extrabold tracking-tight text-secondary sm:text-4xl md:text-5xl">
            Payment confirmed. Your audit is on the way.
          </h1>
          <p className="mt-4 max-w-xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
            We received your payment and your audit is being prepared. You'll get it in your inbox within 60 minutes (Mini) or 24 hours (Full).
          </p>
        </div>
      </section>

      {/* What happens next */}
      <section className="px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-xl font-bold tracking-tight text-secondary sm:text-2xl">
            What happens next
          </h2>
          <ol className="mt-8 grid gap-4 sm:gap-5">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <li
                  key={step.title}
                  className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 shadow-sm sm:gap-5 sm:p-6"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Icon size={18} className="text-primary" />
                      <h3 className="text-base font-semibold text-secondary sm:text-lg">
                        {step.title}
                      </h3>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {step.body}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Upsell CTA */}
      <section className="px-5 pb-20 sm:px-8">
        <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-muted/40 p-6 text-center sm:p-10">
          <h2 className="text-balance text-2xl font-extrabold tracking-tight text-secondary sm:text-3xl">
            Want faster results? Book a free strategy call.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-balance text-sm leading-relaxed text-muted-foreground sm:text-base">
            Jump on a 15-minute call with Timothy and get your audit findings walked through live, plus a roadmap to implement the fixes.
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-7 text-sm font-semibold text-primary-foreground shadow-md transition active:scale-[0.97] hover:shadow-lg sm:text-base"
          >
            <Calendar size={18} /> Book a Strategy Call
          </a>
          <div className="mt-5">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-secondary"
            >
              <ArrowLeft size={14} /> Back to homepage
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function FallbackView() {
  return (
    <section className="px-5 pb-20 pt-32 sm:px-8 sm:pt-36">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <h1 className="text-balance text-3xl font-extrabold tracking-tight text-secondary sm:text-4xl">
          Looks like you landed here directly.
        </h1>
        <p className="mt-4 max-w-lg text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
          Head back to the homepage to start your audit.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-7 text-sm font-semibold text-primary-foreground shadow-md transition active:scale-[0.97] hover:shadow-lg sm:text-base"
        >
          <ArrowLeft size={16} /> Back to audit.hlpr.io
        </Link>
      </div>
    </section>
  );
}

export default function ThankYou() {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const isValid = useMemo(
    () => Boolean(sessionId && /^cs_(live|test)_/.test(sessionId)),
    [sessionId],
  );

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-background">
      <Nav />
      <main className="flex-1">{isValid ? <SuccessView /> : <FallbackView />}</main>
      <Footer />
    </div>
  );
}
