interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({
  type = "text",
  placeholder = "",
  className = "",
  label,
  ...props
}: InputProps) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={`border border-gray-300 p-2 rounded-md w-full ${className}`}
        {...props}
      />
    </div>
  );
}
