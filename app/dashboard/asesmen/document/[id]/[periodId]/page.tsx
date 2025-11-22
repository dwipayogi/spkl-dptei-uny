import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FiDownload, FiArrowLeft } from "react-icons/fi";
import sql from "@/db/db";

async function getAssessmentDocument(id: number, periodId: number) {
  try {
    const result = await sql`
      SELECT * FROM "AssessmentAnswer"
      WHERE "lab_id" = ${id} AND "period_id" = ${periodId} AND "file_url" IS NOT NULL
      LIMIT 1
    `;

    if (result.length === 0) return null;

    return result[0];
  } catch (error) {
    console.error("Error fetching assessment document:", error);
    return null;
  }
}

export default async function AssessmentDocumentPreviewPage({
  params,
}: {
  params: Promise<{ id: string; periodId: string }>;
}) {
  const { id, periodId: periodIdParam } = await params;
  const labId = parseInt(id);
  const periodId = parseInt(periodIdParam);

  // Fetch the assessment answer that contains the document
  const document = await getAssessmentDocument(labId, periodId);

  if (!document || !document.file_url) {
    notFound();
  }

  // Function to determine if the file can be previewed in an iframe
  const canPreview = (fileUrl: string) => {
    const fileExtension = fileUrl.split(".").pop()?.toLowerCase() || "";
    return ["pdf"].includes(fileExtension);
  };

  // Extract filename from URL (for future use)
  // const filename = document.file_url.split("/").pop() || "document";

  // Get laboratory name
  const labResult = await sql`
    SELECT "name" FROM "Laboratory" WHERE "id" = ${labId}
  `;

  const labName =
    labResult.length > 0 ? labResult[0].name : "Unknown Laboratory";

  // Get period title
  const periodResult = await sql`
    SELECT "title" FROM "AssessmentPeriod" WHERE "id" = ${periodId}
  `;

  const periodTitle =
    periodResult.length > 0 ? periodResult[0].title : "Unknown Period";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href={`/dashboard/asesmen/view?labId=${labId}`}>
            <Button variant="outline" size="icon">
              <FiArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-lg lg:text-3xl font-bold text-gray-800">
              Dokumen Asesmen
            </h1>
            <p className="text-sm text-gray-600 mt-2">
              {labName} - {periodTitle}
            </p>
          </div>
        </div>
        <a href={document.file_url} download target="_blank" rel="noreferrer">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <FiDownload className="mr-2 h-4 w-4" /> Unduh
          </Button>
        </a>
      </div>

      {/* Document Preview */}
      <div className="border rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Pratinjau Dokumen</h2>
        {canPreview(document.file_url) ? (
          <iframe
            src={`${document.file_url}#view=fitH`}
            className="w-full h-[800px] border rounded"
            title="Document Preview"
          />
        ) : (
          <div className="flex flex-col items-center justify-center p-10 bg-gray-50 rounded-lg">
            <p className="text-gray-500 mb-4">
              Pratinjau tidak tersedia untuk file ini.
            </p>
            <a
              href={document.file_url}
              download
              target="_blank"
              rel="noreferrer"
            >
              <Button className="bg-blue-600 hover:bg-blue-700">
                <FiDownload className="mr-2 h-4 w-4" /> Unduh File
              </Button>
            </a>
          </div>
        )}
      </div>

      {/* Assessment Notes */}
      {document.notes && (
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Catatan Asesmen</h2>
          <p className="whitespace-pre-wrap">{document.notes}</p>
        </div>
      )}
    </div>
  );
}
