/** @format */

"use client";

import React, { useState } from "react";
import { AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useChangeFieldOwnerPasswordMutation } from "@/redux/features/settings/settingsAPI";
import { toast } from "react-toastify";
import { getErrorMessage, getSuccessMessage } from "@/lib/auth";
import { useTranslation } from "react-i18next";
import PasswordField from "./shared/PasswordField";

interface ChangePasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ChangePasswordDialog: React.FC<ChangePasswordDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const { t } = useTranslation("dashboard");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [changePassword, { isLoading: isChangingPassword }] =
    useChangeFieldOwnerPasswordMutation();

  const resetForm = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setError("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError(t("changePassword.allRequired"));
      return;
    }
    if (newPassword.length < 8) {
      setError(t("changePassword.minLength"));
      return;
    }
    if (newPassword !== confirmPassword) {
      setError(t("changePassword.mismatch"));
      return;
    }

    setError("");

    try {
      const response = await changePassword({
        current_password: currentPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      }).unwrap();

      toast.success(getSuccessMessage(response, t("changePassword.changed")));
      onOpenChange(false);
      resetForm();
    } catch (apiError) {
      const message = getErrorMessage(apiError, t("changePassword.failed"));
      setError(message);
      toast.error(message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="bg-card border border-white/10 max-w-sm"
      >
        <DialogHeader className="items-center">
          <DialogTitle className="text-xl font-bold text-primary">
            {t("changePassword.title")}
          </DialogTitle>
          <DialogDescription className="text-sm text-secondary text-center">
            {t("changePassword.subtitle")}
          </DialogDescription>
        </DialogHeader>

        <form className="flex flex-col gap-4 mt-2" onSubmit={handleSubmit}>
          <PasswordField
            label={t("changePassword.current")}
            value={currentPassword}
            onChange={setCurrentPassword}
            placeholder={t("changePassword.placeholderCurrent")}
          />

          <PasswordField
            label={t("changePassword.new")}
            value={newPassword}
            onChange={setNewPassword}
            placeholder={t("changePassword.placeholderNew")}
            hint={t("changePassword.hint")}
          />

          <PasswordField
            label={t("changePassword.confirm")}
            value={confirmPassword}
            onChange={setConfirmPassword}
            placeholder={t("changePassword.placeholderConfirm")}
          />

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-custom-red/10 border border-custom-red/20">
              <AlertCircle className="w-4 h-4 text-custom-red shrink-0" />
              <p className="text-xs text-red-400">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            disabled={isChangingPassword}
            className="w-full py-2.5 rounded-lg bg-custom-red text-white text-sm font-medium hover:bg-custom-red/80 transition-colors mt-1"
          >
            {isChangingPassword
              ? t("changePassword.changing")
              : t("changePassword.change")}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordDialog;
