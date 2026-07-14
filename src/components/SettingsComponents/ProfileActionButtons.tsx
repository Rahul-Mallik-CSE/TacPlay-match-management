/** @format */

"use client";

import React from "react";
import { Pen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

type ProfileActionButtonsProps = {
  onChangePassword: () => void;
  onEditProfile: () => void;
};

const ProfileActionButtons: React.FC<ProfileActionButtonsProps> = ({
  onChangePassword,
  onEditProfile,
}) => {
  const { t } = useTranslation("dashboard");

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Button
        onClick={onChangePassword}
        className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border bg-transparent border-white/10 text-sm text-primary font-medium hover:bg-white/5 transition-colors"
      >
        {t("settingsPage.passwordChange")}
      </Button>
      <Button
        onClick={onEditProfile}
        className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg"
      >
        <Pen className="w-4 h-4" />
        {t("settingsPage.editProfile")}
      </Button>
    </div>
  );
};

export default ProfileActionButtons;
