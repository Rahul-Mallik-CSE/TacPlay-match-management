/** @format */

"use client";

import React from "react";
import { Upload } from "lucide-react";
import { useTranslation } from "react-i18next";
import FormField from "../shared/FormField";
import CustomSelect from "../shared/CustomSelect";
import FileUploadStatus from "../shared/FileUploadStatus";
import type { EditSessionForm } from "../useSessionForm";

type TeamsCapacityFieldsProps = {
  form: EditSessionForm;
  onFieldChange: <T extends keyof EditSessionForm>(key: T, value: EditSessionForm[T]) => void;
  sessionTypeOpen: boolean;
  onSessionTypeToggle: () => void;
  selectOptions: {
    sessionType: readonly { label: string; value: string }[];
  };
  teamARef: React.RefObject<HTMLInputElement | null>;
  teamBRef: React.RefObject<HTMLInputElement | null>;
  teamALogo: File | null;
  teamBLogo: File | null;
  teamALogoPreview: string | null;
  teamBLogoPreview: string | null;
  onTeamAUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTeamBUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const TeamsCapacityFields: React.FC<TeamsCapacityFieldsProps> = ({
  form,
  onFieldChange,
  sessionTypeOpen,
  onSessionTypeToggle,
  selectOptions,
  teamARef,
  teamBRef,
  teamALogo,
  teamBLogo,
  teamALogoPreview,
  teamBLogoPreview,
  onTeamAUpload,
  onTeamBUpload,
}) => {
  const { t } = useTranslation("dashboard");

  return (
    <section className="space-y-4">
      <h2 className="text-base font-semibold text-primary">
        {t("sessions.create.teamsCapacity")}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label={t("sessions.create.teamAPlayer")}>
          <input
            type="number"
            min={1}
            placeholder={t("sessions.create.enterTeamAPlayers")}
            className="form-input-style"
            value={form.team_a_player}
            onChange={(e) => onFieldChange("team_a_player", e.target.value)}
          />
        </FormField>
        <FormField label={t("sessions.create.teamBPlayer")}>
          <input
            type="number"
            min={1}
            placeholder={t("sessions.create.enterTeamBPlayers")}
            className="form-input-style"
            value={form.team_b_player}
            onChange={(e) => onFieldChange("team_b_player", e.target.value)}
          />
        </FormField>
      </div>

      <FormField label={t("sessions.create.sessionType")}>
        <CustomSelect
          placeholder={t("sessions.create.selectTeamMode")}
          options={selectOptions.sessionType}
          value={form.session_type}
          open={sessionTypeOpen}
          onToggle={onSessionTypeToggle}
          onSelect={(v) => {
            onFieldChange("session_type", v as EditSessionForm["session_type"]);
          }}
        />
      </FormField>

      {form.session_type === "manual_player" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label={t("sessions.create.teamAName")}>
              <input
                type="text"
                placeholder={t("sessions.create.enterTeamAName")}
                className="form-input-style"
                value={form.team_a_name}
                onChange={(e) => onFieldChange("team_a_name", e.target.value)}
              />
            </FormField>
            <FormField label={t("sessions.create.teamBName")}>
              <input
                type="text"
                placeholder={t("sessions.create.enterTeamBName")}
                className="form-input-style"
                value={form.team_b_name}
                onChange={(e) => onFieldChange("team_b_name", e.target.value)}
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label={t("sessions.create.teamALogo")}>
              <div className="space-y-3">
                <div
                  onClick={() => teamARef.current?.click()}
                  className="border border-dashed border-white/10 rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer hover:border-white/20 transition-colors"
                >
                  {teamALogoPreview ? (
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <img src={teamALogoPreview} alt="Team A Logo" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <Upload className="w-6 h-6 text-secondary" />
                  )}
                  <p className="text-[10px] text-secondary text-center">
                    {t("sessions.create.uploadInstructions")}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => teamARef.current?.click()}
                  className="w-full px-3 py-1.5 text-xs font-medium bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 rounded-md hover:bg-emerald-600/30 transition-colors"
                >
                  {t("sessions.create.uploadLogo")}
                </button>
                <input type="file" ref={teamARef} className="hidden" accept="image/*" onChange={onTeamAUpload} />
                {teamALogo && <FileUploadStatus fileName={teamALogo.name} size={teamALogo.size} t={t} />}
              </div>
            </FormField>

            <FormField label={t("sessions.create.teamBLogo")}>
              <div className="space-y-3">
                <div
                  onClick={() => teamBRef.current?.click()}
                  className="border border-dashed border-white/10 rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer hover:border-white/20 transition-colors"
                >
                  {teamBLogoPreview ? (
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <img src={teamBLogoPreview} alt="Team B Logo" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <Upload className="w-6 h-6 text-secondary" />
                  )}
                  <p className="text-[10px] text-secondary text-center">
                    {t("sessions.create.uploadInstructions")}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => teamBRef.current?.click()}
                  className="w-full px-3 py-1.5 text-xs font-medium bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 rounded-md hover:bg-emerald-600/30 transition-colors"
                >
                  {t("sessions.create.uploadLogo")}
                </button>
                <input type="file" ref={teamBRef} className="hidden" accept="image/*" onChange={onTeamBUpload} />
                {teamBLogo && <FileUploadStatus fileName={teamBLogo.name} size={teamBLogo.size} t={t} />}
              </div>
            </FormField>
          </div>
        </>
      )}
    </section>
  );
};

export default TeamsCapacityFields;
