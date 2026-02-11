import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import AppearOnScroll from "@/components/AppearOnScroll";
import PartnerCarousel from "@/components/PartnerCarousel";
import { Shield, Users, Scale, Clock, Star, CheckCircle, Briefcase, Heart, Home, FileText, Gavel, DollarSign } from "lucide-react";

const practiceAreas = [
  { icon: Briefcase, title: "Business Law", desc: "Formation, contracts, IP, and compliance" },
  { icon: Heart, title: "Family Law", desc: "Divorce, custody, adoption, and prenups" },
  { icon: Home, title: "Real Estate", desc: "Transactions, disputes, and landlord-tenant" },
  { icon: FileText, title: "Estate Planning", desc: "Wills, trusts, and probate" },
  { icon: Gavel, title: "Criminal Defense", desc: "Misdemeanors, felonies, and DUI" },
  { icon: DollarSign, title: "Tax Law", desc: "Planning, disputes, and audit defense" },
  { icon: Scale, title: "Employment Law", desc: "Discrimination, wages, and wrongful termination" },
  { icon: Shield, title: "Personal Injury", desc: "Accidents, malpractice, and liability" },
];

const steps = [
  { num: "01", title: "Subscribe", desc: "Join Monogamy for $19.99/month and unlock unlimited access to our legal network." },
  { num: "02", title: "Match", desc: "Tell us about your legal needs and we'll connect you with the right attorney." },
  { num: "03", title: "Consult", desc: "Schedule consultations, share documents, and communicate securely." },
  { num: "04", title: "Resolve", desc: "Work with your attorney to resolve your matter with confidence." },
];

const testimonials = [
  { name: "Sarah M.", role: "Small Business Owner", quote: "Monogamy saved me thousands in legal fees. I got expert contract review within 24 hours.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80" },
  { name: "David R.", role: "Real Estate Investor", quote: "Having an attorney on-demand for my property transactions has been a game-changer.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80" },
  { name: "Maria L.", role: "Freelance Designer", quote: "I finally feel protected with proper contracts. The platform is incredibly easy to use.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80" },
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-primary opacity-[0.03]" />
        <div className="box-content max-w-[138rem] px-6 md:px-[calc(18vw-10rem)] mx-auto py-[6rem] md:py-[10rem] lg:py-[14rem]">
          <div className="max-w-[80rem]">
            <AppearOnScroll delay={0}>
              <p className="text-[1.5rem] font-semibold uppercase tracking-[0.2em] text-primary mb-6">Legal Services Reimagined</p>
            </AppearOnScroll>
            <AppearOnScroll delay={100}>
              <h1 className="text-[3.6rem] md:text-[5rem] lg:text-[7rem] font-bold tracking-[-0.02em] leading-[1.1] mb-8">
                Your attorney,{" "}
                <span className="text-primary">on demand.</span>
              </h1>
            </AppearOnScroll>
            <AppearOnScroll delay={200}>
              <p className="text-[1.8rem] md:text-[2.2rem] leading-[1.7] text-muted-foreground mb-10 max-w-[60rem]">
                Access an extensive network of top-rated legal practitioners across every practice area for just <strong className="text-foreground">$19.99/month</strong>.
              </p>
            </AppearOnScroll>
            <AppearOnScroll delay={300}>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/pricing"
                  className="inline-block px-10 py-4 text-[1.7rem] font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                >
                  Start Your Membership
                </Link>
                <Link
                  to="/how-it-works"
                  className="inline-block px-10 py-4 text-[1.7rem] font-semibold border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  Learn More
                </Link>
              </div>
            </AppearOnScroll>
          </div>
        </div>
      </section>

      {/* Partner Carousel */}
      <Section>
        <AppearOnScroll delay={0}>
          <PartnerCarousel />
        </AppearOnScroll>
      </Section>

      {/* Trust Bar */}
      <Section>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center w-full max-w-[100rem] mx-auto">
          {[
            { icon: Shield, label: "Vetted Attorneys", value: "2,500+" },
            { icon: Users, label: "Active Members", value: "50,000+" },
            { icon: Star, label: "Avg. Rating", value: "4.9/5" },
            { icon: Clock, label: "Avg. Response", value: "<2 hrs" },
          ].map((stat, i) => (
            <AppearOnScroll key={i} delay={i * 100}>
              <div className="flex flex-col items-center gap-2">
                <stat.icon className="w-8 h-8 text-primary mb-2" />
                <p className="text-[2.8rem] font-bold text-foreground">{stat.value}</p>
                <p className="text-[1.4rem] text-muted-foreground">{stat.label}</p>
              </div>
            </AppearOnScroll>
          ))}
        </div>
      </Section>

      {/* Practice Areas */}
      <Section>
        <div className="w-full max-w-[110rem] mx-auto">
          <AppearOnScroll delay={0}>
            <div>
              <p className="text-[1.4rem] font-semibold uppercase tracking-[0.2em] text-primary mb-4 text-center">Practice Areas</p>
              <h2 className="text-[2.8rem] md:text-[3.6rem] font-bold text-center mb-12">
                Legal expertise across every domain
              </h2>
            </div>
          </AppearOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {practiceAreas.map((area, i) => (
              <AppearOnScroll key={i} delay={i * 75}>
                <div className="p-6 rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all group cursor-pointer">
                  <area.icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-[1.8rem] font-semibold mb-2">{area.title}</h3>
                  <p className="text-[1.4rem] text-muted-foreground leading-[1.6]">{area.desc}</p>
                </div>
              </AppearOnScroll>
            ))}
          </div>
        </div>
      </Section>

      {/* How It Works */}
      <section className="bg-muted">
        <Section>
          <div className="w-full max-w-[100rem] mx-auto">
            <AppearOnScroll delay={0}>
              <div>
                <p className="text-[1.4rem] font-semibold uppercase tracking-[0.2em] text-primary mb-4 text-center">How It Works</p>
                <h2 className="text-[2.8rem] md:text-[3.6rem] font-bold text-center mb-12">
                  Four simple steps to legal peace of mind
                </h2>
              </div>
            </AppearOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, i) => (
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

      {/* Pricing CTA */}
      <Section>
        <div className="w-full max-w-[80rem] mx-auto text-center">
          <AppearOnScroll delay={0}>
            <div>
              <p className="text-[1.4rem] font-semibold uppercase tracking-[0.2em] text-primary mb-4">Simple Pricing</p>
              <h2 className="text-[2.8rem] md:text-[3.6rem] font-bold mb-6">
                One plan. Unlimited access.
              </h2>
            </div>
          </AppearOnScroll>
          <AppearOnScroll delay={100}>
            <div className="max-w-[50rem] mx-auto bg-card border border-border rounded-2xl p-10 shadow-lg">
              <p className="text-[5rem] font-bold text-foreground">$19<span className="text-[2.4rem] text-muted-foreground">.99/mo</span></p>
              <p className="text-[1.6rem] text-muted-foreground mb-8">Everything you need, one monthly fee</p>
              <ul className="text-left space-y-4 mb-10">
                {[
                  "Unlimited attorney consultations",
                  "Access to 2,500+ vetted lawyers",
                  "Document review & preparation",
                  "Secure messaging & file sharing",
                  "Priority case matching",
                  "24/7 legal resources library",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[1.6rem]">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/pricing"
                className="inline-block w-full py-4 text-[1.7rem] font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-center"
              >
                Start Your Membership
              </Link>
              <p className="text-[1.3rem] text-muted-foreground mt-4">Cancel anytime. No long-term contracts.</p>
            </div>
          </AppearOnScroll>
        </div>
      </Section>

      {/* Testimonials */}
      <section className="bg-muted">
        <Section>
          <div className="w-full max-w-[110rem] mx-auto">
            <AppearOnScroll delay={0}>
              <div>
                <p className="text-[1.4rem] font-semibold uppercase tracking-[0.2em] text-primary mb-4 text-center">Testimonials</p>
                <h2 className="text-[2.8rem] md:text-[3.6rem] font-bold text-center mb-12">
                  Trusted by thousands
                </h2>
              </div>
            </AppearOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <AppearOnScroll key={i} delay={i * 150}>
                  <div className="bg-card p-8 rounded-xl border border-border">
                    <div className="flex items-center gap-4 mb-6">
                      <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                      <div>
                        <p className="text-[1.6rem] font-semibold">{t.name}</p>
                        <p className="text-[1.3rem] text-muted-foreground">{t.role}</p>
                      </div>
                    </div>
                    <p className="text-[1.6rem] leading-[1.7] text-muted-foreground italic">"{t.quote}"</p>
                  </div>
                </AppearOnScroll>
              ))}
            </div>
          </div>
        </Section>
      </section>

      {/* CTA */}
      <Section>
        <div className="w-full max-w-[80rem] mx-auto text-center">
          <AppearOnScroll delay={0}>
            <div>
              <h2 className="text-[2.8rem] md:text-[3.6rem] font-bold mb-6">
                Ready to take control of your legal needs?
              </h2>
              <p className="text-[1.8rem] text-muted-foreground mb-8 max-w-[55rem] mx-auto">
                Join Monogamy today and get instant access to premium legal services at a fraction of traditional costs.
              </p>
              <Link
                to="/pricing"
                className="inline-block px-12 py-4 text-[1.7rem] font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
              >
                Get Started — $19.99/mo
              </Link>
            </div>
          </AppearOnScroll>
        </div>
      </Section>

      <Footer />
    </div>
  );
};

export default Blog;
