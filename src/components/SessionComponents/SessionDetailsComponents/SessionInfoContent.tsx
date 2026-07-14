/** @format */

"use client";

import React from "react";
import InfoRow from "../shared/InfoRow";
import { useTranslation } from "react-i18next";

type SessionInfoContentProps = {
  sessionInfo: {
    session_id: string;
    match_type: string;
    match_type_display: string;
    session_date: string;
    time: string;
    session_type: string;
    team: string | null;
    player_per_team: string;
    packages: string;
  };
};

const SessionInfoContent: React.FC<SessionInfoContentProps> = ({
  sessionInfo,
}) => {
  const { t } = useTranslation("dashboard");

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-primary mb-3">
        {t("sessions.details.sessionInfo")}
      </h3>
      <div>
        <InfoRow label={t("sessions.details.sessionId")} value={sessionInfo.session_id} />
        <InfoRow
          label={t("sessions.details.matchType")}
          value={
            <span className="flex items-center gap-2 justify-end">
              <span
                className={`w-2 h-2 rounded-full ${
                  sessionInfo.match_type.toLowerCase() === "ranked"
                    ? "bg-custom-red"
                    : "bg-custom-yellow"
                }`}
              />
              {sessionInfo.match_type.toLowerCase() === "ranked"
                ? t("sessions.filters.ranked")
                : sessionInfo.match_type.toLowerCase() === "social"
                  ? t("sessions.filters.social")
                  : sessionInfo.match_type_display}
            </span>
          }
        />
        <InfoRow label={t("sessions.details.sessionDate")} value={sessionInfo.session_date} />
        <InfoRow label={t("sessions.details.time")} value={sessionInfo.time} />
        <InfoRow label={t("sessions.details.sessionType")} value={sessionInfo.session_type} />
        <InfoRow label={t("sessions.details.team")} value={sessionInfo.team ?? "N/A"} />
        <InfoRow label={t("sessions.details.playerPerTeam")} value={sessionInfo.player_per_team} />
        <InfoRow label={t("sessions.details.packages")} value={sessionInfo.packages} />
      </div>
    </div>
  );
};

export default SessionInfoContent;
