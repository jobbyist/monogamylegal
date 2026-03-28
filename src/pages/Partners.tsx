import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import AppearOnScroll from "@/components/AppearOnScroll";
import SEO from "@/components/SEO";
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
} from "lucide-react";

// ─── Currency ───────────────────────────────────────────────────────────────
const currencies = [
  { code: "USD", symbol: "$", rate: 1 },
  { code: "EUR", symbol: "€", rate: 0.92 },
  { code: "ZAR", symbol: "R", rate: 18.6 },
  { code: "NGN", symbol: "₦", rate: 1620 },
  { code: "KES", symbol: "KSh", rate: 130 },
];

// ─── Lawyer plans ────────────────────────────────────────────────────────────
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
    ],
  },
];

// ─── Partner logos ────────────────────────────────────────────────────────────
const partnerLogos = [
  { name: "DocuSign", initial: "DS" },
  { name: "The LegalTech Fund", initial: "LF" },
  { name: "Clio", initial: "CL" },
  { name: "OpenAI", initial: "OA" },
  { name: "Clerk", initial: "CK" },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────
const testimonials = [
  {
    name: "Adaeze Okonkwo",
    role: "Partner, Okonkwo & Associates (Lagos)",
    quote: "Monogamy tripled our inbound enquiries in the first 60 days. The clients come pre-briefed — we spend more time closing and less time explaining.",
    avatar: "AO",
  },
  {
    name: "James Mwangi",
    role: "Solo Advocate (Nairobi)",
    quote: "I used to spend 40% of my week on business development. Now Monogamy handles that pipeline automatically. I focus on what I'm actually good at — the law.",
    avatar: "JM",
  },
  {
    name: "Thabo Dlamini",
    role: "Director, Dlamini Legal Group (Johannesburg)",
    quote: "The cross-border access is a game-changer. We're now handling corporate mandates from Nigeria and Kenya without a single cold call.",
    avatar: "TD",
  },
  {
    name: "Ngozi Eze",
    role: "Family Law Specialist (Abuja)",
    quote: "I was skeptical about legal tech platforms. Monogamy changed my mind. The matching is smart, the clients are serious, and the commission is fair.",
    avatar: "NE",
  },
];

const formatPrice = (usd: number, rate: number, symbol: string) => {
  if (usd === 0) return "Free";
  const converted = usd * rate;
  if (converted >= 10000) return `${symbol}${Math.round(converted).toLocaleString()}`;
  return `${symbol}${Math.round(converted)}`;
};

const Partners = () => {
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const autoplayPlugin = Autoplay({ delay: 3500, stopOnInteraction: false });
  const testimonialPlugin = Autoplay({ delay: 5000, stopOnInteraction: false });

  const effectiveRate = billing === "annual" ? selectedCurrency.rate * 0.8 : selectedCurrency.rate;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Join our partner network | Monogamy"
        description="Monogamy connects you with high-intent, pre-qualified clients across every practice area — so you can spend less on marketing and more on winning cases…"
        canonicalPath="/partners"
      />
      <Header />

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
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
                Monogamy connects you with high-intent, pre-qualified clients across every practice area — so you can spend less on marketing and more on winning cases.
              </p>
            </AppearOnScroll>
            <AppearOnScroll delay={300}>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/start"
                  className="inline-block px-10 py-4 text-[1.7rem] font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                >
                  Join the Network
                </Link>
                <a
                  href="#how-it-works"
                  className="inline-block px-10 py-4 text-[1.7rem] font-semibold border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  See How It Works
                </a>
              </div>
            </AppearOnScroll>
          </div>
        </div>
      </section>

      {/* ── TRUST & CREDIBILITY ────────────────────────────────────────────── */}
      <Section>
        <div className="w-full max-w-[110rem] mx-auto">
          <AppearOnScroll delay={0}>
            <div className="text-center mb-12">
              <p className="text-[1.4rem] font-semibold uppercase tracking-[0.2em] text-primary mb-4">Trust & Credibility</p>
              <h2 className="text-[2.8rem] md:text-[3.6rem] font-bold">Trusted by top lawyers across Africa</h2>
            </div>
          </AppearOnScroll>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center mb-16">
            {[
              { value: "1,000s", label: "Clients on Platform" },
              { value: "95%", label: "Client Satisfaction Rate" },
              { value: "3 Countries", label: "South Africa · Nigeria · Kenya" },
            ].map((stat, i) => (
              <AppearOnScroll key={i} delay={i * 100}>
                <div className="p-8 rounded-xl border border-border bg-card shadow-sm">
                  <p className="text-[3.6rem] font-bold text-primary">{stat.value}</p>
                  <p className="text-[1.5rem] text-muted-foreground mt-1">{stat.label}</p>
                </div>
              </AppearOnScroll>
            ))}
          </div>

          {/* Logo carousel */}
          <AppearOnScroll delay={0}>
            <div>
              <Carousel
                opts={{ align: "center", loop: true }}
                plugins={[autoplayPlugin]}
                className="w-full"
              >
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
            </div>
          </AppearOnScroll>
        </div>
      </Section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
      <section id="how-it-works" className="bg-muted">
        <Section>
          <div className="w-full max-w-[100rem] mx-auto">
            <AppearOnScroll delay={0}>
              <div className="text-center mb-12">
                <p className="text-[1.4rem] font-semibold uppercase tracking-[0.2em] text-primary mb-4">How It Works</p>
                <h2 className="text-[2.8rem] md:text-[3.6rem] font-bold">From sign-up to first client in days</h2>
              </div>
            </AppearOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { num: "01", title: "Create Your Profile", desc: "Set up your lawyer profile — practice areas, experience, and bio in minutes." },
                { num: "02", title: "Submit Verification Docs", desc: "We verify your credentials so clients know they're working with someone qualified." },
                { num: "03", title: "Get Matched with Clients", desc: "Our smart matching engine connects you with clients who need your exact expertise." },
                { num: "04", title: "Close Deals & Earn", desc: "Consult, close, and get paid — with low 5–12% commission on successful engagements only." },
              ].map((step, i) => (
                <AppearOnScroll key={i} delay={i * 150}>
                  <div className="text-center">
                    <span className="text-[4rem] font-bold text-primary/20">{step.num}</span>
                    <h3 className="text-[2rem] font-semibold mt-2 mb-3">{step.title}</h3>
                    <p className="text-[1.5rem] text-muted-foreground leading-[1.7]">{step.desc}</p>
                  </div>
                </AppearOnScroll>
              ))}
            </div>
          </div>
        </Section>
      </section>

      {/* ── BENEFITS ──────────────────────────────────────────────────────── */}
      <Section>
        <div className="w-full max-w-[110rem] mx-auto">
          <AppearOnScroll delay={0}>
            <div className="text-center mb-12">
              <p className="text-[1.4rem] font-semibold uppercase tracking-[0.2em] text-primary mb-4">Why Monogamy</p>
              <h2 className="text-[2.8rem] md:text-[3.6rem] font-bold">Built to grow your practice</h2>
            </div>
          </AppearOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: TrendingUp, title: "Predictable Deal Flow", desc: "No more feast-or-famine cycles. Monogamy delivers a consistent stream of qualified mandates every month." },
              { icon: Users, title: "Pre-Qualified Clients", desc: "Every client has already described their legal need. You show up to a warm conversation, not a cold pitch." },
              { icon: DollarSign, title: "Lower Acquisition Costs", desc: "Replace expensive advertising and referral networks with a flat monthly fee and performance-based commission." },
              { icon: Zap, title: "Smart Matching System", desc: "Our AI matches clients to lawyers based on practice area, jurisdiction, language, and complexity — not just availability." },
              { icon: MessageSquare, title: "Built-in Communication Tools", desc: "Secure chat, document sharing, and video consultations — all inside the platform. No third-party tools needed." },
              { icon: Globe, title: "Pan-African Reach", desc: "Access clients across South Africa, Nigeria, and Kenya from a single dashboard. Cross-border work made simple." },
            ].map((benefit, i) => (
              <AppearOnScroll key={i} delay={i * 75}>
                <div className="p-6 rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all group cursor-default">
                  <benefit.icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-[1.8rem] font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-[1.4rem] text-muted-foreground leading-[1.6]">{benefit.desc}</p>
                </div>
              </AppearOnScroll>
            ))}
          </div>
        </div>
      </Section>

      {/* ── PRICING ──────────────────────────────────────────────────────── */}
      <section className="bg-muted">
        <Section>
          <div className="w-full max-w-[140rem] mx-auto">
            <AppearOnScroll delay={0}>
              <div className="text-center mb-8">
                <p className="text-[1.4rem] font-semibold uppercase tracking-[0.2em] text-primary mb-4">Plans for Lawyers</p>
                <h2 className="text-[2.8rem] md:text-[3.6rem] font-bold mb-4">Invest in your pipeline</h2>
                <p className="text-[1.6rem] text-muted-foreground mb-8">Free custom website included with all paid plans.</p>

                {/* Billing toggle */}
                <div className="flex items-center justify-center gap-4 mb-6 flex-wrap">
                  <div className="flex items-center bg-background border border-border rounded-xl p-1">
                    <button
                      onClick={() => setBilling("monthly")}
                      className={`px-6 py-2 rounded-lg text-[1.4rem] font-semibold transition-all ${billing === "monthly" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
                    >
                      Monthly
                    </button>
                    <button
                      onClick={() => setBilling("annual")}
                      className={`px-6 py-2 rounded-lg text-[1.4rem] font-semibold transition-all ${billing === "annual" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
                    >
                      Annual <span className="text-[1.2rem] font-normal opacity-80">20% off</span>
                    </button>
                  </div>

                  {/* Currency selector */}
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
              {lawyerPlans.map((plan, i) => (
                <AppearOnScroll key={plan.name} delay={i * 80}>
                  <div
                    className={`relative rounded-2xl p-8 flex flex-col gap-5 h-full ${
                      plan.badge
                        ? "bg-primary text-primary-foreground border-2 border-primary shadow-2xl"
                        : "bg-card border border-border shadow-md hover:shadow-lg transition-shadow"
                    }`}
                  >
                    {plan.badge && (
                      <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1 bg-background text-primary text-[1.2rem] font-bold rounded-full border-2 border-primary whitespace-nowrap">
                        {plan.badge}
                      </span>
                    )}
                    <div>
                      <p className={`text-[1.3rem] font-semibold uppercase tracking-[0.15em] mb-2 ${plan.badge ? "text-primary-foreground/70" : "text-primary"}`}>
                        {plan.name}
                      </p>
                      <p className="text-[4rem] font-bold leading-none">
                        {formatPrice(plan.priceUSD, effectiveRate, selectedCurrency.symbol)}
                        {plan.priceUSD > 0 && (
                          <span className={`text-[1.6rem] font-normal ml-1 ${plan.badge ? "text-primary-foreground/70" : "text-muted-foreground"}`}>/mo</span>
                        )}
                      </p>
                      <p className={`text-[1.3rem] mt-2 italic ${plan.badge ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                        {plan.tagline}
                      </p>
                    </div>

                    <ul className="space-y-3 flex-1">
                      {plan.features.map((feat, fi) => (
                        <li key={fi} className="flex items-start gap-3 text-[1.4rem]">
                          <CheckCircle className={`w-4 h-4 flex-shrink-0 mt-[3px] ${plan.badge ? "text-primary-foreground" : "text-primary"}`} />
                          <span className={plan.badge ? "text-primary-foreground/90" : ""}>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      to="/start"
                      className={`w-full py-3 text-[1.5rem] font-semibold rounded-lg text-center transition-all block ${
                        plan.badge
                          ? "bg-background text-primary hover:bg-background/90"
                          : "bg-primary text-primary-foreground hover:opacity-90"
                      }`}
                    >
                      {plan.priceUSD === 0 ? "Start Free" : "Get Started"}
                    </Link>
                  </div>
                </AppearOnScroll>
              ))}
            </div>
          </div>
        </Section>
      </section>

      {/* ── REVENUE MODEL ─────────────────────────────────────────────────── */}
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
                <div className="flex items-start gap-4">
                  <BarChart3 className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-[1.8rem] font-semibold mb-1">Low Commission. Always.</h3>
                    <p className="text-[1.5rem] text-muted-foreground leading-[1.7]">
                      We charge a 5–12% commission only on successful, completed engagements. No retainer fees, no upfront costs beyond your subscription.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Shield className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-[1.8rem] font-semibold mb-1">Performance-Based Alignment</h3>
                    <p className="text-[1.5rem] text-muted-foreground leading-[1.7]">
                      Our incentives are fully aligned with yours. The more deals you close, the better we both do. No locked-in contracts, no hidden fees.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Star className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-[1.8rem] font-semibold mb-1">Transparent Earnings</h3>
                    <p className="text-[1.5rem] text-muted-foreground leading-[1.7]">
                      See exactly what you earn on every mandate through your real-time dashboard. Payouts are reliable, automated, and on time.
                    </p>
                  </div>
                </div>
              </div>
            </AppearOnScroll>
            <AppearOnScroll delay={100}>
              <div className="bg-card border border-border rounded-2xl p-10 shadow-lg text-center">
                <p className="text-[1.4rem] font-semibold uppercase tracking-[0.15em] text-primary mb-4">Commission Rate</p>
                <p className="text-[6rem] font-bold text-foreground leading-none">5–12%</p>
                <p className="text-[1.6rem] text-muted-foreground mt-3 mb-6">Only on successful, closed engagements</p>
                <p className="text-[1.4rem] text-muted-foreground leading-[1.8]">
                  The more senior your profile and the higher your volume, the lower your effective commission rate. Elite members benefit from preferential terms.
                </p>
              </div>
            </AppearOnScroll>
          </div>
        </div>
      </Section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
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
              <div>
                <Carousel
                  opts={{ align: "start", loop: true }}
                  plugins={[testimonialPlugin]}
                  className="w-full"
                >
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
              </div>
            </AppearOnScroll>
          </div>
        </Section>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <Section>
        <div className="w-full max-w-[80rem] mx-auto text-center">
          <AppearOnScroll delay={0}>
            <div>
              <p className="text-[1.4rem] font-semibold uppercase tracking-[0.2em] text-primary mb-4">Ready?</p>
              <h2 className="text-[2.8rem] md:text-[3.6rem] lg:text-[5rem] font-bold mb-6 tracking-[-0.02em]">
                Your next client is already waiting.
              </h2>
              <p className="text-[1.8rem] text-muted-foreground mb-10 max-w-[55rem] mx-auto leading-[1.7]">
                Join Africa's fastest-growing legal marketplace. Start free, scale as you grow, and keep more of what you earn.
              </p>
              <Link
                to="/start"
                className="inline-block px-12 py-5 text-[1.8rem] font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity shadow-lg"
              >
                Start Receiving Clients
              </Link>
            </div>
          </AppearOnScroll>
        </div>
      </Section>

      <Footer />
    </div>
  );
};

export default Partners;
