import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import AppearOnScroll from "@/components/AppearOnScroll";
import PartnerCarousel from "@/components/PartnerCarousel";
import AudioPlayer, { AudioEpisode } from "@/components/AudioPlayer";
import SEO from "@/components/SEO";
import { PAGE_SEO } from "@/lib/seo";
import { Shield, Users, Scale, Clock, Star, Briefcase, Heart, Home, FileText, Gavel, DollarSign, X, Mail, Lock, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";


const AUTH_KEY = "monogamy_stream_user";

function setStoredUser(user: { name: string; email: string }) {
  try {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  } catch {
    // ignore
  }
}

interface AuthModalProps {
  onClose: () => void;
  onAuth: (user: { name: string; email: string }) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose, onAuth }) => {
  const { toast } = useToast();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const inputClass =
    "w-full text-[1.6rem] h-[48px] px-4 bg-background border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    if (mode === "signup" && !name) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const user = { name: mode === "signup" ? name : email.split("@")[0], email };
    setStoredUser(user);
    onAuth(user);
    toast({ title: mode === "login" ? "Welcome back!" : "Account created!", description: "You now have access to The Monologue." });
    setLoading(false);
  };

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onEsc);
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onEsc);
      document.body.style.overflow = original;
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-[44rem] p-8 md:p-10">
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors" aria-label="Close">
          <X className="w-5 h-5" />
        </button>
        <div className="text-center mb-8">
          <div className="text-[4rem] mb-3">🎙️</div>
          <h2 className="text-[2.4rem] font-bold mb-2">{mode === "login" ? "Sign in to listen" : "Create an account"}</h2>
          <p className="text-[1.5rem] text-muted-foreground">Full episodes of The Monologue are available to members only.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && <div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><input type="text" value={name} onChange={(e) => setName(e.target.value)} required className={inputClass + " pl-10"} placeholder="Full name" /></div>}
          <div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className={inputClass + " pl-10"} placeholder="Email address" /></div>
          <div className="relative"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className={inputClass + " pl-10"} placeholder="Password" /></div>
          <button type="submit" disabled={loading} className="w-full h-[52px] text-[1.7rem] font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2">
            {loading ? "Please wait…" : mode === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>
        <p className="text-center text-[1.4rem] text-muted-foreground mt-6">
          {mode === "login" ? <>Don't have an account? <button onClick={() => setMode("signup")} className="text-primary hover:underline font-medium">Sign up</button></> : <>Already have an account? <button onClick={() => setMode("login")} className="text-primary hover:underline font-medium">Sign in</button></>}
        </p>
      </div>
    </div>
  );
};

const practiceAreas = [
  { icon: Briefcase, title: "Business Law", desc: "Formation, contracts, IP, and compliance" },
  { icon: Heart, title: "Family Law", desc: "Divorce, custody, adoption, and prenups" },
  { icon: Home, title: "Real Estate", desc: "Transactions, disputes, and landlord-tenant" },
  { icon: FileText, title: "Estate Planning", desc: "Wills, trusts, and probate" },
  { icon: Gavel, title: "Criminal Defense", desc: "Misdemeanors, felonies, and DUI" },
  { icon: DollarSign, title: "Tax Law", desc: "Planning, disputes, and audit defense" },
  { icon: Scale, title: "Employment Law", desc: "Discrimination, wages, and wrongful termination" },
  { icon: Shield, title: "Personal Injury", desc: "Accidents, malpractice, and liability" },
];

const steps = [
  { num: "01", title: "Subscribe", desc: "Join Monogamy for $19.99/month and unlock unlimited access to our legal network." },
  { num: "02", title: "Match", desc: "Tell us about your legal needs and we'll connect you with the right attorney." },
  { num: "03", title: "Consult", desc: "Schedule consultations, share documents, and communicate securely." },
  { num: "04", title: "Resolve", desc: "Work with your attorney to resolve your matter with confidence." },
];

const testimonials = [
  { name: "Sarah M.", role: "Small Business Owner", quote: "Monogamy saved me thousands in legal fees. I got expert contract review within 24 hours.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80" },
  { name: "David R.", role: "Real Estate Investor", quote: "Having an attorney on-demand for my property transactions has been a game-changer.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80" },
  { name: "Maria L.", role: "Freelance Designer", quote: "I finally feel protected with proper contracts. The platform is incredibly easy to use.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80" },
];

const THUMBNAIL = "https://storage.googleapis.com/gpt-engineer-file-uploads/iy019M6SqjMXyibDc8dgs2v9PSx1/uploads/1770788009856-MONOGAMY_LOGO_PACK_AND_MEDIA_ASSETS.png";

const getFeaturedEpisodes = (onLoginRequired: () => void): AudioEpisode[] => [
  {
    id: "ep2",
    title: "Ep. 2: The State of Legal Access in Africa - What's Changing in 2026 (Preview)",
    description: "The second episode of our mini podcast series, The Monologue, explores how legal access across Africa is evolving in 2026. We examine barriers historically faced by individuals and SMEs, including cost, geographic access, and lack of digitization. We then explore key trends reshaping legal accessibility: the expansion of digital legal platforms, regulatory reforms in major African markets, mobile‑first legal solutions, and the role of legal education initiatives. This narrative draws on editorial insights, expert analysis, and regional case studies from South Africa, Nigeria, and Kenya.",
    publishDate: "Published on 2 Mar 2026",
    duration: "24:38",
    thumbnailUrl: THUMBNAIL,
    isPreview: true,
  },
  {
    id: "ep1",
    title: "Episode 1: From Billable Hours to Subscription Law: The Shift Reshaping Legal Services (Preview)",
    description: "Episode 1 breaks down the transformation of legal pricing models, from traditional billable hours to subscription‑based access. We discuss why clients are demanding pricing predictability, how law firms are responding, and what subscription models mean for legal practices in Africa. This episode draws on interviews with legal innovators, data on client preferences, and examples of successful adoption internationally. It also previews how platforms like Monogamy are helping bridge traditional practice and modern client expectations.",
    publishDate: "Published on 2 Feb 2026",
    duration: "31:15",
    thumbnailUrl: THUMBNAIL,
    isPreview: true,
  },
  {
    id: "news1",
    title: "Architects of Law: The Rise of the Legal Engineer In The Era of Artificial Intelligence (AI)",
    description: (
      <>
        This featured audio summary features original commentary based on reporting from the Legaltech News publication at Law.com.

Read the full article titled “Demand for Legal Engineers Skyrockets in the AI Age“ on <a href="https://www.law.com/legaltechnews/2026/03/26/demand-for-legal-engineers-skyrockets-in-the-ai-age/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Law.com</a>,

OR

<button type="button" onClick={onLoginRequired} className="text-primary hover:underline">Login/Sign Up</button> to listen to the full episode.
      </>
    ),
    publishDate: "Published on 27 Mar 2026",
    duration: "12:04",
    thumbnailUrl: THUMBNAIL,
    audioUrl: "/stream/audio1.mp3",
    isFeatured: true,
  },
  {
    id: "news2",
    title: "Law Firms Rethink Billing Models as Clients Push Back on Costs (Read full story at Law.com)",
    description: "An audio summary of how clients' demands for cost transparency and predictability are forcing law firms to rethink traditional billing practices. We highlight emerging alternatives, client expectations, and examples of early adopters.",
    publishDate: "Published on 20 Mar 2026",
    duration: "9:47",
    thumbnailUrl: THUMBNAIL,
  },
];

const Blog = () => {
  const [showModal, setShowModal] = useState(false);

  const handleAuth = () => {
    setShowModal(false);
  };

  const featuredEpisodes = getFeaturedEpisodes(() => setShowModal(true));

  return (
    <div className="min-h-screen bg-background">
      <SEO {...PAGE_SEO.home} />
      <Header />

      {showModal && <AuthModal onClose={() => setShowModal(false)} onAuth={handleAuth} />}

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-primary opacity-[0.03]" />
        <div className="box-content max-w-[138rem] px-6 md:px-[calc(18vw-10rem)] mx-auto py-[6rem] md:py-[10rem] lg:py-[14rem]">
          <div className="max-w-[80rem]">
            <AppearOnScroll delay={0}>
              <p className="text-[1.5rem] font-semibold uppercase tracking-[0.2em] text-primary mb-6">Legal Services Reimagined</p>
            </AppearOnScroll>
            <AppearOnScroll delay={100}>
              <h1 className="text-[3.6rem] md:text-[5rem] lg:text-[7rem] font-bold tracking-[-0.02em] leading-[1.1] mb-8">
                Your on-demand legal team —{" "}
                <span className="text-primary">without the overhead.</span>
              </h1>
            </AppearOnScroll>
            <AppearOnScroll delay={200}>
              <p className="text-[1.8rem] md:text-[2.2rem] leading-[1.7] text-muted-foreground mb-10 max-w-[60rem]">
                Access an extensive network of top-rated legal practitioners across every practice area for just <strong className="text-foreground">$19.99/month</strong>.
              </p>
            </AppearOnScroll>
            <AppearOnScroll delay={300}>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/pricing"
                  className="inline-block px-10 py-4 text-[1.7rem] font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                >
                  Start Your Membership
                </Link>
                <Link
                  to="/how-it-works"
                  className="inline-block px-10 py-4 text-[1.7rem] font-semibold border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  Learn More
                </Link>
              </div>
            </AppearOnScroll>
          </div>
        </div>
      </section>

      {/* SEO addition: entity-rich, LLM-friendly context blocks with internal links. */}
      <Section>
        <div className="w-full max-w-[110rem] mx-auto grid gap-6 md:grid-cols-3">
          <article className="rounded-xl border border-border p-6 bg-card">
            <h2 className="text-[2.2rem] font-semibold mb-3">Who this is for</h2>
            <p className="text-[1.6rem] text-muted-foreground leading-[1.8]">
              Monogamy is an on-demand legal services platform in South Africa, Nigeria, and Kenya for founders, families, and teams that need fast legal answers without legacy law-firm overhead.
            </p>
          </article>
          <article className="rounded-xl border border-border p-6 bg-card">
            <h2 className="text-[2.2rem] font-semibold mb-3">How Monogamy works</h2>
            <p className="text-[1.6rem] text-muted-foreground leading-[1.8] mb-4">
              You subscribe, describe your legal need, and get matched with a vetted attorney. Review our{" "}
              <Link to="/how-it-works" className="text-primary hover:underline">step-by-step workflow</Link>{" "}
              and compare{" "}
              <Link to="/pricing" className="text-primary hover:underline">pricing plans and features</Link>.
            </p>
          </article>
          <article className="rounded-xl border border-border p-6 bg-card">
            <h2 className="text-[2.2rem] font-semibold mb-3">Legal services available in South Africa</h2>
            <p className="text-[1.6rem] text-muted-foreground leading-[1.8]">
              We support legal services South Africa users search for, including guidance on law firms in Sandton, affordable lawyers in Cape Town, and access to best law firms in Gauteng via our vetted{" "}
              <Link to="/practice-areas" className="text-primary hover:underline">practice area network</Link>.
            </p>
          </article>
        </div>
      </Section>

      {/* Partner Carousel */}
      <Section>
        <AppearOnScroll delay={0}>
          <PartnerCarousel />
        </AppearOnScroll>
      </Section>

      {/* Trust Bar */}
      <Section>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center w-full max-w-[100rem] mx-auto">
          {[
            { icon: Shield, label: "Vetted Attorneys", value: "500+" },
            { icon: Users, label: "Active Members", value: "4,000+" },
            { icon: Star, label: "Avg. Rating", value: "4.9/5" },
            { icon: Clock, label: "Avg. Response", value: "<2 hrs" },
          ].map((stat, i) => (
            <AppearOnScroll key={i} delay={i * 100}>
              <div className="flex flex-col items-center gap-2">
                <stat.icon className="w-8 h-8 text-primary mb-2" />
                <p className="text-[2.8rem] font-bold text-foreground">{stat.value}</p>
                <p className="text-[1.4rem] text-muted-foreground">{stat.label}</p>
              </div>
            </AppearOnScroll>
          ))}
        </div>
      </Section>

      {/* Practice Areas */}
      <Section>
        <div className="w-full max-w-[110rem] mx-auto">
          <AppearOnScroll delay={0}>
            <div>
              <p className="text-[1.4rem] font-semibold uppercase tracking-[0.2em] text-primary mb-4 text-center">Practice Areas</p>
              <h2 className="text-[2.8rem] md:text-[3.6rem] font-bold text-center mb-12">
                Legal expertise across every domain
              </h2>
            </div>
          </AppearOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {practiceAreas.map((area, i) => (
              <AppearOnScroll key={i} delay={i * 75}>
                <div className="p-6 rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all group cursor-pointer">
                  <area.icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-[1.8rem] font-semibold mb-2">{area.title}</h3>
                  <p className="text-[1.4rem] text-muted-foreground leading-[1.6]">{area.desc}</p>
                </div>
              </AppearOnScroll>
            ))}
          </div>
        </div>
      </Section>

      {/* How It Works */}
      <section className="bg-muted">
        <Section>
          <div className="w-full max-w-[100rem] mx-auto">
            <AppearOnScroll delay={0}>
              <div>
                <p className="text-[1.4rem] font-semibold uppercase tracking-[0.2em] text-primary mb-4 text-center">How It Works</p>
                <h2 className="text-[2.8rem] md:text-[3.6rem] font-bold text-center mb-12">
                  Four simple steps to legal peace of mind
                </h2>
              </div>
            </AppearOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, i) => (
                <AppearOnScroll key={i} delay={i * 150}>
                  <div className="text-center">
                    <span className="text-[4rem] font-bold text-primary/20">{step.num}</span>
                    <h3 className="text-[2rem] font-semibold mt-2 mb-3">{step.title}</h3>
                    <p className="text-[1.5rem] text-muted-foreground leading-[1.7]">{step.desc}</p>
                  </div>
                </AppearOnScroll>
              ))}
            </div>
          </div>
        </Section>
      </section>

      {/* Monogamy Brief — Podcast Section */}
      <Section>
        <div className="w-full max-w-[110rem] mx-auto">
          <AppearOnScroll delay={0}>
            <div className="text-center mb-10">
              <p className="text-[1.4rem] font-semibold uppercase tracking-[0.2em] text-primary mb-4">Law, Insights, and Perspective - Curated.</p>
              <h2 className="text-[2.8rem] md:text-[3.6rem] font-bold mb-4">
                The Monologue
              </h2>
              <p className="text-[1.7rem] text-muted-foreground max-w-[55rem] mx-auto leading-[1.7]">
                Also available on Apple Podcasts and Spotify.
              </p>
            </div>
          </AppearOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredEpisodes.map((episode, i) => (
              <AppearOnScroll key={episode.id} delay={i * 100}>
                <AudioPlayer episode={episode} onLoginRequired={() => setShowModal(true)} />
              </AppearOnScroll>
            ))}
          </div>

          <AppearOnScroll delay={400}>
            <div className="text-center mt-10">
              <Link
                to="/stream"
                className="inline-block px-10 py-4 text-[1.7rem] font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
              >
                Stream Full Episodes
              </Link>
            </div>
          </AppearOnScroll>
        </div>
      </Section>

      {/* Testimonials */}
      <section className="bg-muted">
        <Section>
          <div className="w-full max-w-[110rem] mx-auto">
            <AppearOnScroll delay={0}>
              <div>
                <p className="text-[1.4rem] font-semibold uppercase tracking-[0.2em] text-primary mb-4 text-center">Testimonials</p>
                <h2 className="text-[2.8rem] md:text-[3.6rem] font-bold text-center mb-12">
                  Trusted by thousands
                </h2>
              </div>
            </AppearOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <AppearOnScroll key={i} delay={i * 150}>
                  <div className="bg-card p-8 rounded-xl border border-border">
                    <div className="flex items-center gap-4 mb-6">
                      <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                      <div>
                        <p className="text-[1.6rem] font-semibold">{t.name}</p>
                        <p className="text-[1.3rem] text-muted-foreground">{t.role}</p>
                      </div>
                    </div>
                    <p className="text-[1.6rem] leading-[1.7] text-muted-foreground italic">"{t.quote}"</p>
                  </div>
                </AppearOnScroll>
              ))}
            </div>
          </div>
        </Section>
      </section>

      {/* CTA */}
      <Section>
        <div className="w-full max-w-[80rem] mx-auto text-center">
          <AppearOnScroll delay={0}>
            <div>
              <h2 className="text-[2.8rem] md:text-[3.6rem] font-bold mb-6">
                Ready to take control of your legal needs?
              </h2>
              <p className="text-[1.8rem] text-muted-foreground mb-8 max-w-[55rem] mx-auto">
                Join Monogamy today and get instant access to premium legal services at a fraction of traditional costs.
              </p>
              <Link
                to="/pricing"
                className="inline-block px-12 py-4 text-[1.7rem] font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
              >
                Get Started — $19.99/mo
              </Link>
            </div>
          </AppearOnScroll>
        </div>
      </Section>

      <Footer />
    </div>
  );
};

export default Blog;
