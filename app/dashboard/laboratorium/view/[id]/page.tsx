import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { getLaboratory } from "../../actions";
import { formatDate } from "@/lib/utils";

interface ViewLaboratoryPageParams {
  params: Promise<{
    id: string;
  }>;
}

export default async function ViewLaboratoryPage({
  params,
}: ViewLaboratoryPageParams) {
  const { id: idParam } = await params;
  const id = parseInt(idParam, 10);

  if (isNaN(id)) {
    notFound();
  }

  const laboratory = await getLaboratory(id);

  if (!laboratory) {
    notFound();
  }

  // Determine status based on percentage
  const status = laboratory.percentage >= 75 ? "Memenuhi" : "Tidak Memenuhi";
  const statusColor =
    laboratory.percentage >= 75
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Detail Laboratorium
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{laboratory.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Penanggung Jawab
              </h3>
              <p className="mt-1">{laboratory.person}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Tingkat Kesesuaian
              </h3>
              <p className="mt-1">{laboratory.percentage}%</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Status</h3>
              <Badge className={statusColor}>{status}</Badge>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Inspeksi Terakhir
              </h3>
              <p className="mt-1">
                {laboratory.lastInspection
                  ? formatDate(new Date(laboratory.lastInspection))
                  : "-"}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Dibuat Pada</h3>
              <p className="mt-1">
                {formatDate(new Date(laboratory.createdAt))}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Diperbarui Pada
              </h3>
              <p className="mt-1">
                {formatDate(new Date(laboratory.updatedAt))}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button asChild variant="outline">
            <Link href={`/dashboard/laboratorium/edit/${laboratory.id}`}>
              Edit
            </Link>
          </Button>
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link href="/dashboard/laboratorium">Kembali</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
