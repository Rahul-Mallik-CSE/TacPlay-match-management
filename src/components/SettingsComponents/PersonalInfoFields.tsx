/** @format */

"use client";

import React from "react";
import { useTranslation } from "react-i18next";

type PersonalInfoFieldsProps = {
  fullName: string;
  email: string;
  password: string;
  contactNumber: string;
  showPassword: boolean;
  onTogglePassword: () => void;
};

const PersonalInfoFields: React.FC<PersonalInfoFieldsProps> = ({
  fullName,
  email,
  password,
  contactNumber,
  showPassword,
  onTogglePassword,
}) => {
  const { t } = useTranslation("dashboard");

  return (
    <div>
      <h3 className="text-lg font-semibold text-primary mb-5">
        {t("settingsPage.personalInfo")}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label className="text-sm text-secondary">
            {t("settingsPage.fullName")}
          </label>
          <input
            type="text"
            readOnly
            value={fullName}
            className="w-full px-4 py-2.5 rounded-lg bg-muted border border-white/10 text-sm text-primary cursor-default focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-secondary">
            {t("settingsPage.email")}
          </label>
          <input
            type="email"
            readOnly
            value={email}
            className="w-full px-4 py-2.5 rounded-lg bg-muted border border-white/10 text-sm text-primary cursor-default focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-secondary">
            {t("settingsPage.password")}
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              readOnly
              value={password}
              className="w-full px-4 py-2.5 pr-10 rounded-lg bg-muted border border-white/10 text-sm text-primary cursor-default focus:outline-none"
            />
            <button
              type="button"
              onClick={onTogglePassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {showPassword ? (
                  <>
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </>
                ) : (
                  <>
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-secondary">
            {t("settingsPage.contactNumber")}
          </label>
          <input
            type="number"
            readOnly
            value={contactNumber}
            className="w-full px-4 py-2.5 rounded-lg bg-muted border border-white/10 text-sm text-primary cursor-default focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoFields;
