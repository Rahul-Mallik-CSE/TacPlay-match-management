/** @format */

"use client";

import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { useTranslation } from "react-i18next";
import { useGetBookingDetailsQuery } from "@/redux/features/bookingList/bookingListAPI";
import StatusBadge from "./shared/StatusBadge";
import PlayerInfoSection from "./PlayerInfoSection";
import SessionInfoSection from "./SessionInfoSection";
import PaymentInfoSection from "./PaymentInfoSection";
import CheckInConfirmDialog from "./CheckInConfirmDialog";

interface BookingDetailsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookingId: number | null;
}

const BookingDetailsSheet: React.FC<BookingDetailsSheetProps> = ({
  open,
  onOpenChange,
  bookingId,
}) => {
  const { t } = useTranslation("dashboard");
  const [confirmOpen, setConfirmOpen] = useState(false);

  const { data, isLoading, isFetching, isError } = useGetBookingDetailsQuery(
    bookingId as number,
    { skip: !open || bookingId === null },
  );

  const details = data?.data;

  if (!open) return null;

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="right"
          showCloseButton={false}
          className="w-full sm:max-w-lg bg-card border-l border-white/10 overflow-y-auto p-0"
        >
          <SheetHeader className="p-5 pb-0">
            <div className="flex items-center justify-between">
              <button
                onClick={() => onOpenChange(false)}
                className="cursor-pointer p-1 hover:bg-white/5 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-primary" />
              </button>
              <SheetTitle>{t("bookings.details.title")}</SheetTitle>
              <StatusBadge
                status={details?.booking.status ?? "pending"}
                className="border"
              />
            </div>
            <SheetDescription className="text-sm text-secondary">
              {t("bookings.details.subtitle")}
            </SheetDescription>
          </SheetHeader>

          <div className="px-5 pb-5">
            {isLoading || isFetching ? (
              <div className="py-6 text-sm text-muted-foreground">
                {t("bookings.details.loading")}
              </div>
            ) : isError ? (
              <div className="py-6 text-sm text-destructive">
                {t("bookings.details.loadFailed")}
              </div>
            ) : details ? (
              <>
                <PlayerInfoSection player={details.player} />
                <SessionInfoSection session={details.session} />
                <PaymentInfoSection
                  booking={details.booking}
                  payment={details.payment}
                />
              </>
            ) : null}
          </div>

          <SheetFooter className="px-5 pb-5 pt-2 justify-center">
            <button
              onClick={() => setConfirmOpen(true)}
              className="w-full py-2.5 rounded-lg bg-custom-red text-white text-sm font-medium hover:bg-custom-red/80 transition-colors"
            >
              {t("bookings.details.markCheckedIn")}
            </button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <CheckInConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        onConfirm={() => setConfirmOpen(false)}
      />
    </>
  );
};

export default BookingDetailsSheet;
