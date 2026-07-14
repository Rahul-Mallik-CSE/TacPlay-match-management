/** @format */

"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import CustomTable from "@/components/CommonComponents/CustomTable";
import SessionLoading from "@/components/SessionComponents/SessionLoading";
import SessionListHeader from "@/components/SessionComponents/SessionListHeader";
import {
  setSessionsLimit,
  setSessionsPage,
} from "@/redux/features/sessions/sessionsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useGetOwnerSessionsQuery } from "@/redux/features/sessions/sessionsAPI";
import type { SessionsListItem } from "@/types/SessionTypes";
import { useTranslation } from "react-i18next";

const SessionTable: React.FC = () => {
  const { t } = useTranslation("dashboard");
  const dispatch = useAppDispatch();
  const router = useRouter();

  const columns = [
    {
      header: t("sessions.columns.sessionName"),
      accessor: "session_name" as keyof SessionsListItem,
    },
    {
      header: t("sessions.columns.date"),
      accessor: "date" as keyof SessionsListItem,
    },
    {
      header: t("sessions.columns.time"),
      accessor: "time" as keyof SessionsListItem,
    },
    {
      header: t("sessions.columns.matchType"),
      accessor: ((row: SessionsListItem) => (
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${
              row.match_type.toLowerCase() === "ranked"
                ? "bg-custom-red"
                : "bg-custom-yellow"
            }`}
          />
          <span>{row.match_type_display}</span>
        </div>
      )) as (row: SessionsListItem) => React.ReactNode,
    },
    {
      header: t("sessions.columns.players"),
      accessor: "player" as keyof SessionsListItem,
    },
    {
      header: t("sessions.columns.booked"),
      accessor: "booked" as keyof SessionsListItem,
    },
    {
      header: t("sessions.columns.status"),
      accessor: "status_display" as keyof SessionsListItem,
    },
  ];

  const page = useAppSelector((state) => state.sessions.page);
  const limit = useAppSelector((state) => state.sessions.limit);
  const status = useAppSelector((state) => state.sessions.status);
  const matchType = useAppSelector((state) => state.sessions.matchType);

  const queryArgs = useMemo(
    () => ({ page, limit, status, match_type: matchType }),
    [limit, matchType, page, status],
  );

  const { data, isLoading, isFetching, isError } =
    useGetOwnerSessionsQuery(queryArgs);

  const rows = data?.data ?? [];
  const totalPage = data?.meta.totalPage ?? 1;
  const totalCount = data?.meta.total ?? rows.length;

  if ((isLoading || isFetching) && !data) {
    return <SessionLoading />;
  }

  const handleViewSession = (row: SessionsListItem) => {
    router.push(`/sessions/${row.id}`);
  };

  return (
    <div className="w-full space-y-6">
      <SessionListHeader />

      {isError ? (
        <div className="text-sm text-destructive">
          {t("sessions.loadFailed")}
        </div>
      ) : null}

      <CustomTable<SessionsListItem>
        data={rows}
        columns={columns}
        onAction={handleViewSession}
        itemsPerPage={limit}
        serverPagination
        currentPage={page}
        totalPages={totalPage}
        additionalCount={totalCount}
        onPageChange={(nextPage) => dispatch(setSessionsPage(nextPage))}
        onItemsPerPageChange={(nextLimit) =>
          dispatch(setSessionsLimit(nextLimit))
        }
      />
    </div>
  );
};

export default SessionTable;
