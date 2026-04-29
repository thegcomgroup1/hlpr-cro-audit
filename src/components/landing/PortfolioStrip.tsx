import edenCove from "@/assets/portfolio/eden-cove.png";
import voirChat from "@/assets/portfolio/voir-chat.png";
import kaizen from "@/assets/portfolio/kaizen.png";
import streaming from "@/assets/portfolio/streaming.png";
import dunamis from "@/assets/portfolio/dunamis.png";
import realestate from "@/assets/portfolio/realestate.png";
import koven from "@/assets/portfolio/koven.png";
import lunasPlace from "@/assets/portfolio/lunas-place.png";
import lifework from "@/assets/portfolio/lifework.png";
import savedSingles from "@/assets/portfolio/saved-singles-summit.png";

interface PortfolioItem {
  brand: string;
  category: string;
  screenshot: string;
}

const PORTFOLIO: PortfolioItem[] = [
  { brand: "Koven", category: "Premium cat furniture ecom", screenshot: koven },
  { brand: "Voir Homme", category: "Luxury fashion ecom", screenshot: voirChat },
  { brand: "LifeWork Ministries", category: "Ministry / counseling", screenshot: lifework },
  { brand: "Streaming4YouNow", category: "Streaming service", screenshot: streaming },
  { brand: "Luna's Place", category: "Premium dog beds & sofas ecom", screenshot: lunasPlace },
  { brand: "Kaizen Beauty", category: "Premium nail salon", screenshot: kaizen },
  { brand: "Eden Cove", category: "Sanctuary / retreat", screenshot: edenCove },
  { brand: "Real Estate Connect", category: "Real estate platform", screenshot: realestate },
  { brand: "Saved Singles Summit", category: "Christian community", screenshot: savedSingles },
  { brand: "Dunamis Marketing", category: "Christian media agency", screenshot: dunamis },
];

export default function PortfolioStrip() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 md:py-20">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            The track record
          </p>
          <h2
            className="mt-3 text-3xl font-extrabold tracking-tight text-secondary sm:text-4xl"
            style={{ textWrap: "balance" } as React.CSSProperties}
          >
            10+ sites shipped. $1.2M+ in client ad spend optimized.
          </h2>
          <p
            className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base"
            style={{ textWrap: "pretty" } as React.CSSProperties}
          >
            The audit isn't theory — it's the same playbook we deploy on
            five-figure retainers, packaged for everyone else.
          </p>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {PORTFOLIO.map((item) => (
            <figure
              key={item.brand}
              className="overflow-hidden rounded-xl border border-border bg-card shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-center gap-1.5 border-b border-border bg-muted/60 px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-destructive/50" />
                <span className="h-2 w-2 rounded-full bg-primary/50" />
                <span className="h-2 w-2 rounded-full bg-primary/30" />
              </div>
              <div className="aspect-[4/3] w-full overflow-hidden bg-muted">
                <img
                  src={item.screenshot}
                  alt={`${item.brand} — ${item.category}`}
                  loading="lazy"
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <figcaption className="border-t border-border px-4 py-3">
                <p className="text-sm font-bold text-secondary">{item.brand}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {item.category}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
