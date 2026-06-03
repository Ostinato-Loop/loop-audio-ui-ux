export type Person = { handle: string; name: string; avatar: string; bio: string; region: string; verified?: boolean; trust: number; followers: number; following: number; metVia?: string };

export const people: Person[] = [
  { handle: "adaeze", name: "Adaeze Okafor", avatar: "https://i.pravatar.cc/200?img=47", bio: "Civic tech · urban policy nerd · Afrobeats apologist.", region: "Lagos · Nigeria", verified: true, trust: 92, followers: 3421, following: 284 },
  { handle: "tunde", name: "Tunde Adebayo", avatar: "https://i.pravatar.cc/200?img=12", bio: "Mobility researcher. BRT skeptic. Writing about Lagos.", region: "Lagos · Nigeria", trust: 81, followers: 1820, following: 410, metVia: "Lagos Traffic Room" },
  { handle: "ngozi", name: "Ngozi Iweala", avatar: "https://i.pravatar.cc/200?img=23", bio: "Policy + data. Always asking for the spreadsheet.", region: "Abuja · Nigeria", verified: true, trust: 95, followers: 12400, following: 88, metVia: "Lagos Traffic Room" },
  { handle: "wanjiku", name: "Wanjiku Mwangi", avatar: "https://i.pravatar.cc/200?img=26", bio: "Engineer @ Nairobi. Building things that compile.", region: "Nairobi · Kenya", trust: 88, followers: 4210, following: 312, metVia: "Nairobi Devs Room" },
  { handle: "djkemi", name: "DJ Kemi", avatar: "https://i.pravatar.cc/200?img=32", bio: "Selector. Afrobeats / Amapiano / heartbreaks.", region: "Accra · Ghana", verified: true, trust: 86, followers: 28100, following: 142, metVia: "Afrobeats Room" },
  { handle: "kabza", name: "Kabza V.", avatar: "https://i.pravatar.cc/200?img=33", bio: "Log-drum architect. Sundays only.", region: "Johannesburg · SA", trust: 90, followers: 19400, following: 60 },
  { handle: "ife", name: "Ife Salami", avatar: "https://i.pravatar.cc/200?img=44", bio: "Football tactics nerd. AFCON twice over.", region: "Ibadan · Nigeria", trust: 78, followers: 980, following: 520, metVia: "Super Eagles Room" },
  { handle: "chioma", name: "Chioma Okonkwo", avatar: "https://i.pravatar.cc/200?img=49", bio: "Renting in Lekki and angry about it.", region: "Lagos · Nigeria", trust: 74, followers: 612, following: 410 },
];

export const me: Person = {
  handle: "you",
  name: "Adaeze Okafor",
  avatar: "https://i.pravatar.cc/200?img=47",
  bio: "Civic tech · urban policy nerd · Afrobeats apologist. Building the loop one room at a time.",
  region: "Lagos · Lagos State · Nigeria",
  verified: true,
  trust: 92,
  followers: 3421,
  following: 284,
};
