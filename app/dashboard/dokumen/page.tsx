"use client";

import Card from "@/components/ui/card";
import Button from "@/components/ui/button";
import Dialog from "@/components/ui/dialog";
import Input from "@/components/ui/input";
import { FiDownload, FiEye, FiTrash2, FiUpload } from "react-icons/fi";
import { useState } from "react";

export default function DokumenPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    file: null as File | null,
  });

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

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input changes
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, file: e.target.files![0] }));
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically call an API to save the data and upload the file
    setIsDialogOpen(false);
    // Reset form
    setFormData({
      title: "",
      description: "",
      file: null,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dokumen</h1>
          <p className="text-gray-600 mt-2">
            Kelola dokumen panduan dan referensi ISO/IEC 17025:2017
          </p>
        </div>
        <Button
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => setIsDialogOpen(true)}
        >
          + Unggah Dokumen
        </Button>
      </div>

      {/* Document List */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Dokumen
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">
                  Kategori
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">
                  Diunggah Oleh
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">
                  Tanggal
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">
                  Format / Ukuran
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr
                  key={doc.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-4 px-4">
                    <div className="font-medium text-gray-800">{doc.title}</div>
                    <div className="text-sm text-gray-500">
                      {doc.description}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${doc.categoryColor}`}
                    >
                      {doc.category}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center text-gray-600">
                    {doc.uploadedBy}
                  </td>
                  <td className="py-4 px-4 text-center text-gray-600">
                    {doc.uploadedDate}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="font-medium">{doc.fileType}</div>
                    <div className="text-xs text-gray-500">{doc.fileSize}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center space-x-3">
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        title="Lihat"
                      >
                        <FiEye size={18} />
                      </button>
                      <button
                        className="text-green-600 hover:text-green-800"
                        title="Unduh"
                      >
                        <FiDownload size={18} />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800"
                        title="Hapus"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Upload Document Dialog */}
      <Dialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title="Unggah Dokumen Baru"
      >
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              label="Judul Dokumen"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Masukkan judul dokumen"
              required
            />

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Deskripsi
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Masukkan deskripsi singkat dokumen"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pilih File
              </label>
              <div className="relative border border-gray-300 rounded-md px-3 py-2">
                <input
                  type="file"
                  name="file"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  required
                />
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">
                    {formData.file ? formData.file.name : "Pilih file dokumen"}
                  </span>
                  <FiUpload className="text-gray-400" />
                </div>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Format yang didukung: PDF, DOCX, XLSX, PPTX (Maks. 10MB)
              </p>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <Button
                type="button"
                className="bg-gray-200 text-gray-800 hover:bg-gray-300"
                onClick={() => setIsDialogOpen(false)}
              >
                Batal
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Unggah
              </Button>
            </div>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
