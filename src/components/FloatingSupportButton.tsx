import { type FormEvent, useState } from "react";
import { Loader2, MessageSquareText, TriangleAlert } from "lucide-react";
import { requestConciergeResponse } from "@/lib/conciergeClient";
import {
  conciergeNextActions,
  type ConciergeResponse,
} from "@/lib/conciergeTypes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const FloatingSupportButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<ConciergeResponse | null>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const nextResponse = await requestConciergeResponse({ prompt });
      setResponse(nextResponse);
    } catch {
      setError("We couldn't fetch a concierge response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const showEscalationCTA =
    response?.next_action === conciergeNextActions.escalateToAttorney &&
    response.escalation_contact;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {isOpen ? (
        <section className="w-[min(92vw,24rem)] rounded-2xl border border-border bg-card p-4 text-card-foreground shadow-xl">
          <header className="mb-3 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <MessageSquareText className="h-5 w-5 text-primary" />
              <h3 className="text-sm font-semibold">Monogamy Concierge</h3>
            </div>
            <Button type="button" variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </header>

          <form onSubmit={onSubmit} className="space-y-3">
            <Input
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              placeholder="Ask a legal information question"
              aria-label="Ask concierge"
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Get guidance"}
            </Button>
          </form>

          {error ? <p className="mt-3 text-sm text-destructive">{error}</p> : null}

          {response ? (
            <div className="mt-4 space-y-2 rounded-xl border border-border/70 bg-muted/30 p-3 text-sm">
              <p className="font-medium">Intent: {response.intent}</p>
              <p>{response.answer}</p>
              <p className="text-xs text-muted-foreground">{response.disclaimer}</p>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Next action: {response.next_action}
              </p>

              {showEscalationCTA ? (
                <a
                  className="mt-1 inline-flex items-center gap-2 rounded-md bg-destructive px-3 py-2 text-xs font-semibold text-destructive-foreground"
                  href={response.escalation_contact.href}
                >
                  <TriangleAlert className="h-3.5 w-3.5" />
                  {response.escalation_contact.label}
                </a>
              ) : null}
            </div>
          ) : null}
        </section>
      ) : null}

      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        aria-label="AI chatbot support"
        className="flex items-center gap-3"
      >
        <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-primary text-[2.8rem] font-bold text-primary-foreground shadow-[0_12px_28px_rgba(0,0,0,0.25)] before:absolute before:inset-0 before:animate-ping before:rounded-full before:bg-primary/40 before:content-['']">
          <span className="relative">?</span>
        </span>
        <span className="rounded-full border border-border bg-card/95 px-4 py-2 text-[1.4rem] font-semibold text-foreground shadow-md">
          Support
        </span>
      </button>
    </div>
import { appConfig } from "@/lib/config";

const FloatingSupportButton = () => {
  const handleSupportClick = () => {
    if (!appConfig.calComUrl) {
      return;
    }

    window.open(appConfig.calComUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      type="button"
      aria-label="AI chatbot support"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
      onClick={handleSupportClick}
    >
      <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-[2.8rem] font-bold shadow-[0_12px_28px_rgba(0,0,0,0.25)] before:absolute before:inset-0 before:rounded-full before:bg-primary/40 before:animate-ping before:content-['']">
        <span className="relative">?</span>
      </span>
      <span className="rounded-full bg-card/95 px-4 py-2 text-[1.4rem] font-semibold text-foreground shadow-md border border-border">
        Support
      </span>
    </button>
  );
};

export default FloatingSupportButton;
