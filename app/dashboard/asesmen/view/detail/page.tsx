import {
  getLabAssessmentDetails,
  getLabAssessmentResults,
  getLabAssessmentNotes,
} from "../actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import {
  FiArrowLeft,
  FiFileText,
  FiDownload,
} from "react-icons/fi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function getAnswerColor(answer: string): string {
  switch (answer) {
    case "Ya":
      return "bg-green-100 text-green-800";
    case "Sebagian":
      return "bg-yellow-100 text-yellow-800";
    case "Tidak":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

export default async function AssessmentDetailPage({
  searchParams,
}: {
  searchParams: { labId?: string; periodId?: string };
}) {
  // Check if labId and periodId are provided
  const labId = searchParams.labId ? parseInt(searchParams.labId) : null;
  const periodId = searchParams.periodId
    ? parseInt(searchParams.periodId)
    : null;

  // If missing required parameters, show error
  if (!labId || !periodId) {
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
            Detail Asesmen
          </h1>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="text-center py-10">
              <p className="text-gray-600">Parameter tidak lengkap.</p>
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

  // Get assessment results for context
  const assessmentResultsForLab = await getLabAssessmentResults(labId);
  const currentAssessment = assessmentResultsForLab.find(
    (result) => result.period_id === periodId
  );

  // Get assessment details for this lab and period
  const assessmentDetails = await getLabAssessmentDetails(labId, periodId);

  // Get assessment notes
  const assessmentNotes = await getLabAssessmentNotes(labId, periodId);

  // If assessment not found, show error
  if (!currentAssessment) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Link href={`/dashboard/asesmen/view?labId=${labId}`}>
            <Button variant="outline" size="sm" className="gap-1">
              <FiArrowLeft className="size-4" />
              Kembali
            </Button>
          </Link>
          <h1 className="text-xl lg:text-3xl font-bold text-gray-800">
            Detail Asesmen
          </h1>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="text-center py-10">
              <p className="text-gray-600">Data asesmen tidak ditemukan.</p>
              <Link
                href={`/dashboard/asesmen/view?labId=${labId}`}
                className="text-blue-600 mt-2 block"
              >
                Kembali ke daftar asesmen
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Process assessment statistics
  const totalQuestions = assessmentDetails.length;
  const conformingAnswers = assessmentDetails.filter(
    (detail) => detail.answer === "Ya"
  ).length;
  const partiallyConformingAnswers = assessmentDetails.filter(
    (detail) => detail.answer === "Sebagian"
  ).length;
  const nonConformingAnswers = assessmentDetails.filter(
    (detail) => detail.answer === "Tidak"
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href={`/dashboard/asesmen/view?labId=${labId}`}>
          <Button variant="outline" size="sm" className="gap-1">
            <FiArrowLeft className="size-4" />
            Kembali
          </Button>
        </Link>
        <h1 className="text-xl lg:text-3xl font-bold text-gray-800">
          Detail Asesmen
        </h1>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="bg-blue-50">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg text-blue-900">
                {currentAssessment.lab_name}
              </CardTitle>
              <p className="text-sm text-blue-700">
                {currentAssessment.period_title} (
                {formatDate(new Date(currentAssessment.startDate))} -{" "}
                {formatDate(new Date(currentAssessment.endDate))})
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">
                {currentAssessment.percentage}%
              </div>
              <div className="text-sm text-gray-500">Tingkat Kesesuaian</div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 flex flex-col items-center justify-center text-green-700">
                <div className="text-3xl font-bold">{conformingAnswers}</div>
                <div className="text-sm text-center">Memenuhi Persyaratan</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex flex-col items-center justify-center text-yellow-700">
                <div className="text-3xl font-bold">
                  {partiallyConformingAnswers}
                </div>
                <div className="text-sm text-center">Memenuhi Sebagian</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex flex-col items-center justify-center text-red-700">
                <div className="text-3xl font-bold">{nonConformingAnswers}</div>
                <div className="text-sm text-center">Belum Memenuhi</div>
              </CardContent>
            </Card>
          </div>
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FiFileText /> Hasil Asesmen
            </h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-20">Kode</TableHead>
                    <TableHead>Pertanyaan</TableHead>
                    <TableHead className="w-28">Kondisi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assessmentDetails.map((detail) => (
                    <TableRow key={detail.id}>
                      <TableCell className="font-medium">
                        {detail.code}
                      </TableCell>
                      <TableCell>{detail.question}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${getAnswerColor(
                            detail.answer
                          )}`}
                        >
                          {detail.answer}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          {assessmentNotes?.notes && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-2">Catatan</h3>
              <div className="p-4 bg-gray-50 border rounded-md">
                <p className="whitespace-pre-line">{assessmentNotes.notes}</p>
              </div>
            </div>
          )}
          {assessmentNotes?.file_url && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Dokumen Pendukung</h3>
              <Link
                href={assessmentNotes.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
              >
                <FiDownload />
                <span>{assessmentNotes.file_url}</span>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
