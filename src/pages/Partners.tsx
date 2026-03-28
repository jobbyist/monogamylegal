import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import AppearOnScroll from "@/components/AppearOnScroll";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  CheckCircle,
  Users,
  TrendingUp,
  Shield,
  MessageSquare,
  Zap,
  Star,
  DollarSign,
  BarChart3,
  Globe,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Bot,
} from "lucide-react";

// Currency
const currencies = [
  { code: "USD", symbol: "$", rate: 1 },
  { code: "EUR", symbol: "\u20ac", rate: 0.92 },
  { code: "ZAR", symbol: "R", rate: 18.6 },
  { code: "NGN", symbol: "\u20a6", rate: 1620 },
  { code: "KES", symbol: "KSh", rate: 130 },
];

// Lawyer plans
const lawyerPlans = [
  {
    name: "Starter",
    priceUSD: 0,
    badge: null as string | null,
    tagline: "Try before you commit.",
    features: [
      "Free custom website included",
      "Up to 5 client leads per month",
      "Basic profile listing",
      "Standard visibility in search",
      "Access to Monogamy legal marketplace",
      "Email support",
    ],
  },
  {
    name: "Growth",
    priceUSD: 39,
    badge: null as string | null,
    tagline: "For lawyers ready to scale.",
    features: [
      "Free custom website included",
      "Up to 20 client leads per month",
      "Enhanced profile with reviews",
      "Priority visibility in search",
      "Basic analytics dashboard",
      "In-app CRM (client tracking)",
      "Chat & email support",
    ],
  },
  {
    name: "Pro",
    priceUSD: 99,
    badge: "Most Popular" as string | null,
    tagline: "Your growth engine.",
    features: [
      "Free custom website included",
      "Up to 60 client leads per month",
      "Premium profile + case showcase",
      "Top-tier search ranking",
      "Advanced analytics & insights",
      "Full CRM suite",
      "Priority client matching",
      "Dedicated concierge support",
      "Cross-border lead access (Africa)",
      "AI Support Chatbot & Voice Assistant",
      "Workflow Automation Tools",
    ],
  },
  {
    name: "Elite",
    priceUSD: 249,
    badge: null as string | null,
    tagline: "Dominate your market.",
    features: [
      "Free custom website included",
      "Unlimited client leads",
      "Featured placement + spotlight ads",
      "#1 search ranking (category-based)",
      "White-glove onboarding",
      "Advanced CRM + team accounts",
      "AI-powered client matching",
      "Dedicated account manager",
      "Quarterly business strategy session",
      "Multi-jurisdiction Africa coverage",
      "Advanced AI Toolkit (custom chatbot & full automation suite)",
    ],
  },
];

const partnerLogos = [
  { name: "DocuSign", initial: "DS" },
  { name: "The LegalTech Fund", initial: "LF" },
  { name: "Clio", initial: "CL" },
  { name: "OpenAI", initial: "OA" },
  { name: "Clerk", initial: "CK" },
];

const testimonials = [
  {
    name: "Adaeze Okonkwo",
    role: "Partner, Okonkwo & Associates (Lagos)",
    quote: "Monogamy tripled our inbound enquiries in the first 60 days. The clients come pre-briefed \u2014 we spend more time closing and less time explaining.",
    avatar: "AO",
  },
  {
    name: "James Mwangi",
    role: "Solo Advocate (Nairobi)",
    quote: "I used to spend 40% of my week on business development. Now Monogamy handles that pipeline automatically.",
    avatar: "JM",
  },
  {
    name: "Thabo Dlamini",
    role: "Director, Dlamini Legal Group (Johannesburg)",
    quote: "The cross-border access is a game-changer. We\u2019re now handling corporate mandates from Nigeria and Kenya without a single cold call.",
    avatar: "TD",
  },
  {
    name: "Ngozi Eze",
    role: "Family Law Specialist (Abuja)",
    quote: "The matching is smart, the clients are serious, and the commission is fair.",
    avatar: "NE",
  },
];

const formatPrice = (usd: number, rate: number, symbol: string) => {
  if (usd === 0) return "Free";
  const converted = usd * rate;
  if (converted >= 10000) return `${symbol}${Math.round(converted).toLocaleString()}`;
  return `${symbol}${Math.round(converted)}`;
};

// Lead Qualification Form Types
interface FormData {
  region: string;
  regionEvidence: string;
  firmSize: string;
  firmSizeEvidence: string;
  practiceAreas: string[];
  practiceEvidence: string;
  clientTypes: string[];
  clientEvidence: string;
  reputationMarkers: string[];
  reputationEvidence: string;
  techAdoption: string;
  techEvidence: string;
  priorEngagement: string;
  contactName: string;
  firmName: string;
  email: string;
  phone: string;
  website: string;
  linkedIn: string;
}

const initialFormData: FormData = {
  region: "", regionEvidence: "",
  firmSize: "", firmSizeEvidence: "",
  practiceAreas: [], practiceEvidence: "",
  clientTypes: [], clientEvidence: "",
  reputationMarkers: [], reputationEvidence: "",
  techAdoption: "", techEvidence: "",
  priorEngagement: "",
  contactName: "", firmName: "", email: "", phone: "", website: "", linkedIn: "",
};

function calculateScore(data: FormData) {
  const max = 20;
  let score = 0;

  if (data.region && !["south-africa","nigeria","kenya","multiple"].includes(data.region)) {
    return { score: 0, max, qualified: false, disqualified: true, reason: "Your firm must be headquartered or operating in South Africa, Nigeria, or Kenya to qualify." };
  }

  if (["south-africa","nigeria","kenya","multiple"].includes(data.region)) score += 3;

  if (data.firmSize === "20-plus") score += 3;
  else if (data.firmSize === "5-19") score += 2;
  else if (data.firmSize === "2-4") score += 1;

  const corePractices = ["corporate-commercial","fintech-regulatory","intellectual-property","employment-labour"];
  const hasCore = data.practiceAreas.some(p => corePractices.includes(p));
  const allIrrelevant = data.practiceAreas.length > 0 && data.practiceAreas.every(p => ["criminal-defence","personal-injury"].includes(p));
  if (hasCore) score += 3;
  else if (allIrrelevant) score += 1;
  else if (data.practiceAreas.length > 0) score += 2;

  const targetClients = ["smes","startups","corporates"];
  const hasTarget = data.clientTypes.some(c => targetClients.includes(c));
  if (hasTarget && data.clientTypes.length >= 2) score += 3;
  else if (hasTarget) score += 2;
  else if (data.clientTypes.length > 0) score += 1;

  if (data.reputationMarkers.includes("lex-africa") || data.reputationMarkers.includes("chambers") || data.reputationMarkers.includes("legal500")) score += 3;
  else if (data.reputationMarkers.length >= 2) score += 2;
  else if (data.reputationMarkers.filter(r => r !== "none").length >= 1) score += 1;

  if (data.techAdoption === "full-suite") score += 3;
  else if (data.techAdoption === "some-tools") score += 2;
  else if (data.techAdoption === "basic") score += 1;

  if (data.priorEngagement === "yes-multiple") score += 2;
  else if (data.priorEngagement === "yes-once") score += 1;

  return { score, max, qualified: score >= 8, disqualified: false, reason: undefined };
}

const TOTAL_STEPS = 9;

function RadioGroup({ options, value, onChange }: {
  options: { value: string; label: string; badge?: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-3">
      {options.map(opt => (
        <button key={opt.value} type="button" onClick={() => onChange(opt.value)}
          className={`w-full flex items-center justify-between px-5 py-4 rounded-xl border-2 text-left transition-all text-[1.5rem] ${
            value === opt.value ? "border-primary bg-primary/5" : "border-border hover:border-primary/40 hover:bg-muted/50"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${value === opt.value ? "border-primary bg-primary" : "border-muted-foreground"}`}>
              {value === opt.value && <div className="w-2 h-2 rounded-full bg-primary-foreground" />}
            </div>
            <span>{opt.label}</span>
          </div>
          {opt.badge && <span className="text-[1.1rem] font-semibold px-2 py-0.5 rounded-md bg-primary/10 text-primary ml-3 flex-shrink-0">{opt.badge}</span>}
        </button>
      ))}
    </div>
  );
}

function CheckboxGroup({ options, values, onChange }: {
  options: { value: string; label: string; badge?: string }[];
  values: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-3">
      {options.map(opt => {
        const checked = values.includes(opt.value);
        return (
          <button key={opt.value} type="button" onClick={() => onChange(opt.value)}
            className={`w-full flex items-center justify-between px-5 py-4 rounded-xl border-2 text-left transition-all text-[1.5rem] ${
              checked ? "border-primary bg-primary/5" : "border-border hover:border-primary/40 hover:bg-muted/50"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center ${checked ? "border-primary bg-primary" : "border-muted-foreground"}`}>
                {checked && <CheckCircle className="w-3 h-3 text-primary-foreground" />}
              </div>
              <span>{opt.label}</span>
            </div>
            {opt.badge && <span className="text-[1.1rem] font-semibold px-2 py-0.5 rounded-md bg-primary/10 text-primary ml-3 flex-shrink-0">{opt.badge}</span>}
          </button>
        );
      })}
    </div>
  );
}

function TextInput({ label, value, onChange, placeholder, required, type = "text" }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; required?: boolean; type?: string;
}) {
  return (
    <div>
      <label className="block text-[1.4rem] font-medium text-foreground mb-2">{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} required={required}
        className="w-full px-4 py-3 text-[1.5rem] rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all placeholder:text-muted-foreground"
      />
    </div>
  );
}

function StepWrapper({ stepNum, title, subtitle, hint, children }: {
  stepNum: number; title: string; subtitle?: string; hint?: string; children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-[1.3rem] font-semibold uppercase tracking-[0.15em] text-primary mb-2">{stepNum} / {TOTAL_STEPS - 1}</p>
      <h3 className="text-[2.2rem] md:text-[2.6rem] font-bold mb-3 leading-[1.3]">{title}</h3>
      {subtitle && <p className="text-[1.6rem] text-muted-foreground leading-[1.7] mb-6">{subtitle}</p>}
      <div className="space-y-4">{children}</div>
      {hint && (
        <div className="mt-6 p-4 rounded-lg bg-muted border border-border">
          <p className="text-[1.3rem] text-muted-foreground leading-[1.6]"><strong>Evidence required:</strong> {hint}</p>
        </div>
      )}
    </div>
  );
}

function FormModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<ReturnType<typeof calculateScore> | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", handleKey); document.body.style.overflow = ""; };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) { setStep(0); setFormData(initialFormData); setSubmitted(false); setResult(null); }
  }, [open]);

  if (!open) return null;

  const progress = step === 0 ? 0 : Math.round((step / TOTAL_STEPS) * 100);
  const toggle = (arr: string[], v: string) => arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v];

  const canProceed = () => {
    switch (step) {
      case 0: return true;
      case 1: return !!formData.region;
      case 2: return !!formData.firmSize;
      case 3: return formData.practiceAreas.length > 0;
      case 4: return formData.clientTypes.length > 0;
      case 5: return formData.reputationMarkers.length > 0;
      case 6: return !!formData.techAdoption;
      case 7: return !!formData.priorEngagement;
      case 8: return !!(formData.contactName && formData.firmName && formData.email && formData.phone);
      default: return true;
    }
  };

  const handleSubmit = () => {
    const res = calculateScore(formData);
    setResult(res);
    setSubmitted(true);
  };

  const renderContent = () => {
    if (submitted && result) {
      if (result.disqualified) return (
        <div className="text-center py-8">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6"><X className="w-8 h-8 text-destructive" /></div>
          <h3 className="text-[2.4rem] font-bold mb-4">Not eligible at this time</h3>
          <p className="text-[1.6rem] text-muted-foreground leading-[1.8] mb-6">{result.reason}</p>
          <p className="text-[1.5rem] text-muted-foreground">Email us: <a href="mailto:partners@monogamy.legal" className="text-primary underline">partners@monogamy.legal</a></p>
        </div>
      );
      if (!result.qualified) return (
        <div className="text-center py-8">
          <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-6"><Star className="w-8 h-8 text-amber-500" /></div>
          <h3 className="text-[2.4rem] font-bold mb-4">Application received</h3>
          <p className="text-[1.6rem] text-muted-foreground leading-[1.8] mb-6">Your score of <strong>{result.score}/{result.max}</strong> is below our current threshold. Our team will review and contact you within 5\u20137 business days.</p>
          <p className="text-[1.5rem] text-muted-foreground">Questions? <a href="mailto:partners@monogamy.legal" className="text-primary underline">partners@monogamy.legal</a></p>
        </div>
      );
      return (
        <div className="text-center py-8">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6"><CheckCircle className="w-8 h-8 text-primary" /></div>
          <h3 className="text-[2.4rem] font-bold mb-4">You\u2019re pre-qualified! \ud83c\udf89</h3>
          <p className="text-[1.6rem] text-muted-foreground leading-[1.8] mb-6">Your firm scored <strong>{result.score}/{result.max}</strong>. A partnerships team member will contact <strong>{formData.email}</strong> within 2 business days.</p>
          <p className="text-[1.4rem] text-muted-foreground">Questions? <a href="mailto:partners@monogamy.legal" className="text-primary underline">partners@monogamy.legal</a></p>
        </div>
      );
    }

    switch (step) {
      case 0: return (
        <div className="text-center py-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6"><Users className="w-8 h-8 text-primary" /></div>
          <h3 className="text-[2.6rem] font-bold mb-4">Join the Monogamy Partner Network</h3>
          <p className="text-[1.7rem] text-muted-foreground leading-[1.8] mb-8 max-w-[50rem] mx-auto">This short application (3\u20135 minutes) qualifies your firm and helps us tailor your access, leads, and support from day one.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 text-left">
            {[
              { icon: Shield, title: "Verified only", desc: "We qualify all partners to protect client trust." },
              { icon: TrendingUp, title: "Better matching", desc: "Your answers improve lead quality for your firm." },
              { icon: MessageSquare, title: "Personalised onboarding", desc: "We tailor your setup to your practice and market." },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-xl border border-border bg-muted/50 flex gap-3">
                <item.icon className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <div><p className="text-[1.5rem] font-semibold mb-1">{item.title}</p><p className="text-[1.4rem] text-muted-foreground leading-[1.6]">{item.desc}</p></div>
              </div>
            ))}
          </div>
          <p className="text-[1.3rem] text-muted-foreground mb-6">\u26a0\ufe0f Submitting false or misleading information will immediately disqualify your application.</p>
          <button onClick={() => setStep(1)} className="inline-flex items-center gap-2 px-10 py-4 text-[1.7rem] font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
            Start Application <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      );
      case 1: return (
        <StepWrapper stepNum={1} title="Where is your firm headquartered or operating?" subtitle="Monogamy operates in South Africa, Nigeria, and Kenya. Firms must have a presence in at least one of these markets." hint="Office address, company registration, or Bar/Law Society membership in that jurisdiction.">
          <RadioGroup options={[
            { value: "south-africa", label: "\ud83c\uddff\ud83c\udde6 South Africa" },
            { value: "nigeria", label: "\ud83c\uddf3\ud83c\uddec Nigeria" },
            { value: "kenya", label: "\ud83c\uddf0\ud83c\uddea Kenya" },
            { value: "multiple", label: "Multiple markets (incl. SA, NG, or KE)" },
            { value: "other", label: "Other / Not listed" },
          ]} value={formData.region} onChange={v => setFormData({...formData, region: v})} />
          <TextInput label="Evidence URL or description" value={formData.regionEvidence} onChange={v => setFormData({...formData, regionEvidence: v})} placeholder="https://your-firm-website.co.za or 'Registered with LSSA since 2018'" />
        </StepWrapper>
      );
      case 2: return (
        <StepWrapper stepNum={2} title="How large is your firm?" subtitle="Larger firms typically receive higher priority placement and more leads." hint="Firm website 'Our Team' page, LinkedIn company page, or press releases.">
          <RadioGroup options={[
            { value: "20-plus", label: "20+ lawyers (Large / Multi-office firm)", badge: "Highest score" },
            { value: "5-19", label: "5\u201319 lawyers (Mid-size firm)" },
            { value: "2-4", label: "2\u20134 lawyers (Boutique firm)" },
            { value: "solo", label: "Solo practitioner" },
          ]} value={formData.firmSize} onChange={v => setFormData({...formData, firmSize: v})} />
          <TextInput label="Link to your firm's team/profile page" value={formData.firmSizeEvidence} onChange={v => setFormData({...formData, firmSizeEvidence: v})} placeholder="https://your-firm.co.za/team or LinkedIn URL" />
        </StepWrapper>
      );
      case 3: return (
        <StepWrapper stepNum={3} title="What are your firm's primary practice areas?" subtitle="Select all that apply. Core commercial and fintech practices earn the highest scores." hint="Your firm website's practice areas or services page.">
          <CheckboxGroup options={[
            { value: "corporate-commercial", label: "Corporate & Commercial Law", badge: "Core" },
            { value: "fintech-regulatory", label: "Fintech & Regulatory", badge: "Core" },
            { value: "intellectual-property", label: "Intellectual Property (IP)", badge: "Core" },
            { value: "employment-labour", label: "Employment & Labour Law", badge: "Core" },
            { value: "real-estate", label: "Real Estate & Property" },
            { value: "tax-law", label: "Tax Law" },
            { value: "dispute-resolution", label: "Dispute Resolution / Litigation" },
            { value: "family-law", label: "Family Law" },
            { value: "criminal-defence", label: "Criminal Defence" },
            { value: "personal-injury", label: "Personal Injury" },
            { value: "general-practice", label: "General Practice" },
          ]} values={formData.practiceAreas} onChange={v => setFormData({...formData, practiceAreas: toggle(formData.practiceAreas, v)})} />
          <TextInput label="Link to your practice areas page" value={formData.practiceEvidence} onChange={v => setFormData({...formData, practiceEvidence: v})} placeholder="https://your-firm.co.za/services" />
        </StepWrapper>
      );
      case 4: return (
        <StepWrapper stepNum={4} title="Who does your firm primarily serve?" subtitle="Monogamy's pipeline focuses on SMEs, startups, and corporates. Select all that apply." hint="Case studies, client testimonials, or your website's 'Clients' section.">
          <CheckboxGroup options={[
            { value: "smes", label: "SMEs (Small & Medium Enterprises)", badge: "Target" },
            { value: "startups", label: "Startups & Early-Stage Businesses", badge: "Target" },
            { value: "corporates", label: "Corporates & Established Businesses", badge: "Target" },
            { value: "ngo-public", label: "NGOs / Public Sector" },
            { value: "individuals", label: "Individual Consumers" },
            { value: "mixed", label: "Mixed / All of the above" },
          ]} values={formData.clientTypes} onChange={v => setFormData({...formData, clientTypes: toggle(formData.clientTypes, v)})} />
          <TextInput label="Evidence link" value={formData.clientEvidence} onChange={v => setFormData({...formData, clientEvidence: v})} placeholder="https://your-firm.co.za/clients" />
        </StepWrapper>
      );
      case 5: return (
        <StepWrapper stepNum={5} title="What markers of reputation does your firm hold?" subtitle="Select all that apply. Recognised firms earn additional points." hint="Awards pages, directory listings (Chambers, Legal 500, Lex Africa), press releases.">
          <CheckboxGroup options={[
            { value: "lex-africa", label: "Lex Africa Member", badge: "Top tier" },
            { value: "chambers", label: "Chambers & Partners Ranked", badge: "Top tier" },
            { value: "legal500", label: "Legal 500 Ranked", badge: "Top tier" },
            { value: "best-lawyers", label: "Best Lawyers Africa Listed" },
            { value: "national-award", label: "National / Regional Legal Award" },
            { value: "bar-leadership", label: "Bar Association Leadership" },
            { value: "media-coverage", label: "Significant Media / Press Coverage" },
            { value: "none", label: "None of the above" },
          ]} values={formData.reputationMarkers} onChange={v => {
            if (v === "none") {
              setFormData({...formData, reputationMarkers: formData.reputationMarkers.includes("none") ? [] : ["none"]});
            } else {
              setFormData({...formData, reputationMarkers: toggle(formData.reputationMarkers.filter(r => r !== "none"), v)});
            }
          }} />
          <TextInput label="Evidence link" value={formData.reputationEvidence} onChange={v => setFormData({...formData, reputationEvidence: v})} placeholder="https://chambers.com/your-firm or press release URL" />
        </StepWrapper>
      );
      case 6: return (
        <StepWrapper stepNum={6} title="What technology does your firm currently use?" subtitle="Tech-savvy firms integrate more smoothly with Monogamy's platform." hint="Firm website, LinkedIn, or brief description of tools in use.">
          <RadioGroup options={[
            { value: "full-suite", label: "Full CRM + Case Management (e.g. Clio, PracticePanther)", badge: "Highest score" },
            { value: "some-tools", label: "Some digital tools (e.g. Google Workspace, billing software)" },
            { value: "basic", label: "Basic digital presence (website, email only)" },
            { value: "none", label: "Minimal / no digital tools" },
          ]} value={formData.techAdoption} onChange={v => setFormData({...formData, techAdoption: v})} />
          <TextInput label="Evidence" value={formData.techEvidence} onChange={v => setFormData({...formData, techEvidence: v})} placeholder="https://your-firm.co.za or 'We use Clio + Google Workspace'" />
        </StepWrapper>
      );
      case 7: return (
        <StepWrapper stepNum={7} title="Has your firm had any prior contact with Monogamy?" subtitle="Prior engagement signals genuine interest and helps us prioritise your onboarding.">
          <RadioGroup options={[
            { value: "yes-multiple", label: "Yes \u2014 multiple touchpoints (events, downloads, prior inquiry)" },
            { value: "yes-once", label: "Yes \u2014 one prior contact or interaction" },
            { value: "no", label: "No \u2014 this is our first contact" },
          ]} value={formData.priorEngagement} onChange={v => setFormData({...formData, priorEngagement: v})} />
        </StepWrapper>
      );
      case 8: return (
        <StepWrapper stepNum={8} title="Almost done \u2014 tell us about yourself" subtitle="A member of our team will review your application within 2 business days.">
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextInput label="Your full name *" value={formData.contactName} onChange={v => setFormData({...formData, contactName: v})} placeholder="e.g. Adaeze Okonkwo" required />
              <TextInput label="Firm name *" value={formData.firmName} onChange={v => setFormData({...formData, firmName: v})} placeholder="e.g. Okonkwo & Associates" required />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextInput label="Work email *" value={formData.email} onChange={v => setFormData({...formData, email: v})} placeholder="you@yourfirm.co.za" required type="email" />
              <TextInput label="Phone number *" value={formData.phone} onChange={v => setFormData({...formData, phone: v})} placeholder="+27 / +234 / +254..." required type="tel" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextInput label="Firm website" value={formData.website} onChange={v => setFormData({...formData, website: v})} placeholder="https://yourfirm.co.za" type="url" />
              <TextInput label="LinkedIn profile or firm page" value={formData.linkedIn} onChange={v => setFormData({...formData, linkedIn: v})} placeholder="https://linkedin.com/company/yourfirm" type="url" />
            </div>
            <p className="text-[1.3rem] text-muted-foreground leading-[1.7]">By submitting, you confirm all information is accurate and verifiable. False or misleading information will immediately disqualify your application.</p>
          </div>
        </StepWrapper>
      );
      default: return null;
    }
  };

  const isLastStep = step === TOTAL_STEPS - 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Partner application form">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div ref={modalRef} className="relative z-10 bg-card border border-border rounded-2xl shadow-2xl w-full max-w-[70rem] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-border sticky top-0 bg-card z-10">
          <div className="flex items-center gap-3">
            <span className="text-[1.4rem] font-semibold text-primary">Partner Application</span>
            {step > 0 && !submitted && <span className="text-[1.2rem] text-muted-foreground">Step {step} of {TOTAL_STEPS - 1}</span>}
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>
        {/* Progress */}
        {step > 0 && !submitted && (
          <div className="h-1 bg-muted"><div className="h-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }} /></div>
        )}
        {/* Body */}
        <div className="px-8 py-8 md:px-12 md:py-10">
          <div className="animate-in fade-in duration-300">{renderContent()}</div>
        </div>
        {/* Footer */}
        {!submitted && step > 0 && (
          <div className="flex items-center justify-between px-8 pb-8 md:px-12">
            <button onClick={() => setStep(s => Math.max(0, s - 1))} className="flex items-center gap-2 px-6 py-3 text-[1.5rem] font-medium text-muted-foreground hover:text-foreground border border-border rounded-lg hover:border-foreground/30 transition-all">
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            {isLastStep ? (
              <button onClick={handleSubmit} disabled={!canProceed()} className="flex items-center gap-2 px-8 py-3 text-[1.5rem] font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed">
                Submit Application <CheckCircle className="w-4 h-4" />
              </button>
            ) : (
              <button onClick={() => setStep(s => s + 1)} disabled={!canProceed()} className="flex items-center gap-2 px-8 py-3 text-[1.5rem] font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed">
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
        {submitted && (
          <div className="px-8 pb-8 md:px-12 text-center">
            <button onClick={onClose} className="px-8 py-3 text-[1.5rem] font-medium border border-border rounded-lg hover:bg-muted transition-colors">Close</button>
          </div>
        )}
      </div>
    </div>
  );
}

// Main Partners Page
const Partners = () => {
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const [formOpen, setFormOpen] = useState(false);
  const autoplayPlugin = Autoplay({ delay: 3500, stopOnInteraction: false });
  const testimonialPlugin = Autoplay({ delay: 5000, stopOnInteraction: false });
  const effectiveRate = billing === "annual" ? selectedCurrency.rate * 0.8 : selectedCurrency.rate;
  const openForm = () => setFormOpen(true);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 pointer-events-none" />
        <div className="box-content max-w-[138rem] px-6 md:px-[calc(18vw-10rem)] mx-auto py-[6rem] md:py-[10rem] lg:py-[14rem]">
          <div className="max-w-[80rem]">
            <AppearOnScroll delay={0}>
              <p className="text-[1.5rem] font-semibold uppercase tracking-[0.2em] text-primary mb-6">For Lawyers & Law Firms</p>
            </AppearOnScroll>
            <AppearOnScroll delay={100}>
              <h1 className="text-[3.6rem] md:text-[5rem] lg:text-[7rem] font-bold tracking-[-0.02em] leading-[1.1] mb-8">
                Stop chasing clients.{" "}
                <span className="text-primary">Start closing them.</span>
              </h1>
            </AppearOnScroll>
            <AppearOnScroll delay={200}>
              <p className="text-[1.8rem] md:text-[2.2rem] leading-[1.7] text-muted-foreground mb-10 max-w-[60rem]">
                Monogamy connects you with high-intent, pre-qualified clients across every practice area \u2014 so you can spend less on marketing and more on winning cases.
              </p>
            </AppearOnScroll>
            <AppearOnScroll delay={300}>
              <div className="flex flex-wrap gap-4">
                <button onClick={openForm} className="inline-flex items-center gap-2 px-10 py-4 text-[1.7rem] font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                  Start Receiving Clients <ArrowRight className="w-5 h-5" />
                </button>
                <a href="#how-it-works" className="inline-block px-10 py-4 text-[1.7rem] font-semibold border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-all">
                  See How It Works
                </a>
              </div>
              <p className="text-[1.3rem] text-muted-foreground mt-4">Available in South Africa \u00b7 Nigeria \u00b7 Kenya</p>
            </AppearOnScroll>
          </div>
        </div>
      </section>

      {/* AI feature badge */}
      <section className="bg-primary/5 border-y border-primary/10">
        <div className="box-content max-w-[110rem] px-6 md:px-[calc(18vw-10rem)] mx-auto py-6 flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-3 flex-shrink-0">
            <Bot className="w-6 h-6 text-primary" />
            <span className="text-[1.4rem] font-semibold text-primary">New on Pro &amp; Elite</span>
          </div>
          <p className="text-[1.5rem] text-foreground">AI-Powered Client Support Chatbots, Voice Assistants &amp; Workflow Automation \u2014 now included on Pro and Elite plans.</p>
          <Link to="/ai-services" className="inline-flex items-center gap-1 text-[1.4rem] font-semibold text-primary hover:underline flex-shrink-0">
            Learn more <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Trust */}
      <Section>
        <div className="w-full max-w-[110rem] mx-auto">
          <AppearOnScroll delay={0}>
            <div className="text-center mb-12">
              <p className="text-[1.4rem] font-semibold uppercase tracking-[0.2em] text-primary mb-4">Trust & Credibility</p>
              <h2 className="text-[2.8rem] md:text-[3.6rem] font-bold">Trusted by top lawyers across Africa</h2>
            </div>
          </AppearOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center mb-16">
            {[
              { value: "1,000s", label: "Clients on Platform" },
              { value: "95%", label: "Client Satisfaction Rate" },
              { value: "3 Countries", label: "South Africa \u00b7 Nigeria \u00b7 Kenya" },
            ].map((stat, i) => (
              <AppearOnScroll key={i} delay={i * 100}>
                <div className="p-8 rounded-xl border border-border bg-card shadow-sm">
                  <p className="text-[3.6rem] font-bold text-primary">{stat.value}</p>
                  <p className="text-[1.5rem] text-muted-foreground mt-1">{stat.label}</p>
                </div>
              </AppearOnScroll>
            ))}
          </div>
          <AppearOnScroll delay={0}>
            <Carousel opts={{ align: "center", loop: true }} plugins={[autoplayPlugin]} className="w-full">
              <CarouselContent className="-ml-4">
                {partnerLogos.map((logo, i) => (
                  <CarouselItem key={i} className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/5">
                    <div className="p-6 rounded-xl border border-border flex items-center justify-center bg-muted/50 h-24">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <span className="text-[1.2rem] font-bold text-primary">{logo.initial}</span>
                        </div>
                        <span className="text-[1.5rem] font-semibold text-foreground">{logo.name}</span>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </AppearOnScroll>
        </div>
      </Section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-muted">
        <Section>
          <div className="w-full max-w-[110rem] mx-auto">
            <AppearOnScroll delay={0}>
              <div className="text-center mb-12">
                <p className="text-[1.4rem] font-semibold uppercase tracking-[0.2em] text-primary mb-4">How It Works</p>
                <h2 className="text-[2.8rem] md:text-[3.6rem] font-bold">Four steps to your first client</h2>
              </div>
            </AppearOnScroll>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { num: "01", icon: Shield, title: "Apply & Get Verified", desc: "Complete our short qualification form. We vet your credentials, practice areas, and market presence." },
                { num: "02", icon: Users, title: "Build Your Profile", desc: "We set up your branded profile and custom website \u2014 included free with every plan." },
                { num: "03", icon: TrendingUp, title: "Receive Pre-Qualified Leads", desc: "Monogamy\u2019s matching engine sends you client inquiries that fit your practice area and availability." },
                { num: "04", icon: MessageSquare, title: "Close & Earn", desc: "Manage cases via our secure platform. Get paid reliably, track earnings in real time, and scale." },
              ].map((s, i) => (
                <AppearOnScroll key={i} delay={i * 100}>
                  <div className="text-center">
                    <span className="text-[4rem] font-bold text-primary/20">{s.num}</span>
                    <s.icon className="w-10 h-10 text-primary mx-auto mt-2 mb-4" />
                    <h3 className="text-[2rem] font-semibold mt-2 mb-3">{s.title}</h3>
                    <p className="text-[1.5rem] text-muted-foreground leading-[1.7]">{s.desc}</p>
                  </div>
                </AppearOnScroll>
              ))}
            </div>
          </div>
        </Section>
      </section>

      {/* Why Monogamy */}
      <Section>
        <div className="w-full max-w-[110rem] mx-auto">
          <AppearOnScroll delay={0}>
            <div className="text-center mb-12">
              <p className="text-[1.4rem] font-semibold uppercase tracking-[0.2em] text-primary mb-4">Why Monogamy</p>
              <h2 className="text-[2.8rem] md:text-[3.6rem] font-bold">Everything you need to run a modern legal practice</h2>
            </div>
          </AppearOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: TrendingUp, title: "Predictable Pipeline", desc: "No more feast-or-famine cycles. Get a steady stream of pre-qualified client leads every month." },
              { icon: Globe, title: "Cross-Border Access", desc: "Serve clients across South Africa, Nigeria, and Kenya from a single platform." },
              { icon: DollarSign, title: "Low Commission", desc: "We charge just 5\u201312% on completed engagements \u2014 only when you win." },
              { icon: Zap, title: "AI-Powered Matching", desc: "Our smart matching engine routes the right clients to the right lawyers, every time." },
              { icon: Bot, title: "AI Toolkit (Pro & Elite)", desc: "Chatbots, voice assistants, and workflow automation \u2014 included on Pro and Elite plans." },
              { icon: BarChart3, title: "Real-Time Analytics", desc: "Track your leads, conversion rates, earnings, and client feedback on your dashboard." },
            ].map((item, i) => (
              <AppearOnScroll key={i} delay={i * 75}>
                <div className="p-6 rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all group">
                  <item.icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-[1.8rem] font-semibold mb-2">{item.title}</h3>
                  <p className="text-[1.4rem] text-muted-foreground leading-[1.6]">{item.desc}</p>
                </div>
              </AppearOnScroll>
            ))}
          </div>
        </div>
      </Section>

      {/* Plans */}
      <section className="bg-muted">
        <Section>
          <div className="w-full max-w-[130rem] mx-auto">
            <AppearOnScroll delay={0}>
              <div className="text-center mb-10">
                <p className="text-[1.4rem] font-semibold uppercase tracking-[0.2em] text-primary mb-4">Lawyer Plans</p>
                <h2 className="text-[2.8rem] md:text-[3.6rem] font-bold mb-6">Start free. Scale as you grow.</h2>
                <div className="flex items-center justify-center gap-6 mb-6">
                  <div className="flex rounded-lg border border-border overflow-hidden">
                    {(["monthly","annual"] as const).map(b => (
                      <button key={b} onClick={() => setBilling(b)} className={`px-6 py-2 text-[1.4rem] font-semibold capitalize transition-all ${billing === b ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                        {b === "annual" ? "Annual (Save 20%)" : "Monthly"}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {currencies.map(c => (
                    <button key={c.code} onClick={() => setSelectedCurrency(c)} className={`px-4 py-2 rounded-lg text-[1.3rem] font-semibold border transition-all ${selectedCurrency.code === c.code ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary hover:text-foreground"}`}>
                      {c.symbol} {c.code}
                    </button>
                  ))}
                </div>
              </div>
            </AppearOnScroll>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
              {lawyerPlans.map((plan, i) => (
                <AppearOnScroll key={plan.name} delay={i * 80}>
                  <div className={`relative rounded-2xl p-8 flex flex-col gap-5 h-full ${plan.badge ? "bg-primary text-primary-foreground border-2 border-primary shadow-2xl" : "bg-card border border-border shadow-md hover:shadow-lg transition-shadow"}`}>
                    {plan.badge && <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1 bg-background text-primary text-[1.2rem] font-bold rounded-full border-2 border-primary whitespace-nowrap">{plan.badge}</span>}
                    <div>
                      <p className={`text-[1.3rem] font-semibold uppercase tracking-[0.15em] mb-2 ${plan.badge ? "text-primary-foreground/70" : "text-primary"}`}>{plan.name}</p>
                      <p className="text-[4rem] font-bold leading-none">
                        {formatPrice(plan.priceUSD, effectiveRate, selectedCurrency.symbol)}
                        {plan.priceUSD > 0 && <span className={`text-[1.6rem] font-normal ml-1 ${plan.badge ? "text-primary-foreground/70" : "text-muted-foreground"}`}>/mo</span>}
                      </p>
                      <p className={`text-[1.3rem] mt-2 italic ${plan.badge ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{plan.tagline}</p>
                    </div>
                    <ul className="space-y-3 flex-1">
                      {plan.features.map((feat, fi) => (
                        <li key={fi} className="flex items-start gap-3 text-[1.4rem]">
                          <CheckCircle className={`w-4 h-4 flex-shrink-0 mt-[3px] ${plan.badge ? "text-primary-foreground" : "text-primary"}`} />
                          <span className={plan.badge ? "text-primary-foreground/90" : ""}>{feat}</span>
                        </li>
                      ))}
                    </ul>
                    <button onClick={openForm} className={`w-full py-3 text-[1.5rem] font-semibold rounded-lg text-center transition-all ${plan.badge ? "bg-background text-primary hover:bg-background/90" : "bg-primary text-primary-foreground hover:opacity-90"}`}>
                      {plan.priceUSD === 0 ? "Start Free" : "Get Started"}
                    </button>
                  </div>
                </AppearOnScroll>
              ))}
            </div>
          </div>
        </Section>
      </section>

      {/* Revenue Model */}
      <Section>
        <div className="w-full max-w-[80rem] mx-auto">
          <AppearOnScroll delay={0}>
            <div className="text-center mb-12">
              <p className="text-[1.4rem] font-semibold uppercase tracking-[0.2em] text-primary mb-4">Revenue Model</p>
              <h2 className="text-[2.8rem] md:text-[3.6rem] font-bold mb-6">We only win when you win</h2>
            </div>
          </AppearOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <AppearOnScroll delay={0}>
              <div className="space-y-6">
                {[
                  { icon: BarChart3, title: "Low Commission. Always.", desc: "We charge a 5\u201312% commission only on successful, completed engagements. No retainer fees beyond your subscription." },
                  { icon: Shield, title: "Performance-Based Alignment", desc: "Our incentives are fully aligned with yours. No locked-in contracts, no hidden fees." },
                  { icon: Star, title: "Transparent Earnings", desc: "See exactly what you earn on every mandate through your real-time dashboard. Payouts are reliable, automated, and on time." },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <item.icon className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-[1.8rem] font-semibold mb-1">{item.title}</h3>
                      <p className="text-[1.5rem] text-muted-foreground leading-[1.7]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AppearOnScroll>
            <AppearOnScroll delay={100}>
              <div className="bg-card border border-border rounded-2xl p-10 shadow-lg text-center">
                <p className="text-[1.4rem] font-semibold uppercase tracking-[0.15em] text-primary mb-4">Commission Rate</p>
                <p className="text-[6rem] font-bold text-foreground leading-none">5\u201312%</p>
                <p className="text-[1.6rem] text-muted-foreground mt-3 mb-6">Only on successful, closed engagements</p>
                <p className="text-[1.4rem] text-muted-foreground leading-[1.8]">Elite members benefit from preferential commission terms.</p>
              </div>
            </AppearOnScroll>
          </div>
        </div>
      </Section>

      {/* Testimonials */}
      <section className="bg-muted">
        <Section>
          <div className="w-full max-w-[110rem] mx-auto">
            <AppearOnScroll delay={0}>
              <div className="text-center mb-12">
                <p className="text-[1.4rem] font-semibold uppercase tracking-[0.2em] text-primary mb-4">Testimonials</p>
                <h2 className="text-[2.8rem] md:text-[3.6rem] font-bold">Lawyers who made the move</h2>
              </div>
            </AppearOnScroll>
            <AppearOnScroll delay={100}>
              <Carousel opts={{ align: "start", loop: true }} plugins={[testimonialPlugin]} className="w-full">
                <CarouselContent className="-ml-4">
                  {testimonials.map((t, i) => (
                    <CarouselItem key={i} className="pl-4 md:basis-1/2 lg:basis-1/2">
                      <div className="bg-card p-8 rounded-xl border border-border h-full">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <span className="text-[1.4rem] font-bold text-primary">{t.avatar}</span>
                          </div>
                          <div>
                            <p className="text-[1.6rem] font-semibold">{t.name}</p>
                            <p className="text-[1.3rem] text-muted-foreground">{t.role}</p>
                          </div>
                        </div>
                        <p className="text-[1.6rem] leading-[1.7] text-muted-foreground italic">"{t.quote}"</p>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </AppearOnScroll>
          </div>
        </Section>
      </section>

      {/* Final CTA */}
      <Section>
        <div className="w-full max-w-[80rem] mx-auto text-center">
          <AppearOnScroll delay={0}>
            <div>
              <p className="text-[1.4rem] font-semibold uppercase tracking-[0.2em] text-primary mb-4">Ready?</p>
              <h2 className="text-[2.8rem] md:text-[3.6rem] lg:text-[5rem] font-bold mb-6 tracking-[-0.02em]">Your next client is already waiting.</h2>
              <p className="text-[1.8rem] text-muted-foreground mb-10 max-w-[55rem] mx-auto leading-[1.7]">
                Join Africa\u2019s fastest-growing legal marketplace. Start free, scale as you grow, and keep more of what you earn.
              </p>
              <button onClick={openForm} className="inline-flex items-center gap-2 px-12 py-5 text-[1.8rem] font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity shadow-lg">
                Start Receiving Clients <ArrowRight className="w-6 h-6" />
              </button>
              <p className="text-[1.3rem] text-muted-foreground mt-4">Available in South Africa \u00b7 Nigeria \u00b7 Kenya</p>
            </div>
          </AppearOnScroll>
        </div>
      </Section>

      <FormModal open={formOpen} onClose={() => setFormOpen(false)} />
      <Footer />
    </div>
  );
};

export default Partners;
