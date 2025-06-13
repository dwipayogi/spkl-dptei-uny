export default function Input({
  type = "text",
  placeholder = "",
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`border border-gray-300 p-2 rounded-md w-full ${className}`}
      {...props}
    />
  );
}