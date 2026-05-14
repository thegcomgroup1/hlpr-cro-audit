import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft, Eye, Copy, RefreshCw, CheckCircle2 } from "lucide-react";
import IntakeForm, { type IntakeAnswers } from "@/components/audit/IntakeForm";

const TIERS = [
  { id: "mini" as const, label: "Mini", price: "29" },
  { id: "full" as const, label: "Full", price: "99" },
];

const DRAFT_KEY = "hlpr_intake_draft_v2";

export default function IntakePreview() {
  const [tier, setTier] = useState<"mini" | "full">("full");
  const [submitted, setSubmitted] = useState<IntakeAnswers | null>(null);
  const [copied, setCopied] = useState(false);

  const meta = TIERS.find((t) => t.id === tier)!;

  const handleComplete = (answers: IntakeAnswers) => {
    setSubmitted(answers);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const reset = () => {
    try { localStorage.removeItem(DRAFT_KEY); } catch (_) { /* noop */ }
    setSubmitted(null);
    window.location.reload();
  };

  const copyJson = async () => {
    if (!submitted) return;
    await navigator.clipboard.writeText(JSON.stringify(submitted, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Intake Form Preview | HLPR</title>
        <meta name="description" content="Internal QA preview of the HLPR audit intake form. No payment is taken on this page." />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://audit.hlpr.io/audit/intake-preview" />
      </Helmet>
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition hover:text-secondary"
          >
            <ArrowLeft size={14} /> Back to landing
          </Link>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-2.5 py-1 text-xs font-bold text-primary">
            <Eye size={12} /> Preview mode
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
        {/* Title */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-extrabold tracking-tight text-secondary sm:text-3xl">
            Intake Form Preview
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Standalone QA view. No payment is taken. Captured answers show below on submit.
          </p>
        </div>

        {/* Tier toggle */}
        <div className="mb-4 flex flex-col items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Tier
          </span>
          <div className="inline-flex rounded-lg border border-border bg-card p-1 shadow-sm">
            {TIERS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTier(t.id)}
                className={`rounded-md px-4 py-1.5 text-sm font-bold transition ${
                  tier === t.id
                    ? "bg-primary text-primary-foreground shadow"
                    : "text-secondary hover:bg-muted"
                }`}
              >
                {t.label} · ${t.price}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={reset}
            className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground transition hover:text-destructive"
          >
            <RefreshCw size={11} /> Reset draft & reload
          </button>
        </div>

        {/* Captured answers */}
        {submitted && (
          <div className="mb-6 overflow-hidden rounded-2xl border border-primary/30 bg-primary/5 shadow-md">
            <div className="flex items-center justify-between gap-3 border-b border-primary/20 bg-primary/10 px-4 py-2.5">
              <div className="inline-flex items-center gap-1.5 text-sm font-bold text-primary">
                <CheckCircle2 size={14} /> Captured intake_answers (JSONB payload)
              </div>
              <button
                type="button"
                onClick={copyJson}
                className="inline-flex items-center gap-1 rounded-md bg-card px-2.5 py-1 text-xs font-semibold text-secondary shadow-sm transition hover:bg-muted"
              >
                <Copy size={11} /> {copied ? "Copied!" : "Copy JSON"}
              </button>
            </div>
            <pre className="max-h-72 overflow-auto bg-secondary/95 p-4 text-[11px] leading-relaxed text-secondary-foreground">
              {JSON.stringify(submitted, null, 2)}
            </pre>
            <p className="border-t border-primary/20 bg-card px-4 py-2 text-[11px] text-muted-foreground">
              These keys map 1:1 to the mega-prompt's <code className="font-mono text-secondary">{"{{variable}}"}</code> tokens.
            </p>
          </div>
        )}

        {/* Form card — mimics modal sizing */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-xl sm:p-8">
          <IntakeForm
            key={tier /* remount on tier change so progress bar resets cleanly */}
            onComplete={handleComplete}
            submitting={false}
            tierLabel={meta.label}
            tierPrice={meta.price}
          />
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Real funnel: <span className="font-mono text-secondary">/</span> →
          contact step → this form → Stripe. This page skips contact + payment.
        </p>
      </main>
    </div>
  );
}
