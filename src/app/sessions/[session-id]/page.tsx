/** @format */

"use client";

import React, { useState } from "react";
import { ArrowLeft, Eye } from "lucide-react";
import Link from "next/link";
import SessionInfoSheet from "@/components/SessionComponents/SessionDetailsComponents/SessionInfoSheet";
import PlayerDetailsSheet from "@/components/SessionComponents/SessionDetailsComponents/PlayerDetailsSheet";
import Image from "next/image";

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
    <div className="w-full py-2 md:py-3">
      <div className="max-w-625 mx-auto space-y-4 md:space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/sessions">
              <button className="cursor-pointer p-1.5 hover:bg-white/5 rounded-lg transition-colors">
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

        {/* Match Header Card */}
        <div className="rounded-xl relative overflow-hidden">
          <div className="bg-card rounded-xl relative overflow-hidden">
            {/* Match ID + Timer — skewed red box */}
            <div className="flex items-center justify-center ">
              <div
                className="bg-custom-red px-8 py-2"
                style={{
                  transform: "skewX(-20deg)",
                  borderBottomLeftRadius: "4px",
                  borderBottomRightRadius: "4px",
                  boxShadow: "0 4px 12px rgba(152, 0, 9, 0.5)",
                }}
              >
                <div
                  className="flex items-center gap-3"
                  style={{ transform: "skewX(20deg)" }}
                >
                  <span className="text-white text-xs font-semibold">
                    #CN 256
                  </span>
                  <div className="w-px h-3 bg-white/30" />
                  <div className="flex items-center gap-2">
                    <span className="text-white text-sm font-bold tabular-nums">
                      50:25
                    </span>
                    <div className="w-16 h-1.5 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full w-3/4 rounded-full bg-red-300" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Scoreboard */}
            <div className="relative border-4 border-border/20 rounded-4xl shadow-4xl shadow-amber-700">
              {/* Scoreboard content */}
              <div className="grid grid-cols-5 items-center px-3 py-5 sm:px-6 sm:py-8">
                {/* Team A Logo + Name */}
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="w-6  h-6 md:w-16 md:h-16 rounded-full overflow-hidden relative shrink-0">
                    <Image
                      src="/green-team.png"
                      alt="Snake Green Squad"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="max-w-4 sm:max-w-6 md:max-w-none">
                    <p className="text-primary text-[10px] sm:text-xs font-semibold leading-tight">
                      Snake Green Squad
                    </p>
                  </div>
                </div>
                <div className="absolute right-[80%] top-0 bottom-0 w-px bg-linear-to-b from-transparent via-red-600 to-transparent transform -skew-x-[20deg]"></div>

                {/* Team A Score */}
                <div className="text-center">
                  <p className="text-primary text-xl sm:text-3xl lg:text-5xl font-black leading-none">
                    254
                  </p>
                  <p className="text-muted-foreground text-[10px] sm:text-xs mt-1">
                    Score
                  </p>
                </div>
                <div className="absolute right-[60%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-red-600 to-transparent transform -skew-x-[20deg]"></div>

                {/* Center - Team Full */}
                <div className="text-center">
                  <p className="text-primary text-xl sm:text-3xl lg:text-5xl font-black leading-none">
                    8 / 8
                  </p>
                  <p className="text-muted-foreground text-[10px] sm:text-xs mt-1">
                    Team Full
                  </p>
                </div>
                <div className="absolute right-[40%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-red-600 to-transparent transform -skew-x-[20deg]"></div>

                {/* Team B Score */}
                <div className="text-center">
                  <p className="text-primary text-xl sm:text-3xl lg:text-5xl font-black leading-none">
                    254
                  </p>
                  <p className="text-muted-foreground text-[10px] sm:text-xs mt-1">
                    Score
                  </p>
                </div>
                <div className="absolute right-[20%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-red-600 to-transparent transform -skew-x-[20deg]"></div>
                {/* Team B Logo + Name */}
                <div className="flex flex-col items-center gap-2 text-center ">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden relative shrink-0">
                    <Image
                      src="/red-team.png"
                      alt="Red Bull Squad"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="max-w-4 sm:max-w-6 md:max-w-none">
                    <p className="text-primary text-[10px] sm:text-xs font-semibold leading-tight">
                      Red Bull Squad
                    </p>
                  </div>
                </div>
              </div>
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
