import Card from "@/components/ui/card";
import Button from "@/components/ui/button";

export default function InstrumenPage() {
  const instruments = [
    {
      id: 1,
      name: "Oscilloscope Digital",
      brand: "Tektronix",
      model: "TBS1052B",
      laboratory: "Lab Elektronika Digital",
      status: "Aktif",
      statusColor: "bg-green-100 text-green-800",
      calibration: "Valid",
      nextCalibration: "25 Jun 2025",
    },
    {
      id: 2,
      name: "Multimeter Digital",
      brand: "Fluke",
      model: "117",
      laboratory: "Lab Elektronika Digital",
      status: "Aktif",
      statusColor: "bg-green-100 text-green-800",
      calibration: "Valid",
      nextCalibration: "15 Jul 2025",
    },
    {
      id: 3,
      name: "Function Generator",
      brand: "Rigol",
      model: "DG1022Z",
      laboratory: "Lab Mikroprosesor",
      status: "Maintenance",
      statusColor: "bg-yellow-100 text-yellow-800",
      calibration: "Expired",
      nextCalibration: "01 Feb 2025",
    },
    {
      id: 4,
      name: "Power Supply",
      brand: "Keysight",
      model: "E3631A",
      laboratory: "Lab Sistem Embedded",
      status: "Aktif",
      statusColor: "bg-green-100 text-green-800",
      calibration: "Valid",
      nextCalibration: "10 Aug 2025",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Instrumen</h1>
          <p className="text-gray-600 mt-2">
            Kelola dan monitor instrumen laboratorium
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          + Tambah Instrumen
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="text-center">
          <div className="text-2xl mb-2">⚙️</div>
          <h3 className="text-lg font-semibold text-gray-800">Total</h3>
          <p className="text-xl font-bold text-blue-600">48 Unit</p>
        </Card>

        <Card className="text-center">
          <div className="text-2xl mb-2">✅</div>
          <h3 className="text-lg font-semibold text-gray-800">Aktif</h3>
          <p className="text-xl font-bold text-green-600">42 Unit</p>
        </Card>

        <Card className="text-center">
          <div className="text-2xl mb-2">🔧</div>
          <h3 className="text-lg font-semibold text-gray-800">Maintenance</h3>
          <p className="text-xl font-bold text-yellow-600">4 Unit</p>
        </Card>

        <Card className="text-center">
          <div className="text-2xl mb-2">❌</div>
          <h3 className="text-lg font-semibold text-gray-800">Rusak</h3>
          <p className="text-xl font-bold text-red-600">2 Unit</p>
        </Card>
      </div>

      {/* Instruments List */}
      <Card>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Daftar Instrumen
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
                  Nama Instrumen
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Brand/Model
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Laboratorium
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Status
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Kalibrasi
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {instruments.map((instrument) => (
                <tr
                  key={instrument.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-4 px-4">
                    <div className="font-medium text-gray-800">
                      {instrument.name}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-gray-800">{instrument.brand}</div>
                    <div className="text-sm text-gray-500">
                      {instrument.model}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-600">
                    {instrument.laboratory}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${instrument.statusColor}`}
                    >
                      {instrument.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-gray-800">
                      {instrument.calibration}
                    </div>
                    <div className="text-sm text-gray-500">
                      Next: {instrument.nextCalibration}
                    </div>
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
