/** @format */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import AuthCard from "@/components/AuthComponents/shared/AuthCard";
import AuthLogo from "@/components/AuthComponents/shared/AuthLogo";
import AuthSubmitButton from "@/components/AuthComponents/shared/AuthSubmitButton";
import { useForgotPasswordMutation } from "@/redux/features/auth/authAPI";
import { useAppDispatch } from "@/redux/hooks";
import { setPendingVerification } from "@/redux/features/auth/authSlice";
import { getErrorMessage, getSuccessMessage } from "@/lib/auth";
import { useTranslation } from "react-i18next";

const ForgotPasswordContent = () => {
  const { t } = useTranslation("dashboard");
  const [emailAddress, setEmailAddress] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSendCode = async () => {
    if (!emailAddress) {
      toast.error("Please enter your email address");
      return;
    }

    try {
      const response = await forgotPassword({
        email_address: emailAddress,
      }).unwrap();

      dispatch(
        setPendingVerification({
          email: response.data.email_address,
          purpose: "forgot-password",
        }),
      );

      toast.success(getSuccessMessage(response, "OTP sent successfully"));
      router.push(
        `/verify-otp?purpose=forgot-password&email=${encodeURIComponent(response.data.email_address)}`,
      );
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to send OTP"));
    }
  };

  return (
    <AuthCard>
      <div className="h-6 flex items-center justify-center">
        <AuthLogo className="mb-0" />
      </div>

      <div className="text-center space-y-2">
        <h1 className="text-xl sm:text-2xl font-bold text-primary">
          {t("auth.forgotPasswordTitle")}
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          {t("auth.forgotPasswordDesc")}
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">
            {t("auth.emailAddress")}
          </label>
          <input
            type="email"
            placeholder={t("auth.placeholders.enterEmail")}
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg bg-input/30 border border-white/10 text-sm text-primary placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-custom-yellow/50 transition-colors"
          />
        </div>

        <AuthSubmitButton
          label={t("auth.sendCode")}
          loadingLabel={t("auth.sending")}
          isLoading={isLoading}
          type="button"
          onClick={handleSendCode}
        />
      </div>

      <p className="text-sm text-center text-muted-foreground">
        {t("auth.backTo")}{" "}
        <Link
          href="/sign-in"
          className="text-primary font-semibold underline underline-offset-2 hover:text-custom-yellow transition-colors"
        >
          {t("auth.signIn")}
        </Link>
      </p>
    </AuthCard>
  );
};

export default ForgotPasswordContent;
