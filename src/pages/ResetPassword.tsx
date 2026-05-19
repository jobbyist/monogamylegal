import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ResetPassword = () => {
  const [mode, setMode] = useState<"request" | "update">("request");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (window.location.hash.includes("type=recovery")) setMode("update");
  }, []);

  const sendLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Reset link sent. Check your email.");
  };

  const update = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Password updated. You can now sign in.");
    window.location.href = "/auth";
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-[40rem] rounded-2xl border border-border bg-card p-8 shadow-sm">
          <h1 className="text-[2.4rem] font-bold mb-4">
            {mode === "request" ? "Reset password" : "Set a new password"}
          </h1>
          {mode === "request" ? (
            <form onSubmit={sendLink} className="space-y-4">
              <input type="email" required placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full h-12 px-4 text-[1.5rem] rounded-lg border border-border bg-background" />
              <button disabled={busy} className="w-full h-12 rounded-lg bg-primary text-primary-foreground text-[1.5rem] font-semibold">{busy ? "Sending…" : "Send reset link"}</button>
            </form>
          ) : (
            <form onSubmit={update} className="space-y-4">
              <input type="password" required minLength={8} placeholder="New password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full h-12 px-4 text-[1.5rem] rounded-lg border border-border bg-background" />
              <button disabled={busy} className="w-full h-12 rounded-lg bg-primary text-primary-foreground text-[1.5rem] font-semibold">{busy ? "Updating…" : "Update password"}</button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ResetPassword;
