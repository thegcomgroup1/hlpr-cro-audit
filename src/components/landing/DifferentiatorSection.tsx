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
    us: "48-hour turnaround",
  },
  {
    label: "Risk",
    others: "Pay first, hope it's useful",
    us: "100% money-back if we don't find 5+ revenue-impacting fixes",
  },
];

export default function DifferentiatorSection() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 md:py-28">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Why hlpr
          </p>
          <h2
            className="mt-3 text-3xl font-extrabold tracking-tight text-secondary sm:text-4xl"
            style={{ textWrap: "balance" } as React.CSSProperties}
          >
            Other audits hand you a checklist. We hand you a playbook.
          </h2>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          {/* Header */}
          <div className="grid grid-cols-[1fr_1fr_1.2fr] border-b border-border bg-muted/50 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <div className="px-5 py-3" />
            <div className="px-5 py-3">Other audits</div>
            <div className="bg-primary/10 px-5 py-3 text-primary">hlpr</div>
          </div>
          {/* Rows */}
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
