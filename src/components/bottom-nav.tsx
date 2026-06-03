import { Link, useLocation } from "@tanstack/react-router";
import { Home, Compass, Plus, MessageCircle, User } from "lucide-react";
import { useState } from "react";
import { CreateSheet } from "./create-sheet";

const items = [
  { to: "/", label: "Feed", icon: Home },
  { to: "/discover", label: "Discover", icon: Compass },
  { to: "/messenger", label: "Chat", icon: MessageCircle },
  { to: "/profile", label: "You", icon: User },
] as const;

export function BottomNav() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="sticky bottom-0 left-0 right-0 z-40 bg-background/85 backdrop-blur-xl border-t border-border">
        <div className="relative grid grid-cols-5 h-16 items-center px-2 pb-[env(safe-area-inset-bottom)]">
          {items.slice(0, 2).map((it) => {
            const active = pathname === it.to;
            const Icon = it.icon;
            return (
              <Link key={it.to} to={it.to} className="flex flex-col items-center justify-center gap-0.5">
                <Icon className={`h-[22px] w-[22px] ${active ? "text-neon" : "text-muted-foreground"}`} strokeWidth={active ? 2.4 : 2} />
                <span className={`text-[10px] ${active ? "text-foreground font-semibold" : "text-muted-foreground"}`}>{it.label}</span>
              </Link>
            );
          })}
          <div className="flex items-center justify-center">
            <button
              onClick={() => setOpen(true)}
              aria-label="Create"
              className="-mt-7 h-14 w-14 rounded-full bg-neon text-neon-foreground flex items-center justify-center neon-glow active:scale-95 transition border-4 border-background"
            >
              <Plus className="h-7 w-7" strokeWidth={3} />
            </button>
          </div>
          {items.slice(2).map((it) => {
            const active = pathname === it.to;
            const Icon = it.icon;
            return (
              <Link key={it.to} to={it.to} className="flex flex-col items-center justify-center gap-0.5">
                <Icon className={`h-[22px] w-[22px] ${active ? "text-neon" : "text-muted-foreground"}`} strokeWidth={active ? 2.4 : 2} />
                <span className={`text-[10px] ${active ? "text-foreground font-semibold" : "text-muted-foreground"}`}>{it.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
      <CreateSheet open={open} onClose={() => setOpen(false)} />
    </>
  );
}
