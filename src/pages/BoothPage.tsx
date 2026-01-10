import { useState, useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Camera } from "../components/Camera";
import { PhotoStrip } from "../components/PhotoStrip";
import type { Photo, FilterType, LayoutType } from "../types";
import {
  Camera as CameraIcon,
  RotateCcw,
  Home,
  ArrowRight,
  Trash2,
} from "lucide-react";

export const BoothPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialLayout = (location.state?.layout as LayoutType) || "vertical-4";
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [currentFilter] = useState<FilterType>("none");
  const [currentLayout] = useState<LayoutType>(initialLayout);
  const [isCapturing, setIsCapturing] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [cameraStarted] = useState(true);

  const maxPhotos =
    currentLayout === "single" ? 1
    : currentLayout === "horizontal-2x2" ? 4
    : currentLayout === "grid-2x3" ? 6
    : 4;

  const startPhotoSession = () => {
    setPhotos([]);
    setIsCapturing(true);
    setCountdown(3);
  };

  const captureNext = () => {
    setIsCapturing(true);
    setCountdown(3);
  };

  const retakeLastPhoto = () => {
    setPhotos((prev) => prev.slice(0, -1));
    setIsCapturing(true);
    setCountdown(3);
  };

  const handleCapture = useCallback((dataUrl: string) => {
    const newPhoto: Photo = {
      id: Date.now(),
      dataUrl,
      timestamp: Date.now(),
    };
    setPhotos((prev) => [...prev, newPhoto]);
    setIsCapturing(false);
    setCountdown(0);
  }, []);

  useEffect(() => {
    if (countdown > 0 && isCapturing) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown, isCapturing]);

  const resetSession = () => {
    setPhotos([]);
    setIsCapturing(false);
    setCountdown(0);
  };

  const getLayoutDescription = () => {
    if (currentLayout === "horizontal-2x2") return "2×2 Grid • 4 photos";
    if (currentLayout === "vertical-4") return "4 Vertical • 4 photos";
    if (currentLayout === "grid-2x3") return "2×3 Grid • 6 photos";
    return "Single • 1 photo";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white">
      {/* Header*/}
      <div className="bg-white sticky top-0 z-50 border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src="/src/assets/fotoreklogo.png"
              alt="FotoRek"
              className="h-32 w-auto"
            />
            <div className="hidden sm:block h-8 w-px bg-gray-300" />
            <p className="hidden sm:block text-sm font-medium text-gray-600">
              {getLayoutDescription()}
            </p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 px-4 py-2 rounded-lg text-sm font-semibold border border-gray-300"
          >
            <Home className="w-4 h-4" />
            Home
          </button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Camera Section */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <Camera
                onCapture={handleCapture}
                countdown={countdown}
                isCapturing={isCapturing}
                shouldStartCamera={cameraStarted}
              />
            </div>

            {/* ✅ SIMPLIFIED CONTROL BUTTONS - No animations */}
            <div className="space-y-3">
              {photos.length === 0 ? (
                <button
                  onClick={startPhotoSession}
                  disabled={isCapturing}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:bg-blue-600 disabled:bg-gray-400 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 shadow-md disabled:cursor-not-allowed"
                >
                  <CameraIcon className="w-5 h-5" />
                  Start Photo Session
                </button>
              ) : photos.length < maxPhotos ? (
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={captureNext}
                    disabled={isCapturing}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:bg-blue-600 disabled:bg-gray-400 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 shadow-md disabled:cursor-not-allowed"
                  >
                    <CameraIcon className="w-5 h-5" />
                    <span className="text-sm">
                      {isCapturing
                        ? "Capturing..."
                        : `Next (${photos.length + 1}/${maxPhotos})`}
                    </span>
                  </button>
                  <button
                    onClick={retakeLastPhoto}
                    disabled={isCapturing}
                    className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 shadow-md disabled:cursor-not-allowed"
                  >
                    <RotateCcw className="w-5 h-5" />
                    <span className="text-sm">Retake</span>
                  </button>
                </div>
              ) : null}

              {photos.length > 0 && (
                <button
                  onClick={resetSession}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 shadow-md"
                >
                  <Trash2 className="w-5 h-5" />
                  Reset All Photos
                </button>
              )}
            </div>

            {/* Progress Indicator */}
            {photos.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-700 font-bold text-sm">
                    Photo Progress
                  </span>
                  <span className="text-2xl font-black text-blue-600">
                    {photos.length}/{maxPhotos}
                  </span>
                </div>
                <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full"
                    style={{
                      width: `${(photos.length / maxPhotos) * 100}%`,
                      transition: 'width 0.3s ease'
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Preview Section */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <PhotoStrip
              photos={photos}
              filter={currentFilter}
              layout={currentLayout}
              showDownload={false}
            />
            {photos.length >= maxPhotos && !isCapturing && (
              <button
                onClick={() =>
                  navigate("/customize", {
                    state: { photos, layout: currentLayout, filter: "none" },
                  })
                }
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 shadow-md mt-4"
              >
                <ArrowRight className="w-5 h-5" />
                Continue to Customize
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};