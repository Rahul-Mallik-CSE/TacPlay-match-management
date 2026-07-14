/** @format */

"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const CreateSessionHeader: React.FC = () => {
  const { t } = useTranslation("dashboard");

  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <Link href="/sessions">
          <button className="cursor-pointer p-1.5 hover:bg-white/5 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-primary" />
          </button>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-primary">
          {t("sessions.create.title")}
        </h1>
      </div>
      <p className="text-sm text-secondary ml-10">
        {t("sessions.create.subtitle")}
      </p>
    </div>
  );
};

export default CreateSessionHeader;
