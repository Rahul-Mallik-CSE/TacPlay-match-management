/** @format */

import type { Metadata } from "next";
import SignInContent from "@/components/AuthComponents/SignIn/SignInContent";

export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Sign in to your TACPlay field owner dashboard. Manage your arena, sessions, bookings, and earnings.",
  openGraph: {
    title: "Sign In | TACPlay",
    description:
      "Sign in to your TACPlay field owner dashboard.",
    url: "/sign-in",
  },
};

export default function SignInPage() {
  return <SignInContent />;
}
