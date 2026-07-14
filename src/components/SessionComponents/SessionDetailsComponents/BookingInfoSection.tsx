/** @format */

"use client";

import React from "react";
import InfoRow from "../shared/InfoRow";

type BookingInfoSectionProps = {
  bookingInfo: {
    booking_id: string;
    transaction_id: string;
    amount: string;
    platform_fee: string;
    net_profit: string;
    payment_method: string;
    date_time: string;
    payment_status: string;
  };
};

const BookingInfoSection: React.FC<BookingInfoSectionProps> = ({
  bookingInfo,
}) => (
  <div className="mt-6">
    <h3 className="text-lg font-semibold text-primary mb-3">Booking Info</h3>
    <div>
      <InfoRow label="Booking ID" value={bookingInfo.booking_id} />
      <InfoRow label="Transaction ID" value={bookingInfo.transaction_id} />
      <InfoRow label="Amount" value={bookingInfo.amount} />
      <InfoRow label="Platform Fee" value={bookingInfo.platform_fee} />
      <InfoRow label="Net Profit" value={bookingInfo.net_profit} />
      <InfoRow label="Payment Method" value={bookingInfo.payment_method} />
      <InfoRow label="Date & Time" value={bookingInfo.date_time} />
      <InfoRow
        label="Payment Status"
        value={
          <span className="px-3 py-0.5 text-xs font-medium rounded-md bg-teal-500/20 text-teal-400 border border-teal-500/30">
            {bookingInfo.payment_status}
          </span>
        }
      />
    </div>
  </div>
);

export default BookingInfoSection;
