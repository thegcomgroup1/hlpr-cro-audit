import { ShieldCheck } from "lucide-react";
import type { AuditTier } from "@/components/AuditCheckoutModal";

interface Props {
  onSelectTier: (tier: AuditTier) => void;
}

export default function FinalCtaBand({ onSelectTier }: Props) {
  return (
    <section className="bg-secondary text-secondary-foreground">
      <div className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 md:py-24">
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
          Get your prioritized fix list with revenue-impact estimates within{" "}
          <span className="font-bold text-primary-foreground">60 minutes</span> —
          backed by a <span className="font-bold text-primary-foreground">100% money-back guarantee</span>.
        </p>

        <button
          type="button"
          onClick={() => onSelectTier("mini")}
          className="mt-8 inline-flex h-14 items-center justify-center rounded-xl bg-primary px-8 text-base font-bold text-primary-foreground shadow-lg shadow-primary/30 transition active:scale-[0.97] hover:shadow-xl"
        >
          Get My Revenue Leak Report — $29
        </button>

        <p className="mt-4 inline-flex items-center gap-1.5 text-xs opacity-75">
          <ShieldCheck size={14} className="text-primary" />
          Refund if we don't surface 5+ revenue-impacting fixes.
        </p>
      </div>
    </section>
  );
}
