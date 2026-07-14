/** @format */

import type { Metadata } from "next";
import VerifyOtpContent from "@/components/AuthComponents/VerifyOtp/VerifyOtpContent";

export const metadata: Metadata = {
  title: "Verify Email",
  description:
    "Verify your email address to complete your TACPlay field owner account registration.",
  openGraph: {
    title: "Verify Email | TACPlay",
    description:
      "Verify your email address to complete registration.",
    url: "/verify-otp",
  },
};

export default function VerifyOtpPage() {
  return <VerifyOtpContent />;
}
