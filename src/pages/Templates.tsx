import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import AppearOnScroll from "@/components/AppearOnScroll";
import SEO from "@/components/SEO";
import { PAGE_SEO } from "@/lib/seo";
import { FileText, Lock, Sparkles } from "lucide-react";

interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  jurisdiction: string[];
}

const templates: Template[] = [
  {
    id: "nda",
    title: "Non-Disclosure Agreement (NDA)",
    description: "Protect confidential information in business relationships",
    category: "Business",
    jurisdiction: ["ZA", "KE", "NG"],
  },
  {
    id: "cohabitation",
    title: "Cohabitation Agreement",
    description: "Define property and financial rights for unmarried partners",
    category: "Relationship",
    jurisdiction: ["ZA", "KE", "NG"],
  },
  {
    id: "contractor",
    title: "Independent Contractor Agreement",
    description: "Set clear terms for freelance and contract work",
    category: "Employment",
    jurisdiction: ["ZA", "KE", "NG"],
  },
  {
    id: "website-terms",
    title: "Website Terms of Service",
    description: "Legal terms and conditions for your website or app",
    category: "Business",
    jurisdiction: ["ZA", "KE", "NG"],
  },
  {
    id: "service-agreement",
    title: "Service Agreement",
    description: "Professional services contract for ongoing engagements",
    category: "Business",
    jurisdiction: ["ZA", "KE", "NG"],
  },
  {
    id: "employment-contract",
    title: "Employment Contract",
    description: "Comprehensive employment agreement compliant with local labor laws",
    category: "Employment",
    jurisdiction: ["ZA", "KE", "NG"],
  },
  {
    id: "lease-agreement",
    title: "Residential Lease Agreement",
    description: "Property rental agreement for landlords and tenants",
    category: "Real Estate",
    jurisdiction: ["ZA", "KE", "NG"],
  },
  {
    id: "partnership-agreement",
    title: "Partnership Agreement",
    description: "Establish a business partnership with clear terms",
    category: "Business",
    jurisdiction: ["ZA", "KE", "NG"],
  },
];

const Templates = () => {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  
  const categories = ["All", "Business", "Relationship", "Employment", "Real Estate"];
  
  const filteredTemplates = selectedCategory === "All" 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Legal Document Templates | Monogamy"
        description="Browse our library of attorney-verified legal document templates for South Africa, Kenya, and Nigeria. Customize with AI assistance."
        canonical="https://monogamy.legal/templates"
      />
      <Header />

      <Section>
        <div className="text-center w-full max-w-[80rem] mx-auto">
          <AppearOnScroll delay={0}>
            <div>
              <p className="text-[1.4rem] font-semibold uppercase tracking-[0.2em] text-primary mb-4">
                Template Library
              </p>
              <h1 className="text-[3.4rem] md:text-[4.2rem] lg:text-[6rem] font-semibold tracking-[-0.01em] leading-[1.2] md:leading-[1] mb-[2rem]">
                Legal Documents, Simplified
              </h1>
              <p className="text-[1.8rem] md:text-[2rem] text-muted-foreground leading-[1.8] mb-8">
                Attorney-verified templates customized for your jurisdiction. AI-powered drafting with human expert review.
              </p>
            </div>
          </AppearOnScroll>
        </div>
      </Section>

      <Section>
        <div className="w-full max-w-[120rem] mx-auto">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-3 rounded-lg text-[1.5rem] font-semibold transition-all ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border hover:border-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template, i) => (
              <AppearOnScroll key={template.id} delay={i * 50}>
                <div className="rounded-2xl border border-border bg-card p-8 hover:shadow-lg transition-shadow h-full flex flex-col">
                  <div className="mb-4">
                    <FileText className="w-12 h-12 text-primary mb-3" />
                    <h3 className="text-[2rem] font-semibold mb-2">{template.title}</h3>
                    <p className="text-[1.4rem] text-muted-foreground mb-3">
                      {template.description}
                    </p>
                    <div className="flex items-center gap-2 text-[1.2rem] text-muted-foreground">
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                        {template.category}
                      </span>
                    </div>
                  </div>

                  <div className="mt-auto pt-4">
                    {user ? (
                      <button className="w-full py-3 px-4 rounded-lg bg-primary text-primary-foreground text-[1.5rem] font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2">
                        <Sparkles className="w-5 h-5" />
                        Customize with AI
                      </button>
                    ) : (
                      <Link
                        to="/pricing"
                        className="w-full py-3 px-4 rounded-lg border-2 border-primary text-primary text-[1.5rem] font-semibold hover:bg-primary hover:text-primary-foreground transition-all flex items-center justify-center gap-2"
                      >
                        <Lock className="w-5 h-5" />
                        Subscribe to Unlock
                      </Link>
                    )}
                  </div>
                </div>
              </AppearOnScroll>
            ))}
          </div>

          {!user && (
            <AppearOnScroll delay={300}>
              <div className="mt-16 text-center">
                <p className="text-[1.8rem] text-muted-foreground mb-6">
                  Start your subscription to access all templates with AI customization
                </p>
                <Link to="/pricing" className="inline-block px-8 py-4 rounded-lg bg-primary text-primary-foreground text-[1.7rem] font-semibold hover:opacity-90 transition-all">
                  View Pricing Plans
                </Link>
              </div>
            </AppearOnScroll>
          )}
        </div>
      </Section>

      <Footer />
    </div>
  );
};

export default Templates;
