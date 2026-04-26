import { useState } from "react";
import { Info } from "lucide-react";

export interface IntakeAnswers {
  business_name: string;
  industry: string;
  business_model: string;
  primary_offer: string;
  aov: string;
  monthly_traffic: string;
  current_cvr: string;
  pain_points: string;
  top_objections: string;
  prior_attempts: string;
  primary_kpi: string;
  additional_notes: string;
}

const EMPTY: IntakeAnswers = {
  business_name: "",
  industry: "",
  business_model: "",
  primary_offer: "",
  aov: "",
  monthly_traffic: "",
  current_cvr: "",
  pain_points: "",
  top_objections: "",
  prior_attempts: "",
  primary_kpi: "",
  additional_notes: "",
};

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
  "Less than 1,000",
  "1,000 – 10,000",
  "10,000 – 50,000",
  "50,000+",
  "Not sure",
];

const KPIS = [
  { value: "more_sales", label: "More sales" },
  { value: "higher_aov", label: "Higher AOV" },
  { value: "more_leads", label: "More leads" },
  { value: "lower_cac", label: "Lower CAC" },
  { value: "other", label: "Other" },
];

interface Props {
  initialEmail?: string;
  onComplete: (answers: IntakeAnswers) => void;
  submitting?: boolean;
}

export default function IntakeForm({ onComplete, submitting }: Props) {
  const [a, setA] = useState<IntakeAnswers>(EMPTY);
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const TOTAL = 4;

  const set = <K extends keyof IntakeAnswers>(k: K, v: IntakeAnswers[K]) =>
    setA((prev) => ({ ...prev, [k]: v }));

  const canAdvance = (): string | null => {
    if (step === 1) {
      if (!a.business_name.trim()) return "Please enter your business name.";
      if (!a.industry) return "Please pick an industry.";
      if (!a.business_model) return "Please pick a business model.";
    }
    if (step === 2) {
      if (!a.primary_offer.trim()) return "Please describe your primary offer.";
      if (!a.aov.trim()) return "Please enter an approximate AOV or contract value.";
      if (!a.monthly_traffic) return "Please pick a traffic range.";
    }
    if (step === 3) {
      if (!a.pain_points.trim()) return "Please share at least one customer pain point.";
      if (!a.top_objections.trim()) return "Please share at least one objection you hear.";
    }
    if (step === 4) {
      if (!a.primary_kpi) return "Please pick your primary KPI.";
    }
    return null;
  };

  const next = () => {
    const err = canAdvance();
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    if (step < TOTAL) setStep(step + 1);
    else onComplete(a);
  };

  const back = () => {
    setError(null);
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Progress */}
      <div>
        <div className="mb-2 flex items-center justify-between text-xs font-semibold text-muted-foreground">
          <span>Step {step} of {TOTAL}</span>
          <span>{Math.round((step / TOTAL) * 100)}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${(step / TOTAL) * 100}%` }}
          />
        </div>
      </div>

      {step === 1 && (
        <Section title="About your business">
          <Field label="Business name" required>
            <input
              type="text"
              value={a.business_name}
              onChange={(e) => set("business_name", e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Industry" required>
            <select
              value={a.industry}
              onChange={(e) => set("industry", e.target.value)}
              className={inputCls}
            >
              <option value="">Select…</option>
              {INDUSTRIES.map((i) => (
                <option key={i}>{i}</option>
              ))}
            </select>
          </Field>
          <Field label="Business model" required>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {MODELS.map((m) => (
                <label
                  key={m.value}
                  className={`cursor-pointer rounded-lg border px-3 py-2 text-center text-sm font-medium transition ${
                    a.business_model === m.value
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-card text-secondary hover:border-primary/40"
                  }`}
                >
                  <input
                    type="radio"
                    className="sr-only"
                    name="bm"
                    value={m.value}
                    checked={a.business_model === m.value}
                    onChange={() => set("business_model", m.value)}
                  />
                  {m.label}
                </label>
              ))}
            </div>
          </Field>
        </Section>
      )}

      {step === 2 && (
        <Section title="Offer & economics">
          <Field label="Primary offer (one sentence)" required>
            <textarea
              value={a.primary_offer}
              onChange={(e) => set("primary_offer", e.target.value)}
              rows={2}
              className={inputCls}
              placeholder="What you sell and to whom"
            />
          </Field>
          <Field label="Average order value or contract value" required hint="Why we ask: lets us estimate revenue impact in dollars per fix.">
            <input
              type="text"
              value={a.aov}
              onChange={(e) => set("aov", e.target.value)}
              className={inputCls}
              placeholder="$"
            />
          </Field>
          <Field label="Monthly traffic" required>
            <select
              value={a.monthly_traffic}
              onChange={(e) => set("monthly_traffic", e.target.value)}
              className={inputCls}
            >
              <option value="">Select…</option>
              {TRAFFIC.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </Field>
          <Field label="Current conversion rate (optional)" hint="Skip if you don't track this — we'll estimate.">
            <input
              type="text"
              value={a.current_cvr}
              onChange={(e) => set("current_cvr", e.target.value)}
              className={inputCls}
              placeholder="e.g. 1.8%"
            />
          </Field>
        </Section>
      )}

      {step === 3 && (
        <Section title="Customer insight">
          <Field label="Top 3 customer pain points" required hint="What do they tell you keeps them up at night?">
            <textarea
              value={a.pain_points}
              onChange={(e) => set("pain_points", e.target.value)}
              rows={3}
              className={inputCls}
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
          <Field label="What you've already tried (optional)">
            <textarea
              value={a.prior_attempts}
              onChange={(e) => set("prior_attempts", e.target.value)}
              rows={2}
              className={inputCls}
            />
          </Field>
        </Section>
      )}

      {step === 4 && (
        <Section title="Goals">
          <Field label="Primary KPI" required>
            <div className="grid grid-cols-2 gap-2">
              {KPIS.map((k) => (
                <label
                  key={k.value}
                  className={`cursor-pointer rounded-lg border px-3 py-2 text-center text-sm font-medium transition ${
                    a.primary_kpi === k.value
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-card text-secondary hover:border-primary/40"
                  }`}
                >
                  <input
                    type="radio"
                    className="sr-only"
                    name="kpi"
                    value={k.value}
                    checked={a.primary_kpi === k.value}
                    onChange={() => set("primary_kpi", k.value)}
                  />
                  {k.label}
                </label>
              ))}
            </div>
          </Field>
          <Field label="Anything else we should know? (optional)">
            <textarea
              value={a.additional_notes}
              onChange={(e) => set("additional_notes", e.target.value)}
              rows={3}
              className={inputCls}
            />
          </Field>
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

      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={back}
          disabled={step === 1 || submitting}
          className="text-sm font-semibold text-muted-foreground transition hover:text-secondary disabled:opacity-40"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={next}
          disabled={submitting}
          className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-6 text-sm font-bold text-primary-foreground shadow-md transition active:scale-[0.97] hover:shadow-lg disabled:opacity-70"
        >
          {step < TOTAL ? "Continue →" : submitting ? "Submitting…" : "Continue to Payment →"}
        </button>
      </div>
    </div>
  );
}

const inputCls =
  "h-11 w-full rounded-lg border border-input bg-background px-3 text-sm shadow-sm outline-none ring-ring transition placeholder:text-muted-foreground focus:ring-2";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-base font-bold text-secondary">{title}</h3>
      {children}
    </div>
  );
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
