/** @format */

"use client";

import React from "react";
import { useTranslation } from "react-i18next";

type SettingsPageHeaderProps = {
  title?: string;
  subtitle?: string;
};

const SettingsPageHeader: React.FC<SettingsPageHeaderProps> = ({
  title,
  subtitle,
}) => {
  const { t } = useTranslation("dashboard");

  return (
    <div className="mb-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-primary">
        {title ?? t("settingsPage.title")}
      </h1>
      <p className="text-sm text-secondary mt-1">
        {subtitle ?? t("settingsPage.subtitle")}
      </p>
    </div>
  );
};

export default SettingsPageHeader;
