/** @format */

"use client";

import React, { useState } from "react";
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
import {
  useCancelOwnerSessionMatchMutation,
  useGetOwnerSessionInfoQuery,
  useStartOwnerSessionMatchMutation,
  useSubmitOwnerSessionResultMutation,
} from "@/redux/features/sessions/sessionsAPI";
import SessionInfoSheetLoading from "./SessionInfoSheetLoading";
import FieldInfoSection from "./FieldInfoSection";
import SessionInfoContent from "./SessionInfoContent";
import TeamInfoSection from "./TeamInfoSection";
import ResultSelector from "./ResultSelector";
import { toast } from "react-toastify";
import { getErrorMessage, getSuccessMessage } from "@/lib/auth";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation("dashboard");
  const [teamAResult, setTeamAResult] = useState<"win" | "loss" | "draw">("win");

  const getStatusDisplay = (status: string) => {
    const lower = status?.toLowerCase();
    if (lower === "open") return t("sessions.filters.open");
    if (lower === "ongoing") return t("sessions.filters.ongoing");
    if (lower === "completed" || lower === "complete") return t("sessions.filters.completed");
    if (lower === "cancelled" || lower === "canceled") return t("sessions.filters.cancelled");
    return status;
  };

  const { data, isLoading, isFetching, isError } = useGetOwnerSessionInfoQuery(
    sessionId as number,
    { skip: !open || sessionId === null },
  );

  const [startMatch, { isLoading: isStartingMatch }] = useStartOwnerSessionMatchMutation();
  const [cancelMatch, { isLoading: isCancellingMatch }] = useCancelOwnerSessionMatchMutation();
  const [submitResult, { isLoading: isSubmittingResult }] = useSubmitOwnerSessionResultMutation();

  const details = data?.data;
  const currentStatus = details?.status?.toLowerCase();
  const isOpenStatus = currentStatus === "open";
  const isOngoingStatus = currentStatus === "ongoing";
  const isCompletedOrCancelled =
    currentStatus === "completed" ||
    currentStatus === "complete" ||
    currentStatus === "cancelled" ||
    currentStatus === "canceled";

  const teamBResult: "win" | "loss" | "draw" =
    teamAResult === "draw" ? "draw" : teamAResult === "win" ? "loss" : "win";

  const updateFromTeamA = (result: "win" | "loss" | "draw") => setTeamAResult(result);
  const updateFromTeamB = (result: "win" | "loss" | "draw") => {
    if (result === "draw") { setTeamAResult("draw"); return; }
    setTeamAResult(result === "win" ? "loss" : "win");
  };

  const handleStartMatch = async () => {
    if (!sessionId) return;
    try {
      const response = await startMatch(sessionId).unwrap();
      toast.success(getSuccessMessage(response, t("sessions.details.startedSuccess")));
    } catch (error) {
      toast.error(getErrorMessage(error, t("sessions.details.startedFailed")));
    }
  };

  const handleCancelMatch = async () => {
    if (!sessionId) return;
    try {
      const response = await cancelMatch(sessionId).unwrap();
      toast.success(getSuccessMessage(response, t("sessions.details.cancelledSuccess")));
    } catch (error) {
      toast.error(getErrorMessage(error, t("sessions.details.cancelledFailed")));
    }
  };

  const handleSubmitTeamResult = async () => {
    if (!sessionId) return;
    try {
      const response = await submitResult({
        sessionId,
        payload: { team_a_result: teamAResult, team_b_result: teamBResult },
      }).unwrap();
      toast.success(getSuccessMessage(response, t("sessions.details.resultSuccess")));
    } catch (error) {
      toast.error(getErrorMessage(error, t("sessions.details.resultFailed")));
    }
  };

  if (!open) return null;

  return (
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
            <span
              className={`px-3 py-1 text-xs font-medium rounded-md border ${
                details?.status?.toLowerCase() === "open"
                  ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                  : "bg-secondary/20 text-secondary border-secondary/30"
              }`}
            >
              {details?.status ? getStatusDisplay(details.status) : t("common.status")}
            </span>
          </div>
          <SheetTitle className="text-xl font-bold text-primary">
            {t("sessions.details.viewInfo")}
          </SheetTitle>
          <SheetDescription className="text-sm text-secondary">
            {t("sessions.details.title")}
          </SheetDescription>
        </SheetHeader>

        {isLoading || isFetching ? <SessionInfoSheetLoading /> : null}

        {isError ? (
          <div className="px-5 py-6 text-sm text-destructive">
            {t("sessions.details.loadFailed")}
          </div>
        ) : null}

        {details ? (
          <div className="px-5">
            <FieldInfoSection fieldInfo={details.field_info} />
            <SessionInfoContent sessionInfo={details.session_info} />
            <TeamInfoSection teamInfo={details.team_info} />
          </div>
        ) : null}

        {details && isOngoingStatus ? (
          <div className="px-5 pt-2 space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-primary">{t("sessions.details.teamResult")}</p>
              <div className="grid grid-cols-2 gap-3">
                <ResultSelector
                  title={details.team_info.team_a_name}
                  value={teamAResult}
                  onChange={updateFromTeamA}
                />
                <ResultSelector
                  title={details.team_info.team_b_name}
                  value={teamBResult}
                  onChange={updateFromTeamB}
                />
              </div>
            </div>
          </div>
        ) : null}

        {details && !isCompletedOrCancelled ? (
          <SheetFooter className="px-5 pb-5 pt-2 flex-row gap-3">
            {isOpenStatus ? (
              <>
                <Button
                  onClick={handleCancelMatch}
                  disabled={!details.actions.can_cancel_match || isCancellingMatch}
                  className="flex-1 py-2.5 bg-transparent rounded-lg border border-white/10 text-primary text-sm font-medium hover:bg-white/5 transition-colors disabled:opacity-50"
                >
                  {isCancellingMatch ? `${t("common.loading")}` : t("sessions.details.matchCancel")}
                </Button>
                <Button
                  onClick={handleStartMatch}
                  disabled={!details.actions.can_start_match || isStartingMatch}
                  className="flex-1 disabled:opacity-50"
                >
                  {isStartingMatch
                    ? `${t("common.loading")}`
                    : (details.actions.primary_button === "Match Start"
                        ? t("sessions.details.matchStart")
                        : (details.actions.primary_button ?? t("sessions.details.matchStart")))}
                </Button>
              </>
            ) : null}

            {isOngoingStatus ? (
              <Button
                onClick={handleSubmitTeamResult}
                disabled={!details.actions.can_submit_final_result || isSubmittingResult}
                className="w-full disabled:opacity-50"
              >
                {isSubmittingResult ? `${t("common.loading")}` : t("sessions.details.submitResult")}
              </Button>
            ) : null}
          </SheetFooter>
        ) : null}
      </SheetContent>
    </Sheet>
  );
};

export default SessionInfoSheet;
