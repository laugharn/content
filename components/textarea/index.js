import autosize from "autosize";
import { useEffect, useState } from "react";

export function Textarea({
  error,
  id,
  label,
  showError = true,
  showLabel = true,
  touched,
  value,
  ...props
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const element = document.getElementById(id);

    autosize.destroy(element);
    autosize(element);
  }, [value]);

  useEffect(() => {
    if (!loading) {
      const element = document.getElementById(id);

      autosize(element);
    }
  }, [loading]);

  useEffect(() => {
    setLoading(false);
  }, []);

  return loading ? (
    <></>
  ) : (
    <label className="block w-full">
      {label && showLabel && (
        <span
          className={`block mb-1 ${
            touched && error ? "text-red-300" : "text-gray-700"
          } w-full`}
        >
          {label}
        </span>
      )}
      <textarea
        className={`appearance-none bg-white border ${
          touched && error ? "border-red-300" : "border-gray-400"
        } outline-none px-3 py-3 rounded w-full`}
        id={id}
        value={value}
        {...props}
      />
      {touched && error && showError && (
        <div className="text-red-300">{error}</div>
      )}
    </label>
  );
}
