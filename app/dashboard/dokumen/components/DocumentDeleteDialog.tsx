"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { FiTrash2 } from "react-icons/fi";
import { deleteDocument } from "../actions";
import { useRouter } from "next/navigation";

interface DocumentDeleteDialogProps {
  documentId: number;
  documentTitle: string;
}

export default function DocumentDeleteDialog({
  documentId,
  documentTitle,
}: DocumentDeleteDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteDocument(documentId);
      if (result.success) {
        setIsOpen(false);
        router.refresh();
      } else {
        console.error("Failed to delete document:", result.error);
      }
    } catch (error) {
      console.error("Error deleting document:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="icon" title="Hapus dokumen">
          <FiTrash2 className="h-4 w-4 text-red-600" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus Dokumen</AlertDialogTitle>
          <AlertDialogDescription>
            Apakah Anda yakin ingin menghapus dokumen &quot;{documentTitle}&quot;?
            Tindakan ini tidak dapat dibatalkan.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Batal</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700"
          >
            {isDeleting ? "Menghapus..." : "Hapus"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
