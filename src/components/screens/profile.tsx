import { Settings, BadgeCheck, MapPin, Mic, MessageCircle, Heart, Users, Shield, Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export function Profile() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="pb-24">
      <div className="relative h-32 bg-gradient-to-br from-neon/30 via-accent to-orange/20">
        <button className="absolute top-3 right-3 h-9 w-9 rounded-full bg-background/80 backdrop-blur flex items-center justify-center"><Settings className="h-4 w-4" /></button>
      </div>
      <div className="px-4 -mt-10">
        <div className="flex items-end justify-between">
          <img src="https://i.pravatar.cc/200?img=47" alt="" className="h-20 w-20 rounded-2xl ring-4 ring-background object-cover" />
          <button className="px-4 py-1.5 rounded-full bg-foreground text-background text-xs font-bold">Edit profile</button>
        </div>
        <div className="mt-3">
          <div className="flex items-center gap-1.5">
            <h1 className="text-xl font-extrabold">Adaeze Okafor</h1>
            <BadgeCheck className="h-5 w-5 text-neon fill-neon/20" />
          </div>
          <div className="text-xs text-muted-foreground">@adaeze · adaeze@rald.me</div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1"><MapPin className="h-3 w-3" />Lagos · Lagos State · Nigeria</div>
          <p className="text-sm mt-2 leading-snug">Civic tech · urban policy nerd · Afrobeats apologist. Building the loop one room at a time.</p>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-4">
          <Stat label="Rooms joined" value="284" />
          <Stat label="Followers" value="3.4k" />
          <Stat label="Trust score" value="92" highlight />
        </div>

        <div className="mt-5 rounded-2xl border border-border p-4 bg-card">
          <div className="flex items-center gap-2 mb-3"><Shield className="h-4 w-4 text-neon" /><span className="text-xs font-bold uppercase tracking-wider">RALD Identity</span></div>
          <div className="space-y-2 text-xs">
            <Row k="RALD ID" v="rald_8f2c…a91" />
            <Row k="Mail" v="adaeze@rald.me" />
            <Row k="Connected apps" v="Loop · Messenger · Mail" />
            <Row k="Trust badges" v="Verified contributor" />
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-border p-4 bg-card">
          <div className="text-xs font-bold uppercase tracking-wider mb-3">Appearance</div>
          <div className="grid grid-cols-3 gap-2">
            {([
              { id: "light", icon: Sun, label: "Light" },
              { id: "dark", icon: Moon, label: "Dark" },
              { id: "system", icon: Monitor, label: "Auto" },
            ] as const).map(opt => {
              const Icon = opt.icon;
              const active = theme === opt.id;
              return (
                <button key={opt.id} onClick={() => setTheme(opt.id)} className={`flex flex-col items-center gap-1 py-3 rounded-xl border ${active ? "border-neon bg-neon/10 text-foreground" : "border-border bg-secondary"}`}>
                  <Icon className={`h-4 w-4 ${active ? "text-neon" : ""}`} />
                  <span className="text-[11px] font-semibold">{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-5">
          <div className="flex gap-1.5 border-b border-border">
            {["Activity", "Rooms", "Comments", "Saved"].map((t, i) => (
              <button key={t} className={`px-3 py-2 text-xs font-semibold border-b-2 ${i === 0 ? "border-neon text-foreground" : "border-transparent text-muted-foreground"}`}>{t}</button>
            ))}
          </div>
          <div className="mt-3 space-y-2">
            <Activity icon={Mic} text="Spoke in Lagos Traffic Reform" meta="2h · 38 reactions" />
            <Activity icon={MessageCircle} text="Top comment in Afrobeats Room" meta="Yesterday · 412 likes" />
            <Activity icon={Heart} text="Joined University of Lagos room" meta="Mon" />
            <Activity icon={Users} text="Connected with Wanjiku M." meta="From Nairobi Devs Room" />
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
function Activity({ icon: Icon, text, meta }: { icon: typeof Mic; text: string; meta: string }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-2xl bg-card border border-border">
      <div className="h-9 w-9 rounded-xl bg-accent flex items-center justify-center"><Icon className="h-4 w-4 text-neon" /></div>
      <div className="flex-1">
        <div className="text-xs font-semibold">{text}</div>
        <div className="text-[10px] text-muted-foreground">{meta}</div>
      </div>
    </div>
  );
}
