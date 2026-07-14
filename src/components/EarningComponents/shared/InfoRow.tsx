/** @format */

import React from "react";

type InfoRowProps = {
  label: string;
  value: React.ReactNode;
};

const InfoRow: React.FC<InfoRowProps> = ({ label, value }) => (
  <div className="flex items-start justify-between gap-4 py-1.5 border-b border-white/5 last:border-0">
    <span className="text-sm text-secondary whitespace-nowrap">{label}</span>
    <span className="text-sm text-primary text-right">{value}</span>
  </div>
);

export default InfoRow;
