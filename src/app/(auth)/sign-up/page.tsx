/** @format */

import type { Metadata } from "next";
import SignUpContent from "@/components/AuthComponents/SignUp/SignUpContent";

export const metadata: Metadata = {
  title: "Create Account",
  description:
    "Register as a TACPlay field owner. Create your account to start managing your arena, sessions, and bookings.",
  openGraph: {
    title: "Create Account | TACPlay",
    description:
      "Register as a TACPlay field owner.",
    url: "/sign-up",
  },
};

export default function SignUpPage() {
  return <SignUpContent />;
}
