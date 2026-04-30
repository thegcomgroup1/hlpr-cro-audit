import { ShieldCheck } from "lucide-react";

export default function FinalCtaBand() {
  const handleClick = () => {
    const target = document.getElementById("strategy-call");
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="bg-secondary text-secondary-foreground">
      <div className="mx-auto max-w-4xl px-5 py-14 text-center sm:px-8 md:py-20">
        <h2
          className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl"
          style={{ textWrap: "balance" } as React.CSSProperties}
        >
          Stop paying for traffic that doesn't convert.
        </h2>
        <p
          className="mx-auto mt-5 max-w-2xl text-base leading-relaxed opacity-80 sm:text-lg"
          style={{ textWrap: "pretty" } as React.CSSProperties}
        >
          90 minutes of dedicated work on your business — a{" "}
          <span className="font-bold text-primary-foreground">
            20-min Loom walkthrough
          </span>{" "}
          delivered in 48 hours, plus a{" "}
          <span className="font-bold text-primary-foreground">
            30-min live Q&amp;A
          </span>{" "}
          to map what's worth real money.
        </p>

        <button
          type="button"
          onClick={handleClick}
          className="mt-8 inline-flex h-14 items-center justify-center rounded-xl bg-primary px-8 text-base font-bold text-primary-foreground shadow-lg shadow-primary/30 transition active:scale-[0.97] hover:shadow-xl"
        >
          Book Strategy Call — $997
        </button>

        <p className="mt-4 inline-flex items-center gap-1.5 text-xs opacity-75">
          <ShieldCheck size={14} className="text-primary" />
          Money-back if you don't book a retainer follow-up.
        </p>
      </div>
    </section>
  );
}
