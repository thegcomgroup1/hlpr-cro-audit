import { useEffect, useRef, useState } from "react";
import { X, Loader2, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import IntakeForm, { type IntakeAnswers } from "@/components/audit/IntakeForm";

export type AuditTier = "mini" | "full";

interface Props {
  open: boolean;
  tier: AuditTier | null;
  onClose: () => void;
}

const TIER_META: Record<AuditTier, { label: string; price: string }> = {
  mini: { label: "Mini", price: "29" },
  full: { label: "Full", price: "99" },
};

export default function AuditCheckoutModal({ open, tier, onClose }: Props) {
  const [step, setStep] = useState<"contact" | "intake">("contact");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setStep("contact");
      setError(null);
      setSubmitting(false);
      setTimeout(() => firstFieldRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !submitting) onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, submitting, onClose]);

  if (!open || !tier) return null;
  const meta = TIER_META[tier];

  const validateContact = (): string | null => {
    if (!name.trim()) return "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return "Please enter a valid email.";
    if (phone.trim().length < 7) return "Please enter a valid phone number.";
    const url = websiteUrl.trim();
    if (url.length < 4 || !url.includes(".") || !/[a-zA-Z]/.test(url))
      return "Please enter a valid website URL.";
    return null;
  };

  const handleContactNext = (e: React.FormEvent) => {
    e.preventDefault();
    const v = validateContact();
    if (v) {
      setError(v);
      return;
    }
    setError(null);
    setStep("intake");
  };

  const handleIntakeComplete = async (answers: IntakeAnswers) => {
    setError(null);
    setSubmitting(true);
    try {
      const { data, error: fnError } = await supabase.functions.invoke("create-audit-checkout", {
        body: {
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          website_url: websiteUrl.trim(),
          tier,
          intake_answers: answers,
        },
      });
      if (fnError) throw fnError;
      if (!data?.checkout_url) throw new Error("Missing checkout URL");
      window.location.href = data.checkout_url;
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please check your details and try again.");
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-secondary/60 p-0 backdrop-blur-sm animate-in fade-in duration-200 sm:items-center sm:p-4"
      onClick={() => !submitting && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="audit-modal-title"
    >
      <div
        className="relative flex max-h-[100dvh] w-full flex-col overflow-y-auto rounded-t-2xl bg-card p-6 shadow-2xl animate-in slide-in-from-bottom-4 duration-200 sm:max-h-[90vh] sm:max-w-lg sm:rounded-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => !submitting && onClose()}
          disabled={submitting}
          aria-label="Close"
          className="absolute right-4 top-4 rounded-full p-1.5 text-muted-foreground transition hover:bg-muted hover:text-secondary disabled:opacity-50"
        >
          <X size={18} />
        </button>

        <h2
          id="audit-modal-title"
          className="pr-8 text-2xl font-extrabold tracking-tight text-secondary"
        >
          Get Your {meta.label} Audit — ${meta.price}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {step === "contact"
            ? "First, where should we send the report?"
            : "Tell us about your business so we audit through your customers' eyes."}
        </p>

        {step === "contact" ? (
          <form onSubmit={handleContactNext} className="mt-6 flex flex-col gap-4">
            <div>
              <label htmlFor="audit-name" className="mb-1.5 block text-sm font-medium text-secondary">Name</label>
              <input id="audit-name" ref={firstFieldRef} type="text" required value={name} onChange={(e) => setName(e.target.value)} className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm shadow-sm outline-none ring-ring transition focus:ring-2" />
            </div>
            <div>
              <label htmlFor="audit-email" className="mb-1.5 block text-sm font-medium text-secondary">Email</label>
              <input id="audit-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm shadow-sm outline-none ring-ring transition focus:ring-2" />
            </div>
            <div>
              <label htmlFor="audit-phone" className="mb-1.5 block text-sm font-medium text-secondary">Phone</label>
              <input id="audit-phone" type="tel" required placeholder="(555) 123-4567" value={phone} onChange={(e) => setPhone(e.target.value)} className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm shadow-sm outline-none ring-ring transition placeholder:text-muted-foreground focus:ring-2" />
            </div>
            <div>
              <label htmlFor="audit-url" className="mb-1.5 block text-sm font-medium text-secondary">Website URL</label>
              <input id="audit-url" type="url" required placeholder="https://yourstore.com" value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm shadow-sm outline-none ring-ring transition placeholder:text-muted-foreground focus:ring-2" />
            </div>

            {error && (
              <p role="alert" className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>
            )}

            <button type="submit" className="mt-2 inline-flex h-12 items-center justify-center rounded-lg bg-primary px-6 text-sm font-bold text-primary-foreground shadow-md transition active:scale-[0.97] hover:shadow-lg">
              Continue →
            </button>
            <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <ShieldCheck size={13} className="text-primary" />
              <span><span className="font-bold text-secondary">100% money-back</span> if we don't surface 5+ revenue-impacting fixes.</span>
            </p>
          </form>
        ) : (
          <div className="mt-6">
            <IntakeForm
              onComplete={handleIntakeComplete}
              submitting={submitting}
              tierLabel={`${meta.label} Audit`}
              tierPrice={meta.price}
            />
            {error && (
              <p role="alert" className="mt-3 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>
            )}
            {submitting && (
              <p className="mt-3 inline-flex items-center gap-2 text-xs text-muted-foreground">
                <Loader2 size={13} className="animate-spin" /> Creating your secure checkout…
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
