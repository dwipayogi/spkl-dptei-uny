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
} from "@/components/ui/alert-dialog";
import { deleteLaboratory } from "../actions";

interface LaboratoryDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  labId: number | null;
  onSuccess: () => void;
}

export default function LaboratoryDeleteDialog({
  open,
  onOpenChange,
  labId,
  onSuccess,
}: LaboratoryDeleteDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!labId) return;

    setIsDeleting(true);
    setError(null);

    try {
      const result = await deleteLaboratory(labId);

      if (result.success) {
        onOpenChange(false);
        onSuccess();
      } else {
        setError(result.error || "Terjadi kesalahan saat menghapus data");
      }
    } catch (err) {
      setError("Terjadi kesalahan saat menghapus data");
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus Laboratorium</AlertDialogTitle>
          <AlertDialogDescription>
            Apakah Anda yakin ingin menghapus laboratorium ini? Tindakan ini
            tidak dapat dibatalkan.
          </AlertDialogDescription>
        </AlertDialogHeader>
        {error && (
          <div className="bg-red-50 p-3 rounded-md text-red-800 text-sm mb-4">
            {error}
          </div>
        )}
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Batal</AlertDialogCancel>
          <AlertDialogAction
            disabled={isDeleting}
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
          >
            {isDeleting ? "Menghapus..." : "Hapus"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
