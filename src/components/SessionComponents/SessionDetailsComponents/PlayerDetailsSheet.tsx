/** @format */

"use client";

import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { ArrowLeft } from "lucide-react";

interface PlayerDetailsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  playerName?: string;
}

const PlayerDetailsSheet: React.FC<PlayerDetailsSheetProps> = ({
  open,
  onOpenChange,
  playerName = "Elon Rektler",
}) => {
  const [matchScore, setMatchScore] = useState("50");

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-full sm:max-w-lg bg-card border-l border-white/10 overflow-y-auto p-0"
      >
        {/* Header */}
        <SheetHeader className="p-5 pb-0">
          <div className="flex items-center justify-between">
            <button
              onClick={() => onOpenChange(false)}
              className="p-1 hover:bg-white/5 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-primary" />
            </button>
            <span className="px-3 py-1 text-xs font-medium rounded-md bg-teal-500/20 text-teal-400 border border-teal-500/30">
              Check-In
            </span>
          </div>
          <SheetTitle className="text-2xl font-bold text-primary mt-3">
            Player Details &amp; Score Management
          </SheetTitle>
          <SheetDescription className="text-sm text-secondary">
            View full booking information and transaction.
          </SheetDescription>
        </SheetHeader>

        <div className="px-5 pb-5 space-y-6 mt-4">
          {/* Player Info */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-3">
              Player Info
            </h3>
            <div className="space-y-3">
              <InfoRow label="Team name" value="Green Snack Squad" />
              <InfoRow label="Player ID" value="#CN 256" />
              <InfoRow label="Player Name" value={playerName} />
              <InfoRow label="Email" value="name@gmail.com" />
              <InfoRow label="Contact Number" value="+26 256 2564" />
            </div>
          </div>

          {/* Booking Info */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-3">
              Booking Info
            </h3>
            <div className="space-y-3">
              <InfoRow label="Booking ID" value="#CNH 565" />
              <InfoRow label="Transaction ID" value="#CNH 565" />
              <InfoRow label="Amount" value="$25.25" />
              <InfoRow
                label="Platform Fee"
                value={
                  <span>
                    <span className="text-secondary">(Free User) </span>$05.25
                  </span>
                }
              />
              <InfoRow label="Net Profit" value="$24.05" />
              <InfoRow label="Payment Method" value="PayPal" />
              <InfoRow label="Date & Time" value="02:30 AM, 25 jan 2026" />
              <InfoRow
                label="Payment Status"
                value={
                  <span className="px-3 py-0.5 text-xs font-medium rounded-md bg-teal-500/20 text-teal-400 border border-teal-500/30">
                    Paid
                  </span>
                }
              />
            </div>
          </div>

          {/* Score Management */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-3">
              Score Management
            </h3>
            <div className="space-y-2">
              <label className="text-sm text-secondary">Match Score</label>
              <input
                type="number"
                value={matchScore}
                onChange={(e) => setMatchScore(e.target.value)}
                className="w-full bg-muted border border-white/10 rounded-lg px-4 py-2.5 text-sm text-primary outline-none focus:border-custom-red/50 transition-colors"
                placeholder="Enter score"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <SheetFooter className="px-5 pb-5 pt-2 justify-center">
          <button className="w-full max-w-xs py-2.5 rounded-lg bg-custom-red text-white text-sm font-medium hover:bg-custom-red/80 transition-colors">
            Score Submit
          </button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex items-start justify-between gap-4 py-1.5 border-b border-white/5 last:border-0">
    <span className="text-sm text-secondary whitespace-nowrap">{label}</span>
    <span className="text-sm text-primary text-right">{value}</span>
  </div>
);

export default PlayerDetailsSheet;
