import { IconType } from "react-icons";
import { Skeleton } from "@/components/ui/skeleton";

interface StatCardProps {
  icon: IconType;
  value: string | number;
  label: string;
  loading: boolean;
}

export function StatCard({ icon: Icon, value, label, loading }: StatCardProps) {
  return (
    <div className="flex items-center border rounded-lg p-2 lg:p-6 bg-white shadow-sm">
      <div className="flex items-center justify-center bg-blue-100 rounded-lg p-2 lg:p-4 mr-4">
        <Icon className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
      </div>
      <div>
        {loading ? (
          <Skeleton className="h-12 w-20 mb-2" />
        ) : (
          <h3 className="text-3xl lg:text-5xl font-bold text-blue-600">
            {value}
          </h3>
        )}
        <p className="text-sm lg:text-lg text-gray-800">{label}</p>
      </div>
    </div>
  );
}
