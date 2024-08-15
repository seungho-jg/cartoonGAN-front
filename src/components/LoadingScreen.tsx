import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-64">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      <p className="mt-4 text-lg font-semibold text-gray-700">Converting image...</p>
    </div>
  );
};

export default LoadingScreen;