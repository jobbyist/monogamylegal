import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle, ArrowLeft, ArrowRight, X } from "lucide-react";

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xqaqkwzb";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type Pathway = "client" | "lawyer" | null;

// Pathway 1 — Client
interface ClientForm {
  name: string;
  email: string;
  country: string;
  city: string;
  practiceArea: string;
  additionalDetails: string;
  urgency: string;
  referralSource: string;
}

// Pathway 2 — Lawyer
interface LawyerForm {
  name: string;
  email: string;
  firmName: string;
  country: string;
  firmSize: string;
  practiceAreas: string[];
  experience: string;
  interestLevel: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const COUNTRIES = [
  "United States of America",
  "Canada",
  "Ireland",
  "South Africa",
  "Nigeria",
  "Ghana",
  "Kenya",
  "Other",
];

const PRACTICE_AREAS = [
  "Business Law",
  "Family Law",
  "Real Estate",
  "Estate Planning",
  "Criminal Defense",
  "Tax Law",
  "Employment Law",
  "Personal Injury",
  "Immigration",
  "Intellectual Property",
  "Bankruptcy",
  "Civil Litigation",
  "Constitutional Law",
  "Environmental Law",
  "Healthcare Law",
  "Other",
];

const LAWYER_PRACTICE_AREAS = [
  "Business Law",
  "Family Law",
  "Real Estate",
  "Estate Planning",
  "Criminal Defense",
  "Tax Law",
  "Employment Law",
  "Personal Injury",
  "Immigration",
  "Intellectual Property",
  "Bankruptcy",
  "Civil Litigation",
  "Constitutional Law",
  "Environmental Law",
  "Healthcare Law",
];

const URGENCY_OPTIONS = [
  { value: "urgent", label: "Urgent — I need help within 24–48 hours" },
  { value: "soon", label: "Soon — Within the next week" },
  { value: "planning", label: "Planning ahead — Within the next month" },
  { value: "exploring", label: "Just exploring options" },
];

const FIRM_SIZES = [
  "Solo practitioner",
  "2–5 lawyers",
  "6–20 lawyers",
  "21–50 lawyers",
  "51–100 lawyers",
  "100+ lawyers",
];

const EXPERIENCE_OPTIONS = [
  "Less than 2 years",
  "2–5 years",
  "6–10 years",
  "11–20 years",
  "20+ years",
];

const INTEREST_LEVELS = [
  "Very interested — ready to join",
  "Interested — want to learn more",
  "Curious — exploring options",
  "Not sure yet",
];

// ---------------------------------------------------------------------------
// Success Modal
// ---------------------------------------------------------------------------
const SuccessModal = ({
  open,
  onClose,
  pathway,
}: {
  open: boolean;
  onClose: () => void;
  pathway: Pathway;
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card border border-border rounded-2xl p-8 md:p-12 max-w-[540px] w-full text-center shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-[2.4rem] font-bold mb-4">
          {pathway === "client"
            ? "Thank you for choosing Monogamy for your legal needs."
            : "Thank you for your interest in Monogamy."}
        </h2>
        <p className="text-[1.6rem] text-muted-foreground leading-[1.7] mb-8">
          Click the <strong className="text-foreground">"Pay Now"</strong> button below to activate your subscription and your dedicated account manager will contact you to finish setting up your account.
        </p>
        <a
          href="/pricing"
          onClick={onClose}
          className="inline-block px-10 py-4 text-[1.7rem] font-semibold bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-opacity btn-primary-glossy"
        >
          Pay Now
        </a>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Progress Bar
// ---------------------------------------------------------------------------
const ProgressBar = ({ current, total }: { current: number; total: number }) => (
  <div className="w-full mb-8">
    <div className="flex justify-between text-[1.3rem] text-muted-foreground mb-2">
      <span>Step {current} of {total}</span>
      <span>{Math.round((current / total) * 100)}%</span>
    </div>
    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
      <div
        className="h-full bg-primary rounded-full transition-all duration-500"
        style={{ width: `${(current / total) * 100}%` }}
      />
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// Shared styles
// ---------------------------------------------------------------------------
const inputClass =
  "w-full text-[1.6rem] leading-[2.2rem] h-[52px] px-4 bg-card border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground";
const labelClass = "block text-[1.5rem] font-medium mb-2";

// ---------------------------------------------------------------------------
// CLIENT PATHWAY (Pathway 1)
// ---------------------------------------------------------------------------
const ClientPathway = ({ onSuccess }: { onSuccess: () => void }) => {
  const [step, setStep] = useState(1);
  const TOTAL_STEPS = 5;
  const [form, setForm] = useState<ClientForm>({
    name: "",
    email: "",
    country: "",
    city: "",
    practiceArea: "",
    additionalDetails: "",
    urgency: "",
    referralSource: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const set = (field: keyof ClientForm, value: string) =>
    setForm((p) => ({ ...p, [field]: value }));

  const next = () => {
    setError("");
    if (step === 1 && (!form.name || !form.email || !form.country || !form.city)) {
      setError("Please fill in all required fields.");
      return;
    }
    if (step === 2 && !form.practiceArea) {
      setError("Please select a practice area.");
      return;
    }
    if (step === 3 && !form.urgency) {
      setError("Please select an urgency level.");
      return;
    }
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          pathway: "Client — I want to connect with a lawyer",
          name: form.name,
          email: form.email,
          country: form.country,
          city: form.city,
          practiceArea: form.practiceArea,
          additionalDetails: form.additionalDetails,
          urgency: form.urgency,
          referralSource: form.referralSource,
          _subject: "New Client Lead — Monogamy",
        }),
      });
      if (res.ok) {
        onSuccess();
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <ProgressBar current={step} total={TOTAL_STEPS} />

      {error && (
        <div className="p-3 bg-destructive/10 border border-destructive/30 text-destructive rounded-lg text-[1.4rem]">
          {error}
        </div>
      )}

      {step === 1 && (
        <div className="space-y-5">
          <h2 className="text-[2.2rem] font-bold">Tell us about yourself</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Full Name <span className="text-primary">*</span></label>
              <input type="text" value={form.name} onChange={(e) => set("name", e.target.value)} required className={inputClass} placeholder="Your full name" />
            </div>
            <div>
              <label className={labelClass}>Email Address <span className="text-primary">*</span></label>
              <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} required className={inputClass} placeholder="you@example.com" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Country <span className="text-primary">*</span></label>
              <select value={form.country} onChange={(e) => set("country", e.target.value)} required className={inputClass + " cursor-pointer"}>
                <option value="">Select country</option>
                {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>City <span className="text-primary">*</span></label>
              <input type="text" value={form.city} onChange={(e) => set("city", e.target.value)} required className={inputClass} placeholder="Your city" />
            </div>
          </div>
          <div className="flex justify-end">
            <button onClick={next} className="flex items-center gap-2 px-8 py-3 text-[1.6rem] font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity btn-primary-glossy">
              Continue <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-5">
          <h2 className="text-[2.2rem] font-bold">What type of legal help do you need?</h2>
          <div>
            <label className={labelClass}>Practice Area <span className="text-primary">*</span></label>
            <select value={form.practiceArea} onChange={(e) => set("practiceArea", e.target.value)} required className={inputClass + " cursor-pointer"}>
              <option value="">Select a practice area</option>
              {PRACTICE_AREAS.map((a) => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Additional Details <span className="text-muted-foreground font-normal">(optional)</span></label>
            <textarea
              value={form.additionalDetails}
              onChange={(e) => set("additionalDetails", e.target.value)}
              rows={4}
              className="w-full text-[1.6rem] leading-[2.2rem] p-4 bg-card border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground resize-y"
              placeholder="Brief description of your situation…"
            />
          </div>
          <div className="flex justify-between">
            <button onClick={() => setStep((s) => s - 1)} className="flex items-center gap-2 px-6 py-3 text-[1.5rem] font-medium border border-border rounded-lg text-muted-foreground hover:text-foreground transition-all">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button onClick={next} className="flex items-center gap-2 px-8 py-3 text-[1.6rem] font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity btn-primary-glossy">
              Continue <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-5">
          <h2 className="text-[2.2rem] font-bold">How urgent is your consultation?</h2>
          <div className="space-y-3">
            {URGENCY_OPTIONS.map((opt) => (
              <label key={opt.value} className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${form.urgency === opt.value ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`}>
                <input
                  type="radio"
                  name="urgency"
                  value={opt.value}
                  checked={form.urgency === opt.value}
                  onChange={(e) => set("urgency", e.target.value)}
                  className="accent-primary w-4 h-4 flex-shrink-0"
                />
                <span className="text-[1.5rem] font-medium">{opt.label}</span>
              </label>
            ))}
          </div>
          <div className="flex justify-between">
            <button onClick={() => setStep((s) => s - 1)} className="flex items-center gap-2 px-6 py-3 text-[1.5rem] font-medium border border-border rounded-lg text-muted-foreground hover:text-foreground transition-all">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button onClick={next} className="flex items-center gap-2 px-8 py-3 text-[1.6rem] font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity btn-primary-glossy">
              Continue <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-5">
          <h2 className="text-[2.2rem] font-bold">How did you find us?</h2>
          <div>
            <label className={labelClass}>How did you hear about Monogamy? <span className="text-muted-foreground font-normal">(optional)</span></label>
            <textarea
              value={form.referralSource}
              onChange={(e) => set("referralSource", e.target.value)}
              rows={3}
              className="w-full text-[1.6rem] leading-[2.2rem] p-4 bg-card border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground resize-y"
              placeholder="e.g. Google, social media, a friend, LinkedIn…"
            />
          </div>
          <div className="flex justify-between">
            <button onClick={() => setStep((s) => s - 1)} className="flex items-center gap-2 px-6 py-3 text-[1.5rem] font-medium border border-border rounded-lg text-muted-foreground hover:text-foreground transition-all">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button onClick={next} className="flex items-center gap-2 px-8 py-3 text-[1.6rem] font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity btn-primary-glossy">
              Review & Submit <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {step === 5 && (
        <form onSubmit={handleSubmit} className="space-y-5">
          <h2 className="text-[2.2rem] font-bold">Review your details</h2>
          <div className="bg-muted rounded-xl p-5 space-y-3 text-[1.4rem]">
            {[
              ["Name", form.name],
              ["Email", form.email],
              ["Country", form.country],
              ["City", form.city],
              ["Practice Area", form.practiceArea],
              ["Urgency", URGENCY_OPTIONS.find((o) => o.value === form.urgency)?.label ?? form.urgency],
              form.referralSource ? ["Referral Source", form.referralSource] : null,
            ]
              .filter(Boolean)
              .map(([k, v]) => (
                <div key={k as string} className="flex flex-col sm:flex-row sm:gap-4">
                  <span className="font-semibold text-foreground sm:w-[14rem] flex-shrink-0">{k}:</span>
                  <span className="text-muted-foreground">{v as string}</span>
                </div>
              ))}
          </div>
          <div className="flex justify-between">
            <button type="button" onClick={() => setStep((s) => s - 1)} className="flex items-center gap-2 px-6 py-3 text-[1.5rem] font-medium border border-border rounded-lg text-muted-foreground hover:text-foreground transition-all">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 px-10 py-3 text-[1.6rem] font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed btn-primary-glossy">
              {isSubmitting ? "Submitting…" : "Submit"} {!isSubmitting && <ArrowRight className="w-5 h-5" />}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
// LAWYER PATHWAY (Pathway 2)
// ---------------------------------------------------------------------------
const LawyerPathway = ({ onSuccess }: { onSuccess: () => void }) => {
  const [step, setStep] = useState(1);
  const TOTAL_STEPS = 6;
  const [form, setForm] = useState<LawyerForm>({
    name: "",
    email: "",
    firmName: "",
    country: "",
    firmSize: "",
    practiceAreas: [],
    experience: "",
    interestLevel: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const set = (field: keyof LawyerForm, value: string | string[]) =>
    setForm((p) => ({ ...p, [field]: value }));

  const togglePA = (area: string) => {
    setForm((p) => ({
      ...p,
      practiceAreas: p.practiceAreas.includes(area)
        ? p.practiceAreas.filter((a) => a !== area)
        : [...p.practiceAreas, area],
    }));
  };

  const next = () => {
    setError("");
    if (step === 1 && (!form.name || !form.email || !form.firmName || !form.country)) {
      setError("Please fill in all required fields.");
      return;
    }
    if (step === 2 && !form.firmSize) {
      setError("Please select firm size.");
      return;
    }
    if (step === 3 && form.practiceAreas.length === 0) {
      setError("Please select at least one practice area.");
      return;
    }
    if (step === 4 && !form.experience) {
      setError("Please select your years of experience.");
      return;
    }
    if (step === 5 && !form.interestLevel) {
      setError("Please select your interest level.");
      return;
    }
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          pathway: "Lawyer — I am a lawyer / represent a law firm",
          name: form.name,
          email: form.email,
          firmName: form.firmName,
          country: form.country,
          firmSize: form.firmSize,
          practiceAreas: form.practiceAreas.join(", "),
          experience: form.experience,
          interestLevel: form.interestLevel,
          _subject: "New Lawyer Lead — Monogamy",
        }),
      });
      if (res.ok) {
        onSuccess();
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <ProgressBar current={step} total={TOTAL_STEPS} />

      {error && (
        <div className="p-3 bg-destructive/10 border border-destructive/30 text-destructive rounded-lg text-[1.4rem]">
          {error}
        </div>
      )}

      {step === 1 && (
        <div className="space-y-5">
          <h2 className="text-[2.2rem] font-bold">Tell us about you and your firm</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Full Name <span className="text-primary">*</span></label>
              <input type="text" value={form.name} onChange={(e) => set("name", e.target.value)} required className={inputClass} placeholder="Your full name" />
            </div>
            <div>
              <label className={labelClass}>Email Address <span className="text-primary">*</span></label>
              <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} required className={inputClass} placeholder="you@lawfirm.com" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Law Firm Name <span className="text-primary">*</span></label>
              <input type="text" value={form.firmName} onChange={(e) => set("firmName", e.target.value)} required className={inputClass} placeholder="Firm or solo practice name" />
            </div>
            <div>
              <label className={labelClass}>Country <span className="text-primary">*</span></label>
              <select value={form.country} onChange={(e) => set("country", e.target.value)} required className={inputClass + " cursor-pointer"}>
                <option value="">Select country</option>
                {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="flex justify-end">
            <button onClick={next} className="flex items-center gap-2 px-8 py-3 text-[1.6rem] font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity btn-primary-glossy">
              Continue <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-5">
          <h2 className="text-[2.2rem] font-bold">How many lawyers are in your firm?</h2>
          <div className="space-y-3">
            {FIRM_SIZES.map((size) => (
              <label key={size} className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${form.firmSize === size ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`}>
                <input type="radio" name="firmSize" value={size} checked={form.firmSize === size} onChange={(e) => set("firmSize", e.target.value)} className="accent-primary w-4 h-4 flex-shrink-0" />
                <span className="text-[1.5rem] font-medium">{size}</span>
              </label>
            ))}
          </div>
          <div className="flex justify-between">
            <button onClick={() => setStep((s) => s - 1)} className="flex items-center gap-2 px-6 py-3 text-[1.5rem] font-medium border border-border rounded-lg text-muted-foreground hover:text-foreground transition-all">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button onClick={next} className="flex items-center gap-2 px-8 py-3 text-[1.6rem] font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity btn-primary-glossy">
              Continue <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-5">
          <h2 className="text-[2.2rem] font-bold">What are your practice areas?</h2>
          <p className="text-[1.4rem] text-muted-foreground">Select all that apply.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {LAWYER_PRACTICE_AREAS.map((area) => (
              <label key={area} className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${form.practiceAreas.includes(area) ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`}>
                <input type="checkbox" checked={form.practiceAreas.includes(area)} onChange={() => togglePA(area)} className="accent-primary w-4 h-4 flex-shrink-0" />
                <span className="text-[1.4rem] font-medium">{area}</span>
              </label>
            ))}
          </div>
          <div className="flex justify-between">
            <button onClick={() => setStep((s) => s - 1)} className="flex items-center gap-2 px-6 py-3 text-[1.5rem] font-medium border border-border rounded-lg text-muted-foreground hover:text-foreground transition-all">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button onClick={next} className="flex items-center gap-2 px-8 py-3 text-[1.6rem] font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity btn-primary-glossy">
              Continue <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-5">
          <h2 className="text-[2.2rem] font-bold">Years of experience or firm establishment</h2>
          <div className="space-y-3">
            {EXPERIENCE_OPTIONS.map((exp) => (
              <label key={exp} className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${form.experience === exp ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`}>
                <input type="radio" name="experience" value={exp} checked={form.experience === exp} onChange={(e) => set("experience", e.target.value)} className="accent-primary w-4 h-4 flex-shrink-0" />
                <span className="text-[1.5rem] font-medium">{exp}</span>
              </label>
            ))}
          </div>
          <div className="flex justify-between">
            <button onClick={() => setStep((s) => s - 1)} className="flex items-center gap-2 px-6 py-3 text-[1.5rem] font-medium border border-border rounded-lg text-muted-foreground hover:text-foreground transition-all">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button onClick={next} className="flex items-center gap-2 px-8 py-3 text-[1.6rem] font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity btn-primary-glossy">
              Continue <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {step === 5 && (
        <div className="space-y-5">
          <h2 className="text-[2.2rem] font-bold">How interested are you in joining the Monogamy network?</h2>
          <div className="space-y-3">
            {INTEREST_LEVELS.map((level) => (
              <label key={level} className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${form.interestLevel === level ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`}>
                <input type="radio" name="interestLevel" value={level} checked={form.interestLevel === level} onChange={(e) => set("interestLevel", e.target.value)} className="accent-primary w-4 h-4 flex-shrink-0" />
                <span className="text-[1.5rem] font-medium">{level}</span>
              </label>
            ))}
          </div>
          <div className="flex justify-between">
            <button onClick={() => setStep((s) => s - 1)} className="flex items-center gap-2 px-6 py-3 text-[1.5rem] font-medium border border-border rounded-lg text-muted-foreground hover:text-foreground transition-all">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button onClick={next} className="flex items-center gap-2 px-8 py-3 text-[1.6rem] font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity btn-primary-glossy">
              Review & Submit <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {step === 6 && (
        <form onSubmit={handleSubmit} className="space-y-5">
          <h2 className="text-[2.2rem] font-bold">Review your details</h2>
          <div className="bg-muted rounded-xl p-5 space-y-3 text-[1.4rem]">
            {[
              ["Name", form.name],
              ["Email", form.email],
              ["Law Firm", form.firmName],
              ["Country", form.country],
              ["Firm Size", form.firmSize],
              ["Practice Areas", form.practiceAreas.join(", ")],
              ["Experience", form.experience],
              ["Interest Level", form.interestLevel],
            ].map(([k, v]) => (
              <div key={k} className="flex flex-col sm:flex-row sm:gap-4">
                <span className="font-semibold text-foreground sm:w-[14rem] flex-shrink-0">{k}:</span>
                <span className="text-muted-foreground">{v}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between">
            <button type="button" onClick={() => setStep((s) => s - 1)} className="flex items-center gap-2 px-6 py-3 text-[1.5rem] font-medium border border-border rounded-lg text-muted-foreground hover:text-foreground transition-all">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 px-10 py-3 text-[1.6rem] font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed btn-primary-glossy">
              {isSubmitting ? "Submitting…" : "Submit"} {!isSubmitting && <ArrowRight className="w-5 h-5" />}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Main Start page
// ---------------------------------------------------------------------------
const Start = () => {
  const [pathway, setPathway] = useState<Pathway>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSuccess = () => setShowSuccess(true);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-primary opacity-[0.03]" />
        <div className="box-content max-w-[138rem] px-6 md:px-[calc(18vw-10rem)] mx-auto py-[6rem] md:py-[10rem]">

          {/* Pre-qualifying step */}
          {pathway === null && (
            <div className="max-w-[70rem] mx-auto text-center">
              <p className="text-[1.4rem] font-semibold uppercase tracking-[0.2em] text-primary mb-4">Get Started</p>
              <h1 className="text-[3.2rem] md:text-[4.4rem] font-bold tracking-[-0.02em] leading-[1.15] mb-6">
                How can we help you today?
              </h1>
              <p className="text-[1.8rem] text-muted-foreground leading-[1.7] mb-12 max-w-[55rem] mx-auto">
                Tell us a bit about yourself so we can point you in the right direction.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <button
                  onClick={() => setPathway("client")}
                  className="flex flex-col items-center gap-4 p-8 rounded-2xl border-2 border-border hover:border-primary bg-card hover:shadow-xl transition-all group"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <span className="text-[2.4rem]">⚖️</span>
                  </div>
                  <span className="text-[1.8rem] font-bold text-foreground leading-[1.3]">
                    I WANT TO CONNECT WITH A LAWYER
                  </span>
                  <span className="text-[1.4rem] text-muted-foreground">
                    Find a vetted attorney for your legal needs
                  </span>
                </button>

                <button
                  onClick={() => setPathway("lawyer")}
                  className="flex flex-col items-center gap-4 p-8 rounded-2xl border-2 border-border hover:border-primary bg-card hover:shadow-xl transition-all group"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <span className="text-[2.4rem]">👔</span>
                  </div>
                  <span className="text-[1.8rem] font-bold text-foreground leading-[1.3]">
                    I AM A LAWYER / I REPRESENT A LAW FIRM
                  </span>
                  <span className="text-[1.4rem] text-muted-foreground">
                    Join the Monogamy network as a legal professional
                  </span>
                </button>
              </div>

              <p className="text-[1.3rem] text-muted-foreground">
                This service is currently available in the United States of America, Canada, Ireland,
                South Africa, Nigeria, Ghana, and Kenya.
              </p>
            </div>
          )}

          {/* Active pathway */}
          {pathway !== null && (
            <div className="max-w-[72rem] mx-auto">
              {/* Back to pathway selection */}
              <button
                onClick={() => setPathway(null)}
                className="flex items-center gap-2 text-[1.4rem] text-muted-foreground hover:text-foreground transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" /> Choose a different pathway
              </button>

              <div className="bg-card border border-border rounded-2xl p-8 md:p-12">
                {pathway === "client" ? (
                  <ClientPathway onSuccess={handleSuccess} />
                ) : (
                  <LawyerPathway onSuccess={handleSuccess} />
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />

      <SuccessModal open={showSuccess} onClose={() => setShowSuccess(false)} pathway={pathway} />
    </div>
  );
};

export default Start;
