import { create } from "zustand";
import { persist } from "zustand/middleware";

export type NotifLevel = "all" | "rooms" | "posts" | "off";

type State = {
  follows: Record<string, boolean>;
  notifPrefs: Record<string, NotifLevel>; // handle -> level
  joined: Record<string, boolean>;
  speakState: Record<string, "listener" | "raised" | "speaker">;
  muted: Record<string, boolean>;
  queuePos: Record<string, number>; // roomId -> position when raised
  interests: Record<string, boolean>; // category id -> on
  publishedRooms: { id: string; title: string; category: string; scope: string; at: number }[];
  toggleFollow: (handle: string) => void;
  setNotifPref: (handle: string, l: NotifLevel) => void;
  setJoined: (roomId: string, v: boolean) => void;
  setSpeakState: (roomId: string, s: "listener" | "raised" | "speaker") => void;
  setQueuePos: (roomId: string, n: number) => void;
  toggleMute: (roomId: string) => void;
  toggleInterest: (id: string) => void;
  publishRoom: (r: { id: string; title: string; category: string; scope: string }) => void;
};

export const useLoop = create<State>()(
  persist(
    (set) => ({
      follows: { tunde: true, wanjiku: true, ngozi: true },
      notifPrefs: { tunde: "all", wanjiku: "rooms", ngozi: "all" },
      joined: {},
      speakState: {},
      muted: {},
      queuePos: {},
      interests: { civic: true, music: true, tech: true },
      publishedRooms: [],
      toggleFollow: (h) =>
        set((s) => {
          const on = !s.follows[h];
          return {
            follows: { ...s.follows, [h]: on },
            notifPrefs: { ...s.notifPrefs, [h]: on ? s.notifPrefs[h] ?? "all" : "off" },
          };
        }),
      setNotifPref: (h, l) => set((s) => ({ notifPrefs: { ...s.notifPrefs, [h]: l } })),
      setJoined: (r, v) => set((s) => ({ joined: { ...s.joined, [r]: v } })),
      setSpeakState: (r, st) => set((s) => ({ speakState: { ...s.speakState, [r]: st } })),
      setQueuePos: (r, n) => set((s) => ({ queuePos: { ...s.queuePos, [r]: n } })),
      toggleMute: (r) => set((s) => ({ muted: { ...s.muted, [r]: !s.muted[r] } })),
      toggleInterest: (id) =>
        set((s) => ({ interests: { ...s.interests, [id]: !s.interests[id] } })),
      publishRoom: (r) =>
        set((s) => ({ publishedRooms: [{ ...r, at: Date.now() }, ...s.publishedRooms] })),
    }),
    { name: "loop-state" }
  )
);
