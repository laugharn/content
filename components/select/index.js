import { memo } from "react";

export const Select = memo(function InputForm({
  showEmpty = true,
  error,
  label,
  options = [],
  showError = true,
  showLabel = true,
  touched,
  value,
  ...props
}) {
  return (
    <label className="block w-full">
      {label && (
        <span
          className={`block mb-1 ${
            touched && error ? "text-red-300" : ""
          } w-full`}
        >
          {label}
        </span>
      )}
      <select
        className={`appearance-none bg-white border ${
          touched && error ? "border-red-300" : "border-gray-400"
        } outline-none px-3 py-3 rounded w-full`}
        value={value}
        {...props}
      >
        {showEmpty && <option></option>}
        {options.map((option) => {
          return (
            <option key={`option-${option.value}`} value={option.value}>
              {option.title}
            </option>
          );
        })}
      </select>
      {touched && error && showError && (
        <div className="text-red-300">{error}</div>
      )}
    </label>
  );
});
