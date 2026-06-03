import { Link } from "@tanstack/react-router";
import { Mic, MessageSquare, Calendar, Users, Image as ImageIcon, FileText, X } from "lucide-react";

const actions = [
  { kind: "room", icon: Mic, label: "Audio Room", desc: "Start a live conversation", color: "text-neon", bg: "bg-neon/10" },
  { kind: "discussion", icon: MessageSquare, label: "Discussion", desc: "Open a public discussion", color: "text-foreground", bg: "bg-secondary" },
  { kind: "event", icon: Calendar, label: "Event", desc: "Plan an event in your region", color: "text-orange", bg: "bg-orange/10" },
  { kind: "community", icon: Users, label: "Community", desc: "Build a new community", color: "text-foreground", bg: "bg-secondary" },
  { kind: "post", icon: ImageIcon, label: "Post", desc: "Share photos & media", color: "text-foreground", bg: "bg-secondary" },
  { kind: "article", icon: FileText, label: "Article", desc: "Publish long-form thoughts", color: "text-foreground", bg: "bg-secondary" },
] as const;

export function CreateSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm animate-in fade-in" />
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[480px] bg-card rounded-t-3xl p-5 pb-8 animate-in slide-in-from-bottom duration-300 border-t border-border"
      >
        <div className="mx-auto h-1 w-10 rounded-full bg-border mb-3" />
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Create on Loop</h2>
          <button onClick={onClose} className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
            <X className="h-4 w-4" />
          </button>
        </div>
        <p className="text-sm text-muted-foreground mb-5">Start something people in your region can join.</p>
        <div className="space-y-2">
          {actions.map((a) => {
            const Icon = a.icon;
            return (
              <Link
                key={a.kind}
                to="/create/$kind"
                params={{ kind: a.kind }}
                onClick={onClose}
                className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-secondary transition text-left"
              >
                <div className={`h-11 w-11 rounded-xl ${a.bg} flex items-center justify-center`}>
                  <Icon className={`h-5 w-5 ${a.color}`} />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm">{a.label}</div>
                  <div className="text-xs text-muted-foreground">{a.desc}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
