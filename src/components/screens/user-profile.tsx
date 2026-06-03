import { Link } from "@tanstack/react-router";
import { ChevronLeft, BadgeCheck, MapPin, MessageCircle, Mic, Shield, Users, MoreHorizontal } from "lucide-react";
import { Route } from "@/routes/_app.u.$handle";
import { people } from "@/lib/people";
import { rooms } from "@/lib/mock";
import { useLoop } from "@/lib/store";

export function UserProfile() {
  const { handle } = Route.useParams();
  const p = people.find((x) => x.handle === handle) ?? people[0];
  const { follows, toggleFollow } = useLoop();
  const isFollowing = !!follows[p.handle];

  return (
    <div className="pb-24">
      <div className="relative h-28 bg-gradient-to-br from-neon/30 via-accent to-orange/20">
        <Link to="/" className="absolute top-3 left-3 h-9 w-9 rounded-full bg-background/80 backdrop-blur flex items-center justify-center"><ChevronLeft className="h-5 w-5" /></Link>
        <button className="absolute top-3 right-3 h-9 w-9 rounded-full bg-background/80 backdrop-blur flex items-center justify-center"><MoreHorizontal className="h-4 w-4" /></button>
      </div>
      <div className="px-4 -mt-10">
        <div className="flex items-end justify-between">
          <img src={p.avatar} alt="" className="h-20 w-20 rounded-2xl ring-4 ring-background object-cover" />
          <div className="flex items-center gap-2">
            <Link to="/messenger/$threadId" params={{ threadId: "t1" }} className="px-4 py-1.5 rounded-full bg-secondary text-xs font-bold flex items-center gap-1.5"><MessageCircle className="h-3.5 w-3.5" />Message</Link>
            <button onClick={() => toggleFollow(p.handle)} className={`px-4 py-1.5 rounded-full text-xs font-bold transition ${isFollowing ? "bg-secondary text-foreground" : "bg-neon text-neon-foreground neon-glow"}`}>
              {isFollowing ? "Following" : "Follow"}
            </button>
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-center gap-1.5">
            <h1 className="text-xl font-extrabold">{p.name}</h1>
            {p.verified && <BadgeCheck className="h-5 w-5 text-neon fill-neon/20" />}
          </div>
          <div className="text-xs text-muted-foreground">@{p.handle} · {p.handle}@rald.me</div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1"><MapPin className="h-3 w-3" />{p.region}</div>
          {p.metVia && <div className="mt-2 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-neon/10 text-[10px] font-bold text-neon">↺ Met via {p.metVia}</div>}
          <p className="text-sm mt-2 leading-snug">{p.bio}</p>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-4">
          <Stat label="Followers" value={fmt(p.followers + (isFollowing ? 1 : 0))} />
          <Stat label="Following" value={fmt(p.following)} />
          <Stat label="Trust" value={String(p.trust)} highlight />
        </div>

        <div className="mt-5 rounded-2xl border border-border p-4 bg-card">
          <div className="flex items-center gap-2 mb-3"><Shield className="h-4 w-4 text-neon" /><span className="text-xs font-bold uppercase tracking-wider">RALD Identity</span></div>
          <div className="space-y-2 text-xs">
            <Row k="RALD ID" v={`rald_${p.handle}_8f2c`} />
            <Row k="Mail" v={`${p.handle}@rald.me`} />
            <Row k="Trust score" v={`${p.trust} / 100`} />
            {p.verified && <Row k="Badge" v="Verified contributor" />}
          </div>
        </div>

        <div className="mt-5">
          <div className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground mb-2"><Mic className="h-3 w-3 inline mr-1" />Active in</div>
          <div className="space-y-2">
            {rooms.slice(0, 3).map((r) => (
              <Link key={r.id} to="/rooms/$roomId" params={{ roomId: r.id }} className="flex items-center gap-3 p-3 rounded-2xl bg-card border border-border">
                <div className="h-9 w-9 rounded-xl bg-accent flex items-center justify-center"><Mic className="h-4 w-4 text-neon" /></div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold truncate">{r.title}</div>
                  <div className="text-[10px] text-muted-foreground">{r.category} · {r.region}</div>
                </div>
                {r.live && <span className="h-2 w-2 rounded-full live-dot shrink-0" />}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <div className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground mb-2"><Users className="h-3 w-3 inline mr-1" />Mutuals</div>
          <div className="flex -space-x-2">
            {people.slice(0, 6).map((m) => (
              <Link key={m.handle} to="/u/$handle" params={{ handle: m.handle }}>
                <img src={m.avatar} alt="" className="h-8 w-8 rounded-full border-2 border-background" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`rounded-2xl p-3 text-center ${highlight ? "bg-neon/10 border border-neon/40" : "bg-secondary"}`}>
      <div className={`text-lg font-extrabold ${highlight ? "text-neon" : ""}`}>{value}</div>
      <div className="text-[10px] text-muted-foreground">{label}</div>
    </div>
  );
}
function Row({ k, v }: { k: string; v: string }) {
  return <div className="flex items-center justify-between"><span className="text-muted-foreground">{k}</span><span className="font-semibold">{v}</span></div>;
}
function fmt(n: number) { return n >= 1000 ? (n / 1000).toFixed(1) + "k" : String(n); }
