import { Link } from "react-router-dom";
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
  Lock,
  Star,
  MessageCircle,
  Volume2,
} from "lucide-react";

// ── Problem bullets ────────────────────────────────────────────────────────────
const problems = [
  {
    icon: AlertTriangle,
    title: "Underserved market segment",
    description:
      "Post-conviction relief is one of the most underserved segments in the legal industry. Millions of Californians carry past convictions that limit access to employment, housing and education, yet few law practices focused exclusively on this area of the law — creating a significant gap in the market.",
  },
  {
    icon: Globe,
    title: "Room for AI & tech innovation",
    description:
      "Existing providers relied on slow, paper-heavy processes with minimal online presence. The sector presented a prime opportunity to leverage AI and modern technology to dramatically enhance service delivery and client experience.",
  },
  {
    icon: Scale,
    title: "Modern, high-converting UI/UX needed",
    description:
      "The client needed a user-friendly, visually compelling platform that would build trust with prospective clients, guide them through the intake process seamlessly, and convert visits into paid retentions.",
  },
  {
    icon: Search,
    title: "Avoiding costly bidding wars",
    description:
      "With dominant industry players commanding large ad budgets on Google and Bing, a head-on bidding war for broad keywords would have been financially ruinous. A long-tail SEO strategy targeting specific relief services offered a viable, cost-effective alternative.",
  },
  {
    icon: CreditCard,
    title: "Stripe payment gateway integration",
    description:
      "The client required a secure, PCI-compliant Stripe checkout integrated directly into the onboarding flow — enabling prospective clients to retain services online without the friction of a phone call or in-person meeting.",
  },
  {
    icon: Calendar,
    title: "6-week delivery deadline",
    description:
      "The entire platform — from design through development, content creation, SEO, and payment integration — had to be delivered within a strict 6-week timeline without sacrificing quality.",
  },
];

// ── Solution bullets ───────────────────────────────────────────────────────────
const solutions = [
  {
    icon: Zap,
    title: "Premium Webflow template — 6-week deadline met",
    description:
      "We selected and heavily customised a premium Webflow template to drastically reduce design and development time, enabling us to meet the strict deadline without sacrificing visual quality or brand consistency.",
  },
  {
    icon: Globe,
    title: "Multi-format educational content",
    description:
      "The site delivers information across four formats — text (redemption.legal/), high-quality graphics (redemption.legal/about), downloadable Whitepaper 2025, and an explainer video — so visitors can engage in the format most natural to them.",
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
    title: "Domain migration: redemption.legal",
    description:
      "We migrated from the lengthy redemptionlawgroup.com to the short, brand-aligned redemption.legal — instantly communicating authority and improving direct-type traffic, with full 301-redirect handling to preserve SEO equity.",
  },
];

// ── Project metadata ───────────────────────────────────────────────────────────
const metadata = [
  { icon: User, label: "Client", value: "Redemption Law Group" },
  { icon: MapPin, label: "Location", value: "California, USA" },
  { icon: Scale, label: "Practice", value: "Post-Conviction Relief" },
  { icon: Calendar, label: "Timeline", value: "6-week delivery" },
  { icon: Globe, label: "Platform", value: "Webflow + Stripe" },
];

// ── Optional Add-Ons ──────────────────────────────────────────────────────────
const addOns = [
  {
    icon: Star,
    title: "Star Rating Component",
    description: "A star rating system for logged-in paid subscribers to rate their attorney interactions and case outcomes — driving quality improvement and social proof.",
  },
  {
    icon: Volume2,
    title: '"Listen to this article" Audio Component',
    description: "An AI-generated audio narration layer on blog posts and service pages — enabling time-poor visitors to consume content hands-free.",
  },
  {
    icon: MessageCircle,
    title: "Comment Section (Disqus-style)",
    description: "A moderated comment section with reply links on all blog posts and case studies — building community engagement and user-generated content signals for SEO.",
  },
];

// ── Sample Comments ───────────────────────────────────────────────────────────
const sampleComments = [
  {
    initials: "MO",
    name: "Michael O.",
    date: "14 Jan 2025",
    content:
      "This is exactly what the legal industry needs. The fact that someone finally built a proper digital-first platform for post-conviction relief is incredible. Pritpal's work is genuinely changing lives.",
  },
  {
    initials: "SB",
    name: "Simone B.",
    date: "21 Jan 2025",
    content:
      "I referred a family member to redemption.legal after seeing this case study. The intake process was seamless — they had a consultation booked within hours. Massive respect for what Monogamy built here.",
  },
  {
    initials: "DK",
    name: "David K.",
    date: "3 Feb 2025",
    content:
      "Really impressed by the domain choice — redemption.legal is brilliant. Short, memorable, and it immediately signals what the firm does. Great thinking on the SEO and domain migration strategy.",
  },
  {
    initials: "AT",
    name: "Aisha T.",
    date: "18 Feb 2025",
    content:
      "One constructive point: the case study could include more data on organic traffic growth since launch — specific keyword rankings and month-over-month visitor numbers would make this even more compelling for prospective clients evaluating Monogamy's services.",
    isConstructive: true,
  },
  {
    initials: "JR",
    name: "James R.",
    date: "2 Mar 2025",
    content:
      "The multi-format content strategy is smart — text for SEO, video for conversions, graphics for social, whitepaper for trust-building. That's a comprehensive content engine running off a single platform.",
  },
];

const CaseStudyRedemptionNew = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO {...PAGE_SEO.caseStudyRedemptionNew} />
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
                Building a high-converting LegalTech platform for post-conviction
                relief services in California — from concept to launch in 6 weeks.
              </p>
            </AppearOnScroll>

            <AppearOnScroll delay={200}>
              <div className="flex flex-wrap gap-4">
                {metadata.map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2"
                  >
                    <Icon className="w-4 h-4 text-secondary flex-shrink-0" />
                    <span className="text-[1.3rem] text-primary-foreground/70">{label}:</span>
                    <span className="text-[1.3rem] font-semibold text-primary-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </AppearOnScroll>
          </div>
        </Section>
      </section>

      {/* ── CLIENT PROFILE ────────────────────────────────────────────────────── */}
      <Section>
        <div className="w-full max-w-[90rem] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
            <AppearOnScroll delay={0}>
              <div>
                <p className="text-[1.4rem] font-semibold uppercase tracking-[0.2em] text-primary mb-4">
                  About the Client
                </p>
                <h2 className="text-[2.8rem] md:text-[3.6rem] font-bold mb-6 tracking-[-0.02em]">
                  Empowering Californians to reclaim their future
                </h2>
                <p className="text-[1.6rem] text-muted-foreground leading-[1.8] mb-5">
                  Redemption Law Group is a California-based LegalTech firm
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
                <p className="text-[1.6rem] text-muted-foreground leading-[1.8] mb-5">
                  The practice offers four core post-conviction relief services:
                  Record Expungement, Certificate of Rehabilitation, Arrest
                  Record Sealing, and Early Probation Termination — delivered
                  affordably, accessibly, and effectively.
                </p>
                <a
                  href="https://redemption.legal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[1.5rem] font-semibold text-primary hover:underline"
                >
                  <Globe className="w-5 h-5" />
                  redemption.legal
                </a>
              </div>
            </AppearOnScroll>

            {/* Client profile card */}
            <AppearOnScroll delay={100}>
              <div className="bg-muted rounded-2xl p-8 border border-border">
                <p className="text-[1.4rem] font-semibold uppercase tracking-[0.15em] text-primary mb-6">
                  Client Profile
                </p>
                <div className="flex flex-col gap-4 mb-6">
                  {[
                    { label: "Firm", value: "Redemption Law Group" },
                    { label: "Attorney", value: "Pritpal Singh, Esq." },
                    { label: "Bar Number", value: "California State Bar #350741" },
                    { label: "Location", value: "California, USA" },
                    { label: "Sector", value: "LegalTech / Post-Conviction Relief" },
                    { label: "Website", value: "redemption.legal" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex flex-col gap-1 py-3 border-b border-border last:border-0">
                      <span className="text-[1.3rem] text-muted-foreground uppercase tracking-wider">{label}</span>
                      <span className="text-[1.5rem] font-medium text-foreground">{value}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[1.4rem] font-semibold uppercase tracking-[0.15em] text-primary mb-4">
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
                      <h3 className="text-[1.8rem] font-semibold leading-snug">{title}</h3>
                    </div>
                    <p className="text-[1.5rem] text-muted-foreground leading-[1.8]">{description}</p>
                  </div>
                </AppearOnScroll>
              ))}
            </div>

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
                  <h3 className="text-[1.8rem] font-semibold mb-3 leading-snug">{title}</h3>
                  <p className="text-[1.5rem] text-muted-foreground leading-[1.8]">{description}</p>
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
              <div className="rounded-2xl overflow-hidden border border-border shadow-2xl bg-background">
                <div className="bg-card border-b border-border px-5 py-3 flex items-center gap-3">
                  <div className="flex gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-400" />
                    <span className="w-3 h-3 rounded-full bg-yellow-400" />
                    <span className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 bg-muted rounded-md px-4 py-1.5 flex items-center gap-2 max-w-[45rem] mx-auto">
                    <Globe className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <span className="text-[1.3rem] text-muted-foreground truncate">https://redemption.legal</span>
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
              <p className="text-[1.4rem] font-semibold uppercase tracking-[0.2em] text-primary mb-4">Key Outcomes</p>
              <h2 className="text-[2.8rem] md:text-[3.6rem] font-bold tracking-[-0.02em]">Delivered on every brief objective</h2>
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
                  <p className="text-[4rem] font-bold text-primary leading-none mb-3">{stat}</p>
                  <p className="text-[1.4rem] text-muted-foreground leading-[1.6]">{label}</p>
                </div>
              </AppearOnScroll>
            ))}
          </div>
        </div>
      </Section>

      {/* ── OPTIONAL ADD-ONS ──────────────────────────────────────────────────── */}
      <section className="bg-muted">
        <Section>
          <div className="w-full max-w-[90rem] mx-auto">
            <AppearOnScroll delay={0}>
              <div className="text-center mb-12">
                <p className="text-[1.4rem] font-semibold uppercase tracking-[0.2em] text-primary mb-4">Optional Add-Ons</p>
                <h2 className="text-[2.8rem] md:text-[3.6rem] font-bold tracking-[-0.02em] mb-4">Coming Soon Features</h2>
                <p className="text-[1.7rem] text-muted-foreground max-w-[60rem] mx-auto leading-[1.8]">
                  These premium enhancements are in development and will be available to clients on higher-tier plans.
                </p>
              </div>
            </AppearOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {addOns.map(({ icon: Icon, title, description }, i) => (
                <AppearOnScroll key={title} delay={i * 75}>
                  <div className="bg-background border border-border rounded-2xl p-8 relative overflow-hidden h-full">
                    <div className="absolute top-4 right-4 flex items-center gap-2">
                      <Lock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-[1.1rem] font-semibold bg-secondary/20 text-secondary-foreground px-2 py-0.5 rounded-full border border-secondary/30">Coming Soon</span>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-[1.8rem] font-semibold mb-3 leading-snug pr-8">{title}</h3>
                    <p className="text-[1.5rem] text-muted-foreground leading-[1.8]">{description}</p>
                  </div>
                </AppearOnScroll>
              ))}
            </div>
          </div>
        </Section>
      </section>

      {/* ── COMMENT SECTION ───────────────────────────────────────────────────── */}
      <Section>
        <div className="w-full max-w-[80rem] mx-auto">
          <AppearOnScroll delay={0}>
            <div className="mb-10">
              <h2 className="text-[2.4rem] font-semibold mb-2">Comments</h2>
              <p className="text-[1.5rem] text-muted-foreground">{sampleComments.length} comments</p>
            </div>
          </AppearOnScroll>
          <div className="flex flex-col gap-8">
            {sampleComments.map(({ initials, name, date, content, isConstructive }, i) => (
              <AppearOnScroll key={i} delay={i * 50}>
                <div className={`flex gap-5 ${isConstructive ? "bg-muted rounded-2xl p-6 border border-border" : ""}`}>
                  <div className="w-12 h-12 rounded-full bg-primary/10 border border-border flex items-center justify-center flex-shrink-0">
                    <span className="text-[1.4rem] font-bold text-primary">{initials}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[1.5rem] font-semibold text-foreground">{name}</span>
                      {isConstructive && (
                        <span className="text-[1.1rem] bg-muted-foreground/10 text-muted-foreground px-2 py-0.5 rounded-full border border-border">Constructive feedback</span>
                      )}
                      <span className="text-[1.3rem] text-muted-foreground">{date}</span>
                    </div>
                    <p className="text-[1.5rem] text-muted-foreground leading-[1.8] mb-3">{content}</p>
                    <button className="text-[1.3rem] text-primary font-medium hover:underline">Reply</button>
                  </div>
                </div>
              </AppearOnScroll>
            ))}
          </div>
        </div>
      </Section>

      {/* ── CTA ───────────────────────────────────────────────────────────────── */}
      <section className="bg-primary text-primary-foreground">
        <Section>
          <div className="w-full max-w-[80rem] mx-auto text-center">
            <AppearOnScroll delay={0}>
              <p className="text-[1.4rem] font-semibold uppercase tracking-[0.2em] text-secondary mb-4">Work with us</p>
              <h2 className="text-[2.8rem] md:text-[4rem] lg:text-[5.2rem] font-bold tracking-[-0.02em] mb-6">
                Ready to build your LegalTech platform?
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

export default CaseStudyRedemptionNew;
