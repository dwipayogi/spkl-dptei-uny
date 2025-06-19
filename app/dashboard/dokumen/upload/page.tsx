import DocumentUploadForm from "../components/DocumentUploadForm";

export default function UploadPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-lg lg:text-3xl font-bold text-gray-800">
        Unggah Dokumen
      </h1>
      <p className="text-sm text-gray-600 mt-2">
        Unggah dokumen pendukung asesmen laboratorium
      </p>
      <DocumentUploadForm />
    </div>
  );
}
