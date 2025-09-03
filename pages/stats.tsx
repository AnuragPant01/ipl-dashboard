import { useState } from "react";
import Header from "../components/common/Header";
import statsData from "../lib/mocks/stats.json";

export default function StatsPage() {
  const [activeTab, setActiveTab] = useState<"batting" | "bowling" | "team">("batting");

  const tabs = [
    { id: "batting", label: "Batting Stats" },
    { id: "bowling", label: "Bowling Stats" },
    { id: "team", label: "Team Stats" },
  ] as const;

  return (
    <div className="bg-gray-900 min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto p-6 space-y-10">
        {/* Page Header */}
        <div className="text-center mb-8 px-4">
          <h1 className="text-4xl font-extrabold text-white mb-2 drop-shadow-lg">
            Statistics
          </h1>
          <p className="text-gray-400 max-w-md mx-auto">
            Comprehensive IPL 2025 statistics and records
          </p>
        </div>

        {/* Tabs */}
        <nav className="flex justify-start gap-3 mb-8 overflow-x-auto px-4 sm:px-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800" style={{
    scrollbarWidth: "none",      // Firefox
    msOverflowStyle: "none",     // IE 10+
  }}>
  {tabs.map((tab) => (
    <button
      key={tab.id}
      onClick={() => setActiveTab(tab.id)}
      className={`flex-shrink-0 px-4 sm:px-6 py-2 rounded-full font-semibold text-sm sm:text-base transition-colors duration-300 whitespace-nowrap
        ${
          activeTab === tab.id
            ? "bg-white text-gray-900 shadow-md shadow-gray-600"
            : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
        }`}
    >
      {tab.label}
    </button>
  ))}
</nav>


        {/* Content */}
        <section>
          {activeTab === "batting" && (
            <div className="space-y-10">
              {/* Top Run Scorers */}
              <div className="overflow-x-auto rounded-lg shadow-md bg-white">
                <h3 className="text-xl font-bold text-gray-900 p-4 border-b border-gray-300">
                  Top Run Scorers
                </h3>
                <table className="w-full min-w-[700px] text-gray-900">
                  <thead className="bg-gray-100">
                    <tr>
                      {[
                        "Rank",
                        "Player",
                        "Team",
                        "Runs",
                        "Matches",
                        "Average",
                        "SR",
                        "50s",
                        "100s",
                      ].map((head) => (
                        <th
                          key={head}
                          className="px-4 py-3 text-left text-xs font-semibold uppercase"
                        >
                          {head}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {statsData.battingStats.topRunScorers.map((player, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 transition cursor-pointer"
                      >
                        <td className="px-4 py-3">{index + 1}</td>
                        <td className="px-4 py-3 font-semibold">{player.name}</td>
                        <td className="px-4 py-3">{player.team}</td>
                        <td className="px-4 py-3 text-center font-bold">{player.runs}</td>
                        <td className="px-4 py-3 text-center">{player.matches}</td>
                        <td className="px-4 py-3 text-center">{player.average}</td>
                        <td className="px-4 py-3 text-center">{player.strikeRate}</td>
                        <td className="px-4 py-3 text-center">{player.fifties}</td>
                        <td className="px-4 py-3 text-center">{player.hundreds}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Most Fifties & Highest SR */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-6 shadow-md space-y-3">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Most Fifties</h4>
                  {statsData.battingStats.mostFifties.map((player, index) => (
                    <div
                      key={index}
                      className="flex justify-between rounded border border-gray-300 p-3 font-semibold text-gray-900"
                    >
                      <span>
                        {player.name} <span className="text-gray-600">({player.team})</span>
                      </span>
                      <span className="text-yellow-600">{player.fifties}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-white rounded-lg p-6 shadow-md space-y-3">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Highest Strike Rate</h4>
                  {statsData.battingStats.highestStrikeRate.map((player, index) => (
                    <div
                      key={index}
                      className="flex justify-between rounded border border-gray-300 p-3 font-semibold text-gray-900"
                    >
                      <span>
                        {player.name} <span className="text-gray-600">({player.team})</span>
                      </span>
                      <span className="text-green-600">{player.strikeRate}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "bowling" && (
            <div className="space-y-10">
              {/* Top Wicket Takers */}
              <div className="overflow-x-auto rounded-lg shadow-md bg-white">
                <h3 className="text-xl font-bold text-gray-900 p-4 border-b border-gray-300">
                  Top Wicket Takers
                </h3>
                <table className="w-full min-w-[700px] text-gray-900">
                  <thead className="bg-gray-100">
                    <tr>
                      {[
                        "Rank",
                        "Player",
                        "Team",
                        "Wickets",
                        "Matches",
                        "Average",
                        "Economy",
                        "Best",
                      ].map((head) => (
                        <th
                          key={head}
                          className="px-4 py-3 text-left text-xs font-semibold uppercase"
                        >
                          {head}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {statsData.bowlingStats.topWicketTakers.map((player, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 transition cursor-pointer"
                      >
                        <td className="px-4 py-3">{index + 1}</td>
                        <td className="px-4 py-3 font-semibold">{player.name}</td>
                        <td className="px-4 py-3">{player.team}</td>
                        <td className="px-4 py-3 text-center font-bold">{player.wickets}</td>
                        <td className="px-4 py-3 text-center">{player.matches}</td>
                        <td className="px-4 py-3 text-center">{player.average}</td>
                        <td className="px-4 py-3 text-center">{player.economy}</td>
                        <td className="px-4 py-3 text-center font-mono">{player.best}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Best Economy & Most Dot Balls */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-6 shadow-md space-y-3">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Best Economy Rate</h4>
                  {statsData.bowlingStats.bestEconomy.map((player, index) => (
                    <div
                      key={index}
                      className="flex justify-between rounded border border-gray-300 p-3 font-semibold text-gray-900"
                    >
                      <span>
                        {player.name} <span className="text-gray-600">({player.team})</span>
                      </span>
                      <span className="text-purple-600">{player.economy}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-white rounded-lg p-6 shadow-md space-y-3">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Most Dot Balls</h4>
                  {statsData.bowlingStats.mostDotBalls.map((player, index) => (
                    <div
                      key={index}
                      className="flex justify-between rounded border border-gray-300 p-3 font-semibold text-gray-900"
                    >
                      <span>
                        {player.name} <span className="text-gray-600">({player.team})</span>
                      </span>
                      <span className="text-orange-600">{player.dotBalls}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "team" && (
            <div className="space-y-10">
              <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
                <h3 className="text-xl font-bold text-gray-900 border-b border-gray-300 pb-3">
                  Highest Team Scores
                </h3>
                {statsData.teamStats.highestTeamScore.map((record, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-4 rounded border border-green-300 bg-green-50 text-green-800"
                  >
                    <div>
                      <span className="font-bold">{record.team}</span>
                      <span className="ml-2">vs {record.opponent}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-2xl">{record.score}</span>
                      <div className="text-sm">{record.date}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6 space-y-3">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Lowest Team Scores</h4>
                  {statsData.teamStats.lowestTeamScore.map((record, index) => (
                    <div
                      key={index}
                      className="flex justify-between rounded border border-red-300 p-3 text-red-700 font-semibold"
                    >
                      <div>
                        <span>{record.team}</span>
                        <span className="ml-2 text-red-600">vs {record.opponent}</span>
                      </div>
                      <span>{record.score}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 space-y-3">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Most Sixes</h4>
                  {statsData.teamStats.mostSixes.map((record, index) => (
                    <div
                      key={index}
                      className="flex justify-between rounded border border-blue-300 p-3 text-blue-700 font-semibold"
                    >
                      <span>{record.team}</span>
                      <span>{record.sixes}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
