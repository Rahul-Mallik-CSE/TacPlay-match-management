/** @format */

"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import InfoRow from "./shared/InfoRow";
import type { BookingDetailsResponse } from "@/types/BookingListTypes";

type SessionInfoSectionProps = {
  session: BookingDetailsResponse["data"]["session"];
};

const SessionInfoSection: React.FC<SessionInfoSectionProps> = ({ session }) => {
  const { t } = useTranslation("dashboard");

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-primary mb-3">
        {t("bookings.details.sessionInfo")}
      </h3>
      <div>
        <InfoRow label="Session ID" value={`#CH ${session.id}`} />
        <InfoRow label="Session Name" value={session.session_name} />
        <InfoRow label="Arena Name" value={session.field_name} />
        <InfoRow
          label="Match Type"
          value={
            <span className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${session.match_type.toLowerCase() === "ranked" ? "bg-custom-red" : "bg-custom-yellow"}`}
              />
              {session.match_type}
            </span>
          }
        />
        <InfoRow label="Session Date" value={session.match_date} />
        <InfoRow
          label="Time"
          value={`${session.start_time} to ${session.end_time}`}
        />
      </div>
    </div>
  );
};

export default SessionInfoSection;
