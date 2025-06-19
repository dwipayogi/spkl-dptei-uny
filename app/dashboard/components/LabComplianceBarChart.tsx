import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from "recharts";

interface LabComplianceBarChartProps {
  labBarChartData: {
    name: string;
    percentage: number;
    status: string;
  }[];
  complianceThreshold: number;
}

export function LabComplianceBarChart({
  labBarChartData,
  complianceThreshold,
}: LabComplianceBarChartProps) {
  if (labBarChartData.length === 0) {
    return null;
  }

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Detail Kesesuaian Laboratorium</CardTitle>
        <CardDescription>Persentase kesesuaian per laboratorium</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={labBarChartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 80,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                height={80}
                tick={(props) => {
                  const { x, y, payload } = props;
                  return (
                    <g transform={`translate(${x},${y})`}>
                      <text
                        x={0}
                        y={0}
                        dy={16}
                        textAnchor="end"
                        fill="#666"
                        transform="rotate(-45)"
                      >
                        {payload.value}
                      </text>
                    </g>
                  );
                }}
              />
              <YAxis
                domain={[0, 100]}
                label={{
                  value: "Persentase Kesesuaian (%)",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip formatter={(value) => [`${value}%`, "Kesesuaian"]} />
              <Bar dataKey="percentage" name="Persentase Kesesuaian">
                {labBarChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.status === "Memenuhi" ? "#4ade80" : "#f87171"}
                  />
                ))}
              </Bar>
              {/* Horizontal line marking the threshold */}
              <ReferenceLine
                y={complianceThreshold}
                stroke="darkgray"
                strokeDasharray="3 3"
                label={{
                  value: `Threshold (${complianceThreshold}%)`,
                  position: "insideBottomRight",
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
