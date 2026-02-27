/** @format */

"use client";

import React, { useState } from "react";
import { ArrowLeft, AlertCircle } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface BookingData {
  bookingId: string;
  playerName: string;
  sessionDate: string;
  matchType: string;
  paymentStatus: string;
  checkInStatus: string;
  status: string;
}

interface BookingDetailsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  booking: BookingData | null;
}

const BookingDetailsSheet: React.FC<BookingDetailsSheetProps> = ({
  open,
  onOpenChange,
  booking,
}) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  if (!booking) return null;

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="right"
          showCloseButton={false}
          className="w-full sm:max-w-lg bg-card border-l border-white/10 overflow-y-auto p-0"
        >
          {/* Header */}
          <SheetHeader className="p-5 pb-0">
            <div className="flex items-center justify-between">
              <button
                onClick={() => onOpenChange(false)}
                className="p-1 hover:bg-white/5 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-primary" />
              </button>
              <StatusBadge status={booking.status} />
            </div>
            <SheetTitle className="text-2xl font-bold text-primary mt-3">
              Booking Details
            </SheetTitle>
            <SheetDescription className="text-sm text-secondary">
              View full booking information and transaction.
            </SheetDescription>
          </SheetHeader>

          <div className="px-5 pb-5 space-y-6 mt-4">
            {/* Player Info */}
            <div>
              <h3 className="text-lg font-semibold text-primary mb-3">
                Player Info
              </h3>
              <div className="space-y-3">
                <InfoRow label="Player ID" value="#CN 256" />
                <InfoRow label="Player Name" value={booking.playerName} />
                <InfoRow label="Email" value="name@gmail.com" />
                <InfoRow label="Contact Number" value="+26 256 2564" />
              </div>
            </div>

            {/* Session Info */}
            <div>
              <h3 className="text-lg font-semibold text-primary mb-3">
                Session Info
              </h3>
              <div className="space-y-3">
                <InfoRow label="Session ID" value="Imrul Hossain" />
                <InfoRow label="Arena Name" value="Toffe Fun World" />
                <InfoRow
                  label="Match Type"
                  value={
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-custom-red" />
                      Ranked
                    </span>
                  }
                />
                <InfoRow label="Session Date" value="25 January, 2026" />
                <InfoRow label="Time" value="02:30 AM to 03:30 PM" />
              </div>
            </div>

            {/* Payment Info */}
            <div>
              <h3 className="text-lg font-semibold text-primary mb-3">
                Payment Info
              </h3>
              <div className="space-y-3">
                <InfoRow label="Booking ID" value={booking.bookingId} />
                <InfoRow label="Transaction ID" value="#CNH 565" />
                <InfoRow label="Amount" value="$25.25" />
                <InfoRow
                  label="Platform Fee"
                  value={
                    <span>
                      <span className="text-secondary">(Free User) </span>$05.25
                    </span>
                  }
                />
                <InfoRow label="Net Profit" value="$24.05" />
                <InfoRow label="Payment Method" value="PayPal" />
                <InfoRow label="Date & Time" value="02:30 AM, 25 jan 2026" />
                <InfoRow
                  label="Payment Status"
                  value={<StatusBadge status="Paid" />}
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <SheetFooter className="px-5 pb-5 pt-2 justify-center">
            <button
              onClick={() => setConfirmOpen(true)}
              className="w-full py-2.5 rounded-lg bg-custom-red text-white text-sm font-medium hover:bg-custom-red/80 transition-colors"
            >
              Mark as Checked-In
            </button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Check-In Confirmation Dialog */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent
          showCloseButton={false}
          className="bg-card border border-white/10 max-w-sm"
        >
          <DialogHeader className="items-center">
            <div className="w-12 h-12 rounded-full bg-custom-red/20 flex items-center justify-center mb-2">
              <AlertCircle className="w-6 h-6 text-custom-red" />
            </div>
            <DialogTitle className="text-primary text-center">
              Are you sure you want to mark this player as checked-in?
            </DialogTitle>
            <DialogDescription className="sr-only">
              Confirm check-in action
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-row gap-3 sm:justify-center mt-2">
            <button
              onClick={() => setConfirmOpen(false)}
              className="flex-1 py-2.5 rounded-lg border border-white/10 text-primary text-sm font-medium hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setConfirmOpen(false);
                onOpenChange(false);
              }}
              className="flex-1 py-2.5 rounded-lg bg-custom-red text-white text-sm font-medium hover:bg-custom-red/80 transition-colors"
            >
              Yes, Sure
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex items-start justify-between gap-4 py-1.5 border-b border-white/5 last:border-0">
    <span className="text-sm text-secondary whitespace-nowrap">{label}</span>
    <span className="text-sm text-primary text-right">{value}</span>
  </div>
);

const StatusBadge = ({ status }: { status: string }) => {
  const colorMap: Record<string, string> = {
    paid: "bg-teal-500/20 text-teal-400 border-teal-500/30",
    pending: "bg-custom-yellow/20 text-yellow-400 border-custom-yellow/30",
    open: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    cancelled: "bg-custom-red/20 text-red-400 border-custom-red/30",
  };
  const colors =
    colorMap[status.toLowerCase()] ||
    "bg-secondary/20 text-secondary border-secondary/30";

  return (
    <span
      className={`px-3 py-0.5 text-xs font-medium rounded-md border ${colors}`}
    >
      {status}
    </span>
  );
};

export default BookingDetailsSheet;
