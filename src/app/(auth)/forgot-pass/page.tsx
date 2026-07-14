/** @format */

import type { Metadata } from "next";
import ForgotPasswordContent from "@/components/AuthComponents/ForgotPassword/ForgotPasswordContent";

export const metadata: Metadata = {
  title: "Forgot Password",
  description:
    "Reset your TACPlay field owner account password. Enter your email to receive a verification code.",
  openGraph: {
    title: "Forgot Password | TACPlay",
    description:
      "Reset your TACPlay field owner account password.",
    url: "/forgot-pass",
  },
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordContent />;
}
