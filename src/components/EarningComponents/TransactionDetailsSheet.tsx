/** @format */

"use client";

import React from "react";
import { ArrowLeft, Download } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { useGetEarningDetailsQuery } from "@/redux/features/earnings/earningsAPI";

interface TransactionDetailsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transactionId: number | null;
}

const TransactionDetailsSheet: React.FC<TransactionDetailsSheetProps> = ({
  open,
  onOpenChange,
  transactionId,
}) => {
  const { data, isLoading, isFetching, isError } = useGetEarningDetailsQuery(
    transactionId as number,
    {
      skip: !open || transactionId === null,
    },
  );

  const details = data?.data.transaction_details;

  if (!open) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-full sm:max-w-lg bg-card border-l border-white/10 overflow-y-auto p-0"
      >
        <SheetHeader className="p-5 pb-0">
          <div className="flex items-center">
            <button
              onClick={() => onOpenChange(false)}
              className="p-1 hover:bg-white/5 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-primary" />
            </button>
          </div>
          <SheetTitle className="text-xl font-bold text-primary">
            {details?.title ?? "Transaction Details"}
          </SheetTitle>
          <SheetDescription className="text-sm text-secondary">
            {details?.subtitle ??
              "View complete transaction and payment information."}
          </SheetDescription>
        </SheetHeader>

        <div className="px-5 pb-5">
          {isLoading || isFetching ? (
            <div className="py-6 text-sm text-muted-foreground">
              Loading transaction details...
            </div>
          ) : null}

          {isError ? (
            <div className="py-6 text-sm text-destructive">
              Failed to load transaction details.
            </div>
          ) : null}

          {details ? (
            <>
              <div>
                <h3 className="text-lg font-semibold text-primary mb-3">
                  Player Info
                </h3>
                <div>
                  <InfoRow
                    label="Player ID"
                    value={details.player_info.display_player_id}
                  />
                  <InfoRow
                    label="Player Name"
                    value={details.player_info.player_name}
                  />
                  <InfoRow label="Email" value={details.player_info.email} />
                  <InfoRow
                    label="Booking ID"
                    value={details.player_info.display_booking_id}
                  />
                  <InfoRow
                    label="Session ID"
                    value={details.player_info.display_session_id}
                  />
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-primary mb-3">
                  Payment Info
                </h3>
                <div>
                  <InfoRow
                    label="Transaction ID"
                    value={details.payment_info.display_transaction_id}
                  />
                  <InfoRow
                    label="Amount"
                    value={details.payment_info.amount_display}
                  />
                  <InfoRow
                    label="Platform Fee"
                    value={details.payment_info.platform_fee_display}
                  />
                  <InfoRow
                    label="Net Profit"
                    value={details.payment_info.net_profit_display}
                  />
                  <InfoRow
                    label="Payment Method"
                    value={
                      <PaymentBadge
                        method={details.payment_info.payment_method_display}
                      />
                    }
                  />
                  <InfoRow
                    label="Date & Time"
                    value={details.payment_info.date_time_display}
                  />
                  <InfoRow
                    label="Payment Status"
                    value={
                      <span className="px-3 py-0.5 text-xs font-medium rounded-md border bg-teal-500/20 text-teal-400 border-teal-500/30">
                        {details.status_display}
                      </span>
                    }
                  />
                </div>
              </div>
            </>
          ) : null}
        </div>

        <SheetFooter className="px-5 pb-5 pt-2 flex-row gap-3">
          <button
            onClick={() => onOpenChange(false)}
            className="cursor-pointer flex-1 py-2.5 rounded-lg border border-white/10 text-primary text-sm font-medium hover:bg-white/5 transition-colors"
          >
            {details?.actions.cancel_button_text ?? "Cancel"}
          </button>
          <button
            disabled={!details?.actions.can_download}
            className="cursor-pointer flex-1 py-2.5 rounded-lg bg-custom-red text-white text-sm font-medium hover:bg-custom-red/80 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" />
            {details?.actions.download_button_text ?? "Download & Print"}
          </button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
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

const PaymentBadge = ({ method }: { method: string }) => {
  const isStripe = method.toLowerCase().includes("stripe");
  return (
    <span
      className={`px-2.5 py-0.5 text-xs font-medium rounded-md border ${
        isStripe
          ? "bg-purple-500/20 text-purple-400 border-purple-500/30"
          : "bg-blue-500/20 text-blue-400 border-blue-500/30"
      }`}
    >
      {method}
    </span>
  );
};

export default TransactionDetailsSheet;
