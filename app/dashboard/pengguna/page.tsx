import Card from "@/components/ui/card";
import Button from "@/components/ui/button";
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";

export default function PenggunaPage() {
  const users = [
    {
      id: 1,
      name: "Dr. Ahmad Suryadi",
      email: "ahmad.suryadi@uny.ac.id",
      role: "Administrator",
      roleColor: "bg-purple-100 text-purple-800",
      status: "Aktif",
      statusColor: "bg-green-100 text-green-800",
      lastLogin: "2 jam yang lalu",
      laboratorium: "Lab Pemrograman dan Sistem Informasi",
    },
    {
      id: 2,
      name: "Prof. Siti Rahayu",
      email: "siti.rahayu@uny.ac.id",
      role: "Kepala Lab",
      roleColor: "bg-blue-100 text-blue-800",
      status: "Aktif",
      statusColor: "bg-green-100 text-green-800",
      lastLogin: "1 hari yang lalu",
      laboratorium: "Lab Multimedia",
    },
    {
      id: 3,
      name: "Budi Santoso, M.T.",
      email: "budi.santoso@uny.ac.id",
      role: "Teknisi",
      roleColor: "bg-gray-100 text-gray-800",
      status: "Aktif",
      statusColor: "bg-green-100 text-green-800",
      lastLogin: "3 jam yang lalu",
      laboratorium: "Lab Jaringan Komputer",
    },
    {
      id: 4,
      name: "Andi Wijaya",
      email: "andi.wijaya@uny.ac.id",
      role: "Asisten",
      roleColor: "bg-yellow-100 text-yellow-800",
      status: "Tidak Aktif",
      statusColor: "bg-red-100 text-red-800",
      lastLogin: "2 minggu yang lalu",
      laboratorium: "Lab Artificial Intelligence",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Pengguna</h1>
          <p className="text-gray-600 mt-2">
            Kelola akun dan hak akses pengguna sistem
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          + Tambah Pengguna
        </Button>
      </div>

      {/* User Management */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              {" "}
              <tr className="border-b border-gray-200">
                <th className="text-center py-3 px-4 font-semibold text-gray-700">
                  Nama & Email
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">
                  Role
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">
                  Laboratorium
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  {" "}
                  <td className="py-4 px-4 text-left">
                    <div className="font-medium text-gray-800">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${user.roleColor}`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-600 text-left">
                    {user.laboratorium}
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
