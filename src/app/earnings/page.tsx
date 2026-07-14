/** @format */

import type { Metadata } from "next";
import EarningTable from "@/components/EarningComponents/EarningTable";

export const metadata: Metadata = {
  title: "Earnings",
  description:
    "Track your TACPlay arena earnings, transaction history, and payment details. Download invoices as PDF.",
  openGraph: {
    title: "Earnings | TACPlay",
    description:
      "Track your TACPlay arena earnings and transactions.",
    url: "/earnings",
  },
};

const EarningsPage = () => {
  return (
    <div className="w-full p-3 md:p-4">
      <div className="max-w-625 mx-auto space-y-4 md:space-y-6">
        <EarningTable />
      </div>
    </div>
  );
};

export default EarningsPage;
