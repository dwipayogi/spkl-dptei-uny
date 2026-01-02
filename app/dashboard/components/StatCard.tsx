import { IconType } from "react-icons";

interface StatCardProps {
  icon: IconType;
  value: string | number;
  label: string;
}

export function StatCard({ icon: Icon, value, label }: StatCardProps) {
  return (
    <div className="flex items-center border rounded-lg p-2 lg:p-6 bg-white shadow-sm">
      <div className="flex items-center justify-center bg-blue-100 rounded-lg p-2 lg:p-4 mr-4">
        <Icon className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" />
      </div>
      <div>
        <h3 className="text-3xl lg:text-5xl font-bold text-blue-600">
          {value}
        </h3>
        <p className="text-sm lg:text-lg text-gray-800">{label}</p>
      </div>
    </div>
  );
}

// Skeleton component for Suspense fallback
export function StatCardSkeleton() {
  return (
    <div className="flex items-center border rounded-lg p-2 lg:p-6 bg-white shadow-sm animate-pulse">
      <div className="flex items-center justify-center bg-blue-100 rounded-lg p-2 lg:p-4 mr-4">
        <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-gray-200 rounded" />
      </div>
      <div>
        <div className="h-12 w-20 bg-gray-200 rounded mb-2" />
        <div className="h-4 w-24 bg-gray-200 rounded" />
      </div>
    </div>
  );
}

