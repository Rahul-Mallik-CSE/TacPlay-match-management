/** @format */

import React from "react";
import { Lock, Crown } from "lucide-react";
import { useTranslation } from "react-i18next";

type FeatureLockOverlayProps = {
  title: string;
  description: string;
  onUpgradeClick?: () => void;
};

const FeatureLockOverlay: React.FC<FeatureLockOverlayProps> = ({
  title,
  description,
  onUpgradeClick,
}) => {
  const { t } = useTranslation("dashboard");

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0b0b0f]/50 backdrop-blur-[1.5px] rounded-xl p-6 text-center z-10 transition-all duration-300">
      <div className="w-12 h-12 rounded-full bg-custom-red/10 border border-custom-red/20 flex items-center justify-center mb-3 shadow-[0_0_15px_rgba(152,0,9,0.2)] animate-pulse">
        <Lock className="w-5 h-5 text-custom-red" />
      </div>
      <h4 className="text-base font-semibold text-primary mb-1">{title}</h4>
      <p className="text-xs text-secondary max-w-[320px] mb-4 leading-relaxed">
        {description}
      </p>
      <button
        onClick={onUpgradeClick}
        className="flex items-center gap-1.5 bg-linear-to-r from-[#980009] via-[#C00069] to-[#980009] text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:opacity-90 transition-opacity shadow-[0_0_10px_rgba(192,0,105,0.4)] cursor-pointer"
      >
        <Crown className="w-3.5 h-3.5 text-[#cdba20]" />
        {t("sidebar.upgrade", "Upgrade")}
      </button>
    </div>
  );
};

export default FeatureLockOverlay;
