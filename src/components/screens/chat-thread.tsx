import { Link } from "@tanstack/react-router";
import { ChevronLeft, Mic, Paperclip, Image as ImageIcon, Send } from "lucide-react";
import { threads } from "@/lib/mock";
import { Route } from "@/routes/_app.messenger.$threadId";

export function ChatThread() {
  const { threadId } = Route.useParams();
  const t = threads.find(x => x.id === threadId) ?? threads[0];

  const msgs = [
    { from: "them", text: "Hey! Saw your take in the Lagos Traffic room — sharp 🔥", time: "10:42" },
    { from: "me", text: "Thanks 🙏 Are you going to the follow-up session tomorrow?", time: "10:43" },
    { from: "them", kind: "voice" as const, dur: "0:42", time: "10:45" },
    { from: "me", text: "Got it. Let me listen and reply.", time: "10:46" },
    { from: "them", text: "Also dropped a doc with the LASTMA stats", time: "10:48" },
    { from: "them", kind: "doc" as const, name: "lastma-q4-2025.pdf", time: "10:48" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-30 bg-background/90 backdrop-blur-xl border-b border-border px-3 py-2.5 flex items-center gap-2">
        <Link to="/messenger" className="h-9 w-9 rounded-full flex items-center justify-center"><ChevronLeft className="h-5 w-5" /></Link>
        <img src={t.avatar} alt="" className="h-9 w-9 rounded-full" />
        <div className="flex-1 min-w-0">
          <div className="text-sm font-bold truncate">{t.name}</div>
          {t.fromLoop && <div className="text-[10px] text-neon">↺ {t.fromLoop}</div>}
        </div>
      </header>

      <div className="flex-1 px-3 py-4 space-y-2 bg-surface">
        {msgs.map((m, i) => (
          <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[78%] rounded-2xl px-3 py-2 ${m.from === "me" ? "bg-orange text-white rounded-br-md" : "bg-card border border-border rounded-bl-md"}`}>
              {"kind" in m && m.kind === "voice" ? (
                <div className="flex items-center gap-2">
                  <button className="h-7 w-7 rounded-full bg-foreground/10 flex items-center justify-center"><Mic className="h-3.5 w-3.5" /></button>
                  <div className="flex items-end gap-0.5 h-5">
                    {[3,5,7,4,6,8,5,3,6,4,7,5,3,6].map((h, j) => <div key={j} className="w-0.5 bg-current rounded-full" style={{ height: h * 2 }} />)}
                  </div>
                  <span className="text-[10px] opacity-80">{m.dur}</span>
                </div>
              ) : "kind" in m && m.kind === "doc" ? (
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-foreground/10 flex items-center justify-center"><Paperclip className="h-4 w-4" /></div>
                  <div className="text-xs font-semibold">{m.name}</div>
                </div>
              ) : (
                <p className="text-sm leading-snug">{(m as { text: string }).text}</p>
              )}
              <div className={`text-[9px] mt-1 ${m.from === "me" ? "text-white/70" : "text-muted-foreground"}`}>{m.time}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="sticky bottom-0 bg-background border-t border-border px-3 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        <div className="flex items-center gap-2">
          <button className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center shrink-0"><Paperclip className="h-4 w-4" /></button>
          <div className="flex-1 flex items-center gap-2 bg-secondary rounded-full px-4">
            <input placeholder="Message" className="flex-1 h-10 bg-transparent text-sm outline-none" />
            <button className="text-muted-foreground"><ImageIcon className="h-4 w-4" /></button>
          </div>
          <button className="h-10 w-10 rounded-full bg-orange text-white flex items-center justify-center shrink-0"><Send className="h-4 w-4" /></button>
        </div>
        <p className="text-[9px] text-center text-muted-foreground mt-1.5">Text · Voice notes · Images · Docs · No calls</p>
      </div>
    </div>
  );
}
