/** @format */

"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import InfoRow from "./shared/InfoRow";
import StatusBadge from "./shared/StatusBadge";
import type { BookingDetailsResponse } from "@/types/BookingListTypes";

type PaymentInfoSectionProps = {
  booking: BookingDetailsResponse["data"]["booking"];
  payment: BookingDetailsResponse["data"]["payment"];
};

const PaymentInfoSection: React.FC<PaymentInfoSectionProps> = ({
  booking,
  payment,
}) => {
  const { t } = useTranslation("dashboard");

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-primary mb-3">
        {t("bookings.details.paymentInfo")}
      </h3>
      <div>
        <InfoRow label="Booking ID" value={booking.display_booking_id} />
        <InfoRow label="Transaction Ref" value={booking.payment_reference} />
        <InfoRow label="Amount" value={payment.total_amount_display} />
        <InfoRow label="Platform Fee" value={payment.commission_amount} />
        <InfoRow label="Payment Method" value={payment.payment_method} />
        <InfoRow
          label="Payment Status"
          value={<StatusBadge status={booking.payment_status} />}
        />
      </div>
    </div>
  );
};

export default PaymentInfoSection;
