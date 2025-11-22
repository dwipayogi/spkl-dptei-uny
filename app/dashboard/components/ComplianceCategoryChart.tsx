import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";

interface ComplianceCategoryChartProps {
  loading: boolean;
  chartData: {
    label: string;
    laboratorium: number;
  }[];
}

const COLORS = ["#4ade80", "#fbbf24", "#f87171"]; // Green, Yellow, Red

export function ComplianceCategoryChart({
  loading,
  chartData,
}: ComplianceCategoryChartProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Data Kesesuaian Lab</CardTitle>
        <CardDescription>Berdasarkan kategori</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {loading ? (
          <div className="mx-auto aspect-square max-h-[300px] flex items-center justify-center">
            <Skeleton className="h-64 w-64 rounded-full" />
          </div>
        ) : (
          <PieChart width={500} height={300} className="mx-auto">
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              dataKey="laboratorium"
              nameKey="label"
              label={({ label, percent }) =>
                percent > 0 ? `${label}: ${(percent * 100).toFixed(0)}%` : null
              }
            >
              {chartData.map((_entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend
              formatter={(value) =>
                value.charAt(0).toUpperCase() + value.slice(1)
              }
            />
            <Tooltip
              formatter={(value) => [`${value} lab`, "Jumlah"]}
              labelFormatter={(label: string) => `Kategori: ${label}`}
            />
          </PieChart>
        )}
        {/* No data message */}
        {!loading && chartData.every((item) => item.laboratorium === 0) && (
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
