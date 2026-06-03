import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  follows: Record<string, boolean>;
  joined: Record<string, boolean>; // roomId -> joined
  speakState: Record<string, "listener" | "raised" | "speaker">; // roomId
  muted: Record<string, boolean>;
  toggleFollow: (handle: string) => void;
  setJoined: (roomId: string, v: boolean) => void;
  setSpeakState: (roomId: string, s: "listener" | "raised" | "speaker") => void;
  toggleMute: (roomId: string) => void;
};

export const useLoop = create<State>()(
  persist(
    (set) => ({
      follows: { tunde: true, wanjiku: true, ngozi: true },
      joined: {},
      speakState: {},
      muted: {},
      toggleFollow: (h) => set((s) => ({ follows: { ...s.follows, [h]: !s.follows[h] } })),
      setJoined: (r, v) => set((s) => ({ joined: { ...s.joined, [r]: v } })),
      setSpeakState: (r, st) => set((s) => ({ speakState: { ...s.speakState, [r]: st } })),
      toggleMute: (r) => set((s) => ({ muted: { ...s.muted, [r]: !s.muted[r] } })),
    }),
    { name: "loop-state" }
  )
);
