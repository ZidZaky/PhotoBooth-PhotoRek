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
  const { videoRef, error, startCamera, stopCamera, capturePhoto } =
    useCamera();

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
      <div className="relative flex items-center justify-center h-[400px] md:h-[500px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden border border-gray-700/50">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative text-center z-10">
          <div className="inline-block p-6 bg-gray-800/50 rounded-full mb-4 backdrop-blur-sm border border-gray-700/30">
            <VideoOff className="w-16 h-16 text-gray-500" />
          </div>
          <p className="text-lg font-semibold text-gray-400 max-w-xs mx-auto">
            Press Start to begin
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[400px] md:h-[500px] bg-gradient-to-br from-red-900/20 to-gray-900 rounded-xl border-2 border-red-500/30">
        <div className="text-center px-4">
          <p className="text-red-400 font-semibold">{error}</p>
          <p className="text-gray-500 text-sm mt-2">
            Please allow camera access in browser settings
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-xl border border-gray-700/50">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full h-[400px] md:h-[500px] object-cover rounded-xl"
      />

      {/* Countdown Overlay */}
      {isCapturing && countdown > 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-xl">
          <div className="relative">
            <div className="text-9xl font-black text-white animate-ping opacity-20 absolute inset-0 flex items-center justify-center">
              {countdown}
            </div>
            <div className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-blue-500 relative z-10">
              {countdown}
            </div>
          </div>
        </div>
      )}

      {/* Camera Icon Badge */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-gray-600/50">
          <CameraIcon className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Recording Indicator */}
      {isCapturing && (
        <div className="absolute top-4 right-4">
          <div className="flex items-center gap-2 bg-red-600/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-red-400/30">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span className="text-white text-xs font-bold">RECORDING</span>
          </div>
        </div>
      )}
    </div>
  );
};
