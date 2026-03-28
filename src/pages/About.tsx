import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import AppearOnScroll from "@/components/AppearOnScroll";
import { Shield, Scale, Users, Zap, MapPin, Globe, CheckCircle, ArrowRight, Sparkles, DollarSign } from "lucide-react";

const techPartners = [
  {
    name: "Supabase",
    logo: "https://supabase.com/dashboard/img/supabase-logo.svg",
    fallback: "SB",
    description: "Database & authentication infrastructure",
    color: "from-emerald-500/10 to-emerald-600/5",
    border: "border-emerald-500/20",
  },
  {
    name: "Shopify",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg",
    fallback: "SH",
    description: "Payments & subscription billing",
    color: "from-green-500/10 to-green-600/5",
    border: "border-green-500/20",
  },
  {
    name: "Firecrawl",
    logo: null,
    fallback: "FC",
    description: "Web data extraction & enrichment",
    color: "from-orange-500/10 to-orange-600/5",
    border: "border-orange-500/20",
  },
  {
    name: "Paystack",
    logo: null,
    fallback: "PS",
    description: "Africa-first payment gateway",
    color: "from-blue-500/10 to-blue-600/5",
    border: "border-blue-500/20",
  },
  {
    name: "Flutterwave",
    logo: null,
    fallback: "FW",
    description: "Pan-African payment infrastructure",
    color: "from-yellow-500/10 to-yellow-600/5",
    border: "border-yellow-500/20",
  },
  {
    name: "Stripe",
    logo: null,
    fallback: "ST",
    description: "Global payment processing",
    color: "from-violet-500/10 to-violet-600/5",
    border: "border-violet-500/20",
  },
];

const locations = [
  {
    country: "South Africa",
    flag: "🇿🇦",
    city: "Johannesburg",
    status: "Active",
    description: "Our founding market. Serving clients across Johannesburg, Cape Town, Durban, and beyond.",
  },
  {
    country: "Nigeria",
    flag: "🇳🇬",
    city: "Lagos",
    status: "Active",
    description: "Supporting Africa's largest economy with access to top-tier legal talent in Lagos, Abuja and more.",
  },
  {
    country: "Kenya",
    flag: "🇰🇪",
    city: "Nairobi",
    status: "Active",
    description: "Connecting Nairobi's vibrant startup ecosystem and businesses with premium legal services.",
  },
  {
    country: "Ghana",
    flag: "🇬🇭",
    city: "Accra",
    status: "Coming Soon",
    description: "Expanding to West Africa's gateway economy in the near future.",
  },
  {
    country: "Rwanda",
    flag: "🇷🇼",
    city: "Kigali",
    status: "Coming Soon",
    description: "Bringing affordable legal access to East Africa's innovation hub.",
  },
  {
    country: "Tanzania",
    flag: "🇹🇿",
    city: "Dar es Salaam",
    status: "Coming Soon",
    description: "Planned entry to support Tanzania's growing business landscape.",
  },
];

const features = [
  {
    icon: DollarSign,
    title: "Flat Monthly Membership",
    description: "One predictable monthly fee starting from $19.99 — no surprise bills, no hourly rates, no hidden charges.",
  },
  {
    icon: Users,
    title: "Top-Rated Lawyer Network",
    description: "Access hundreds of thoroughly vetted lawyers across every practice area — from corporate law to family matters.",
  },
  {
    icon: Zap,
    title: "Advanced Client Matching",
    description: "Our smart matching engine connects you to the best-fit lawyer for your specific legal need within hours.",
  },
  {
    icon: Shield,
    title: "Secure Communication",
    description: "All client-lawyer interactions happen in our end-to-end encrypted, compliance-ready platform.",
  },
];

const futureProspects = [
  { title: "AI Legal Assistant", desc: "AI-powered chatbots and voice assistants to handle routine legal queries, intake, and document drafting 24/7." },
  { title: "Workflow Automation", desc: "Automated tools for billing, invoicing, document management, and scheduling — designed for busy legal professionals." },
  { title: "Pan-African Expansion", desc: "Phased rollout to Ghana, Rwanda, Tanzania, and eventually all 54 African nations." },
  { title: "Mobile Apps", desc: "Native iOS and Android apps for on-the-go legal access and lawyer case management." },
  { title: "Legal Risk Monitoring", desc: "Proactive alerts for compliance deadlines, regulatory changes, and legal risks relevant to your business." },
  { title: "Team & Enterprise Accounts", desc: "Multi-seat accounts for in-house legal teams, larger organisations, and law firm branches." },
];

const TechPartnerCard = ({ partner }: { partner: typeof techPartners[0] }) => {
  const [imgError, setImgError] = useState(false);
  return (
    <div className={`p-6 rounded-2xl bg-gradient-to-br ${partner.color} border ${partner.border} flex items-start gap-5`}>
      <div className="w-14 h-14 rounded-xl bg-card border border-border flex items-center justify-center flex-shrink-0 text-[1.4rem] font-bold text-primary shadow-sm">
        {partner.logo && !imgError ? (
          <img
            src={partner.logo}
            alt={`${partner.name} logo`}
            className="w-8 h-8 object-contain"
            onError={() => setImgError(true)}
          />
        ) : (
          <span>{partner.fallback}</span>
        )}
      </div>
      <div>
        <h3 className="text-[1.9rem] font-semibold mb-1">{partner.name}</h3>
        <p className="text-[1.5rem] leading-[1.7] text-muted-foreground">{partner.description}</p>
      </div>
    </div>
  );
};

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <div className="box-content max-w-[64rem] px-4 md:px-[calc(18vw-10rem)] mx-auto relative mt-[4.5rem] xl:mt-[6rem]">
        <AppearOnScroll delay={0}>
          <p className="text-[1.4rem] font-semibold uppercase tracking-[0.2em] text-primary mb-4 text-center">About Us</p>
          <h1 className="text-[3.4rem] md:text-[4.2rem] lg:text-[6rem] font-semibold tracking-[-0.01em] leading-[1.2] md:leading-[1] text-center">
            About Monogamy
          </h1>
        </AppearOnScroll>
      </div>

      <AppearOnScroll delay={0}>
        <figure className="relative flex overflow-hidden w-full mt-[3rem] md:mt-[4.5rem] lg:mt-[6rem] mb-[6rem] md:mb-[9rem] lg:mb-[12rem]">
          <picture className="flex w-full justify-center">
            <img
              src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=2000&q=80"
              alt="Legal professionals collaborating across Africa"
              className="top-0 left-0 max-w-full w-full aspect-[2/1] xl:aspect-[16/5] object-cover"
            />
          </picture>
        </figure>
      </AppearOnScroll>

      {/* Company Background / Mission */}
      <div className="box-content max-w-[64rem] px-4 md:px-[calc(18vw-10rem)] mx-auto relative mb-[6rem] md:mb-[9rem] lg:mb-[12rem]">
        <AppearOnScroll delay={0}>
          <h2 className="text-[2.7rem] md:text-[3.6rem] font-semibold mb-[3rem]">Our Mission</h2>
        </AppearOnScroll>
        <AppearOnScroll delay={150}>
          <p className="text-[1.8rem] leading-[1.8] text-foreground mb-6">
            Monogamy is a premium legal services platform built to radically reduce the cost of accessing high-quality legal counsel across Africa. We connect individuals, startups, SMEs, and established businesses with a curated network of top-rated lawyers and law firms — at a fraction of traditional costs.
          </p>
        </AppearOnScroll>
        <AppearOnScroll delay={300}>
          <p className="text-[1.8rem] leading-[1.8] text-foreground mb-6">
            For legal professionals and law firms, Monogamy provides a lucrative, predictable pipeline of pre-qualified clients — eliminating cold outreach and the feast-or-famine cycles that plague independent practice. Lawyers on our platform get the digital infrastructure, tools, and visibility they need to grow a sustainable practice.
          </p>
        </AppearOnScroll>
        <AppearOnScroll delay={450}>
          <p className="text-[1.8rem] leading-[1.8] text-foreground">
            Monogamy currently operates in <strong>South Africa</strong>, <strong>Nigeria</strong>, and <strong>Kenya</strong> — three of Africa's most dynamic legal markets — with a phased expansion plan covering the continent over the coming years.
          </p>
        </AppearOnScroll>
      </div>

      {/* Vision Quote */}
      <div className="box-content max-w-[64rem] px-4 md:px-[calc(18vw-10rem)] mx-auto relative mb-[6rem] md:mb-[9rem] lg:mb-[12rem]">
        <AppearOnScroll delay={0}>
          <figure className="text-center mt-[1.25rem] mb-[0.9375rem] md:mt-[1.875rem] md:mb-[1.875rem] lg:mt-[3.75rem] lg:mb-[3.75rem] md:mx-[calc(-18vw+6.875rem)] xl:mx-[-12.5rem]">
            <blockquote className="font-sans text-[calc(5vw+0.6rem)] lg:text-[5.4rem] font-extrabold leading-[1.2]">
              "To democratize access to justice across Africa through technology and community."
            </blockquote>
            <figcaption className="text-[calc(2.5vw+0.8rem)] lg:text-[3rem] font-semibold leading-[1.6] md:leading-[1.4] before:content-['―_']">
              Our Vision
            </figcaption>
          </figure>
        </AppearOnScroll>
      </div>

      {/* Platform Features */}
      <Section>
        <div className="max-w-[110rem] mx-auto w-full">
          <AppearOnScroll delay={0}>
            <div className="text-center mb-12">
              <p className="text-[1.4rem] font-semibold uppercase tracking-[0.2em] text-primary mb-4">Platform Features</p>
              <h2 className="text-[2.7rem] md:text-[3.6rem] font-semibold">Built for Africa's legal future</h2>
            </div>
          </AppearOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <AppearOnScroll key={i} delay={i * 100}>
                <div className="p-8 rounded-2xl bg-primary/5 border border-primary/10 flex gap-6">
                  <f.icon className="w-[48px] h-[48px] text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-[2rem] font-semibold mb-2">{f.title}</h3>
                    <p className="text-[1.6rem] leading-[1.8] text-muted-foreground">{f.description}</p>
                  </div>
                </div>
              </AppearOnScroll>
            ))}
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section>
        <div className="max-w-[110rem] mx-auto w-full">
          <AppearOnScroll delay={0}>
            <h2 className="text-[2.7rem] md:text-[3.6rem] font-semibold mb-[4rem]">Our Values</h2>
          </AppearOnScroll>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <AppearOnScroll delay={0}>
              <div className="lg:col-span-1 p-8 rounded-2xl bg-primary/5 border border-primary/10">
                <Shield className="w-[48px] h-[48px] text-primary mb-4" />
                <h3 className="text-[2.2rem] font-semibold mb-3">Trust & Integrity</h3>
                <p className="text-[1.6rem] leading-[1.8] text-muted-foreground">
                  Every attorney in our network is thoroughly vetted. We uphold the highest ethical standards in every interaction.
                </p>
              </div>
            </AppearOnScroll>
            <AppearOnScroll delay={150}>
              <div className="lg:col-span-2 p-8 rounded-2xl bg-primary/5 border border-primary/10">
                <Scale className="w-[48px] h-[48px] text-primary mb-4" />
                <h3 className="text-[2.2rem] font-semibold mb-3">Equal Access</h3>
                <p className="text-[1.6rem] leading-[1.8] text-muted-foreground">
                  Justice shouldn't be a luxury. Our flat-fee subscription model makes premium legal counsel affordable and accessible to everyone across Africa.
                </p>
              </div>
            </AppearOnScroll>
            <AppearOnScroll delay={300}>
              <div className="lg:col-span-2 p-8 rounded-2xl bg-primary/5 border border-primary/10">
                <Users className="w-[48px] h-[48px] text-primary mb-4" />
                <h3 className="text-[2.2rem] font-semibold mb-3">Community</h3>
                <p className="text-[1.6rem] leading-[1.8] text-muted-foreground">
                  We foster meaningful attorney-client relationships built on mutual respect, shared goals, and long-term partnership.
                </p>
              </div>
            </AppearOnScroll>
            <AppearOnScroll delay={450}>
              <div className="lg:col-span-1 p-8 rounded-2xl bg-primary/5 border border-primary/10">
                <Zap className="w-[48px] h-[48px] text-primary mb-4" />
                <h3 className="text-[2.2rem] font-semibold mb-3">Innovation</h3>
                <p className="text-[1.6rem] leading-[1.8] text-muted-foreground">
                  We leverage AI and modern technology to streamline legal workflows and create seamless experiences for clients and lawyers alike.
                </p>
              </div>
            </AppearOnScroll>
          </div>
        </div>
      </Section>

      {/* Locations */}
      <section className="bg-muted">
        <Section>
          <div className="max-w-[110rem] mx-auto w-full">
            <AppearOnScroll delay={0}>
              <div className="text-center mb-12">
                <p className="text-[1.4rem] font-semibold uppercase tracking-[0.2em] text-primary mb-4">Where We Operate</p>
                <h2 className="text-[2.7rem] md:text-[3.6rem] font-semibold mb-4">
                  Currently serving 3 African markets
                </h2>
                <p className="text-[1.7rem] text-muted-foreground max-w-[60rem] mx-auto">
                  Monogamy is live in South Africa, Nigeria, and Kenya — with a bold expansion plan to serve all of Africa.
                </p>
              </div>
            </AppearOnScroll>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {locations.map((loc, i) => (
                <AppearOnScroll key={i} delay={i * 80}>
                  <div className={`p-6 rounded-2xl bg-card border transition-all ${
                    loc.status === "Active"
                      ? "border-primary/30 shadow-md"
                      : "border-border opacity-70"
                  }`}>
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-[3.5rem]">{loc.flag}</span>
                      <span className={`text-[1.2rem] font-semibold px-3 py-1 rounded-full ${
                        loc.status === "Active"
                          ? "bg-primary/10 text-primary"
                          : "bg-muted-foreground/10 text-muted-foreground"
                      }`}>
                        {loc.status}
                      </span>
                    </div>
                    <h3 className="text-[2rem] font-semibold mb-1">{loc.country}</h3>
                    <div className="flex items-center gap-1 text-[1.4rem] text-muted-foreground mb-3">
                      <MapPin className="w-4 h-4" />
                      <span>{loc.city}</span>
                    </div>
                    <p className="text-[1.5rem] leading-[1.7] text-muted-foreground">{loc.description}</p>
                  </div>
                </AppearOnScroll>
              ))}
            </div>
            <AppearOnScroll delay={500}>
              <div className="mt-10 text-center flex items-center justify-center gap-3 text-[1.6rem] text-muted-foreground">
                <Globe className="w-5 h-5 text-primary" />
                <span>Pan-African expansion underway — more markets coming soon.</span>
              </div>
            </AppearOnScroll>
          </div>
        </Section>
      </section>

      {/* Technology Partners */}
      <Section>
        <div className="max-w-[110rem] mx-auto w-full">
          <AppearOnScroll delay={0}>
            <div className="text-center mb-12">
              <p className="text-[1.4rem] font-semibold uppercase tracking-[0.2em] text-primary mb-4">Technology Partners</p>
              <h2 className="text-[2.7rem] md:text-[3.6rem] font-semibold mb-4">
                Powered by world-class infrastructure
              </h2>
              <p className="text-[1.7rem] text-muted-foreground max-w-[60rem] mx-auto">
                Monogamy integrates leading technology platforms to deliver a secure, scalable, and seamless experience for clients and legal professionals.
              </p>
            </div>
          </AppearOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {techPartners.map((partner, i) => (
              <AppearOnScroll key={i} delay={i * 80}>
                <TechPartnerCard partner={partner} />
              </AppearOnScroll>
            ))}
          </div>
        </div>
      </Section>

      {/* Future Prospects */}
      <section className="bg-muted">
        <Section>
          <div className="max-w-[110rem] mx-auto w-full">
            <AppearOnScroll delay={0}>
              <div className="text-center mb-12">
                <p className="text-[1.4rem] font-semibold uppercase tracking-[0.2em] text-primary mb-4">What's Coming</p>
                <h2 className="text-[2.7rem] md:text-[3.6rem] font-semibold mb-4">
                  The future of Monogamy
                </h2>
                <p className="text-[1.7rem] text-muted-foreground max-w-[60rem] mx-auto">
                  We're building a comprehensive legal operating system for Africa. Here's a glimpse of what's on the roadmap.
                </p>
              </div>
            </AppearOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {futureProspects.map((item, i) => (
                <AppearOnScroll key={i} delay={i * 80}>
                  <div className="p-6 rounded-2xl bg-card border border-border">
                    <div className="flex items-center gap-3 mb-3">
                      <Sparkles className="w-5 h-5 text-primary" />
                      <h3 className="text-[1.8rem] font-semibold">{item.title}</h3>
                    </div>
                    <p className="text-[1.5rem] leading-[1.7] text-muted-foreground">{item.desc}</p>
                  </div>
                </AppearOnScroll>
              ))}
            </div>
          </div>
        </Section>
      </section>

      {/* CTA */}
      <Section>
        <div className="max-w-[80rem] mx-auto w-full text-center">
          <AppearOnScroll delay={0}>
            <div>
              <h2 className="text-[2.8rem] md:text-[3.6rem] font-bold mb-6">
                Ready to experience legal services reimagined?
              </h2>
              <p className="text-[1.8rem] text-muted-foreground mb-8 max-w-[55rem] mx-auto">
                Join thousands of clients and legal professionals who are transforming how Africa accesses and delivers legal services.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  to="/pricing"
                  className="inline-flex items-center gap-2 px-10 py-4 text-[1.7rem] font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                >
                  Start Your Membership <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/partners"
                  className="inline-flex items-center gap-2 px-10 py-4 text-[1.7rem] font-semibold border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  Join as a Lawyer
                </Link>
              </div>
              <p className="text-[1.3rem] text-muted-foreground mt-4">
                Operating in South Africa · Nigeria · Kenya
              </p>
            </div>
          </AppearOnScroll>
        </div>
      </Section>

      <Footer />
    </div>
  );
};

export default About;
