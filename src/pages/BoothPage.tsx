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
  const [cameraStarted, setCameraStarted] = useState(true); // Auto-start camera

  const maxPhotos =
    currentLayout === "single"
      ? 1
      : currentLayout === "horizontal-2x2"
      ? 4
      : currentLayout === "grid-2x3"
      ? 6
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
    if (currentLayout === "horizontal-2x2") return "4 photos";
    if (currentLayout === "vertical-4") return "4 photos";
    if (currentLayout === "grid-2x3") return "6 photos";
    return "1 photo";
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900">
      {/* Top Bar - Centered layout text */}
      <div className="bg-gray-900/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 h-14 relative flex items-center">
          {/* Left: Logo */}
          <div className="flex items-center">
            <div className="h-14 flex items-center overflow-visible">
              <img
                src="/src/assets/fotoreklogo.png"
                alt="FotoRek Logo"
                className="h-10 w-auto object-contain scale-[1.8] origin-left"
              />
            </div>
          </div>
          {/* Center: Selected layout */}
          <div className="absolute left-1/2 -translate-x-1/2 px-2">
            <p className="text-xs font-medium text-gray-300 text-center whitespace-nowrap">
              Selected:{" "}
              {currentLayout === "horizontal-2x2"
                ? "Layout B"
                : currentLayout === "vertical-4"
                ? "Layout A"
                : "Layout C"}{" "}
              ({getLayoutDescription()})
            </p>
          </div>
          {/* Right: Home */}
          <div className="ml-auto">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 bg-gray-800 text-white px-3 py-1.5 rounded-lg text-sm font-semibold
               hover:bg-gray-700 transition border border-gray-600/50"
            >
              <Home className="w-4 h-4" />
              Home
            </button>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Camera */}
          <div className="space-y-4">
            <div className="bg-gray-800/30 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-gray-700/50">
              <Camera
                onCapture={handleCapture}
                countdown={countdown}
                isCapturing={isCapturing}
                shouldStartCamera={cameraStarted}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {photos.length === 0 ? (
                <button
                  onClick={startPhotoSession}
                  disabled={isCapturing}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/30 hover:shadow-xl disabled:shadow-none hover:scale-105 disabled:cursor-not-allowed col-span-2"
                >
                  <CameraIcon className="w-5 h-5" />
                  Start Session
                </button>
              ) : photos.length < maxPhotos ? (
                <button
                  onClick={captureNext}
                  disabled={isCapturing}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/30 hover:shadow-xl disabled:shadow-none hover:scale-105 disabled:cursor-not-allowed col-span-2"
                >
                  <CameraIcon className="w-5 h-5" />
                  {isCapturing
                    ? `Capturing Photo ${photos.length + 1}/${maxPhotos}`
                    : `Capture Next Photo (${photos.length + 1}/${maxPhotos})`}
                </button>
              ) : null}
              <button
                onClick={resetSession}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-500/30 hover:shadow-xl hover:scale-105 col-span-2 md:col-span-1"
              >
                <RotateCcw className="w-5 h-5" />
                Reset Session
              </button>
            </div>
          </div>
          {/* Right: Preview */}
          <div className="bg-gray-800/30 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-gray-700/50">
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
                    state: {
                      photos,
                      layout: currentLayout,
                      filter: "none",
                    },
                  })
                }
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:scale-105 mt-4"
              >
                <ArrowRight className="w-5 h-5" />
                Next to Customize
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
