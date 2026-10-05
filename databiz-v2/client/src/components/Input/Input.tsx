import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, className = "", ...props }) => {
  return (
    <div className="flex flex-col mb-4">
      {label && <label className="mb-1.5 text-sm font-medium text-neutral-700 dark:text-slate-200">{label}</label>}
      <input
        className={`rounded-lg border px-3.5 py-2.5 text-sm transition-colors bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-sky-400/50 dark:bg-[#080c11] dark:text-white dark:placeholder:text-slate-500 ${
          error ? "border-red-500" : "border-neutral-300 dark:border-white/15"
        } ${className}`}
        {...props}
      />
      {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
    </div>
  );
};

export default Input;
