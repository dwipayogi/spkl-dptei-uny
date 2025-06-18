import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
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
import { FiEye, FiUpload } from "react-icons/fi";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { getAssessmentsByPeriod } from "../actions";
import type { AssessmentPeriod } from "../actions";

interface AssessmentPeriodItemProps {
  period: AssessmentPeriod;
  index: number;
}

export default async function AssessmentPeriodItem({
  period,
  index,
}: AssessmentPeriodItemProps) {
  // Get assessments for this period
  const labAssessments = await getAssessmentsByPeriod(period.id);

  return (
    <AccordionItem value={`item-${period.id}`}>
      <AccordionTrigger>{period.title}</AccordionTrigger>
      <AccordionContent>
        <Table>
          <TableCaption>
            Daftar laboratorium yang perlu diisi instrumen asesmen periode{" "}
            {formatDate(new Date(period.startDate))} -{" "}
            {formatDate(new Date(period.endDate))}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Nama Lab</TableHead>
              <TableHead className="text-center">Tingkat Kesesuaian</TableHead>
              <TableHead className="text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {labAssessments.map((lab, idx) => (
              <TableRow key={lab.labId}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>
                  {lab.labName}
                  <div>
                    <Link
                      href={`/dashboard/asesmen/view?labId=${lab.labId}`}
                      className="text-xs text-blue-600 hover:text-blue-800"
                    >
                      Lihat semua asesmen
                    </Link>
                  </div>
                </TableCell>{" "}
                <TableCell className="text-center">
                  {lab.percentage !== null ? `${lab.percentage}%` : "-"}
                </TableCell>
                <TableCell className="text-center">
                  {lab.percentage !== null ? (
                    <Link
                      href={`/dashboard/asesmen/view/detail?labId=${lab.labId}&periodId=${period.id}`}
                    >
                      <Button variant="outline">
                        <FiEye />
                      </Button>
                    </Link>
                  ) : (
                    <Link
                      href={`/dashboard/asesmen/tes?labId=${lab.labId}&periodId=${period.id}`}
                    >
                      <Button>
                        <FiUpload />
                      </Button>
                    </Link>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </AccordionContent>
    </AccordionItem>
  );
}
