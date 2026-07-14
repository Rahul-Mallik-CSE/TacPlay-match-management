/** @format */

import type { Metadata } from "next";
import SettingsContent from "@/components/SettingsComponents/SettingsContent";

export const metadata: Metadata = {
  title: "Settings",
  description:
    "Manage your TACPlay field owner account settings. Update profile, change password, and view account details.",
  openGraph: {
    title: "Settings | TACPlay",
    description:
      "Manage your TACPlay field owner account settings.",
    url: "/settings",
  },
};

const SettingsPage = () => {
  return <SettingsContent />;
};

export default SettingsPage;
