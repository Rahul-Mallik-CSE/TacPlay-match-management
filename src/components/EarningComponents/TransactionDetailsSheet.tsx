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

interface TransactionData {
  transactionId: string;
  playerName: string;
  sessionId: string;
  serviceType: string;
  date: string;
  amount: string;
  paymentMethod: string;
}

interface TransactionDetailsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction: TransactionData | null;
}

const TransactionDetailsSheet: React.FC<TransactionDetailsSheetProps> = ({
  open,
  onOpenChange,
  transaction,
}) => {
  if (!transaction) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-full sm:max-w-lg bg-card border-l border-white/10 overflow-y-auto p-0"
      >
        {/* Header */}
        <SheetHeader className="p-5 pb-0">
          <div className="flex items-center">
            <button
              onClick={() => onOpenChange(false)}
              className="p-1 hover:bg-white/5 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-primary" />
            </button>
          </div>
          <SheetTitle className="text-2xl font-bold text-primary mt-3">
            Transaction Details
          </SheetTitle>
          <SheetDescription className="text-sm text-secondary">
            View complete transaction and payment information.
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
              <InfoRow label="Player Name" value={transaction.playerName} />
              <InfoRow label="Email" value="name@gmail.com" />
              <InfoRow label="Contact Number" value="+26 256 2564" />
            </div>
          </div>

          {/* Payment Info */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-3">
              Payment Info
            </h3>
            <div className="space-y-3">
              <InfoRow
                label="Transaction ID"
                value={transaction.transactionId}
              />
              <InfoRow label="Session ID" value={transaction.sessionId} />
              <InfoRow
                label="Service Type"
                value={
                  <span className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${transaction.serviceType === "Ranked" ? "bg-custom-red" : "bg-custom-yellow"}`}
                    />
                    {transaction.serviceType}
                  </span>
                }
              />
              <InfoRow label="Amount" value={transaction.amount} />
              <InfoRow
                label="Platform Fee"
                value={
                  <span>
                    <span className="text-secondary">(Free User) </span>$05.25
                  </span>
                }
              />
              <InfoRow label="Net Profit" value="$24.05" />
              <InfoRow
                label="Payment Method"
                value={<PaymentBadge method={transaction.paymentMethod} />}
              />
              <InfoRow label="Date & Time" value="02:30 AM, 25 jan 2026" />
              <InfoRow
                label="Payment Status"
                value={
                  <span className="px-3 py-0.5 text-xs font-medium rounded-md border bg-teal-500/20 text-teal-400 border-teal-500/30">
                    Paid
                  </span>
                }
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <SheetFooter className="px-5 pb-5 pt-2 flex-row gap-3">
          <button
            onClick={() => onOpenChange(false)}
            className="flex-1 py-2.5 rounded-lg border border-white/10 text-primary text-sm font-medium hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>
          <button className="flex-1 py-2.5 rounded-lg bg-custom-red text-white text-sm font-medium hover:bg-custom-red/80 transition-colors flex items-center justify-center gap-2">
            <Download className="w-4 h-4" />
            Download & Print
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

export default TransactionDetailsSheet;
