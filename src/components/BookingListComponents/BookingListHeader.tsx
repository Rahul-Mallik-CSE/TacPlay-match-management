/** @format */

"use client";

import React from "react";
import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";

type BookingListHeaderProps = {
  search: string;
  onSearchChange: (value: string) => void;
};

const BookingListHeader: React.FC<BookingListHeaderProps> = ({
  search,
  onSearchChange,
}) => {
  const { t } = useTranslation("dashboard");

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold text-primary">
          {t("bookings.title")}
        </h1>
        <p className="text-sm text-secondary mt-1">
          {t("bookings.subtitle")}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
          <input
            type="text"
            placeholder={t("common.search")}
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-muted border border-white/10 text-sm text-primary placeholder:text-secondary focus:outline-none focus:ring-1 focus:ring-custom-yellow/50"
          />
        </div>
      </div>
    </>
  );
};

export default BookingListHeader;
