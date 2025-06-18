import { getDocument } from "../../actions";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FiDownload, FiArrowLeft } from "react-icons/fi";

export default async function DocumentPreviewPage({
  params,
}: {
  params: { id: string };
}) {
  const id = parseInt(params.id);
  const document = await getDocument(id);

  if (!document) {
    notFound();
  }

  // Function to determine if the file can be previewed in an iframe
  const canPreview = (fileType: string) => {
    return ["PDF"].includes(fileType);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard/dokumen">
            <Button variant="outline" size="icon">
              <FiArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-lg lg:text-3xl font-bold text-gray-800">
              {document.title}
            </h1>
            <p className="text-sm text-gray-600 mt-2">{document.description}</p>
          </div>
        </div>
        <a href={document.url} download target="_blank" rel="noreferrer">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <FiDownload className="mr-2 h-4 w-4" /> Unduh
          </Button>
        </a>
      </div>

      {/* Document Info */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-500">Kategori</p>
          <p className="font-medium">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${document.categoryColor}`}
            >
              {document.category}
            </span>
          </p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-500">Tipe File</p>
          <p className="font-medium">{document.fileType}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-500">Ukuran File</p>
          <p className="font-medium">{document.formattedSize}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-500">Tanggal Unggah</p>
          <p className="font-medium">{document.formattedDate}</p>
        </div>
      </div>

      {/* Document Preview */}
      <div className="border rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Pratinjau Dokumen</h2>
        {canPreview(document.fileType) ? (
          <iframe
            src={`${document.url}#view=fitH`}
            className="w-full h-[800px] border rounded"
            title={document.title}
          />
        ) : (
          <div className="flex flex-col items-center justify-center p-10 bg-gray-50 rounded-lg">
            <p className="text-gray-500 mb-4">
              Pratinjau tidak tersedia untuk file ini.
            </p>
            <a href={document.url} download target="_blank" rel="noreferrer">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <FiDownload className="mr-2 h-4 w-4" /> Unduh File
              </Button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
