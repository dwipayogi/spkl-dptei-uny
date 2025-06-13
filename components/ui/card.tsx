export default function Card({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`bg-white shadow-lg rounded-lg p-6 ${className}`}
    >
      {children}
    </div>
  );
}