import Card from "../ui/Card";
import { Match } from "../../lib/types";
import React from "react";
import { usePaginatedMatches } from "../../hooks/useIPLData";

interface MatchScheduleProps {
  schedule?: Match[];
}

export default function MatchSchedule({ schedule }: MatchScheduleProps) {
  const { items, page, totalPages, loading, error, next, prev } = usePaginatedMatches("schedule", 10);

  return (
    <Card>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h2 className="font-bold text-lg sm:text-xl mb-2 sm:mb-0">Full Match Schedule</h2>
        <div className="text-sm text-gray-600">Page {page} of {totalPages}</div>
      </div>
      {error && <div className="text-sm text-red-600 mb-2 sm:mb-4">{error}</div>}
      <div className="divide-y divide-gray-200">
        {(items.length ? items : (schedule || [])).map((match) => (
          <div key={match.matchId} className="flex flex-col sm:flex-row sm:justify-between py-3 sm:py-4">
            <div className="font-semibold text-sm sm:text-base mb-1 sm:mb-0">
              {match.team1} <span className="text-gray-400">vs</span> {match.team2}
            </div>
            <div className="text-xs sm:text-sm text-gray-600 sm:text-right">
              {new Date(match.date).toLocaleString()}<br />
              <span className="text-xs">{match.venue}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center pt-4 sm:pt-6">
        <button 
          onClick={prev} 
          disabled={loading || page <= 1} 
          className={`px-3 py-2 sm:px-4 sm:py-2 rounded border text-sm font-medium ${
            page <= 1 
              ? "opacity-50 cursor-not-allowed bg-gray-100" 
              : "hover:bg-gray-50 border-gray-300"
          }`}
        >
          Previous
        </button>
        {loading && <span className="text-sm text-gray-500">Loading...</span>}
        <button 
          onClick={next} 
          disabled={loading || page >= totalPages} 
          className={`px-3 py-2 sm:px-4 sm:py-2 rounded border text-sm font-medium ${
            page >= totalPages 
              ? "opacity-50 cursor-not-allowed bg-gray-100" 
              : "hover:bg-gray-50 border-gray-300"
          }`}
        >
          Next
        </button>
      </div>
    </Card>
  );
}
