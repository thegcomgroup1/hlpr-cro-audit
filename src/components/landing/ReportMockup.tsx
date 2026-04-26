import { FileText, AlertTriangle, CheckCircle2, TrendingUp } from "lucide-react";

/**
 * Pure-SVG/Tailwind illustration of the audit deliverable.
 * No stock photos. Reusable in hero + "what you get" sections.
 */
export default function ReportMockup({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative mx-auto w-full max-w-md ${className}`}
      aria-hidden="true"
    >
      {/* Glow */}
      <div className="absolute inset-x-8 top-8 -z-10 h-72 rounded-full bg-primary/20 blur-3xl" />

      {/* Document */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between bg-secondary px-5 py-3 text-secondary-foreground">
          <div className="flex items-center gap-2">
            <FileText size={14} className="opacity-80" />
            <span className="text-xs font-semibold tracking-wide">
              hlpr · CRO AUDIT REPORT
            </span>
          </div>
          <span className="text-[10px] font-medium uppercase tracking-widest opacity-60">
            v1.0
          </span>
        </div>

        {/* Score gauge */}
        <div className="flex items-center gap-5 border-b border-border px-5 py-5">
          <div className="relative flex h-20 w-20 shrink-0 items-center justify-center">
            <svg viewBox="0 0 36 36" className="h-20 w-20 -rotate-90">
              <circle
                cx="18"
                cy="18"
                r="15.9"
                fill="none"
                className="stroke-muted"
                strokeWidth="3"
              />
              <circle
                cx="18"
                cy="18"
                r="15.9"
                fill="none"
                className="stroke-primary"
                strokeWidth="3"
                strokeDasharray="64, 100"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-extrabold leading-none text-secondary">
                64
              </span>
              <span className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
                / 100
              </span>
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-primary">
              Overall CRO Score
            </p>
            <p className="mt-0.5 text-sm font-bold text-secondary">
              Above average — but leaking revenue
            </p>
            <p className="mt-1 text-xs leading-snug text-muted-foreground">
              Estimated impact of fixes:{" "}
              <span className="font-bold text-secondary">
                +$5,800/mo
              </span>
            </p>
          </div>
        </div>

        {/* Sub-scores */}
        <div className="grid grid-cols-2 gap-x-5 gap-y-2 px-5 py-4 text-xs">
          {[
            ["Above-the-fold", 58],
            ["Social proof", 42],
            ["Mobile UX", 71],
            ["Checkout flow", 66],
          ].map(([label, score]) => (
            <div key={label as string} className="flex items-center gap-2">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${score}%` }}
                />
              </div>
              <span className="w-7 shrink-0 text-right text-[10px] font-semibold text-muted-foreground">
                {score}
              </span>
            </div>
          ))}
          <div className="col-span-2 mt-1 grid grid-cols-2 gap-x-5 text-[10px] font-medium text-muted-foreground">
            <span>Above-the-fold</span>
            <span>Social proof</span>
            <span>Mobile UX</span>
            <span>Checkout flow</span>
          </div>
        </div>

        {/* Sample finding */}
        <div className="border-t border-border bg-muted/40 px-5 py-4">
          <div className="flex items-start gap-2.5">
            <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
              <AlertTriangle size={13} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-destructive">
                Finding · Priority 1
              </p>
              <p className="mt-0.5 text-xs font-bold text-secondary">
                No risk reversal under primary CTA
              </p>
              <p className="mt-1 text-[11px] leading-snug text-muted-foreground">
                Visitors hesitate at checkout. Adding a money-back guarantee
                directly under the buy button typically lifts CVR{" "}
                <span className="font-bold text-secondary">8–14%</span>.
              </p>
              <div className="mt-2 flex items-center gap-3 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1">
                  <TrendingUp size={10} className="text-primary" />
                  <span className="font-semibold text-secondary">
                    +$1,200/mo
                  </span>
                </span>
                <span>· Effort 1/5</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick win */}
        <div className="flex items-center gap-2 border-t border-border px-5 py-3 text-[11px] text-muted-foreground">
          <CheckCircle2 size={13} className="text-primary" />
          <span>
            <span className="font-semibold text-secondary">12 more findings</span>{" "}
            · sequenced by impact ÷ effort
          </span>
        </div>
      </div>
    </div>
  );
}
