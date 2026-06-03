import { Link } from "@tanstack/react-router";
import { ChevronLeft, Mic, MicOff, Heart, Hand, Share2, MessageCircle, MoreHorizontal, Check } from "lucide-react";
import { useState } from "react";
import { rooms } from "@/lib/mock";
import { Route } from "@/routes/_app.rooms.$roomId";
import { useLoop } from "@/lib/store";

export function RoomDetail() {
  const { roomId } = Route.useParams();
  const r = rooms.find((x) => x.id === roomId) ?? rooms[0];
  const { joined, speakState, muted, setJoined, setSpeakState, toggleMute } = useLoop();
  const isJoined = !!joined[r.id];
  const sState = speakState[r.id] ?? "listener";
  const isMuted = muted[r.id] !== false; // default true
  const [reactions, setReactions] = useState<{ id: number; emoji: string }[]>([]);
  const [showCommentBox, setShowCommentBox] = useState(false);

  const audience = Array.from({ length: 12 }).map((_, i) => ({ name: `Listener ${i + 1}`, avatar: `https://i.pravatar.cc/100?img=${(i * 4 + 7) % 70}` }));

  const sendReaction = (emoji: string) => {
    const id = Date.now() + Math.random();
    setReactions((rs) => [...rs, { id, emoji }]);
    setTimeout(() => setReactions((rs) => rs.filter((x) => x.id !== id)), 2500);
  };

  // Pre-join lobby
  if (!isJoined) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-background to-accent/30">
        <header className="px-3 py-2.5 flex items-center gap-2">
          <Link to="/" className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center"><ChevronLeft className="h-5 w-5" /></Link>
        </header>
        <div className="flex-1 px-6 flex flex-col justify-center text-center">
          <div className="flex items-center justify-center gap-1.5 mb-3">
            {r.live && <><span className="h-2 w-2 rounded-full live-dot" /><span className="text-[10px] font-bold uppercase text-live tracking-wider">Live now</span></>}
          </div>
          <span className="text-[11px] uppercase font-bold tracking-wider text-neon">{r.category} Room · {r.region}</span>
          <h1 className="text-2xl font-extrabold leading-tight mt-2 mb-3">{r.title}</h1>
          <p className="text-sm text-muted-foreground mb-6">{r.context}</p>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="flex -space-x-2">
              {r.speakers.map((s) => (
                <img key={s.name} src={s.avatar} alt="" className="h-10 w-10 rounded-full border-2 border-background ring-1 ring-neon" />
              ))}
            </div>
            <div className="text-left">
              <div className="text-sm font-bold">{r.listeners.toLocaleString()} listening</div>
              <div className="text-[11px] text-muted-foreground">{r.speakers.length} speakers</div>
            </div>
          </div>
          <button
            onClick={() => { setJoined(r.id, true); setSpeakState(r.id, "listener"); }}
            className="w-full h-14 rounded-2xl bg-neon text-neon-foreground font-extrabold text-base neon-glow active:scale-[0.98] transition"
          >
            Join as listener
          </button>
          <p className="text-[11px] text-muted-foreground mt-3">You can raise your hand to speak anytime.</p>
        </div>
      </div>
    );
  }

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

      <div className="flex-1 px-4 pt-4 pb-44 space-y-5 relative">
        {/* Floating reactions */}
        <div className="pointer-events-none fixed bottom-44 right-6 z-40">
          {reactions.map((r) => (
            <div key={r.id} className="absolute right-0 bottom-0 text-2xl animate-[float_2.5s_ease-out_forwards]" style={{ animation: "float 2.5s ease-out forwards" }}>
              {r.emoji}
            </div>
          ))}
        </div>
        <style>{`@keyframes float { 0%{transform:translateY(0) scale(1);opacity:1} 100%{transform:translateY(-200px) scale(1.4);opacity:0} }`}</style>

        {sState === "raised" && (
          <div className="rounded-2xl bg-neon/10 border border-neon/40 p-3 flex items-center gap-2">
            <Hand className="h-4 w-4 text-neon" />
            <div className="flex-1 text-xs"><span className="font-bold">You're in the speaker queue.</span> The host will let you in soon.</div>
            <button onClick={() => setSpeakState(r.id, "listener")} className="text-[11px] font-bold text-muted-foreground">Cancel</button>
          </div>
        )}
        {sState === "speaker" && (
          <div className="rounded-2xl bg-live/10 border border-live/40 p-3 flex items-center gap-2">
            <Mic className="h-4 w-4 text-live" />
            <div className="flex-1 text-xs"><span className="font-bold">You're on stage.</span> {isMuted ? "Tap mic to unmute." : "Mic is live — speak."}</div>
          </div>
        )}

        <div className="rounded-2xl bg-card border border-border p-3">
          <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-1">Context · {r.region}</div>
          <p className="text-xs">{r.context}</p>
        </div>

        <section>
          <div className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground mb-3">Speakers · {r.speakers.length + (sState === "speaker" ? 1 : 0)}</div>
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
            {sState === "speaker" && (
              <div className="flex flex-col items-center gap-1.5">
                <div className="relative">
                  <img src="https://i.pravatar.cc/100?img=47" alt="" className="h-16 w-16 rounded-full ring-2 ring-live" />
                  <span className={`absolute -bottom-0.5 -right-0.5 h-6 w-6 rounded-full ${isMuted ? "bg-muted text-muted-foreground" : "bg-live text-white"} flex items-center justify-center border-2 border-card`}>
                    {isMuted ? <MicOff className="h-3 w-3" /> : <Mic className="h-3 w-3" />}
                  </span>
                </div>
                <div className="text-[10px] font-semibold text-center leading-tight">You</div>
                <span className="text-[9px] text-live font-bold uppercase">On stage</span>
              </div>
            )}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-3">
            <div className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Listeners · {r.listeners.toLocaleString()}</div>
            <button className="text-[10px] text-neon font-semibold">See all</button>
          </div>
          <div className="grid grid-cols-6 gap-2">
            {audience.map((a) => (
              <img key={a.name} src={a.avatar} alt="" className="h-10 w-10 rounded-full" />
            ))}
          </div>
        </section>

        <section>
          <div className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground mb-2">Top comments</div>
          <div className="space-y-2">
            {[
              { handle: "ngozi", a: "Ngozi I.", t: "BRT lanes only work if enforcement is consistent. Anyone tracking compliance data?", likes: 412 },
              { handle: "tunde", a: "Tunde A.", t: "Third Mainland repairs need a public schedule. Communication is half the battle.", likes: 318 },
              { handle: "adaeze", a: "Adaeze O.", t: "Can we pin the LASTMA Q&A summary? I'll write up bullet points.", likes: 207 },
            ].map((c, i) => (
              <div key={i} className="rounded-2xl bg-card border border-border p-3">
                <Link to="/u/$handle" params={{ handle: c.handle }} className="flex items-center gap-2 mb-1.5">
                  <img src={`https://i.pravatar.cc/100?img=${20 + i * 4}`} alt="" className="h-6 w-6 rounded-full" />
                  <span className="text-xs font-semibold">{c.a}</span>
                  <span className="text-[10px] text-muted-foreground ml-auto">{c.likes} ♥</span>
                </Link>
                <p className="text-xs leading-snug">{c.t}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Comment composer */}
      {showCommentBox && (
        <div className="fixed bottom-[88px] left-0 right-0 z-40 mx-auto max-w-[480px] px-3">
          <div className="rounded-2xl bg-card border border-border p-2 flex items-center gap-2 shadow-xl">
            <input autoFocus placeholder="Add a comment that could spark a room…" className="flex-1 h-9 bg-transparent text-sm outline-none px-2" />
            <button onClick={() => setShowCommentBox(false)} className="h-9 px-3 rounded-full bg-neon text-neon-foreground text-xs font-bold">Send</button>
          </div>
        </div>
      )}

      {/* Sticky action bar */}
      <div className="sticky bottom-0 bg-background/95 backdrop-blur-xl border-t border-border px-3 py-2.5 pb-[max(0.6rem,env(safe-area-inset-bottom))]">
        <div className="flex items-center gap-2">
          {/* Mic / Speak toggle */}
          {sState === "speaker" ? (
            <button onClick={() => toggleMute(r.id)} className={`h-12 w-12 rounded-full flex items-center justify-center shrink-0 ${isMuted ? "bg-secondary" : "bg-live text-white"}`}>
              {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </button>
          ) : sState === "raised" ? (
            <button onClick={() => setSpeakState(r.id, "speaker")} className="h-12 px-4 rounded-full bg-neon text-neon-foreground text-xs font-bold flex items-center gap-1.5 shrink-0">
              <Check className="h-4 w-4" />In queue
            </button>
          ) : (
            <button onClick={() => setSpeakState(r.id, "raised")} className="h-12 px-4 rounded-full bg-neon text-neon-foreground text-xs font-bold flex items-center gap-1.5 shrink-0 neon-glow">
              <Hand className="h-4 w-4" />Speak
            </button>
          )}

          {/* Reactions */}
          <div className="flex items-center gap-1 flex-1 justify-center">
            {["❤️", "🔥", "👏", "💯", "🙏"].map((e) => (
              <button key={e} onClick={() => sendReaction(e)} className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-lg active:scale-90 transition">{e}</button>
            ))}
          </div>

          <button onClick={() => setShowCommentBox((v) => !v)} className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center shrink-0"><MessageCircle className="h-5 w-5" /></button>
          <button className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center shrink-0"><Share2 className="h-5 w-5" /></button>
          <button onClick={() => { setJoined(r.id, false); setSpeakState(r.id, "listener"); }} className="h-12 w-12 rounded-full bg-live/15 text-live flex items-center justify-center shrink-0 font-extrabold">×</button>
        </div>
        <div className="flex items-center gap-1 justify-center mt-1.5">
          <Heart className="h-3 w-3 text-muted-foreground" />
          <span className="text-[10px] text-muted-foreground">{(r.listeners + 1).toLocaleString()} in the room</span>
        </div>
      </div>
    </div>
  );
}
