/** @format */

"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

type ResultSelectorProps = {
  title: string;
  value: "win" | "loss" | "draw";
  onChange: (value: "win" | "loss" | "draw") => void;
};

const ResultSelector: React.FC<ResultSelectorProps> = ({
  title,
  value,
  onChange,
}) => {
  const { t } = useTranslation("dashboard");
  const options: Array<"win" | "loss" | "draw"> = ["win", "loss", "draw"];

  return (
    <div className="bg-[#0c0a0c] border border-white/5 rounded-xl p-2 space-y-2">
      <p className="text-xs text-secondary">{title}</p>
      <div className="flex gap-1">
        {options.map((option) => (
          <button
            key={`${title}-${option}`}
            onClick={() => onChange(option)}
            className={cn(
              "flex-1 py-1.5 cursor-pointer text-xs font-semibold rounded-md transition-all",
              value === option
                ? "bg-[#e2b83b] text-black shadow-md"
                : "text-secondary hover:text-white",
            )}
          >
            {option === "win"
              ? t("sessions.details.win")
              : option === "loss"
                ? t("sessions.details.loss")
                : t("sessions.details.draw")}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ResultSelector;
