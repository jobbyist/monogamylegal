import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import AppearOnScroll from "@/components/AppearOnScroll";
import { CheckCircle } from "lucide-react";

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Section>
        <div className="text-center w-full max-w-[80rem] mx-auto">
          <AppearOnScroll delay={0}>
            <div>
              <p className="text-[1.4rem] font-semibold uppercase tracking-[0.2em] text-primary mb-4">Pricing</p>
              <h1 className="text-[3.4rem] md:text-[4.2rem] lg:text-[6rem] font-semibold tracking-[-0.01em] leading-[1.2] md:leading-[1] mb-[2rem]">
                One simple plan
              </h1>
              <p className="text-[1.8rem] md:text-[2rem] text-muted-foreground leading-[1.8]">
                No hidden fees. No tiers. Just premium legal services at a flat rate.
              </p>
            </div>
          </AppearOnScroll>
        </div>
      </Section>

      <Section>
        <div className="max-w-[55rem] w-full mx-auto">
          <AppearOnScroll delay={100}>
            <div className="bg-card border-2 border-primary rounded-2xl p-10 md:p-14 shadow-xl text-center">
              <p className="text-[1.5rem] font-semibold uppercase tracking-[0.15em] text-primary mb-6">Monogamy Membership</p>
              <p className="text-[6rem] font-bold text-foreground leading-none">$19<span className="text-[3rem] text-muted-foreground">.99</span></p>
              <p className="text-[1.6rem] text-muted-foreground mb-10">per month</p>

              <ul className="text-left space-y-5 mb-12">
                {[
                  "Unlimited attorney consultations",
                  "Access to 2,500+ vetted attorneys",
                  "All practice areas covered",
                  "Document review & preparation",
                  "Secure messaging & video calls",
                  "Priority case matching (<2 hrs)",
                  "24/7 legal resources library",
                  "Satisfaction guarantee",
                  "Cancel anytime — no contracts",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[1.6rem]">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <button className="w-full py-4 text-[1.8rem] font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                Start Your Membership
              </button>
              <p className="text-[1.3rem] text-muted-foreground mt-4">Cancel anytime. 7-day free trial included.</p>
            </div>
          </AppearOnScroll>
        </div>
      </Section>

      <Section>
        <div className="text-center max-w-[60rem] mx-auto">
          <AppearOnScroll delay={0}>
            <div>
              <h2 className="text-[2.4rem] font-bold mb-4">For Law Firms & Attorneys</h2>
              <p className="text-[1.7rem] text-muted-foreground mb-6">Interested in joining our network? We provide a steady pipeline of clients, case management tools, and competitive compensation.</p>
              <Link to="/contact" className="inline-block px-8 py-3 text-[1.6rem] font-medium border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-all">Partner With Us</Link>
            </div>
          </AppearOnScroll>
        </div>
      </Section>
      <Footer />
    </div>
  );
};

export default Pricing;
