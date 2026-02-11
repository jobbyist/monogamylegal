import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    { question: "What is Monogamy?", answer: "Monogamy is a premium legal services platform that connects you with an extensive network of top-rated attorneys across every practice area for a flat monthly fee of $19.99. Think of it as having a law firm on retainer — without the retainer fees." },
    { question: "What's included in the $19.99/month subscription?", answer: "Your membership includes unlimited attorney consultations, document review and preparation, secure messaging with your matched attorney, priority case matching, and access to our 24/7 legal resources library." },
    { question: "How are attorneys vetted?", answer: "Every attorney in our network undergoes a rigorous vetting process including license verification, background checks, peer reviews, and client satisfaction monitoring. We only accept attorneys with strong track records and high ethical standards." },
    { question: "What practice areas do you cover?", answer: "We cover virtually every area of law including family law, business law, real estate, estate planning, criminal defense, employment law, personal injury, tax law, immigration, intellectual property, and more." },
    { question: "How quickly can I get matched with an attorney?", answer: "Most members are matched with a qualified attorney within 2 hours of submitting their request. For urgent matters, we offer expedited matching that can connect you within 30 minutes." },
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
