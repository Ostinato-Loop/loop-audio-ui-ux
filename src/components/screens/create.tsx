import { Link, useNavigate } from "@tanstack/react-router";
import { ChevronLeft, Mic, MessageSquare, Calendar, Users, Image as ImageIcon, FileText, MapPin, Globe2, Lock, Hash, X, CheckCircle2, Share2, Radio, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Route } from "@/routes/_app.create.$kind";
import { categories, userRegion } from "@/lib/mock";
import { useLoop } from "@/lib/store";

const META: Record<string, { icon: typeof Mic; label: string; cta: string; color: string; bg: string; desc: string; fields: ("title" | "context" | "category" | "scope" | "date" | "location")[] }> = {
  room: { icon: Mic, label: "Audio Room", cta: "Go live", color: "text-neon", bg: "bg-neon/15", desc: "Open the floor. Anyone in your region can join, listen, and request to speak.", fields: ["title", "context", "category", "scope"] },
  discussion: { icon: MessageSquare, label: "Discussion", cta: "Post discussion", color: "text-foreground", bg: "bg-secondary", desc: "Start a thread. Top comments become tomorrow's rooms.", fields: ["title", "context", "category", "scope"] },
  event: { icon: Calendar, label: "Event", cta: "Publish event", color: "text-orange", bg: "bg-orange/15", desc: "Gather people around something real, in person or online.", fields: ["title", "context", "date", "location", "scope"] },
  community: { icon: Users, label: "Community", cta: "Create community", color: "text-foreground", bg: "bg-secondary", desc: "A persistent home for an interest, region, or cause.", fields: ["title", "context", "category", "scope"] },
  post: { icon: ImageIcon, label: "Post", cta: "Share post", color: "text-foreground", bg: "bg-secondary", desc: "A photo, a thought, a clip. Quick to share.", fields: ["context", "scope"] },
  article: { icon: FileText, label: "Article", cta: "Publish article", color: "text-foreground", bg: "bg-secondary", desc: "Long-form thoughts that earn discussion.", fields: ["title", "context", "category", "scope"] },
};

export function CreateScreen() {
  const { kind } = Route.useParams();
  const navigate = useNavigate();
  const meta = META[kind] ?? META.room;
  const Icon = meta.icon;
  const { publishRoom } = useLoop();

  const [title, setTitle] = useState("");
  const [context, setContext] = useState("");
  const [category, setCategory] = useState(categories[0].id);
  const [scope, setScope] = useState<"city" | "country" | "africa">("city");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [phase, setPhase] = useState<"compose" | "publishing" | "success">("compose");
  const [publishedId, setPublishedId] = useState<string>("");

  const canSubmit = (!meta.fields.includes("title") || title.trim().length > 3) && context.trim().length > 4;

  const submit = () => {
    if (!canSubmit) return;
    setPhase("publishing");
  };

  // Simulate broadcast
  useEffect(() => {
    if (phase !== "publishing") return;
    const id = (title || context).toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 30) || `loop-${Date.now()}`;
    const t = setTimeout(() => {
      publishRoom({ id, title: title || "Untitled", category, scope });
      setPublishedId(id);
      setPhase("success");
    }, 1100);
    return () => clearTimeout(t);
  }, [phase, title, context, category, scope, publishRoom]);

  if (phase !== "compose") {
    return <PublishedView phase={phase} kind={kind} meta={meta} title={title} context={context} category={category} scope={scope} publishedId={publishedId} onHome={() => navigate({ to: "/" })} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-30 bg-background/90 backdrop-blur-xl border-b border-border px-3 py-2.5 flex items-center gap-2">
        <Link to="/" className="h-9 w-9 rounded-full flex items-center justify-center"><ChevronLeft className="h-5 w-5" /></Link>
        <div className="flex-1">
          <div className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Create</div>
          <div className="text-sm font-bold">New {meta.label}</div>
        </div>
        <button
          onClick={submit}
          disabled={!canSubmit}
          className={`px-4 h-9 rounded-full text-xs font-bold transition ${canSubmit ? "bg-neon text-neon-foreground neon-glow" : "bg-secondary text-muted-foreground"}`}
        >
          {meta.cta}
        </button>
      </header>

      <div className="flex-1 px-4 pt-4 pb-28 space-y-4">
        <div className="flex items-center gap-3">
          <div className={`h-12 w-12 rounded-2xl ${meta.bg} flex items-center justify-center`}>
            <Icon className={`h-5 w-5 ${meta.color}`} />
          </div>
          <p className="text-xs text-muted-foreground flex-1">{meta.desc}</p>
        </div>

        {meta.fields.includes("title") && (
          <Field label="Title" hint={`${title.length}/120`}>
            <input maxLength={120} value={title} onChange={(e) => setTitle(e.target.value)} placeholder={kind === "room" ? "e.g. Lagos rent prices — why now?" : "Give it a clear title"} className="w-full bg-transparent text-base font-semibold outline-none placeholder:text-muted-foreground" />
          </Field>
        )}

        <Field label="Context" hint={`${context.length}/280`}>
          <textarea maxLength={280} rows={3} value={context} onChange={(e) => setContext(e.target.value)} placeholder="Set the scene. Why should people join?" className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground resize-none" />
        </Field>

        {meta.fields.includes("category") && (
          <div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground mb-2">Category</div>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((c) => (
                <button key={c.id} onClick={() => setCategory(c.id)} className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 ${category === c.id ? "bg-neon text-neon-foreground" : "bg-secondary"}`}>
                  <span>{c.emoji}</span>{c.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {meta.fields.includes("date") && (
          <div className="grid grid-cols-2 gap-2">
            <Field label="Date"><input type="date" className="w-full bg-transparent text-sm outline-none" /></Field>
            <Field label="Time"><input type="time" className="w-full bg-transparent text-sm outline-none" /></Field>
          </div>
        )}
        {meta.fields.includes("location") && (
          <Field label="Location" icon={MapPin}>
            <input placeholder="Venue or 'Online'" className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
          </Field>
        )}

        <div>
          <div className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground mb-2">Who can see this</div>
          <div className="grid grid-cols-3 gap-2">
            {([
              { id: "city", icon: MapPin, label: userRegion.city, sub: "City" },
              { id: "country", icon: Globe2, label: userRegion.country, sub: "Country" },
              { id: "africa", icon: Globe2, label: "Africa", sub: "All regions" },
            ] as const).map((o) => {
              const I = o.icon;
              const active = scope === o.id;
              return (
                <button key={o.id} onClick={() => setScope(o.id)} className={`p-3 rounded-2xl border text-left ${active ? "border-neon bg-neon/10" : "border-border bg-card"}`}>
                  <I className={`h-4 w-4 mb-1.5 ${active ? "text-neon" : "text-muted-foreground"}`} />
                  <div className="text-xs font-bold leading-tight">{o.label}</div>
                  <div className="text-[10px] text-muted-foreground">{o.sub}</div>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <div className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground mb-2 flex items-center gap-1"><Hash className="h-3 w-3" />Tags</div>
          <div className="rounded-2xl bg-card border border-border p-3 flex flex-wrap items-center gap-1.5">
            {tags.map((t) => (
              <span key={t} className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-secondary text-[11px] font-semibold">
                #{t}
                <button onClick={() => setTags(tags.filter((x) => x !== t))}><X className="h-3 w-3" /></button>
              </span>
            ))}
            <input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
                  e.preventDefault();
                  const t = tagInput.trim().replace(/^#/, "");
                  if (!tags.includes(t)) setTags([...tags, t]);
                  setTagInput("");
                }
              }}
              placeholder={tags.length ? "Add another" : "lagos, traffic, lastma"}
              className="flex-1 min-w-[100px] bg-transparent text-xs outline-none placeholder:text-muted-foreground"
            />
          </div>
        </div>

        <div className="rounded-2xl bg-secondary/60 border border-border p-3 flex items-start gap-2">
          <Lock className="h-3.5 w-3.5 text-muted-foreground mt-0.5" />
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Loop is public participation. For private chats use <span className="font-semibold text-foreground">Messenger</span>. Verified content earns trust score.
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({ label, hint, icon: I, children }: { label: string; hint?: string; icon?: typeof Mic; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-card border border-border p-3">
      <div className="flex items-center justify-between mb-1">
        <div className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground flex items-center gap-1">
          {I && <I className="h-3 w-3" />}{label}
        </div>
        {hint && <div className="text-[10px] text-muted-foreground">{hint}</div>}
      </div>
      {children}
    </div>
  );
}
