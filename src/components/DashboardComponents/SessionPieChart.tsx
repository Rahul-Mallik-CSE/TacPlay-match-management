/** @format */

"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Social Match", value: 2568 },
  { name: "Ranked Match", value: 2568 },
];

const COLORS = ["#980009", "#b4971e"];

const SessionPieChart: React.FC = () => {
  const totalSessions = 68;

  return (
    <div className="bg-card border border-white/5 rounded-xl p-5 flex-1">
      {/* Header */}
      <h3 className="text-base md:text-lg font-semibold text-secondary mb-4">
        Session Distribution
      </h3>

      {/* Chart with center label */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-center relative gap-4">
        <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-45 lg:h-45 mx-auto sm:mx-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                paddingAngle={2}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
                stroke="none"
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          {/* Center text */}
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className="text-xl sm:text-2xl font-bold text-primary">
              {totalSessions}
            </span>
            <span className="text-[8px] sm:text-[10px] text-secondary">
              Sessions
            </span>
          </div>
        </div>

        {/* Right side labels */}
        <div className="flex flex-col gap-2 sm:ml-4">
          {data.map((entry, index) => (
            <div key={entry.name} className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: COLORS[index] }}
              />
              <span className="text-xs text-secondary whitespace-nowrap">
                {entry.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-custom-red" />
          <span className="text-xs text-secondary">Social Match</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-custom-yellow" />
          <span className="text-xs text-secondary">Ranked Match</span>
        </div>
      </div>
    </div>
  );
};

export default SessionPieChart;
