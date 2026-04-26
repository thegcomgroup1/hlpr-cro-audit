import { Check, type LucideIcon } from "lucide-react";

interface Props {
  eyebrow: string;
  headline: string;
  body: string;
  bullets: string[];
  icon: LucideIcon;
  reverse?: boolean;
}

export default function ValuePropRow({
  eyebrow,
  headline,
  body,
  bullets,
  icon: Icon,
  reverse = false,
}: Props) {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-24">
        <div
          className={`grid items-center gap-10 md:grid-cols-2 md:gap-16 ${
            reverse ? "md:[&>*:first-child]:order-2" : ""
          }`}
        >
          {/* Visual */}
          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-muted via-card to-muted/40 p-10 shadow-sm">
              <div className="flex h-full w-full items-center justify-center rounded-2xl border border-border bg-card">
                <div className="flex flex-col items-center gap-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon size={40} strokeWidth={1.5} />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {eyebrow}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Copy */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              {eyebrow}
            </p>
            <h3
              className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-secondary sm:text-4xl"
              style={{ textWrap: "balance" } as React.CSSProperties}
            >
              {headline}
            </h3>
            <p
              className="mt-4 text-base leading-relaxed text-muted-foreground"
              style={{ textWrap: "pretty" } as React.CSSProperties}
            >
              {body}
            </p>
            <ul className="mt-6 flex flex-col gap-3">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm text-secondary">
                  <Check
                    size={18}
                    className="mt-0.5 shrink-0 text-primary"
                    strokeWidth={2.5}
                  />
                  <span className="leading-snug">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
