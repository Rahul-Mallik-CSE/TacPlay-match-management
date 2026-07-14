/** @format */

import type { Metadata } from "next";
import ResetPasswordContent from "@/components/AuthComponents/ResetPassword/ResetPasswordContent";

export const metadata: Metadata = {
  title: "Reset Password",
  description:
    "Set a new password for your TACPlay field owner account.",
  openGraph: {
    title: "Reset Password | TACPlay",
    description:
      "Set a new password for your TACPlay field owner account.",
    url: "/reset-pass",
  },
};

export default function ResetPasswordPage() {
  return <ResetPasswordContent />;
}
