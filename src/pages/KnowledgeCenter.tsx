import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import AppearOnScroll from "@/components/AppearOnScroll";
import SEO from "@/components/SEO";
import { PAGE_SEO } from "@/lib/seo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  BarChart3,
  Globe,
  Cpu,
  FileText,
  Video,
  Image,
  Lock,
  TrendingUp,
  Users,
  Scale,
  Briefcase,
} from "lucide-react";

// ── Roadmap ───────────────────────────────────────────────────────────────────
const roadmap = [
  { quarter: "Q1 2026", title: "Beta Launch", description: "Beta launch in existing markets: South Africa, Nigeria, and Kenya. Onboarding founding members and attorney partners." },
  { quarter: "Q2 2026", title: "Ireland, Ghana & Kenya Launch", description: "Full public launch in Ireland, Ghana, and Kenya — bringing on-demand legal services to three new jurisdictions simultaneously." },
  { quarter: "Q3 2026", title: "Mobile App", description: "Native iOS and Android apps for seamless attorney-client communication, document sharing, and subscription management on the go." },
  { quarter: "Q4 2026", title: "AI-Powered Matching", description: "Next-generation AI matching engine that analyses legal needs, practice-area expertise, jurisdiction, and client history for optimal pairings." },
  { quarter: "2027+", title: "Pan-African Expansion", description: "Phased expansion across West, East, and Southern Africa — targeting 15+ markets and 10,000+ vetted attorneys on the platform." },
];

// ── Resources ────────────────────────────────────────────────────────────────
const resources = [
  {
    icon: FileText,
    title: "2026 LegalTech Whitepaper",
    description: "An in-depth analysis of LegalTech trends, AI disruption, and market opportunities across Africa and beyond.",
    badge: "Coming Soon",
  },
  {
    icon: BarChart3,
    title: "Market Insights & Analysis Reports",
    description: "Quarterly reports on the African legal market, subscription adoption, attorney utilisation, and client satisfaction data.",
    badge: null,
  },
  {
    icon: Video,
    title: "Explainer Videos",
    description: "Short-form video content walking through how Monogamy works, how attorney matching operates, and how to get the most from your subscription.",
    badge: null,
  },
  {
    icon: Image,
    title: "Brand Asset Kits",
    description: "Official Monogamy logos, colour palettes, typography guidelines, and usage instructions. Attribution: please credit 'Monogamy — monogamy.legal' when using brand assets publicly.",
    badge: null,
  },
];

// ── Live Stats ────────────────────────────────────────────────────────────────
const stats = [
  { value: "$1.2T", label: "Global legal market size" },
  { value: "67%", label: "Legal tasks automatable by AI" },
  { value: "320M+", label: "Africans lack access to legal services" },
  { value: "82%", label: "SMEs face unmet legal needs" },
  { value: "$4.5B", label: "African legal market opportunity" },
];

// ── Cornerstone Accordion ─────────────────────────────────────────────────────
const cornerstoneContent = [
  {
    title: "How Attorney-Client Matching Works",
    content: `Monogamy uses an intelligent matching algorithm that analyses the client's stated legal need, jurisdiction, preferred language, urgency level, and practice area to surface the best available attorney from our vetted network.\n\nWhen a client submits a matter, the system scores available attorneys based on practice-area expertise, current caseload, response time history, and client satisfaction ratings. The highest-scoring available attorney is assigned — or the client may choose from the top three recommendations.\n\nAll attorneys are pre-vetted before being admitted to the network, so every match represents a qualified professional. Enterprise clients may also request dedicated account attorneys for consistent representation.`,
  },
  {
    title: "Attorney Vetting Framework",
    content: `Every attorney admitted to the Monogamy network passes a multi-stage vetting process:\n\n1. Licence Verification — we confirm bar admission, active standing, and any disciplinary history with the relevant regulatory body (LSSA in South Africa, NBA in Nigeria, LSK in Kenya, Law Society of Ireland for the Irish market).\n\n2. Background & Conflict Checks — criminal background checks and conflict-of-interest screening are conducted prior to onboarding.\n\n3. Peer & Client Reviews — new attorneys are assessed by existing network members and rated by their first ten clients before full activation.\n\n4. Ongoing Monitoring — client satisfaction scores are tracked continuously. Attorneys falling below our quality threshold are placed on a performance improvement plan or removed from the network.`,
  },
  {
    title: "Cross-Border Legal Compliance",
    content: `Monogamy operates across multiple jurisdictions and is designed with compliance at its core:\n\n• GDPR (European Union / Ireland) — all data processing for Irish members complies with the EU General Data Protection Regulation.\n• POPIA (South Africa) — our data handling practices comply with the Protection of Personal Information Act.\n• NDPR (Nigeria) — we adhere to Nigeria's Data Protection Regulation for Nigerian member data.\n• Kenya Data Protection Act 2019 — Kenyan member data is processed in accordance with the DPA 2019.\n\nCross-border matters (e.g., a South African client needing advice on a Kenyan contract) are handled by attorneys licensed in both jurisdictions or through formal referral arrangements within our network.`,
  },
  {
    title: "Practice Area Explainers",
    content: `Monogamy covers a comprehensive range of practice areas:\n\n• Family Law — divorce, custody, adoption, maintenance, and domestic relations.\n• Business Law — company formation, commercial contracts, shareholder agreements, M&A advisory.\n• Criminal Law — bail applications, defence representation, plea negotiations, post-conviction relief.\n• Estate Planning — wills, trusts, probate, estate administration across multiple jurisdictions.\n• Employment Law — unfair dismissal, retrenchment, CCMA representation, employment contracts.\n• Intellectual Property — trademark registration, copyright, patent advisory, IP licensing.\n\nEach practice area has a dedicated pool of specialist attorneys, ensuring clients are matched with genuine subject-matter experts rather than generalists.`,
  },
  {
    title: "AI & LegalTech Innovation",
    content: `The legal industry is undergoing rapid transformation driven by artificial intelligence:\n\n• Harvey.ai — a generative AI platform purpose-built for law firms, used for legal research, contract drafting, and due diligence. Harvey is trained on legal corpora and partnered with major global law firms.\n• Lexis+ AI — LexisNexis's AI-powered research assistant, combining their vast legal database with large language model capabilities for case law analysis.\n• Contract Review Automation — AI tools can review standard commercial contracts in minutes, flagging non-standard clauses and deviations from market norms.\n\nMonogamy's approach: we augment — not replace — our attorney network with AI tools for document summarisation, matter intake analysis, and response drafting, while ensuring all substantive legal advice is provided by qualified, licensed attorneys. This hybrid model delivers speed and cost-efficiency without sacrificing legal quality or accountability.`,
  },
];

// ── Market Tabs ────────────────────────────────────────────────────────────────
const marketContent = {
  us: {
    title: "California, USA",
    frameworks: ["California State Bar", "California Business and Professions Code", "CCPA (California Consumer Privacy Act)", "California Rules of Professional Conduct"],
    overview: "California is home to over 190,000 active attorneys — the largest state bar in the United States. The California legal market is highly competitive, driven by tech industry demand, employment law complexity, and a sophisticated SME ecosystem. Post-conviction relief (Senate Bill 731, AB 1076) has created significant new demand for record expungement and sealing services.",
  },
  za: {
    title: "South Africa",
    frameworks: ["Legal Practice Act 28 of 2014", "POPIA (Protection of Personal Information Act)", "Companies Act 71 of 2008", "Consumer Protection Act"],
    overview: "South Africa's legal sector is regulated by the Legal Practice Council (LPC). The market includes approximately 25,000 admitted attorneys and advocates. Key growth areas include BEE compliance, property law, employment disputes, and constitutional litigation. Monogamy's platform addresses the access-to-justice gap facing the country's large informal and SME economy.",
  },
  ng: {
    title: "Nigeria",
    frameworks: ["Legal Practitioners Act", "NDPR (Nigeria Data Protection Regulation)", "Companies and Allied Matters Act (CAMA) 2020", "Nigerian Bar Association Rules"],
    overview: "Nigeria has Africa's largest bar — over 100,000 registered legal practitioners under the Nigerian Bar Association (NBA). The market is driven by commercial law, oil & gas advisory, and a rapidly growing fintech sector requiring regulatory compliance support. Monogamy's subscription model is well-positioned to serve Lagos-based SMEs and startups that need regular legal support without the overhead of in-house counsel.",
  },
};

const KnowledgeCenter = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO {...PAGE_SEO.knowledgeCenter} />
      <Header />

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, hsl(43 96% 56%) 0%, transparent 60%), radial-gradient(circle at 80% 20%, hsl(222 47% 50%) 0%, transparent 50%)",
          }}
        />
        <Section>
          <div className="w-full max-w-[80rem] mx-auto relative z-10 text-center">
            <AppearOnScroll delay={0}>
              <p className="text-[1.4rem] font-semibold uppercase tracking-[0.2em] text-secondary mb-4">
                Resources & Insights
              </p>
            </AppearOnScroll>
            <AppearOnScroll delay={50}>
              <h1 className="text-[3.6rem] md:text-[5rem] lg:text-[6.4rem] font-bold tracking-[-0.02em] leading-[1.1] mb-6">
                Knowledge Center
              </h1>
            </AppearOnScroll>
            <AppearOnScroll delay={100}>
              <p className="text-[1.8rem] md:text-[2.2rem] text-primary-foreground/80 max-w-[65rem] mx-auto leading-[1.6]">
                Your hub for LegalTech insights, platform updates, market intelligence, and in-depth explainers on everything Monogamy.
              </p>
            </AppearOnScroll>
          </div>
        </Section>
      </section>

      {/* ── Platform Overview ─────────────────────────────────────────────────── */}
      <Section>
        <div className="w-full max-w-[90rem] mx-auto">
          <AppearOnScroll delay={0}>
            <div className="text-center mb-14">
              <p className="text-[1.4rem] font-semibold uppercase tracking-[0.2em] text-primary mb-4">Platform Overview</p>
              <h2 className="text-[2.8rem] md:text-[3.6rem] font-bold tracking-[-0.02em] mb-6">What is Monogamy?</h2>
            </div>
          </AppearOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Scale, title: "On-Demand Legal Access", description: "Monogamy is a premium legal subscription platform that connects individuals and businesses with vetted attorneys across every practice area — for a flat monthly fee. No hourly billing, no retainer surprises." },
              { icon: Users, title: "Vetted Attorney Network", description: "Every attorney in our network passes a rigorous multi-stage vetting process: licence verification, background checks, peer reviews, and ongoing performance monitoring." },
              { icon: Globe, title: "Multi-Jurisdiction Coverage", description: "Currently operating in South Africa, Nigeria, and Kenya — with Ireland, Ghana, and Kenya expansion launching May 2026. Cross-border legal access for Professional and Enterprise subscribers." },
            ].map(({ icon: Icon, title, description }, i) => (
              <AppearOnScroll key={title} delay={i * 75}>
                <div className="bg-muted border border-border rounded-2xl p-8 h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-[2rem] font-semibold mb-3">{title}</h3>
                  <p className="text-[1.5rem] text-muted-foreground leading-[1.8]">{description}</p>
                </div>
              </AppearOnScroll>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Product Roadmap ───────────────────────────────────────────────────── */}
      <section className="bg-muted">
        <Section>
          <div className="w-full max-w-[90rem] mx-auto">
            <AppearOnScroll delay={0}>
              <div className="text-center mb-14">
                <p className="text-[1.4rem] font-semibold uppercase tracking-[0.2em] text-primary mb-4">Product Roadmap</p>
                <h2 className="text-[2.8rem] md:text-[3.6rem] font-bold tracking-[-0.02em] mb-4">What's Coming Next</h2>
                <p className="text-[1.7rem] text-muted-foreground max-w-[60rem] mx-auto leading-[1.8]">Our vision for the next 18 months — from beta launch to pan-African expansion.</p>
              </div>
            </AppearOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {roadmap.map(({ quarter, title, description }, i) => (
                <AppearOnScroll key={quarter} delay={i * 75}>
                  <div className="bg-background border border-border rounded-2xl p-8 h-full">
                    <span className="inline-block bg-primary/10 text-primary text-[1.3rem] font-semibold uppercase tracking-[0.1em] px-3 py-1 rounded-full mb-4">{quarter}</span>
                    <h3 className="text-[1.8rem] font-semibold mb-3">{title}</h3>
                    <p className="text-[1.5rem] text-muted-foreground leading-[1.8]">{description}</p>
                  </div>
                </AppearOnScroll>
              ))}
            </div>
          </div>
        </Section>
      </section>

      {/* ── Resources ─────────────────────────────────────────────────────────── */}
      <Section>
        <div className="w-full max-w-[90rem] mx-auto">
          <AppearOnScroll delay={0}>
            <div className="text-center mb-14">
              <p className="text-[1.4rem] font-semibold uppercase tracking-[0.2em] text-primary mb-4">Resources</p>
              <h2 className="text-[2.8rem] md:text-[3.6rem] font-bold tracking-[-0.02em]">Tools & Materials</h2>
            </div>
          </AppearOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {resources.map(({ icon: Icon, title, description, badge }, i) => (
              <AppearOnScroll key={title} delay={i * 75}>
                <div className="bg-muted border border-border rounded-2xl p-8 h-full flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-[1.8rem] font-semibold">{title}</h3>
                      {badge && (
                        <span className="inline-block bg-secondary text-secondary-foreground text-[1.1rem] font-semibold px-3 py-1 rounded-full">{badge}</span>
                      )}
                    </div>
                  </div>
                  <p className="text-[1.5rem] text-muted-foreground leading-[1.8]">{description}</p>
                </div>
              </AppearOnScroll>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Live Stats ────────────────────────────────────────────────────────── */}
      <section className="bg-primary text-primary-foreground">
        <Section>
          <div className="w-full max-w-[90rem] mx-auto">
            <AppearOnScroll delay={0}>
              <div className="text-center mb-12">
                <p className="text-[1.4rem] font-semibold uppercase tracking-[0.2em] text-secondary mb-4">Industry Stats</p>
                <h2 className="text-[2.8rem] md:text-[3.6rem] font-bold tracking-[-0.02em]">The Market Opportunity</h2>
              </div>
            </AppearOnScroll>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {stats.map(({ value, label }, i) => (
                <AppearOnScroll key={label} delay={i * 60}>
                  <div className="text-center p-6 bg-white/10 border border-white/20 rounded-2xl">
                    <div className="text-[2.8rem] md:text-[3.4rem] font-bold text-secondary mb-2">{value}</div>
                    <div className="text-[1.3rem] text-primary-foreground/70 leading-[1.5]">{label}</div>
                  </div>
                </AppearOnScroll>
              ))}
            </div>
          </div>
        </Section>
      </section>

      {/* ── Cornerstone Content ───────────────────────────────────────────────── */}
      <Section>
        <div className="w-full max-w-[80rem] mx-auto">
          <AppearOnScroll delay={0}>
            <div className="text-center mb-12">
              <p className="text-[1.4rem] font-semibold uppercase tracking-[0.2em] text-primary mb-4">Deep Dives</p>
              <h2 className="text-[2.8rem] md:text-[3.6rem] font-bold tracking-[-0.02em] mb-4">Cornerstone Content</h2>
              <p className="text-[1.7rem] text-muted-foreground max-w-[60rem] mx-auto leading-[1.8]">
                Authoritative explainers on how Monogamy works, how we vet attorneys, and how LegalTech is reshaping the industry.
              </p>
            </div>
          </AppearOnScroll>
          <AppearOnScroll delay={50}>
            <Accordion type="single" collapsible className="w-full">
              {cornerstoneContent.map(({ title, content }, i) => (
                <AccordionItem key={i} value={`corner-${i}`} className="border-b border-border">
                  <AccordionTrigger className="text-[1.8rem] md:text-[2rem] font-medium text-left hover:no-underline py-6 w-full">
                    {title}
                  </AccordionTrigger>
                  <AccordionContent className="text-[1.6rem] leading-[1.8] text-muted-foreground pb-6 w-full whitespace-pre-line">
                    {content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AppearOnScroll>
        </div>
      </Section>

      {/* ── Market-Specific Content ───────────────────────────────────────────── */}
      <section className="bg-muted">
        <Section>
          <div className="w-full max-w-[90rem] mx-auto">
            <AppearOnScroll delay={0}>
              <div className="text-center mb-12">
                <p className="text-[1.4rem] font-semibold uppercase tracking-[0.2em] text-primary mb-4">Market Insights</p>
                <h2 className="text-[2.8rem] md:text-[3.6rem] font-bold tracking-[-0.02em] mb-4">Market-Specific Content</h2>
                <p className="text-[1.7rem] text-muted-foreground max-w-[60rem] mx-auto leading-[1.8]">
                  Explore the legal landscape in our key markets.
                </p>
              </div>
            </AppearOnScroll>
            <AppearOnScroll delay={50}>
              <Tabs defaultValue="us" className="w-full">
                <TabsList className="flex flex-wrap gap-2 mb-10 bg-transparent">
                  <TabsTrigger value="us" className="text-[1.5rem] px-6 py-3 rounded-lg border border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">🇺🇸 California, USA</TabsTrigger>
                  <TabsTrigger value="za" className="text-[1.5rem] px-6 py-3 rounded-lg border border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">🇿🇦 South Africa</TabsTrigger>
                  <TabsTrigger value="ng" className="text-[1.5rem] px-6 py-3 rounded-lg border border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">🇳🇬 Nigeria</TabsTrigger>
                </TabsList>
                {(["us", "za", "ng"] as const).map((key) => {
                  const market = marketContent[key];
                  return (
                    <TabsContent key={key} value={key}>
                      <div className="bg-background border border-border rounded-2xl p-8 md:p-12">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Briefcase className="w-6 h-6 text-primary" />
                          </div>
                          <h3 className="text-[2.4rem] font-semibold">{market.title}</h3>
                        </div>
                        <p className="text-[1.6rem] text-muted-foreground leading-[1.8] mb-8">{market.overview}</p>
                        <div>
                          <h4 className="text-[1.6rem] font-semibold mb-4 flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-primary" />
                            Key Legal Frameworks
                          </h4>
                          <ul className="flex flex-col gap-3">
                            {market.frameworks.map((fw) => (
                              <li key={fw} className="flex items-center gap-3 text-[1.5rem] text-muted-foreground">
                                <TrendingUp className="w-4 h-4 text-primary flex-shrink-0" />
                                {fw}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </TabsContent>
                  );
                })}
              </Tabs>
            </AppearOnScroll>
          </div>
        </Section>
      </section>

      {/* ── Optional Add-Ons Preview ──────────────────────────────────────────── */}
      <Section>
        <div className="w-full max-w-[90rem] mx-auto">
          <AppearOnScroll delay={0}>
            <div className="text-center mb-12">
              <p className="text-[1.4rem] font-semibold uppercase tracking-[0.2em] text-primary mb-4">Coming Soon</p>
              <h2 className="text-[2.8rem] md:text-[3.6rem] font-bold tracking-[-0.02em] mb-4">Platform Enhancements</h2>
              <p className="text-[1.7rem] text-muted-foreground max-w-[60rem] mx-auto leading-[1.8]">
                Exciting features in development for subscribed members.
              </p>
            </div>
          </AppearOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Cpu, title: "AI-Powered Document Drafting", description: "Generate first-draft contracts, letters of demand, and legal notices using AI — reviewed and approved by your matched attorney." },
              { icon: BarChart3, title: "Matter Tracking Dashboard", description: "Real-time visibility into all your active legal matters: status updates, document uploads, billing, and attorney communications in one place." },
              { icon: Globe, title: "Multi-Currency Billing", description: "Pay in USD, ZAR, NGN, KES, GHS, or EUR. Automatic currency conversion with transparent exchange rates." },
            ].map(({ icon: Icon, title, description }, i) => (
              <AppearOnScroll key={title} delay={i * 75}>
                <div className="bg-muted border border-border rounded-2xl p-8 relative overflow-hidden">
                  <div className="absolute top-4 right-4">
                    <Lock className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-[1.8rem] font-semibold mb-3">{title}</h3>
                  <p className="text-[1.5rem] text-muted-foreground leading-[1.8]">{description}</p>
                  <span className="inline-block mt-4 bg-secondary/20 text-secondary-foreground text-[1.2rem] font-semibold px-3 py-1 rounded-full border border-secondary/30">Coming Soon</span>
                </div>
              </AppearOnScroll>
            ))}
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
};

export default KnowledgeCenter;
