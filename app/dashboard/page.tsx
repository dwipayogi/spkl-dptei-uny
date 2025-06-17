"use client";

import { Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { FiList } from "react-icons/fi";

const chartData = [
  { label: "tinggi", laboratorium: 4, fill: "var(--color-tinggi)" },
  { label: "sedang", laboratorium: 2, fill: "var(--color-sedang)" },
  { label: "rendah", laboratorium: 1, fill: "var(--color-rendah)" },
];
const chartConfig = {
  laboratorium: {
    label: "laboratorium",
  },
  tinggi: {
    label: "tinggi (>90%)",
    color: "var(--chart-1)",
  },
  sedang: {
    label: "sedang (70-90%)",
    color: "var(--chart-2)",
  },
  rendah: {
    label: "rendah (<70%)",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="flex items-center border rounded-lg p-2 lg:p-6 bg-white shadow-sm">
          <div className="flex items-center justify-center bg-blue-100 rounded-lg p-2 lg:p-4 mr-4">
            <FiList className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
          </div>
          <div>
            <h3 className="text-3xl lg:text-5xl font-bold text-blue-600">12</h3>
            <p className="text-sm lg:text-lg text-gray-800">
              Total Laboratorium
            </p>
          </div>
        </div>

        <div className="flex items-center border rounded-lg p-2 lg:p-6 bg-white shadow-sm">
          <div className="flex items-center justify-center bg-blue-100 rounded-lg p-2 lg:p-4 mr-4">
            <FiList className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
          </div>
          <div>
            <h3 className="text-3xl lg:text-5xl font-bold text-blue-600">
              90%
            </h3>
            <p className="text-sm lg:text-lg text-gray-800">Total Kepatuhan</p>
          </div>
        </div>

        <div className="flex items-center border rounded-lg p-2 lg:p-6 bg-white shadow-sm">
          <div className="flex items-center justify-center bg-blue-100 rounded-lg p-2 lg:p-4 mr-4">
            <FiList className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
          </div>
          <div>
            <h3 className="text-3xl lg:text-5xl font-bold text-blue-600">3</h3>
            <p className="text-sm lg:text-lg text-gray-800">Total Dokumen</p>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Data Kepatuhan Lab</CardTitle>
          <CardDescription>Berdasarkan kategori</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[300px]"
          >
            <PieChart>
              <ChartTooltip
                content={<ChartTooltipContent nameKey="label" />}
              />
              <Pie data={chartData} dataKey="laboratorium" />
              <ChartLegend
                content={<ChartLegendContent nameKey="label" />}
                className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
