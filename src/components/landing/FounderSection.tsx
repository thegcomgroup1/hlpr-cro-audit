import { Mail, Calendar, Instagram } from "lucide-react";
import founderHeadshot from "@/assets/founder-headshot.png";
import AuditArc from "./visuals/AuditArc";

export default function FounderSection() {
  return (
    <section className="bg-muted/40">
      <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8 md:py-20">
        <div className="grid items-center gap-8 md:grid-cols-[auto_1fr] md:gap-10">
          {/* Headshot */}
          <div className="mx-auto md:mx-0">
            <img
              src={founderHeadshot}
              alt="Tim, founder of hlpr"
              className="h-32 w-32 rounded-full object-cover shadow-xl shadow-primary/30 sm:h-40 sm:w-40"
            />
          </div>

          {/* Story */}
          <div className="text-center md:text-left">
            <div className="flex justify-center md:justify-start">
              <AuditArc size={28} className="text-primary/70" />
            </div>
            <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-primary">
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
              Eleven sites live across e-com, services, and ministries.{" "}
              <span className="font-semibold text-secondary">
                $1.2M+ in client ad spend optimized.
              </span>{" "}
              The audit you're about to buy is the diagnostic version of the
              methodology.
            </p>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              When the audit reveals something that needs hands-on work — a
              website rebuild, an email system overhaul, a deeper strategy
              call — there's a full team standing by at{" "}
              <a
                href="https://solutions.hlpr.io"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary transition hover:text-primary/80"
              >
                solutions.hlpr.io
              </a>
              . The audit is the diagnosis. The agency is the fix.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 md:justify-start">
              <a
                href="mailto:tim@hlpr.io"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition hover:text-primary/80"
              >
                <Mail size={14} /> tim@hlpr.io
              </a>
              <a
                href="https://links.hlpr.io/booking/aiMEM9Qf7GmaU0L6sTYT"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition hover:text-primary/80"
              >
                <Calendar size={14} /> Book a strategy call
              </a>
              <a
                href="https://instagram.com/hlpr.agency"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition hover:text-primary/80"
              >
                <Instagram size={14} /> @hlpr.agency
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
