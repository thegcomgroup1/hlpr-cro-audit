/**
 * Audit-UI snippet showing the score gauge + revenue gap callout.
 * Mirrors the top section of the actual CRO Score Report.
 */
export default function CustomerJourneyVisual() {
  const score = 72;
  const dash = `${score}, 100`;

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm">
      {/* Navy header bar */}
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
          Your CRO Score Report
        </span>
      </div>

      {/* Score gauge */}
      <div className="flex flex-col items-center px-4 pt-5">
        <div className="relative flex h-[88px] w-[88px] items-center justify-center">
          <svg viewBox="0 0 36 36" className="h-[88px] w-[88px] -rotate-90">
            <circle
              cx="18"
              cy="18"
              r="15.9"
              fill="none"
              stroke="#F5E9D7"
              strokeWidth="3"
            />
            <circle
              cx="18"
              cy="18"
              r="15.9"
              fill="none"
              stroke="#D97706"
              strokeWidth="4"
              strokeDasharray={dash}
              strokeLinecap="round"
            />
          </svg>
          <span
            className="absolute font-serif text-[28px] font-bold leading-none"
            style={{ color: "#0E1E3F" }}
          >
            {score}
          </span>
        </div>
        <p
          className="mt-2 text-[9px] font-semibold uppercase tracking-[0.18em]"
          style={{ color: "#6B7280" }}
        >
          Free CRO score
        </p>
        <p
          className="mt-1 text-sm font-semibold"
          style={{ color: "#D97706" }}
        >
          Good — Room to Grow
        </p>
      </div>

      {/* Revenue gap callout */}
      <div
        className="mx-4 mb-5 mt-5 rounded-r-md py-3 pl-4 pr-3"
        style={{
          backgroundColor: "#FAEEDA",
          borderLeft: "3px solid #D97706",
        }}
      >
        <p
          className="text-[9px] font-bold uppercase tracking-[0.18em]"
          style={{ color: "#633806" }}
        >
          Estimated monthly revenue gap
        </p>
        <p
          className="mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl"
          style={{ color: "#B45309" }}
        >
          $2,800–$5,200
        </p>
      </div>
    </div>
  );
}
