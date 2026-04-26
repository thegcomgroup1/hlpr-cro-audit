import { useEffect, useState } from "react";
import {
  Info,
  ShieldCheck,
  Lock,
  Sparkles,
  TrendingUp,
  MessageSquareQuote,
  Target,
  CheckCircle2,
  Users,
  Clock,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

export interface IntakeAnswers {
  business_name: string;
  industry: string;
  business_model: string;
  primary_offer: string;
  dream_outcome: string;
  target_customer: string;
  aov: string;
  monthly_traffic: string;
  current_cvr: string;
  traffic_sources: string;
  pain_points: string;
  top_objections: string;
  social_proof_assets: string;
  competitors: string;
  differentiator: string;
  primary_kpi: string;
  secondary_kpi: string;
  prior_attempts: string;
  additional_notes: string;
}

const EMPTY: IntakeAnswers = {
  business_name: "",
  industry: "",
  business_model: "",
  primary_offer: "",
  dream_outcome: "",
  target_customer: "",
  aov: "",
  monthly_traffic: "",
  current_cvr: "",
  traffic_sources: "",
  pain_points: "",
  top_objections: "",
  social_proof_assets: "",
  competitors: "",
  differentiator: "",
  primary_kpi: "",
  secondary_kpi: "",
  prior_attempts: "",
  additional_notes: "",
};

const DRAFT_KEY = "hlpr_intake_draft_v2";

const INDUSTRIES = [
  "E-commerce / DTC",
  "SaaS / Software",
  "Agency / Services",
  "Local business",
  "Coaching / Info product",
  "Healthcare / Wellness",
  "Finance / Insurance",
  "Other",
];

const MODELS = [
  { value: "ecom", label: "E-commerce" },
  { value: "services", label: "Services" },
  { value: "saas", label: "SaaS" },
  { value: "local", label: "Local" },
  { value: "info", label: "Info product" },
  { value: "other", label: "Other" },
];

const TRAFFIC = [
  "<1k",
  "1k–10k",
  "10k–50k",
  "50k+",
  "Not sure",
];

const TRAFFIC_SOURCES = [
  "Paid ads",
  "SEO",
  "Social",
  "Email",
  "Referral",
  "Other",
];

const SOCIAL_PROOF = [
  "Customer reviews",
  "Case studies",
  "Press / logos",
  "Video testimonials",
  "None yet",
];

const KPIS = [
  { value: "more_sales", label: "More sales" },
  { value: "higher_aov", label: "Higher AOV" },
  { value: "more_leads", label: "More leads" },
  { value: "lower_cac", label: "Lower CAC" },
  { value: "other", label: "Other" },
];

const STEP_META = [
  { num: 1, title: "About your business", icon: Sparkles, blurb: "30 seconds. Promise." },
  { num: 2, title: "Your offer", icon: Target, blurb: "What you sell, who you sell to." },
  { num: 3, title: "The economics", icon: TrendingUp, blurb: "So we can quantify lift in $." },
  { num: 4, title: "Voice of customer", icon: MessageSquareQuote, blurb: "The single most valuable section." },
  { num: 5, title: "Goals & finish", icon: CheckCircle2, blurb: "Almost there." },
];

interface Props {
  onComplete: (answers: IntakeAnswers) => void;
  submitting?: boolean;
  tierLabel?: string;
  tierPrice?: string;
}

export default function IntakeForm({ onComplete, submitting, tierLabel = "Audit", tierPrice }: Props) {
  const [a, setA] = useState<IntakeAnswers>(() => {
    if (typeof window === "undefined") return EMPTY;
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) return { ...EMPTY, ...JSON.parse(raw) };
    } catch (_) { /* noop */ }
    return EMPTY;
  });
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const TOTAL = STEP_META.length;

  // Persist draft on every change
  useEffect(() => {
    try { localStorage.setItem(DRAFT_KEY, JSON.stringify(a)); } catch (_) { /* noop */ }
  }, [a]);

  const set = <K extends keyof IntakeAnswers>(k: K, v: IntakeAnswers[K]) =>
    setA((prev) => ({ ...prev, [k]: v }));

  const toggleMulti = (k: keyof IntakeAnswers, value: string) => {
    const current = (a[k] as string).split(",").map((s) => s.trim()).filter(Boolean);
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    set(k, next.join(", "));
  };

  const isMultiSelected = (k: keyof IntakeAnswers, value: string) =>
    (a[k] as string).split(",").map((s) => s.trim()).includes(value);

  const canAdvance = (): string | null => {
    if (step === 1) {
      if (!a.business_name.trim()) return "Please enter your business name.";
      if (!a.industry) return "Please pick an industry.";
      if (!a.business_model) return "Please pick a business model.";
    }
    if (step === 2) {
      if (!a.primary_offer.trim()) return "Please describe your primary offer.";
      if (!a.dream_outcome.trim()) return "Please describe the dream outcome.";
      if (!a.target_customer.trim()) return "Please describe your target customer.";
    }
    if (step === 3) {
      if (!a.aov.trim()) return "Please enter an approximate AOV or contract value.";
      if (!a.monthly_traffic) return "Please pick a traffic range.";
      if (!a.traffic_sources.trim()) return "Please pick at least one traffic source.";
    }
    if (step === 4) {
      if (!a.pain_points.trim()) return "Please share at least one customer pain point.";
      if (!a.top_objections.trim()) return "Please share at least one objection you hear.";
      if (!a.differentiator.trim()) return "Please share what makes you different.";
    }
    if (step === 5) {
      if (!a.primary_kpi) return "Please pick your primary KPI.";
    }
    return null;
  };

  const next = () => {
    const err = canAdvance();
    if (err) { setError(err); return; }
    setError(null);
    if (step < TOTAL) {
      setStep(step + 1);
      // Scroll modal to top on step change
      const el = document.querySelector('[role="dialog"] > div');
      if (el) el.scrollTop = 0;
    } else {
      try { localStorage.removeItem(DRAFT_KEY); } catch (_) { /* noop */ }
      onComplete(a);
    }
  };

  const back = () => {
    setError(null);
    if (step > 1) setStep(step - 1);
  };

  const meta = STEP_META[step - 1];
  const Icon = meta.icon;
  const pct = Math.round((step / TOTAL) * 100);

  return (
    <div className="flex flex-col gap-5">
      {/* Branded step header */}
      <div className="-mx-6 -mt-2 sm:-mx-8">
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent px-6 pb-4 pt-3 sm:px-8">
          <div className="mb-2 flex items-center justify-between text-xs font-semibold">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-2.5 py-1 text-primary">
              <Icon size={12} /> Step {step} of {TOTAL}
            </span>
            <span className="text-muted-foreground">{pct}% complete</span>
          </div>
          <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>
          <h3 className="text-lg font-extrabold tracking-tight text-secondary">{meta.title}</h3>
          <p className="text-xs text-muted-foreground">{meta.blurb}</p>
        </div>
      </div>

      {/* Step 1 — About */}
      {step === 1 && (
        <Section>
          <Field label="Business name" required>
            <input
              type="text"
              value={a.business_name}
              onChange={(e) => set("business_name", e.target.value)}
              className={inputCls}
              placeholder="HLPR"
              autoFocus
            />
          </Field>
          <Field label="Industry" required>
            <ChipGroup
              options={INDUSTRIES.map((v) => ({ value: v, label: v }))}
              selected={a.industry}
              onSelect={(v) => set("industry", v)}
            />
          </Field>
          <Field label="Business model" required>
            <ChipGroup
              options={MODELS}
              selected={a.business_model}
              onSelect={(v) => set("business_model", v)}
            />
          </Field>
          <TrustBar
            icon={<Lock size={13} className="text-primary" />}
            text={<><span className="font-bold text-secondary">Takes ~2 minutes.</span> 100% money-back if we don't surface 5+ revenue-impacting fixes.</>}
          />
        </Section>
      )}

      {/* Step 2 — Offer */}
      {step === 2 && (
        <Section>
          <Field label="Primary offer (one sentence)" required>
            <textarea
              value={a.primary_offer}
              onChange={(e) => set("primary_offer", e.target.value)}
              rows={2}
              className={inputCls}
              placeholder="What you sell and who buys it"
            />
          </Field>
          <Field
            label="Dream outcome for your customer"
            required
            hint="The transformation they're really paying for. Drives every CRO recommendation."
          >
            <textarea
              value={a.dream_outcome}
              onChange={(e) => set("dream_outcome", e.target.value)}
              rows={2}
              className={inputCls}
              placeholder="e.g. Book 40+ qualified sales calls per month without cold outreach"
            />
          </Field>
          <Field label="Target customer (one sentence)" required>
            <input
              type="text"
              value={a.target_customer}
              onChange={(e) => set("target_customer", e.target.value)}
              className={inputCls}
              placeholder="e.g. DTC founders doing $50k–$500k/mo"
            />
          </Field>
          <TrustBar
            icon={<Users size={13} className="text-primary" />}
            text={<>Join <span className="font-bold text-secondary">200+ founders</span> who used their HLPR audit to lift conversions.</>}
          />
        </Section>
      )}

      {/* Step 3 — Economics */}
      {step === 3 && (
        <Section>
          <Field
            label="AOV or contract value"
            required
            hint="Lets us estimate revenue impact in $ per fix."
          >
            <input
              type="text"
              value={a.aov}
              onChange={(e) => set("aov", e.target.value)}
              className={inputCls}
              placeholder="$"
            />
          </Field>
          <Field label="Monthly traffic" required>
            <ChipGroup
              options={TRAFFIC.map((v) => ({ value: v, label: v }))}
              selected={a.monthly_traffic}
              onSelect={(v) => set("monthly_traffic", v)}
              cols={5}
            />
          </Field>
          <Field label="Primary traffic source" required hint="Pick all that apply.">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {TRAFFIC_SOURCES.map((s) => (
                <ChipMulti
                  key={s}
                  label={s}
                  selected={isMultiSelected("traffic_sources", s)}
                  onClick={() => toggleMulti("traffic_sources", s)}
                />
              ))}
            </div>
          </Field>
          <Field label="Current conversion rate (optional)" hint="Skip if unknown — we'll estimate.">
            <input
              type="text"
              value={a.current_cvr}
              onChange={(e) => set("current_cvr", e.target.value)}
              className={inputCls}
              placeholder="e.g. 1.8%"
            />
          </Field>
          <TrustBar
            icon={<TrendingUp size={13} className="text-primary" />}
            text={<>We use these numbers to <span className="font-bold text-secondary">quantify $ lift per fix</span> — not vague advice.</>}
          />
        </Section>
      )}

      {/* Step 4 — VoC */}
      {step === 4 && (
        <Section>
          <Field
            label="Top 3 customer pain points"
            required
            hint="What keeps them up at night? Use their words if possible."
          >
            <textarea
              value={a.pain_points}
              onChange={(e) => set("pain_points", e.target.value)}
              rows={3}
              className={inputCls}
              placeholder="1. …  2. …  3. …"
            />
          </Field>
          <Field label="Top objections you hear before they buy" required>
            <textarea
              value={a.top_objections}
              onChange={(e) => set("top_objections", e.target.value)}
              rows={3}
              className={inputCls}
              placeholder="e.g. price, time, will it work for me, trust"
            />
          </Field>
          <Field label="Social proof you already have" hint="Pick all that apply.">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {SOCIAL_PROOF.map((s) => (
                <ChipMulti
                  key={s}
                  label={s}
                  selected={isMultiSelected("social_proof_assets", s)}
                  onClick={() => toggleMulti("social_proof_assets", s)}
                />
              ))}
            </div>
          </Field>
          <Field label="Main competitor" hint="Helps us frame your differentiator on the page.">
            <input
              type="text"
              value={a.competitors}
              onChange={(e) => set("competitors", e.target.value)}
              className={inputCls}
              placeholder="e.g. Competitor X, Competitor Y"
            />
          </Field>
          <Field label="What makes you different" required>
            <textarea
              value={a.differentiator}
              onChange={(e) => set("differentiator", e.target.value)}
              rows={2}
              className={inputCls}
              placeholder="The one thing only you can credibly claim"
            />
          </Field>
          <TestimonialBar />
        </Section>
      )}

      {/* Step 5 — Goals */}
      {step === 5 && (
        <Section>
          <Field label="Primary KPI" required>
            <ChipGroup
              options={KPIS}
              selected={a.primary_kpi}
              onSelect={(v) => set("primary_kpi", v)}
            />
          </Field>
          <Field label="Secondary KPI (optional)">
            <ChipGroup
              options={KPIS}
              selected={a.secondary_kpi}
              onSelect={(v) => set("secondary_kpi", v)}
            />
          </Field>
          <Field label="What you've already tried (optional)" hint="So we don't recommend what didn't work.">
            <textarea
              value={a.prior_attempts}
              onChange={(e) => set("prior_attempts", e.target.value)}
              rows={2}
              className={inputCls}
            />
          </Field>
          <Field label="Anything else we should know? (optional)">
            <textarea
              value={a.additional_notes}
              onChange={(e) => set("additional_notes", e.target.value)}
              rows={2}
              className={inputCls}
            />
          </Field>
          <FinalTrustStack />
        </Section>
      )}

      {error && (
        <p
          role="alert"
          className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
        >
          {error}
        </p>
      )}

      {/* Footer */}
      <div className="sticky bottom-0 -mx-6 -mb-2 flex flex-col gap-2 border-t border-border bg-card/95 px-6 py-3 backdrop-blur sm:-mx-8 sm:px-8">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={back}
            disabled={step === 1 || submitting}
            className="inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground transition hover:text-secondary disabled:opacity-40"
          >
            <ArrowLeft size={14} /> Back
          </button>
          <button
            type="button"
            onClick={next}
            disabled={submitting}
            className="inline-flex h-12 flex-1 items-center justify-center gap-1.5 rounded-lg bg-primary px-6 text-sm font-bold text-primary-foreground shadow-md transition active:scale-[0.97] hover:shadow-lg disabled:opacity-70 sm:flex-none"
          >
            {step < TOTAL ? (<>Continue <ArrowRight size={14} /></>) : submitting ? "Submitting…" : (<>Continue to Secure Checkout <ArrowRight size={14} /></>)}
          </button>
        </div>
        {tierPrice && (
          <p className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
            <ShieldCheck size={11} className="text-primary" />
            <span><span className="font-bold text-secondary">{tierLabel} — ${tierPrice}</span> · 24h delivery · Money-back guarantee</span>
          </p>
        )}
      </div>
    </div>
  );
}

const inputCls =
  "h-11 w-full rounded-lg border border-input bg-background px-3 text-sm shadow-sm outline-none ring-ring transition placeholder:text-muted-foreground focus:ring-2";

function Section({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-4">{children}</div>;
}

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-secondary">
        {label}
        {required && <span className="text-destructive">*</span>}
        {hint && (
          <span className="group relative inline-flex">
            <Info size={13} className="text-muted-foreground" />
            <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1.5 w-56 -translate-x-1/2 rounded-md bg-secondary px-2 py-1.5 text-xs font-normal text-secondary-foreground opacity-0 shadow transition group-hover:opacity-100">
              {hint}
            </span>
          </span>
        )}
      </label>
      <div className="[&_textarea]:rounded-lg [&_textarea]:border [&_textarea]:border-input [&_textarea]:bg-background [&_textarea]:px-3 [&_textarea]:py-2 [&_textarea]:text-sm [&_textarea]:shadow-sm [&_textarea]:outline-none [&_textarea]:ring-ring [&_textarea]:transition [&_textarea]:placeholder:text-muted-foreground focus-within:[&_textarea]:ring-2 [&_textarea]:w-full">
        {children}
      </div>
    </div>
  );
}

function ChipGroup({
  options,
  selected,
  onSelect,
  cols,
}: {
  options: { value: string; label: string }[];
  selected: string;
  onSelect: (v: string) => void;
  cols?: number;
}) {
  const grid = cols === 5
    ? "grid-cols-3 sm:grid-cols-5"
    : "grid-cols-2 sm:grid-cols-3";
  return (
    <div className={`grid gap-2 ${grid}`}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onSelect(o.value)}
          className={`cursor-pointer rounded-lg border px-3 py-2 text-center text-sm font-medium transition ${
            selected === o.value
              ? "border-primary bg-primary/10 text-primary shadow-sm"
              : "border-border bg-card text-secondary hover:border-primary/40"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function ChipMulti({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-center text-sm font-medium transition ${
        selected
          ? "border-primary bg-primary/10 text-primary shadow-sm"
          : "border-border bg-card text-secondary hover:border-primary/40"
      }`}
    >
      {selected && <CheckCircle2 size={13} />}
      {label}
    </button>
  );
}

function TrustBar({ icon, text }: { icon: React.ReactNode; text: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-xs text-muted-foreground">
      {icon}
      <span>{text}</span>
    </div>
  );
}

function TestimonialBar() {
  return (
    <div className="rounded-lg border border-border bg-muted/40 p-3">
      <p className="text-xs italic leading-relaxed text-secondary">
        "These were the exact questions that unlocked our 2.3x conversion lift. HLPR's audit paid for itself in 4 days."
      </p>
      <p className="mt-1 text-[11px] font-semibold text-muted-foreground">— Sarah K., DTC founder</p>
    </div>
  );
}

function FinalTrustStack() {
  return (
    <div className="grid grid-cols-3 gap-2 rounded-lg border border-primary/20 bg-primary/5 p-3 text-center">
      <div className="flex flex-col items-center gap-1">
        <Lock size={14} className="text-primary" />
        <span className="text-[10px] font-semibold text-secondary">Encrypted</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <ShieldCheck size={14} className="text-primary" />
        <span className="text-[10px] font-semibold text-secondary">Never shared</span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <Clock size={14} className="text-primary" />
        <span className="text-[10px] font-semibold text-secondary">24h delivery</span>
      </div>
    </div>
  );
}
