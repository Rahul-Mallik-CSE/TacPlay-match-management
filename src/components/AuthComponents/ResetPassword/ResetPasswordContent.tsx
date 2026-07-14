/** @format */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import AuthCard from "@/components/AuthComponents/shared/AuthCard";
import AuthLogo from "@/components/AuthComponents/shared/AuthLogo";
import AuthPasswordField from "@/components/AuthComponents/shared/AuthPasswordField";
import AuthSubmitButton from "@/components/AuthComponents/shared/AuthSubmitButton";
import { useResetPasswordMutation } from "@/redux/features/auth/authAPI";
import { useAppDispatch } from "@/redux/hooks";
import { clearAuthSession } from "@/redux/features/auth/authSlice";
import { clearAuthTokens, getErrorMessage, getSuccessMessage } from "@/lib/auth";
import { useTranslation } from "react-i18next";

const ResetPasswordContent = () => {
  const { t } = useTranslation("dashboard");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      toast.error("Please fill in both password fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await resetPassword({
        new_password: newPassword,
        confirm_password: confirmPassword,
      }).unwrap();

      clearAuthTokens();
      dispatch(clearAuthSession());

      toast.success(
        getSuccessMessage(
          response,
          "Password reset successfully. Please sign in with your new password.",
        ),
      );
      router.push("/sign-in");
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to reset password"));
    }
  };

  return (
    <AuthCard>
      <div className="h-6 flex items-center justify-center">
        <AuthLogo className="mb-0" />
      </div>

      <div className="text-center space-y-2">
        <h1 className="text-xl sm:text-2xl font-bold text-primary">
          {t("auth.setNewPassword")}
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          {t("auth.resetPasswordDesc")}
        </p>
      </div>

      <div className="space-y-4">
        <AuthPasswordField
          label={t("auth.password")}
          value={newPassword}
          onChange={setNewPassword}
          placeholder={t("auth.placeholders.enterNewPassword")}
          autoComplete="new-password"
        />

        <AuthPasswordField
          label={t("auth.confirmPassword")}
          value={confirmPassword}
          onChange={setConfirmPassword}
          placeholder={t("auth.placeholders.reenterPassword")}
          autoComplete="new-password"
        />

        <div className="mt-2">
          <AuthSubmitButton
            label={t("auth.changePassword")}
            loadingLabel={t("auth.changing")}
            isLoading={isLoading}
            type="button"
            onClick={handleResetPassword}
          />
        </div>
      </div>

      <p className="text-sm text-center text-muted-foreground">
        {t("auth.confirmedPassGoTo")}{" "}
        <Link
          href="/sign-in"
          className="text-primary font-semibold underline underline-offset-2 hover:text-custom-yellow transition-colors"
        >
          {t("auth.signInPageQuestion")}
        </Link>
      </p>
    </AuthCard>
  );
};

export default ResetPasswordContent;
