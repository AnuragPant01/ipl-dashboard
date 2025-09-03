export interface Team {
  id: string;
  name: string;
  logo: string;
  score?: string;
  overs?: string;
}

export interface LiveMatch {
  tournament: string;
  matchType: string;
  venue: string;
  status: string;
  requiredRate: string;
  currentRate: string;
  commentary: string;
  team1: Team;
  team2: Team;
}

export interface TeamStanding {
  name: string;
  played: number;
  won: number;
  lost: number;
  points: number;
  nrr: string;
  logo: string;
}

export interface Match {
  matchId: number;
  team1: string;
  team2: string;
  date: string;
  venue: string;
}

export interface IPLData {
  liveMatch: LiveMatch | null;
  pointsTable: TeamStanding[];
  upcomingMatches: Match[];
  schedule: Match[];
}

export interface PaginatedMatches {
  items: Match[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}
