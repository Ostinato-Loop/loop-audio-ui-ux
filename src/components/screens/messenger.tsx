import { Link } from "@tanstack/react-router";
import { Search, PenSquare, Users } from "lucide-react";
import { threads } from "@/lib/mock";

export function Messenger() {
  return (
    <div>
      <header className="sticky top-0 z-30 bg-background/85 backdrop-blur-xl border-b border-border px-4 pt-3 pb-3">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">Messages</h1>
            <p className="text-[11px] text-muted-foreground">Loop introduces. Messenger keeps it going.</p>
          </div>
          <button className="h-10 w-10 rounded-full bg-orange/15 text-orange flex items-center justify-center"><PenSquare className="h-4 w-4" /></button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input placeholder="Search chats" className="w-full h-10 pl-10 pr-3 rounded-full bg-secondary text-sm outline-none" />
        </div>
        <div className="flex gap-2 overflow-x-auto scrollbar-none mt-3 -mx-1 px-1">
          {threads.filter(t => t.online).map(t => (
            <div key={t.id} className="shrink-0 flex flex-col items-center gap-1 w-14">
              <div className="relative">
                <img src={t.avatar} alt="" className="h-12 w-12 rounded-full ring-2 ring-neon" />
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-neon border-2 border-background" />
              </div>
              <span className="text-[10px] truncate w-full text-center">{t.name.split(" ")[0]}</span>
            </div>
          ))}
        </div>
      </header>

      <div className="pb-24">
        <div className="px-4 pt-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">From Loop</div>
        {threads.filter(t => t.fromLoop).map(t => <ThreadRow key={t.id} t={t} />)}
        <div className="px-4 pt-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">All chats</div>
        {threads.filter(t => !t.fromLoop).map(t => <ThreadRow key={t.id} t={t} />)}
      </div>
    </div>
  );
}

function ThreadRow({ t }: { t: typeof threads[number] }) {
  return (
    <Link to="/messenger/$threadId" params={{ threadId: t.id }} className="flex items-center gap-3 px-4 py-3 hover:bg-secondary transition">
      <div className="relative shrink-0">
        <img src={t.avatar} alt="" className="h-12 w-12 rounded-full" />
        {t.name.includes("Circle") || t.name.includes("SUG") ? (
          <span className="absolute -bottom-0.5 -right-0.5 h-5 w-5 rounded-full bg-secondary border-2 border-background flex items-center justify-center"><Users className="h-2.5 w-2.5" /></span>
        ) : null}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <div className="font-semibold text-sm truncate">{t.name}</div>
          <div className="text-[10px] text-muted-foreground shrink-0 ml-2">{t.time}</div>
        </div>
        {t.fromLoop && <div className="text-[10px] text-neon font-semibold">↺ {t.fromLoop}</div>}
        <div className="flex items-center justify-between mt-0.5">
          <div className={`text-xs truncate ${t.unread ? "text-foreground font-semibold" : "text-muted-foreground"}`}>{t.last}</div>
          {t.unread > 0 && <span className="ml-2 h-5 min-w-5 px-1.5 rounded-full bg-orange text-white text-[10px] font-bold flex items-center justify-center">{t.unread}</span>}
        </div>
      </div>
    </Link>
  );
}
