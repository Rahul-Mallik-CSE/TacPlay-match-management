/** @format */

"use client";

import React from "react";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import {
  setSessionsMatchType,
  setSessionsStatus,
} from "@/redux/features/sessions/sessionsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import type {
  SessionMatchTypeFilter,
  SessionStatusFilter,
} from "@/types/SessionTypes";

const SessionListHeader: React.FC = () => {
  const { t } = useTranslation("dashboard");
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.sessions.status);
  const matchType = useAppSelector((state) => state.sessions.matchType);

  return (
    <>
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-primary">
          {t("sessions.title")}
        </h1>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={status}
            onChange={(e) =>
              dispatch(setSessionsStatus(e.target.value as SessionStatusFilter))
            }
            className="bg-muted border border-white/10 rounded-lg px-4 py-2 text-sm text-primary outline-none"
          >
            <option value="all">{t("sessions.filters.allStatus")}</option>
            <option value="open">{t("sessions.filters.open")}</option>
            <option value="ongoing">{t("sessions.filters.ongoing")}</option>
            <option value="completed">{t("sessions.filters.completed")}</option>
            <option value="cancelled">{t("sessions.filters.cancelled")}</option>
          </select>

          <select
            value={matchType}
            onChange={(e) =>
              dispatch(
                setSessionsMatchType(
                  e.target.value as SessionMatchTypeFilter,
                ),
              )
            }
            className="bg-muted border border-white/10 rounded-lg px-4 py-2 text-sm text-primary outline-none"
          >
            <option value="all">{t("sessions.filters.allMatchTypes")}</option>
            <option value="ranked">{t("sessions.filters.ranked")}</option>
            <option value="social">{t("sessions.filters.social")}</option>
          </select>
        </div>

        <Link href="/sessions/create-session">
          <button className="flex cursor-pointer items-center gap-2 bg-custom-red hover:bg-custom-red/80 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors">
            <Plus className="w-4 h-4" />
            {t("sessions.createNew")}
          </button>
        </Link>
      </div>
    </>
  );
};

export default SessionListHeader;
