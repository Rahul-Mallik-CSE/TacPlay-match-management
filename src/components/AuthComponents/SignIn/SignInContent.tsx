/** @format */

"use client";

import React, { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import AuthBanner from "@/components/AuthComponents/AuthBanner";
import AuthLogo from "@/components/AuthComponents/shared/AuthLogo";
import AuthPasswordField from "@/components/AuthComponents/shared/AuthPasswordField";
import AuthSubmitButton from "@/components/AuthComponents/shared/AuthSubmitButton";
import { useLoginFieldOwnerMutation } from "@/redux/features/auth/authAPI";
import { useAppDispatch } from "@/redux/hooks";
import { setAuthSession } from "@/redux/features/auth/authSlice";
import { getErrorMessage, saveAuthTokens, saveAuthUser } from "@/lib/auth";
import { useTranslation } from "react-i18next";

function safeReturnPath(from: string | null): string | null {
  if (!from) return null;
  if (!from.startsWith("/") || from.startsWith("//")) return null;
  if (from.startsWith("/api")) return null;
  return from;
}

// [DEMO] Remove this section when deploying to production
const DEMO_EMAIL = "rmallik191242@bscse.uiu.ac.bd";
const DEMO_PASSWORD = "Rahul123#";

const SignInContentInner = () => {
  const { t } = useTranslation("dashboard");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // [DEMO] Remove this handler when deploying to production
  const fillDemoCredentials = () => {
    setEmail(DEMO_EMAIL);
    setPassword(DEMO_PASSWORD);
  };
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const [loginFieldOwner, { isLoading }] = useLoginFieldOwnerMutation();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !password) {
      toast.error("Please enter your email and password.");
      return;
    }

    try {
      const response = await loginFieldOwner({
        business_email: trimmed,
        password,
      }).unwrap();

      const tokens = response.data?.tokens;
      const user = response.data?.user;
      if (!tokens?.access || !tokens?.refresh || !user) {
        toast.error("Login response is missing required auth data.");
        return;
      }

      saveAuthTokens(tokens.access, tokens.refresh);
      saveAuthUser(user);
      dispatch(setAuthSession(user));

      const defaultDestination = user.arena_info_saved ? "/" : "/profile-setup";
      const returnTo = searchParams
        ? (safeReturnPath(searchParams.get("from")) ??
          safeReturnPath(searchParams.get("redirect")) ??
          defaultDestination)
        : defaultDestination;

      router.push(returnTo);
      router.refresh();
    } catch (err) {
      toast.error(getErrorMessage(err, "Sign in failed."));
    }
  };

  return (
    <AuthBanner>
      <div className="flex flex-col items-center">
        <AuthLogo />

        <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-2 text-center">
          {t("auth.welcomeBack")}
        </h1>
        <p className="text-sm text-muted-foreground text-center mb-8 max-w-sm">
          {t("auth.signInDesc")}
        </p>

        <form className="w-full space-y-5" onSubmit={handleSignIn} noValidate>
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary">
              {t("auth.businessEmail")}
            </label>
            <input
              type="email"
              name="business_email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("auth.placeholders.enterEmail")}
              className="w-full px-4 py-2.5 rounded-lg bg-input/30 border border-white/10 text-sm text-primary placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-custom-yellow/50 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-primary">
                {t("auth.password")}
              </label>
              <Link
                href="/forgot-pass"
                className="text-xs text-primary hover:text-custom-yellow transition-colors font-medium"
              >
                {t("auth.forgotPassword")}
              </Link>
            </div>
            <AuthPasswordField
              label=""
              value={password}
              onChange={setPassword}
              placeholder={t("auth.placeholders.enterPassword")}
            />
          </div>

          <AuthSubmitButton
            label={t("auth.signIn")}
            loadingLabel={t("auth.signingIn")}
            isLoading={isLoading}
          />

          {/* [DEMO] Remove this button when deploying to production */}
          <button
            type="button"
            onClick={fillDemoCredentials}
            className="w-full py-2.5 rounded-lg border border-dashed border-custom-yellow/40 bg-custom-yellow/5 text-custom-yellow text-xs font-semibold hover:bg-custom-yellow/10 hover:border-custom-yellow/60 transition-colors cursor-pointer"
          >
            Try Demo Login
          </button>

          <p className="text-sm text-center text-muted-foreground">
            {t("auth.dontHaveAccount")}{" "}
            <Link
              href="/sign-up"
              className="text-primary cursor-pointer font-semibold underline underline-offset-2 hover:text-custom-yellow transition-colors"
            >
              {t("auth.signUp")}
            </Link>
          </p>
        </form>
      </div>
    </AuthBanner>
  );
};

export default function SignInContent() {
  const { t } = useTranslation("dashboard");
  return (
    <Suspense
      fallback={
        <AuthBanner>
          <div className="flex min-h-60 items-center justify-center text-sm text-muted-foreground">
            {t("auth.loading")}
          </div>
        </AuthBanner>
      }
    >
      <SignInContentInner />
    </Suspense>
  );
}
