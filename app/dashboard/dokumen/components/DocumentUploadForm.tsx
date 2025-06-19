"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
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
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { upload } from '@vercel/blob/client';

export default function DocumentUploadForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const categoryOptions = [
    { value: "Panduan", label: "Panduan" },
    { value: "Template", label: "Template" },
    { value: "Checklist", label: "Checklist" },
    { value: "SOP", label: "SOP" },
    { value: "Laporan", label: "Laporan" },
    { value: "Manual", label: "Manual" },
    { value: "Form", label: "Form" },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!title || !category || !file) {
      setError("Judul, kategori, dan file diperlukan");
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("file", file);

      const response = await fetch("/api/documents", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Gagal mengunggah dokumen");
      }

      // Reset form
      setTitle("");
      setDescription("");
      setCategory("");
      setFile(null);
      setIsOpen(false);

      // Refresh page to show new document
      router.refresh();
    } catch (error: any) {
      console.error("Error uploading document:", error);
      setError(error.message || "Gagal mengunggah dokumen");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="document-title">Judul Dokumen</Label>
            <Input
              id="document-title"
              type="text"
              placeholder="Judul Dokumen"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="document-description">Deskripsi Dokumen</Label>
            <Textarea
              id="document-description"
              placeholder="Deskripsi Dokumen"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="document-category">Kategori Dokumen</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger>
                <SelectValue placeholder="Pilih kategori dokumen" />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="document-file">Unggah File</Label>
            <p className="text-xs text-gray-500">
              Pilih file PDF, DOC, XLSX atau DOCX untuk diunggah
            </p>
            <Input
              id="document-file"
              type="file"
              accept=".pdf,.doc,.docx,.xlsx"
              onChange={handleFileChange}
              required
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <DialogFooter>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700"
              disabled={isUploading}
            >
              {isUploading ? "Mengunggah..." : "Unggah"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
