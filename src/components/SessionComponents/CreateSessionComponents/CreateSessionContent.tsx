/** @format */

"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import CreateSessionHeader from "@/components/SessionComponents/CreateSessionComponents/CreateSessionHeader";
import { useCreateSessionForm } from "@/components/SessionComponents/CreateSessionComponents/useCreateSessionForm";
import SessionDetailsFields from "@/components/SessionComponents/SessionDetailsComponents/SessionDetailsFields";
import DateTimeFields from "@/components/SessionComponents/SessionDetailsComponents/DateTimeFields";
import TeamsCapacityFields from "@/components/SessionComponents/SessionDetailsComponents/TeamsCapacityFields";
import PricingFields from "@/components/SessionComponents/SessionDetailsComponents/PricingFields";

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

const CreateSessionContent = () => {
  const { t } = useTranslation("dashboard");

  const {
    form,
    isCreating,
    teamALogo,
    teamBLogo,
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
  } = useCreateSessionForm();

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

  return (
    <div className="w-full p-3 md:p-4">
      <div className="max-w-625 mx-auto space-y-4 md:space-y-6">
        <CreateSessionHeader />

        <form className="space-y-8" onSubmit={handleSubmit}>
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
            teamALogoPreview={null}
            teamBLogoPreview={null}
            onTeamAUpload={handleTeamAUpload}
            onTeamBUpload={handleTeamBUpload}
          />

          <PricingFields form={form} onFieldChange={handleFieldChange} />

          <div className="flex items-center justify-center gap-4 pt-4 pb-8">
            <Link href="/sessions">
              <Button
                type="button"
                className="cursor-pointer bg-transparent px-10 py-2.5 rounded-lg border border-white/10 text-primary text-sm font-medium hover:bg-white/5 transition-colors"
              >
                {t("sessions.create.cancel")}
              </Button>
            </Link>
            <Button type="submit" disabled={isCreating}>
              {isCreating ? t("sessions.create.creating") : t("sessions.create.createSession")}
            </Button>
          </div>
        </form>
      </div>

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
    </div>
  );
};

export default CreateSessionContent;
