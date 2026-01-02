import { Suspense } from "react";
import { FiList, FiFileText, FiCheckCircle } from "react-icons/fi";
import {
  getDashboardStats,
  getLabComplianceData,
} from "./actions";
import {
  StatCard,
  StatCardSkeleton,
} from "./components";
import DashboardCharts from "./DashboardCharts";

// Skeleton fallback for charts section
function ChartsSkeleton() {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-64 bg-white rounded-lg border animate-pulse" />
        <div className="h-64 bg-white rounded-lg border animate-pulse" />
      </div>
      <div className="h-80 bg-white rounded-lg border animate-pulse" />
    </>
  );
}

// Server Component for stats cards
async function DashboardStats() {
  const stats = await getDashboardStats();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <StatCard
        icon={FiList}
        value={stats.totalLaboratories}
        label="Total Laboratorium"
      />

      <StatCard
        icon={FiCheckCircle}
        value={`${stats.averageCompliance}%`}
        label="Total Kesesuaian"
      />

      <StatCard
        icon={FiFileText}
        value={stats.totalDocuments}
        label="Total Dokumen"
      />
    </div>
  );
}

// Server component for charts with data fetching
async function DashboardChartsSection() {
  const complianceThreshold = 80;
  const [stats, complianceData] = await Promise.all([
    getDashboardStats(),
    getLabComplianceData(complianceThreshold),
  ]);

  return (
    <DashboardCharts
      stats={stats}
      complianceData={complianceData}
      complianceThreshold={complianceThreshold}
    />
  );
}

// Stats skeleton for Suspense
function StatsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <StatCardSkeleton />
      <StatCardSkeleton />
      <StatCardSkeleton />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stats Cards with Suspense */}
      <Suspense fallback={<StatsSkeleton />}>
        <DashboardStats />
      </Suspense>

      {/* Charts with Suspense */}
      <Suspense fallback={<ChartsSkeleton />}>
        <DashboardChartsSection />
      </Suspense>
    </div>
  );
}
