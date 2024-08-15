import React, { useState } from 'react';
import ImageUpload from './components/ImageUpload';
import StyleSelector from './components/StyleSelector';
import ResultDisplay from './components/ResultDisplay';
import { convertImage } from './api/cartoonGanApi';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [cartoonImage, setCartoonImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string>('style1');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleConvert = async () => {
    if (!originalImage) return;

    setIsLoading(true);
    try {
      const result = await convertImage(originalImage, selectedStyle);
      setCartoonImage(result);
    } catch (error) {
      console.error('Error during conversion:', error);
      // 에러 처리 로직 추가
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-8">CartoonGAN Image Converter</h1>
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <ImageUpload setOriginalImage={setOriginalImage} />
          <StyleSelector selectedStyle={selectedStyle} setSelectedStyle={setSelectedStyle} />
          <button
            onClick={handleConvert}
            disabled={!originalImage || isLoading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
          >
            {isLoading ? 'Converting...' : 'Convert'}
          </button>
          <ResultDisplay originalImage={originalImage} cartoonImage={cartoonImage} />
        </div>
      </div>
    </div>
  );
};

export default App;