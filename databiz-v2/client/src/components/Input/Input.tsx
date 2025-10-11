import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, ...props }) => {
  return (
    <div className="flex flex-col mb-4">
      {label && <label className="mb-1 font-medium">{label}</label>}
      <input
        className={`border rounded px-3 py-2 focus:outline-none focus:ring ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        {...props}
      />
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
};

export default Input;
