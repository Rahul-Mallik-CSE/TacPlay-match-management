/** @format */

import React from "react";

type ChartLegendProps = {
  items: Array<{ color: string; label: string }>;
  className?: string;
};

const ChartLegend: React.FC<ChartLegendProps> = ({ items, className }) => {
  return (
    <div className={`flex items-center gap-4 ${className ?? ""}`}>
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-1.5">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          <span className="text-xs text-secondary">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default ChartLegend;
