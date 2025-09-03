import { useState, useMemo } from "react";
import Image from "next/image";
import { TeamStanding } from "../../lib/types";
import Card from "../ui/Card";
import React from "react";

interface PointsTableProps {
  teams: TeamStanding[];
  compact?: boolean;
}

export default function PointsTable({ teams, compact = false }: PointsTableProps) {
  const [sortBy, setSortBy] = useState<keyof TeamStanding>("points");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const sortedTeams = useMemo(() => {
    return [...teams].sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortOrder === "desc" ? bValue - aValue : aValue - bValue;
      }

      return sortOrder === "desc"
        ? String(bValue).localeCompare(String(aValue))
        : String(aValue).localeCompare(String(bValue));
    });
  }, [teams, sortBy, sortOrder]);

  const handleSort = (column: keyof TeamStanding) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "desc" ? "asc" : "desc");
    } else {
      setSortBy(column);
      setSortOrder("desc");
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">Points Table</h2>
        <p className="text-sm text-gray-600 mt-1">IPL 2025 Team Standings</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pos
              </th>
              <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Team
              </th>
              {!compact && (
                <>
                  <th
                    className="px-3 sm:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("played")}
                  >
                    Mat
                  </th>
                  <th
                    className="px-3 sm:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("won")}
                  >
                    Won
                  </th>
                  <th
                    className="px-3 sm:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort("lost")}
                  >
                    Lost
                  </th>
                </>
              )}
              <th
                className="px-3 sm:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("points")}
              >
                Pts
              </th>
              <th
                className="px-3 sm:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("nrr")}
              >
                NRR
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedTeams.map((team, index) => (
              <tr
                key={team.name}
                className={`hover:bg-gray-50 transition-colors ${
                  index < 4 ? "border-l-4 border-green-500" :
                  index >= teams.length - 2 ? "border-l-4 border-red-500" : ""
                }`}
              >
                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {index + 1}
                </td>
                <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full mr-2 sm:mr-3 overflow-hidden">
                      <Image
                        src={team.logo}
                        alt={team.name}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23cccccc'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'/%3E%3C/svg%3E";
                        }}
                      />
                    </div>
                    <div className="text-sm font-medium text-gray-900 truncate max-w-20 sm:max-w-none">
                      {team.name}
                    </div>
                  </div>
                </td>
                {!compact && (
                  <>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      {team.played}
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      {team.won}
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      {team.lost}
                    </td>
                  </>
                )}
                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 text-center">
                  {team.points}
                </td>
                <td
                  className={`px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-center font-medium ${
                    parseFloat(team.nrr) >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {team.nrr}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
