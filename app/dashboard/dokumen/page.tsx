import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FiEye } from "react-icons/fi";

export default function DokumenPage() {
  // Contoh data dokumen yang telah diunggah
  const documents = [
    {
      id: 1,
      title: "Panduan Standar ISO/IEC 17025:2017",
      description:
        "Dokumen panduan untuk sertifikasi laboratorium ISO/IEC 17025:2017",
      category: "Panduan",
      categoryColor: "bg-blue-100 text-blue-800",
      uploadedBy: "Admin SPKL",
      uploadedDate: "10 Mei 2025",
      fileType: "PDF",
      fileSize: "2.3 MB",
    },
    {
      id: 2,
      title: "Template Laporan Asesmen",
      description: "Template standar untuk laporan asesmen laboratorium",
      category: "Template",
      categoryColor: "bg-green-100 text-green-800",
      uploadedBy: "Admin SPKL",
      uploadedDate: "15 Apr 2025",
      fileType: "DOCX",
      fileSize: "1.1 MB",
    },
    {
      id: 3,
      title: "Checklist Evaluasi Laboratorium",
      description: "Daftar periksa untuk evaluasi kepatuhan laboratorium",
      category: "Checklist",
      categoryColor: "bg-yellow-100 text-yellow-800",
      uploadedBy: "Admin SPKL",
      uploadedDate: "20 Mar 2025",
      fileType: "XLSX",
      fileSize: "0.8 MB",
    },
    {
      id: 4,
      title: "SOP Kalibrasi Peralatan",
      description:
        "Standar Operasional Prosedur untuk kalibrasi peralatan laboratorium",
      category: "SOP",
      categoryColor: "bg-purple-100 text-purple-800",
      uploadedBy: "Admin SPKL",
      uploadedDate: "05 Jun 2025",
      fileType: "PDF",
      fileSize: "1.5 MB",
    },
  ];

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
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Tambah Dokumen
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Dokumen</DialogTitle>
              <DialogDescription>
                Unggah dokumen pendukung asesmen laboratorium
              </DialogDescription>
            </DialogHeader>
            <Label htmlFor="document-title">
              Judul Dokumen
            </Label>
            <Input type="text" placeholder="Judul Dokumen" />

            <Label htmlFor="document-description">
              Deskripsi Dokumen
            </Label>
            <Input
              type="text"
              placeholder="Deskripsi Dokumen"
            />

            <Label htmlFor="document-category">Kategori Dokumen</Label>
            <Input
              type="text"
              placeholder="Kategori Dokumen (e.g. Panduan, Template, Checklist)"
            />

            <Label htmlFor="document-file">Unggah File</Label>
            <p className="text-xs text-gray-500">
              Pilih file PDF, DOC, XLSX atau DOCX untuk diunggah
            </p>
            <Input type="file" accept=".pdf,.doc,.docx,.xlsx" />
            <DialogFooter>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Unggah
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
          {documents.map((doc, index) => (
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
              <TableCell>{doc.fileSize}</TableCell>
              <TableCell>{doc.uploadedBy}</TableCell>
              <TableCell>{doc.uploadedDate}</TableCell>
              <TableCell className="flex space-x-2">
                <Button>
                  <FiEye />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
