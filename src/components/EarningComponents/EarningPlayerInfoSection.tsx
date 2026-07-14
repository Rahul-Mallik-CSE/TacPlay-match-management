/** @format */

"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import InfoRow from "./shared/InfoRow";
import type { TransactionDetailsResponse } from "@/types/EarningTypes";

type EarningPlayerInfoSectionProps = {
  playerInfo: TransactionDetailsResponse["data"]["transaction_details"]["player_info"];
};

const EarningPlayerInfoSection: React.FC<EarningPlayerInfoSectionProps> = ({
  playerInfo,
}) => {
  const { t } = useTranslation("dashboard");

  return (
    <div>
      <h3 className="text-lg font-semibold text-primary mb-3">
        {t("earnings.details.playerInfo")}
      </h3>
      <div>
        <InfoRow label="Player ID" value={playerInfo.display_player_id} />
        <InfoRow label="Player Name" value={playerInfo.player_name} />
        <InfoRow label="Email" value={playerInfo.email} />
        <InfoRow label="Booking ID" value={playerInfo.display_booking_id} />
        <InfoRow label="Session ID" value={playerInfo.display_session_id} />
      </div>
    </div>
  );
};

export default EarningPlayerInfoSection;
