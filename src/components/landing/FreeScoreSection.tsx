import { useState } from "react";
import { Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export default function FreeScoreSection() {
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim() || !email.trim()) return;
    setSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("cro-score", {
        body: { url: url.trim(), email: email.trim() },
      });
      if (error) throw error;
      toast({
        title: "Request received!",
        description: "We'll email your CRO score shortly.",
      });
      setUrl("");
      setEmail("");
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please check your URL and email, then try again.",
        variant: "destructive",
      });
    }
    setSubmitting(false);
  };

  return (
    <section id="free-score" className="bg-background">
      <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8 md:py-16">
        <div className="rounded-3xl border-2 border-dashed border-primary/30 bg-primary/[0.04] p-8 text-center sm:p-12">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Sparkles size={22} />
          </div>
          <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-primary">
            Not ready to buy?
          </p>
          <h2
            className="mt-2 text-2xl font-extrabold tracking-tight text-secondary sm:text-3xl"
            style={{ textWrap: "balance" } as React.CSSProperties}
          >
            Get your free CRO score in 60 seconds.
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
            We'll email your overall conversion health score plus the{" "}
            <span className="font-semibold text-secondary">top 3 fixes</span>{" "}
            killing your conversions right now. No credit card.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-7 flex max-w-lg flex-col gap-3 sm:flex-row"
          >
            <input
              type="url"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Your store URL"
              className="h-12 flex-1 rounded-lg border border-input bg-background px-4 text-sm shadow-sm outline-none ring-ring transition placeholder:text-muted-foreground focus:ring-2"
            />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="h-12 flex-1 rounded-lg border border-input bg-background px-4 text-sm shadow-sm outline-none ring-ring transition placeholder:text-muted-foreground focus:ring-2"
            />
            <button
              type="submit"
              disabled={submitting}
              className="h-12 shrink-0 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-md transition active:scale-[0.97] hover:shadow-lg disabled:opacity-60"
            >
              {submitting ? "Submitting…" : "Get Free Score"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
