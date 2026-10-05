import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseClasses =
    "px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400";
  const variantClasses =
    variant === "primary"
      ? "bg-sky-600 text-white hover:bg-sky-700 dark:bg-sky-400 dark:text-slate-950 dark:hover:bg-sky-300"
      : "border border-neutral-200 bg-neutral-100 text-neutral-800 hover:bg-neutral-200 dark:border-white/15 dark:bg-white/10 dark:text-slate-100 dark:hover:bg-white/20";

  return (
    <button className={`${baseClasses} ${variantClasses} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
