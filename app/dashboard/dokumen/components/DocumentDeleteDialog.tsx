"use client";

import { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { FiTrash2 } from "react-icons/fi";
import { deleteDocument } from "../actions";

interface DocumentDeleteDialogProps {
  documentId: number;
  documentTitle: string;
}

export default function DocumentDeleteDialog({
  documentId,
  documentTitle,
}: DocumentDeleteDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);

    try {
      const result = await deleteDocument(documentId);

      if (!result.success) {
        throw new Error(result.error || "Failed to delete document");
      }

      // No need to reload the page here, as the action will revalidate the path
    } catch (error: any) {
      console.error("Error deleting document:", error);
      setError(error.message || "Failed to delete document");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="icon">
          <FiTrash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus Dokumen</AlertDialogTitle>
          <AlertDialogDescription>
            Apakah Anda yakin ingin menghapus dokumen "{documentTitle}"?
            Tindakan ini tidak dapat dibatalkan.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {error && <p className="text-sm text-red-500 mt-2">{error}</p>}

        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {isDeleting ? "Menghapus..." : "Hapus"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
