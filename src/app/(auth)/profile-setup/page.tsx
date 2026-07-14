/** @format */

import type { Metadata } from "next";
import ProfileSetupContent from "@/components/AuthComponents/ProfileSetup/ProfileSetupContent";

export const metadata: Metadata = {
  title: "Profile Setup",
  description:
    "Complete your TACPlay field owner profile. Set up your arena, business details, packages, and payout information.",
  openGraph: {
    title: "Profile Setup | TACPlay",
    description:
      "Complete your TACPlay field owner profile.",
    url: "/profile-setup",
  },
};

export default function ProfileSetupPage() {
  return <ProfileSetupContent />;
}
