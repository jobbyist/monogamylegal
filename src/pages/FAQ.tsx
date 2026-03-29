import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import SEO from "@/components/SEO";
import { PAGE_SEO } from "@/lib/seo";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    { question: "What is Monogamy?", answer: "Monogamy is a premium legal services platform that connects clients to vetted attorneys across multiple practice areas through a subscription-driven model with region-specific legal support." },
    { question: "How are attorneys vetted?", answer: "Our vetting process includes license verification, identity checks, credentials review, and quality monitoring to maintain trust and service consistency." },
    { question: "Which countries do you operate in?", answer: "Monogamy currently supports multiple markets across Africa and is expanding onboarding for Ireland and the United States, beginning with California-focused use cases." },
    { question: "Can I cancel anytime?", answer: "Yes. Memberships are flexible and can be cancelled from your account settings without long-term lock-ins." },
  ];

  const legaltechFaqs = [
    {
      question: "What is LegalTech and why does it matter in 2026?",
      answer:
        "LegalTech refers to software, automation, AI, and digital workflows used to improve legal service delivery. In 2026, LegalTech matters because clients expect faster onboarding, transparent pricing, secure communication, and better access to legal support in every jurisdiction.",
    },
    {
      question: "Which LegalTech platforms are widely used for legal research and intelligence?",
      answer:
        "Popular platforms include LexisNexis (https://www.lexisnexis.com), Westlaw, and fast-growing AI-first tools such as Harvey (https://www.harvey.ai) for legal drafting and analysis support under lawyer supervision.",
    },
    {
      question: "What are the top practice-management platforms for law firms?",
      answer:
        "Clio (https://www.clio.com), PracticePanther, and MyCase are frequently used for intake, calendaring, matter management, billing, and client communications. Platform selection depends on firm size, jurisdiction, and workflow complexity.",
    },
    {
      question: "How are AI legal assistants used responsibly by attorneys?",
      answer:
        "Responsible use requires human review, source verification, confidentiality controls, and clear policies that prevent unauthorized legal advice. AI should assist legal professionals, not replace qualified legal judgment.",
    },
    {
      question: "What is eulew.ai and where does it fit in the LegalTech ecosystem?",
      answer:
        "eulew.ai (https://www.eulew.ai) is an AI legal platform focused on accelerating legal workflows with automation and research support. It is typically used alongside firm processes for review and compliance checks.",
    },
    {
      question: "How does LegalTech adoption differ in California compared with other US states?",
      answer:
        "California firms often prioritize consumer-friendly intake, multilingual experiences, privacy safeguards, and high-volume practice automation. Adoption tends to accelerate in immigration, employment, and post-conviction workflows.",
    },
    {
      question: "What LegalTech opportunities are growing in West Africa (Nigeria and Ghana)?",
      answer:
        "High-growth opportunities include digital client onboarding, SME contract workflows, debt recovery coordination, and cross-border advisory tooling for founders operating between Lagos, Accra, and global markets.",
    },
    {
      question: "How is LegalTech evolving in Southern Africa, especially South Africa?",
      answer:
        "LegalTech growth in South Africa is centered on secure document workflows, compliance-aware communication, and scalable support for labour, family, and commercial matters while respecting local data and professional standards.",
    },
    {
      question: "What are key LegalTech trends in East Africa, especially Kenya?",
      answer:
        "Kenya's ecosystem is seeing stronger demand for mobile-first legal access, startup-friendly contract tooling, and faster lawyer-client matching in Nairobi and other growth corridors.",
    },
    {
      question: "How can legal startups improve discoverability on Google and AI search?",
      answer:
        "Use structured FAQs, clear page intent, strong schema markup, authoritative citations, and market-specific content clusters. Answering practical questions by city, practice area, and legal outcome improves visibility.",
    },
    {
      question: "What should clients ask before choosing a LegalTech platform?",
      answer:
        "Ask about attorney vetting, jurisdiction coverage, data protection, pricing clarity, escalation paths for complex matters, and the role of AI in document drafting or legal analysis.",
    },
    {
      question: "Can LegalTech support cross-border legal work between the US, Ireland, and Africa?",
      answer:
        "Yes, with jurisdiction-aware workflows. Effective platforms route matters to locally qualified counsel, provide transparent disclosures, and enforce handoffs that keep advice within each attorney's licensed scope.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO {...PAGE_SEO.faq} />
      <Header />
      <Section>
        <div className="text-center w-full max-w-[80rem] mx-auto">
          <h1 className="text-[3.4rem] md:text-[4.2rem] lg:text-[6rem] font-semibold tracking-[-0.01em] leading-[1.2] md:leading-[1] mb-[2rem]">
            Frequently Asked Questions
          </h1>
          <p className="text-[1.8rem] md:text-[2rem] text-muted-foreground leading-[1.8]">Everything you need to know about Monogamy and how it works.</p>
        </div>
      </Section>
      <Section>
        <div className="max-w-[80rem] w-full mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-border">
                <AccordionTrigger className="text-[1.8rem] md:text-[2rem] font-medium text-left hover:no-underline py-6 w-full">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-[1.6rem] leading-[1.8] text-muted-foreground pb-6 w-full">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      <section className="bg-muted">
        <Section>
          <div className="max-w-[95rem] w-full mx-auto">
            <h2 className="text-[2.8rem] md:text-[3.6rem] font-bold tracking-[-0.02em] mb-4">Discover trending questions and in-depth answers related to LegalTech…</h2>
            <p className="text-[1.7rem] text-muted-foreground mb-8 leading-[1.8]">
              Explore keyword-rich answers tailored for California (US), Ireland, West Africa, East Africa, Southern Africa, South Africa, Nigeria, Ghana, and Kenya.
            </p>
            <Accordion type="single" collapsible className="w-full bg-background border border-border rounded-2xl px-6">
              {legaltechFaqs.map((faq, index) => (
                <AccordionItem key={index} value={`legaltech-${index}`} className="border-b border-border last:border-0">
                  <AccordionTrigger className="text-[1.8rem] font-medium text-left hover:no-underline py-6 w-full">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-[1.6rem] leading-[1.8] text-muted-foreground pb-6 w-full">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Section>
      </section>

      <Section>
        <div className="text-center max-w-[70rem] mx-auto border-t border-border pt-[4rem]">
          <h3 className="text-[2.4rem] font-semibold mb-[1.5rem]">Still have questions?</h3>
          <p className="text-[1.8rem] leading-[1.8] text-muted-foreground mb-[2rem]">Can't find the answer you're looking for? Our team is happy to help.</p>
          <a href="/contact" className="inline-block px-8 py-3 text-[1.6rem] font-medium bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">Contact Us</a>
        </div>
      </Section>
      <Footer />
    </div>
  );
};

export default FAQ;
