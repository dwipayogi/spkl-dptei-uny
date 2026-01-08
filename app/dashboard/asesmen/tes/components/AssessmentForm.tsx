"use client";

import React, { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { saveAssessmentAnswers } from "../actions";
import { useRouter } from "next/navigation";

interface AssessmentQuestion {
  id: number;
  code: string;
  question: string;
}

interface AssessmentAnswer {
  id?: number;
  lab_id: number;
  ass_id: number;
  period_id: number;
  answer: {
    value: string;
    notes?: string;
    file_url?: string;
  };
  notes?: string;
  file_url?: string;
}

interface AssessmentFormProps {
  questions: AssessmentQuestion[];
  labId: number;
  periodId: number;
  existingAnswers?: AssessmentAnswer[];
}

export default function AssessmentForm({
  questions,
  labId,
  periodId,
  existingAnswers = [],
}: AssessmentFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // State for answers
  const [responses, setResponses] = useState(
    questions.map((question) => {
      // Find existing answer for this question if any
      const existingAnswer = existingAnswers.find(
        (answer) => answer.ass_id === question.id
      );

      return {
        questionId: question.id,
        code: question.code,
        question: question.question,
        value: existingAnswer?.answer?.value || "", // Use existing answer value if available
      };
    })
  );

  // State for notes
  const [notes, setNotes] = useState("");
  // State for file upload
  const [fileUrl, setFileUrl] = useState("");
  // State to track if the form has unsaved changes
  const [isDirty, setIsDirty] = useState(false);

  // Initialize notes from existing answers if available
  useEffect(() => {
    const notesEntry = existingAnswers.find((answer) => answer.notes);
    if (notesEntry) {
      setNotes(notesEntry.notes || "");
    }

    const fileEntry = existingAnswers.find((answer) => answer.file_url);
    if (fileEntry) {
      setFileUrl(fileEntry.file_url || "");
    }
  }, [existingAnswers]);

  // Function to handle changes to responses
  const handleResponseChange = (questionId: number, value: string) => {
    setResponses((prev) =>
      prev.map((res) =>
        res.questionId === questionId ? { ...res, value } : res
      )
    );
    setIsDirty(true);
  };

  // Handle form reset
  const handleReset = () => {
    // Reset to initial values or empty if no existing answers
    setResponses(
      questions.map((question) => {
        const existingAnswer = existingAnswers.find(
          (answer) => answer.ass_id === question.id
        );

        return {
          questionId: question.id,
          code: question.code,
          question: question.question,
          value: existingAnswer?.answer?.value || "",
        };
      })
    );

    // Reset notes
    const notesEntry = existingAnswers.find((answer) => answer.notes);
    setNotes(notesEntry?.notes || "");

    // Reset file URL
    const fileEntry = existingAnswers.find((answer) => answer.file_url);
    setFileUrl(fileEntry?.file_url || "");

    setIsDirty(false);
  };
  // Handle file upload
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFileName(file.name);
      setIsUploading(true);
      setUploadError("");

      try {
        // Create FormData object to send file
        const formData = new FormData();
        formData.append("file", file);

        // Upload to our API route that uses Vercel Blob
        const response = await fetch("/api/assessment-files", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Failed to upload file");
        }

        // Store the URL we got back
        setFileUrl(result.url);
        setIsDirty(true);
      } catch (error: unknown) {
        console.error("Error uploading file:", error);
        setUploadError(error instanceof Error ? error.message : "Failed to upload file");
        setFileUrl("");
      } finally {
        setIsUploading(false);
      }
      setIsDirty(true);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Validate form
    const incompleteQuestions = responses.filter((res) => !res.value);
    if (incompleteQuestions.length > 0) {
      setSubmitError(
        `Harap lengkapi semua pertanyaan (${incompleteQuestions.length} pertanyaan belum dijawab)`
      );
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Format data for submission
      const formData = {
        labId,
        periodId,
        answers: responses.map((res) => ({
          questionId: res.questionId,
          value: res.value,
        })),
        notes,
        fileUrl,
      };

      // Submit the data
      const result = await saveAssessmentAnswers(formData);

      if (result.success) {
        setSuccessMessage("Asesmen berhasil disimpan!");
        setIsDirty(false);
      } else {
        setSubmitError(result.error || "Gagal menyimpan asesmen");
      }
    } catch (error) {
      console.error("Error submitting assessment:", error);
      setSubmitError("Terjadi kesalahan saat menyimpan asesmen");
    } finally {
      setIsSubmitting(false);
      router.push(
        `/dashboard/asesmen/view/detail?labId=${labId}&periodId=${periodId}`
      );
    }
  };

  return (
    <>
      {submitError && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 mb-4 rounded-md">
          {submitError}
        </div>
      )}

      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 mb-4 rounded-md">
          {successMessage}
        </div>
      )}

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Kode</TableHead>
              <TableHead>Pertanyaan</TableHead>
              <TableHead className="w-32">Jawaban</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {responses.map((row) => (
              <TableRow key={row.questionId}>
                <TableCell className="font-medium">{row.code}</TableCell>
                <TableCell>{row.question}</TableCell>
                <TableCell>
                  <RadioGroup
                    value={row.value}
                    onValueChange={(value) =>
                      handleResponseChange(row.questionId, value)
                    }
                    className="space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Ya" id={`ya-${row.questionId}`} />
                      <Label htmlFor={`ya-${row.questionId}`}>Ya</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="Sebagian"
                        id={`sebagian-${row.questionId}`}
                      />
                      <Label htmlFor={`sebagian-${row.questionId}`}>
                        Sebagian
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="Tidak"
                        id={`tidak-${row.questionId}`}
                      />
                      <Label htmlFor={`tidak-${row.questionId}`}>Tidak</Label>
                    </div>
                  </RadioGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">Catatan Asesmen</h3>
        <Textarea
          placeholder="Tambahkan catatan untuk asesmen ini..."
          className="min-h-[80px] mt-2"
          value={notes}
          onChange={(e) => {
            setNotes(e.target.value);
            setIsDirty(true);
          }}
        />{" "}
        <div className="mt-4">
          <h4 className="text-md font-semibold">Dokumen Pendukung</h4>
          <div className="flex flex-col gap-2 mt-2">
            <div className="flex items-center gap-2">
              <input
                type="file"
                id="file-upload"
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                disabled={isUploading}
              />
              <label
                htmlFor="file-upload"
                className={`flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 ${
                  isUploading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <Upload className="w-4 h-4" />
                <span className="text-sm">
                  {isUploading ? "Mengunggah..." : "Upload File"}
                </span>
              </label>

              {uploadedFileName && !isUploading && (
                <span className="text-sm text-gray-600">
                  {uploadedFileName}
                </span>
              )}
            </div>

            {uploadError && (
              <p className="text-sm text-red-500">{uploadError}</p>
            )}

            {fileUrl && !isUploading && (
              <div className="flex items-center gap-2 mt-2">
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-blue-600 underline flex items-center gap-1"
                >
                  <span>Lihat Dokumen</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Button
          variant="outline"
          onClick={handleReset}
          disabled={isSubmitting || !isDirty}
        >
          Reset
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              disabled={isSubmitting || !isDirty}
            >
              {isSubmitting ? "Menyimpan..." : "Submit"}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Apakah anda yakin?</AlertDialogTitle>
              <AlertDialogDescription>
                Tindakan ini akan menyimpan asesmen Anda dan memperbarui status
                laboratorium. Pastikan semua informasi sudah benar.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batalkan</AlertDialogCancel>
              <AlertDialogAction
                className="bg-blue-600 hover:bg-blue-700"
                onClick={handleSubmit}
              >
                Simpan
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
}
