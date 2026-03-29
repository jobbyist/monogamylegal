import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import SEO from "@/components/SEO";
import { CheckCircle, Clock4 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PAGE_SEO } from "@/lib/seo";

type MarketKey = "ireland" | "ghana" | "kenya";

interface FoundingMembersLandingProps {
  marketKey: MarketKey;
  marketName: string;
  routePath: "/ie" | "/gh" | "/ke";
  timeZone: string;
  dialCodeHint: string;
}

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xqaqkwzb";
const LAUNCH_DATE_UTC = new Date("2026-05-01T00:00:00Z").getTime();

const seoByMarket: Record<MarketKey, (typeof PAGE_SEO)["irelandLanding"]> = {
  ireland: PAGE_SEO.irelandLanding,
  ghana: PAGE_SEO.ghanaLanding,
  kenya: PAGE_SEO.kenyaLanding,
};

const FoundingMembersLanding = ({
  marketKey,
  marketName,
  routePath,
  timeZone,
  dialCodeHint,
}: FoundingMembersLandingProps) => {
  const { toast } = useToast();
  const [now, setNow] = useState(Date.now());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    category: "",
  });

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const launchDateReadable = useMemo(
    () =>
      new Intl.DateTimeFormat("en-GB", {
        dateStyle: "full",
        timeStyle: "short",
        timeZone,
      }).format(new Date(LAUNCH_DATE_UTC)),
    [timeZone]
  );

  const msLeft = Math.max(0, LAUNCH_DATE_UTC - now);
  const countdown = {
    days: Math.floor(msLeft / (1000 * 60 * 60 * 24)),
    hours: Math.floor((msLeft / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((msLeft / (1000 * 60)) % 60),
    seconds: Math.floor((msLeft / 1000) % 60),
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          userCategory: formData.category,
          market: marketName,
          page: `https://monogamy.legal${routePath}`,
          _subject: `Founding Members Waiting List — ${marketName}`,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        toast({ title: "You're on the waiting list.", description: "We'll share launch updates by email." });
      } else {
        toast({ title: "Submission failed", description: "Please try again in a moment.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Network error", description: "Please check your connection and retry.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full h-[52px] px-4 text-[1.6rem] bg-card border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";

  return (
    <div className="min-h-screen bg-background">
      <SEO {...seoByMarket[marketKey]} />
      <Header />

      <Section>
        <div className="max-w-[112rem] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-[1.4rem] font-semibold uppercase tracking-[0.2em] text-primary mb-4">Founding Members · {marketName}</p>
            <h1 className="text-[3.4rem] md:text-[5rem] font-bold tracking-[-0.02em] leading-[1.15] mb-6">
              Join the Founding Members Waiting List
            </h1>
            <p className="text-[1.8rem] text-muted-foreground leading-[1.8] mb-8">
              Be first in line for Monogamy in {marketName}. We are onboarding clients and attorneys with priority access, launch perks, and region-specific legal support.
            </p>

            <div className="bg-muted border border-border rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-5">
                <Clock4 className="w-6 h-6 text-primary" />
                <h2 className="text-[2rem] font-semibold">Launch Countdown</h2>
              </div>
              <p className="text-[1.4rem] text-muted-foreground mb-5">Launch target: {launchDateReadable}</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {Object.entries(countdown).map(([unit, value]) => (
                  <div key={unit} className="rounded-xl bg-background border border-border p-4 text-center">
                    <p className="text-[3rem] font-bold leading-none text-primary">{String(value).padStart(2, "0")}</p>
                    <p className="text-[1.2rem] uppercase tracking-widest text-muted-foreground mt-2">{unit}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 space-y-3">
              {[
                "Priority onboarding for founding members",
                "Early access to cross-border legal matching",
                "Invite-only market launch updates",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-[1.6rem]">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-8 md:p-10">
            {submitted ? (
              <div className="text-center py-12">
                <h2 className="text-[2.6rem] font-bold mb-3">Thanks for joining!</h2>
                <p className="text-[1.7rem] text-muted-foreground leading-[1.7]">
                  We have added <strong>{formData.email}</strong> to the {marketName} founding members waiting list.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-[1.5rem] font-medium mb-2">Full Name *</label>
                  <input name="fullName" required value={formData.fullName} onChange={(e) => setFormData((p) => ({ ...p, fullName: e.target.value }))} className={inputClass} placeholder="Your full name" />
                </div>
                <div>
                  <label className="block text-[1.5rem] font-medium mb-2">Email Address *</label>
                  <input name="email" type="email" required value={formData.email} onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))} className={inputClass} placeholder="you@example.com" />
                </div>
                <div>
                  <label className="block text-[1.5rem] font-medium mb-2">Phone Number *</label>
                  <input name="phone" type="tel" required value={formData.phone} onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))} className={inputClass} placeholder={dialCodeHint} />
                </div>
                <div>
                  <label className="block text-[1.5rem] font-medium mb-2">I am joining as *</label>
                  <select name="category" required value={formData.category} onChange={(e) => setFormData((p) => ({ ...p, category: e.target.value }))} className={`${inputClass} cursor-pointer`}>
                    <option value="">Select category</option>
                    <option value="Client">Client</option>
                    <option value="Attorney">Attorney</option>
                  </select>
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full h-[56px] text-[1.7rem] font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60">
                  {isSubmitting ? "Submitting…" : "Join the Founding Members Waiting List"}
                </button>
              </form>
            )}
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
};

export default FoundingMembersLanding;
