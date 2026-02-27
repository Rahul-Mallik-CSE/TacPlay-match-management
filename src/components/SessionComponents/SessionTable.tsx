/** @format */

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Search, SlidersHorizontal, Plus } from "lucide-react";
import CustomTable from "@/components/CommonComponents/CustomTable";
import Link from "next/link";

interface SessionData {
  sessionId: string;
  date: string;
  time: string;
  matchType: string;
  players: string;
  booked: string;
  status: string;
}

const sessionData: SessionData[] = [
  {
    sessionId: "#SE 565",
    date: "26 Jan 2026",
    time: "3:00 PM – 4:30 PM",
    matchType: "Ranked",
    players: "8 / 8",
    booked: "2 / 8",
    status: "Open",
  },
  {
    sessionId: "#SE 565",
    date: "26 Jan 2026",
    time: "3:00 PM – 4:30 PM",
    matchType: "Social",
    players: "8 / 8",
    booked: "2 / 8",
    status: "Paid",
  },
  {
    sessionId: "#SE 565",
    date: "26 Jan 2026",
    time: "3:00 PM – 4:30 PM",
    matchType: "Ranked",
    players: "8 / 8",
    booked: "2 / 8",
    status: "Ongoing",
  },
  {
    sessionId: "#SE 565",
    date: "26 Jan 2026",
    time: "3:00 PM – 4:30 PM",
    matchType: "Social",
    players: "8 / 8",
    booked: "2 / 8",
    status: "Completed",
  },
  {
    sessionId: "#SE 565",
    date: "26 Jan 2026",
    time: "3:00 PM – 4:30 PM",
    matchType: "Ranked",
    players: "8 / 8",
    booked: "2 / 8",
    status: "Cancelled",
  },
  {
    sessionId: "#SE 565",
    date: "26 Jan 2026",
    time: "3:00 PM – 4:30 PM",
    matchType: "Social",
    players: "8 / 8",
    booked: "2 / 8",
    status: "Paid",
  },
  {
    sessionId: "#SE 565",
    date: "26 Jan 2026",
    time: "3:00 PM – 4:30 PM",
    matchType: "Ranked",
    players: "8 / 8",
    booked: "2 / 8",
    status: "Open",
  },
  {
    sessionId: "#SE 565",
    date: "26 Jan 2026",
    time: "3:00 PM – 4:30 PM",
    matchType: "Social",
    players: "8 / 8",
    booked: "2 / 8",
    status: "Open",
  },
  {
    sessionId: "#SE 565",
    date: "26 Jan 2026",
    time: "3:00 PM – 4:30 PM",
    matchType: "Ranked",
    players: "8 / 8",
    booked: "2 / 8",
    status: "Ongoing",
  },
  {
    sessionId: "#SE 565",
    date: "26 Jan 2026",
    time: "3:00 PM – 4:30 PM",
    matchType: "Social",
    players: "8 / 8",
    booked: "2 / 8",
    status: "Open",
  },
];

const columns = [
  { header: "Session ID", accessor: "sessionId" as keyof SessionData },
  { header: "Date", accessor: "date" as keyof SessionData },
  { header: "Time", accessor: "time" as keyof SessionData },
  {
    header: "Match Type",
    accessor: ((row: SessionData) => (
      <div className="flex items-center gap-2">
        <span
          className={`w-2 h-2 rounded-full ${
            row.matchType === "Ranked" ? "bg-custom-red" : "bg-custom-yellow"
          }`}
        />
        <span>{row.matchType}</span>
      </div>
    )) as (row: SessionData) => React.ReactNode,
  },
  { header: "Players", accessor: "players" as keyof SessionData },
  { header: "Booked", accessor: "booked" as keyof SessionData },
  { header: "Status", accessor: "status" as keyof SessionData },
];

const SessionTable: React.FC = () => {
  const router = useRouter();

  const handleViewSession = (_row: SessionData) => {
    router.push(`/sessions/session-details`);
  };

  return (
    <div className="w-full px-4 sm:px-6 py-6 space-y-5">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-primary">
          Sessions Lists
        </h1>
      </div>

      {/* Search, Filter & Create */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Search */}
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-muted border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-primary placeholder:text-secondary outline-none w-full sm:w-56"
            />
          </div>
          {/* Filter */}
          <button className="flex items-center gap-2 bg-muted border border-white/10 rounded-lg px-4 py-2 text-sm text-secondary hover:text-primary transition-colors">
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden sm:inline">Filter</span>
          </button>
        </div>

        {/* Create New Session */}
        <Link href="/sessions/create-session">
          <button className="flex items-center gap-2 bg-custom-red hover:bg-custom-red/80 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors">
            <Plus className="w-4 h-4" />
            Create New Session
          </button>
        </Link>
      </div>

      {/* Table */}
      <CustomTable<SessionData>
        data={sessionData}
        columns={columns}
        onAction={handleViewSession}
        itemsPerPage={10}
      />
    </div>
  );
};

export default SessionTable;
