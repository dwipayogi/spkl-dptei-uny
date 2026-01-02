"use client";

import { FiList, FiFileText, FiCheckCircle } from "react-icons/fi";
import {
    ComplianceCategoryChart,
    ComplianceStatusChart,
    LabComplianceBarChart,
} from "./components";
import { LabComplianceData } from "./actions";

interface DashboardChartsProps {
    stats: {
        totalLaboratories: number;
        totalDocuments: number;
        averageCompliance: number;
        complianceCounts: {
            high: number;
            medium: number;
            low: number;
        };
    };
    complianceData: {
        compliant: LabComplianceData[];
        nonCompliant: LabComplianceData[];
    };
    complianceThreshold: number;
}

// Simple reusable no data message component
const NoDataMessage = () => (
    <div className="flex items-center justify-center p-8 text-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
        <p className="text-gray-500">Tidak ada data tersedia</p>
    </div>
);

export default function DashboardCharts({
    stats,
    complianceData,
    complianceThreshold,
}: DashboardChartsProps) {
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

    return (
        <>
            {/* Chart grid container */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Chart Section - Kategori Kepatuhan */}
                {!hasCategoryData ? (
                    <NoDataMessage />
                ) : (
                    <ComplianceCategoryChart loading={false} chartData={chartData} />
                )}

                {/* Chart Section - Status Kepatuhan */}
                {!hasStatusData ? (
                    <NoDataMessage />
                ) : (
                    <ComplianceStatusChart
                        loading={false}
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
            {!hasLabBarData ? (
                <NoDataMessage />
            ) : (
                <LabComplianceBarChart
                    labBarChartData={labBarChartData}
                    complianceThreshold={complianceThreshold}
                />
            )}
        </>
    );
}
