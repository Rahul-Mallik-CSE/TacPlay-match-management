/** @format */

"use client";

import React, { useState } from "react";
import { ArrowLeft, Eye } from "lucide-react";
import Link from "next/link";
import SessionInfoSheet from "@/components/SessionComponents/SessionDetailsComponents/SessionInfoSheet";
import PlayerDetailsSheet from "@/components/SessionComponents/SessionDetailsComponents/PlayerDetailsSheet";

// Player data type
interface Player {
  name: string;
  win: number;
  loses: number;
  rank: number;
  score: number | string;
  team: "A" | "B";
}

const teamAPlayers: Player[] = [
  {
    name: "Elon Rektler",
    win: 95,
    loses: 25,
    rank: 195,
    score: 254,
    team: "A",
  },
  { name: "Elon Rektler", win: 95, loses: 25, rank: 254, score: 20, team: "A" },
  {
    name: "Elon Rektler",
    win: 95,
    loses: 25,
    rank: 195,
    score: "+20",
    team: "A",
  },
  {
    name: "Elon Rektler",
    win: 95,
    loses: 25,
    rank: 254,
    score: "-",
    team: "A",
  },
];

const teamBPlayers: Player[] = [
  {
    name: "Elon Rektler",
    win: 95,
    loses: 25,
    rank: 195,
    score: "+20",
    team: "B",
  },
  { name: "Elon Rektler", win: 95, loses: 25, rank: 195, score: 20, team: "B" },
  {
    name: "Elon Rektler",
    win: 95,
    loses: 25,
    rank: 195,
    score: "-",
    team: "B",
  },
  { name: "Elon Rektler", win: 95, loses: 25, rank: 195, score: 20, team: "B" },
];

const SessionDetailsPage = () => {
  const [sessionInfoOpen, setSessionInfoOpen] = useState(false);
  const [playerDetailsOpen, setPlayerDetailsOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<string>("Elon Rektler");

  const handleViewPlayerDetails = (playerName: string) => {
    setSelectedPlayer(playerName);
    setPlayerDetailsOpen(true);
  };

  return (
    <div className="w-full px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/sessions">
            <button className="p-1.5 hover:bg-white/5 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-primary" />
            </button>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-primary">
            Sessions Details
          </h1>
        </div>
        <button
          onClick={() => setSessionInfoOpen(true)}
          className="flex items-center gap-2 bg-custom-red hover:bg-custom-red/80 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
        >
          <Eye className="w-4 h-4" />
          <span className="hidden sm:inline">View Session Info</span>
        </button>
      </div>

      {/* Scoreboard */}
      <div className="bg-card border border-white/5 rounded-xl overflow-hidden">
        {/* Match ID & Timer */}
        <div className="flex items-center justify-center gap-4 py-3 border-b border-white/5">
          <span className="bg-muted px-3 py-1 rounded-md text-xs text-primary font-medium">
            #CN 256
          </span>
          <div className="flex items-center gap-2">
            <span className="text-custom-yellow text-sm font-bold font-mono">
              50:25
            </span>
            <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-linear-to-r from-custom-red to-pink-600"
                style={{ width: "65%" }}
              />
            </div>
          </div>
        </div>

        {/* Teams Score */}
        <div className="grid grid-cols-3 items-center py-6 px-4 sm:px-8">
          {/* Team A */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-muted border-2 border-custom-red flex items-center justify-center overflow-hidden">
              <span className="text-2xl">🐍</span>
            </div>
            <span className="text-[10px] sm:text-xs text-secondary text-center leading-tight">
              Snake Green Squad
            </span>
          </div>

          {/* Score Center */}
          <div className="flex items-center justify-center gap-2 sm:gap-6">
            <div className="text-center">
              <span className="text-3xl sm:text-5xl font-bold text-primary">
                254
              </span>
              <p className="text-[10px] sm:text-xs text-secondary mt-1">
                Score
              </p>
            </div>
            <div className="text-center px-2 sm:px-4">
              <span className="text-xl sm:text-3xl font-bold text-secondary">
                8 / 8
              </span>
              <p className="text-[10px] sm:text-xs text-secondary mt-1">
                Team Full
              </p>
            </div>
            <div className="text-center">
              <span className="text-3xl sm:text-5xl font-bold text-primary">
                254
              </span>
              <p className="text-[10px] sm:text-xs text-secondary mt-1">
                Score
              </p>
            </div>
          </div>

          {/* Team B */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-muted border-2 border-custom-yellow flex items-center justify-center overflow-hidden">
              <span className="text-2xl">🐂</span>
            </div>
            <span className="text-[10px] sm:text-xs text-secondary text-center leading-tight">
              Red Bull Squad
            </span>
          </div>
        </div>
      </div>

      {/* Player Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left column - Team A */}
        <div className="space-y-4">
          {teamAPlayers.map((player, index) => (
            <PlayerCard
              key={`teamA-${index}`}
              player={player}
              onViewDetails={() => handleViewPlayerDetails(player.name)}
            />
          ))}
        </div>

        {/* Right column - Team B */}
        <div className="space-y-4">
          {teamBPlayers.map((player, index) => (
            <PlayerCard
              key={`teamB-${index}`}
              player={player}
              onViewDetails={() => handleViewPlayerDetails(player.name)}
            />
          ))}
        </div>
      </div>

      {/* Sheets */}
      <SessionInfoSheet
        open={sessionInfoOpen}
        onOpenChange={setSessionInfoOpen}
      />
      <PlayerDetailsSheet
        open={playerDetailsOpen}
        onOpenChange={setPlayerDetailsOpen}
        playerName={selectedPlayer}
      />
    </div>
  );
};

// Player Card Component
const PlayerCard = ({
  player,
  onViewDetails,
}: {
  player: Player;
  onViewDetails: () => void;
}) => {
  const borderColor =
    player.team === "A" ? "border-custom-red/50" : "border-custom-yellow/50";
  const gradientBg =
    player.team === "A"
      ? "bg-gradient-to-r from-custom-red/10 to-transparent"
      : "bg-gradient-to-r from-custom-yellow/10 to-transparent";

  const scoreColor =
    typeof player.score === "string"
      ? player.score === "-"
        ? "text-secondary"
        : player.score.startsWith("+")
          ? "text-custom-yellow"
          : "text-custom-red"
      : player.score > 100
        ? "text-primary"
        : "text-custom-red";

  return (
    <div
      className={`border ${borderColor} rounded-xl overflow-hidden ${gradientBg}`}
    >
      <div className="flex items-center gap-3 p-3 sm:p-4">
        {/* Avatar Placeholder */}
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-muted overflow-hidden shrink-0 relative">
          <div className="absolute inset-0 bg-linear-to-br from-custom-red/20 to-transparent" />
          <div className="w-full h-full flex items-center justify-center text-2xl">
            🎮
          </div>
        </div>

        {/* Info Section */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-2">
            <h4 className="text-sm font-semibold text-primary truncate">
              {player.name}
            </h4>
            <button
              onClick={onViewDetails}
              className="shrink-0 px-3 py-1 text-xs font-medium bg-custom-red hover:bg-custom-red/80 text-white rounded-md transition-colors"
            >
              View Details
            </button>
          </div>

          {/* Stats Row */}
          <div className="flex items-center gap-4 sm:gap-6">
            <StatItem label="Win" value={player.win} className="text-primary" />
            <StatItem
              label="Loses"
              value={player.loses}
              className="text-primary"
            />
            <StatItem
              label="Rank"
              value={player.rank}
              className="text-primary"
            />
            <div className="text-center">
              <p className={`text-sm sm:text-base font-bold ${scoreColor}`}>
                {player.score}
              </p>
              <p className="text-[10px] text-secondary">Score</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatItem = ({
  label,
  value,
  className = "",
}: {
  label: string;
  value: number | string;
  className?: string;
}) => (
  <div className="text-center">
    <p className={`text-sm sm:text-base font-bold ${className}`}>{value}</p>
    <p className="text-[10px] text-secondary">{label}</p>
  </div>
);

export default SessionDetailsPage;
