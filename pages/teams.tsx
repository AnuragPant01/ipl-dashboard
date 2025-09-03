import { useState, useEffect } from "react";
import Header from "../components/common/Header";
import teamsData from "../lib/mocks/teams.json";

export default function TeamsPage() {
  const [selectedTeam, setSelectedTeam] = useState<number | null>(null);

  // Close modal on ESC key press
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSelectedTeam(null);
      }
    }
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  // Prevent scroll behind modal when modal is open
  useEffect(() => {
    document.body.style.overflow = selectedTeam !== null ? "hidden" : "auto";
  }, [selectedTeam]);

  const teams = teamsData.teams;
  const modalTeam = teams.find((team) => team.id === selectedTeam);

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <main className="max-w-7xl mx-auto p-6 space-y-12 relative">
        {/* Page Header */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-white mb-2 drop-shadow-lg">
            Teams
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            All IPL 2025 teams and their details
          </p>
        </div>

        {/* Teams Grid */}
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-2 sm:px-0">
          {teams.map((team) => (
            <div
              key={team.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
            >
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-5">
                  <img
                    src={team.logo}
                    alt={team.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-white-600"
                    loading="lazy"
                  />
                  <div className="text-right">
                    <h3 className="text-lg font-bold text-indigo-900">
                      {team.shortName}
                    </h3>
                    <p className="text-sm text-gray-600">{team.name}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6 text-gray-700 text-sm font-medium">
                  <div className="flex justify-between">
                    <span>Captain:</span>
                    <span>{team.captain}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Coach:</span>
                    <span>{team.coach}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Home Venue:</span>
                    <span>{team.homeVenue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Titles:</span>
                    <span>{team.titles}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Win %:</span>
                    <span>{team.stats.winPercentage}%</span>
                  </div>
                </div>

                <button
                  onClick={() =>
                    setSelectedTeam(selectedTeam === team.id ? null : team.id)
                  }
                  className="w-full py-2 bg-gray-700 text-white rounded-lg font-semibold shadow-md hover:bg-gray-800 transition"
                  aria-haspopup="dialog"
                  aria-expanded={selectedTeam === team.id}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {modalTeam && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4"
            onClick={() => setSelectedTeam(null)}
          >
            <div
              className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Icon */}
              <button
                onClick={() => setSelectedTeam(null)}
                aria-label="Close modal"
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition text-2xl font-bold"
              >
                &times;
              </button>

              <h2 className="text-xl font-bold text-indigo-900 mb-4">
                {modalTeam.shortName} - {modalTeam.name}
              </h2>

              <div className="space-y-4 text-gray-800 text-sm">
                <div>
                  <h3 className="font-semibold mb-2">Key Players</h3>
                  <div className="space-y-2">
                    {modalTeam.players.slice(0, 4).map((player, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between border-b border-gray-300 pb-2 last:border-0"
                      >
                        <span className="font-semibold">{player.name}</span>
                        <span className="italic text-gray-600">{player.role}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Season Stats</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex justify-between border-b border-gray-300 pb-2">
                      <span>Matches:</span>
                      <span className="font-semibold">{modalTeam.stats.matchesPlayed}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-300 pb-2">
                      <span>Wins:</span>
                      <span className="font-semibold">{modalTeam.stats.wins}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-300 pb-2">
                      <span>Runs:</span>
                      <span className="font-semibold">{modalTeam.stats.totalRuns}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-300 pb-2">
                      <span>Wickets:</span>
                      <span className="font-semibold">{modalTeam.stats.totalWickets}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-300 text-gray-700 text-sm space-y-3">
                  <div className="flex justify-between">
                    <span>Founded:</span>
                    <span className="font-semibold">{modalTeam.founded}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Owner:</span>
                    <span className="font-semibold">{modalTeam.owner}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
