/** @format */

import React from "react";

const COLOR_MAP: Record<string, string> = {
  paid: "bg-teal-500/20 text-teal-400 border-teal-500/30",
  pending: "bg-custom-yellow/20 text-yellow-400 border-custom-yellow/30",
  open: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  confirmed: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  cancelled: "bg-custom-red/20 text-red-400 border-custom-red/30",
};

type StatusBadgeProps = {
  status: string;
  className?: string;
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const colors =
    COLOR_MAP[status.toLowerCase()] ||
    "bg-secondary/20 text-secondary border-secondary/30";

  return (
    <span
      className={`px-2.5 py-0.5 text-xs font-medium rounded-md border ${colors} ${className ?? ""}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
