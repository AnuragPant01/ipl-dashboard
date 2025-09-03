import { IPLData, PaginatedMatches } from "./types";

const INTERNAL_API = "/api/ipl";

export async function fetchIPLData(): Promise<IPLData> {
  const res = await fetch(INTERNAL_API);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Failed to fetch IPL data (${res.status})`);
  }
  return res.json();
}

export async function fetchMatches(category: "live" | "upcoming" | "schedule" | "all", page = 1, pageSize = 10): Promise<PaginatedMatches> {
  const url = `${INTERNAL_API}?category=${encodeURIComponent(category)}&page=${page}&pageSize=${pageSize}`;
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Failed to fetch matches (${res.status})`);
  }
  return res.json();
}
