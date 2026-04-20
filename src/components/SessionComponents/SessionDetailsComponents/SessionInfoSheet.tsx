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
import { Button } from "@/components/ui/button";
import { useGetOwnerSessionInfoQuery } from "@/redux/features/sessions/sessionsAPI";
import SessionInfoSheetLoading from "@/components/SessionComponents/SessionDetailsComponents/SessionInfoSheetLoading";

interface SessionInfoSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sessionId: number | null;
}

const SessionInfoSheet: React.FC<SessionInfoSheetProps> = ({
  open,
  onOpenChange,
  sessionId,
}) => {
  const { data, isLoading, isFetching, isError } = useGetOwnerSessionInfoQuery(
    sessionId as number,
    {
      skip: !open || sessionId === null,
    },
  );

  const details = data?.data;

  if (!open) return null;

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
              className="cursor-pointer p-1 hover:bg-white/5 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-primary" />
            </button>
            <span
              className={`px-3 py-1 text-xs font-medium rounded-md border ${
                details?.status?.toLowerCase() === "open"
                  ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                  : "bg-secondary/20 text-secondary border-secondary/30"
              }`}
            >
              {details?.status_display ?? "Status"}
            </span>
          </div>
          <SheetTitle className="text-xl font-bold text-primary ">
            Session Information
          </SheetTitle>
          <SheetDescription className="text-sm text-secondary">
            View full session details and current actions.
          </SheetDescription>
        </SheetHeader>

        {isLoading || isFetching ? <SessionInfoSheetLoading /> : null}

        {isError ? (
          <div className="px-5 py-6 text-sm text-destructive">
            Failed to load session info.
          </div>
        ) : null}

        {details ? (
          <div className="px-5">
            <div>
              <h3 className="text-lg font-semibold text-primary mb-3">
                Field Info
              </h3>
              <div>
                <InfoRow label="Field ID" value={details.field_info.field_id} />
                <InfoRow
                  label="Field Name"
                  value={details.field_info.field_name}
                />
                <InfoRow label="Location" value={details.field_info.location} />
                <InfoRow
                  label="Contact Number"
                  value={details.field_info.contact_number}
                />
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-primary mb-3">
                Session Info
              </h3>
              <div>
                <InfoRow
                  label="Session ID"
                  value={details.session_info.session_id}
                />
                <InfoRow
                  label="Match Type"
                  value={
                    <span className="flex items-center gap-2 justify-end">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          details.session_info.match_type.toLowerCase() ===
                          "ranked"
                            ? "bg-custom-red"
                            : "bg-custom-yellow"
                        }`}
                      />
                      {details.session_info.match_type_display}
                    </span>
                  }
                />
                <InfoRow
                  label="Session Date"
                  value={details.session_info.session_date}
                />
                <InfoRow label="Time" value={details.session_info.time} />
                <InfoRow
                  label="Session Type"
                  value={details.session_info.session_type}
                />
                <InfoRow
                  label="Team"
                  value={details.session_info.team ?? "N/A"}
                />
                <InfoRow
                  label="Player Per Team"
                  value={details.session_info.player_per_team}
                />
                <InfoRow
                  label="Packages"
                  value={details.session_info.packages}
                />
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-primary mb-3">
                Team Info
              </h3>
              <div>
                <InfoRow
                  label="Team A Name"
                  value={details.team_info.team_a_name}
                />
                <InfoRow
                  label="Team A Score"
                  value={String(details.team_info.team_a_score)}
                />
                <InfoRow
                  label="Team B Name"
                  value={details.team_info.team_b_name}
                />
                <InfoRow
                  label="Team B Score"
                  value={String(details.team_info.team_b_score)}
                />
                <InfoRow label="Champion" value={details.team_info.champion} />
              </div>
            </div>
          </div>
        ) : null}

        {/* Footer Buttons */}
        <SheetFooter className="px-5 pb-5 pt-2 flex-row gap-3">
          <Button
            disabled={!details?.actions.can_cancel_match}
            className="flex-1 py-2.5 bg-transparent rounded-lg border border-white/10 text-primary text-sm font-medium hover:bg-white/5 transition-colors disabled:opacity-50"
          >
            Match Cancel
          </Button>
          <Button
            disabled={
              !details?.actions.can_start_match &&
              !details?.actions.can_submit_final_result
            }
            className="flex-1 disabled:opacity-50"
          >
            {details?.actions.primary_button ?? "Match Start"}
          </Button>
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
