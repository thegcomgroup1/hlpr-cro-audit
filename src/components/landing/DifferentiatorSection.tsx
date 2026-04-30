import { X, Check } from "lucide-react";

const ROWS: Array<{ label: string; others: string; us: string }> = [
  {
    label: "Approach",
    others: "Generic checklist run by a tool",
    us: "Hand-audited by a CRO strategist who's seen 400+ stores",
  },
  {
    label: "Output",
    others: "100 things to fix, no priority",
    us: "Ranked by impact ÷ effort, with revenue estimates",
  },
  {
    label: "Speed",
    others: "2–4 weeks for a real audit",
    us: "60-second Free Score · 48-hour Strategy Loom",
  },
  {
    label: "Pricing",
    others: "$2K–$10K for a static PDF",
    us: "Free score · $997 strategy call · retainers from $500",
  },
  {
    label: "Risk",
    others: "Pay first, hope it's useful",
    us: "100% money-back if you don't book a retainer follow-up",
  },
];

export default function DifferentiatorSection() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-md px-5 py-10 sm:max-w-5xl sm:px-8 md:py-20">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Why hlpr
          </p>
          <h2
            className="mt-3 text-2xl font-extrabold tracking-tight text-secondary sm:text-4xl"
            style={{ textWrap: "balance" } as React.CSSProperties}
          >
            Other audits hand you a checklist. We hand you a playbook.
          </h2>
        </div>

        {/* Mobile: stacked cards */}
        <div className="mt-7 space-y-3 sm:hidden">
          {ROWS.map((row) => (
            <div
              key={row.label}
              className="overflow-hidden rounded-xl border border-border bg-card shadow-sm"
            >
              <div className="border-b border-border bg-muted/50 px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-secondary">
                {row.label}
              </div>
              <div className="grid grid-cols-2 divide-x divide-border">
                <div className="p-3">
                  <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Other audits
                  </p>
                  <div className="flex items-start gap-1.5">
                    <X
                      size={14}
                      className="mt-0.5 shrink-0 text-destructive/70"
                    />
                    <span className="text-[13px] leading-snug text-muted-foreground">
                      {row.others}
                    </span>
                  </div>
                </div>
                <div className="bg-primary/[0.06] p-3">
                  <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                    hlpr
                  </p>
                  <div className="flex items-start gap-1.5">
                    <Check
                      size={14}
                      strokeWidth={2.5}
                      className="mt-0.5 shrink-0 text-primary"
                    />
                    <span className="text-[13px] font-medium leading-snug text-secondary">
                      {row.us}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: 3-col grid */}
        <div className="mt-8 hidden overflow-hidden rounded-2xl border border-border bg-card shadow-sm sm:block">
          <div className="grid grid-cols-[1fr_1fr_1.2fr] border-b border-border bg-muted/50 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <div className="px-5 py-3" />
            <div className="px-5 py-3">Other audits</div>
            <div className="bg-primary/10 px-5 py-3 text-primary">hlpr</div>
          </div>
          {ROWS.map((row, i) => (
            <div
              key={row.label}
              className={`grid grid-cols-[1fr_1fr_1.2fr] items-start gap-x-2 ${
                i !== ROWS.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="px-5 py-4 text-sm font-bold text-secondary">
                {row.label}
              </div>
              <div className="flex items-start gap-2 px-5 py-4 text-sm text-muted-foreground">
                <X size={16} className="mt-0.5 shrink-0 text-destructive/70" />
                <span className="leading-snug">{row.others}</span>
              </div>
              <div className="flex items-start gap-2 bg-primary/[0.04] px-5 py-4 text-sm text-secondary">
                <Check
                  size={16}
                  strokeWidth={2.5}
                  className="mt-0.5 shrink-0 text-primary"
                />
                <span className="font-medium leading-snug">{row.us}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
