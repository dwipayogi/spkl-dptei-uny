import Card from "@/components/ui/card";

import { FiList } from "react-icons/fi";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="flex items-center">
          <div className="flex items-center justify-center bg-blue-100 rounded-lg p-4 mr-4">
            <FiList className="w-12 h-12" />
          </div>
          <div>
            <h3 className="text-5xl font-bold text-blue-600">12</h3>
            <p className="text-lg text-gray-800">Total Laboratorium</p>
          </div>
        </Card>

        <Card className="flex items-center">
          <div className="flex items-center justify-center bg-blue-100 rounded-lg p-4 mr-4">
            <FiList className="w-12 h-12" />
          </div>
          <div>
            <h3 className="text-5xl font-bold text-blue-600">90%</h3>
            <p className="text-lg text-gray-800">Total Kepatuhan</p>
          </div>
        </Card>

        <Card className="flex items-center">
          <div className="flex items-center justify-center bg-blue-100 rounded-lg p-4 mr-4">
            <FiList className="w-12 h-12" />
          </div>
          <div>
            <h3 className="text-5xl font-bold text-blue-600">3</h3>
            <p className="text-lg text-gray-800">Total Dokumen</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
