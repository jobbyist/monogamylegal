import { useMemo, useState } from "react";
import { Bot, CalendarCheck2, CircleDollarSign, Scale, Sparkles } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const CAL_COM_LINK = "https://cal.com";

const clientIntakeSteps = [
  "Collects your contact details and matter type in under 90 seconds",
  "Shares general legal information and sets expectations",
  "Routes urgent matters to priority attorney review",
  "Books consultations through Cal.com and sends confirmations",
  "Supports billing and invoice reminders before appointments",
];

const firmUpsellPoints = [
  "Branded AI assistant for your firm website and intake channels",
  "Jurisdiction-aware guardrails to avoid direct legal advice",
  "Automated qualification, consultation scheduling, and reminders",
  "Client-ready responses for FAQs, timelines, fees, and onboarding",
];

const FloatingSupportButton = () => {
  const [mode, setMode] = useState<"client" | "firm">("client");

  const assistantMessage = useMemo(() => {
    if (mode === "firm") {
      return "I can help your firm deploy a personalized AI support agent that handles intake, FAQ responses, Cal.com scheduling, and billing nudges—while staying compliant with non-legal-advice guardrails.";
    }

    return "Hi, I’m Concierge — Your Dedicated Assistant. I can answer general law-related questions, guide your onboarding, and help you book a consultation. I do not provide legal advice.";
  }, [mode]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label="Open Concierge AI support"
          className="concierge-fab fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-primary px-4 py-3 text-primary-foreground shadow-[0_14px_40px_rgba(0,0,0,0.35)] transition-transform hover:scale-[1.02] focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/35"
        >
          <span className="concierge-fab__orb relative flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-[0_10px_24px_rgba(0,0,0,0.25)]">
            <Bot className="h-7 w-7" />
          </span>
          <span className="pr-2 text-left leading-tight">
            <span className="block text-[1.3rem] opacity-90">Concierge</span>
            <span className="block text-[1.55rem] font-semibold">Your Dedicated Assistant</span>
          </span>
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-[74rem] max-h-[85vh] overflow-y-auto rounded-2xl p-0">
        <DialogHeader className="border-b border-border p-6 pb-4">
          <DialogTitle className="flex items-center gap-3 text-[2.1rem]">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Sparkles className="h-5 w-5" />
            </span>
            Concierge - Your Dedicated Assistant
          </DialogTitle>
          <DialogDescription className="text-[1.5rem] leading-relaxed">
            AI-powered client support for onboarding, intake, scheduling, and billing workflows.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 p-6 md:grid-cols-[1fr_1.1fr]">
          <aside className="rounded-xl border border-border bg-muted/30 p-5">
            <div className="mb-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setMode("client")}
                className={`rounded-full px-4 py-2 text-[1.35rem] font-semibold transition ${
                  mode === "client" ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground border border-border"
                }`}
              >
                Client Help
              </button>
              <button
                type="button"
                onClick={() => setMode("firm")}
                className={`rounded-full px-4 py-2 text-[1.35rem] font-semibold transition ${
                  mode === "firm" ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground border border-border"
                }`}
              >
                For Attorneys & Firms
              </button>
            </div>

            <p className="rounded-lg border border-border bg-background p-4 text-[1.45rem] leading-relaxed">
              {assistantMessage}
            </p>

            <p className="mt-4 text-[1.25rem] text-muted-foreground">
              Compliance note: Concierge provides legal information only and cannot replace advice from a licensed attorney.
            </p>
          </aside>

          <section className="space-y-5">
            {mode === "client" ? (
              <>
                <h3 className="text-[1.8rem] font-semibold">What Concierge can do right now</h3>
                <ul className="space-y-3">
                  {clientIntakeSteps.map((item) => (
                    <li key={item} className="flex items-start gap-3 rounded-lg border border-border bg-card p-3 text-[1.4rem] leading-relaxed">
                      <Scale className="mt-1 h-4 w-4 shrink-0 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={CAL_COM_LINK}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-[1.45rem] font-semibold text-primary-foreground hover:opacity-90"
                >
                  <CalendarCheck2 className="h-4 w-4" />
                  Book a Consultation via Cal.com
                </a>
              </>
            ) : (
              <>
                <h3 className="text-[1.8rem] font-semibold">Launch your firm’s personalized AI support agent</h3>
                <ul className="space-y-3">
                  {firmUpsellPoints.map((item) => (
                    <li key={item} className="flex items-start gap-3 rounded-lg border border-border bg-card p-3 text-[1.4rem] leading-relaxed">
                      <CircleDollarSign className="mt-1 h-4 w-4 shrink-0 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 text-[1.35rem] leading-relaxed">
                  <p className="font-semibold">Upsell path:</p>
                  <p>
                    Start with Concierge intake automation, then upgrade to a white-labeled firm assistant with custom workflows, practice-area playbooks, and CRM integrations.
                  </p>
                </div>
                <a href="mailto:hello@monogamy.law?subject=Concierge%20for%20our%20law%20firm" className="inline-flex items-center gap-2 rounded-lg border border-primary px-5 py-3 text-[1.45rem] font-semibold text-primary hover:bg-primary hover:text-primary-foreground">
                  Request Firm Demo
                </a>
              </>
            )}
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FloatingSupportButton;
