import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  ...props
}) => {
  const baseClasses =
    "px-4 py-2 rounded font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer";
  const variantClasses =
    variant === "primary"
      ? "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500 hover:shadow-lg"
      : "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500 hover:shadow-md";

  return (
    <button 
      className={`${baseClasses} ${variantClasses} ${props.className || ''}`} 
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
