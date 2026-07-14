/** @format */

import type { Metadata } from "next";
import ArenaManagementPage from "@/components/ArenaManagementComponents/ArenaManagementPage";

export const metadata: Metadata = {
  title: "Arena Management",
  description:
    "Manage your TACPlay arena details, field setup, packages, payout information, and cover images.",
  openGraph: {
    title: "Arena Management | TACPlay",
    description:
      "Manage your TACPlay arena details and settings.",
    url: "/arena-management",
  },
};

export default function ArenaManagement() {
  return <ArenaManagementPage />;
}
