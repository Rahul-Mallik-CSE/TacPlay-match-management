/** @format */

"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import InfoRow from "./shared/InfoRow";
import PaymentBadge from "./shared/PaymentBadge";
import type { TransactionDetailsResponse } from "@/types/EarningTypes";

type EarningPaymentInfoSectionProps = {
  paymentInfo: TransactionDetailsResponse["data"]["transaction_details"]["payment_info"];
  statusDisplay: string;
};

const EarningPaymentInfoSection: React.FC<EarningPaymentInfoSectionProps> = ({
  paymentInfo,
  statusDisplay,
}) => {
  const { t } = useTranslation("dashboard");

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-primary mb-3">
        {t("earnings.details.paymentInfo")}
      </h3>
      <div>
        <InfoRow
          label="Transaction ID"
          value={paymentInfo.display_transaction_id}
        />
        <InfoRow label="Amount" value={paymentInfo.amount_display} />
        <InfoRow label="Platform Fee" value={paymentInfo.platform_fee_display} />
        <InfoRow label="Net Profit" value={paymentInfo.net_profit_display} />
        <InfoRow
          label="Payment Method"
          value={<PaymentBadge method={paymentInfo.payment_method_display} />}
        />
        <InfoRow label="Date & Time" value={paymentInfo.date_time_display} />
        <InfoRow
          label="Payment Status"
          value={
            <span className="px-3 py-0.5 text-xs font-medium rounded-md border bg-teal-500/20 text-teal-400 border-teal-500/30">
              {statusDisplay}
            </span>
          }
        />
      </div>
    </div>
  );
};

export default EarningPaymentInfoSection;
