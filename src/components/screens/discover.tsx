import { Link } from "@tanstack/react-router";
import { Search, MapPin, TrendingUp, Mic, Sparkles, Check, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { rooms, categories, userRegion } from "@/lib/mock";
import { useLoop } from "@/lib/store";

export function Discover() {
  const { interests, toggleInterest } = useLoop();
  const [editing, setEditing] = useState(false);
  const activeIds = useMemo(() => Object.keys(interests).filter((k) => interests[k]), [interests]);
  const hasInterests = activeIds.length > 0;

  const personalized = useMemo(() => {
    if (!hasInterests) return rooms;
    const labels = new Set(activeIds.map((id) => categories.find((c) => c.id === id)?.label));
    const scored = rooms
      .map((r) => ({ r, score: (labels.has(r.category) ? 3 : 0) + (r.region === userRegion.city ? 2 : 0) + (r.live ? 1 : 0) }))
      .sort((a, b) => b.score - a.score);
    return scored.map((s) => s.r);
  }, [activeIds, hasInterests]);

  return (
    <div>
      <header className="sticky top-0 z-30 bg-background/85 backdrop-blur-xl border-b border-border px-4 pt-3 pb-3">
        <h1 className="text-2xl font-extrabold tracking-tight mb-3">Discover</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input placeholder="Rooms, people, communities, events…" className="w-full h-11 pl-10 pr-3 rounded-full bg-secondary text-sm placeholder:text-muted-foreground outline-none" />
        </div>
      </header>

      <div className="px-4 pt-4 pb-24 space-y-6">
        {/* Personalization bar */}
        <section className="rounded-2xl border border-neon/30 bg-gradient-to-br from-neon/10 via-card to-card p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-neon" />
              <span className="text-xs font-bold uppercase tracking-wider">Tuned for you</span>
            </div>
            <button onClick={() => setEditing((v) => !v)} className="text-[11px] font-bold text-neon flex items-center gap-1">
              <SlidersHorizontal className="h-3 w-3" />{editing ? "Done" : "Edit interests"}
            </button>
          </div>
          {editing ? (
            <>
              <p className="text-[11px] text-muted-foreground mb-2">Pick what should rise to the top of your feed.</p>
              <div className="flex flex-wrap gap-1.5">
                {categories.map((c) => {
                  const on = !!interests[c.id];
                  return (
                    <button key={c.id} onClick={() => toggleInterest(c.id)} className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 transition ${on ? "bg-neon text-neon-foreground" : "bg-secondary"}`}>
                      <span>{c.emoji}</span>{c.label}
                      {on && <Check className="h-3 w-3" />}
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <p className="text-[11px] text-muted-foreground mb-2">
                {hasInterests
                  ? `Sorted by ${activeIds.map((id) => categories.find((c) => c.id === id)?.label).filter(Boolean).join(" · ")} near ${userRegion.city}`
                  : "Add interests to personalize what Loop surfaces first."}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {(hasInterests ? categories.filter((c) => interests[c.id]) : categories.slice(0, 4)).map((c) => (
                  <span key={c.id} className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-secondary flex items-center gap-1">
                    <span>{c.emoji}</span>{c.label}
                  </span>
                ))}
              </div>
            </>
          )}
        </section>

        <section>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-bold flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-neon" />Near {userRegion.city}</h2>
            <button className="text-xs text-muted-foreground">Change</button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {rooms.filter(r => r.region === "Lagos" || r.region === "Nigeria").slice(0, 4).map(r => (
              <Link key={r.id} to="/rooms/$roomId" params={{ roomId: r.id }} className="rounded-2xl bg-card border border-border p-3">
                {r.live ? <div className="flex items-center gap-1 mb-1.5"><span className="h-1.5 w-1.5 rounded-full live-dot" /><span className="text-[10px] font-bold uppercase text-live">Live</span></div> : <div className="text-[10px] uppercase text-muted-foreground font-bold mb-1.5">{r.category}</div>}
                <div className="text-xs font-semibold line-clamp-2 mb-2 min-h-[2rem]">{r.title}</div>
                <div className="text-[10px] text-muted-foreground">{r.listeners.toLocaleString()} listening</div>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-bold mb-2">Browse by category</h2>
          <div className="grid grid-cols-4 gap-2">
            {categories.map(c => {
              const on = !!interests[c.id];
              return (
                <button key={c.id} onClick={() => toggleInterest(c.id)} className={`relative flex flex-col items-center justify-center gap-1 py-3 rounded-2xl transition ${on ? "bg-neon/15 ring-1 ring-neon/40" : "bg-secondary"}`}>
                  <span className="text-2xl">{c.emoji}</span>
                  <span className="text-[10px] font-semibold">{c.label}</span>
                  {on && <span className="absolute top-1.5 right-1.5 h-3.5 w-3.5 rounded-full bg-neon text-neon-foreground flex items-center justify-center"><Check className="h-2.5 w-2.5" /></span>}
                </button>
              );
            })}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-bold mb-2 flex items-center gap-1.5">
            <TrendingUp className="h-3.5 w-3.5 text-neon" />
            {hasInterests ? "Picked for your interests" : "Trending across Africa"}
          </h2>
          <div className="space-y-2">
            {personalized.map(r => {
              const matched = categories.find((c) => c.label === r.category && interests[c.id]);
              return (
                <Link key={r.id} to="/rooms/$roomId" params={{ roomId: r.id }} className="flex items-center gap-3 p-3 rounded-2xl bg-card border border-border">
                  <div className="h-11 w-11 rounded-xl bg-accent flex items-center justify-center shrink-0">
                    <Mic className="h-5 w-5 text-neon" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      {matched && <span className="text-[9px] font-extrabold uppercase tracking-wider text-neon-foreground bg-neon px-1.5 py-0.5 rounded-sm">For you</span>}
                      <div className="text-xs font-semibold truncate">{r.title}</div>
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">{r.category} · {r.region} · {r.listeners.toLocaleString()} listening</div>
                  </div>
                  {r.live && <span className="h-2 w-2 rounded-full live-dot shrink-0" />}
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
