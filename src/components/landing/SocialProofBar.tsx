import { Users, Sparkles, BarChart3, ShieldCheck } from "lucide-react";

const STATS = [
  { icon: Users, value: "400+", label: "Audits delivered" },
  { icon: BarChart3, value: "80+", label: "Niches covered" },
  { icon: Sparkles, value: "50+", label: "Conversion factors" },
  { icon: ShieldCheck, value: "100%", label: "Money-back guarantee" },
];

export default function SocialProofBar() {
  return (
    <section className="border-y border-border bg-card">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-5 py-8 sm:grid-cols-4 sm:px-8">
        {STATS.map(({ icon: Icon, value, label }) => (
          <div key={label} className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Icon size={18} />
            </div>
            <div className="min-w-0">
              <p className="text-xl font-extrabold leading-none text-secondary">
                {value}
              </p>
              <p className="mt-1 text-xs font-medium leading-snug text-muted-foreground">
                {label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
