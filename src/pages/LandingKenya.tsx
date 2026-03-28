import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import AppearOnScroll from "@/components/AppearOnScroll";
import SEO from "@/components/SEO";
import { PAGE_SEO } from "@/lib/seo";
import { CheckCircle } from "lucide-react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xqaqkwzb";
const TARGET_DATE = new Date("2026-05-01T00:00:00Z");

const useCountdown = (targetDate: Date) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const tick = () => {
      const now = new Date().getTime();
      const diff = targetDate.getTime() - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);
  return timeLeft;
};

const inputClass =
  "w-full text-[1.6rem] leading-[2.2rem] h-[52px] px-4 bg-card border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground";

const LandingKenya = () => {
  const timeLeft = useCountdown(TARGET_DATE);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...formData, market: "Kenya" }),
      });
      if (res.ok) setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const countdownUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO {...PAGE_SEO.landingKenya} />
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, hsl(43 96% 56%) 0%, transparent 60%), radial-gradient(circle at 80% 20%, hsl(0 80% 45%) 0%, transparent 50%)",
          }}
        />
        <Section>
          <div className="w-full max-w-[80rem] mx-auto relative z-10 text-center">
            <AppearOnScroll delay={0}>
              <div className="text-[6rem] mb-6">🇰🇪</div>
            </AppearOnScroll>
            <AppearOnScroll delay={50}>
              <span className="inline-block bg-secondary text-secondary-foreground text-[1.3rem] font-semibold uppercase tracking-[0.15em] px-5 py-2 rounded-full mb-6">
                Launching in Kenya — 1 May 2026
              </span>
            </AppearOnScroll>
            <AppearOnScroll delay={100}>
              <h1 className="text-[3.6rem] md:text-[5rem] lg:text-[6.4rem] font-bold tracking-[-0.02em] leading-[1.1] mb-6">
                Monogamy is Coming to Kenya
              </h1>
            </AppearOnScroll>
            <AppearOnScroll delay={150}>
              <p className="text-[1.8rem] md:text-[2.2rem] text-primary-foreground/80 max-w-[60rem] mx-auto leading-[1.6]">
                Be among the first to access Kenya's premium on-demand legal subscription platform. Connect with vetted advocates across every practice area.
              </p>
            </AppearOnScroll>
          </div>
        </Section>
      </section>

      {/* Countdown */}
      <Section>
        <AppearOnScroll delay={0}>
          <div className="w-full max-w-[70rem] mx-auto text-center">
            <h2 className="text-[2.4rem] font-semibold mb-10">Launching in</h2>
            <div className="grid grid-cols-4 gap-4 md:gap-8">
              {countdownUnits.map(({ label, value }) => (
                <div key={label} className="flex flex-col items-center bg-muted border border-border rounded-2xl p-6">
                  <span className="text-[3.6rem] md:text-[5rem] font-bold text-primary tabular-nums leading-none">
                    {String(value).padStart(2, "0")}
                  </span>
                  <span className="text-[1.4rem] text-muted-foreground mt-2 uppercase tracking-wider">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </AppearOnScroll>
      </Section>

      {/* Form */}
      <section className="bg-muted">
        <Section>
          <div className="w-full max-w-[60rem] mx-auto">
            <AppearOnScroll delay={0}>
              <div className="text-center mb-10">
                <h2 className="text-[2.8rem] md:text-[3.4rem] font-semibold tracking-[-0.01em] mb-4">
                  Join the Founding Members Waiting List
                </h2>
                <p className="text-[1.7rem] text-muted-foreground leading-[1.8]">
                  Be first in line when we launch in Kenya. No spam, just launch news.
                </p>
              </div>
            </AppearOnScroll>

            {submitted ? (
              <AppearOnScroll delay={0}>
                <div className="bg-card border border-border rounded-2xl p-12 text-center">
                  <CheckCircle className="w-16 h-16 text-primary mx-auto mb-6" />
                  <h3 className="text-[2.4rem] font-semibold mb-3">You're on the list!</h3>
                  <p className="text-[1.6rem] text-muted-foreground leading-[1.8]">
                    We'll notify you as soon as Monogamy launches in Kenya on 1 May 2026.
                  </p>
                </div>
              </AppearOnScroll>
            ) : (
              <AppearOnScroll delay={50}>
                <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8 md:p-12 flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[1.5rem] font-medium" htmlFor="ke-name">Full Name</label>
                    <input
                      id="ke-name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[1.5rem] font-medium" htmlFor="ke-email">Email Address</label>
                    <input
                      id="ke-email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[1.5rem] font-medium" htmlFor="ke-phone">Phone Number</label>
                    <input
                      id="ke-phone"
                      name="phone"
                      type="tel"
                      placeholder="+254 ..."
                      value={formData.phone}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[1.5rem] font-medium" htmlFor="ke-category">I am a…</label>
                    <select
                      id="ke-category"
                      name="category"
                      required
                      value={formData.category}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="" disabled>Select your category</option>
                      <option value="client">I am a Client</option>
                      <option value="attorney">I am an Attorney</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full h-[52px] bg-primary text-primary-foreground text-[1.6rem] font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60"
                  >
                    {submitting ? "Submitting…" : "Join the Waiting List"}
                  </button>
                </form>
              </AppearOnScroll>
            )}
          </div>
        </Section>
      </section>

      <Footer />
    </div>
  );
};

export default LandingKenya;
