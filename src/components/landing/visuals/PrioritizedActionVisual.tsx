/**
 * Audit-UI snippet showing the Top Priorities numbered list.
 * Mirrors the Top Priorities section of the actual CRO Score Report.
 */

const PRIORITIES = [
  {
    title: "Remove 1,172 KiB unused JS to fix 10.5s Speed Index",
    impact: "High",
    effort: "Medium",
    lift: "$1,000/mo",
  },
  {
    title: "Add exit-intent popup to recover slow-loading abandoners",
    impact: "High",
    effort: "Quick Win",
    lift: "$750/mo",
  },
  {
    title: "Install live chat for product / ingredient questions",
    impact: "High",
    effort: "Quick Win",
    lift: "$550/mo",
  },
];

export default function PrioritizedActionVisual() {
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm">
      {/* Navy header */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ backgroundColor: "#0E1E3F" }}
      >
        <span
          className="text-[10px] font-bold uppercase tracking-[0.2em]"
          style={{ color: "#1D9E75" }}
        >
          HLPR
        </span>
        <span className="text-xs font-semibold text-white sm:text-sm">
          Top Priorities — Week 1
        </span>
      </div>

      {/* Priority list */}
      <div className="flex flex-col divide-y" style={{ borderColor: "#E5E7EB" }}>
        {PRIORITIES.map((p, idx) => (
          <div
            key={p.title}
            className="flex items-start gap-3 px-4 py-3"
            style={{ borderColor: "#E5E7EB" }}
          >
            <div
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
              style={{ backgroundColor: "#1AA3FF" }}
            >
              {idx + 1}
            </div>
            <div className="min-w-0 flex-1">
              <p
                className="text-[12px] font-bold leading-snug"
                style={{ color: "#0E1E3F" }}
              >
                {p.title}
              </p>
              <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                <span
                  className="rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider"
                  style={{ backgroundColor: "#FCEBEB", color: "#791F1F" }}
                >
                  Impact: {p.impact}
                </span>
                <span
                  className="rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider"
                  style={{ backgroundColor: "#E8F4FD", color: "#0B5394" }}
                >
                  Effort: {p.effort}
                </span>
                <span
                  className="text-[10px] font-bold"
                  style={{ color: "#1D9E75" }}
                >
                  +{p.lift}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer total */}
      <div
        className="flex items-center justify-between border-t px-4 py-3"
        style={{ backgroundColor: "#F0FAF6", borderColor: "#D5EFE3" }}
      >
        <span
          className="text-[10px] font-bold uppercase tracking-[0.18em]"
          style={{ color: "#0E1E3F" }}
        >
          Combined monthly lift
        </span>
        <span
          className="text-base font-extrabold tracking-tight"
          style={{ color: "#1D9E75" }}
        >
          +$2,300/mo
        </span>
      </div>
    </div>
  );
}
