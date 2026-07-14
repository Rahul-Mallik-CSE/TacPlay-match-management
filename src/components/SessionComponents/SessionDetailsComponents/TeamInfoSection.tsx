/** @format */

"use client";

import React from "react";
import InfoRow from "../shared/InfoRow";
import { useTranslation } from "react-i18next";

type TeamInfoSectionProps = {
  teamInfo: {
    team_a_name: string;
    team_a_score: number;
    team_b_name: string;
    team_b_score: number;
    champion: string;
  };
};

const TeamInfoSection: React.FC<TeamInfoSectionProps> = ({ teamInfo }) => {
  const { t } = useTranslation("dashboard");

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-primary mb-3">
        {t("sessions.details.teamInfo")}
      </h3>
      <div>
        <InfoRow label={t("sessions.details.teamAName")} value={teamInfo.team_a_name} />
        <InfoRow label={t("sessions.details.teamAScore")} value={String(teamInfo.team_a_score)} />
        <InfoRow label={t("sessions.details.teamBName")} value={teamInfo.team_b_name} />
        <InfoRow label={t("sessions.details.teamBScore")} value={String(teamInfo.team_b_score)} />
        <InfoRow label={t("sessions.details.champion")} value={teamInfo.champion} />
      </div>
    </div>
  );
};

export default TeamInfoSection;
