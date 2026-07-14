/** @format */

"use client";

import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import CustomTable from "../CommonComponents/CustomTable";
import BookingDetailsSheet from "@/components/BookingListComponents/BookingDetailsSheet";
import BookingListLoading from "@/components/BookingListComponents/BookingListLoading";
import BookingListHeader from "@/components/BookingListComponents/BookingListHeader";
import StatusBadge from "@/components/BookingListComponents/shared/StatusBadge";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setBookingListLimit,
  setBookingListPage,
} from "@/redux/features/bookingList/bookingListSlice";
import { useGetBookingListQuery } from "@/redux/features/bookingList/bookingListAPI";
import type { BookingListItem } from "@/types/BookingListTypes";

const BookingListTable = () => {
  const { t } = useTranslation("dashboard");
  const dispatch = useAppDispatch();
  const page = useAppSelector((state) => state.bookingList.page);
  const limit = useAppSelector((state) => state.bookingList.limit);

  const [search, setSearch] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(
    null,
  );

  const queryArgs = useMemo(
    () => ({ page, limit, search: search.trim() || undefined }),
    [limit, page, search],
  );

  const { data, isLoading, isFetching, isError } =
    useGetBookingListQuery(queryArgs);

  const rows = data?.data ?? [];
  const totalPage = data?.meta.totalPage ?? 1;
  const totalCount = data?.meta.total ?? rows.length;

  if ((isLoading || isFetching) && !data) {
    return <BookingListLoading />;
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
      header: t("bookings.columns.bookingId"),
      accessor: (row: BookingListItem) => (
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-custom-red" />
          {row.display_booking_id}
        </span>
      ),
    },
    {
      header: t("bookings.columns.playerName"),
      accessor: "player_name" as keyof BookingListItem,
    },
    {
      header: t("bookings.columns.sessionDate"),
      accessor: "match_date" as keyof BookingListItem,
    },
    {
      header: t("bookings.columns.matchType"),
      accessor: (row: BookingListItem) => matchTypeDot(row.match_type),
    },
    {
      header: t("bookings.columns.paymentStatus"),
      accessor: (row: BookingListItem) => (
        <StatusBadge status={row.payment_status} />
      ),
    },
    {
      header: t("bookings.columns.team"),
      accessor: "team_display" as keyof BookingListItem,
    },
    {
      header: t("bookings.columns.status"),
      accessor: (row: BookingListItem) => (
        <StatusBadge status={row.status} />
      ),
    },
  ];

  const handleAction = (row: BookingListItem) => {
    setSelectedBookingId(row.booking_id);
    setSheetOpen(true);
  };

  return (
    <div className="space-y-5">
      <BookingListHeader
        search={search}
        onSearchChange={(value) => {
          setSearch(value);
          dispatch(setBookingListPage(1));
        }}
      />

      {isError ? (
        <div className="text-sm text-destructive">
          {t("bookings.loadFailed")}
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
        onPageChange={(nextPage) => dispatch(setBookingListPage(nextPage))}
        onItemsPerPageChange={(nextLimit) =>
          dispatch(setBookingListLimit(nextLimit))
        }
      />

      <BookingDetailsSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        bookingId={selectedBookingId}
      />
    </div>
  );
};

export default BookingListTable;
