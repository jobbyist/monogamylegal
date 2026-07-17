import { useState } from "react";
import { X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export const OnboardingModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [step, setStep] = useState(0);
  const [userType, setUserType] = useState<'client' | 'attorney' | null>(null);
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    needs: '', 
    plan: 'essential' as 'essential' | 'professional' | 'enterprise',
    phone: '' 
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const { user, refresh } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Name is required';
      if (!formData.email.trim() || !/^[\w-.]+@[\w-.]+\.[a-z]{2,}$/i.test(formData.email)) newErrors.email = 'Valid email required';
      if (userType === 'client' && !formData.needs.trim()) newErrors.needs = 'Describe your needs';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (!validateStep()) return;

    if (step === 0 && userType) {
      setStep(1);
    } else if (step === 1) {
      await handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      navigate('/auth?redirect=/onboarding');
      return;
    }
    setLoading(true);
    try {
      const { error: profileError } = await supabase.from('profiles').upsert({
        id: user.id,
        role: userType || 'client',
        subscription_status: 'pending',
        plan_tier: formData.plan,
        onboarding_completed: true,
      });
      if (profileError) throw profileError;

      // Trigger subscription flow (Paystack)
      const { data, error } = await supabase.functions.invoke('create-paystack-subscription', {
        body: { 
          plan: formData.plan, 
          email: formData.email,
          metadata: { onboarding: true, userType, needs: formData.needs }
        }
      });

      if (error) throw error;

      await refresh();
      toast({ title: 'Onboarding successful!', description: 'Redirecting to payment...' });
      onClose();
      if (data?.authorization_url) window.location.href = data.authorization_url;
      else navigate('/pricing');
    } catch (e: any) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  // ... (UI remains similar with error display, plan select in step 1 for clients, etc.)
  return (
    // Full modal JSX with validation messages, plan dropdown, etc.
    <div className="fixed inset-0 z-[100] ...">
      {/* Step 0: Type */}
      {/* Step 1: Details + Plan selection */}
      <div className="space-y-4">
        {/* Form fields with error spans */}
        {userType === 'client' && <select value={formData.plan} onChange={...} > ... </select> }
        <button onClick={handleNext} disabled={loading}>Continue</button>
      </div>
    </div>
  );
};
