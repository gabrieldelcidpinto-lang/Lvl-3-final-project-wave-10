export type GameStatus = "Accepted" | "Declined" | "Pending" | "Withdrawn";

export interface Official {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  dob: string;
  location: string;
  certification: string;
  photo: string;
  type: "official" | "assigner";
}

export interface Game {
  id: string;
  date: string;
  time: string;
  endTime: string;
  division: string;
  competition: string;
  format: string;
  homeTeam: string;
  awayTeam: string;
  venue: string;
  address: string;
  fee: number;
  status: GameStatus;
  assigner: string;
  crewChief: Official;
  u1: Official;
  u2: Official;
  notes: string;
}

export const currentUser: Official = {
  id: "u0",
  name: "Marcus Rivera",
  role: "U1 / Crew Chief",
  email: "marcus.rivera@nboa.org",
  phone: "+1 (416) 555-0192",
  dob: "March 14, 1988",
  location: "Toronto, ON",
  certification: "FIBA Level 3 — National",
  photo:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&auto=format",
  type: "official",
};

export const officials: Official[] = [
  {
    id: "u1",
    name: "Devon Whitmore",
    role: "Crew Chief",
    email: "devon.whitmore@nboa.org",
    phone: "+1 (416) 555-0147",
    dob: "June 22, 1982",
    location: "Toronto, ON",
    certification: "FIBA Level 3 — National",
    photo:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&auto=format",
    type: "official",
  },
  {
    id: "u2",
    name: "Alicia Fontaine",
    role: "U2",
    email: "alicia.fontaine@nboa.org",
    phone: "+1 (647) 555-0238",
    dob: "November 5, 1991",
    location: "Mississauga, ON",
    certification: "FIBA Level 2 — Provincial",
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&auto=format",
    type: "official",
  },
  {
    id: "u3",
    name: "James Okafor",
    role: "U2",
    email: "james.okafor@nboa.org",
    phone: "+1 (905) 555-0312",
    dob: "February 19, 1989",
    location: "Brampton, ON",
    certification: "FIBA Level 2 — Provincial",
    photo:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&auto=format",
    type: "official",
  },
  {
    id: "u4",
    name: "Sofia Mendes",
    role: "Supervisor",
    email: "sofia.mendes@nboa.org",
    phone: "+1 (416) 555-0401",
    dob: "August 30, 1979",
    location: "Toronto, ON",
    certification: "FIBA Evaluator — National",
    photo:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&auto=format",
    type: "official",
  },
];

export const assigner: Official = {
  id: "a1",
  name: "Robert Haines",
  role: "Head Assigner",
  email: "r.haines@nboa.org",
  phone: "+1 (416) 555-0078",
  dob: "April 11, 1975",
  location: "Toronto, ON",
  certification: "",
  photo:
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&auto=format",
  type: "assigner",
};

export const games: Game[] = [
  {
    id: "G-2026-0841",
    date: "2026-10-03",
    time: "19:30",
    endTime: "21:45",
    division: "Division I",
    competition: "NBOA Premier League 2026–27",
    format: "3-Person Crew",
    homeTeam: "Toronto Raptors Academy",
    awayTeam: "Hamilton Storm",
    venue: "Scotiabank Arena — Practice Court B",
    address: "40 Bay St, Toronto, ON M5J 2X2",
    fee: 185,
    status: "Accepted",
    assigner: "Robert Haines",
    crewChief: officials[0],
    u1: currentUser,
    u2: officials[1],
    notes:
      "Media timeout protocol applies. Home team wears white. Visitor locker room key at gate 4 security desk.",
  },
  {
    id: "G-2026-0856",
    date: "2026-10-07",
    time: "18:00",
    endTime: "20:15",
    division: "Division I",
    competition: "NBOA Premier League 2026–27",
    format: "3-Person Crew",
    homeTeam: "Ottawa Capital",
    awayTeam: "Kingston Fronts",
    venue: "Richcraft Rec Complex — Court 1",
    address: "4101 Strandherd Dr, Nepean, ON K2J 0S7",
    fee: 175,
    status: "Accepted",
    assigner: "Robert Haines",
    crewChief: officials[0],
    u1: currentUser,
    u2: officials[2],
    notes:
      "Arrive 45 min early for facility orientation. Shot clock operator: venue staff.",
  },
  {
    id: "G-2026-0872",
    date: "2026-10-11",
    time: "14:00",
    endTime: "16:15",
    division: "Division II",
    competition: "NBOA Development League 2026–27",
    format: "2-Person Crew",
    homeTeam: "Scarborough Shooting Stars",
    awayTeam: "Etobicoke Eagles",
    venue: "Birchmount Community Centre",
    address: "93 Birchmount Rd, Scarborough, ON M1N 3J7",
    fee: 120,
    status: "Pending",
    assigner: "Robert Haines",
    crewChief: currentUser,
    u1: officials[1],
    u2: officials[1],
    notes: "",
  },
  {
    id: "G-2026-0801",
    date: "2026-09-20",
    time: "20:00",
    endTime: "22:00",
    division: "Division I",
    competition: "NBOA Premier League 2026–27",
    format: "3-Person Crew",
    homeTeam: "Mississauga Majors",
    awayTeam: "Oakville Olsters",
    venue: "Hershey Centre",
    address: "5765 Kennedy Rd, Mississauga, ON L4Z 2G5",
    fee: 185,
    status: "Accepted",
    assigner: "Robert Haines",
    crewChief: officials[0],
    u1: currentUser,
    u2: officials[2],
    notes: "",
  },
  {
    id: "G-2026-0789",
    date: "2026-09-14",
    time: "13:30",
    endTime: "15:30",
    division: "Division I",
    competition: "NBOA Premier League 2026–27",
    format: "3-Person Crew",
    homeTeam: "London Lightning",
    awayTeam: "Windsor Express",
    venue: "Budweiser Gardens",
    address: "99 Dundas St, London, ON N6A 6K1",
    fee: 185,
    status: "Declined",
    assigner: "Robert Haines",
    crewChief: officials[0],
    u1: currentUser,
    u2: officials[1],
    notes: "",
  },
  {
    id: "G-2026-0760",
    date: "2026-09-06",
    time: "17:00",
    endTime: "19:00",
    division: "Division II",
    competition: "NBOA Development League 2026–27",
    format: "2-Person Crew",
    homeTeam: "Barrie Breakfast Club",
    awayTeam: "Collingwood Bears",
    venue: "Barrie Community Sports Complex",
    address: "250 Ferndale Dr N, Barrie, ON L4N 9S9",
    fee: 120,
    status: "Withdrawn",
    assigner: "Robert Haines",
    crewChief: officials[2],
    u1: currentUser,
    u2: officials[2],
    notes: "",
  },
  {
    id: "G-2026-0890",
    date: "2026-10-18",
    time: "15:00",
    endTime: "17:15",
    division: "Division I",
    competition: "NBOA Premier League 2026–27",
    format: "3-Person Crew",
    homeTeam: "Niagara River Lions",
    awayTeam: "Guelph Nighthawks",
    venue: "Meridian Centre",
    address: "1 St Paul St, St. Catharines, ON L2S 0A5",
    fee: 185,
    status: "Pending",
    assigner: "Robert Haines",
    crewChief: officials[0],
    u1: currentUser,
    u2: officials[2],
    notes: "",
  },
];

export interface CalendarBlock {
  id: string;
  type: "Vacation" | "Personal" | "Work Conflict" | "Medical" | "Travel";
  date: string;
  startTime: string;
  endTime: string;
  created: string;
  note: string;
}

export const blocks: CalendarBlock[] = [
  {
    id: "B-001",
    type: "Vacation",
    date: "2026-10-24",
    startTime: "All Day",
    endTime: "All Day",
    created: "2026-09-15",
    note: "Family trip to Montreal",
  },
  {
    id: "B-002",
    type: "Work Conflict",
    date: "2026-10-25",
    startTime: "All Day",
    endTime: "All Day",
    created: "2026-09-15",
    note: "Quarterly review",
  },
  {
    id: "B-003",
    type: "Personal",
    date: "2026-11-01",
    startTime: "10:00",
    endTime: "14:00",
    created: "2026-09-22",
    note: "",
  },
];
