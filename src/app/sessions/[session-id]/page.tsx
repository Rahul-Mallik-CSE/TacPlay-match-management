/** @format */

import type { Metadata } from "next";
import SessionDetailsContent from "@/components/SessionComponents/SessionDetailsComponents/SessionDetailsContent";

export const metadata: Metadata = {
  title: "Session Details",
  description:
    "View session details, team scores, player cards, and match information for your TACPlay arena session.",
  openGraph: {
    title: "Session Details | TACPlay",
    description:
      "View session details, team scores, and player information.",
  },
};

export default function SessionDetailsPage() {
  return <SessionDetailsContent />;
}
