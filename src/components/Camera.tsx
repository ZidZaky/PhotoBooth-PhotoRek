import { useEffect } from "react";
import { useCamera } from "../hooks/useCamera";
import { Camera as CameraIcon, VideoOff } from "lucide-react";

interface CameraProps {
  onCapture: (dataUrl: string) => void;
  countdown: number;
  isCapturing: boolean;
  shouldStartCamera: boolean;
}

export const Camera = ({
  onCapture,
  countdown,
  isCapturing,
  shouldStartCamera,
}: CameraProps) => {
  const { videoRef, error, startCamera, stopCamera, capturePhoto } = useCamera();

  useEffect(() => {
    if (shouldStartCamera) {
      startCamera();
    }
    return () => stopCamera();
  }, [shouldStartCamera, startCamera, stopCamera]);

  useEffect(() => {
    if (countdown === 0 && isCapturing) {
      const dataUrl = capturePhoto();
      if (dataUrl) {
        onCapture(dataUrl);
      }
    }
  }, [countdown, isCapturing, capturePhoto, onCapture]);

  if (!shouldStartCamera) {
    return (
      <div className="relative flex items-center justify-center h-[400px] md:h-[500px] bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden border border-gray-300">
        <div className="text-center">
          <div className="inline-block p-6 bg-white rounded-full mb-4 border border-gray-300 shadow-sm">
            <VideoOff className="w-16 h-16 text-gray-400" />
          </div>
          <p className="text-lg font-semibold text-gray-600">
            Press Start to begin
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[400px] md:h-[500px] bg-red-50 rounded-xl border-2 border-red-300">
        <div className="text-center px-4">
          <p className="text-red-600 font-semibold">{error}</p>
          <p className="text-gray-500 text-sm mt-2">
            Please allow camera access in browser settings
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-xl border border-gray-300">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full h-[400px] md:h-[500px] object-cover rounded-xl"
      />

      {/* Countdown Overlay */}
      {isCapturing && countdown > 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-xl">
          <div className="text-9xl font-black text-white drop-shadow-lg">
            {countdown}
          </div>
        </div>
      )}

      {/* Camera Icon Badge */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-gray-500">
          <CameraIcon className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Recording Indicator */}
      {isCapturing && (
        <div className="absolute top-4 right-4">
          <div className="flex items-center gap-2 bg-red-600 backdrop-blur-sm px-3 py-1.5 rounded-full">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className="text-white text-xs font-bold">RECORDING</span>
          </div>
        </div>
      )}
    </div>
  );
};