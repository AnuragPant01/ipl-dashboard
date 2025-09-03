import type { NextApiRequest, NextApiResponse } from "next";
import type { IPLData, LiveMatch, TeamStanding, Match } from "../../lib/types";
import liveMock from "../../lib/mocks/live.json";
import matchesMock from "../../lib/mocks/matches.json";
import pointsMock from "../../lib/mocks/points.json";

const API_BASE = "https://api.cricapi.com/v1";
const USE_MOCKS = true; // Toggle: set to false to re-enable live API calls

async function fetchJSON(path: string, apiKey: string) {
  const url = `${API_BASE}/${path}?apikey=${encodeURIComponent(apiKey)}`;
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Upstream error ${res.status}: ${text || res.statusText}`);
  }
  return res.json();
}

function toDisplayScore(scoreObj: any | undefined): { score: string; overs: string } {
  if (!scoreObj) return { score: "", overs: "" };
  const runs = scoreObj.r ?? scoreObj.runs ?? scoreObj.score ?? "";
  const wickets = scoreObj.w ?? scoreObj.wickets ?? "";
  const overs = scoreObj.o ?? scoreObj.overs ?? "";
  const score = runs !== "" && wickets !== "" ? `${runs}/${wickets}` : String(runs ?? "");
  return { score, overs: String(overs ?? "") };
}

function mapLiveMatch(raw: any): LiveMatch {
  const teamInfo = raw.teamInfo || raw.teams || [];
  const teamA = teamInfo[0] || {};
  const teamB = teamInfo[1] || {};
  const scoreArr = raw.score || raw.scores || [];
  const scoreA = toDisplayScore(scoreArr[0]);
  const scoreB = toDisplayScore(scoreArr[1]);

  return {
    tournament: raw.series || raw.name || "IPL",
    matchType: raw.matchType || raw.type || "T20",
    venue: raw.venue || raw.venueInfo?.name || raw.venue_info?.stadium || "",
    status: raw.status || "",
    requiredRate: String(raw.requiredRunRate ?? ""),
    currentRate: String(raw.runRate ?? ""),
    commentary: raw.status || "",
    team1: {
      id: String(teamA.id || teamA.key || teamA.name || ""),
      name: teamA.name || teamA.shortname || raw["team-1"] || raw.team1 || "",
      logo: teamA.img || teamA.image || teamA.image_path || "",
      score: scoreA.score,
      overs: scoreA.overs,
    },
    team2: {
      id: String(teamB.id || teamB.key || teamB.name || ""),
      name: teamB.name || teamB.shortname || raw["team-2"] || raw.team2 || "",
      logo: teamB.img || teamB.image || teamB.image_path || "",
      score: scoreB.score,
      overs: scoreB.overs,
    },
  };
}

function mapMatch(raw: any, idx: number): Match {
  const teamInfo = raw.teamInfo || raw.teams || [];
  const teamA = teamInfo[0] || {};
  const teamB = teamInfo[1] || {};
  const team1 = teamA.name || raw["team-1"] || raw.team1 || teamA.shortname || "TBD";
  const team2 = teamB.name || raw["team-2"] || raw.team2 || teamB.shortname || "TBD";
  const idStr = raw.id || raw.unique_id || raw.key || `${Date.parse(raw.dateTimeGMT || raw.date || "") || idx}`;
  const matchId = Number(String(idStr).replace(/\D/g, "")) || idx + 1;
  return {
    matchId,
    team1,
    team2,
    date: raw.dateTimeGMT || raw.date || new Date().toISOString(),
    venue: raw.venue || raw.venueInfo?.name || raw.venue_info?.stadium || "",
  };
}

function mapPoints(rawStandings: any[]): TeamStanding[] {
  return (rawStandings || []).map((row: any) => ({
    name: row.team || row.name || row.short_name || "",
    played: Number(row.played ?? row.matches ?? 0),
    won: Number(row.wins ?? row.won ?? 0),
    lost: Number(row.losses ?? row.lost ?? 0),
    points: Number(row.points ?? row.pts ?? 0),
    nrr: String(row.nrr ?? row.net_run_rate ?? "0.000"),
    logo: row.logo || row.img || "",
  }));
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // NOTE: Prefer env var; ensure to set CRICAPI_KEY in .env.local when USE_MOCKS is false
  const apiKey = (process.env.CRICAPI_KEY || "").trim();

  const { category, page: pageQ, pageSize: pageSizeQ } = req.query as Record<string, string>;
  const page = Math.max(1, parseInt(pageQ || "1", 10) || 1);
  const pageSize = Math.min(50, Math.max(1, parseInt(pageSizeQ || "10", 10) || 10));

  try {
    let liveArrayRaw: any[] = [];
    let matchesArrayRaw: any[] = [];
    let pointsArray: any[] = [];

    if (USE_MOCKS) {
      liveArrayRaw = Array.isArray((liveMock as any)?.data) ? (liveMock as any).data : [];
      matchesArrayRaw = Array.isArray((matchesMock as any)?.data?.matches) ? (matchesMock as any).data.matches : [];
      pointsArray = (pointsMock as any)?.data?.standings || [];
    } else {
      // CricAPI network calls (commented for mock mode)
      // if (!apiKey) {
      //   res.status(500).json({ error: "Missing CRICAPI_KEY in environment" });
      //   return;
      // }
      // const [liveResp, matchesResp, pointsResp] = await Promise.all([
      //   fetchJSON("currentMatches", apiKey).catch(() => ({ data: [] })),
      //   fetchJSON("matches", apiKey).catch(() => ({ data: [] })),
      //   fetchJSON("pointsTable", apiKey).catch(() => ({ data: { standings: [] } })),
      // ]);
      // liveArrayRaw = Array.isArray(liveResp?.data) ? liveResp.data : liveResp?.data?.matches || [];
      // matchesArrayRaw = Array.isArray(matchesResp?.data) ? matchesResp.data : matchesResp?.data?.matches || [];
      // pointsArray = pointsResp?.data?.standings || pointsResp?.data || [];
    }

    if (category) {
      let list: Match[] = [];
      if (category === "live") {
        list = (liveArrayRaw || []).map(mapMatch);
      } else if (category === "upcoming") {
        list = (matchesArrayRaw || []).filter((m: any) => !(m.matchStarted ?? m.started ?? false)).map(mapMatch);
      } else if (category === "schedule" || category === "all") {
        list = (matchesArrayRaw || []).map(mapMatch);
      } else {
        res.status(400).json({ error: "Invalid category" });
        return;
      }

      const total = list.length;
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      const items = list.slice(start, end);
      const totalPages = Math.max(1, Math.ceil(total / pageSize));

      res.status(200).json({ items, page, pageSize, total, totalPages });
      return;
    }

    const liveRaw = (liveArrayRaw || []).find((m: any) => (m.matchStarted ?? m.started ?? false) && !(m.matchEnded ?? m.completed ?? false)) || null;

    const payload: IPLData = {
      liveMatch: liveRaw ? mapLiveMatch(liveRaw) : null,
      upcomingMatches: (matchesArrayRaw || []).slice(0, 10).filter((m: any) => !(m.matchStarted ?? m.started ?? false)).map(mapMatch),
      pointsTable: mapPoints(pointsArray),
      schedule: (matchesArrayRaw || []).slice(0, 20).map(mapMatch),
    };

    res.status(200).json(payload);
  } catch (e: any) {
    res.status(500).json({ error: e?.message || "Unknown error" });
  }
} 