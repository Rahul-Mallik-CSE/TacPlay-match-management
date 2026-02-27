/** @format */

"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Sun", premium: 5000, free: 3000 },
  { name: "Mon", premium: 8000, free: 2000 },
  { name: "Tue", premium: 6000, free: 4000 },
  { name: "Wed", premium: 12000, free: 5000 },
  { name: "Thu", premium: 35000, free: 8000 },
  { name: "Fri", premium: 40000, free: 5000 },
  { name: "Sat", premium: 10000, free: 4000 },
];

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; name: string; color: string }>;
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1826] border border-white/10 rounded-lg px-3 py-2 shadow-xl">
        <p className="text-xs text-muted-foreground mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-xs" style={{ color: entry.color }}>
            {entry.name}: {entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const BookingBarChart: React.FC = () => {
  return (
    <div className="bg-card border border-white/5 rounded-xl p-5 flex-1">
      {/* Header */}
      <div className="flex items-start justify-between mb-1">
        <div>
          <h3 className="text-base font-semibold text-primary">
            Booking Source Breakdown
          </h3>
          <h2 className="text-3xl font-bold text-primary mt-1">254,852</h2>
          <p className="text-xs text-secondary mt-0.5">
            Premium / Free&nbsp;&nbsp;&nbsp;45,762 / 2,491
          </p>
        </div>
        {/* Legend */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-custom-red" />
            <span className="text-xs text-secondary">Premium</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-custom-yellow" />
            <span className="text-xs text-secondary">Free</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-50 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 5, left: -15, bottom: 0 }}
            barGap={2}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(82,82,115,0.2)"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#525273", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#525273", fontSize: 12 }}
              tickFormatter={(value) =>
                value >= 1000 ? `${value / 1000}k` : value
              }
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="premium"
              name="Premium"
              fill="#980009"
              radius={[3, 3, 0, 0]}
              barSize={16}
            />
            <Bar
              dataKey="free"
              name="Free"
              fill="#b4971e"
              radius={[3, 3, 0, 0]}
              barSize={16}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BookingBarChart;
