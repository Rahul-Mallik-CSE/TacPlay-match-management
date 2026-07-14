/** @format */

"use client";

import { type ReactNode } from "react";
import { Euro } from "lucide-react";
import StatsCard from "./StatsCard";
import type { DashboardMark1Item } from "@/types/DashboardTypes";

type StatsGridProps = {
  items: DashboardMark1Item[];
  getIcon: (key: string) => ReactNode;
  getTranslationKey: (key: string) => string;
  t: (key: string, options?: Record<string, unknown>) => string;
};

const StatsGrid: React.FC<StatsGridProps> = ({
  items,
  getIcon,
  getTranslationKey,
  t,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <StatsCard
          key={item.key}
          title={t(`home.${getTranslationKey(item.key)}`, {
            defaultValue: item.label,
          })}
          value={item.value}
          change={item.change.display}
          isPositive={item.change.is_positive}
          showCurrencyIcon={item.key === "total_revenue"}
          icon={
            getIcon(item.key) ?? <Euro className="w-4 h-4" />
          }
        />
      ))}
    </div>
  );
};

export default StatsGrid;
