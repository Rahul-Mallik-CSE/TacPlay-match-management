/** @format */

"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import FormField from "../shared/FormField";
import type { EditSessionForm } from "../useSessionForm";

type PricingFieldsProps = {
  form: EditSessionForm;
  onFieldChange: <T extends keyof EditSessionForm>(key: T, value: EditSessionForm[T]) => void;
};

const PricingFields: React.FC<PricingFieldsProps> = ({ form, onFieldChange }) => {
  const { t } = useTranslation("dashboard");

  return (
    <section className="space-y-4">
      <h2 className="text-base font-semibold text-primary">
        {t("sessions.create.pricingPayment")}
      </h2>

      <FormField label={t("sessions.create.entryFee")}>
        <input
          type="number"
          min={0}
          placeholder={t("sessions.create.enterEntryFee")}
          className="form-input-style w-full p-1.5"
          value={form.entry_fee}
          onChange={(e) => onFieldChange("entry_fee", e.target.value)}
        />
      </FormField>
    </section>
  );
};

export default PricingFields;
