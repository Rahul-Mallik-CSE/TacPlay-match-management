/** @format */

"use client";

import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Mon", revenueGrowth: 1800, bookingCount: 800 },
  { name: "Tue", revenueGrowth: 2000, bookingCount: 1000 },
  { name: "Wed", revenueGrowth: 2200, bookingCount: 1200 },
  { name: "Thu", revenueGrowth: 3500, bookingCount: 1800 },
  { name: "Fri", revenueGrowth: 4200, bookingCount: 2200 },
  { name: "Sat", revenueGrowth: 3000, bookingCount: 2000 },
  { name: "Sun", revenueGrowth: 2800, bookingCount: 1500 },
  { name: "Mon", revenueGrowth: 3800, bookingCount: 1800 },
  { name: "Tue", revenueGrowth: 4500, bookingCount: 2500 },
  { name: "Wed", revenueGrowth: 4000, bookingCount: 2200 },
];

const tabs = ["Day", "Week", "Month", "Year"];

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

const RevenueChart: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Day");

  return (
    <div className="bg-card border border-white/5 rounded-xl p-5">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-sm md:text-sm text-secondary mb-1">
            Total Revenue
          </p>
          <h2 className="text-4xl font-bold text-primary">$650.5K</h2>
        </div>
        <div className="flex flex-col items-end gap-3">
          {/* Tabs */}
          <div className="flex bg-muted rounded-lg p-0.5">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 cursor-pointer text-xs font-medium rounded-md transition-all ${
                  activeTab === tab
                    ? "bg-custom-red text-primary"
                    : "text-primary hover:text-secondary"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          {/* Legend */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-custom-red" />
              <span className="text-xs text-primary">Revenue Growth</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-custom-yellow" />
              <span className="text-xs text-primary">Booking Count</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-70">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 5, right: 5, left: -15, bottom: 0 }}
          >
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#980009" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#980009" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="bookingGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#b4971e" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#b4971e" stopOpacity={0} />
              </linearGradient>
            </defs>
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
            <Area
              type="monotone"
              dataKey="bookingCount"
              name="Booking Count"
              stroke="#b4971e"
              strokeWidth={2}
              fill="url(#bookingGradient)"
            />
            <Area
              type="monotone"
              dataKey="revenueGrowth"
              name="Revenue Growth"
              stroke="#980009"
              strokeWidth={2}
              fill="url(#revenueGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;
