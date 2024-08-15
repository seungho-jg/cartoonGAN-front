import React from 'react';

interface ResultDisplayProps {
  originalImage: File | null;
  cartoonImage: string | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ originalImage, cartoonImage }) => {
  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2">Result</h2>
      <div className="grid grid-cols-2 gap-4">
        {originalImage && (
          <div>
            <h3 className="text-sm font-medium mb-1">Original</h3>
            <img
              src={URL.createObjectURL(originalImage)}
              alt="Original"
              className="w-full h-auto"
            />
          </div>
        )}
        {cartoonImage && (
          <div>
            <h3 className="text-sm font-medium mb-1">Cartoon</h3>
            <img src={cartoonImage} alt="Cartoon" className="w-full h-auto" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultDisplay;