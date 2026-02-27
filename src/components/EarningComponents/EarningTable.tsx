/** @format */

"use client";

import React, { useState } from "react";
import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import CustomTable from "../CommonComponents/CustomTable";
import TransactionDetailsSheet from "./TransactionDetailsSheet";

interface TransactionData {
  transactionId: string;
  playerName: string;
  sessionId: string;
  serviceType: string;
  date: string;
  amount: string;
  paymentMethod: string;
}

const sampleTransactions: TransactionData[] = Array.from(
  { length: 25 },
  (_, i) => ({
    transactionId: `#CNH 565${i}`,
    playerName: "Imrul Hossain",
    sessionId: `#SS 100${i}`,
    serviceType: i % 2 === 0 ? "Ranked" : "Social",
    date: "25 jan 2026",
    amount: "$25.25",
    paymentMethod: i % 2 === 0 ? "PayPal" : "Stripe",
  }),
);

const EarningTable = () => {
  const [search, setSearch] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<TransactionData | null>(null);

  const filteredData = sampleTransactions.filter(
    (t) =>
      t.playerName.toLowerCase().includes(search.toLowerCase()) ||
      t.transactionId.toLowerCase().includes(search.toLowerCase()),
  );

  const serviceTypeDot = (type: string) => {
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

  const paymentBadge = (method: string) => {
    const isPayPal = method.toLowerCase() === "paypal";
    return (
      <span
        className={`px-2.5 py-0.5 text-xs font-medium rounded-md border ${
          isPayPal
            ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
            : "bg-purple-500/20 text-purple-400 border-purple-500/30"
        }`}
      >
        {method}
      </span>
    );
  };

  const columns = [
    {
      header: "Transaction ID",
      accessor: "transactionId" as keyof TransactionData,
    },
    { header: "Player Name", accessor: "playerName" as keyof TransactionData },
    { header: "Session ID", accessor: "sessionId" as keyof TransactionData },
    {
      header: "Service Type",
      accessor: (row: TransactionData) => serviceTypeDot(row.serviceType),
    },
    { header: "Date", accessor: "date" as keyof TransactionData },
    { header: "Amount", accessor: "amount" as keyof TransactionData },
    {
      header: "Payment Method",
      accessor: (row: TransactionData) => paymentBadge(row.paymentMethod),
    },
  ];

  const handleAction = (row: TransactionData) => {
    setSelectedTransaction(row);
    setSheetOpen(true);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-primary">Earnings</h1>
        <p className="text-sm text-secondary mt-1">
          Track revenue and view transaction details.
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

      {/* Transaction Details Sheet */}
      <TransactionDetailsSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        transaction={selectedTransaction}
      />
    </div>
  );
};

export default EarningTable;
