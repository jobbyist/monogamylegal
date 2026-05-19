import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

type Props = {
  buttonClass?: string;
  label?: string;
};

const SubscribeButtons = ({ buttonClass, label = "Subscribe — $19.99/mo" }: Props) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState<"paypal" | "paystack" | null>(null);

  const start = async (provider: "paypal" | "paystack") => {
    if (!user) {
      navigate("/auth?redirect=/pricing");
      return;
    }
    setBusy(provider);
    try {
      const { data, error } = await supabase.functions.invoke(
        provider === "paypal" ? "create-paypal-subscription" : "create-paystack-subscription",
        { body: { return_url: `${window.location.origin}/dashboard` } },
      );
      if (error) throw error;
      const url = (data as { approval_url?: string; authorization_url?: string })?.approval_url
        ?? (data as { authorization_url?: string })?.authorization_url;
      if (!url) throw new Error("No checkout URL returned");
      window.location.href = url;
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Could not start checkout. Please try again.");
    } finally {
      setBusy(null);
    }
  };

  const baseBtn = buttonClass ?? "w-full py-4 text-[1.6rem] font-semibold rounded-lg text-center transition-all block mt-2 bg-primary text-primary-foreground hover:opacity-90";

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className={baseBtn}>{label}</button>
    );
  }

  return (
    <div className="mt-2 grid grid-cols-1 gap-2">
      <button disabled={!!busy} onClick={() => start("paypal")} className="w-full py-3 text-[1.5rem] font-semibold rounded-lg bg-[#0070ba] text-white hover:opacity-90 disabled:opacity-60">
        {busy === "paypal" ? "Redirecting…" : "Pay with PayPal"}
      </button>
      <button disabled={!!busy} onClick={() => start("paystack")} className="w-full py-3 text-[1.5rem] font-semibold rounded-lg bg-[#0fa958] text-white hover:opacity-90 disabled:opacity-60">
        {busy === "paystack" ? "Redirecting…" : "Pay with Paystack"}
      </button>
      <button onClick={() => setOpen(false)} className="text-[1.3rem] text-muted-foreground underline mt-1">Cancel</button>
    </div>
  );
};

export default SubscribeButtons;
