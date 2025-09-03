import { useState } from "react";
import Header from "../components/common/Header";
import LiveMatchCard from "../components/matches/LiveMatchCard";
import UpcomingMatches from "../components/matches/UpcomingMatches";
import MatchSchedule from "../components/schedule/MatchSchedule";
import { useIPLData, usePaginatedMatches } from "../hooks/useIPLData";

export default function MatchesPage() {
  const { data, loading, error } = useIPLData(null);
  const [tab, setTab] = useState<"live" | "upcoming" | "schedule">("upcoming");
  const live = usePaginatedMatches("live", 10);
  const upcoming = usePaginatedMatches("upcoming", 15);
  const schedule = usePaginatedMatches("schedule", 20);

  if (loading)
    return (
      <div>
        <Header />
        <div className="p-8 text-center">Loading...</div>
      </div>
    );

  if (error)
    return (
      <div>
        <Header />
        <div className="p-8 text-center text-red-600">Error: {error}</div>
      </div>
    );

  return (
    <div>
      <Header />
      <main className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Page Header */}
        <div className="text-center mb-6 px-4 sm:px-0">
          <h1 className="text-3xl sm:text-4xl font-bold mb-1 sm:mb-2">
            Matches
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Live scores, upcoming fixtures, and complete schedule
          </p>
        </div>

        {/* Live Match Card */}
        {data?.liveMatch && (
          <section className="mb-8 px-4 sm:px-0">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Live Match</h2>
            <LiveMatchCard match={data.liveMatch} />
          </section>
        )}

        {/* Tabs */}
        <section className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
          <nav
            className="flex justify-start gap-3 mb-6 overflow-x-auto px-4 sm:px-0 whitespace-nowrap"
            style={{
              scrollbarWidth: "none", // Firefox
              msOverflowStyle: "none", // IE 10+
            }}
          >
            {(["live", "upcoming", "schedule"] as const).map((k) => (
              <button
                key={k}
                onClick={() => setTab(k)}
                className={`flex-shrink-0 px-4 sm:px-6 py-2 rounded-lg font-semibold transition-colors whitespace-nowrap text-sm sm:text-base ${
                  tab === k
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {k === "live"
                  ? "Live Matches"
                  : k === "upcoming"
                  ? "Upcoming Matches"
                  : "Full Schedule"}
              </button>
            ))}
          </nav>
          <style jsx global>{`
            nav::-webkit-scrollbar {
              display: none; /* Chrome, Safari, Opera */
            }
          `}</style>

          {/* Live Matches Tab */}
          {tab === "live" && (
            <div>
              <div className="flex flex-col sm:flex-row items-center justify-between mb-4 space-y-2 sm:space-y-0">
                <h3 className="text-lg sm:text-xl font-bold">Live Matches</h3>
                <div className="text-sm text-gray-500">
                  Page {live.page} of {live.totalPages}
                </div>
              </div>
              {live.error && (
                <div className="text-sm text-red-600 mb-4">{live.error}</div>
              )}
              <div className="divide-y divide-gray-200">
                {live.items.map((m) => (
                  <div
                    key={m.matchId}
                    className="flex flex-col sm:flex-row justify-between py-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="font-semibold text-lg mb-2 sm:mb-0">
                      {m.team1} <span className="text-gray-400">vs</span> {m.team2}
                    </div>
                    <div className="text-sm text-gray-600 text-right whitespace-nowrap">
                      {new Date(m.date).toLocaleString()}
                      <br />
                      <span className="text-xs">{m.venue}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center pt-6 flex-wrap gap-3">
                <button
                  onClick={live.prev}
                  disabled={live.loading || live.page <= 1}
                  className={`px-4 py-2 rounded border font-medium ${
                    live.page <= 1
                      ? "opacity-50 cursor-not-allowed bg-gray-100 text-gray-400"
                      : "hover:bg-gray-50 border-gray-300 text-gray-700"
                  }`}
                >
                  Previous
                </button>
                {live.loading && (
                  <span className="text-sm text-gray-500">Loading...</span>
                )}
                <button
                  onClick={live.next}
                  disabled={live.loading || live.page >= live.totalPages}
                  className={`px-4 py-2 rounded border font-medium ${
                    live.page >= live.totalPages
                      ? "opacity-50 cursor-not-allowed bg-gray-100 text-gray-400"
                      : "hover:bg-gray-50 border-gray-300 text-gray-700"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Upcoming Matches Tab */}
          {tab === "upcoming" && (
            <div className="text-gray-900 px-2 sm:px-0">
              <UpcomingMatches matches={data?.upcomingMatches} />
            </div>
          )}

          {/* Schedule Tab */}
          {tab === "schedule" && (
            <div className="text-gray-900 px-2 sm:px-0">
              <MatchSchedule schedule={data?.schedule} />
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
