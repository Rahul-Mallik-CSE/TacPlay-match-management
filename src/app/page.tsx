/** @format */

import type { Metadata } from "next";
import DashboardPage from "@/components/DashboardComponents/DashboardPage";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "TACPlay field owner analytics dashboard. View revenue, bookings, session distribution, and performance metrics.",
  openGraph: {
    title: "Dashboard | TACPlay",
    description:
      "TACPlay field owner analytics dashboard.",
    url: "/",
  },
};

export default function Home() {
  return <DashboardPage />;
}
