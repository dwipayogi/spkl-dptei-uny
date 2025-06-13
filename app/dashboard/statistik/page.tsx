import Card from "@/components/ui/card";
import Button from "@/components/ui/button";

export default function StatistikPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Statistik</h1>
          <p className="text-gray-600 mt-2">
            Analisis dan laporan sistem laboratorium
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Export Laporan
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="text-center">
          <div className="text-2xl mb-2">📈</div>
          <h3 className="text-lg font-semibold text-gray-800">
            Tingkat Kepatuhan
          </h3>
          <p className="text-2xl font-bold text-green-600">92%</p>
        </Card>

        <Card className="text-center">
          <div className="text-2xl mb-2">🎯</div>
          <h3 className="text-lg font-semibold text-gray-800">
            Target Sertifikasi
          </h3>
          <p className="text-2xl font-bold text-blue-600">85%</p>
        </Card>

        <Card className="text-center">
          <div className="text-2xl mb-2">⏱️</div>
          <h3 className="text-lg font-semibold text-gray-800">
            Rata-rata Waktu
          </h3>
          <p className="text-2xl font-bold text-purple-600">45 Hari</p>
        </Card>

        <Card className="text-center">
          <div className="text-2xl mb-2">💰</div>
          <h3 className="text-lg font-semibold text-gray-800">
            Efisiensi Biaya
          </h3>
          <p className="text-2xl font-bold text-orange-600">78%</p>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Status Sertifikasi Lab
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Tersertifikasi</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: "67%" }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600">8/12</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Dalam Proses</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full"
                    style={{ width: "25%" }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600">3/12</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Perlu Evaluasi</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full"
                    style={{ width: "8%" }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600">1/12</span>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Distribusi Instrumen
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Aktif</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: "87%" }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600">42/48</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Maintenance</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full"
                    style={{ width: "8%" }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600">4/48</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Rusak</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full"
                    style={{ width: "4%" }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600">2/48</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Monthly Performance */}
      <Card>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Kinerja Bulanan
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Bulan
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Sertifikasi Baru
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Instrumen Dikalibrasi
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Tingkat Kepatuhan
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 font-medium">Januari 2025</td>
                <td className="py-3 px-4">2</td>
                <td className="py-3 px-4">8</td>
                <td className="py-3 px-4">95%</td>
                <td className="py-3 px-4">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                    Baik
                  </span>
                </td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 font-medium">Desember 2024</td>
                <td className="py-3 px-4">1</td>
                <td className="py-3 px-4">12</td>
                <td className="py-3 px-4">88%</td>
                <td className="py-3 px-4">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                    Baik
                  </span>
                </td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 font-medium">November 2024</td>
                <td className="py-3 px-4">0</td>
                <td className="py-3 px-4">6</td>
                <td className="py-3 px-4">75%</td>
                <td className="py-3 px-4">
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm">
                    Cukup
                  </span>
                </td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 font-medium">Oktober 2024</td>
                <td className="py-3 px-4">3</td>
                <td className="py-3 px-4">15</td>
                <td className="py-3 px-4">92%</td>
                <td className="py-3 px-4">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                    Baik
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
