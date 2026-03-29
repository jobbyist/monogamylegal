import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import AppearOnScroll from "@/components/AppearOnScroll";
import SEO from "@/components/SEO";
import { PAGE_SEO } from "@/lib/seo";
import { Briefcase, Heart, Home, FileText, Gavel, DollarSign, Scale, Shield, Globe, Lightbulb, Car, Building2 } from "lucide-react";

const areas = [
  { icon: Briefcase, title: "Business Law", desc: "Company formation, contracts, mergers & acquisitions, compliance, and corporate governance.", examples: ["LLC Formation", "Contract Drafting", "Partnership Agreements", "IP Protection"] },
  { icon: Heart, title: "Family Law", desc: "Divorce, child custody, spousal support, adoption, prenuptial agreements, and mediation.", examples: ["Divorce Proceedings", "Child Custody", "Adoption", "Prenuptial Agreements"] },
  { icon: Home, title: "Real Estate Law", desc: "Property transactions, title disputes, landlord-tenant issues, zoning, and HOA matters.", examples: ["Home Closings", "Lease Reviews", "Title Disputes", "Zoning Issues"] },
  { icon: FileText, title: "Estate Planning", desc: "Wills, living trusts, probate, power of attorney, and healthcare directives.", examples: ["Will Drafting", "Trust Creation", "Probate", "Power of Attorney"] },
  { icon: Gavel, title: "Criminal Defense", desc: "Felonies, misdemeanors, DUI/DWI, white-collar crime, and expungement.", examples: ["DUI Defense", "Misdemeanor Defense", "Expungement", "White Collar Crime"] },
  { icon: DollarSign, title: "Tax Law", desc: "Tax planning, IRS disputes, audit defense, and international tax matters.", examples: ["Tax Planning", "IRS Audit Defense", "Tax Disputes", "International Tax"] },
  { icon: Scale, title: "Employment Law", desc: "Wrongful termination, discrimination, wage disputes, and workplace harassment.", examples: ["Wrongful Termination", "Discrimination", "Wage Claims", "Severance Negotiation"] },
  { icon: Shield, title: "Personal Injury", desc: "Auto accidents, medical malpractice, product liability, and slip-and-fall claims.", examples: ["Auto Accidents", "Medical Malpractice", "Product Liability", "Workplace Injuries"] },
  { icon: Globe, title: "Immigration Law", desc: "Visa applications, green cards, citizenship, deportation defense, and asylum.", examples: ["Visa Applications", "Green Cards", "Citizenship", "Deportation Defense"] },
  { icon: Lightbulb, title: "Intellectual Property", desc: "Patents, trademarks, copyrights, trade secrets, and licensing agreements.", examples: ["Trademark Registration", "Patent Filing", "Copyright Protection", "Licensing"] },
  { icon: Car, title: "Traffic Law", desc: "Traffic violations, license suspension, reckless driving, and accident claims.", examples: ["Traffic Tickets", "License Restoration", "Accident Claims", "DUI"] },
  { icon: Building2, title: "Bankruptcy", desc: "Chapter 7, Chapter 13, debt negotiation, and creditor harassment.", examples: ["Chapter 7 Filing", "Chapter 13 Plans", "Debt Negotiation", "Creditor Defense"] },
];

const PracticeAreas = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO {...PAGE_SEO.practiceAreas} />
      <Header />
      <Section>
        <div className="text-center w-full max-w-[80rem] mx-auto">
          <AppearOnScroll delay={0}>
            <div>
              <p className="text-[1.4rem] font-semibold uppercase tracking-[0.2em] text-primary mb-4">Practice Areas</p>
              <h1 className="text-[3.4rem] md:text-[4.2rem] lg:text-[6rem] font-semibold tracking-[-0.01em] leading-[1.2] md:leading-[1] mb-[2rem]">
                Legal expertise for every need
              </h1>
              <p className="text-[1.8rem] md:text-[2rem] text-muted-foreground leading-[1.8]">
                Our network of 2,500+ attorneys covers every major practice area.
              </p>
              {/* SEO addition: internal linking between high-intent pages. */}
              <p className="text-[1.5rem] text-muted-foreground leading-[1.8] mt-4">
                See <Link to="/how-it-works" className="text-primary hover:underline">how Monogamy works</Link> and compare <Link to="/pricing" className="text-primary hover:underline">pricing plans</Link> for your legal needs.
              </p>
            </div>
          </AppearOnScroll>
        </div>
      </Section>
      <Section>
        <div className="max-w-[120rem] w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {areas.map((area, i) => (
            <AppearOnScroll key={i} delay={i * 75}>
              <div className="p-8 rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all h-full">
                <area.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-[2rem] font-semibold mb-3">{area.title}</h3>
                <p className="text-[1.5rem] text-muted-foreground leading-[1.7] mb-4">{area.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {area.examples.map((ex) => (
                    <span key={ex} className="text-[1.2rem] px-3 py-1 bg-muted rounded-full text-muted-foreground">{ex}</span>
                  ))}
                </div>
              </div>
            </AppearOnScroll>
          ))}
        </div>
      </Section>
      <Section>
        <div className="text-center max-w-[60rem] mx-auto">
          <h2 className="text-[2.8rem] font-bold mb-6">Don't see your area?</h2>
          <p className="text-[1.8rem] text-muted-foreground mb-8">Our network is constantly growing. Contact us and we'll find the right attorney for your specific needs.</p>
          <Link to="/contact" className="inline-block px-10 py-4 text-[1.7rem] font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">Contact Us</Link>
        </div>
      </Section>
      <Footer />
    </div>
  );
};

export default PracticeAreas;
