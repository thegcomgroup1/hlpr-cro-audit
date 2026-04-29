/**
 * Audit-UI snippet showing 3 Key Findings cards with severity pills + revenue lift.
 * Mirrors the Key Findings section of the actual CRO Score Report.
 */

type Severity = "critical" | "high" | "medium";

interface Finding {
  severity: Severity;
  category: string;
  title: string;
  potential: string;
}

const FINDINGS: Finding[] = [
  {
    severity: "critical",
    category: "Technical Performance",
    title: "Speed Index critically slow at 10.5s with 1,172 KiB unused JS",
    potential: "$800–$1,200/mo",
  },
  {
    severity: "high",
    category: "User Experience",
    title: "No exit-intent popup, missing recovery on slow page abandons",
    potential: "$600–$900/mo",
  },
  {
    severity: "medium",
    category: "Conversion",
    title: "No live chat for product questions during business hours",
    potential: "$400–$700/mo",
  },
];

const SEVERITY_STYLES: Record<Severity, { bg: string; fg: string }> = {
  critical: { bg: "#FCEBEB", fg: "#791F1F" },
  high: { bg: "#FAC775", fg: "#633806" },
  medium: { bg: "#FAEEDA", fg: "#633806" },
};

export default function RevenueImpactVisual() {
  return (
    <div className="flex h-full w-full flex-col gap-2.5 overflow-hidden rounded-2xl bg-white p-4 shadow-sm">
      <h4
        className="text-sm font-extrabold tracking-tight"
        style={{ color: "#0E1E3F" }}
      >
        Key Findings
      </h4>

      {FINDINGS.map((f) => {
        const sev = SEVERITY_STYLES[f.severity];
        return (
          <div
            key={f.title}
            className="rounded-lg border p-3"
            style={{ borderColor: "#E5E7EB" }}
          >
            <div className="flex items-center gap-2">
              <span
                className="rounded px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider"
                style={{ backgroundColor: sev.bg, color: sev.fg }}
              >
                {f.severity}
              </span>
              <span
                className="text-[10px] font-semibold uppercase tracking-wider"
                style={{ color: "#6B7280" }}
              >
                {f.category}
              </span>
            </div>
            <p
              className="mt-1.5 text-[12px] font-bold leading-snug"
              style={{ color: "#0E1E3F" }}
            >
              {f.title}
            </p>
            <p
              className="mt-1 text-[11px] font-semibold"
              style={{ color: "#1D9E75" }}
            >
              Potential: {f.potential}
            </p>
          </div>
        );
      })}
    </div>
  );
}
