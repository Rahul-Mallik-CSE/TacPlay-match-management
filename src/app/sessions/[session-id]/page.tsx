/** @format */

"use client";

import React, { useState } from "react";
import { ArrowLeft, Eye } from "lucide-react";
import Link from "next/link";
import SessionInfoSheet from "@/components/SessionComponents/SessionDetailsComponents/SessionInfoSheet";
import PlayerDetailsSheet from "@/components/SessionComponents/SessionDetailsComponents/PlayerDetailsSheet";
import PlayerCard from "@/components/SessionComponents/SessionDetailsComponents/PlayerCard";
import Image from "next/image";
import { Button } from "@/components/ui/button";

// Player data type
interface Player {
  id: number;
  name: string;
  win: number;
  loses: number;
  played: number;
  rank: number;
  score?: number;
  image: string;
  team: "A" | "B";
}

const teamAPlayers: Player[] = [
  {
    id: 1,
    name: "Elon Rektler",
    win: 95,
    loses: 25,
    played: 120,
    rank: 195,
    score: 254,
    image: "/left-player.jpg",
    team: "A",
  },
  {
    id: 2,
    name: "Elon Rektler",
    win: 95,
    loses: 25,
    played: 120,
    rank: 254,
    score: 20,
    image: "/left-player.jpg",
    team: "A",
  },
  {
    id: 3,
    name: "Elon Rektler",
    win: 95,
    loses: 25,
    played: 120,
    rank: 195,
    score: 20,
    image: "/left-player.jpg",
    team: "A",
  },
  {
    id: 4,
    name: "Elon Rektler",
    win: 95,
    loses: 25,
    played: 120,
    rank: 254,
    score: undefined,
    image: "/left-player.jpg",
    team: "A",
  },
];

const teamBPlayers: Player[] = [
  {
    id: 5,
    name: "Elon Rektler",
    win: 95,
    loses: 25,
    played: 120,
    rank: 195,
    score: 20,
    image: "/right-player.jpg",
    team: "B",
  },
  {
    id: 6,
    name: "Elon Rektler",
    win: 95,
    loses: 25,
    played: 120,
    rank: 195,
    score: 20,
    image: "/right-player.jpg",
    team: "B",
  },
  {
    id: 7,
    name: "Elon Rektler",
    win: 95,
    loses: 25,
    played: 120,
    rank: 195,
    score: undefined,
    image: "/right-player.jpg",
    team: "B",
  },
  {
    id: 8,
    name: "Elon Rektler",
    win: 95,
    loses: 25,
    played: 120,
    rank: 195,
    score: 20,
    image: "/right-player.jpg",
    team: "B",
  },
];

const SessionDetailsPage = () => {
  const [sessionInfoOpen, setSessionInfoOpen] = useState(false);
  const [playerDetailsOpen, setPlayerDetailsOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<string>("Elon Rektler");

  const handleViewPlayerDetails = (player: Player) => {
    setSelectedPlayer(player.name);
    setPlayerDetailsOpen(true);
  };

  return (
    <div className="w-full p-3 md:p-4">
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
          <Button
            onClick={() => setSessionInfoOpen(true)}
            className="flex gap-2"
          >
            <Eye className="w-4 h-4" />
            <span className="hidden sm:inline">View Session Info</span>
          </Button>
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
                onViewDetails={handleViewPlayerDetails}
              />
            ))}
          </div>

          {/* Right column - Team B */}
          <div className="space-y-4">
            {teamBPlayers.map((player, index) => (
              <PlayerCard
                key={`teamB-${index}`}
                player={player}
                onViewDetails={handleViewPlayerDetails}
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

export default SessionDetailsPage;
