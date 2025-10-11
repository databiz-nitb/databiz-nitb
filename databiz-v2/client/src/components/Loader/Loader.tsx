import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-b-4 border-gray-200"></div>
    </div>
  );
};

export default Loader;
