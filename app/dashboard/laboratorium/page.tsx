import Card from "@/components/ui/card";
import Button from "@/components/ui/button";

export default function LaboratoriumPage() {
  const laboratories = [
    {
      id: 1,
      name: "Lab Elektronika Digital",
      status: "Tersertifikasi",
      statusColor: "bg-green-100 text-green-800",
      lastInspection: "15 Jan 2025",
      instruments: 12,
      certification: "ISO/IEC 17025:2017",
    },
    {
      id: 2,
      name: "Lab Mikroprosesor",
      status: "Dalam Proses",
      statusColor: "bg-yellow-100 text-yellow-800",
      lastInspection: "20 Des 2024",
      instruments: 8,
      certification: "Pending",
    },
    {
      id: 3,
      name: "Lab Jaringan Komputer",
      status: "Tersertifikasi",
      statusColor: "bg-green-100 text-green-800",
      lastInspection: "10 Jan 2025",
      instruments: 15,
      certification: "ISO/IEC 17025:2017",
    },
    {
      id: 4,
      name: "Lab Sistem Embedded",
      status: "Perlu Evaluasi",
      statusColor: "bg-red-100 text-red-800",
      lastInspection: "05 Nov 2024",
      instruments: 6,
      certification: "Expired",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Laboratorium</h1>
          <p className="text-gray-600 mt-2">
            Kelola dan monitor status laboratorium
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">+ Tambah Lab</Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center">
          <div className="text-2xl mb-2">✅</div>
          <h3 className="text-lg font-semibold text-gray-800">
            Tersertifikasi
          </h3>
          <p className="text-xl font-bold text-green-600">8 Lab</p>
        </Card>

        <Card className="text-center">
          <div className="text-2xl mb-2">⏳</div>
          <h3 className="text-lg font-semibold text-gray-800">Dalam Proses</h3>
          <p className="text-xl font-bold text-yellow-600">3 Lab</p>
        </Card>

        <Card className="text-center">
          <div className="text-2xl mb-2">⚠️</div>
          <h3 className="text-lg font-semibold text-gray-800">
            Perlu Evaluasi
          </h3>
          <p className="text-xl font-bold text-red-600">1 Lab</p>
        </Card>
      </div>

      {/* Laboratory List */}
      <Card>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Daftar Laboratorium
          </h2>
          <div className="flex space-x-2">
            <Button className="bg-gray-500 hover:bg-gray-600 text-sm">
              Filter
            </Button>
            <Button className="bg-gray-500 hover:bg-gray-600 text-sm">
              Export
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Nama Laboratorium
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Status
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Instrumen
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Sertifikasi
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Inspeksi Terakhir
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {laboratories.map((lab) => (
                <tr
                  key={lab.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-4 px-4">
                    <div className="font-medium text-gray-800">{lab.name}</div>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${lab.statusColor}`}
                    >
                      {lab.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-600">
                    {lab.instruments} unit
                  </td>
                  <td className="py-4 px-4 text-gray-600">
                    {lab.certification}
                  </td>
                  <td className="py-4 px-4 text-gray-600">
                    {lab.lastInspection}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      <Button className="bg-blue-500 hover:bg-blue-600 text-sm px-3 py-1">
                        Detail
                      </Button>
                      <Button className="bg-gray-500 hover:bg-gray-600 text-sm px-3 py-1">
                        Edit
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
