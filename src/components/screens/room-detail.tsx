import { Link } from "@tanstack/react-router";
import { ChevronLeft, Mic, MicOff, Heart, Hand, Share2, MessageCircle, MoreHorizontal } from "lucide-react";
import { rooms } from "@/lib/mock";
import { Route } from "@/routes/_app.rooms.$roomId";

export function RoomDetail() {
  const { roomId } = Route.useParams();
  const r = rooms.find(x => x.id === roomId) ?? rooms[0];

  const audience = Array.from({ length: 12 }).map((_, i) => ({ name: `Listener ${i+1}`, avatar: `https://i.pravatar.cc/100?img=${(i * 4 + 7) % 70}` }));

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <header className="sticky top-0 z-30 bg-background/90 backdrop-blur-xl border-b border-border px-3 py-2.5 flex items-center gap-2">
        <Link to="/" className="h-9 w-9 rounded-full flex items-center justify-center"><ChevronLeft className="h-5 w-5" /></Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            {r.live && <><span className="h-1.5 w-1.5 rounded-full live-dot" /><span className="text-[10px] font-bold uppercase text-live">Live</span></>}
            <span className="text-[10px] uppercase font-bold text-neon">{r.category}</span>
          </div>
          <div className="text-sm font-bold truncate">{r.title}</div>
        </div>
        <button className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center"><MoreHorizontal className="h-4 w-4" /></button>
      </header>

      <div className="flex-1 px-4 pt-4 pb-40 space-y-5">
        <div className="rounded-2xl bg-card border border-border p-3">
          <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-1">Context · {r.region}</div>
          <p className="text-xs">{r.context}</p>
        </div>

        <section>
          <div className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground mb-3">Speakers · {r.speakers.length}</div>
          <div className="grid grid-cols-4 gap-3">
            {r.speakers.map((s, i) => (
              <div key={s.name} className="flex flex-col items-center gap-1.5">
                <div className="relative">
                  <img src={s.avatar} alt="" className={`h-16 w-16 rounded-full ${i === 0 ? "ring-2 ring-neon neon-glow" : ""}`} />
                  <span className="absolute -bottom-0.5 -right-0.5 h-6 w-6 rounded-full bg-neon text-neon-foreground flex items-center justify-center border-2 border-card"><Mic className="h-3 w-3" /></span>
                </div>
                <div className="text-[10px] font-semibold text-center leading-tight">{s.name}</div>
                {i === 0 && <span className="text-[9px] text-neon font-bold uppercase">Host</span>}
              </div>
            ))}
            <div className="flex flex-col items-center gap-1.5">
              <button className="h-16 w-16 rounded-full border-2 border-dashed border-border flex items-center justify-center text-muted-foreground"><Hand className="h-5 w-5" /></button>
              <div className="text-[10px] text-muted-foreground text-center">Request</div>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-3">
            <div className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Listeners · {r.listeners.toLocaleString()}</div>
            <button className="text-[10px] text-neon font-semibold">See all</button>
          </div>
          <div className="grid grid-cols-6 gap-2">
            {audience.map(a => (
              <img key={a.name} src={a.avatar} alt="" className="h-10 w-10 rounded-full" />
            ))}
          </div>
        </section>

        <section>
          <div className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground mb-2">Top comments</div>
          <div className="space-y-2">
            {[
              { a: "Ngozi I.", t: "BRT lanes only work if enforcement is consistent. Anyone tracking compliance data?", likes: 412 },
              { a: "Tunde A.", t: "Third Mainland repairs need a public schedule. Communication is half the battle.", likes: 318 },
              { a: "Adaeze O.", t: "Can we pin the LASTMA Q&A summary? I'll write up bullet points.", likes: 207 },
            ].map((c, i) => (
              <div key={i} className="rounded-2xl bg-card border border-border p-3">
                <div className="flex items-center gap-2 mb-1.5">
                  <img src={`https://i.pravatar.cc/100?img=${20+i*4}`} alt="" className="h-6 w-6 rounded-full" />
                  <span className="text-xs font-semibold">{c.a}</span>
                  <span className="text-[10px] text-muted-foreground ml-auto">{c.likes} ♥</span>
                </div>
                <p className="text-xs leading-snug">{c.t}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="sticky bottom-0 bg-background/95 backdrop-blur-xl border-t border-border px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="flex items-center justify-around">
          <button className="flex flex-col items-center gap-1"><div className="h-11 w-11 rounded-full bg-secondary flex items-center justify-center"><MicOff className="h-4 w-4" /></div><span className="text-[9px] text-muted-foreground">Muted</span></button>
          <button className="flex flex-col items-center gap-1"><div className="h-11 w-11 rounded-full bg-secondary flex items-center justify-center"><Hand className="h-4 w-4" /></div><span className="text-[9px] text-muted-foreground">Raise</span></button>
          <button className="flex flex-col items-center gap-1"><div className="h-11 w-11 rounded-full bg-secondary flex items-center justify-center"><Heart className="h-4 w-4" /></div><span className="text-[9px] text-muted-foreground">React</span></button>
          <button className="flex flex-col items-center gap-1"><div className="h-11 w-11 rounded-full bg-secondary flex items-center justify-center"><MessageCircle className="h-4 w-4" /></div><span className="text-[9px] text-muted-foreground">Comment</span></button>
          <button className="flex flex-col items-center gap-1"><div className="h-11 w-11 rounded-full bg-secondary flex items-center justify-center"><Share2 className="h-4 w-4" /></div><span className="text-[9px] text-muted-foreground">Share</span></button>
          <button className="flex flex-col items-center gap-1"><div className="h-11 w-11 rounded-full bg-live text-white flex items-center justify-center font-bold text-xs">×</div><span className="text-[9px] text-muted-foreground">Leave</span></button>
        </div>
      </div>
    </div>
  );
}
