"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const documentCategories = [
  "Panduan",
  "Template",
  "Checklist",
  "SOP",
  "Laporan",
  "Manual",
  "Form",
  "Sertifikat",
  "Kebijakan",
  "Prosedur",
];

type FormData = {
  title: string;
  description: string;
  category: string;
};

export default function DocumentUploadForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    category: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      category: value,
    }));
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Check file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        setError("Ukuran file tidak boleh lebih dari 10MB");
        e.target.value = "";
        return;
      }

      setSelectedFile(file);
      setError(null);
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!selectedFile) {
      setError("Silakan pilih file untuk diunggah");
      setIsSubmitting(false);
      return;
    }
    try {
      setUploadProgress(10);

      // Create FormData for API request
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("file", selectedFile);

      setUploadProgress(30);

      // Send to API route
      const response = await fetch("/api/upload-document", {
        method: "POST",
        body: formDataToSend,
      });

      setUploadProgress(70);

      const result = await response.json();

      setUploadProgress(90);

      if (result.success) {
        setUploadProgress(100);
        // Show success message or redirect
        router.push("/dashboard/dokumen?uploaded=true");
        router.refresh();
      } else {
        setError(result.error || "Terjadi kesalahan saat mengunggah dokumen");
      }
    } catch (err) {
      setError("Terjadi kesalahan saat memproses form");
      console.error(err);
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Unggah Dokumen</CardTitle>
        </CardHeader>{" "}
        <CardContent className="space-y-4">
          {error && (
            <div className="bg-red-50 p-3 rounded-md text-red-800 text-sm mb-4">
              {error}
            </div>
          )}
          {isSubmitting && (
            <div className="bg-blue-50 p-3 rounded-md">
              <div className="flex items-center justify-between text-sm text-blue-800 mb-2">
                <span>Mengunggah dokumen...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="title">Judul Dokumen</Label>{" "}
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              placeholder="Masukkan judul dokumen"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi</Label>{" "}
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              disabled={isSubmitting}
              placeholder="Masukkan deskripsi dokumen (opsional)"
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Kategori</Label>{" "}
            <Select
              value={formData.category}
              onValueChange={handleCategoryChange}
              required
              disabled={isSubmitting}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih kategori dokumen" />
              </SelectTrigger>
              <SelectContent>
                {documentCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>{" "}
          <div className="space-y-2">
            <Label htmlFor="file">File</Label>
            <Input
              id="file"
              name="file"
              type="file"
              onChange={handleFileChange}
              required
              accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.jpg,.jpeg,.png"
              disabled={isSubmitting}
            />
            <p className="text-sm text-gray-500">
              Format yang didukung: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, TXT,
              JPG, JPEG, PNG (Maks. 10MB)
            </p>
            {selectedFile && (
              <div className="text-sm text-gray-600">
                File dipilih: {selectedFile.name} (
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/dashboard/dokumen")}
            disabled={isSubmitting}
          >
            Batal
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isSubmitting ? "Mengunggah..." : "Unggah Dokumen"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
