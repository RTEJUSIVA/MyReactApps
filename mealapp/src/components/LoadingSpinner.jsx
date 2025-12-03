import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin border-t-blue-800 border-t-4 rounded-full w-12 h-12 "></div>
    </div>
  );
};

export default LoadingSpinner;
