export type Region = { city: string; state: string; country: string };

export const userRegion: Region = { city: "Lagos", state: "Lagos State", country: "Nigeria" };

export type Room = {
  id: string;
  title: string;
  category: string;
  region: string;
  live: boolean;
  listeners: number;
  speakers: { name: string; avatar: string }[];
  context: string;
  trending?: boolean;
};

export const rooms: Room[] = [
  { id: "lagos-traffic", title: "Lagos Traffic Reform: What's actually working?", category: "Civic", region: "Lagos", live: true, listeners: 4821, speakers: [
    { name: "Adaeze O.", avatar: "https://i.pravatar.cc/100?img=47" },
    { name: "Tunde A.", avatar: "https://i.pravatar.cc/100?img=12" },
    { name: "Ngozi I.", avatar: "https://i.pravatar.cc/100?img=23" },
  ], context: "LASTMA commissioner Q&A live. 38 speakers in queue.", trending: true },
  { id: "afrobeats", title: "Afrobeats Room — Album of the Year debate", category: "Music", region: "Africa", live: true, listeners: 20413, speakers: [
    { name: "DJ Kemi", avatar: "https://i.pravatar.cc/100?img=32" },
    { name: "Wale B.", avatar: "https://i.pravatar.cc/100?img=15" },
  ], context: "Rema vs Asake vs Tems. Heated.", trending: true },
  { id: "super-eagles", title: "Super Eagles tactical breakdown", category: "Sports", region: "Nigeria", live: true, listeners: 7102, speakers: [
    { name: "Coach E.", avatar: "https://i.pravatar.cc/100?img=68" },
    { name: "Ife S.", avatar: "https://i.pravatar.cc/100?img=44" },
  ], context: "AFCON prep. Lineup predictions." },
  { id: "unilag", title: "University of Lagos — Hostel allocation 2026", category: "Campus", region: "Lagos", live: false, listeners: 1240, speakers: [
    { name: "SUG Pres.", avatar: "https://i.pravatar.cc/100?img=5" },
  ], context: "Top comment: 'Why is Mariere closed again?' — 412 replies." },
  { id: "kenya-tech", title: "Nairobi devs: hiring market right now", category: "Business", region: "Kenya", live: true, listeners: 982, speakers: [
    { name: "Wanjiku", avatar: "https://i.pravatar.cc/100?img=26" },
  ], context: "Open roles from 14 startups. Salaries shared." },
  { id: "amapiano", title: "Amapiano Sundays — log-drum masterclass", category: "Music", region: "South Africa", live: false, listeners: 5210, speakers: [
    { name: "Kabza V.", avatar: "https://i.pravatar.cc/100?img=33" },
  ], context: "Replay highlights. 38 saved clips." },
];

export type FeedItem =
  | { kind: "room"; room: Room }
  | { kind: "discussion"; id: string; title: string; author: string; avatar: string; region: string; replies: number; reactions: number; preview: string; topComment: string }
  | { kind: "event"; id: string; title: string; date: string; location: string; attendees: number; image: string; region: string }
  | { kind: "opportunity"; id: string; title: string; org: string; type: string; deadline: string; region: string }
  | { kind: "news"; id: string; title: string; source: string; region: string; comments: number; trending: boolean };

export const feed: FeedItem[] = [
  { kind: "room", room: rooms[0] },
  { kind: "news", id: "n1", title: "CBN announces new FX policy — markets react", source: "Verified · Premium Times", region: "Nigeria", comments: 1284, trending: true },
  { kind: "discussion", id: "d1", title: "Why is rent in Lekki up 80% this year?", author: "Chioma O.", avatar: "https://i.pravatar.cc/100?img=49", region: "Lagos", replies: 312, reactions: 2104, preview: "Landlords are pricing in dollars but salaries are naira. We need a serious conversation about this…", topComment: "\"Real estate is the new oil scam.\" — 412 likes" },
  { kind: "room", room: rooms[1] },
  { kind: "event", id: "e1", title: "Lagos Tech Fest 2026", date: "Sat 14 Feb · 10:00", location: "Landmark Centre, V.I.", attendees: 3211, image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=70", region: "Lagos" },
  { kind: "opportunity", id: "o1", title: "MTN Pulse Scholarship 2026", org: "MTN Foundation", type: "Scholarship · ₦500k", deadline: "Closes in 12 days", region: "Nigeria" },
  { kind: "room", room: rooms[2] },
  { kind: "discussion", id: "d2", title: "Top moments from yesterday's Afrobeats Room", author: "Loop Highlights", avatar: "https://i.pravatar.cc/100?img=66", region: "Africa", replies: 88, reactions: 4500, preview: "AI extracted the 5 sharpest takes from a 4-hour session. Tap to listen.", topComment: "\"Asake's bridge work is criminally underrated.\" — 980 likes" },
];

export type Thread = { id: string; name: string; avatar: string; last: string; time: string; unread: number; online: boolean; fromLoop?: string };
export const threads: Thread[] = [
  { id: "t1", name: "Adaeze Okafor", avatar: "https://i.pravatar.cc/100?img=47", last: "Voice note · 0:42", time: "now", unread: 2, online: true, fromLoop: "Met in Lagos Traffic Room" },
  { id: "t2", name: "Lagos Tech Circle", avatar: "https://i.pravatar.cc/100?img=12", last: "Tunde: shared 3 photos", time: "12m", unread: 5, online: true },
  { id: "t3", name: "Wanjiku M.", avatar: "https://i.pravatar.cc/100?img=26", last: "Sent the deck — let me know 🙏", time: "1h", unread: 0, online: false, fromLoop: "Met in Nairobi Devs Room" },
  { id: "t4", name: "DJ Kemi", avatar: "https://i.pravatar.cc/100?img=32", last: "🔥🔥🔥", time: "3h", unread: 0, online: true },
  { id: "t5", name: "UniLag SUG 2026", avatar: "https://i.pravatar.cc/100?img=5", last: "New hostel update pinned", time: "Yd", unread: 1, online: false },
  { id: "t6", name: "Kabza V.", avatar: "https://i.pravatar.cc/100?img=33", last: "Document · log-drum-pack.zip", time: "Mon", unread: 0, online: false },
];

export const categories = [
  { id: "civic", label: "Civic", emoji: "🏛️" },
  { id: "music", label: "Music", emoji: "🎧" },
  { id: "sports", label: "Sports", emoji: "⚽" },
  { id: "campus", label: "Campus", emoji: "🎓" },
  { id: "business", label: "Business", emoji: "💼" },
  { id: "entertainment", label: "Entertainment", emoji: "🎬" },
  { id: "tech", label: "Tech", emoji: "💻" },
  { id: "creators", label: "Creators", emoji: "✨" },
];
