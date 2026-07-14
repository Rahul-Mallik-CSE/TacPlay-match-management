/** @format */

"use client";

import React, { useMemo, useState } from "react";
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
import { useTranslation } from "react-i18next";
import SessionInfoSheetLoading from "./SessionInfoSheetLoading";
import { useSessionForm } from "../useSessionForm";
import SessionDetailsFields from "./SessionDetailsFields";
import DateTimeFields from "./DateTimeFields";
import TeamsCapacityFields from "./TeamsCapacityFields";
import PricingFields from "./PricingFields";

interface EditSessionSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sessionId: number | null;
}

const openNativePicker = (inputRef: React.RefObject<HTMLInputElement | null>) => {
  const input = inputRef.current;
  if (!input) return;
  const pickerInput = input as HTMLInputElement & { showPicker?: () => void };
  if (typeof pickerInput.showPicker === "function") {
    pickerInput.showPicker();
    return;
  }
  input.focus();
  input.click();
};

const EditSessionSheet: React.FC<EditSessionSheetProps> = ({
  open,
  onOpenChange,
  sessionId,
}) => {
  const { t } = useTranslation("dashboard");

  const {
    form,
    details,
    isLoading,
    isUpdating,
    teamALogo,
    teamBLogo,
    teamALogoPreview,
    teamBLogoPreview,
    teamARef,
    teamBRef,
    matchDateRef,
    startTimeRef,
    endTimeRef,
    durationDisplay,
    handleFieldChange,
    handleTeamAUpload,
    handleTeamBUpload,
    handleSubmit,
  } = useSessionForm(sessionId, open, onOpenChange);

  const [sessionTypeOpen, setSessionTypeOpen] = useState(false);
  const [matchTypeOpen, setMatchTypeOpen] = useState(false);
  const [visibilityOpen, setVisibilityOpen] = useState(false);
  const [cutOffUnitOpen, setCutOffUnitOpen] = useState(false);

  const selectOptions = useMemo(
    () =>
      ({
        matchType: [
          { label: t("sessions.create.options.ranked"), value: "ranked" },
          { label: t("sessions.create.options.social"), value: "social" },
        ],
        sessionVisibility: [
          { label: t("sessions.create.options.premium"), value: "premium" },
          { label: t("sessions.create.options.public"), value: "public" },
          { label: t("sessions.create.options.private"), value: "private" },
        ],
        bookingCutOffUnit: [
          { label: t("sessions.create.options.hours"), value: "hours" },
          { label: t("sessions.create.options.minutes"), value: "minutes" },
          { label: t("sessions.create.options.days"), value: "days" },
        ],
        sessionType: [
          { label: t("sessions.create.options.team"), value: "teams" },
          { label: t("sessions.create.options.individualPlayer"), value: "manual_player" },
        ],
      }) as const,
    [t],
  );

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
            {details?.status && (
              <span className="px-3 py-1 text-xs font-medium rounded-md border bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                {details.status_display || details.status}
              </span>
            )}
          </div>
          <SheetTitle className="text-xl font-bold text-primary">
            {t("sessions.details.editSession")}
          </SheetTitle>
          <SheetDescription className="text-sm text-secondary">
            {t("sessions.create.subtitle")}
          </SheetDescription>
        </SheetHeader>

        {isLoading ? (
          <div className="px-5 py-6">
            <SessionInfoSheetLoading />
          </div>
        ) : null}

        {!isLoading && details ? (
          <form className="space-y-6 px-5 py-6" onSubmit={handleSubmit}>
            <SessionDetailsFields
              form={form}
              onFieldChange={handleFieldChange}
              matchTypeOpen={matchTypeOpen}
              onMatchTypeToggle={() => setMatchTypeOpen(!matchTypeOpen)}
              visibilityOpen={visibilityOpen}
              onVisibilityToggle={() => setVisibilityOpen(!visibilityOpen)}
              selectOptions={selectOptions}
            />

            <DateTimeFields
              form={form}
              onFieldChange={handleFieldChange}
              durationDisplay={durationDisplay}
              cutOffUnitOpen={cutOffUnitOpen}
              onCutOffUnitToggle={() => setCutOffUnitOpen(!cutOffUnitOpen)}
              selectOptions={selectOptions}
              matchDateRef={matchDateRef}
              startTimeRef={startTimeRef}
              endTimeRef={endTimeRef}
              onOpenNativePicker={openNativePicker}
            />

            <TeamsCapacityFields
              form={form}
              onFieldChange={handleFieldChange}
              sessionTypeOpen={sessionTypeOpen}
              onSessionTypeToggle={() => setSessionTypeOpen(!sessionTypeOpen)}
              selectOptions={selectOptions}
              teamARef={teamARef}
              teamBRef={teamBRef}
              teamALogo={teamALogo}
              teamBLogo={teamBLogo}
              teamALogoPreview={teamALogoPreview}
              teamBLogoPreview={teamBLogoPreview}
              onTeamAUpload={handleTeamAUpload}
              onTeamBUpload={handleTeamBUpload}
            />

            <PricingFields form={form} onFieldChange={handleFieldChange} />

            <SheetFooter className="flex items-center gap-3 pt-4 border-t border-white/5">
              <Button
                type="button"
                onClick={() => onOpenChange(false)}
                className="flex-1 cursor-pointer bg-transparent border border-white/10 text-primary text-sm font-medium hover:bg-white/5 transition-colors py-2.5"
              >
                {t("common.cancel")}
              </Button>
              <Button type="submit" disabled={isUpdating} className="flex-1 py-2.5">
                {isUpdating ? t("sessions.details.editing") : t("common.saveChanges")}
              </Button>
            </SheetFooter>
          </form>
        ) : null}
      </SheetContent>

      <style jsx>{`
        .form-input-style {
          width: 100%;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.5rem;
          padding: 0.625rem 0.875rem;
          font-size: 0.875rem;
          color: var(--primary);
          outline: none;
          transition: border-color 0.2s;
        }
        .form-input-style::placeholder {
          color: var(--secondary);
          opacity: 0.6;
        }
        .form-input-style:focus {
          border-color: rgba(152, 0, 9, 0.5);
        }
        .form-input-style[type="date"],
        .form-input-style[type="time"] {
          color-scheme: dark;
        }
        .form-input-style[type="date"]::-webkit-calendar-picker-indicator,
        .form-input-style[type="time"]::-webkit-calendar-picker-indicator {
          opacity: 0;
          cursor: pointer;
        }
      `}</style>
    </Sheet>
  );
};

export default EditSessionSheet;
