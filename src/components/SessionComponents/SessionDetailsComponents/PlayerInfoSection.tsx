/** @format */

"use client";

import React from "react";
import InfoRow from "../shared/InfoRow";
import type { TransactionDetailsResponse } from "@/types/EarningTypes";

type PlayerInfoSectionProps = {
  playerInfo: {
    team_name: string;
    player_id: string;
    player_name: string;
    email: string;
    contact_number: string;
  };
};

const PlayerInfoSection: React.FC<PlayerInfoSectionProps> = ({ playerInfo }) => (
  <div>
    <h3 className="text-lg font-semibold text-primary mb-3">Player Info</h3>
    <div>
      <InfoRow label="Team Name" value={playerInfo.team_name} />
      <InfoRow label="Player ID" value={playerInfo.player_id} />
      <InfoRow label="Player Name" value={playerInfo.player_name} />
      <InfoRow label="Email" value={playerInfo.email} />
      <InfoRow label="Contact Number" value={playerInfo.contact_number} />
    </div>
  </div>
);

export default PlayerInfoSection;
