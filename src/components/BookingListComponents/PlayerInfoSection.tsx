/** @format */

"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import InfoRow from "./shared/InfoRow";
import type { BookingDetailsResponse } from "@/types/BookingListTypes";

type PlayerInfoSectionProps = {
  player: BookingDetailsResponse["data"]["player"];
};

const PlayerInfoSection: React.FC<PlayerInfoSectionProps> = ({ player }) => {
  const { t } = useTranslation("dashboard");

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-primary mb-3">
        {t("bookings.details.playerInfo")}
      </h3>
      <div>
        <InfoRow label="Player ID" value={player.display_player_id} />
        <InfoRow label="Player Name" value={player.full_name} />
        <InfoRow label="Email" value={player.email} />
        <InfoRow label="Contact Number" value={player.contact_number ?? "-"} />
        <InfoRow label="Location" value={player.location} />
      </div>
    </div>
  );
};

export default PlayerInfoSection;
