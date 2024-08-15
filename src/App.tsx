import React, { useState } from 'react';
import ResultDisplay from './components/ResultDisplay';
import { convertImage } from './api/cartoonGanApi';
import CameraCapture from './components/CameraCapture';
import LoadingScreen from './components/LoadingScreen';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [cartoonImage, setCartoonImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<'camera' | 'result'>('camera');

  const handleImageCapture = async (file: File) => {
    setOriginalImage(file);
    setIsLoading(true);
    try {
      const result = await convertImage(file);
      setCartoonImage(result);
      setCurrentView('result');
    } catch (error) {
      console.error('Error during conversion:', error);
      // 에러 처리 로직 추가
    } finally {
      setIsLoading(false);
    }
  };

  const handleReturnToCamera = () => {
    setCurrentView('camera');
    setOriginalImage(null);
    setCartoonImage(null);
  };

  return (
    <div className="h-screen flex flex-col bg-slate-300 p-2">
      <div className="h-full max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="flex-grow overflow-hidden">
          { currentView === 'camera' ? (
              <CameraCapture 
                onCapture={handleImageCapture} 
                onFileSelect={handleImageCapture}
                isCapturing={isLoading}
                />
          ) : (
            <>
              <ResultDisplay originalImage={originalImage} cartoonImage={cartoonImage} />
              <button
                onClick={handleReturnToCamera}
                className="absolute left-0 w-full bottom-0 bg-blue-500 text-white py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Back to Camera
              </button>
            </>
          )}
          {isLoading && (
            <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
              <LoadingScreen />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;