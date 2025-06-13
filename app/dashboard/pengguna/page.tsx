import Card from "@/components/ui/card";
import Button from "@/components/ui/button";

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
      laboratorium: "Lab Elektronika Digital",
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
      laboratorium: "Lab Mikroprosesor",
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
      laboratorium: "Lab Sistem Embedded",
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

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="text-center">
          <div className="text-2xl mb-2">👥</div>
          <h3 className="text-lg font-semibold text-gray-800">
            Total Pengguna
          </h3>
          <p className="text-xl font-bold text-blue-600">24</p>
        </Card>

        <Card className="text-center">
          <div className="text-2xl mb-2">✅</div>
          <h3 className="text-lg font-semibold text-gray-800">Aktif</h3>
          <p className="text-xl font-bold text-green-600">20</p>
        </Card>

        <Card className="text-center">
          <div className="text-2xl mb-2">👑</div>
          <h3 className="text-lg font-semibold text-gray-800">Administrator</h3>
          <p className="text-xl font-bold text-purple-600">3</p>
        </Card>

        <Card className="text-center">
          <div className="text-2xl mb-2">🔧</div>
          <h3 className="text-lg font-semibold text-gray-800">Teknisi</h3>
          <p className="text-xl font-bold text-orange-600">8</p>
        </Card>
      </div>

      {/* User Management */}
      <Card>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Daftar Pengguna
          </h2>
          <div className="flex space-x-2">
            <Button className="bg-gray-500 hover:bg-gray-600 text-sm">
              Filter Role
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
                  Nama & Email
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Role
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Laboratorium
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Status
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Login Terakhir
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
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
                  <td className="py-4 px-4">
                    <div className="font-medium text-gray-800">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${user.roleColor}`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-600">
                    {user.laboratorium}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${user.statusColor}`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-600">{user.lastLogin}</td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      <Button className="bg-blue-500 hover:bg-blue-600 text-sm px-3 py-1">
                        Edit
                      </Button>
                      <Button className="bg-red-500 hover:bg-red-600 text-sm px-3 py-1">
                        Hapus
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Role Permissions */}
      <Card>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Hak Akses Role
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-purple-800 mb-2">
                Administrator
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Kelola semua laboratorium</li>
                <li>• Kelola pengguna dan role</li>
                <li>• Akses laporan lengkap</li>
                <li>• Konfigurasi sistem</li>
              </ul>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">Kepala Lab</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Kelola laboratorium yang ditugaskan</li>
                <li>• Monitor instrumen</li>
                <li>• Laporan laboratorium</li>
                <li>• Approve sertifikasi</li>
              </ul>
            </div>
          </div>
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">Teknisi</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Update status instrumen</li>
                <li>• Input data kalibrasi</li>
                <li>• Maintenance record</li>
                <li>• Laporan teknis</li>
              </ul>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-800 mb-2">Asisten</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Lihat data laboratorium</li>
                <li>• Input data penggunaan</li>
                <li>• Laporan harian</li>
                <li>• Notifikasi maintenance</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
