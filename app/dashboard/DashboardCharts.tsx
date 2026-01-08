"use client";

import { memo, useMemo } from "react";
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
const NoDataMessage = memo(() => (
    <div className="flex items-center justify-center p-8 text-center bg-gray-50 rounded-lg border border-dashed border-gray-300">
        <p className="text-gray-500">Tidak ada data tersedia</p>
    </div>
));
NoDataMessage.displayName = "NoDataMessage";

function DashboardCharts({
    stats,
    complianceData,
    complianceThreshold,
}: DashboardChartsProps) {
    // Memoize chart data to avoid recalculation on re-renders
    const chartData = useMemo(() => [
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
    ], [stats.complianceCounts.high, stats.complianceCounts.medium, stats.complianceCounts.low]);

    // Memoize status chart data
    const statusChartData = useMemo(() => [
        { name: "Memenuhi", value: complianceData.compliant.length },
        { name: "Belum Memenuhi", value: complianceData.nonCompliant.length },
    ], [complianceData.compliant.length, complianceData.nonCompliant.length]);

    // Memoize bar chart data with expensive sort operation
    const labBarChartData = useMemo(() => [
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
    ].sort((a, b) => b.percentage - a.percentage), [complianceData.compliant, complianceData.nonCompliant]);

    // Memoize data presence checks
    const hasCategoryData = useMemo(() => 
        chartData.some((item) => item.laboratorium > 0), 
    [chartData]);
    
    const hasStatusData = useMemo(() => 
        statusChartData.some((item) => item.value > 0), 
    [statusChartData]);
    
    const hasLabBarData = labBarChartData.length > 0;

    const totalLabs = complianceData.compliant.length + complianceData.nonCompliant.length;

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
                        totalLabs={totalLabs}
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

export default memo(DashboardCharts);
