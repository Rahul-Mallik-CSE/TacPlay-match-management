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
import { useTranslation } from "react-i18next";
import type {
  DashboardLegend,
  DashboardMark4ChartItem,
} from "@/types/DashboardTypes";
import { cn } from "@/lib/utils";
import ChartTooltip from "./shared/ChartTooltip";
import FeatureLockOverlay from "./shared/FeatureLockOverlay";
import ChartLegend from "./shared/ChartLegend";

type BookingBarChartProps = {
  title: string;
  valueDisplay: string;
  subtitle: string;
  totalsDisplay: string;
  legends: DashboardLegend[];
  chartData: DashboardMark4ChartItem[];
  isLocked?: boolean;
  onUpgradeClick?: () => void;
};

const BookingBarChart: React.FC<BookingBarChartProps> = ({
  title,
  valueDisplay,
  subtitle,
  totalsDisplay,
  legends,
  chartData,
  isLocked = false,
  onUpgradeClick,
}) => {
  const { t } = useTranslation("dashboard");

  const getLegendLabel = (label: string) => {
    if (label === "Premium") return t("home.legends.premium");
    if (label === "Free") return t("home.legends.free");
    if (label === "Booking Count") return t("home.legends.bookingCount");
    return label;
  };

  const legendA = legends[0]?.label
    ? getLegendLabel(legends[0].label)
    : t("home.legends.premium");
  const legendB = legends[1]?.label
    ? getLegendLabel(legends[1].label)
    : t("home.legends.free");
  const translatedTitle =
    title === "Booking Source Breakdown"
      ? t("home.bookingSourceBreakdown")
      : title === "Booking Count"
        ? t("home.legends.bookingCount")
        : title;

  return (
    <div className="bg-card border border-white/5 rounded-xl p-5 flex-1 relative overflow-hidden flex flex-col justify-between">
      <div className="flex items-start justify-between mb-1">
        <div>
          <h3 className="text-base font-semibold text-secondary">
            {translatedTitle}
          </h3>
          {!isLocked && (
            <>
              <h2 className="text-xl md:text-3xl font-bold text-primary mt-1">
                {valueDisplay}
              </h2>
              <p className="text-xs text-secondary mt-0.5">
                {subtitle}&nbsp;&nbsp;&nbsp;{totalsDisplay}
              </p>
            </>
          )}
        </div>
        <ChartLegend
          items={[
            { color: "#980009", label: legendA },
            { color: "#b4971e", label: legendB },
          ]}
        />
      </div>

      <div className="relative mt-4 flex-1 flex flex-col justify-end">
        <div
          className={cn(
            "w-full h-32 sm:h-40 md:h-48 lg:h-50 transition-all duration-200",
            isLocked &&
              "blur-[2.5px] pointer-events-none select-none opacity-75",
          )}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 5, right: 5, left: -15, bottom: 0 }}
              barGap={2}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(82,82,115,0.2)"
                vertical={false}
              />
              <XAxis
                dataKey="label"
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
              <Tooltip content={<ChartTooltip />} />
              <Bar
                dataKey="premium"
                name={legendA}
                fill="#980009"
                radius={[3, 3, 0, 0]}
                barSize={12}
              />
              <Bar
                dataKey="free"
                name={legendB}
                fill="#b4971e"
                radius={[3, 3, 0, 0]}
                barSize={12}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {isLocked && (
          <FeatureLockOverlay
            title={t(
              "home.unlockBookingTitle",
              "Unlock Booking Source Breakdown",
            )}
            description={t(
              "home.unlockBookingDesc",
              "Upgrade your plan to Essential for Field Growth or Gold to view match booking breakdown analytics between Premium and Free slots.",
            )}
            onUpgradeClick={onUpgradeClick}
          />
        )}
      </div>
    </div>
  );
};

export default BookingBarChart;
