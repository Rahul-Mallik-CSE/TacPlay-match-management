/** @format */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import AuthBanner from "@/components/AuthComponents/AuthBanner";
import AuthLogo from "@/components/AuthComponents/shared/AuthLogo";
import AuthPasswordField from "@/components/AuthComponents/shared/AuthPasswordField";
import AuthSubmitButton from "@/components/AuthComponents/shared/AuthSubmitButton";
import { Checkbox } from "@/components/ui/checkbox";
import { useSignUpFieldOwnerMutation } from "@/redux/features/auth/authAPI";
import { useAppDispatch } from "@/redux/hooks";
import { setPendingVerification } from "@/redux/features/auth/authSlice";
import { getErrorMessage, getSuccessMessage } from "@/lib/auth";
import { useTranslation } from "react-i18next";

const SignUpContent = () => {
  const { t } = useTranslation("dashboard");
  const [agreed, setAgreed] = useState(false);
  const [ownerName, setOwnerName] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [signUpFieldOwner, { isLoading }] = useSignUpFieldOwnerMutation();

  const handleSignUp = async () => {
    if (!ownerName || !businessEmail || !password || !confirmPassword) {
      toast.error("Please fill all required fields");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (!agreed) {
      toast.error("Please accept terms and conditions");
      return;
    }

    try {
      const response = await signUpFieldOwner({
        owner_name: ownerName,
        business_email: businessEmail,
        password,
        confirm_password: confirmPassword,
      }).unwrap();

      dispatch(
        setPendingVerification({
          email: response.data.business_email,
          purpose: "signup",
        }),
      );

      toast.success(getSuccessMessage(response, "OTP sent to your email"));
      router.push(
        `/verify-otp?purpose=signup&email=${encodeURIComponent(response.data.business_email)}`,
      );
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to sign up"));
    }
  };

  return (
    <AuthBanner>
      <div className="flex flex-col items-center">
        <AuthLogo />

        <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-2 text-center">
          {t("auth.registerField")}
        </h1>
        <p className="text-sm text-muted-foreground text-center mb-8 max-w-sm">
          {t("auth.signUpDesc")}
        </p>

        <div className="w-full space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              {t("auth.ownerName")}
            </label>
            <input
              type="text"
              placeholder={t("auth.placeholders.enterOwnerName")}
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-input/30 border border-white/10 text-sm text-primary placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-custom-yellow/50 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              {t("auth.businessEmail")}
            </label>
            <input
              type="email"
              placeholder={t("auth.placeholders.enterSignUpEmail")}
              value={businessEmail}
              onChange={(e) => setBusinessEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-input/30 border border-white/10 text-sm text-primary placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-custom-yellow/50 transition-colors"
            />
          </div>

          <AuthPasswordField
            label={t("auth.password")}
            value={password}
            onChange={setPassword}
            placeholder={t("auth.placeholders.createPassword")}
            autoComplete="new-password"
          />

          <AuthPasswordField
            label={t("auth.confirmPassword")}
            value={confirmPassword}
            onChange={setConfirmPassword}
            placeholder={t("auth.placeholders.reenterPassword")}
            autoComplete="new-password"
          />

          <div className="flex items-center gap-2">
            <Checkbox
              checked={agreed}
              onCheckedChange={(checked) => setAgreed(checked as boolean)}
              className="border-white/20 data-[state=checked]:bg-custom-yellow data-[state=checked]:border-custom-yellow"
            />
            <Link href="https://tacplay.eu/owner" target="_blank">
              <label className="text-sm text-muted-foreground hover:underline cursor-pointer select-none">
                {t("auth.agreeToTerms")}
              </label>
            </Link>
          </div>

          <AuthSubmitButton
            label={t("auth.signUp")}
            loadingLabel={t("auth.signingUp")}
            isLoading={isLoading}
            type="button"
            onClick={handleSignUp}
          />

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-muted-foreground">{t("auth.or")}</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <p className="text-sm text-center text-muted-foreground">
            {t("auth.alreadyHaveAccount")}{" "}
            <Link
              href="/sign-in"
              className="text-primary font-semibold underline underline-offset-2 hover:text-custom-yellow transition-colors"
            >
              {t("auth.signIn")}
            </Link>
          </p>
        </div>
      </div>
    </AuthBanner>
  );
};

export default SignUpContent;
