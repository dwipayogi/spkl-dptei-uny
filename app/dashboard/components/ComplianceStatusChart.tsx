import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";

interface ComplianceStatusChartProps {
  loading: boolean;
  statusChartData: {
    name: string;
    value: number;
  }[];
  complianceThreshold: number;
  totalLabs: number;
}

// Green for compliant, Red for non-compliant
const COLORS = ["#4ade80", "#f87171"];

export function ComplianceStatusChart({
  loading,
  statusChartData,
  complianceThreshold,
}: ComplianceStatusChartProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Status Kesesuaian Lab</CardTitle>
        <CardDescription>
          Berdasarkan threshold {complianceThreshold}%
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {loading ? (
          <div className="mx-auto aspect-square max-h-[300px] flex items-center justify-center">
            <Skeleton className="h-64 w-64 rounded-full" />
          </div>
        ) : (
          <PieChart width={500} height={300} className="mx-auto">
            <Pie
              data={statusChartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                percent > 0 ? `${name}: ${(percent * 100).toFixed(0)}%` : null
              }
            >
              {statusChartData.map((_entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend />
            <Tooltip formatter={(value) => [`${value} lab`, "Jumlah"]} />
          </PieChart>
        )}
        {/* No data message */}
        {!loading && statusChartData.every((item) => item.value === 0) && (
          <div className="text-center py-4">
            <p className="text-gray-500">
              Belum ada data kepatuhan laboratorium
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
