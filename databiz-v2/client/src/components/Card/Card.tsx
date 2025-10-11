import React from "react";

interface CardProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, description, children }) => {
  return (
    <div className="border rounded shadow p-4 hover:shadow-lg transition-shadow">
      <h2 className="font-bold text-lg mb-2">{title}</h2>
      {description && <p className="text-gray-700">{description}</p>}
      {children}
    </div>
  );
};

export default Card;
