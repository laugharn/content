import { memo } from "react";

export const Input = memo(function InputForm({
  error,
  label,
  showError = true,
  showLabel = true,
  touched,
  type = "text",
  value,
  ...props
}) {
  return (
    <label className="block w-full">
      {label && (
        <span
          className={`block mb-1 ${
            touched && error ? "text-red-300" : "text-gray-700"
          } w-full`}
        >
          {label}
        </span>
      )}
      <input
        className={`appearance-none bg-white border ${
          touched && error ? "border-red-300" : "border-gray-400"
        } outline-none px-3 py-3 rounded w-full`}
        type={type}
        value={value}
        {...props}
      />
      {touched && error && showError && (
        <div className="text-red-300">{error}</div>
      )}
    </label>
  );
});
