/** @format */

import React from "react";

type PaymentBadgeProps = {
  method: string;
  className?: string;
};

const PaymentBadge: React.FC<PaymentBadgeProps> = ({ method, className }) => {
  const isStripe = method.toLowerCase().includes("stripe");

  return (
    <span
      className={`px-2.5 py-0.5 text-xs font-medium rounded-md border ${
        isStripe
          ? "bg-purple-500/20 text-purple-400 border-purple-500/30"
          : "bg-blue-500/20 text-blue-400 border-blue-500/30"
      } ${className ?? ""}`}
    >
      {method}
    </span>
  );
};

export default PaymentBadge;
