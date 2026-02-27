/** @format */

"use client";

import React, { useState } from "react";
import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import CustomTable from "../CommonComponents/CustomTable";
import BookingDetailsSheet from "./BookingDetailsSheet";

interface BookingData {
  bookingId: string;
  playerName: string;
  sessionDate: string;
  matchType: string;
  paymentStatus: string;
  checkInStatus: string;
  status: string;
}

const sampleBookings: BookingData[] = Array.from({ length: 25 }, (_, i) => ({
  bookingId: `#BRN 556${i}`,
  playerName: "Imrul Hossain",
  sessionDate: "25 jan 2026",
  matchType: i % 2 === 0 ? "Ranked" : "Social",
  paymentStatus: i % 3 === 0 ? "Pending" : "Paid",
  checkInStatus: i % 4 === 0 ? "Pending" : "Checked-In",
  status: i % 5 === 0 ? "Cancelled" : i % 3 === 0 ? "Pending" : "Open",
}));

const BookingListTable = () => {
  const [search, setSearch] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<BookingData | null>(
    null,
  );

  const filteredData = sampleBookings.filter(
    (b) =>
      b.playerName.toLowerCase().includes(search.toLowerCase()) ||
      b.bookingId.toLowerCase().includes(search.toLowerCase()),
  );

  const matchTypeDot = (type: string) => {
    const isRanked = type === "Ranked";
    return (
      <span className="flex items-center gap-2">
        <span
          className={`w-2 h-2 rounded-full ${isRanked ? "bg-custom-red" : "bg-custom-yellow"}`}
        />
        {type}
      </span>
    );
  };

  const statusBadge = (value: string) => {
    const colorMap: Record<string, string> = {
      paid: "bg-teal-500/20 text-teal-400 border border-teal-500/30",
      pending:
        "bg-custom-yellow/20 text-yellow-400 border border-custom-yellow/30",
      "checked-in":
        "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
    };
    const colors =
      colorMap[value.toLowerCase()] ||
      "bg-secondary/20 text-secondary border border-secondary/30";
    return (
      <span
        className={`px-2.5 py-0.5 text-xs font-medium rounded-md ${colors}`}
      >
        {value}
      </span>
    );
  };

  const columns = [
    {
      header: "Booking ID",
      accessor: (row: BookingData) => (
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-custom-red" />
          {row.bookingId}
        </span>
      ),
    },
    { header: "Player Name", accessor: "playerName" as keyof BookingData },
    { header: "Session Date", accessor: "sessionDate" as keyof BookingData },
    {
      header: "Match Type",
      accessor: (row: BookingData) => matchTypeDot(row.matchType),
    },
    {
      header: "Payment Status",
      accessor: (row: BookingData) => statusBadge(row.paymentStatus),
    },
    {
      header: "Check-In Status",
      accessor: (row: BookingData) => statusBadge(row.checkInStatus),
    },
    { header: "Status", accessor: "status" as keyof BookingData },
  ];

  const handleAction = (row: BookingData) => {
    setSelectedBooking(row);
    setSheetOpen(true);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-primary">Booking List</h1>
        <p className="text-sm text-secondary mt-1">
          Manage and review all session bookings.
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-muted border border-white/10 text-sm text-primary placeholder:text-secondary focus:outline-none focus:ring-1 focus:ring-custom-yellow/50"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-sm text-secondary hover:bg-white/5 transition-colors">
            <SlidersHorizontal className="w-4 h-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-sm text-secondary hover:bg-white/5 transition-colors">
            <ArrowUpDown className="w-4 h-4" />
            Sort by
          </button>
        </div>
      </div>

      {/* Table */}
      <CustomTable
        data={filteredData}
        columns={columns}
        onAction={handleAction}
        itemsPerPage={10}
      />

      {/* Booking Details Sheet */}
      <BookingDetailsSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        booking={selectedBooking}
      />
    </div>
  );
};

export default BookingListTable;
