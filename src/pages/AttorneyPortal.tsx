import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type AttorneyProfile = {
  id: string;
  firm_name: string | null;
  bar_number: string | null;
  jurisdictions: string[];
  practice_areas: string[];
  bio: string | null;
  hourly_rate: number | null;
  years_experience: number | null;
  is_verified: boolean;
  accepting_clients: boolean;
};

type Case = {
  id: string;
  title: string;
  practice_area: string;
  urgency: string;
  status: string;
  description: string;
  created_at: string;
  client_id: string;
};

type Earning = { id: string; amount: number; currency: string; description: string | null; earned_at: string };

type Message = { id: string; body: string; sender_id: string; created_at: string };

const AttorneyPortal = () => {
  const { user, signOut } = useAuth();
  const [tab, setTab] = useState<"cases" | "profile" | "earnings">("cases");
  const [profile, setProfile] = useState<AttorneyProfile | null>(null);
  const [cases, setCases] = useState<Case[]>([]);
  const [activeCase, setActiveCase] = useState<Case | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [body, setBody] = useState("");
  const [earnings, setEarnings] = useState<Earning[]>([]);

  useEffect(() => {
    if (!user) return;
    supabase.from("attorney_profiles").select("*").eq("id", user.id).maybeSingle().then(({ data }) => setProfile(data as AttorneyProfile | null));
    supabase.from("cases").select("*").order("created_at", { ascending: false }).then(({ data }) => setCases((data ?? []) as Case[]));
    supabase.from("earnings").select("*").order("earned_at", { ascending: false }).then(({ data }) => setEarnings((data ?? []) as Earning[]));
  }, [user]);

  useEffect(() => {
    if (!activeCase) return;
    supabase.from("messages").select("*").eq("case_id", activeCase.id).order("created_at").then(({ data }) => setMessages((data ?? []) as Message[]));
    const ch = supabase
      .channel(`att-case-${activeCase.id}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages", filter: `case_id=eq.${activeCase.id}` }, (p) => setMessages((m) => [...m, p.new as Message]))
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [activeCase]);

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !profile) return;
    const { error } = await supabase.from("attorney_profiles").upsert({
      id: user.id,
      firm_name: profile.firm_name,
      bar_number: profile.bar_number,
      jurisdictions: profile.jurisdictions,
      practice_areas: profile.practice_areas,
      bio: profile.bio,
      hourly_rate: profile.hourly_rate,
      years_experience: profile.years_experience,
      accepting_clients: profile.accepting_clients,
    });
    if (error) return toast.error(error.message);
    toast.success("Profile saved");
  };

  const sendMessage = async () => {
    if (!activeCase || !user || !body.trim()) return;
    const text = body; setBody("");
    const { error } = await supabase.from("messages").insert({ case_id: activeCase.id, sender_id: user.id, body: text });
    if (error) toast.error(error.message);
  };

  const totalEarnings = earnings.reduce((sum, e) => sum + Number(e.amount || 0), 0);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 px-6 md:px-[calc(18vw-10rem)] py-10 max-w-[138rem] mx-auto w-full">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <h1 className="text-[3.2rem] font-bold">Attorney Portal</h1>
            <p className="text-[1.5rem] text-muted-foreground">
              {profile?.is_verified ? "Verified" : "Pending verification"} • Manage cases, profile, and earnings.
            </p>
          </div>
          <button onClick={signOut} className="px-5 h-12 rounded-lg border border-border text-[1.5rem]">Sign out</button>
        </div>

        <div className="flex gap-2 mb-6 border-b border-border">
          {(["cases", "profile", "earnings"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`px-4 py-3 text-[1.5rem] font-medium border-b-2 transition-colors ${tab === t ? "border-primary text-foreground" : "border-transparent text-muted-foreground"}`}>
              {t === "cases" ? "Cases" : t === "profile" ? "Profile" : `Earnings ($${totalEarnings.toFixed(2)})`}
            </button>
          ))}
        </div>

        {tab === "cases" && (
          <div className="grid lg:grid-cols-[1fr_1.6fr] gap-6">
            <section className="rounded-2xl border border-border bg-card p-5">
              <h2 className="text-[1.8rem] font-semibold mb-4">Assigned cases</h2>
              {cases.length === 0 ? (
                <p className="text-[1.4rem] text-muted-foreground">No cases assigned yet.</p>
              ) : (
                <ul className="space-y-2">
                  {cases.map((c) => (
                    <li key={c.id}>
                      <button onClick={() => setActiveCase(c)} className={`w-full text-left p-4 rounded-lg border transition-colors ${activeCase?.id === c.id ? "border-primary bg-primary/5" : "border-border hover:bg-muted"}`}>
                        <div className="text-[1.5rem] font-semibold truncate">{c.title}</div>
                        <div className="text-[1.3rem] text-muted-foreground">{c.practice_area} • {c.urgency} • {c.status}</div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </section>
            <section className="rounded-2xl border border-border bg-card p-5 min-h-[40rem] flex flex-col">
              {!activeCase ? (
                <div className="flex-1 flex items-center justify-center text-[1.5rem] text-muted-foreground">Select a case to view details and chat</div>
              ) : (
                <>
                  <div className="border-b border-border pb-4 mb-4">
                    <h3 className="text-[1.8rem] font-semibold">{activeCase.title}</h3>
                    <p className="text-[1.3rem] text-muted-foreground mb-2">{activeCase.practice_area} • {activeCase.urgency}</p>
                    <p className="text-[1.4rem]">{activeCase.description}</p>
                  </div>
                  <div className="flex-1 overflow-y-auto space-y-3 mb-4 max-h-[36rem]">
                    {messages.length === 0 ? <p className="text-[1.4rem] text-muted-foreground">No messages yet.</p> : messages.map((m) => (
                      <div key={m.id} className={`max-w-[80%] p-3 rounded-lg text-[1.4rem] ${m.sender_id === user?.id ? "ml-auto bg-primary text-primary-foreground" : "bg-muted"}`}>{m.body}</div>
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
        )}

        {tab === "profile" && (
          <form onSubmit={saveProfile} className="rounded-2xl border border-border bg-card p-6 grid gap-4 max-w-[80rem]">
            <h2 className="text-[2rem] font-semibold">Attorney profile</h2>
            <input placeholder="Firm name" value={profile?.firm_name ?? ""} onChange={(e) => setProfile({ ...(profile as AttorneyProfile), firm_name: e.target.value })} className="h-12 px-4 rounded-lg border border-border bg-background text-[1.5rem]" />
            <input placeholder="Bar number" value={profile?.bar_number ?? ""} onChange={(e) => setProfile({ ...(profile as AttorneyProfile), bar_number: e.target.value })} className="h-12 px-4 rounded-lg border border-border bg-background text-[1.5rem]" />
            <input placeholder="Jurisdictions (comma-separated, e.g. CA, NY)" value={profile?.jurisdictions?.join(", ") ?? ""} onChange={(e) => setProfile({ ...(profile as AttorneyProfile), jurisdictions: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} className="h-12 px-4 rounded-lg border border-border bg-background text-[1.5rem]" />
            <input placeholder="Practice areas (comma-separated)" value={profile?.practice_areas?.join(", ") ?? ""} onChange={(e) => setProfile({ ...(profile as AttorneyProfile), practice_areas: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} className="h-12 px-4 rounded-lg border border-border bg-background text-[1.5rem]" />
            <div className="grid grid-cols-2 gap-4">
              <input type="number" placeholder="Hourly rate ($)" value={profile?.hourly_rate ?? ""} onChange={(e) => setProfile({ ...(profile as AttorneyProfile), hourly_rate: Number(e.target.value) })} className="h-12 px-4 rounded-lg border border-border bg-background text-[1.5rem]" />
              <input type="number" placeholder="Years of experience" value={profile?.years_experience ?? ""} onChange={(e) => setProfile({ ...(profile as AttorneyProfile), years_experience: Number(e.target.value) })} className="h-12 px-4 rounded-lg border border-border bg-background text-[1.5rem]" />
            </div>
            <textarea rows={5} placeholder="Bio" value={profile?.bio ?? ""} onChange={(e) => setProfile({ ...(profile as AttorneyProfile), bio: e.target.value })} className="p-4 rounded-lg border border-border bg-background text-[1.5rem]" />
            <label className="flex items-center gap-2 text-[1.5rem]">
              <input type="checkbox" checked={profile?.accepting_clients ?? true} onChange={(e) => setProfile({ ...(profile as AttorneyProfile), accepting_clients: e.target.checked })} />
              Currently accepting new clients
            </label>
            <button className="h-12 px-6 rounded-lg bg-primary text-primary-foreground font-semibold text-[1.5rem] w-fit">Save profile</button>
          </form>
        )}

        {tab === "earnings" && (
          <section className="rounded-2xl border border-border bg-card p-6">
            <div className="mb-6">
              <div className="text-[1.3rem] text-muted-foreground uppercase tracking-wider">Total earnings</div>
              <div className="text-[4rem] font-bold">${totalEarnings.toFixed(2)}</div>
            </div>
            {earnings.length === 0 ? (
              <p className="text-[1.4rem] text-muted-foreground">No earnings recorded yet. Earnings appear here as you complete cases.</p>
            ) : (
              <table className="w-full text-[1.4rem]">
                <thead className="text-left text-muted-foreground border-b border-border">
                  <tr><th className="py-2">Date</th><th>Amount</th><th>Description</th></tr>
                </thead>
                <tbody>
                  {earnings.map((e) => (
                    <tr key={e.id} className="border-b border-border">
                      <td className="py-2">{new Date(e.earned_at).toLocaleDateString()}</td>
                      <td>{e.currency} {Number(e.amount).toFixed(2)}</td>
                      <td>{e.description ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AttorneyPortal;
