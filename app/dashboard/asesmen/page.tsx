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
          <h1 className="text-3xl font-bold text-gray-800">Asesmen</h1>
          <p className="text-gray-600 mt-2">
            Lakukan asesmen terhadap instrumen laboratorium berstandar ISO/IEC 17025:2017
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          + Tambah Instrumen
        </Button>
      </div>
    </div>
  );
}
