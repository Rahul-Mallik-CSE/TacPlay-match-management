/** @format */

"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { ArrowLeft } from "lucide-react";

interface SessionInfoSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SessionInfoSheet: React.FC<SessionInfoSheetProps> = ({
  open,
  onOpenChange,
}) => {
  return (
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
            <span className="px-3 py-1 text-xs font-medium rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Open
            </span>
          </div>
          <SheetTitle className="text-2xl font-bold text-primary mt-3">
            Session Information&apos;s
          </SheetTitle>
          <SheetDescription className="text-sm text-secondary">
            View full booking information and transaction.
          </SheetDescription>
        </SheetHeader>

        <div className="px-5 pb-5 space-y-6 mt-4">
          {/* Field Info */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-3">
              Field Info
            </h3>
            <div className="space-y-3">
              <InfoRow label="Field ID" value="#CN 256" />
              <InfoRow label="Field Name" value="Imrul Hossain" />
              <InfoRow
                label="Location"
                value="Flat 4B, 27 Maple Grove, Birmingham, West Midlands, United State"
              />
              <InfoRow label="Contact Number" value="+26 256 2564" />
            </div>
          </div>

          {/* Session Info */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-3">
              Session Info
            </h3>
            <div className="space-y-3">
              <InfoRow label="Session ID" value="#CN 256" />
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
              <InfoRow label="Session Type" value="Team" />
              <InfoRow label="Team" value="2" />
              <InfoRow label="Player Per Team" value="8/8" />
              <InfoRow label="Packages" value="Silver Premium" />
            </div>
          </div>

          {/* Team Info */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-3">
              Team Info
            </h3>
            <div className="space-y-3">
              <InfoRow label="Team A Name" value="Red Bull Squad" />
              <InfoRow
                label="Team A Score"
                value={<span className="text-secondary">---</span>}
              />
              <InfoRow label="Team B Name" value="Snack Green Squad" />
              <InfoRow
                label="Team B Score"
                value={<span className="text-secondary">---</span>}
              />
              <InfoRow
                label="Champion"
                value={<span className="text-secondary">---</span>}
              />
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <SheetFooter className="px-5 pb-5 pt-2 flex-row gap-3">
          <button className="flex-1 py-2.5 rounded-lg border border-white/10 text-primary text-sm font-medium hover:bg-white/5 transition-colors">
            Match Cancel
          </button>
          <button className="flex-1 py-2.5 rounded-lg bg-custom-red text-white text-sm font-medium hover:bg-custom-red/80 transition-colors">
            Match Start
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

export default SessionInfoSheet;
