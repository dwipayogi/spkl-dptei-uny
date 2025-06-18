import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FiEye } from "react-icons/fi";
import Link from "next/link";
import DocumentUploadForm from "./components/DocumentUploadForm";
import DocumentDeleteDialog from "./components/DocumentDeleteDialog";
import { getDocuments } from "./actions";

export default async function DokumenPage() {
  // Get documents from database
  const documents = await getDocuments();
  // Handle no data case
  const hasData = documents.length > 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-lg lg:text-3xl font-bold text-gray-800">
            Dokumen
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Unggah dokumen pendukung asesmen laboratorium
          </p>
        </div>{" "}
        <DocumentUploadForm />
      </div>

      {/* Dokumen List */}
      <Table>
        <TableCaption>
          Daftar dokumen yang telah diunggah untuk asesmen laboratorium
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Judul Dokumen</TableHead>
            <TableHead>Kategori</TableHead>
            <TableHead>Jenis File</TableHead>
            <TableHead>Ukuran File</TableHead>
            <TableHead>Diunggah Oleh</TableHead>
            <TableHead>Tanggal Unggah</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!hasData ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-6">
                Tidak ada dokumen yang tersedia.
              </TableCell>
            </TableRow>
          ) : (
            documents.map((doc, index) => (
              <TableRow key={doc.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{doc.title}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${doc.categoryColor}`}
                  >
                    {doc.category}
                  </span>
                </TableCell>
                <TableCell>{doc.fileType}</TableCell>
                <TableCell>{doc.formattedSize}</TableCell>
                <TableCell>{doc.uploadedBy}</TableCell>
                <TableCell>{doc.formattedDate}</TableCell>
                <TableCell className="flex space-x-2">
                  <Link href={`/dashboard/dokumen/view/${doc.id}`}>
                    <Button variant="outline" size="icon">
                      <FiEye className="h-4 w-4" />
                    </Button>
                  </Link>
                  <DocumentDeleteDialog
                    documentId={doc.id}
                    documentTitle={doc.title}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
