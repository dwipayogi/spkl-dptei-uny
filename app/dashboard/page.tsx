"use client";

import { FiList, FiFileText, FiCheckCircle } from "react-icons/fi";
import {
  getDashboardStats,
  getLabComplianceData,
  LabComplianceData,
} from "./actions";
import { useEffect, useState } from "react";
import {
  StatCard,
  ComplianceCategoryChart,
  ComplianceStatusChart,
  LabComplianceBarChart,
} from "./components";

// Simple reusable no data message component
const NoDataMessage = () => (
  <div className="flex items-center justify-center p-8 text-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
    <p className="text-gray-500">Tidak ada data tersedia</p>
  </div>
);

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalLaboratories: 0,
    totalDocuments: 0,
    averageCompliance: 0,
    complianceCounts: {
      high: 0,
      medium: 0,
      low: 0,
    },
  });
  const [complianceData, setComplianceData] = useState<{
    compliant: LabComplianceData[];
    nonCompliant: LabComplianceData[];
  }>({
    compliant: [],
    nonCompliant: [],
  });
  const [loading, setLoading] = useState(true);
  const [complianceThreshold] = useState(80); // Default threshold at 80%

  const chartData = [
    {
      label: "tinggi",
      laboratorium: stats.complianceCounts.high || 0,
    },
    {
      label: "sedang",
      laboratorium: stats.complianceCounts.medium || 0,
    },
    {
      label: "rendah",
      laboratorium: stats.complianceCounts.low || 0,
    },
  ];

  // Data for compliance status chart
  const statusChartData = [
    { name: "Memenuhi", value: complianceData.compliant.length },
    { name: "Belum Memenuhi", value: complianceData.nonCompliant.length },
  ];

  // Data for bar chart showing individual lab compliance
  const labBarChartData = [
    ...complianceData.compliant.map((lab) => ({
      name: lab.name,
      percentage: lab.percentage,
      status: "Memenuhi",
    })),
    ...complianceData.nonCompliant.map((lab) => ({
      name: lab.name,
      percentage: lab.percentage,
      status: "Belum Memenuhi",
    })),
  ].sort((a, b) => b.percentage - a.percentage);

  // Check if there's any data to display
  const hasCategoryData = chartData.some((item) => item.laboratorium > 0);
  const hasStatusData = statusChartData.some((item) => item.value > 0);
  const hasLabBarData = labBarChartData.length > 0;

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [statsData, complianceData] = await Promise.all([
          getDashboardStats(),
          getLabComplianceData(complianceThreshold),
        ]);

        setStats(statsData);
        setComplianceData(complianceData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [complianceThreshold]);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          icon={FiList}
          value={stats.totalLaboratories}
          label="Total Laboratorium"
          loading={loading}
        />

        <StatCard
          icon={FiCheckCircle}
          value={`${stats.averageCompliance}%`}
          label="Total Kesesuaian"
          loading={loading}
        />

        <StatCard
          icon={FiFileText}
          value={stats.totalDocuments}
          label="Total Dokumen"
          loading={loading}
        />
      </div>

      {/* Chart grid container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart Section - Kategori Kepatuhan */}
        {!loading && !hasCategoryData ? (
          <NoDataMessage />
        ) : (
          <ComplianceCategoryChart loading={loading} chartData={chartData} />
        )}

        {/* Chart Section - Status Kepatuhan */}
        {!loading && !hasStatusData ? (
          <NoDataMessage />
        ) : (
          <ComplianceStatusChart
            loading={loading}
            statusChartData={statusChartData}
            complianceThreshold={complianceThreshold}
            totalLabs={
              complianceData.compliant.length +
              complianceData.nonCompliant.length
            }
          />
        )}
      </div>

      {/* Bar Chart for individual lab compliance */}
      {!loading && !hasLabBarData ? (
        <NoDataMessage />
      ) : (
        <LabComplianceBarChart
          labBarChartData={labBarChartData}
          complianceThreshold={complianceThreshold}
        />
      )}
    </div>
  );
}
