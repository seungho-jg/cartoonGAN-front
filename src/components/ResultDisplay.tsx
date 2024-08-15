import React from 'react';

interface ResultDisplayProps {
  originalImage: File | null;
  cartoonImage: string | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ originalImage, cartoonImage }) => {
  return (
    <div>
        {cartoonImage && (
          <div>
            <img src={cartoonImage} alt="Cartoon" className="w-full h-full object-cover aspect-9/16" />
          </div>
        )}
    </div>
  );
};

export default ResultDisplay;