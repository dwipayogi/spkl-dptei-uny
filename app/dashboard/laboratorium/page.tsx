import Card from "@/components/ui/card";
import Button from "@/components/ui/button";
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";

export default function LaboratoriumPage() {
  const laboratories = [
    {
      id: 1,
      name: "Lab Pemrograman dan Sistem Informasi",
      personInCharge: "Dr. Budi Santoso",
      status: "Tersertifikasi",
      statusColor: "bg-green-100 text-green-800",
      lastInspection: "15 Jan 2025",
      instruments: 90,
    },
    {
      id: 2,
      name: "Lab Multimedia",
      personInCharge: "Dr. Rina Wijaya",
      status: "Dalam Proses",
      statusColor: "bg-yellow-100 text-yellow-800",
      lastInspection: "20 Des 2024",
      instruments: 65,
    },
    {
      id: 3,
      name: "Lab Jaringan Komputer",
      personInCharge: "Prof. Ahmad Sulaiman",
      status: "Tersertifikasi",
      statusColor: "bg-green-100 text-green-800",
      lastInspection: "10 Jan 2025",
      instruments: 67,
    },
    {
      id: 4,
      name: "Lab Artificial Intelligence",
      personInCharge: "Dr. Dewi Kartika",
      status: "Perlu Evaluasi",
      statusColor: "bg-red-100 text-red-800",
      lastInspection: "05 Nov 2024",
      instruments: 76,
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
      </div>{" "}
      {/* Laboratory List */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-center py-3 px-4 font-semibold text-gray-700">
                  Nama Laboratorium
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">
                  Penanggung Jawab
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">
                  Tingkat Kepatuhan
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">
                  Status
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">
                  Asesmen Terakhir
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">
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
                  <td className="py-4 px-4 text-gray-600">
                    {lab.personInCharge}
                  </td>
                  <td className="py-4 px-4 text-gray-600 text-center">
                    {lab.instruments}%
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${lab.statusColor}`}
                    >
                      {lab.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-600 text-center">
                    {lab.lastInspection}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center space-x-3">
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        title="Detail"
                      >
                        <FiEye size={18} />
                      </button>
                      <button
                        className="text-gray-600 hover:text-gray-800"
                        title="Edit"
                      >
                        <FiEdit size={18} />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800"
                        title="Delete"
                      >
                        <FiTrash2 size={18} />
                      </button>
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
