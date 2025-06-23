import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: number;
  className?: string;
}

export function LoadingSpinner({
  size = 24,
  className = "",
}: LoadingSpinnerProps) {
  return <Loader2 className={`animate-spin ${className}`} size={size} />;
}

export function PageLoading() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center min-h-[200px]">
      <LoadingSpinner size={40} className="text-blue-600" />
      <p className="mt-4 text-muted-foreground">Memuat halaman...</p>
    </div>
  );
}
