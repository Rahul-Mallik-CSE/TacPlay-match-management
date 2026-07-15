/** @format */

"use client";

import React from "react";
import { Calendar, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import FormField from "../shared/FormField";
import CustomSelect from "../shared/CustomSelect";
import TimePicker from "../shared/TimePicker";
import type { EditSessionForm } from "../useSessionForm";

type DateTimeFieldsProps = {
  form: EditSessionForm;
  onFieldChange: <T extends keyof EditSessionForm>(key: T, value: EditSessionForm[T]) => void;
  durationDisplay: string;
  cutOffUnitOpen: boolean;
  onCutOffUnitToggle: () => void;
  selectOptions: {
    bookingCutOffUnit: readonly { label: string; value: string }[];
  };
  matchDateRef: React.RefObject<HTMLInputElement | null>;
};

const DateTimeFields: React.FC<DateTimeFieldsProps> = ({
  form,
  onFieldChange,
  durationDisplay,
  cutOffUnitOpen,
  onCutOffUnitToggle,
  selectOptions,
  matchDateRef,
}) => {
  const { t } = useTranslation("dashboard");

  return (
    <section className="space-y-4">
      <h2 className="text-base font-semibold text-primary">
        {t("sessions.create.dateTimeConfig")}
      </h2>

      <FormField label={t("sessions.create.matchDate")}>
        <div className="relative">
          <input
            ref={matchDateRef}
            type="date"
            className="form-input-style w-full pr-10 pl-1.5 py-1.5"
            value={form.match_date}
            onChange={(e) => onFieldChange("match_date", e.target.value)}
          />
          <button
            type="button"
            aria-label={t("sessions.create.openDatePicker")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary transition-colors pointer-events-none pr-9"
          >
            <Calendar className="w-4 h-4" />
          </button>
        </div>
      </FormField>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label={t("sessions.create.startTime")}>
          <TimePicker
            value={form.start_time}
            onChange={(v) => onFieldChange("start_time", v)}
          />
        </FormField>
        <FormField label={t("sessions.create.endTime")}>
          <TimePicker
            value={form.end_time}
            onChange={(v) => onFieldChange("end_time", v)}
          />
        </FormField>
      </div>

      <FormField label={t("sessions.create.duration")}>
        <div className="relative">
          <input type="text" value={durationDisplay} className="form-input-style w-full pr-10 pl-1.5 py-1.5" readOnly />
          <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
        </div>
      </FormField>

      <FormField label={t("sessions.create.bookingCutOffTime")}>
        <div className="flex gap-2">
          <input
            type="number"
            min={1}
            placeholder={t("sessions.create.enterCutOffValue")}
            className="form-input-style w-full flex-1"
            value={form.booking_cut_off_time}
            onChange={(e) => onFieldChange("booking_cut_off_time", e.target.value)}
          />
          <CustomSelect
            placeholder={t("sessions.create.unit")}
            options={selectOptions.bookingCutOffUnit}
            value={form.booking_cut_off_unit}
            open={cutOffUnitOpen}
            onToggle={onCutOffUnitToggle}
            onSelect={(v) => {
              onFieldChange("booking_cut_off_unit", v as EditSessionForm["booking_cut_off_unit"]);
            }}
            className="w-28"
          />
        </div>
      </FormField>
    </section>
  );
};

export default DateTimeFields;
