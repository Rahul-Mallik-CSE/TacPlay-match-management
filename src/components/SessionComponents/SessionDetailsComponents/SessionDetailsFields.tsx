/** @format */

"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import FormField from "../shared/FormField";
import CustomSelect from "../shared/CustomSelect";
import type { EditSessionForm } from "../useSessionForm";

type SessionDetailsFieldsProps = {
  form: EditSessionForm;
  onFieldChange: <T extends keyof EditSessionForm>(key: T, value: EditSessionForm[T]) => void;
  matchTypeOpen: boolean;
  onMatchTypeToggle: () => void;
  visibilityOpen: boolean;
  onVisibilityToggle: () => void;
  selectOptions: {
    matchType: readonly { label: string; value: string }[];
    sessionVisibility: readonly { label: string; value: string }[];
  };
};

const SessionDetailsFields: React.FC<SessionDetailsFieldsProps> = ({
  form,
  onFieldChange,
  matchTypeOpen,
  onMatchTypeToggle,
  visibilityOpen,
  onVisibilityToggle,
  selectOptions,
}) => {
  const { t } = useTranslation("dashboard");

  return (
    <section className="space-y-4">
      <h2 className="text-base font-semibold text-primary">
        {t("sessions.create.sessionDetails")}
      </h2>

      <FormField label={t("sessions.create.sessionName")}>
        <input
          type="text"
          placeholder={t("sessions.create.enterSessionName")}
          className="form-input-style"
          value={form.session_name}
          onChange={(e) => onFieldChange("session_name", e.target.value)}
        />
      </FormField>

      <FormField label={t("sessions.create.matchType")}>
        <CustomSelect
          placeholder={t("sessions.create.selectMatchType")}
          options={selectOptions.matchType}
          value={form.match_type}
          open={matchTypeOpen}
          onToggle={onMatchTypeToggle}
          onSelect={(v) => {
            onFieldChange("match_type", v as EditSessionForm["match_type"]);
          }}
        />
      </FormField>

      <FormField label={t("sessions.create.sessionVisibility")}>
        <CustomSelect
          placeholder={t("sessions.create.selectVisibility")}
          options={selectOptions.sessionVisibility}
          value={form.session_visibility}
          open={visibilityOpen}
          onToggle={onVisibilityToggle}
          onSelect={(v) => {
            onFieldChange("session_visibility", v as EditSessionForm["session_visibility"]);
          }}
        />
      </FormField>

      <FormField label={t("sessions.create.description")}>
        <textarea
          rows={4}
          placeholder={t("sessions.create.enterDescription")}
          className="form-input-style resize-none min-h-24"
          value={form.description}
          onChange={(e) => onFieldChange("description", e.target.value)}
        />
      </FormField>
    </section>
  );
};

export default SessionDetailsFields;
