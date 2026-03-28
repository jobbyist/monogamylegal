import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import AppearOnScroll from "@/components/AppearOnScroll";
import { CheckCircle, Zap } from "lucide-react";

const currencies = [
  { code: "USD", symbol: "$", label: "US Dollar", rate: 1 },
  { code: "EUR", symbol: "€", label: "Euro", rate: 0.92 },
  { code: "ZAR", symbol: "R", label: "South African Rand", rate: 18.6 },
  { code: "NGN", symbol: "₦", label: "Nigerian Naira", rate: 1620 },
  { code: "KES", symbol: "KSh", label: "Kenyan Shilling", rate: 130 },
];

const plans = [
  {
    name: "Essential",
    priceUSD: 19.99,
    tagline: "Affordable legal clarity, on demand.",
    badge: null as string | null,
    perfectFor: "Individuals, freelancers, early-stage founders",
    features: [
      "Access to vetted lawyer network (all practice areas)",
      "2 legal consultations per month (20–30 mins each, chat or call)",
      "Basic document review (1 document/month, up to 5 pages)",
      "Standard response time (24–48 hours)",
      "Access to legal templates library (contracts, NDAs, etc.)",
      "In-app messaging with matched lawyers",
    ],
  },
  {
    name: "Professional",
    priceUSD: 49.99,
    tagline: null as string | null,
    badge: "Popular" as string | null,
    perfectFor: "SMEs, growing startups, serious operators",
    features: [
      "Everything in Essential, plus:",
      "5 legal consultations per month (priority booking)",
      "Faster response time (within 12–24 hours)",
      "Document review (up to 3 documents/month, 10 pages each)",
      "1 custom document draft per month (e.g., contract, agreement)",
      "Dedicated legal concierge (smart matching to best-fit lawyers)",
      "Discounted hourly rates (10–15% off) for extended work",
      "Multi-country legal access (cross-border advisory within Africa)",
    ],
  },
  {
    name: "Enterprise",
    priceUSD: 129.99,
    tagline: null as string | null,
    badge: null as string | null,
    perfectFor: "Established businesses, high-growth startups, agencies",
    features: [
      "Everything in Professional, plus:",
      "Unlimited consultations (fair use policy)",
      "Same-day response time (priority queue)",
      "Unlimited document reviews",
      "3 custom legal documents per month",
      "Dedicated account manager (human, not just concierge)",
      "Legal risk monitoring + proactive alerts (compliance, deadlines, etc.)",
      "20% discounted rates for complex legal work",
      "Team access (up to 5 users)",
      "Quarterly legal strategy session (deep-dive with senior lawyer)",
    ],
  },
];

const formatPrice = (usd: number, rate: number, symbol: string) => {
  const converted = usd * rate;
  if (converted >= 10000) {
    return `${symbol}${Math.round(converted).toLocaleString()}`;
  }
  return `${symbol}${converted.toFixed(2)}`;
};

const Pricing = () => {
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <Section>
        <div className="text-center w-full max-w-[80rem] mx-auto">
          <AppearOnScroll delay={0}>
            <div>
              <p className="text-[1.4rem] font-semibold uppercase tracking-[0.2em] text-primary mb-4">Pricing</p>
              <h1 className="text-[3.4rem] md:text-[4.2rem] lg:text-[6rem] font-semibold tracking-[-0.01em] leading-[1.2] md:leading-[1] mb-[2rem]">
                Plans that scale with your needs
              </h1>
              <p className="text-[1.8rem] md:text-[2rem] text-muted-foreground leading-[1.8] mb-8">
                No surprises. No hourly billing. Just the legal muscle you need, exactly when you need it.
              </p>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <span className="text-[1.4rem] text-muted-foreground font-medium">Currency:</span>
                <div className="flex flex-wrap gap-2">
                  {currencies.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => setSelectedCurrency(c)}
                      className={`px-4 py-2 rounded-lg text-[1.3rem] font-semibold border transition-all ${
                        selectedCurrency.code === c.code
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-border text-muted-foreground hover:border-primary hover:text-foreground"
                      }`}
                    >
                      {c.symbol} {c.code}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </AppearOnScroll>
        </div>
      </Section>

      <Section>
        <div className="w-full max-w-[120rem] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {plans.map((plan, i) => (
              <AppearOnScroll key={plan.name} delay={i * 100}>
                <div
                  className={`relative rounded-2xl p-10 md:p-12 flex flex-col gap-6 h-full ${
                    plan.badge
                      ? "bg-primary text-primary-foreground border-2 border-primary shadow-2xl scale-[1.02]"
                      : "bg-card border border-border shadow-lg hover:shadow-xl transition-shadow"
                  }`}
                >
                  {plan.badge && (
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1 bg-background text-primary text-[1.2rem] font-bold rounded-full border-2 border-primary">
                      {plan.badge}
                    </span>
                  )}
                  <div>
                    <p className={`text-[1.3rem] font-semibold uppercase tracking-[0.15em] mb-2 ${plan.badge ? "text-primary-foreground/70" : "text-primary"}`}>
                      {plan.name}
                    </p>
                    <p className="text-[5rem] font-bold leading-none">
                      {formatPrice(plan.priceUSD, selectedCurrency.rate, selectedCurrency.symbol)}
                      <span className={`text-[1.8rem] font-normal ml-1 ${plan.badge ? "text-primary-foreground/70" : "text-muted-foreground"}`}>/month</span>
                    </p>
                    {plan.tagline && (
                      <p className={`text-[1.4rem] mt-3 italic ${plan.badge ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                        "{plan.tagline}"
                      </p>
                    )}
                  </div>

                  <div>
                    <p className={`text-[1.3rem] font-semibold uppercase tracking-[0.1em] mb-1 ${plan.badge ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                      Perfect for
                    </p>
                    <p className={`text-[1.5rem] ${plan.badge ? "text-primary-foreground/90" : "text-foreground"}`}>
                      {plan.perfectFor}
                    </p>
                  </div>

                  <ul className="space-y-4 flex-1">
                    {plan.features.map((feat, fi) => (
                      <li key={fi} className={`flex items-start gap-3 text-[1.5rem] ${fi === 0 && feat.includes("Everything") ? "font-semibold" : ""}`}>
                        {feat.includes("Everything") ? (
                          <Zap className={`w-5 h-5 flex-shrink-0 mt-[2px] ${plan.badge ? "text-primary-foreground" : "text-primary"}`} />
                        ) : (
                          <CheckCircle className={`w-5 h-5 flex-shrink-0 mt-[2px] ${plan.badge ? "text-primary-foreground" : "text-primary"}`} />
                        )}
                        <span className={plan.badge ? "text-primary-foreground/90" : ""}>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/contact"
                    className={`w-full py-4 text-[1.6rem] font-semibold rounded-lg text-center transition-all block mt-2 ${
                      plan.badge
                        ? "bg-background text-primary hover:bg-background/90"
                        : "bg-primary text-primary-foreground hover:opacity-90"
                    }`}
                  >
                    Get Started
                  </Link>
                </div>
              </AppearOnScroll>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="text-center max-w-[60rem] mx-auto">
          <AppearOnScroll delay={0}>
            <div>
              <h2 className="text-[2.4rem] font-bold mb-4">Are you a lawyer or law firm?</h2>
              <p className="text-[1.7rem] text-muted-foreground mb-6">
                Join the Monogamy network and get a predictable pipeline of pre-qualified clients across Africa. Zero cold outreach required.
              </p>
              <Link to="/partners" className="inline-block px-8 py-3 text-[1.6rem] font-medium border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-all">
                Join as a Lawyer
              </Link>
            </div>
          </AppearOnScroll>
        </div>
      </Section>

      <Footer />
    </div>
  );
};

export default Pricing;
