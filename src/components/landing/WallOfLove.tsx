import { Star } from "lucide-react";
import ashleighPhoto from "@/assets/testimonials/ashleigh-j.jpg";
import mikePhoto from "@/assets/testimonials/mike-s.png";
import louisPhoto from "@/assets/testimonials/louis-f.jpg";
import gloriaPhoto from "@/assets/testimonials/gloria-g.png";

interface Testimonial {
  name: string;
  title: string;
  company: string;
  photo: string;
  quote: string;
  result: string;
  rating: number;
  photo_position?: "top" | "center";
  /** The buyer objection this testimonial defuses (for our internal mapping). */
  objection: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Ashleigh J.",
    title: "Owner",
    company: "Kaizen Beauty",
    photo: ashleighPhoto,
    quote:
      "This changed everything for us. Clients can book appointments 24/7 without me lifting a finger. I wake up to a full calendar — it's honestly the best investment I've made for the salon.",
    result: "3x more bookings",
    rating: 5,
    objection: "Worth the price",
  },
  {
    name: "Mike S.",
    title: "Broker",
    company: "Real Estate Connect",
    photo: mikePhoto,
    quote:
      "The site has all the right look and feel. I'm impressed by how much was done with very little input from us. Our leads now get instant follow-up, and our agents love it.",
    result: "40% more qualified leads",
    rating: 5,
    objection: "Will it work for my niche",
  },
  {
    name: "Louis F.",
    title: "Founder",
    company: "Streaming4YouNow",
    photo: louisPhoto,
    photo_position: "top",
    quote:
      "Customer questions used to eat up hours of my day. Now the AI handles most of it automatically. My team can finally focus on what actually matters. Really impressed with how it turned out.",
    result: "80% support automated",
    rating: 5,
    objection: "Is it actually actionable",
  },
  {
    name: "Gloria G.",
    title: "Manager",
    company: "Eden Cove",
    photo: gloriaPhoto,
    quote:
      "Our old website was dated and nobody engaged with it. This one actually converts visitors into bookings — we're getting more inquiries than we can handle. Exactly what we needed.",
    result: "5x engagement increase",
    rating: 5,
    objection: "Speed of delivery",
  },
];

export default function WallOfLove() {
  return (
    <section className="bg-muted/40">
      <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8 md:py-20">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Wall of love
          </p>
          <h2
            className="mt-3 text-3xl font-extrabold tracking-tight text-secondary sm:text-4xl"
            style={{ textWrap: "balance" } as React.CSSProperties}
          >
            Real names. Real results.
          </h2>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={t.photo}
                    alt={t.name}
                    loading="lazy"
                    className="h-12 w-12 shrink-0 rounded-full object-cover"
                    style={{
                      objectPosition: t.photo_position === "top" ? "top" : "center",
                    }}
                  />
                  <div>
                    <p className="text-sm font-bold text-secondary">{t.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {t.title}, {t.company}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-0.5 text-primary">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={13} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
              </div>
              <blockquote className="mt-4 flex-1 text-sm italic leading-relaxed text-secondary">
                "{t.quote}"
              </blockquote>
              <div className="mt-5">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                  {t.result}
                </span>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
