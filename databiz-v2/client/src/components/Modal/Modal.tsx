import React from "react";
import landing from "../../../public/Landing.jpg"
const Modal: React.FC = () => {
  return (
    <div className="flex flex-col  min-h-screen bg-white text-center p-4">
      {/* Title */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-2">DataBiz</h1>

      {/* Subtitle */}
      <p className="text-gray-600 mb-8">Empowering Minds Through Data</p>

      {/* Illustration */}
      <img
        src={landing}
        alt="Data visualization illustration"
        className="w-[450px] max-w-full h-auto mx-auto "
      />
    </div>
  );
};

export default Modal;
