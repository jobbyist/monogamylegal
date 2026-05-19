import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Case = {
  id: string;
  title: string;
  practice_area: string;
  urgency: string;
  status: string;
  created_at: string;
  assigned_attorney_id: string | null;
};

type Message = { id: string; body: string; sender_id: string; created_at: string };

const PRACTICE_AREAS = [
  "Family Law", "Criminal Defense", "Personal Injury", "Business Law", "Real Estate",
  "Immigration", "Employment", "Estate Planning", "Tax", "IP", "Bankruptcy", "Civil Rights",
];

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const [cases, setCases] = useState<Case[]>([]);
  const [activeCase, setActiveCase] = useState<Case | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [body, setBody] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [form, setForm] = useState({ title: "", practice_area: PRACTICE_AREAS[0], jurisdiction: "", urgency: "normal", description: "" });

  const loadCases = async () => {
    const { data } = await supabase.from("cases").select("*").order("created_at", { ascending: false });
    setCases((data ?? []) as Case[]);
  };

  useEffect(() => { loadCases(); }, []);

  useEffect(() => {
    if (!activeCase) return;
    supabase.from("messages").select("*").eq("case_id", activeCase.id).order("created_at").then(({ data }) => setMessages((data ?? []) as Message[]));
    const ch = supabase
      .channel(`case-${activeCase.id}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages", filter: `case_id=eq.${activeCase.id}` }, (p) => {
        setMessages((m) => [...m, p.new as Message]);
      })
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [activeCase]);

  const submitCase = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const { error } = await supabase.from("cases").insert({ ...form, client_id: user.id, urgency: form.urgency as "low" | "normal" | "high" | "urgent" });
    if (error) return toast.error(error.message);
    toast.success("Case submitted. We'll match you with attorneys shortly.");
    setShowNew(false);
    setForm({ title: "", practice_area: PRACTICE_AREAS[0], jurisdiction: "", urgency: "normal", description: "" });
    loadCases();
  };

  const sendMessage = async () => {
    if (!activeCase || !user || !body.trim()) return;
    const text = body;
    setBody("");
    const { error } = await supabase.from("messages").insert({ case_id: activeCase.id, sender_id: user.id, body: text });
    if (error) toast.error(error.message);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 px-6 md:px-[calc(18vw-10rem)] py-10 max-w-[138rem] mx-auto w-full">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-[3.2rem] font-bold">My Dashboard</h1>
            <p className="text-[1.5rem] text-muted-foreground">Manage your cases and message your attorney.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setShowNew(true)} className="px-5 h-12 rounded-lg bg-primary text-primary-foreground text-[1.5rem] font-semibold">+ New case</button>
            <button onClick={signOut} className="px-5 h-12 rounded-lg border border-border text-[1.5rem]">Sign out</button>
          </div>
        </div>

        {showNew && (
          <form onSubmit={submitCase} className="mb-8 rounded-2xl border border-border bg-card p-6 grid gap-4">
            <h2 className="text-[2rem] font-semibold">Submit a legal request</h2>
            <input required placeholder="Short title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="h-12 px-4 rounded-lg border border-border bg-background text-[1.5rem]" />
            <div className="grid md:grid-cols-3 gap-4">
              <select value={form.practice_area} onChange={(e) => setForm({ ...form, practice_area: e.target.value })} className="h-12 px-4 rounded-lg border border-border bg-background text-[1.5rem]">
                {PRACTICE_AREAS.map((p) => <option key={p}>{p}</option>)}
              </select>
              <input placeholder="Jurisdiction (state)" value={form.jurisdiction} onChange={(e) => setForm({ ...form, jurisdiction: e.target.value })} className="h-12 px-4 rounded-lg border border-border bg-background text-[1.5rem]" />
              <select value={form.urgency} onChange={(e) => setForm({ ...form, urgency: e.target.value })} className="h-12 px-4 rounded-lg border border-border bg-background text-[1.5rem]">
                <option value="low">Low</option><option value="normal">Normal</option><option value="high">High</option><option value="urgent">Urgent</option>
              </select>
            </div>
            <textarea required rows={5} placeholder="Describe your situation…" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="p-4 rounded-lg border border-border bg-background text-[1.5rem]" />
            <div className="flex gap-3">
              <button className="px-6 h-12 rounded-lg bg-primary text-primary-foreground font-semibold text-[1.5rem]">Submit</button>
              <button type="button" onClick={() => setShowNew(false)} className="px-6 h-12 rounded-lg border border-border text-[1.5rem]">Cancel</button>
            </div>
          </form>
        )}

        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-6">
          <section className="rounded-2xl border border-border bg-card p-5">
            <h2 className="text-[1.8rem] font-semibold mb-4">Your cases</h2>
            {cases.length === 0 ? (
              <p className="text-[1.4rem] text-muted-foreground">No cases yet. Click "New case" to get started.</p>
            ) : (
              <ul className="space-y-2">
                {cases.map((c) => (
                  <li key={c.id}>
                    <button onClick={() => setActiveCase(c)} className={`w-full text-left p-4 rounded-lg border transition-colors ${activeCase?.id === c.id ? "border-primary bg-primary/5" : "border-border hover:bg-muted"}`}>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[1.5rem] font-semibold truncate">{c.title}</span>
                        <span className="text-[1.1rem] uppercase tracking-wider text-muted-foreground">{c.status}</span>
                      </div>
                      <div className="text-[1.3rem] text-muted-foreground">{c.practice_area} • {new Date(c.created_at).toLocaleDateString()}</div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="rounded-2xl border border-border bg-card p-5 min-h-[40rem] flex flex-col">
            {!activeCase ? (
              <div className="flex-1 flex items-center justify-center text-[1.5rem] text-muted-foreground">Select a case to view messages</div>
            ) : (
              <>
                <div className="border-b border-border pb-4 mb-4">
                  <h3 className="text-[1.8rem] font-semibold">{activeCase.title}</h3>
                  <p className="text-[1.3rem] text-muted-foreground">Status: {activeCase.status} {activeCase.assigned_attorney_id ? "• Attorney assigned" : "• Awaiting match"}</p>
                </div>
                <div className="flex-1 overflow-y-auto space-y-3 mb-4 max-h-[40rem]">
                  {messages.length === 0 ? (
                    <p className="text-[1.4rem] text-muted-foreground">No messages yet.</p>
                  ) : messages.map((m) => (
                    <div key={m.id} className={`max-w-[80%] p-3 rounded-lg text-[1.4rem] ${m.sender_id === user?.id ? "ml-auto bg-primary text-primary-foreground" : "bg-muted"}`}>
                      {m.body}
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input value={body} onChange={(e) => setBody(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} placeholder="Type a message…" className="flex-1 h-12 px-4 rounded-lg border border-border bg-background text-[1.5rem]" />
                  <button onClick={sendMessage} className="px-5 h-12 rounded-lg bg-primary text-primary-foreground font-semibold text-[1.5rem]">Send</button>
                </div>
              </>
            )}
          </section>
        </div>

        <p className="mt-8 text-[1.3rem] text-muted-foreground text-center">
          Need to update billing? <Link to="/pricing" className="text-primary underline">Manage subscription</Link>
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
