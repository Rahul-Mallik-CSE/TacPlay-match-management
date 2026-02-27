/** @format */

import {
  DollarSign,
  CalendarCheck,
  Gamepad2,
  Trophy,
  FileText,
  CalendarRange,
} from "lucide-react";
import StatsCard from "@/components/DashboardComponents/StatsCard";
import RevenueChart from "@/components/DashboardComponents/RevenewChart";
import SessionPieChart from "@/components/DashboardComponents/SessionPieChart";
import BookingBarChart from "@/components/DashboardComponents/BookingBarChart";

export default function Home() {
  return (
    <div className="w-full px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary">Analytics report</h1>
          <p className="text-sm text-secondary mt-0.5">
            Analytics support form 2025 to 2026
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-muted hover:bg-muted/80 text-primary text-sm font-medium px-4 py-2 rounded-lg border border-white/5 transition-colors">
            <FileText className="w-4 h-4" />
            All Reports
          </button>
          <button className="flex items-center gap-2 bg-muted hover:bg-muted/80 text-primary text-sm font-medium px-4 py-2 rounded-lg border border-white/5 transition-colors">
            <CalendarRange className="w-4 h-4" />
            2025 - 2026
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Revenue"
          value="$60K"
          change={4.3}
          icon={<DollarSign className="w-4 h-4" />}
        />
        <StatsCard
          title="Total Bookings"
          value="48.1K"
          change={4.3}
          icon={<CalendarCheck className="w-4 h-4" />}
        />
        <StatsCard
          title="Upcoming Sessions"
          value="9856"
          change={4.3}
          icon={<Gamepad2 className="w-4 h-4" />}
        />
        <StatsCard
          title="Matches Hosted"
          value="262"
          change={4.3}
          icon={<Trophy className="w-4 h-4" />}
        />
      </div>

      {/* Revenue Chart */}
      <RevenueChart />

      {/* Bottom Row - Session Distribution & Booking Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SessionPieChart />
        <BookingBarChart />
      </div>
    </div>
  );
}
