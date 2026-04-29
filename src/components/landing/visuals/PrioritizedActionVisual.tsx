/**
 * Audit-UI snippet showing the Top Priorities numbered list.
 * Mirrors the Top Priorities section of the actual CRO Score Report.
 */

const PRIORITIES = [
  {
    title: "Remove 1,172 KiB unused JS to fix 10.5s Speed Index",
    meta: "Impact: High · Effort: Medium · Est. $1,000/mo",
  },
  {
    title: "Add exit-intent popup to recover slow-loading abandoners",
    meta: "Impact: High · Effort: Quick Win · Est. $750/mo",
  },
  {
    title: "Install live chat for product / ingredient questions",
    meta: "Impact: High · Effort: Quick Win · Est. $550/mo",
  },
];

export default function PrioritizedActionVisual() {
  return (
    <div className="flex h-full w-full flex-col gap-3 overflow-hidden rounded-2xl bg-white p-4 shadow-sm">
      <h4
        className="text-sm font-extrabold tracking-tight"
        style={{ color: "#0E1E3F" }}
      >
        Top Priorities
      </h4>

      {PRIORITIES.map((p, idx) => (
        <div key={p.title} className="flex items-start gap-3">
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
            <p
              className="mt-1 text-[10px] font-medium"
              style={{ color: "#6B7280" }}
            >
              {p.meta}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
