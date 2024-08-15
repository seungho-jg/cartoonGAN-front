import React, { useRef, useEffect, useState } from 'react';
import { Camera } from 'lucide-react';

interface CameraCaptureProps {
    onCapture: (file: File) => void;
    onFileSelect: (file: File) => void;
    isCapturing: boolean;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, onFileSelect, isCapturing }) => {
  const videoRef = useRef<HTMLVideoElement | null >(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const constraints = {
            video: {
              facingMode: 'environment',
              aspectRatio: 9 / 16, // 세로 비율 (16:9의 역)
              width: { ideal: 1080 }, // 세로 모드에서의 이상적인 너비
              height: { ideal: 1920 } // 세로 모드에서의 이상적인 높이
            }
        }
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        setStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing the camera:", err);
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (videoRef.current && stream) {
      if (isCapturing) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  }, [isCapturing, stream]);

  const captureImage = () => {
    if (videoRef.current){
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        canvas.getContext('2d')?.drawImage(videoRef.current, 0, 0);
        canvas.toBlob(blob => {
            if (blob){
                onCapture(new File([blob], "captured-image.jpg", { type: "image/jpeg" }));
            }
        }, 'image/jpeg');
      };
    }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onFileSelect(event.target.files[0]);
    }
  };

  return (
    <div className="relative w-full h-full bg-gray-200 rounded-lg overflow-hidden">
      <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover aspect-9/16" />
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-4">
        <button
          onClick={captureImage}
          className="bg-white h-full rounded-full p-4 shadow-lg focus:outline-none"
        >
          <Camera size={32} />
        </button>
        <label className="bg-white rounded-full p-4 shadow-lg cursor-pointer">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </label>
      </div>
    </div>
  );
};

export default CameraCapture;