import { Link } from "@tanstack/react-router";
import { Search, MapPin, TrendingUp, Mic } from "lucide-react";
import { rooms, categories, userRegion } from "@/lib/mock";

export function Discover() {
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
            {categories.map(c => (
              <button key={c.id} className="flex flex-col items-center justify-center gap-1 py-3 rounded-2xl bg-secondary">
                <span className="text-2xl">{c.emoji}</span>
                <span className="text-[10px] font-semibold">{c.label}</span>
              </button>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-bold mb-2 flex items-center gap-1.5"><TrendingUp className="h-3.5 w-3.5 text-neon" />Trending across Africa</h2>
          <div className="space-y-2">
            {rooms.map(r => (
              <Link key={r.id} to="/rooms/$roomId" params={{ roomId: r.id }} className="flex items-center gap-3 p-3 rounded-2xl bg-card border border-border">
                <div className="h-11 w-11 rounded-xl bg-accent flex items-center justify-center shrink-0">
                  <Mic className="h-5 w-5 text-neon" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold truncate">{r.title}</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">{r.category} · {r.region} · {r.listeners.toLocaleString()} listening</div>
                </div>
                {r.live && <span className="h-2 w-2 rounded-full live-dot shrink-0" />}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
