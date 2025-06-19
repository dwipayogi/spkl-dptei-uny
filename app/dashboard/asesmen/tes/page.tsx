import {
  getAssessmentQuestions,
  getLaboratory,
  getAssessmentPeriod,
  initializeAssessmentQuestions,
  getAssessmentAnswersByLabAndPeriod,
} from "./actions";
import AssessmentForm from "./components/AssessmentForm";

export default async function AsesmenTestPage({
  searchParams,
}: {
  searchParams: { labId?: string; periodId?: string };
}) {
  // Check if labId and periodId are provided
  const labId = searchParams.labId ? parseInt(searchParams.labId) : null;
  const periodId = searchParams.periodId
    ? parseInt(searchParams.periodId)
    : null;

  // Fetch assessment questions from database
  const questions = await getAssessmentQuestions();

  // Get lab and period information
  const laboratory = labId ? await getLaboratory(labId) : null;
  const period = periodId ? await getAssessmentPeriod(periodId) : null;
  // Get existing answers if any
  let existingAnswers = await getAssessmentAnswersByLabAndPeriod(
    labId || 0,
    periodId || 0
  );

  // If missing required parameters, show error
  if (!labId || !periodId || !laboratory || !period) {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold mb-4">
          Asesmen Mandiri ISO/IEC 17025:2017
        </h2>
        <div className="p-6 bg-red-50 text-red-700 border border-red-200 rounded-lg">
          <h3 className="font-semibold mb-2">Parameter Tidak Lengkap</h3>
          <p>
            Diperlukan ID Laboratorium dan ID Periode yang valid untuk melakukan
            asesmen.
          </p>
          <p>
            Silakan kembali ke halaman asesmen dan pilih laboratorium yang
            sesuai.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">Asesmen {laboratory.name}</h2>
          <span className="bg-blue-100 text-blue-800 px-2 py-1 text-xs rounded-full">
            Periode: {period.title}
          </span>
        </div>
        <p className="text-gray-600">
          Lakukan asesmen berstandar ISO/IEC 17025:2017 untuk laboratorium ini.
        </p>
      </div>

      <AssessmentForm
        questions={questions}
        labId={labId}
        periodId={periodId}
        existingAnswers={existingAnswers}
      />
    </div>
  );
}
