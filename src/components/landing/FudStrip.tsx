import { ShieldCheck, Lock, Clock, Receipt } from "lucide-react";

const ITEMS = [
  {
    icon: ShieldCheck,
    title: "100% money-back",
    body: "If we don't surface 5+ revenue-impacting fixes.",
  },
  {
    icon: Lock,
    title: "Secure checkout",
    body: "Payments processed by Stripe. We never see your card.",
  },
  {
    icon: Clock,
    title: "48-hour delivery",
    body: "Mini audit lands in your inbox within 2 business days.",
  },
  {
    icon: Receipt,
    title: "No hidden fees",
    body: "One-time payment. No subscriptions, no upsells in the cart.",
  },
];

export default function FudStrip() {
  return (
    <section className="bg-secondary text-secondary-foreground">
      <div className="mx-auto grid max-w-6xl gap-6 px-5 py-12 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
        {ITEMS.map(({ icon: Icon, title, body }) => (
          <div key={title} className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/20 text-primary-foreground">
              <Icon size={18} />
            </div>
            <div>
              <p className="text-sm font-bold">{title}</p>
              <p className="mt-1 text-xs leading-snug opacity-75">{body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
