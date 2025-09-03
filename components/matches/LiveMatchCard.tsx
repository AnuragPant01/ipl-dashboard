import Image from "next/image";
import Badge from "../ui/Badge";
import Card from "../ui/Card";
import { LiveMatch } from "../../lib/types";
import React from "react";

interface LiveMatchCardProps {
  match: LiveMatch;
}

export default function LiveMatchCard({ match }: LiveMatchCardProps) {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'/%3E%3C/svg%3E";
  };

  return (
    <Card className="relative overflow-hidden bg-gradient-to-r from-green-600 to-green-800 text-white">
      <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
        <Badge variant="live" className="animate-pulse text-xs sm:text-sm">
          🔴 LIVE
        </Badge>
      </div>
      <div className="p-4 sm:p-6">
        <div className="text-center mb-4 sm:mb-6">
          <h2 className="text-xs sm:text-sm font-semibold text-green-100 mb-1">
            {match.tournament} • {match.matchType}
          </h2>
          <p className="text-xs text-green-200 truncate">{match.venue}</p>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:gap-4 items-center">
          <div className="text-center">
            <div className="relative w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2">
              <Image 
                src={match.team1.logo} 
                alt={match.team1.name} 
                fill
                className="rounded-full border-2 border-white/20 object-cover"
                onError={handleImageError}
              />
            </div>
            <h3 className="font-bold text-sm sm:text-lg mb-1 truncate">{match.team1.name}</h3>
            <div className="text-lg sm:text-2xl font-bold">{match.team1.score}</div>
            <div className="text-xs text-green-200">{match.team1.overs} overs</div>
          </div>
          <div className="text-center">
            <div className="bg-white/10 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-2">
              <span className="text-xs sm:text-sm font-bold">VS</span>
            </div>
            <div className="text-xs sm:text-sm font-semibold truncate">{match.status}</div>
          </div>
          <div className="text-center">
            <div className="relative w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2">
              <Image 
                src={match.team2.logo} 
                alt={match.team2.name} 
                fill
                className="rounded-full border-2 border-white/20 object-cover"
                onError={handleImageError}
              />
            </div>
            <h3 className="font-bold text-sm sm:text-lg mb-1 truncate">{match.team2.name}</h3>
            <div className="text-lg sm:text-2xl font-bold">{match.team2.score}</div>
            <div className="text-xs text-green-200">{match.team2.overs} overs</div>
          </div>
        </div>
      </div>
    </Card>
  );
}
