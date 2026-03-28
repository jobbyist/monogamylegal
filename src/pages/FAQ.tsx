import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import SEO from "@/components/SEO";
import { PAGE_SEO } from "@/lib/seo";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const legaltechFaqs = [
  {
    question: "What is LegalTech?",
    answer: `<p>LegalTech (legal technology) refers to the use of software, platforms, and digital tools to streamline, automate, and improve the delivery of legal services. The global LegalTech industry is transforming how law firms, corporate legal teams, and individual clients interact with the legal system — reducing costs, improving access to justice, and enabling faster, more accurate outcomes.</p><p style="margin-top:1rem;">Key areas of LegalTech include practice management software, AI-powered legal research, contract automation, document review, e-discovery, online dispute resolution, and subscription-based legal services platforms like <a href="https://monogamy.legal" target="_blank" rel="noopener noreferrer">Monogamy</a>.</p>`,
  },
  {
    question: "What are the best LegalTech platforms for law firms in 2026?",
    answer: `<p>The top LegalTech platforms for law firms in 2026 include:</p><ul style="margin-top:0.8rem;list-style:disc;padding-left:2rem;display:flex;flex-direction:column;gap:0.6rem;"><li><a href="https://clio.com" target="_blank" rel="noopener noreferrer"><strong>Clio</strong></a> — the leading cloud-based practice management platform for law firms, covering billing, case management, client communication, and document storage.</li><li><a href="https://lexisnexis.com" target="_blank" rel="noopener noreferrer"><strong>LexisNexis</strong></a> — comprehensive legal research and analytics with AI-powered Lexis+ AI for case law, statutes, and regulatory intelligence.</li><li><a href="https://harvey.ai" target="_blank" rel="noopener noreferrer"><strong>Harvey.ai</strong></a> — a generative AI platform built specifically for lawyers, handling legal research, contract drafting, due diligence, and litigation support.</li><li><a href="https://eulexa.ai" target="_blank" rel="noopener noreferrer"><strong>Eulexa AI</strong></a> — an emerging AI-powered legal assistant platform gaining traction in mid-market firms.</li><li><strong>Filevine</strong> — a cloud-based case management solution popular with personal injury and litigation practices.</li><li><strong>MyCase</strong> — an all-in-one practice management tool designed for small to mid-sized law firms.</li></ul>`,
  },
  {
    question: "How is AI transforming the legal industry?",
    answer: `<p>Artificial intelligence is reshaping the legal industry across several key dimensions:</p><ul style="margin-top:0.8rem;list-style:disc;padding-left:2rem;display:flex;flex-direction:column;gap:0.6rem;"><li><strong>Legal Research:</strong> Tools like <a href="https://harvey.ai" target="_blank" rel="noopener noreferrer">Harvey.ai</a> and <a href="https://lexisnexis.com" target="_blank" rel="noopener noreferrer">Lexis+ AI</a> can surface relevant case law and statutes in seconds — work that previously took hours.</li><li><strong>Contract Review & Automation:</strong> AI can review standard commercial contracts in minutes, flagging non-standard clauses, missing provisions, and deviation from market norms.</li><li><strong>Document Drafting:</strong> Generative AI assists attorneys in drafting pleadings, letters of demand, NDAs, and employment contracts at significantly reduced time cost.</li><li><strong>Predictive Analytics:</strong> AI models trained on historical case data can predict litigation outcomes, helping attorneys and clients make better-informed strategic decisions.</li><li><strong>Client Intake & Matching:</strong> Platforms like <a href="https://monogamy.legal" target="_blank" rel="noopener noreferrer">Monogamy</a> use AI to match clients with the most relevant vetted attorney based on practice area, jurisdiction, and matter complexity.</li></ul>`,
  },
  {
    question: "What is Harvey.ai and how does it work?",
    answer: `<p><a href="https://harvey.ai" target="_blank" rel="noopener noreferrer"><strong>Harvey.ai</strong></a> is a generative AI platform purpose-built for legal professionals. Built on top of advanced large language models (LLMs) and fine-tuned on legal corpora, Harvey assists attorneys with:</p><ul style="margin-top:0.8rem;list-style:disc;padding-left:2rem;display:flex;flex-direction:column;gap:0.6rem;"><li>Legal research and case law summarisation</li><li>Contract drafting, review, and redlining</li><li>Due diligence analysis</li><li>Regulatory compliance checks</li><li>Litigation support and memo drafting</li></ul><p style="margin-top:1rem;">Harvey is used by some of the world's largest law firms and has been adopted by organisations like PwC, A&O Shearman, and others. It is designed to augment — not replace — human attorneys, enabling them to handle more work at higher quality.</p>`,
  },
  {
    question: "What are the best LegalTech tools for legal research?",
    answer: `<p>The leading legal research tools in 2026 include:</p><ul style="margin-top:0.8rem;list-style:disc;padding-left:2rem;display:flex;flex-direction:column;gap:0.6rem;"><li><a href="https://lexisnexis.com" target="_blank" rel="noopener noreferrer"><strong>LexisNexis / Lexis+ AI</strong></a> — the industry standard for comprehensive case law, statutes, regulations, and secondary sources across multiple jurisdictions, now enhanced with an AI assistant.</li><li><a href="https://westlaw.com" target="_blank" rel="noopener noreferrer"><strong>Westlaw</strong></a> (Thomson Reuters) — renowned for its editorial enhancements including headnotes, Key Numbers, and West's KeyCite citator service.</li><li><strong>vLex</strong> — a global legal intelligence platform covering 130+ countries, increasingly popular for multi-jurisdiction research.</li><li><strong>Fastcase</strong> — a cost-effective research tool popular with solo practitioners and small firms, integrated with many state bar association memberships.</li></ul>`,
  },
  {
    question: "What is Clio and what does it do?",
    answer: `<p><a href="https://clio.com" target="_blank" rel="noopener noreferrer"><strong>Clio</strong></a> is the world's leading cloud-based legal practice management software, trusted by over 150,000 legal professionals worldwide. Clio provides:</p><ul style="margin-top:0.8rem;list-style:disc;padding-left:2rem;display:flex;flex-direction:column;gap:0.6rem;"><li><strong>Matter Management</strong> — organise all case files, documents, and communications in one place.</li><li><strong>Time Tracking & Billing</strong> — automated time capture and invoice generation with online payment capabilities.</li><li><strong>Client Portal</strong> — secure client communication and document sharing.</li><li><strong>Clio Grow</strong> — CRM and intake tools for converting leads into clients.</li><li><strong>Clio Payments</strong> — integrated payment processing for law firm billing.</li></ul><p style="margin-top:1rem;">Clio integrates with 200+ third-party tools including Microsoft 365, Google Workspace, Zoom, and QuickBooks, making it the hub of most modern law firm tech stacks.</p>`,
  },
  {
    question: "What LegalTech solutions are available in Africa?",
    answer: `<p>The African LegalTech ecosystem is growing rapidly, with solutions emerging across the continent:</p><ul style="margin-top:0.8rem;list-style:disc;padding-left:2rem;display:flex;flex-direction:column;gap:0.6rem;"><li><strong>South Africa:</strong> LexisNexis SA provides localised legal research. GhostDraft and DocuSign are used for contract management. Practice management tools like LegalEase are SA-focused.</li><li><strong>Nigeria:</strong> Platforms like Lawyers.ng and SmartLegal are emerging. The NBA (Nigerian Bar Association) has been pushing for technology adoption in legal practice.</li><li><strong>Ghana:</strong> Digital legal services are nascent but growing, driven by fintech sector demand for commercial legal support.</li><li><strong>Kenya:</strong> The Law Society of Kenya has been active in promoting digital transformation. Online dispute resolution platforms are gaining traction.</li><li><a href="https://monogamy.legal" target="_blank" rel="noopener noreferrer"><strong>Monogamy</strong></a> — currently operating in South Africa, Nigeria, and Kenya, with Ghana and Ireland launching May 2026. Monogamy provides a subscription-based on-demand legal platform connecting clients with vetted attorneys across all practice areas.</li></ul>`,
  },
  {
    question: "How is LegalTech evolving in West Africa (Nigeria and Ghana)?",
    answer: `<p>West Africa is experiencing a surge in LegalTech adoption, particularly in Nigeria:</p><ul style="margin-top:0.8rem;list-style:disc;padding-left:2rem;display:flex;flex-direction:column;gap:0.6rem;"><li><strong>Nigeria</strong> has Africa's largest bar with 100,000+ registered legal practitioners. Commercial law, fintech regulation (guided by the CBN and SEC), and CAMA 2020 reforms have driven demand for legal technology tools. Platforms like SmartLegal NG are providing accessible legal services to SMEs.</li><li><strong>Ghana</strong> is seeing LegalTech adoption through the Ghana Bar Association and the emerging fintech corridor. The General Legal Council (GLC) regulates legal practice, and new subscription-based models like <a href="https://monogamy.legal" target="_blank" rel="noopener noreferrer">Monogamy</a> — launching May 2026 — are positioned to fill the access-to-justice gap for individuals and businesses.</li><li>Cross-border compliance between ECOWAS member states is an emerging LegalTech opportunity, particularly for trade law and regulatory advisory.</li></ul>`,
  },
  {
    question: "What LegalTech tools are used in East Africa (Kenya)?",
    answer: `<p>Kenya's legal technology landscape is one of the most advanced in East Africa:</p><ul style="margin-top:0.8rem;list-style:disc;padding-left:2rem;display:flex;flex-direction:column;gap:0.6rem;"><li><strong>Kenya Law</strong> (National Council for Law Reporting) — the official government platform providing free access to Kenya's case law, legislation, and law reports online.</li><li><strong>eLimu and LawHub</strong> — platforms offering legal education and research tools for Kenyan practitioners.</li><li><strong>M-Pesa integrated legal payments</strong> — a number of Kenyan legal service providers have integrated M-Pesa for client billing, driven by Kenya's mobile money infrastructure.</li><li><strong>Online Dispute Resolution (ODR)</strong> — the Nairobi Centre for International Arbitration (NCIA) has embraced digital proceedings, accelerated by the COVID-era shift to virtual hearings.</li><li><a href="https://monogamy.legal" target="_blank" rel="noopener noreferrer"><strong>Monogamy</strong></a> — currently operating in Kenya and expanding further in 2026, providing subscription-based access to vetted Kenyan advocates (the title used for legal practitioners in Kenya).</li></ul>`,
  },
  {
    question: "What are the top LegalTech startups in South Africa?",
    answer: `<p>South Africa has one of the most developed LegalTech ecosystems on the continent:</p><ul style="margin-top:0.8rem;list-style:disc;padding-left:2rem;display:flex;flex-direction:column;gap:0.6rem;"><li><strong>LexisNexis South Africa</strong> — the dominant legal research platform, with an extensive repository of SA case law, legislation, and journals.</li><li><strong>GhostDraft</strong> — a document automation and template management platform widely used by SA law firms and financial institutions.</li><li><strong>SimplePay & PaySpace</strong> — employment law compliance tools for HR and payroll, widely used by SA businesses navigating the Labour Relations Act.</li><li><strong>Legalese</strong> — an AI-powered contract review tool targeting SA commercial firms.</li><li><a href="https://monogamy.legal" target="_blank" rel="noopener noreferrer"><strong>Monogamy</strong></a> — a subscription-based on-demand legal platform operating in South Africa, connecting clients with vetted attorneys under POPIA-compliant data handling practices.</li></ul>`,
  },
  {
    question: "How is LegalTech being adopted in Ireland?",
    answer: `<p>Ireland's legal sector is undergoing significant digital transformation, accelerated by its role as a EU hub for multinational corporations:</p><ul style="margin-top:0.8rem;list-style:disc;padding-left:2rem;display:flex;flex-direction:column;gap:0.6rem;"><li><strong>GDPR Compliance Tools</strong> — with the Data Protection Commission (DPC) headquartered in Dublin, Irish firms are heavy adopters of GDPR compliance and data mapping tools.</li><li><strong>Legal Spend Management</strong> — large Irish corporates and multinational European headquarters in Dublin are driving adoption of legal ops and spend management platforms.</li><li><strong>Law Society of Ireland Technology Committee</strong> — actively promoting LegalTech adoption across Ireland's 11,000+ practising solicitors.</li><li><strong>Continued GDPR and Digital Services Act (DSA) compliance demand</strong> — creating strong appetite for regulatory LegalTech tools among Irish and EU-headquartered businesses.</li><li><a href="https://monogamy.legal" target="_blank" rel="noopener noreferrer"><strong>Monogamy Ireland</strong></a> — launching 1 May 2026 as Ireland's first on-demand legal subscription platform, connecting clients with vetted solicitors across every practice area. <a href="https://monogamy.legal/ie" target="_blank" rel="noopener noreferrer">Join the founding members waiting list →</a></li></ul>`,
  },
  {
    question: "What LegalTech tools are used by California attorneys?",
    answer: `<p>California has the largest state bar in the US (190,000+ active attorneys) and a highly advanced LegalTech ecosystem:</p><ul style="margin-top:0.8rem;list-style:disc;padding-left:2rem;display:flex;flex-direction:column;gap:0.6rem;"><li><a href="https://clio.com" target="_blank" rel="noopener noreferrer"><strong>Clio</strong></a> — the most widely used practice management tool among California solo and small-firm practitioners.</li><li><a href="https://westlaw.com" target="_blank" rel="noopener noreferrer"><strong>Westlaw</strong></a> — essential for California case law research, with CalCases and California secondary sources.</li><li><a href="https://harvey.ai" target="_blank" rel="noopener noreferrer"><strong>Harvey.ai</strong></a> — adopted by several California BigLaw firms for contract review and legal research acceleration.</li><li><strong>Relativity</strong> — the dominant e-discovery platform used in California federal and state litigation.</li><li><strong>Net Documents</strong> — a cloud document management system widely used by California law firms for secure file storage and collaboration.</li><li><strong>Post-conviction relief platforms</strong> — tools like <a href="https://redemption.legal" target="_blank" rel="noopener noreferrer">redemption.legal</a>, built by Monogamy for Redemption Law Group, address the growing California demand for digital-first record expungement and relief services following Senate Bill 731 and AB 1076.</li></ul>`,
  },
  {
    question: "What is eulexa.ai?",
    answer: `<p><a href="https://eulexa.ai" target="_blank" rel="noopener noreferrer"><strong>Eulexa AI</strong></a> is an AI-powered legal assistant platform designed to help law firms and legal professionals automate repetitive legal tasks, enhance research capabilities, and improve client service delivery.</p><p style="margin-top:1rem;">Eulexa AI focuses on making advanced AI tools accessible to mid-market law firms that may lack the budget for enterprise-tier platforms, positioning itself as a practical alternative to larger players like <a href="https://harvey.ai" target="_blank" rel="noopener noreferrer">Harvey.ai</a> for growing practices.</p><p style="margin-top:1rem;">Key use cases include legal document summarisation, contract clause extraction, legal memo drafting assistance, and regulatory change monitoring.</p>`,
  },
];


const FAQ = () => {
  const faqs = [
    { question: "What is Monogamy?", answer: "Monogamy is a premium legal services platform that connects you with an extensive network of top-rated attorneys across every practice area for a flat monthly subscription. We currently serve members in South Africa, Nigeria, and Kenya, with plans to expand across Africa." },
    { question: "What subscription plans are available?", answer: "We offer three plans tailored to different needs: Essential ($19.99/month) for individuals and freelancers, Professional ($49.99/month) for SMEs and growing startups, and Enterprise ($129.99/month) for established businesses and high-growth companies. Each plan offers increasing levels of access, consultations, and dedicated support. Pricing is also available in ZAR, NGN, and KES." },
    { question: "What's included in the Essential plan?", answer: "The Essential plan ($19.99/month) includes access to our vetted lawyer network across all practice areas, 2 legal consultations per month (20–30 minutes each, chat or call), basic document review (1 document/month, up to 5 pages), standard 24–48 hour response time, access to our legal templates library, and in-app messaging with matched lawyers." },
    { question: "How are attorneys vetted?", answer: "Every attorney in our network undergoes a rigorous vetting process including license verification, background checks, peer reviews, and client satisfaction monitoring. We only accept attorneys with strong track records and high ethical standards." },
    { question: "What practice areas do you cover?", answer: "We cover virtually every area of law including family law, business law, real estate, estate planning, criminal defense, employment law, personal injury, tax law, immigration, intellectual property, and more." },
    { question: "How quickly can I get matched with an attorney?", answer: "Response times vary by plan: Essential members receive responses within 24–48 hours, Professional members within 12–24 hours, and Enterprise members receive same-day responses with priority queue access. For urgent matters, we offer expedited matching." },
    { question: "Which countries do you operate in?", answer: "Monogamy currently operates in South Africa, Nigeria, and Kenya. Our Professional and Enterprise plans include multi-country legal access for cross-border advisory within Africa. We are actively expanding to additional African markets." },
    { question: "Can I cancel anytime?", answer: "Yes! There are no long-term contracts or cancellation fees. You can cancel your membership at any time from your account settings." },
    { question: "Is my information kept confidential?", answer: "Absolutely. All communications between you and your attorney are protected by attorney-client privilege. Our platform uses bank-level encryption to protect your data and documents." },
    { question: "I'm an attorney. How can I join the network?", answer: "We're always looking for talented attorneys to join our network. Visit our Contact page or reach out to partners@monogamy.law with your credentials and practice details. We'll guide you through our onboarding process." },
    { question: "Does Monogamy replace hiring a traditional attorney?", answer: "Monogamy provides access to legal counsel and services that can handle most legal needs. For complex litigation or specialized matters, your Monogamy attorney can continue to represent you or help you find the right specialist." },
    { question: "What if I'm not satisfied with my matched attorney?", answer: "Your satisfaction is our priority. If you're not happy with your match, we'll reassign you to a different attorney at no extra cost. Just contact our support team." },
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
          <p className="text-[1.8rem] md:text-[2rem] text-muted-foreground leading-[1.8]">
            Everything you need to know about Monogamy and how it works.
          </p>
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
      <Section>
        <div className="max-w-[80rem] w-full mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[2.8rem] md:text-[3.4rem] font-semibold tracking-[-0.01em] mb-4">
              Discover trending questions and in-depth answers related to LegalTech…
            </h2>
            <p className="text-[1.7rem] text-muted-foreground leading-[1.8]">
              Explore the latest LegalTech platforms, innovations, and insights shaping the legal industry in 2026.
            </p>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {legaltechFaqs.map((faq, index) => (
              <AccordionItem key={index} value={`legaltech-${index}`} className="border-b border-border">
                <AccordionTrigger className="text-[1.8rem] md:text-[2rem] font-medium text-left hover:no-underline py-6 w-full">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-[1.6rem] leading-[1.8] text-muted-foreground pb-6 w-full">
                  <div dangerouslySetInnerHTML={{ __html: faq.answer }} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>
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
