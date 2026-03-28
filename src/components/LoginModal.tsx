import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

/**
 * LoginModal — Authentication popup.
 *
 * CLERK CONFIGURATION INSTRUCTIONS:
 * ----------------------------------
 * 1. Install Clerk: `npm install @clerk/clerk-react`
 * 2. Add your Clerk Publishable Key to .env:
 *    VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
 * 3. Wrap your app in <ClerkProvider publishableKey={...}> in main.tsx
 * 4. Replace the form below with Clerk's <SignIn /> and <SignUp /> components:
 *    import { SignIn, SignUp } from "@clerk/clerk-react";
 *    Then render <SignIn routing="hash" /> or <SignUp routing="hash" /> in place of the form.
 * 5. For modal mode use: <SignIn appearance={{ baseTheme: ... }} />
 *    See: https://clerk.com/docs/components/authentication/sign-in
 */
const LoginModal = ({ open, onClose }: LoginModalProps) => {
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [formData, setFormData] = useState({ email: "", password: "", name: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputClass =
    "w-full text-[1.5rem] h-[48px] px-4 bg-background border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: Replace with Clerk authentication
    // See configuration instructions in the component file header above
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-[440px] p-0 overflow-hidden rounded-2xl border border-border">
        <div className="flex border-b border-border">
          <button
            onClick={() => setTab("login")}
            className={`flex-1 py-4 text-[1.5rem] font-semibold transition-colors ${
              tab === "login"
                ? "bg-background text-foreground border-b-2 border-primary"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            Log In
          </button>
          <button
            onClick={() => setTab("signup")}
            className={`flex-1 py-4 text-[1.5rem] font-semibold transition-colors ${
              tab === "signup"
                ? "bg-background text-foreground border-b-2 border-primary"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            Sign Up
          </button>
        </div>

        <div className="p-8">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-[2.2rem] font-bold text-center">
              {tab === "login" ? "Welcome back" : "Create your account"}
            </DialogTitle>
            <p className="text-[1.4rem] text-muted-foreground text-center mt-1">
              {tab === "login"
                ? "Log in to access your Monogamy membership."
                : "Join Monogamy for on-demand legal services."}
            </p>
          </DialogHeader>

          {/* TODO: Replace this form with Clerk <SignIn /> / <SignUp /> components */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {tab === "signup" && (
              <div>
                <label className="block text-[1.4rem] font-medium mb-1.5">
                  Full Name <span className="text-primary">*</span>
                </label>
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required={tab === "signup"}
                  className={inputClass}
                  placeholder="Your full name"
                  autoComplete="name"
                />
              </div>
            )}

            <div>
              <label className="block text-[1.4rem] font-medium mb-1.5">
                Email Address <span className="text-primary">*</span>
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={inputClass}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>

            <div>
              <label className="block text-[1.4rem] font-medium mb-1.5">
                Password <span className="text-primary">*</span>
              </label>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className={inputClass}
                placeholder={tab === "signup" ? "Create a password" : "Enter your password"}
                autoComplete={tab === "signup" ? "new-password" : "current-password"}
              />
            </div>

            {tab === "login" && (
              <div className="text-right">
                <button
                  type="button"
                  className="text-[1.3rem] text-primary hover:underline transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-[48px] text-[1.6rem] font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed btn-primary-glossy mt-2"
            >
              {isSubmitting
                ? "Please wait…"
                : tab === "login"
                ? "Log In"
                : "Create Account"}
            </button>

            {tab === "signup" && (
              <p className="text-[1.2rem] text-muted-foreground text-center leading-[1.6]">
                By creating an account you agree to our{" "}
                <a href="/terms" className="text-primary hover:underline">
                  Terms
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </a>
                .
              </p>
            )}
          </form>

          <p className="text-[1.2rem] text-muted-foreground text-center mt-6 pt-4 border-t border-border">
            {tab === "login" ? (
              <>
                Don't have an account?{" "}
                <button
                  onClick={() => setTab("signup")}
                  className="text-primary font-medium hover:underline"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setTab("login")}
                  className="text-primary font-medium hover:underline"
                >
                  Log in
                </button>
              </>
            )}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
