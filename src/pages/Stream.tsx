import { useState, useEffect } from "react";
import { X, Mail, Lock, User } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import AppearOnScroll from "@/components/AppearOnScroll";
import AudioPlayer, { AudioEpisode } from "@/components/AudioPlayer";
import { useToast } from "@/hooks/use-toast";

// ─── Auth helpers ──────────────────────────────────────────────────────────
const AUTH_KEY = "monogamy_stream_user";

function getStoredUser(): { name: string; email: string } | null {
  try {
    const v = localStorage.getItem(AUTH_KEY);
    return v ? JSON.parse(v) : null;
  } catch {
    return null;
  }
}

function setStoredUser(user: { name: string; email: string }) {
  try {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  } catch {
    // ignore
  }
}

function clearStoredUser() {
  try {
    localStorage.removeItem(AUTH_KEY);
  } catch {
    // ignore
  }
}

// ─── Episode data ──────────────────────────────────────────────────────────
const THUMBNAIL =
  "https://storage.googleapis.com/gpt-engineer-file-uploads/iy019M6SqjMXyibDc8dgs2v9PSx1/uploads/1770788009856-MONOGAMY_LOGO_PACK_AND_MEDIA_ASSETS.png";

const allEpisodes: AudioEpisode[] = [
  // Featured episodes (same 4 as homepage)
  {
    id: "ep2",
    title: "Ep. 2: The State of Legal Access in Africa - What's Changing in 2026 (Preview)",
    description:
      "The second episode of our mini podcast series, The Monologue, explores how legal access across Africa is evolving in 2026. We examine barriers historically faced by individuals and SMEs, including cost, geographic access, and lack of digitization. We then explore key trends reshaping legal accessibility: the expansion of digital legal platforms, regulatory reforms in major African markets, mobile‑first legal solutions, and the role of legal education initiatives.",
    publishDate: "Published on 2 Mar 2026",
    duration: "24:38",
    thumbnailUrl: THUMBNAIL,
    isPreview: true,
  },
  {
    id: "ep1",
    title: "Episode 1: From Billable Hours to Subscription Law: The Shift Reshaping Legal Services",
    description:
      "Episode 1 breaks down the transformation of legal pricing models, from traditional billable hours to subscription‑based access. We discuss why clients are demanding pricing predictability, how law firms are responding, and what subscription models mean for legal practices in Africa.",
    publishDate: "Published on 2 Feb 2026",
    duration: "31:15",
    thumbnailUrl: THUMBNAIL,
  },
  {
    id: "news1",
    title: "Big Law Faces AI Disruption Faster Than Expected (Read full story at Law.com)",
    description:
      "This featured audio summary from Law.com breaks down how artificial intelligence is impacting large law firms at an accelerated pace. We cover technological adoption trends, areas of disruption like document review and due diligence, ethical and regulatory questions, and how firms are restructuring practice workflows.",
    publishDate: "Published on 27 Mar 2026",
    duration: "12:04",
    thumbnailUrl: THUMBNAIL,
  },
  {
    id: "news2",
    title: "Law Firms Rethink Billing Models as Clients Push Back on Costs (Read full story at Law.com)",
    description:
      "An audio summary of how clients' demands for cost transparency and predictability are forcing law firms to rethink traditional billing practices. We highlight emerging alternatives, client expectations, and examples of early adopters.",
    publishDate: "Published on 20 Mar 2026",
    duration: "9:47",
    thumbnailUrl: THUMBNAIL,
  },
  // Additional episodes
  {
    id: "ep3",
    title: "Ep. 3: Building a Legal Startup in Africa — Lessons from the Frontlines",
    description:
      "A deep-dive conversation with founders building legal technology companies across the continent. We explore fundraising challenges, regulatory hurdles, and the unique opportunity that Africa's underserved legal market presents.",
    publishDate: "Published on 5 Mar 2026",
    duration: "38:22",
    thumbnailUrl: THUMBNAIL,
  },
  {
    id: "ep4",
    title: "Ep. 4: Contract Law Essentials Every SME Owner Should Know",
    description:
      "Our most practical episode yet. We walk through the key clauses every business owner should understand, common mistakes in commercial contracts, and how to protect yourself before signing.",
    publishDate: "Published on 12 Mar 2026",
    duration: "27:50",
    thumbnailUrl: THUMBNAIL,
  },
  {
    id: "ep5",
    title: "Ep. 5: Intellectual Property in the Digital Age — Protecting Your Brand in Africa",
    description:
      "From trademarks to copyright and trade secrets, this episode covers what African entrepreneurs need to know about protecting their intellectual assets in a rapidly digitizing market.",
    publishDate: "Published on 19 Mar 2026",
    duration: "33:11",
    thumbnailUrl: THUMBNAIL,
  },
  {
    id: "ep6",
    title: "Ep. 6: Employment Law Update — Key Changes for Employers in 2026",
    description:
      "A timely overview of recent employment law developments across South Africa, Nigeria, and Kenya. We cover remote work policies, termination procedures, and employee protections that every employer should be aware of.",
    publishDate: "Published on 26 Mar 2026",
    duration: "29:05",
    thumbnailUrl: THUMBNAIL,
  },
  {
    id: "ep7",
    title: "Ep. 7: Understanding Real Estate Transactions — A Legal Perspective",
    description:
      "Navigating property deals in Africa can be complex. This episode demystifies the legal steps involved in buying, selling, and leasing real estate, with specific guidance for South Africa, Nigeria, and Kenya.",
    publishDate: "Published on 2 Apr 2026",
    duration: "35:40",
    thumbnailUrl: THUMBNAIL,
  },
  {
    id: "ep8",
    title: "Ep. 8: Family Law Q&A — Divorce, Custody, and What You Need to Know",
    description:
      "Answering your most-asked questions about family law. We address how divorce proceedings work across our three operating jurisdictions, custody considerations, and practical advice for navigating emotionally charged legal situations.",
    publishDate: "Published on 9 Apr 2026",
    duration: "41:18",
    thumbnailUrl: THUMBNAIL,
  },
  {
    id: "ep9",
    title: "Ep. 9: The Future of Legal Services — AI, Automation, and the Human Element",
    description:
      "Our forward-looking episode explores how technology is reshaping the legal profession. We discuss where AI adds value, where human judgment remains essential, and what the attorney of 2030 will look like.",
    publishDate: "Published on 16 Apr 2026",
    duration: "44:02",
    thumbnailUrl: THUMBNAIL,
  },
];

// ─── Auth Modal ─────────────────────────────────────────────────────────────
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
    // Simulate auth with a short delay — in production, replace with a real auth call
    await new Promise((r) => setTimeout(r, 800));
    const user = { name: mode === "signup" ? name : email.split("@")[0], email };
    setStoredUser(user);
    onAuth(user);
    toast({ title: mode === "login" ? "Welcome back!" : "Account created!", description: "You now have access to The Monologue." });
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-card border border-border rounded-2xl shadow-2xl w-full max-w-[44rem] p-8 md:p-10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-8">
          <div className="text-[4rem] mb-3">🎙️</div>
          <h2 className="text-[2.4rem] font-bold mb-2">
            {mode === "login" ? "Sign in to listen" : "Create an account"}
          </h2>
          <p className="text-[1.5rem] text-muted-foreground">
            Full episodes of The Monologue are available to members only.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={inputClass + " pl-10"}
                placeholder="Full name"
              />
            </div>
          )}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={inputClass + " pl-10"}
              placeholder="Email address"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={inputClass + " pl-10"}
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full h-[52px] text-[1.7rem] font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {loading ? "Please wait…" : mode === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <p className="text-center text-[1.4rem] text-muted-foreground mt-6">
          {mode === "login" ? (
            <>
              Don't have an account?{" "}
              <button onClick={() => setMode("signup")} className="text-primary hover:underline font-medium">
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button onClick={() => setMode("login")} className="text-primary hover:underline font-medium">
                Sign in
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

// ─── Stream Page ────────────────────────────────────────────────────────────
const Stream = () => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  const handleLoginRequired = () => {
    setShowModal(true);
  };

  const handleAuth = (newUser: { name: string; email: string }) => {
    setUser(newUser);
    setShowModal(false);
  };

  const handleSignOut = () => {
    clearStoredUser();
    setUser(null);
  };

  const isLoggedIn = !!user;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {showModal && (
        <AuthModal onClose={() => setShowModal(false)} onAuth={handleAuth} />
      )}

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-primary opacity-[0.03]" />
        <div className="box-content max-w-[138rem] px-6 md:px-[calc(18vw-10rem)] mx-auto py-[6rem] md:py-[8rem]">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <AppearOnScroll delay={0}>
                <p className="text-[1.4rem] font-semibold uppercase tracking-[0.2em] text-primary mb-4">The Monologue</p>
              </AppearOnScroll>
              <AppearOnScroll delay={100}>
                <h1 className="text-[3.4rem] md:text-[5rem] font-bold tracking-[-0.02em] leading-[1.1] mb-4">
                  Law. Insights. Perspective.
                </h1>
              </AppearOnScroll>
              <AppearOnScroll delay={200}>
                <p className="text-[1.8rem] text-muted-foreground leading-[1.7] max-w-[55rem]">
                  Full episodes of The Monologue — Monogamy's original audio series on legal access, innovation, and practice across Africa.
                </p>
              </AppearOnScroll>
            </div>
            <AppearOnScroll delay={300}>
              <div className="flex items-center gap-4">
                {isLoggedIn ? (
                  <div className="flex items-center gap-4">
                    <p className="text-[1.5rem] text-muted-foreground">
                      Signed in as <strong className="text-foreground">{user.name}</strong>
                    </p>
                    <button
                      onClick={handleSignOut}
                      className="text-[1.4rem] text-muted-foreground hover:text-foreground underline transition-colors"
                    >
                      Sign out
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowModal(true)}
                    className="px-8 py-3 text-[1.6rem] font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Sign in to listen
                  </button>
                )}
              </div>
            </AppearOnScroll>
          </div>
        </div>
      </section>

      {/* Episodes grid */}
      <Section>
        <div className="w-full max-w-[120rem] mx-auto">
          {!isLoggedIn && (
            <AppearOnScroll delay={0}>
              <div className="bg-muted border border-border rounded-xl p-6 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-[1.7rem] font-semibold mb-1">Members-only content</p>
                  <p className="text-[1.5rem] text-muted-foreground">
                    Sign in or create an account to stream full episodes.
                  </p>
                </div>
                <button
                  onClick={() => setShowModal(true)}
                  className="flex-shrink-0 px-8 py-3 text-[1.6rem] font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                >
                  Sign in
                </button>
              </div>
            </AppearOnScroll>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allEpisodes.map((episode, i) => (
              <AppearOnScroll key={episode.id} delay={i * 75}>
                <AudioPlayer
                  episode={episode}
                  requireLogin={!isLoggedIn}
                  onLoginRequired={handleLoginRequired}
                />
              </AppearOnScroll>
            ))}
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
};

export default Stream;
