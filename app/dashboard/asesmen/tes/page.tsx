import {
  getAssessmentQuestions,
  getLaboratory,
  getAssessmentPeriod,
  initializeAssessmentQuestions,
  getAssessmentAnswersByLabAndPeriod,
} from "./actions";
import AssessmentForm from "./components/AssessmentForm";

// Initial data to populate the database if empty
const initialQuestions = [
  // Format: {code, question}
  {
    code: "4.1",
    question:
      "Apakah laboratorium bebas dari tekanan komersial, finansial, atau lainnya yang dapat mempengaruhi hasil?",
  },
  {
    code: "4.2",
    question:
      "Apakah ada kebijakan yang menjamin ketidakberpihakan dalam kegiatan laboratorium?",
  },
  {
    code: "4.3",
    question:
      "Apakah personel memahami dan menandatangani pernyataan kerahasiaan?",
  },
  {
    code: "4.4",
    question:
      "Apakah laboratorium mengelola informasi pelanggan secara aman dan rahasia?",
  },
  {
    code: "5.1",
    question:
      "Apakah struktur organisasi laboratorium terdokumentasi dengan jelas?",
  },
  {
    code: "5.2",
    question:
      "Apakah peran dan tanggung jawab setiap personel dijelaskan dalam uraian jabatan?",
  },
  {
    code: "5.3",
    question:
      "Apakah ada personel yang memiliki kewenangan teknis untuk pengambilan keputusan terkait hasil uji/kalibrasi?",
  },
  {
    code: "5.4",
    question: "Apakah terdapat prosedur pengelolaan konflik kepentingan?",
  },
  {
    code: "6.1",
    question:
      "Apakah laboratorium memiliki personel yang kompeten untuk melakukan pengujian/kalibrasi?",
  },
  {
    code: "6.2",
    question:
      "Apakah kompetensi personel dievaluasi dan dicatat secara berkala?",
  },
  {
    code: "6.3",
    question:
      "Apakah fasilitas laboratorium mendukung pelaksanaan pengujian yang andal?",
  },
  {
    code: "6.4",
    question:
      "Apakah peralatan diuji secara rutin dan dikalibrasi sesuai jadwal?",
  },
  {
    code: "6.5",
    question: "Apakah terdapat catatan kalibrasi dan pemeliharaan alat?",
  },
  {
    code: "7.1",
    question: "Apakah metode uji/kalibrasi terdokumentasi dan divalidasi?",
  },
  {
    code: "7.2",
    question:
      "Apakah laboratorium melakukan verifikasi metode sebelum digunakan?",
  },
  {
    code: "7.3",
    question:
      "Apakah data hasil uji dapat ditelusuri ke standar nasional atau internasional?",
  },
  {
    code: "7.4",
    question:
      "Apakah ketidakpastian pengukuran dihitung dan dilaporkan bila relevan?",
  },
  { code: "7.5", question: "Apakah pengendalian mutu internal dilakukan?" },
  {
    code: "7.6",
    question:
      "Apakah hasil uji dilaporkan dengan jelas dan mencakup semua informasi penting?",
  },
  {
    code: "7.7",
    question:
      "Apakah prosedur untuk penanganan hasil tidak valid atau keluhan pelanggan tersedia?",
  },
  {
    code: "8.1",
    question:
      "Apakah laboratorium memiliki kebijakan mutu dan tujuan mutu yang terdokumentasi?",
  },
  { code: "8.2", question: "Apakah dilakukan audit internal secara berkala?" },
  {
    code: "8.3",
    question: "Apakah dilakukan tinjauan manajemen secara rutin?",
  },
  {
    code: "8.4",
    question:
      "Apakah ketidaksesuaian didokumentasikan dan dilakukan tindakan korektif?",
  },
  {
    code: "8.5",
    question: "Apakah risiko dan peluang telah diidentifikasi dan dikelola?",
  },
];

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

  // Initialize assessment questions if they don't exist yet
  await initializeAssessmentQuestions(initialQuestions);

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
