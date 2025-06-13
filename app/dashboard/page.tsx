import Card from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Sistem Pengukuran Kelayakan Laboratorium ISO/IEC 17025:2017
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="text-center">
          <div className="text-3xl mb-2">🔬</div>
          <h3 className="text-lg font-semibold text-gray-800">Total Lab</h3>
          <p className="text-2xl font-bold text-blue-600">12</p>
        </Card>

        <Card className="text-center">
          <div className="text-3xl mb-2">⚙️</div>
          <h3 className="text-lg font-semibold text-gray-800">Instrumen</h3>
          <p className="text-2xl font-bold text-green-600">48</p>
        </Card>

        <Card className="text-center">
          <div className="text-3xl mb-2">✅</div>
          <h3 className="text-lg font-semibold text-gray-800">Sertifikat</h3>
          <p className="text-2xl font-bold text-purple-600">8</p>
        </Card>

        <Card className="text-center">
          <div className="text-3xl mb-2">👥</div>
          <h3 className="text-lg font-semibold text-gray-800">Pengguna</h3>
          <p className="text-2xl font-bold text-orange-600">24</p>
        </Card>
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Aktivitas Terbaru
          </h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div>
                <p className="font-medium">
                  Lab Elektronika telah disertifikasi
                </p>
                <p className="text-sm text-gray-500">2 jam yang lalu</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div>
                <p className="font-medium">Instrumen baru ditambahkan</p>
                <p className="text-sm text-gray-500">5 jam yang lalu</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div>
                <p className="font-medium">Evaluasi lab dalam proses</p>
                <p className="text-sm text-gray-500">1 hari yang lalu</p>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Status Laboratorium
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Tersertifikasi</span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                8 Lab
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Dalam Proses</span>
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                3 Lab
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Perlu Evaluasi</span>
              <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                1 Lab
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
