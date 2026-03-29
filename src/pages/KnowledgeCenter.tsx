import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import SEO from "@/components/SEO";
import { PAGE_SEO } from "@/lib/seo";
import { FileText, Video, BarChart3, ShieldCheck, Scale, Globe2 } from "lucide-react";

const resources = [
  { title: "2026 Whitepaper", status: "Coming Soon", description: "Monogamy's annual thesis on legaltech infrastructure, consumer access, and AI-ready legal operations." },
  { title: "LegalTech Market Insights & Analysis Reports", status: "Live", description: "Quarterly market snapshots for the US, South Africa, and Nigeria with demand trends by legal practice area." },
  { title: "Explainer Video Library", status: "Live", description: "Short walkthroughs on platform workflows, attorney onboarding, and client matching best practices." },
  { title: "Brand Asset Kits & Media Creatives", status: "Live", description: "Logos, product screenshots, one-pagers, launch creatives, and approved social formats." },
];

const cornerstoneContent = [
  "How matching works: intent signals, urgency scoring, and fit ranking for clients and attorneys.",
  "Attorney vetting framework: licensing checks, disciplinary review, identity verification, and outcome monitoring.",
  "Cross-border compliance playbook: conflict rules, data residency, privacy controls, and jurisdiction-specific disclosures.",
  "Practice area explainers: family law, employment law, SME commercial law, criminal defense, and immigration pathways.",
  "Trust & safety in legal AI: model governance, citation expectations, and human-in-the-loop quality controls.",
];

const KnowledgeCenter = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO {...PAGE_SEO.knowledgeCenter} />
      <Header />

      <Section>
        <div className="max-w-[100rem] mx-auto text-center">
          <p className="text-[1.4rem] font-semibold uppercase tracking-[0.2em] text-primary mb-4">Knowledge Center</p>
          <h1 className="text-[3.4rem] md:text-[5.5rem] font-bold tracking-[-0.02em] mb-6">Research, resources, and legaltech intelligence</h1>
          <p className="text-[1.8rem] text-muted-foreground leading-[1.8]">
            Explore platform documentation, product roadmap updates, and region-specific guidance tailored to the legal frameworks in the United States, South Africa, and Nigeria.
          </p>
        </div>
      </Section>

      <section className="bg-muted">
        <Section>
          <div className="max-w-[108rem] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: BarChart3, label: "Live industry stats", value: "US, South Africa, Nigeria" },
              { icon: FileText, label: "Roadmap horizon", value: "Q2 2026 → Q1 2027" },
              { icon: Video, label: "Learning formats", value: "Reports, docs, videos, kits" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-background border border-border rounded-2xl p-8">
                <Icon className="w-7 h-7 text-primary mb-4" />
                <p className="text-[1.4rem] uppercase tracking-widest text-muted-foreground mb-2">{label}</p>
                <p className="text-[2rem] font-semibold">{value}</p>
              </div>
            ))}
          </div>
        </Section>
      </section>

      <Section>
        <div className="max-w-[108rem] mx-auto">
          <h2 className="text-[3rem] font-bold mb-8">Product roadmap</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { phase: "Now", items: ["Founding-member onboarding in Ireland, Ghana, Kenya", "Knowledge Center v1 with jurisdictional primers", "Partner case studies and conversion funnels"] },
              { phase: "Next", items: ["US-focused compliance center (California first)", "Matter intake automation and document triage", "Attorney quality scorecards + client trust signals"] },
              { phase: "Later", items: ["Cross-border referrals across Africa corridors", "Enhanced billing and payout orchestration", "AI assistant with explainable legal references"] },
            ].map((block) => (
              <div key={block.phase} className="border border-border rounded-2xl p-8 bg-card">
                <h3 className="text-[2.2rem] font-semibold mb-4">{block.phase}</h3>
                <ul className="space-y-3 list-disc pl-5 text-[1.6rem] text-muted-foreground leading-[1.7]">
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <section className="bg-muted">
        <Section>
          <div className="max-w-[108rem] mx-auto">
            <h2 className="text-[3rem] font-bold mb-8">Resources & documentation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resources.map((resource) => (
                <article key={resource.title} className="rounded-2xl border border-border bg-background p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[2rem] font-semibold">{resource.title}</h3>
                    <span className="text-[1.2rem] uppercase tracking-wider bg-primary/10 text-primary px-3 py-1 rounded-full">{resource.status}</span>
                  </div>
                  <p className="text-[1.6rem] text-muted-foreground leading-[1.7]">{resource.description}</p>
                </article>
              ))}
            </div>
            <p className="text-[1.4rem] text-muted-foreground mt-6">
              Usage guidelines: please attribute Monogamy as the source, include the publication date, and avoid modifying logos or legal framework diagrams without written approval.
            </p>
          </div>
        </Section>
      </section>

      <Section>
        <div className="max-w-[108rem] mx-auto">
          <h2 className="text-[3rem] font-bold mb-8">Jurisdiction focus: US, South Africa, Nigeria</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Scale,
                market: "United States (California focus)",
                text: "Coverage emphasizes state-bar compliance, fee transparency, UPL boundaries, and high-demand use cases like employment, housing, and post-conviction support.",
              },
              {
                icon: ShieldCheck,
                market: "South Africa",
                text: "Content aligns with local legal service norms, POPIA data privacy obligations, and practice-area patterns across family, labour, and commercial disputes.",
              },
              {
                icon: Globe2,
                market: "Nigeria",
                text: "Guidance includes legal workflow realities in major commercial hubs, cross-border advisory trends, and practical compliance considerations for growing firms.",
              },
            ].map(({ icon: Icon, market, text }) => (
              <div key={market} className="bg-card border border-border rounded-2xl p-8">
                <Icon className="w-7 h-7 text-primary mb-4" />
                <h3 className="text-[2rem] font-semibold mb-3">{market}</h3>
                <p className="text-[1.6rem] text-muted-foreground leading-[1.8]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <section className="bg-muted">
        <Section>
          <div className="max-w-[108rem] mx-auto">
            <h2 className="text-[3rem] font-bold mb-6">Cornerstone content</h2>
            <ul className="space-y-4 text-[1.7rem] text-muted-foreground leading-[1.8] list-disc pl-6">
              {cornerstoneContent.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </Section>
      </section>

      <Footer />
    </div>
  );
};

export default KnowledgeCenter;
