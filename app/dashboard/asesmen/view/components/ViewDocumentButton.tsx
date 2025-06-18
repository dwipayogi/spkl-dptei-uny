"use client";

import { Button } from "@/components/ui/button";
import { FiFile } from "react-icons/fi";
import Link from "next/link";

interface ViewDocumentButtonProps {
  labId: number;
  periodId: number;
  hasDocument: boolean;
}

export default function ViewDocumentButton({
  labId,
  periodId,
  hasDocument,
}: ViewDocumentButtonProps) {
  if (!hasDocument) {
    return null;
  }

  return (
    <Link href={`/dashboard/asesmen/document/${labId}/${periodId}`}>
      <Button variant="outline" className="flex items-center gap-2">
        <FiFile className="h-4 w-4" />
        <span>Lihat Dokumen</span>
      </Button>
    </Link>
  );
}
