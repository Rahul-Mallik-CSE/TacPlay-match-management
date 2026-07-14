/** @format */

"use client";

import React from "react";
import InfoRow from "../shared/InfoRow";
import { useTranslation } from "react-i18next";

type FieldInfoSectionProps = {
  fieldInfo: {
    field_id: string;
    field_name: string;
    location: string;
    contact_number: string;
  };
};

const FieldInfoSection: React.FC<FieldInfoSectionProps> = ({ fieldInfo }) => {
  const { t } = useTranslation("dashboard");

  return (
    <div>
      <h3 className="text-lg font-semibold text-primary mb-3">
        {t("sessions.details.fieldInfo")}
      </h3>
      <div>
        <InfoRow label={t("sessions.details.fieldId")} value={fieldInfo.field_id} />
        <InfoRow label={t("sessions.details.fieldName")} value={fieldInfo.field_name} />
        <InfoRow label={t("sessions.details.location")} value={fieldInfo.location} />
        <InfoRow label={t("sessions.details.contactNumber")} value={fieldInfo.contact_number} />
      </div>
    </div>
  );
};

export default FieldInfoSection;
