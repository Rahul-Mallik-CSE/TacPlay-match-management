/** @format */

"use client";

import { type ReactNode, useState } from "react";
import { CalendarCheck, Gamepad2, Trophy, Euro } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/redux/hooks";
import { useGetDashboardOverviewQuery } from "@/redux/features/dashboard/dashboardAPI";
import { useGetFieldOwnerSubscriptionStatusQuery } from "@/redux/features/subscriptions/subscriptionsAPI";
import UpgradeModal from "@/components/CommonComponents/UpgradeModal";
import DashboardLoading from "./DashboardLoading";
import DashboardHeader from "./DashboardHeader";
import StatsGrid from "./StatsGrid";
import RevenueChart from "./RevenewChart";
import SessionPieChart from "./SessionPieChart";
import BookingBarChart from "./BookingBarChart";
import type { DashboardRange } from "@/types/DashboardTypes";

const RANGE_OPTIONS: DashboardRange[] = ["week", "month", "year"];

const STATS_ICON_BY_KEY: Record<string, ReactNode> = {
  total_revenue: <Euro className="w-4 h-4" />,
  total_bookings: <CalendarCheck className="w-4 h-4" />,
  upcoming_sessions: <Gamepad2 className="w-4 h-4" />,
  matches_hosted: <Trophy className="w-4 h-4" />,
};

const getStatsTranslationKey = (key: string) => {
  if (key === "total_revenue") return "totalRevenue";
  if (key === "total_bookings") return "totalBookings";
  if (key === "upcoming_sessions") return "upcomingSessions";
  if (key === "matches_hosted") return "matchesHosted";
  return key;
};

export default function DashboardPage() {
  const { t } = useTranslation("dashboard");
  const selectedRange = useAppSelector(
    (state) => state.dashboard.selectedRange,
  );
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  const { data, isLoading, isFetching, isError } =
    useGetDashboardOverviewQuery(selectedRange);

  const { data: subscriptionStatus } =
    useGetFieldOwnerSubscriptionStatusQuery(undefined);

  const payload = data?.data;
  const header = payload?.analytics_header;
  const statsItems = payload?.mark_1.items ?? [];

  const revenueSection = payload?.mark_2;
  const revenueRanges = (revenueSection?.range_options ?? []).filter(
    (option): option is DashboardRange =>
      RANGE_OPTIONS.includes(option as DashboardRange),
  );
  const visibleRanges =
    revenueRanges.length > 0 ? revenueRanges : RANGE_OPTIONS;

  const currentPlan = subscriptionStatus?.data?.plan_name;
  const isBronze =
    currentPlan === "Bronze Plan" ||
    subscriptionStatus?.data?.plan_code === "field_bronze_monthly";

  const showLoadingState = (isLoading || isFetching) && !payload;

  if (showLoadingState) {
    return <DashboardLoading />;
  }

  return (
    <div className="w-full p-3 md:p-4">
      <div className="max-w-625 mx-auto space-y-4 md:space-y-6">
        <DashboardHeader
          title={header?.title}
          subtitle={header?.subtitle}
          reportType={header?.report_type}
          visibleRanges={visibleRanges}
        />

        {isError ? (
          <div className="text-sm text-destructive">
            {t("home.loadFailed")}
          </div>
        ) : null}

        <StatsGrid
          items={statsItems}
          getIcon={(key) => STATS_ICON_BY_KEY[key] ?? <Euro className="w-4 h-4" />}
          getTranslationKey={getStatsTranslationKey}
          t={t}
        />

        {revenueSection ? (
          <RevenueChart
            title={revenueSection.title}
            valueDisplay={revenueSection.value}
            legends={revenueSection.legends}
            chartData={revenueSection.chart}
            isLocked={isBronze}
            onUpgradeClick={() => setIsUpgradeModalOpen(true)}
          />
        ) : null}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {payload?.mark_3 ? (
            <SessionPieChart
              title={payload.mark_3.title}
              centerValueDisplay={payload.mark_3.center_value_display}
              items={payload.mark_3.items}
              isLocked={isBronze}
              onUpgradeClick={() => setIsUpgradeModalOpen(true)}
            />
          ) : null}

          {payload?.mark_4 ? (
            <BookingBarChart
              title={payload.mark_4.title}
              valueDisplay={payload.mark_4.value_display}
              subtitle={payload.mark_4.subtitle}
              totalsDisplay={payload.mark_4.totals_display}
              legends={payload.mark_4.legends}
              chartData={payload.mark_4.chart}
              isLocked={isBronze}
              onUpgradeClick={() => setIsUpgradeModalOpen(true)}
            />
          ) : null}
        </div>
      </div>
      <UpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
      />
    </div>
  );
}
