/** @format */

import type { Metadata } from "next";
import SessionTable from "@/components/SessionComponents/SessionTable";

export const metadata: Metadata = {
  title: "Sessions",
  description:
    "Manage your TACPlay arena sessions. Create, view, and control match sessions with real-time status updates.",
  openGraph: {
    title: "Sessions | TACPlay",
    description:
      "Manage your TACPlay arena sessions.",
    url: "/sessions",
  },
};

const SessionsPage = () => {
  return (
    <div className="w-full p-3 md:p-4">
      <div className="max-w-625 mx-auto space-y-4 md:space-y-6">
        <SessionTable />
      </div>
    </div>
  );
};

export default SessionsPage;
