import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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
