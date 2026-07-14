/** @format */

import type { Metadata } from "next";
import CreateSessionContent from "@/components/SessionComponents/CreateSessionComponents/CreateSessionContent";

export const metadata: Metadata = {
  title: "Create Session",
  description:
    "Create a new match session for your TACPlay arena. Configure match type, teams, timing, and pricing.",
  openGraph: {
    title: "Create Session | TACPlay",
    description:
      "Create a new match session for your TACPlay arena.",
    url: "/sessions/create-session",
  },
};

const CreateSessionPage = () => {
  return <CreateSessionContent />;
};

export default CreateSessionPage;
