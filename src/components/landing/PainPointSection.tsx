import { X, ArrowRight } from "lucide-react";

const PAINS = [
  "Are you spending money on ads but not seeing the conversions you expected?",
  "Do you suspect your site has problems but have no idea which fix actually moves the needle?",
  "Have you tried generic tools like PageSpeed and walked away with a checklist that didn't change a thing?",
];

export default function PainPointSection() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8 md:py-28">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-primary">
          Sound familiar?
        </p>
        <h2
          className="mt-3 text-center text-3xl font-extrabold leading-tight tracking-tight text-secondary sm:text-4xl"
          style={{ textWrap: "balance" } as React.CSSProperties}
        >
          You're driving traffic. It's just not turning into revenue.
        </h2>

        <ul className="mx-auto mt-10 flex max-w-2xl flex-col gap-4">
          {PAINS.map((p) => (
            <li
              key={p}
              className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 text-left shadow-sm"
            >
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                <X size={15} strokeWidth={2.5} />
              </div>
              <p className="text-sm leading-relaxed text-secondary sm:text-base">
                {p}
              </p>
            </li>
          ))}
        </ul>

        {/* Solve transition */}
        <div className="mx-auto mt-10 max-w-2xl rounded-2xl border-2 border-primary/30 bg-primary/[0.04] p-6 text-center sm:p-8">
          <p
            className="text-base leading-relaxed text-secondary sm:text-lg"
            style={{ textWrap: "pretty" } as React.CSSProperties}
          >
            You don't need <span className="font-bold">another tool</span>. You
            don't need to <span className="font-bold">redesign your site</span>.
            <br className="hidden sm:block" /> You need a{" "}
            <span className="font-bold text-primary">
              ranked list of the exact fixes
            </span>{" "}
            that will recover the revenue you're already paying to acquire.
          </p>
          <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
            That's exactly what we deliver in 60 minutes
            <ArrowRight size={14} />
          </p>
        </div>
      </div>
    </section>
  );
}
