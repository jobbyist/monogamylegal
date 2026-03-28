import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import AppearOnScroll from "@/components/AppearOnScroll";
import SEO from "@/components/SEO";
import { UserPlus, Search, MessageSquare, CheckCircle, Shield, Lock, Clock, Award } from "lucide-react";

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="How it works | Monogamy"
        description="Access world-class legal counsel in minutes with our simple pricing options designed to suit every budget. From signup to resolution, we've made the entire process seamless…"
        canonicalPath="/how-it-works"
      />
      <Header />
      <Section>
        <div className="text-center w-full max-w-[80rem] mx-auto">
          <AppearOnScroll delay={0}>
            <div>
              <p className="text-[1.4rem] font-semibold uppercase tracking-[0.2em] text-primary mb-4">How It Works</p>
              <h1 className="text-[3.4rem] md:text-[4.2rem] lg:text-[6rem] font-semibold tracking-[-0.01em] leading-[1.2] md:leading-[1] mb-[2rem]">
                Legal help in four simple steps
              </h1>
              <p className="text-[1.8rem] md:text-[2rem] text-muted-foreground leading-[1.8]">
                From signup to resolution, we've made the process seamless.
              </p>
            </div>
          </AppearOnScroll>
        </div>
      </Section>

      <Section>
        <div className="max-w-[90rem] w-full mx-auto space-y-16">
          {[
            { icon: UserPlus, num: "01", title: "Create Your Account", desc: "Sign up for Monogamy in under 2 minutes. Choose from our Essential ($19.99/month), Professional ($49.99/month), or Enterprise ($129.99/month) plan and unlock instant access to our legal network. Plans are also available in ZAR, NGN, and KES." },
            { icon: Search, num: "02", title: "Describe Your Legal Need", desc: "Tell us about your situation — whether it's a contract review, a custody matter, or business formation. Our intelligent matching system finds the best attorney for your specific case across South Africa, Nigeria, and Kenya." },
            { icon: MessageSquare, num: "03", title: "Connect & Consult", desc: "Schedule a consultation with your matched attorney via our secure platform. Share documents, ask questions, and discuss strategy — all within our encrypted environment." },
            { icon: CheckCircle, num: "04", title: "Resolve With Confidence", desc: "Work with your attorney to achieve the best possible outcome. Track progress, access documents, and communicate seamlessly until your matter is resolved." },
          ].map((step, i) => (
            <AppearOnScroll key={i} delay={i * 150}>
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex items-center gap-6 md:w-[20rem] flex-shrink-0">
                  <span className="text-[5rem] font-bold text-primary/15">{step.num}</span>
                  <step.icon className="w-12 h-12 text-primary" />
                </div>
                <div>
                  <h3 className="text-[2.4rem] font-semibold mb-3">{step.title}</h3>
                  <p className="text-[1.7rem] text-muted-foreground leading-[1.8]">{step.desc}</p>
                </div>
              </div>
            </AppearOnScroll>
          ))}
        </div>
      </Section>

      <section className="bg-muted">
        <Section>
          <div className="max-w-[100rem] w-full mx-auto">
            <AppearOnScroll delay={0}>
              <h2 className="text-[2.8rem] md:text-[3.6rem] font-bold text-center mb-12">Why choose Monogamy?</h2>
            </AppearOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Shield, title: "Vetted Network", desc: "Every attorney passes rigorous background and quality checks" },
                { icon: Lock, title: "Fully Secure", desc: "Bank-level encryption protects all your communications and documents" },
                { icon: Clock, title: "Fast Matching", desc: "Get connected with the right attorney in under 2 hours" },
                { icon: Award, title: "Satisfaction Guaranteed", desc: "Not happy with your match? We'll reassign at no cost" },
              ].map((item, i) => (
                <AppearOnScroll key={i} delay={i * 100}>
                  <div className="text-center p-6">
                    <item.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                    <h3 className="text-[1.8rem] font-semibold mb-2">{item.title}</h3>
                    <p className="text-[1.4rem] text-muted-foreground leading-[1.7]">{item.desc}</p>
                  </div>
                </AppearOnScroll>
              ))}
            </div>
          </div>
        </Section>
      </section>

      <Section>
        <div className="text-center max-w-[60rem] mx-auto">
          <h2 className="text-[2.8rem] font-bold mb-6">Ready to get started?</h2>
          <p className="text-[1.8rem] text-muted-foreground mb-8">Join thousands of members who've transformed how they handle legal matters.</p>
          <Link to="/pricing" className="inline-block px-10 py-4 text-[1.7rem] font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">View Pricing Plans</Link>
        </div>
      </Section>
      <Footer />
    </div>
  );
};

export default HowItWorks;
