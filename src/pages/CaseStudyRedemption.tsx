import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import AppearOnScroll from "@/components/AppearOnScroll";
import SEO from "@/components/SEO";
import { PAGE_SEO } from "@/lib/seo";
import {
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Globe,
  Scale,
  ShieldCheck,
  CreditCard,
  Search,
  Zap,
  ArrowLeft,
  MapPin,
  Calendar,
  User,
  MessageCircleMore,
  Star,
  Headphones,
} from "lucide-react";

// ── Problem bullets ────────────────────────────────────────────────────────────
const problems = [
  {
    icon: AlertTriangle,
    title: "Underserved market segment",
    description:
      "Post-conviction relief is one of the most underserved segments in the legal industry. Millions of Californians carry past convictions that limit access to employment, housing and education, yet few law practices focused exclusively on this area of the law.",
  },
  {
    icon: Globe,
    title: "Fragmented, outdated service delivery",
    description:
      "Existing providers relied on slow, paper-heavy processes with minimal online presence, making it difficult for prospective clients to discover and engage with qualified attorneys.",
  },
  {
    icon: Scale,
    title: "No clear differentiation or specialisation",
    description:
      "With dominant industry players commanding large ad budgets on Google and Bing, a head-on bidding war for broad keywords would have been financially ruinous for a new entrant.",
  },
  {
    icon: Search,
    title: "Untapped long-tail search opportunity",
    description:
      "There was a significant gap in content and search-engine coverage for specific relief services — Record Expungement, Certificate of Rehabilitation, Arrest Record Sealing and Early Probation Termination — that presented a viable SEO entry point.",
  },
];

// ── Solution bullets ───────────────────────────────────────────────────────────
const solutions = [
  {
    icon: Zap,
    title: "Rapid delivery with a premium Webflow template",
    description:
      "We selected and heavily customised a premium Webflow template to drastically reduce design and development time, enabling us to meet the 6-week deadline without sacrificing visual quality.",
  },
  {
    icon: Globe,
    title: "Multi-format educational content",
    description:
      "The site delivers information across four formats — text, high-quality graphics, a downloadable Whitepaper 2025 and an explainer video — so visitors can engage in the format most natural to them.",
  },
  {
    icon: ShieldCheck,
    title: "Dedicated service pages with optimised CTAs",
    description:
      "Each of the four practice areas received its own comprehensive landing page with SEO-optimised copy and strategically placed call-to-action buttons engineered for paid-search conversions.",
  },
  {
    icon: CreditCard,
    title: "Stripe payment gateway integration",
    description:
      "Secure, PCI-compliant Stripe checkout was integrated directly into the client onboarding flow, enabling prospective clients to retain services online without the friction of a phone call.",
  },
  {
    icon: Search,
    title: "Long-tail SEO & AI search optimisation",
    description:
      "All pages were optimised to rank on Google, Bing and AI-powered search tools such as Perplexity and ChatGPT, capturing intent-rich queries that larger competitors routinely ignore.",
  },
  {
    icon: CheckCircle,
    title: "Memorable, industry-specific domain",
    description:
      "We migrated from the lengthy redemptionlawgroup.com to the short, brand-aligned redemption.legal — instantly communicating authority and improving direct-type traffic.",
  },
];


const comments = [
  { id: 1, author: "Nadia K.", role: "Paid Member", text: "This is one of the clearest legaltech case studies I've read. The funnel strategy is practical and easy to replicate.", sentiment: "positive" },
  { id: 2, author: "Monica R.", role: "Attorney", text: "Loved the breakdown of the 6-week delivery model and how Webflow customisation was handled under pressure.", sentiment: "positive" },
  { id: 3, author: "Ayo T.", role: "Paid Member", text: "The SEO + AI search section is excellent. More screenshots of ranking gains would make it even stronger.", sentiment: "constructive" },
  { id: 4, author: "David L.", role: "Client", text: "Helpful explanation of Stripe integration and onboarding flow. Very actionable insights.", sentiment: "positive" },
];

// ── Project metadata ───────────────────────────────────────────────────────────
const metadata = [
  { icon: User, label: "Client", value: "Redemption Law Group" },
  { icon: MapPin, label: "Location", value: "California, USA" },
  { icon: Scale, label: "Practice", value: "Post-Conviction Relief" },
  { icon: Calendar, label: "Timeline", value: "6-week delivery" },
  { icon: Globe, label: "Platform", value: "Webflow + Stripe" },
];

const CaseStudyRedemption = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasSubscription, setHasSubscription] = useState(false);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("monogamy_demo_logged_in") === "true");
    setHasSubscription(localStorage.getItem("monogamy_demo_paid_member") === "true");
    setRating(Number(localStorage.getItem("monogamy_case_study_rating") || 0));
  }, []);

  const canRate = isLoggedIn && hasSubscription;

  const setPersistedFlag = (key: string, value: boolean, setter: (value: boolean) => void) => {
    localStorage.setItem(key, String(value));
    setter(value);
  };

  const handleRating = (value: number) => {
    if (!canRate) return;
    setRating(value);
    localStorage.setItem("monogamy_case_study_rating", String(value));
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO {...PAGE_SEO.caseStudyRedemption} />
      <Header />

      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, hsl(43 96% 56%) 0%, transparent 60%), radial-gradient(circle at 80% 20%, hsl(222 47% 50%) 0%, transparent 50%)",
          }}
        />
        <Section>
          <div className="w-full max-w-[90rem] mx-auto relative z-10">
            <AppearOnScroll delay={0}>
              <Link
                to="/partners"
                className="inline-flex items-center gap-2 text-[1.4rem] text-primary-foreground/70 hover:text-primary-foreground transition-colors mb-10"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Partners
              </Link>
            </AppearOnScroll>

            <AppearOnScroll delay={50}>
              <p className="text-[1.4rem] font-semibold uppercase tracking-[0.2em] text-secondary mb-4">
                Case Study
              </p>
            </AppearOnScroll>

            <AppearOnScroll delay={100}>
              <h1 className="text-[3.6rem] md:text-[5rem] lg:text-[6.4rem] font-bold tracking-[-0.02em] leading-[1.1] mb-6">
                Redemption Law Group
              </h1>
            </AppearOnScroll>

            <AppearOnScroll delay={150}>
              <p className="text-[1.8rem] md:text-[2.2rem] text-primary-foreground/80 max-w-[65rem] leading-[1.6] mb-10">
                Building a high-converting legaltech platform for post-conviction
                relief services in California — from concept to launch in 6 weeks.
              </p>
            </AppearOnScroll>

            {/* Metadata pills */}
            <AppearOnScroll delay={200}>
              <div className="flex flex-wrap gap-4">
                {metadata.map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2"
                  >
                    <Icon className="w-4 h-4 text-secondary flex-shrink-0" />
                    <span className="text-[1.3rem] text-primary-foreground/70">
                      {label}:
                    </span>
                    <span className="text-[1.3rem] font-semibold text-primary-foreground">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </AppearOnScroll>
          </div>
        </Section>
      </section>

      {/* ── CLIENT OVERVIEW ───────────────────────────────────────────────────── */}
      <Section>
        <div className="w-full max-w-[90rem] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
            <AppearOnScroll delay={0}>
              <div>
                <p className="text-[1.4rem] font-semibold uppercase tracking-[0.2em] text-primary mb-4">
                  About the Client
                </p>
                <h2 className="text-[2.8rem] md:text-[3.6rem] font-bold mb-6 tracking-[-0.02em]">
                  Empowering Californians to reclaim their future
                </h2>
                <p className="text-[1.6rem] text-muted-foreground leading-[1.8] mb-5">
                  Redemption Law Group is a California-based legaltech firm
                  founded by{" "}
                  <span className="font-semibold text-foreground">
                    Pritpal Singh, Esq.
                  </span>{" "}
                  (California State Bar #350741). The platform was created to
                  empower clients across California to{" "}
                  <span className="italic">
                    "gain access to employment, housing, education, and other
                    life-changing opportunities that are often out of reach due
                    to past convictions."
                  </span>
                </p>
                <p className="text-[1.6rem] text-muted-foreground leading-[1.8]">
                  The practice offers four core post-conviction relief services:
                  Record Expungement, Certificate of Rehabilitation, Arrest
                  Record Sealing, and Early Probation Termination — delivered
                  affordably, accessibly, and effectively.
                </p>
              </div>
            </AppearOnScroll>

            {/* Services list */}
            <AppearOnScroll delay={100}>
              <div className="bg-muted rounded-2xl p-8 border border-border">
                <p className="text-[1.4rem] font-semibold uppercase tracking-[0.15em] text-primary mb-6">
                  Services Delivered
                </p>
                {[
                  "Website Design & Development (Webflow)",
                  "UI/UX Strategy & Conversion Optimisation",
                  "Search Engine Optimisation (SEO)",
                  "AI Search Optimisation (Perplexity / ChatGPT)",
                  "Stripe Payment Gateway Integration",
                  "Client Onboarding Flow Design",
                  "Paid Search Marketing Funnel Architecture",
                  "Domain Migration & Technical SEO",
                  "Interactive Blog with Niche Content",
                ].map((service) => (
                  <div
                    key={service}
                    className="flex items-start gap-3 py-3 border-b border-border last:border-0"
                  >
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-[0.2rem]" />
                    <span className="text-[1.5rem] text-foreground">{service}</span>
                  </div>
                ))}
              </div>
            </AppearOnScroll>
          </div>
        </div>
      </Section>

      {/* ── THE PROBLEM ───────────────────────────────────────────────────────── */}
      <section className="bg-muted">
        <Section>
          <div className="w-full max-w-[90rem] mx-auto">
            <AppearOnScroll delay={0}>
              <div className="text-center mb-14">
                <p className="text-[1.4rem] font-semibold uppercase tracking-[0.2em] text-primary mb-4">
                  The Problem
                </p>
                <h2 className="text-[2.8rem] md:text-[3.6rem] lg:text-[4.8rem] font-bold tracking-[-0.02em] mb-6">
                  A market ripe for disruption
                </h2>
                <p className="text-[1.7rem] text-muted-foreground max-w-[65rem] mx-auto leading-[1.8]">
                  Post-conviction relief is one of the most underserved segments
                  in the legal industry. The client needed a solution that could
                  cut through a competitive market without triggering a costly
                  head-on bidding war with entrenched players.
                </p>
              </div>
            </AppearOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {problems.map(({ icon: Icon, title, description }, i) => (
                <AppearOnScroll key={title} delay={i * 75}>
                  <div className="bg-background rounded-2xl p-8 border border-border h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-[1.8rem] font-semibold leading-snug">
                        {title}
                      </h3>
                    </div>
                    <p className="text-[1.5rem] text-muted-foreground leading-[1.8]">
                      {description}
                    </p>
                  </div>
                </AppearOnScroll>
              ))}
            </div>

            {/* Highlight quote */}
            <AppearOnScroll delay={0}>
              <blockquote className="mt-12 border-l-4 border-secondary pl-8 py-2">
                <p className="text-[1.8rem] md:text-[2.2rem] font-medium italic text-foreground leading-[1.6]">
                  "Post-conviction relief services represent a significantly
                  underserved segment of the market. Leveraging AI and modern
                  technology to enhance service delivery is not just an
                  opportunity — it is an imperative."
                </p>
                <footer className="mt-4 text-[1.4rem] text-muted-foreground font-semibold not-italic">
                  — Client brief, Redemption Law Group
                </footer>
              </blockquote>
            </AppearOnScroll>
          </div>
        </Section>
      </section>

      {/* ── OUR SOLUTION ──────────────────────────────────────────────────────── */}
      <Section>
        <div className="w-full max-w-[90rem] mx-auto">
          <AppearOnScroll delay={0}>
            <div className="text-center mb-14">
              <p className="text-[1.4rem] font-semibold uppercase tracking-[0.2em] text-primary mb-4">
                Our Solution
              </p>
              <h2 className="text-[2.8rem] md:text-[3.6rem] lg:text-[4.8rem] font-bold tracking-[-0.02em] mb-6">
                Refined, fast and built to convert
              </h2>
              <p className="text-[1.7rem] text-muted-foreground max-w-[65rem] mx-auto leading-[1.8]">
                We delivered a polished, high-converting product within the
                6-week deadline by combining strategic design choices,
                performance-driven content and targeted technical implementation.
              </p>
            </div>
          </AppearOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map(({ icon: Icon, title, description }, i) => (
              <AppearOnScroll key={title} delay={i * 75}>
                <div className="group bg-card border border-border rounded-2xl p-8 hover:border-primary/40 hover:shadow-lg transition-all duration-300 h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-[1.8rem] font-semibold mb-3 leading-snug">
                    {title}
                  </h3>
                  <p className="text-[1.5rem] text-muted-foreground leading-[1.8]">
                    {description}
                  </p>
                </div>
              </AppearOnScroll>
            ))}
          </div>
        </div>
      </Section>

      {/* ── SITE PREVIEW (iframe) ─────────────────────────────────────────────── */}
      <section className="bg-muted">
        <Section>
          <div className="w-full max-w-[110rem] mx-auto">
            <AppearOnScroll delay={0}>
              <div className="text-center mb-10">
                <p className="text-[1.4rem] font-semibold uppercase tracking-[0.2em] text-primary mb-4">
                  Live Preview
                </p>
                <h2 className="text-[2.8rem] md:text-[3.6rem] font-bold tracking-[-0.02em] mb-4">
                  See the finished product
                </h2>
                <p className="text-[1.6rem] text-muted-foreground max-w-[55rem] mx-auto leading-[1.7]">
                  Visit{" "}
                  <a
                    href="https://redemption.legal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-semibold hover:underline"
                  >
                    redemption.legal
                  </a>{" "}
                  to explore the full site or interact with the live preview below.
                </p>
              </div>
            </AppearOnScroll>

            <AppearOnScroll delay={100}>
              {/* Browser chrome wrapper */}
              <div className="rounded-2xl overflow-hidden border border-border shadow-2xl bg-background">
                {/* Fake browser bar */}
                <div className="bg-card border-b border-border px-5 py-3 flex items-center gap-3">
                  <div className="flex gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-400" />
                    <span className="w-3 h-3 rounded-full bg-yellow-400" />
                    <span className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 bg-muted rounded-md px-4 py-1.5 flex items-center gap-2 max-w-[45rem] mx-auto">
                    <Globe className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-[1.3rem] text-muted-foreground truncate">
                      https://redemption.legal
                    </span>
                  </div>
                  <a
                    href="https://redemption.legal"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open redemption.legal in a new tab"
                    className="ml-auto flex items-center gap-1.5 text-[1.3rem] text-primary font-medium hover:underline"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Open
                  </a>
                </div>

                {/* iframe */}
                <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    src="https://redemption.legal"
                    title="Redemption Law Group — Live Site Preview"
                    className="absolute inset-0 w-full h-full border-0"
                    loading="lazy"
                    sandbox="allow-scripts allow-forms allow-popups"
                  />
                </div>
              </div>
            </AppearOnScroll>

            {/* Fallback link in case iframe is blocked */}
            <AppearOnScroll delay={150}>
              <p className="text-center text-[1.4rem] text-muted-foreground mt-6">
                If the preview does not load,{" "}
                <a
                  href="https://redemption.legal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-medium hover:underline"
                >
                  click here to visit the site directly →
                </a>
              </p>
            </AppearOnScroll>
          </div>
        </Section>
      </section>

      {/* ── RESULTS HIGHLIGHTS ────────────────────────────────────────────────── */}
      <Section>
        <div className="w-full max-w-[90rem] mx-auto">
          <AppearOnScroll delay={0}>
            <div className="text-center mb-12">
              <p className="text-[1.4rem] font-semibold uppercase tracking-[0.2em] text-primary mb-4">
                Key Outcomes
              </p>
              <h2 className="text-[2.8rem] md:text-[3.6rem] font-bold tracking-[-0.02em]">
                Delivered on every brief objective
              </h2>
            </div>
          </AppearOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { stat: "6 weeks", label: "Full delivery timeline" },
              { stat: "4 services", label: "Dedicated landing pages" },
              { stat: ".legal", label: "Industry-specific domain" },
              { stat: "4 formats", label: "Content delivery (text, graphics, doc, video)" },
            ].map(({ stat, label }, i) => (
              <AppearOnScroll key={stat} delay={i * 75}>
                <div className="bg-card border border-border rounded-2xl p-8 text-center hover:border-primary/40 hover:shadow-md transition-all duration-300">
                  <p className="text-[4rem] font-bold text-primary leading-none mb-3">
                    {stat}
                  </p>
                  <p className="text-[1.4rem] text-muted-foreground leading-[1.6]">
                    {label}
                  </p>
                </div>
              </AppearOnScroll>
            ))}
          </div>
        </div>
      </Section>


      {/* ── OPTIONAL ADD-ONS EXPERIENCE ─────────────────────────────────────────── */}
      <section className="bg-muted">
        <Section>
          <div className="w-full max-w-[90rem] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-background border border-border rounded-2xl p-8">
                <p className="text-[1.4rem] font-semibold uppercase tracking-[0.2em] text-primary mb-4">Member Interactions</p>
                <h3 className="text-[2.4rem] font-bold mb-4">Rate this case study</h3>
                <p className="text-[1.5rem] text-muted-foreground leading-[1.7] mb-5">Ratings are persistent and available only to active, logged-in paid members.</p>

                <div className="flex flex-wrap gap-3 mb-6">
                  <button onClick={() => setPersistedFlag("monogamy_demo_logged_in", !isLoggedIn, setIsLoggedIn)} className={`px-4 py-2 rounded-lg border text-[1.3rem] ${isLoggedIn ? "bg-primary text-primary-foreground border-primary" : "border-border"}`}>
                    {isLoggedIn ? "Logged In" : "Log In"}
                  </button>
                  <button onClick={() => setPersistedFlag("monogamy_demo_paid_member", !hasSubscription, setHasSubscription)} className={`px-4 py-2 rounded-lg border text-[1.3rem] ${hasSubscription ? "bg-primary text-primary-foreground border-primary" : "border-border"}`}>
                    {hasSubscription ? "Paid Subscription Active" : "Activate Paid Subscription"}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button key={value} onClick={() => handleRating(value)} aria-label={`Rate ${value} star${value > 1 ? "s" : ""}`} className="transition-transform hover:scale-110">
                      <Star className={`w-7 h-7 ${value <= rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`} />
                    </button>
                  ))}
                </div>
                <p className="text-[1.4rem] mt-3 text-muted-foreground">
                  {canRate ? `Your rating: ${rating || 0}/5` : "Log in and activate a paid subscription to submit a rating."}
                </p>
              </div>

              <div className="bg-background border border-border rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Headphones className="w-6 h-6 text-primary" />
                  <h3 className="text-[2.4rem] font-bold">Listen to this article</h3>
                </div>
                <p className="text-[1.5rem] text-muted-foreground mb-5 leading-[1.7]">Play the transcribed audio version for on-the-go listening.</p>
                <audio controls className="w-full">
                  <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
                </audio>
              </div>
            </div>

            <div className="mt-8 bg-background border border-border rounded-2xl p-8">
              <h3 className="text-[2.4rem] font-bold mb-5">Community discussion</h3>
              <div className="space-y-5">
                {comments.map((comment) => (
                  <article key={comment.id} className="border border-border rounded-xl p-5">
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <div>
                        <p className="text-[1.6rem] font-semibold">{comment.author}</p>
                        <p className="text-[1.3rem] text-muted-foreground">{comment.role}</p>
                      </div>
                      <span className={`text-[1.2rem] px-3 py-1 rounded-full ${comment.sentiment === "constructive" ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}`}>
                        {comment.sentiment === "constructive" ? "Constructive" : "Positive"}
                      </span>
                    </div>
                    <p className="text-[1.5rem] text-muted-foreground leading-[1.7]">{comment.text}</p>
                    <div className="mt-3 flex gap-4">
                      <button className="text-[1.3rem] text-primary inline-flex items-center gap-1 hover:underline"><MessageCircleMore className="w-4 h-4" /> Reply as Monogamy Admin</button>
                      <button className="text-[1.3rem] text-primary hover:underline">Reply as Paid Member</button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </Section>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────────── */}
      <section className="bg-primary text-primary-foreground">
        <Section>
          <div className="w-full max-w-[80rem] mx-auto text-center">
            <AppearOnScroll delay={0}>
              <p className="text-[1.4rem] font-semibold uppercase tracking-[0.2em] text-secondary mb-4">
                Work with us
              </p>
              <h2 className="text-[2.8rem] md:text-[4rem] lg:text-[5.2rem] font-bold tracking-[-0.02em] mb-6">
                Ready to build your legaltech platform?
              </h2>
              <p className="text-[1.8rem] text-primary-foreground/80 mb-10 max-w-[55rem] mx-auto leading-[1.7]">
                Whether you're a solo practitioner or a growing firm, Monogamy
                can help you design, build and grow your digital presence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/partners"
                  className="inline-block px-10 py-4 text-[1.7rem] font-semibold bg-secondary text-foreground rounded-lg hover:opacity-90 transition-opacity shadow-lg"
                >
                  Join as a Partner
                </Link>
                <Link
                  to="/contact"
                  className="inline-block px-10 py-4 text-[1.7rem] font-semibold border border-white/30 text-primary-foreground rounded-lg hover:bg-white/10 transition-colors"
                >
                  Get in Touch
                </Link>
              </div>
            </AppearOnScroll>
          </div>
        </Section>
      </section>

      <Footer />
    </div>
  );
};

export default CaseStudyRedemption;
