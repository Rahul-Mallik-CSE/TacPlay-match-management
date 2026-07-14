/** @format */

"use client";

import React from "react";
import { cn } from "@/lib/utils";

type ScoreManagementSectionProps = {
  showResultSelector: boolean;
  activeMatchStatus: string;
  onSetMatchStatus: (status: string) => void;
};

const ScoreManagementSection: React.FC<ScoreManagementSectionProps> = ({
  showResultSelector,
  activeMatchStatus,
  onSetMatchStatus,
}) => {
  if (!showResultSelector) return null;

  const statusOptions = ["Win", "Loss", "Draw"];

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-primary mb-3">
        Score Management
      </h3>
      <div className="bg-[#0c0a0c] border border-white/5 rounded-2xl p-1.5 flex items-center">
        {statusOptions.map((status) => (
          <button
            key={status}
            onClick={() => onSetMatchStatus(status)}
            className={cn(
              "flex-1 py-2 cursor-pointer text-sm font-semibold rounded-xl transition-all duration-200",
              activeMatchStatus === status
                ? "bg-[#e2b83b] text-black shadow-md"
                : "text-secondary hover:text-white",
            )}
          >
            {status}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ScoreManagementSection;
