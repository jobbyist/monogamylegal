import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import AppearOnScroll from "@/components/AppearOnScroll";
import {
  MessageSquare,
  Mic,
  Zap,
  FileText,
  Mail,
  DollarSign,
  FolderOpen,
  Calendar,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Bot,
  Shield,
} from "lucide-react";

const aiTools = [
  {
    icon: Bot,
    title: "AI Support Chatbot",
    description:
      "A 24/7 intelligent chatbot embedded on your client portal or website. Handles FAQs, intake forms, appointment booking, and basic legal queries — without you lifting a finger.",
    badge: "Pro & Elite",
  },
  {
    icon: Mic,
    title: "AI Voice Assistant",
    description:
      "Let clients call a smart voice agent that can qualify them, gather case details, and schedule consultations — all before you even pick up the phone.",
    badge: "Pro & Elite",
  },
  {
    icon: Zap,
    title: "Workflow Automation Engine",
    description:
      "Automate repetitive daily tasks across your practice: client follow-ups, billing reminders, deadline tracking, and internal notifications — all handled automatically.",
    badge: "Pro & Elite",
  },
  {
    icon: Mail,
    title: "Automated Email Management",
    description:
      "AI-powered inbox management that drafts responses, categorises client emails, escalates urgent matters, and keeps your communication history organised.",
    badge: "Pro & Elite",
  },
  {
    icon: DollarSign,
    title: "Client Billing & Invoicing",
    description:
      "Automatically generate and send invoices, track payment status, send reminders, and reconcile your billing records — all within the Monogamy platform.",
    badge: "Pro & Elite",
  },
  {
    icon: FileText,
    title: "Document Management",
    description:
      "AI-assisted document organisation, version control, and retrieval. Tag, search, and share case files securely from a single centralised vault.",
    badge: "Pro & Elite",
  },
  {
    icon: FolderOpen,
    title: "Case Load Management",
    description:
      "Dashboards and automation tools to track open matters, assign tasks to team members, set deadlines, and get alerts before things slip through the cracks.",
    badge: "Pro & Elite",
  },
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description:
      "Let clients self-book consultations based on your availability. AI syncs your calendar, prevents double-bookings, and sends automated reminders to both parties.",
    badge: "Pro & Elite",
  },
];

const benefits = [
  "Save 10+ hours per week on admin and repetitive tasks",
  "Never miss a follow-up, deadline, or billing cycle",
  "Deliver a premium, always-on client experience 24/7",
  "Scale your caseload without scaling your overhead",
  "Integrate seamlessly with your existing Monogamy profile and CRM",
  "POPIA & GDPR-compliant data handling across all tools",
];

const plans = [
  {
    name: "Pro",
    price: "$99/mo",
    highlight: false,
    features: [
      "AI Support Chatbot (branded for your firm)",
      "AI Voice Assistant (intake & scheduling)",
      "Workflow Automation Engine",
      "Automated Email Management",
      "Client Billing & Invoicing",
      "Document Management (AI-assisted)",
      "Case Load Management Dashboard",
      "Smart Scheduling (client self-booking)",
    ],
  },
  {
    name: "Elite",
    price: "$249/mo",
    highlight: true,
    features: [
      "Everything in Pro, plus:",
      "Unlimited AI interactions (chat & voice)",
      "Custom AI training on your firm's documents",
      "Advanced analytics & AI insights dashboard",
      "White-glove AI onboarding & setup",
      "Dedicated AI success manager",
      "API access for custom integrations",
      "Multi-user team automation (up to 10 users)",
    ],
  },
];

const AIServices = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-primary opacity-[0.03]" />
        <div className="box-content max-w-[138rem] px-6 md:px-[calc(18vw-10rem)] mx-auto py-[6rem] md:py-[10rem] lg:py-[12rem]">
          <div className="max-w-[85rem]">
            <AppearOnScroll delay={0}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[1.3rem] font-semibold mb-6">
                <Sparkles className="w-4 h-4" />
                New Feature — Available Now
              </div>
            </AppearOnScroll>
            <AppearOnScroll delay={100}>
              <h1 className="text-[3.6rem] md:text-[5rem] lg:text-[7rem] font-bold tracking-[-0.02em] leading-[1.1] mb-8">
                AI-Powered Legal Toolkit{" "}
                <span className="text-primary">for Lawyers & Law Firms</span>
              </h1>
            </AppearOnScroll>
            <AppearOnScroll delay={200}>
              <p className="text-[1.8rem] md:text-[2.2rem] leading-[1.7] text-muted-foreground mb-10 max-w-[65rem]">
                Supercharge your practice with AI chatbots, voice assistants, and workflow automation tools — designed specifically for the modern African law firm. Available exclusively on{" "}
                <strong className="text-foreground">Pro and Elite plans</strong>.
              </p>
            </AppearOnScroll>
            <AppearOnScroll delay={300}>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/partners"
                  className="inline-flex items-center gap-2 px-10 py-4 text-[1.7rem] font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                >
                  Get Started <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/pricing"
                  className="inline-block px-10 py-4 text-[1.7rem] font-semibold border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  View Pricing
                </Link>
              </div>
              <p className="text-[1.3rem] text-muted-foreground mt-4">
                Available in South Africa · Nigeria · Kenya
              </p>
            </AppearOnScroll>
          </div>
        </div>
      </section>

      {/* AI Tools Grid */}
      <Section>
        <div className="max-w-[120rem] mx-auto w-full">
          <AppearOnScroll delay={0}>
            <div className="text-center mb-12">
              <p className="text-[1.4rem] font-semibold uppercase tracking-[0.2em] text-primary mb-4">The Toolkit</p>
              <h2 className="text-[2.8rem] md:text-[3.6rem] font-bold mb-4">
                Eight powerful AI tools in one platform
              </h2>
              <p className="text-[1.7rem] text-muted-foreground max-w-[60rem] mx-auto">
                From client intake to invoice management — our AI toolkit covers every corner of your legal practice.
              </p>
            </div>
          </AppearOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiTools.map((tool, i) => (
              <AppearOnScroll key={i} delay={i * 75}>
                <div className="p-6 rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all group h-full flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <tool.icon className="w-10 h-10 text-primary group-hover:scale-110 transition-transform" />
                    <span className="text-[1.1rem] font-semibold px-2 py-1 rounded-md bg-primary/10 text-primary">
                      {tool.badge}
                    </span>
                  </div>
                  <h3 className="text-[1.8rem] font-semibold mb-2">{tool.title}</h3>
                  <p className="text-[1.4rem] text-muted-foreground leading-[1.6] flex-1">{tool.description}</p>
                </div>
              </AppearOnScroll>
            ))}
          </div>
        </div>
      </Section>

      {/* Benefits */}
      <section className="bg-muted">
        <Section>
          <div className="max-w-[110rem] mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <AppearOnScroll delay={0}>
                <div>
                  <p className="text-[1.4rem] font-semibold uppercase tracking-[0.2em] text-primary mb-4">Why It Matters</p>
                  <h2 className="text-[2.8rem] md:text-[3.6rem] font-bold mb-6">
                    Work smarter, not harder
                  </h2>
                  <p className="text-[1.7rem] text-muted-foreground leading-[1.8] mb-8">
                    The average lawyer spends over 48% of their time on non-billable administrative tasks. Monogamy's AI toolkit is designed to reclaim those hours — so you can focus on what you do best: practising law.
                  </p>
                  <ul className="space-y-4">
                    {benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-3 text-[1.6rem]">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-[3px]" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AppearOnScroll>
              <AppearOnScroll delay={200}>
                <div className="relative rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80"
                    alt="AI-powered legal tools"
                    className="w-full aspect-[4/3] object-cover rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent rounded-2xl" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-card/90 backdrop-blur rounded-xl p-4 border border-border">
                      <div className="flex items-center gap-3 mb-2">
                        <Bot className="w-6 h-6 text-primary" />
                        <span className="text-[1.4rem] font-semibold">AI Assistant Active</span>
                      </div>
                      <p className="text-[1.3rem] text-muted-foreground">
                        "I've reviewed 3 new client inquiries, drafted 2 invoices, and scheduled 4 consultations for tomorrow."
                      </p>
                    </div>
                  </div>
                </div>
              </AppearOnScroll>
            </div>
          </div>
        </Section>
      </section>

      {/* Plans */}
      <Section>
        <div className="max-w-[90rem] mx-auto w-full">
          <AppearOnScroll delay={0}>
            <div className="text-center mb-12">
              <p className="text-[1.4rem] font-semibold uppercase tracking-[0.2em] text-primary mb-4">Included In</p>
              <h2 className="text-[2.8rem] md:text-[3.6rem] font-bold mb-4">
                AI tools on Pro & Elite plans
              </h2>
              <p className="text-[1.7rem] text-muted-foreground max-w-[50rem] mx-auto">
                The AI toolkit is included as part of the Pro and Elite lawyer plans on Monogamy. No extra setup fees.
              </p>
            </div>
          </AppearOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[70rem] mx-auto">
            {plans.map((plan, i) => (
              <AppearOnScroll key={i} delay={i * 100}>
                <div
                  className={`relative rounded-2xl p-10 flex flex-col gap-6 h-full ${
                    plan.highlight
                      ? "bg-primary text-primary-foreground border-2 border-primary shadow-2xl"
                      : "bg-card border border-border shadow-lg"
                  }`}
                >
                  {plan.highlight && (
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1 bg-background text-primary text-[1.2rem] font-bold rounded-full border-2 border-primary">
                      Recommended
                    </span>
                  )}
                  <div>
                    <p className={`text-[1.3rem] font-semibold uppercase tracking-[0.15em] mb-2 ${plan.highlight ? "text-primary-foreground/70" : "text-primary"}`}>
                      {plan.name} Plan
                    </p>
                    <p className="text-[4rem] font-bold leading-none">
                      {plan.price}
                    </p>
                  </div>
                  <ul className="space-y-4 flex-1">
                    {plan.features.map((feat, fi) => (
                      <li key={fi} className={`flex items-start gap-3 text-[1.5rem] ${fi === 0 && feat.includes("Everything") ? "font-semibold" : ""}`}>
                        {feat.includes("Everything") ? (
                          <Zap className={`w-5 h-5 flex-shrink-0 mt-[2px] ${plan.highlight ? "text-primary-foreground" : "text-primary"}`} />
                        ) : (
                          <CheckCircle className={`w-5 h-5 flex-shrink-0 mt-[2px] ${plan.highlight ? "text-primary-foreground" : "text-primary"}`} />
                        )}
                        <span className={plan.highlight ? "text-primary-foreground/90" : ""}>{feat}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/partners"
                    className={`w-full py-4 text-[1.6rem] font-semibold rounded-lg text-center transition-all block mt-2 ${
                      plan.highlight
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

      {/* Security Note */}
      <section className="bg-muted">
        <Section>
          <div className="max-w-[80rem] mx-auto w-full text-center">
            <AppearOnScroll delay={0}>
              <div className="flex items-center justify-center gap-3 mb-6">
                <Shield className="w-8 h-8 text-primary" />
                <h2 className="text-[2.4rem] font-bold">Built with privacy and compliance in mind</h2>
              </div>
              <p className="text-[1.7rem] text-muted-foreground max-w-[60rem] mx-auto">
                All AI tools on Monogamy are built to comply with POPIA (South Africa), NDPR (Nigeria), and the Kenya Data Protection Act. Your client data never trains third-party AI models. Everything stays within your encrypted, jurisdiction-compliant workspace.
              </p>
            </AppearOnScroll>
          </div>
        </Section>
      </section>

      {/* CTA */}
      <Section>
        <div className="max-w-[80rem] mx-auto w-full text-center">
          <AppearOnScroll delay={0}>
            <div>
              <h2 className="text-[2.8rem] md:text-[3.6rem] font-bold mb-6">
                Ready to let AI handle the admin?
              </h2>
              <p className="text-[1.8rem] text-muted-foreground mb-8 max-w-[55rem] mx-auto">
                Join the Monogamy Pro or Elite plan and unlock your AI-powered legal practice today.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  to="/partners"
                  className="inline-flex items-center gap-2 px-10 py-4 text-[1.7rem] font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                >
                  Start Receiving Clients <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/pricing"
                  className="inline-block px-10 py-4 text-[1.7rem] font-semibold border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  Compare Plans
                </Link>
              </div>
              <p className="text-[1.3rem] text-muted-foreground mt-4">
                Available in South Africa · Nigeria · Kenya
              </p>
            </div>
          </AppearOnScroll>
        </div>
      </Section>

      <Footer />
    </div>
  );
};

export default AIServices;
