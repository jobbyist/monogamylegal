import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AppearOnScroll from "@/components/AppearOnScroll";
import SEO from "@/components/SEO";
import { PAGE_SEO } from "@/lib/seo";
import { useToast } from "@/hooks/use-toast";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xqaqkwzb";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          message: formData.message,
        }),
      });
      if (response.ok) {
        toast({ title: "Message sent!", description: "Our team will get back to you within 24 hours." });
        setFormData({ firstName: "", lastName: "", email: "", message: "" });
      } else {
        toast({ title: "Something went wrong.", description: "Please try again or email us at hello@monogamy.law.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Network error.", description: "Please try again or email us at hello@monogamy.law.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const inputClass = "w-full text-[1.8rem] leading-[2.4rem] h-[60px] px-4 bg-card border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground";

  return (
    <div className="min-h-screen bg-background">
      <SEO {...PAGE_SEO.contact} />
      <Header />
      <div className="relative w-full pb-12 md:pb-20 lg:pb-32 px-6 md:px-[calc(18vw-10rem)]">
        <div className="max-w-[138rem] mx-auto flex flex-col items-center">
          <div className="relative flex items-start justify-between flex-col lg:flex-row lg:w-full gap-12 lg:gap-16">
            <div className="w-full lg:w-1/2 py-[3rem] md:py-[5rem] lg:py-[8rem]">
              <AppearOnScroll delay={0}><div className="text-[56px] mb-6">⚖️</div></AppearOnScroll>
              <AppearOnScroll delay={100}>
                <h1 className="text-[3.4rem] md:text-[4.2rem] lg:text-[5rem] font-semibold tracking-[-0.01em] leading-[1.2] mb-[3rem]">
                  Get in touch with our team.
                </h1>
              </AppearOnScroll>
              <AppearOnScroll delay={200}>
                <p className="text-[1.8rem] leading-[1.8] text-muted-foreground mb-[4rem]">
                  Whether you're a prospective member, an attorney looking to join our network, or have a general inquiry — we're here to help.
                </p>
              </AppearOnScroll>
              <AppearOnScroll delay={300}>
                <div className="space-y-3 mb-8">
                  <p className="text-[1.8rem]"><a href="mailto:hello@monogamy.law" className="hover:opacity-60 transition-opacity">hello@monogamy.law</a></p>
                </div>
              </AppearOnScroll>
            </div>

            <div className="w-full lg:w-[44%] max-w-[80rem] py-[3rem] md:py-[5rem] lg:py-[8rem]">
              <form onSubmit={handleSubmit} className="space-y-6">
                <AppearOnScroll delay={0}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[1.6rem] mb-2">First Name <span className="text-muted-foreground">(required)</span></label>
                      <input name="firstName" type="text" value={formData.firstName} onChange={handleChange} required className={inputClass} placeholder="First Name" />
                    </div>
                    <div>
                      <label className="block text-[1.6rem] mb-2">Last Name</label>
                      <input name="lastName" type="text" value={formData.lastName} onChange={handleChange} className={inputClass} placeholder="Last Name" />
                    </div>
                  </div>
                </AppearOnScroll>
                <AppearOnScroll delay={150}>
                  <div>
                    <label className="block text-[1.6rem] mb-2">Email <span className="text-muted-foreground">(required)</span></label>
                    <input name="email" type="email" value={formData.email} onChange={handleChange} required className={inputClass} placeholder="Email" />
                  </div>
                </AppearOnScroll>
                <AppearOnScroll delay={300}>
                  <div>
                    <label className="block text-[1.6rem] mb-2">Message <span className="text-muted-foreground">(required)</span></label>
                    <textarea name="message" value={formData.message} onChange={handleChange} required rows={8} className="w-full text-[1.8rem] leading-[2.4rem] p-4 bg-card border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground resize-y" placeholder="Tell us how we can help..." />
                  </div>
                </AppearOnScroll>
                <AppearOnScroll delay={450}>
                  <button type="submit" disabled={isSubmitting} className="text-[1.8rem] font-medium h-[60px] px-12 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </AppearOnScroll>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;

