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
import { FiEye, FiDownload } from "react-icons/fi";
import Link from "next/link";
import { getDocuments } from "./actions";
import {
  getCategoryColor,
  formatFileSize,
  formatDate,
} from "@/lib/blob-config";
import DocumentDeleteDialog from "./components/DocumentDeleteDialog";

export default async function DokumenPage() {
  const documents = await getDocuments();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-lg lg:text-3xl font-bold text-gray-800">
            Dokumen
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Kelola dokumen pendukung asesmen laboratorium
          </p>
        </div>
        <Link href="/dashboard/dokumen/upload">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Unggah Dokumen
          </Button>
        </Link>
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
          {documents.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-6">
                Belum ada dokumen yang diunggah.
              </TableCell>
            </TableRow>
          ) : (
            documents.map((doc, index) => (
              <TableRow key={doc.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{doc.title}</div>
                    {doc.description && (
                      <div className="text-sm text-gray-500">
                        {doc.description}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                      doc.category
                    )}`}
                  >
                    {doc.category}
                  </span>
                </TableCell>
                <TableCell>{doc.fileType.toUpperCase()}</TableCell>
                <TableCell>{formatFileSize(doc.fileSize)}</TableCell>
                <TableCell>{doc.uploadedBy}</TableCell>
                <TableCell>
                  {formatDate(new Date(doc.createdAt))}
                </TableCell>
                <TableCell className="flex space-x-2">
                  <Link
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="icon" title="Lihat dokumen">
                      <FiEye className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href={doc.url} download={doc.filename}>
                    <Button variant="outline" size="icon" title="Unduh dokumen">
                      <FiDownload className="h-4 w-4" />
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
