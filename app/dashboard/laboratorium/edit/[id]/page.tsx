import { notFound } from "next/navigation";
import LaboratoryForm from "../../components/LaboratoryForm";
import { getLaboratory } from "../../actions";

interface EditLaboratoryPageParams {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditLaboratoryPage({
  params,
}: EditLaboratoryPageParams) {
  const { id: idParam } = await params;
  const id = parseInt(idParam, 10);

  if (isNaN(id)) {
    notFound();
  }

  const laboratory = await getLaboratory(id);

  if (!laboratory) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Edit Laboratorium
      </h1>
      <LaboratoryForm laboratory={laboratory} isEditing={true} />
    </div>
  );
}
