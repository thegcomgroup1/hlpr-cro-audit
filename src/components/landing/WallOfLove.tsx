import { Star, Quote } from "lucide-react";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  /** The buyer objection this testimonial defuses (for our internal mapping). */
  objection: string;
}

// TODO_TESTIMONIAL: swap each entry below for a real customer quote.
// Keep `objection` mapped so the wall keeps defusing the right buyer fear.
const TESTIMONIALS: Testimonial[] = [
  {
    objection: "Worth the price",
    quote:
      "The audit paid for itself the first week. We implemented the top 3 fixes and saw a 22% lift in product page conversion.",
    name: "Sarah K.",
    role: "DTC Founder",
  },
  {
    objection: "Will it work for my niche",
    quote:
      "I run a service business, not e-com, and assumed this wouldn't apply. The intake captured exactly what made my offer different.",
    name: "Marcus D.",
    role: "Agency Owner",
  },
  {
    objection: "Is it actually actionable",
    quote:
      "Every fix had a dollar estimate next to it. My dev knew exactly what to ship first instead of guessing.",
    name: "Priya R.",
    role: "Head of Growth",
  },
  {
    objection: "Speed of delivery",
    quote:
      "Promised 48 hours. Delivered in 31. That alone makes this the easiest CRO purchase I've made.",
    name: "Devon B.",
    role: "Shopify Merchant",
  },
  {
    objection: "Generic vs custom",
    quote:
      "I've bought template audits before. This one called out the exact copy on my hero and why it was costing me ad spend.",
    name: "Lena M.",
    role: "Founder, Skincare Brand",
  },
  {
    objection: "Trust / credibility",
    quote:
      "Tim doesn't just point at problems. The report sequenced fixes by impact ÷ effort so we shipped wins in one sprint.",
    name: "Jordan W.",
    role: "Marketing Director",
  },
];

export default function WallOfLove() {
  return (
    <section className="bg-muted/40">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Wall of love
          </p>
          <h2
            className="mt-3 text-3xl font-extrabold tracking-tight text-secondary sm:text-4xl"
            style={{ textWrap: "balance" } as React.CSSProperties}
          >
            Founders who stopped guessing — and started shipping fixes that paid
            them back.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-0.5 text-primary">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} size={13} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <Quote size={18} className="text-muted-foreground/40" />
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-secondary">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-5 border-t border-border pt-4">
                <p className="text-sm font-bold text-secondary">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
