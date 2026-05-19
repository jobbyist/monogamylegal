import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Auth = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const redirect = params.get("redirect") || "/dashboard";
  const [mode, setMode] = useState<"signin" | "signup">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<"client" | "attorney">("client");
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}${redirect}`,
            data: { full_name: fullName },
          },
        });
        if (error) throw error;
        // Add attorney role on top of default 'client'
        if (data.user && role === "attorney") {
          await supabase.from("user_roles").insert({ user_id: data.user.id, role: "attorney" });
          await supabase.from("attorney_profiles").insert({ id: data.user.id });
        }
        toast.success("Check your email to confirm your account, then sign in.");
        setMode("signin");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back");
        navigate(redirect);
      }
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  const oauth = async (provider: "google" | "apple") => {
    setBusy(true);
    const result = await lovable.auth.signInWithOAuth(provider, {
      redirect_uri: `${window.location.origin}${redirect}`,
    });
    if (result.error) {
      toast.error(result.error.message ?? "OAuth error");
      setBusy(false);
      return;
    }
    if (result.redirected) return;
    navigate(redirect);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-[44rem] rounded-2xl border border-border bg-card p-8 md:p-10 shadow-sm">
          <h1 className="text-[2.8rem] font-bold mb-2">
            {mode === "signup" ? "Create your account" : "Welcome back"}
          </h1>
          <p className="text-[1.5rem] text-muted-foreground mb-6">
            {mode === "signup"
              ? "Join Monogamy and unlock access to top-rated attorneys."
              : "Sign in to access your dashboard."}
          </p>

          <div className="grid grid-cols-2 gap-3 mb-5">
            <button
              type="button"
              disabled={busy}
              onClick={() => oauth("google")}
              className="h-12 rounded-lg border border-border bg-background text-[1.4rem] font-medium hover:bg-muted transition-colors"
            >
              Continue with Google
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => oauth("apple")}
              className="h-12 rounded-lg border border-border bg-background text-[1.4rem] font-medium hover:bg-muted transition-colors"
            >
              Continue with Apple
            </button>
          </div>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
            <span className="relative bg-card px-3 text-[1.3rem] text-muted-foreground left-1/2 -translate-x-1/2">or with email</span>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            {mode === "signup" && (
              <>
                <input
                  type="text"
                  required
                  placeholder="Full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full h-12 px-4 text-[1.5rem] rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <div className="flex gap-2">
                  {(["client", "attorney"] as const).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={`flex-1 h-11 rounded-lg text-[1.4rem] font-medium border transition-colors ${
                        role === r ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border"
                      }`}
                    >
                      {r === "client" ? "I'm a client" : "I'm an attorney"}
                    </button>
                  ))}
                </div>
              </>
            )}
            <input
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 px-4 text-[1.5rem] rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <input
              type="password"
              required
              minLength={8}
              placeholder="Password (min 8 chars)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 px-4 text-[1.5rem] rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <button
              type="submit"
              disabled={busy}
              className="w-full h-12 rounded-lg bg-primary text-primary-foreground text-[1.5rem] font-semibold hover:opacity-90 disabled:opacity-60"
            >
              {busy ? "Please wait…" : mode === "signup" ? "Create account" : "Sign in"}
            </button>
          </form>

          <p className="text-[1.4rem] text-muted-foreground mt-6 text-center">
            {mode === "signup" ? "Already have an account?" : "New to Monogamy?"}{" "}
            <button
              type="button"
              onClick={() => setMode(mode === "signup" ? "signin" : "signup")}
              className="text-primary font-semibold hover:underline"
            >
              {mode === "signup" ? "Sign in" : "Create one"}
            </button>
          </p>
          {mode === "signin" && (
            <p className="text-[1.3rem] text-center mt-2">
              <Link to="/reset-password" className="text-muted-foreground hover:text-foreground">Forgot password?</Link>
            </p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Auth;
