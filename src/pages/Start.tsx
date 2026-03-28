import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AppearOnScroll from "@/components/AppearOnScroll";
import SEO from "@/components/SEO";
import { PAGE_SEO } from "@/lib/seo";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle } from "lucide-react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xqaqkwzb";

const Start = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    plan: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
          phone: formData.phone,
          country: formData.country,
          plan: formData.plan,
          company: formData.company,
          message: formData.message,
          _subject: "New Membership Enquiry — Monogamy",
        }),
      });
      if (response.ok) {
        setSubmitted(true);
        toast({ title: "Thanks! We'll be in touch shortly.", description: "A member of our team will contact you within 24 hours." });
      } else {
        toast({ title: "Something went wrong.", description: "Please try again or email us at hello@monogamy.law.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Network error.", description: "Please try again or email us at hello@monogamy.law.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const inputClass = "w-full text-[1.6rem] leading-[2.2rem] h-[52px] px-4 bg-card border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground";

  return (
    <div className="min-h-screen bg-background">
      <SEO {...PAGE_SEO.start} />
      <Header />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-primary opacity-[0.03]" />
        <div className="box-content max-w-[138rem] px-6 md:px-[calc(18vw-10rem)] mx-auto py-[6rem] md:py-[10rem]">
          <div className="max-w-[120rem] mx-auto flex flex-col lg:flex-row gap-16 items-start">

            {/* Left column */}
            <div className="w-full lg:w-[44%] lg:sticky lg:top-[10rem]">
              <AppearOnScroll delay={0}>
                <p className="text-[1.4rem] font-semibold uppercase tracking-[0.2em] text-primary mb-4">Get Started</p>
              </AppearOnScroll>
              <AppearOnScroll delay={100}>
                <h1 className="text-[3.4rem] md:text-[4.4rem] font-bold tracking-[-0.02em] leading-[1.15] mb-6">
                  Start your Monogamy membership.
                </h1>
              </AppearOnScroll>
              <AppearOnScroll delay={200}>
                <p className="text-[1.8rem] text-muted-foreground leading-[1.7] mb-8">
                  Tell us a bit about yourself and the plan you're interested in. Our team will reach out within 24 hours to get you set up.
                </p>
              </AppearOnScroll>
              <AppearOnScroll delay={300}>
                <div className="space-y-4">
                  {[
                    "Access to 500+ vetted attorneys",
                    "Coverage in South Africa, Nigeria & Kenya",
                    "Flexible plans from $19.99/month",
                    "Cancel anytime — no contracts",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-[1.6rem]">{item}</span>
                    </div>
                  ))}
                </div>
              </AppearOnScroll>
            </div>

            {/* Right column — form */}
            <div className="w-full lg:w-[56%]">
              {submitted ? (
                <AppearOnScroll delay={0}>
                  <div className="bg-card border border-border rounded-2xl p-12 text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-[2.8rem] font-bold mb-4">You're on your way!</h2>
                    <p className="text-[1.8rem] text-muted-foreground leading-[1.7]">
                      Thanks for reaching out. A member of our team will contact you at <strong>{formData.email}</strong> within 24 hours.
                    </p>
                  </div>
                </AppearOnScroll>
              ) : (
                <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8 md:p-12 space-y-6">
                  <AppearOnScroll delay={0}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[1.5rem] font-medium mb-2">First Name <span className="text-primary">*</span></label>
                        <input name="firstName" type="text" value={formData.firstName} onChange={handleChange} required className={inputClass} placeholder="First name" />
                      </div>
                      <div>
                        <label className="block text-[1.5rem] font-medium mb-2">Last Name <span className="text-primary">*</span></label>
                        <input name="lastName" type="text" value={formData.lastName} onChange={handleChange} required className={inputClass} placeholder="Last name" />
                      </div>
                    </div>
                  </AppearOnScroll>

                  <AppearOnScroll delay={75}>
                    <div>
                      <label className="block text-[1.5rem] font-medium mb-2">Email Address <span className="text-primary">*</span></label>
                      <input name="email" type="email" value={formData.email} onChange={handleChange} required className={inputClass} placeholder="you@example.com" />
                    </div>
                  </AppearOnScroll>

                  <AppearOnScroll delay={150}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[1.5rem] font-medium mb-2">Phone Number</label>
                        <input name="phone" type="tel" value={formData.phone} onChange={handleChange} className={inputClass} placeholder="+27 / +234 / +254" />
                      </div>
                      <div>
                        <label className="block text-[1.5rem] font-medium mb-2">Country <span className="text-primary">*</span></label>
                        <select name="country" value={formData.country} onChange={handleChange} required className={inputClass + " cursor-pointer"}>
                          <option value="">Select country</option>
                          <option value="South Africa">South Africa</option>
                          <option value="Nigeria">Nigeria</option>
                          <option value="Kenya">Kenya</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                  </AppearOnScroll>

                  <AppearOnScroll delay={225}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[1.5rem] font-medium mb-2">Plan of Interest <span className="text-primary">*</span></label>
                        <select name="plan" value={formData.plan} onChange={handleChange} required className={inputClass + " cursor-pointer"}>
                          <option value="">Select a plan</option>
                          <option value="Essential ($19.99/mo)">Essential — $19.99/mo</option>
                          <option value="Professional ($49.99/mo)">Professional — $49.99/mo</option>
                          <option value="Enterprise ($129.99/mo)">Enterprise — $129.99/mo</option>
                          <option value="Not sure yet">Not sure yet</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[1.5rem] font-medium mb-2">Company / Organisation</label>
                        <input name="company" type="text" value={formData.company} onChange={handleChange} className={inputClass} placeholder="Optional" />
                      </div>
                    </div>
                  </AppearOnScroll>

                  <AppearOnScroll delay={300}>
                    <div>
                      <label className="block text-[1.5rem] font-medium mb-2">Tell us about your legal needs</label>
                      <textarea name="message" value={formData.message} onChange={handleChange} rows={5} className="w-full text-[1.6rem] leading-[2.2rem] p-4 bg-background border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground resize-y" placeholder="Brief description of your situation or what you're looking to achieve..." />
                    </div>
                  </AppearOnScroll>

                  <AppearOnScroll delay={375}>
                    <button type="submit" disabled={isSubmitting} className="w-full text-[1.8rem] font-semibold h-[56px] bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                      {isSubmitting ? "Submitting…" : "Submit Enquiry"}
                    </button>
                    <p className="text-[1.3rem] text-muted-foreground text-center mt-3">No payment required now. We'll guide you through the next steps.</p>
                  </AppearOnScroll>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Start;
