import { Mail, Calendar } from "lucide-react";

export default function FounderSection() {
  return (
    <section className="bg-muted/40">
      <div className="mx-auto max-w-4xl px-5 py-20 sm:px-8 md:py-28">
        <div className="grid items-center gap-10 md:grid-cols-[auto_1fr] md:gap-12">
          {/* Avatar — SVG monogram, no stock photos */}
          <div className="mx-auto md:mx-0">
            <div className="relative h-32 w-32 sm:h-40 sm:w-40">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-primary/60 shadow-xl shadow-primary/30" />
              <div className="absolute inset-1 flex items-center justify-center rounded-full bg-card">
                <span className="text-5xl font-extrabold tracking-tight text-primary sm:text-6xl">
                  T
                </span>
              </div>
            </div>
          </div>

          {/* Story */}
          <div className="text-center md:text-left">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Who runs your audit
            </p>
            <h2
              className="mt-3 text-3xl font-extrabold tracking-tight text-secondary sm:text-4xl"
              style={{ textWrap: "balance" } as React.CSSProperties}
            >
              Hi, I'm Tim — founder of hlpr.
            </h2>
            <p
              className="mt-4 text-base leading-relaxed text-muted-foreground"
              style={{ textWrap: "pretty" } as React.CSSProperties}
            >
              I've spent the last decade running paid traffic, email
              automation, and CRO for e-commerce and service businesses —{" "}
              <span className="font-semibold text-secondary">
                $916K in Google Ads
              </span>
              ,{" "}
              <span className="font-semibold text-secondary">$341K in Meta</span>
              , and{" "}
              <span className="font-semibold text-secondary">
                $170K of email-driven revenue
              </span>{" "}
              later, the pattern is always the same: founders pour money into
              traffic and starve the page that's supposed to convert it.
            </p>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              The audit you're about to buy is the same one I send to my
              retainer clients on day one — minus the retainer.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 md:justify-start">
              <a
                href="mailto:tim@hlpr.io"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition hover:text-primary/80"
              >
                <Mail size={14} /> tim@hlpr.io
              </a>
              <a
                href="https://api.leadconnectorhq.com/widget/booking/aiMEM9Qf7GmaU0L6sTYT"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition hover:text-primary/80"
              >
                <Calendar size={14} /> Book a strategy call
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
