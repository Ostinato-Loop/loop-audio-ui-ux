export function LoopMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 32" className={className} fill="none">
      <path
        d="M16 4c-6.6 0-12 5.4-12 12s5.4 12 12 12c4.4 0 8-2.4 11-6l5-6 5-6c3-3.6 6.6-6 11-6 6.6 0 12 5.4 12 12s-5.4 12-12 12c-4.4 0-8-2.4-11-6l-5-6-5-6c-3-3.6-6.6-6-11-6z"
        stroke="currentColor" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round"
      />
    </svg>
  );
}

export function LoopWordmark({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-foreground text-2xl font-bold tracking-tight">l</span>
      <LoopMark className="h-5 w-10 text-neon" />
      <span className="text-foreground text-2xl font-bold tracking-tight -ml-1">p</span>
    </div>
  );
}
