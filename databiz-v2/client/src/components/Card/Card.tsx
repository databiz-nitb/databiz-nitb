import React from "react";

interface CardProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, description, children }) => {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:text-white">
      <h2 className="mb-2 text-lg font-bold text-neutral-900 dark:text-white">{title}</h2>
      {description && <p className="text-sm text-neutral-600 dark:text-slate-300">{description}</p>}
      {children}
    </div>
  );
};

export default Card;
