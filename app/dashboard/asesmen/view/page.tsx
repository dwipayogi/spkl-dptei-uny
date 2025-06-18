import { getLabAssessmentResults } from "./actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { FiArrowLeft, FiEye } from "react-icons/fi";

export default async function LabAssessmentViewPage({
  searchParams,
}: {
  searchParams: { labId?: string };
}) {
  // Check if labId is provided
  const labId = searchParams.labId ? parseInt(searchParams.labId) : null;

  // If no labId, show error message
  if (!labId) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Link href="/dashboard/asesmen">
            <Button variant="outline" size="sm" className="gap-1">
              <FiArrowLeft className="size-4" />
              Kembali
            </Button>
          </Link>
          <h1 className="text-xl lg:text-3xl font-bold text-gray-800">
            Hasil Asesmen
          </h1>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="text-center py-10">
              <p className="text-gray-600">ID Laboratorium tidak ditemukan.</p>
              <Link
                href="/dashboard/asesmen"
                className="text-blue-600 mt-2 block"
              >
                Kembali ke halaman asesmen
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Get assessment results for this lab
  const assessmentResults = await getLabAssessmentResults(labId);

  // Check if we have results
  const hasResults = assessmentResults.length > 0;

  // Get lab name from the first result if available
  const labName = hasResults ? assessmentResults[0].lab_name : "Laboratorium";

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/dashboard/asesmen">
          <Button variant="outline" size="sm" className="gap-1">
            <FiArrowLeft className="size-4" />
            Kembali
          </Button>
        </Link>
        <h1 className="text-xl lg:text-3xl font-bold text-gray-800">
          Hasil Asesmen {labName}
        </h1>
      </div>

      {!hasResults ? (
        <Card>
          <CardContent className="p-6">
            <div className="text-center py-10">
              <p className="text-gray-600">
                Tidak ada hasil asesmen untuk laboratorium ini.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {assessmentResults.map((result) => (
            <Card key={result.period_id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-blue-50 p-4 border-b">
                  <h3 className="font-semibold text-lg text-blue-900">
                    {result.period_title}
                  </h3>
                  <p className="text-sm text-blue-700">
                    {formatDate(new Date(result.startDate))} -{" "}
                    {formatDate(new Date(result.endDate))}
                  </p>
                </div>
                <div className="p-5 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">
                        Tingkat Kesesuaian
                      </p>
                      <p className="text-lg font-bold">{result.percentage}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">
                        Terakhir Diperbarui
                      </p>
                      <p className="text-sm">
                        {result.lastInspection
                          ? formatDate(new Date(result.lastInspection))
                          : "-"}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Link
                      href={`/dashboard/asesmen/view/detail?labId=${result.lab_id}&periodId=${result.period_id}`}
                    >
                      <Button variant="outline" className="gap-2">
                        <FiEye className="size-4" />
                        Lihat Detail
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
