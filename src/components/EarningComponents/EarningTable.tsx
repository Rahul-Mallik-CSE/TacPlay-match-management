/** @format */

"use client";

import React, { useMemo, useState } from "react";
import CustomTable from "../CommonComponents/CustomTable";
import TransactionDetailsSheet from "./TransactionDetailsSheet";
import EarningLoading from "./EarningLoading";
import EarningListHeader from "./EarningListHeader";
import PaymentBadge from "./shared/PaymentBadge";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setEarningsLimit,
  setEarningsPage,
} from "@/redux/features/earnings/earningsSlice";
import { useGetEarningsListQuery } from "@/redux/features/earnings/earningsAPI";
import type { EarningsListItem } from "@/types/EarningTypes";
import { useTranslation } from "react-i18next";

const EarningTable = () => {
  const { t } = useTranslation("dashboard");
  const dispatch = useAppDispatch();
  const page = useAppSelector((state) => state.earnings.page);
  const limit = useAppSelector((state) => state.earnings.limit);

  const [search, setSearch] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState<
    number | null
  >(null);

  const queryArgs = useMemo(
    () => ({
      page,
      limit,
      search: search.trim() || undefined,
    }),
    [limit, page, search],
  );

  const { data, isLoading, isFetching, isError } =
    useGetEarningsListQuery(queryArgs);

  const rows = data?.data ?? [];
  const totalPage = data?.meta.totalPage ?? 1;
  const totalCount = data?.meta.total ?? rows.length;

  if ((isLoading || isFetching) && !data) {
    return <EarningLoading />;
  }

  const matchTypeDot = (type: string) => {
    const isRanked = type.toLowerCase() === "ranked";
    return (
      <span className="flex items-center gap-2">
        <span
          className={`w-2 h-2 rounded-full ${isRanked ? "bg-custom-red" : "bg-custom-yellow"}`}
        />
        {type}
      </span>
    );
  };

  const columns = [
    {
      header: t("earnings.columns.transactionId"),
      accessor: "display_transaction_id" as keyof EarningsListItem,
    },
    {
      header: t("earnings.columns.playerName"),
      accessor: "user_name" as keyof EarningsListItem,
    },
    {
      header: t("earnings.columns.sessionId"),
      accessor: "display_session_id" as keyof EarningsListItem,
    },
    {
      header: t("earnings.columns.matchType"),
      accessor: (row: EarningsListItem) =>
        matchTypeDot(row.session_type_display),
    },
    {
      header: t("earnings.columns.date"),
      accessor: "date_display" as keyof EarningsListItem,
    },
    {
      header: t("earnings.columns.amount"),
      accessor: "amount_display" as keyof EarningsListItem,
    },
    {
      header: t("earnings.columns.paymentMethod"),
      accessor: (row: EarningsListItem) => (
        <PaymentBadge method={row.payment_method_display} />
      ),
    },
  ];

  const handleAction = (row: EarningsListItem) => {
    setSelectedTransactionId(row.transaction_id);
    setSheetOpen(true);
  };

  return (
    <div className="space-y-6">
      <EarningListHeader
        search={search}
        onSearchChange={(value) => {
          setSearch(value);
          dispatch(setEarningsPage(1));
        }}
      />

      {isError ? (
        <div className="text-sm text-destructive">
          {t("earnings.loadFailed")}
        </div>
      ) : null}

      <CustomTable
        data={rows}
        columns={columns}
        onAction={handleAction}
        itemsPerPage={limit}
        serverPagination
        currentPage={page}
        totalPages={totalPage}
        additionalCount={totalCount}
        onPageChange={(nextPage) => dispatch(setEarningsPage(nextPage))}
        onItemsPerPageChange={(nextLimit) =>
          dispatch(setEarningsLimit(nextLimit))
        }
      />

      <TransactionDetailsSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        transactionId={selectedTransactionId}
      />
    </div>
  );
};

export default EarningTable;
