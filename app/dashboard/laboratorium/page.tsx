import { Card, CardContent } from "@/components/ui/card";
import { getLaboratories } from "./actions";
import { formatDate } from "@/lib/utils";
import LaboratoryTable from "./components/LaboratoryTable";
import AddLaboratoryDialog from "./components/AddLaboratoryDialog";

export default async function LaboratoriumPage() {
  // Get laboratories from database
  const laboratories = await getLaboratories();

  // Map database schema to UI requirements
  const mappedLaboratories = laboratories.map((lab) => ({
    id: lab.id,
    name: lab.name,
    personInCharge: lab.person,
    status: lab.percentage >= 75 ? "Memenuhi" : "Tidak Memenuhi",
    statusColor:
      lab.percentage >= 75
        ? "bg-green-100 text-green-800"
        : "bg-red-100 text-red-800",
    lastInspection: lab.lastInspection
      ? formatDate(new Date(lab.lastInspection))
      : "-",
    instrumentation: lab.percentage,
  }));

  // Handle no data case
  const hasData = mappedLaboratories.length > 0;

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Laboratorium</h1>
          <p className="text-gray-600 mt-2">
            Kelola dan monitor status laboratorium
          </p>
        </div>
        <AddLaboratoryDialog />
      </div>

      {/* Laboratory List */}
      {!hasData ? (
        <Card>
          <CardContent className="flex justify-center items-center p-10">
            <p className="text-gray-500">
              Tidak ada data laboratorium ditemukan
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent>
            <LaboratoryTable
              laboratories={mappedLaboratories}
              allLaboratories={laboratories}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
