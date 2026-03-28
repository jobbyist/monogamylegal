import { useState, useRef, useEffect } from "react";
import { X, Send, AlertCircle, ChevronDown } from "lucide-react";

interface Message {
  id: string;
  role: "assistant" | "user";
  text: string;
}

const SUGGESTED_QUERIES = [
  "How does Monogamy work?",
  "What practice areas do you cover?",
  "How much does a subscription cost?",
  "How do I find a lawyer for my case?",
];

const GREETING: Message = {
  id: "greeting",
  role: "assistant",
  text: "Hi, I'm Monogamy AI — your virtual legal assistant! Ask me about our services, how to use the platform, or general legal questions. How can I help you today?",
};

const MEMBER_GATE_MESSAGE =
  "Monogamy AI is available exclusively to active members. Please log in or sign up to access this feature.";

const DISCLAIMER =
  "⚠️ Monogamy AI provides general information only and does not constitute legal advice. For specific legal matters, please consult a qualified attorney through our platform. By using this feature, you acknowledge that conversations may be used for training and quality assurance purposes.";

// TODO: Replace with actual authentication state (e.g., from Clerk useUser() hook).
// Example: const { isSignedIn } = useUser(); const IS_MEMBER = isSignedIn ?? false;
// Set to `true` to simulate a logged-in member during development.
const IS_MEMBER = false;

const MonogamyAI = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [disclaimerAck, setDisclaimerAck] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  useEffect(() => {
    if (open && IS_MEMBER && disclaimerAck && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open, disclaimerAck]);

  const sendMessage = (text: string) => {
    if (!text.trim() || !IS_MEMBER || !disclaimerAck) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulated response — replace with actual AI API call
    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        text: "Thank you for your question. I'm here to help with information about Monogamy's services and general legal guidance. For specific legal advice tailored to your situation, I recommend connecting with one of our vetted attorneys through the platform.",
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-[55] w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-[0_4px_20px_rgba(0,0,0,0.25)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.35)] hover:scale-105 transition-all btn-primary-glossy flex items-center justify-center"
        aria-label="Open Monogamy AI"
      >
        {open ? (
          <ChevronDown className="w-6 h-6" />
        ) : (
          <img
            src="/monogamyappicon.png"
            alt="Monogamy AI"
            className="w-9 h-9 rounded-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        )}
        {!open && (
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-background" />
        )}
      </button>

      {/* Chat widget */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-[55] w-[360px] max-w-[calc(100vw-24px)] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden chat-open"
          style={{ maxHeight: "min(600px, calc(100vh - 120px))" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center overflow-hidden">
                <img
                  src="/monogamyappicon.png"
                  alt="Monogamy AI"
                  className="w-8 h-8 rounded-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
              <div>
                <p className="text-[1.4rem] font-semibold leading-none">Monogamy AI</p>
                <p className="text-[1.1rem] opacity-75 leading-none mt-0.5">Virtual Legal Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          {!IS_MEMBER ? (
            /* Not a member */
            <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 py-8 text-center">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <AlertCircle className="w-7 h-7 text-primary" />
              </div>
              <p className="text-[1.5rem] font-semibold text-foreground">Members Only</p>
              <p className="text-[1.3rem] text-muted-foreground leading-[1.6]">
                {MEMBER_GATE_MESSAGE}
              </p>
              <a
                href="/pricing"
                onClick={() => setOpen(false)}
                className="px-5 py-2.5 text-[1.4rem] font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity btn-primary-glossy"
              >
                View Plans
              </a>
            </div>
          ) : !disclaimerAck ? (
            /* Disclaimer acknowledgment */
            <div className="flex-1 flex flex-col gap-4 px-5 py-5">
              <div className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg">
                <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <p className="text-[1.2rem] text-amber-800 dark:text-amber-300 leading-[1.6]">
                  {DISCLAIMER}
                </p>
              </div>
              <button
                onClick={() => setDisclaimerAck(true)}
                className="w-full py-2.5 text-[1.4rem] font-semibold bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity btn-primary-glossy"
              >
                I Understand — Continue
              </button>
            </div>
          ) : (
            /* Chat interface */
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ minHeight: 0 }}>
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-[1.3rem] leading-[1.6] ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground rounded-br-sm"
                          : "bg-muted text-foreground rounded-bl-sm"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted px-4 py-3 rounded-2xl rounded-bl-sm">
                      <span className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggested queries */}
              {messages.length <= 1 && (
                <div className="px-4 pb-2 flex flex-wrap gap-2">
                  {SUGGESTED_QUERIES.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="text-[1.2rem] px-3 py-1.5 border border-border rounded-full text-muted-foreground hover:border-primary hover:text-primary transition-all"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {/* Disclaimer strip */}
              <div className="px-4 pb-1">
                <p className="text-[1.1rem] text-muted-foreground/70 leading-[1.5] text-center">
                  Not legal advice · Conversations may be used for training & QA
                </p>
              </div>

              {/* Input */}
              <form onSubmit={handleSubmit} className="flex items-center gap-2 px-3 pb-3 pt-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Monogamy AI anything…"
                  className="flex-1 text-[1.3rem] h-[40px] px-3.5 bg-background border border-border rounded-full focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default MonogamyAI;
