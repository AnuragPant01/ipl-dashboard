import { useState, useEffect, useCallback } from "react";
import { IPLData, PaginatedMatches, Match } from "../lib/types";
import { fetchIPLData, fetchMatches } from "../lib/api";

export function useIPLData(initialData: IPLData | null = null) {
  const [data, setData] = useState<IPLData | null>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const newData = await fetchIPLData();
      setData(newData);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
    const interval = setInterval(() => {
      refreshData();
    }, 30000); // Refresh every 30 sec
    return () => clearInterval(interval);
  }, [refreshData]);

  return { data, loading, error, refreshData };
}

export function usePaginatedMatches(category: "live" | "upcoming" | "schedule" | "all", pageSize = 10) {
  const [page, setPage] = useState(1);
  const [state, setState] = useState<PaginatedMatches>({ items: [], page: 1, pageSize, total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (nextPage: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchMatches(category, nextPage, pageSize);
      setState(res);
      setPage(res.page);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [category, pageSize]);

  useEffect(() => {
    // reset on category/pageSize change
    setPage(1);
    load(1);
  }, [category, pageSize, load]);

  useEffect(() => {
    if (category !== "live") return;
    const id = setInterval(() => load(page), 15000);
    return () => clearInterval(id);
  }, [category, page, load]);

  const next = useCallback(() => {
    if (state.page < state.totalPages) {
      load(state.page + 1);
    }
  }, [state, load]);

  const prev = useCallback(() => {
    if (state.page > 1) {
      load(state.page - 1);
    }
  }, [state, load]);

  return { ...state, loading, error, next, prev, setPage, reload: () => load(page) };
}
