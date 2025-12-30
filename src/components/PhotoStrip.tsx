import { useEffect, useRef, useState } from "react";
import type { Photo, FilterType, LayoutType } from "../types";
import { applyFilter } from "../utils/filters";
import { Download, Image as ImageIcon, Loader2 } from "lucide-react";

interface PhotoStripProps {
  photos: Photo[];
  filter: FilterType;
  layout: LayoutType;
}

export const PhotoStrip = ({ photos, filter, layout }: PhotoStripProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRendering, setIsRendering] = useState(false);
  const [renderError, setRenderError] = useState<string>("");

  useEffect(() => {
    if (photos.length === 0 || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const photoWidth = 300;
    const photoHeight = 400;
    const padding = 20;

    // Set canvas size based on layout
    if (layout === "vertical-4") {
      canvas.width = photoWidth + padding * 2;
      canvas.height = photoHeight * 4 + padding * 5;
    } else if (layout === "horizontal-2x2") {
      canvas.width = photoWidth + padding * 2;
      canvas.height = photoHeight * 3 + padding * 4;
    } else if (layout === "grid-2x3") {
      canvas.width = photoWidth * 3 + padding * 4;
      canvas.height = photoHeight * 2 + padding * 3;
    } else {
      canvas.width = photoWidth + padding * 2;
      canvas.height = photoHeight + padding * 2;
    }

    // Dark background
    ctx.fillStyle = "#111111";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const maxPhotos =
      layout === "single"
        ? 1
        : layout === "horizontal-2x2"
        ? 3
        : layout === "grid-2x3"
        ? 6
        : 4;

    // Use Promise.all to wait for all images to load
    const renderPhotos = async () => {
      setIsRendering(true);
      setRenderError("");

      try {
        const photoPromises = photos.slice(0, maxPhotos).map((photo, index) => {
          return new Promise<void>((resolve, reject) => {
            const img = new Image();

            // Set timeout for image loading (5 seconds)
            const timeout = setTimeout(() => {
              reject(new Error(`Timeout loading image ${index + 1}`));
            }, 5000);

            img.onload = () => {
              clearTimeout(timeout);

              try {
                const tempCanvas = document.createElement("canvas");
                tempCanvas.width = photoWidth;
                tempCanvas.height = photoHeight;
                const tempCtx = tempCanvas.getContext("2d");

                if (!tempCtx) {
                  reject(new Error("Failed to get canvas context"));
                  return;
                }

                const aspectRatio = img.width / img.height;
                let drawWidth = photoWidth;
                let drawHeight = photoHeight;

                if (photoWidth / photoHeight > aspectRatio) {
                  drawWidth = photoHeight * aspectRatio;
                } else {
                  drawHeight = photoWidth / aspectRatio;
                }

                const dx = (photoWidth - drawWidth) / 2;
                const dy = (photoHeight - drawHeight) / 2;

                tempCtx.clearRect(0, 0, photoWidth, photoHeight);
                tempCtx.drawImage(img, dx, dy, drawWidth, drawHeight);

                if (filter !== "none") {
                  const imageData = tempCtx.getImageData(
                    0,
                    0,
                    photoWidth,
                    photoHeight
                  );
                  const filtered = applyFilter(imageData, filter);
                  tempCtx.putImageData(filtered, 0, 0);
                }

                // Calculate position based on layout
                let x = padding;
                let y = padding;

                if (layout === "grid-2x3") {
                  x = padding + (index % 3) * (photoWidth + padding);
                  y = padding + Math.floor(index / 3) * (photoHeight + padding);
                } else {
                  y = padding + index * (photoHeight + padding);
                }

                ctx.drawImage(tempCanvas, x, y);

                // Add border
                ctx.strokeStyle = "#444444";
                ctx.lineWidth = 2;
                ctx.strokeRect(x, y, photoWidth, photoHeight);

                resolve();
              } catch (error) {
                reject(error);
              }
            };

            img.onerror = () => {
              clearTimeout(timeout);
              reject(new Error(`Failed to load image ${index + 1}`));
            };

            img.src = photo.dataUrl;
          });
        });

        await Promise.all(photoPromises);
        setIsRendering(false);
      } catch (error) {
        console.error("Error rendering photos:", error);
        setRenderError(
          error instanceof Error ? error.message : "Failed to render photos"
        );
        setIsRendering(false);
      }
    };

    renderPhotos();
  }, [photos, filter, layout]);

  const downloadPhotoStrip = () => {
    if (!canvasRef.current) return;

    const link = document.createElement("a");
    link.download = `poto-${Date.now()}.jpg`;
    link.href = canvasRef.current.toDataURL("image/jpeg", 0.95);
    link.click();
  };

  // Get max photos for current layout
  const maxPhotos =
    layout === "single"
      ? 1
      : layout === "horizontal-2x2"
      ? 4
      : layout === "grid-2x3"
      ? 6
      : 4;

  if (photos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[500px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700/50">
        <div className="text-center">
          <div className="inline-block p-6 bg-gray-800/50 rounded-full mb-4 border border-gray-700/30">
            <ImageIcon className="w-16 h-16 text-gray-500" />
          </div>
          <p className="text-gray-300 font-semibold text-lg">No photos yet</p>
          <p className="text-gray-500 text-sm mt-2">
            Start capturing to see your photo strip ({maxPhotos}{" "}
            {maxPhotos === 1 ? "photo" : "photos"})
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-cyan-400" />
          <h3 className="text-lg font-bold text-white">Preview</h3>
        </div>
        <span className="text-sm text-gray-400">
          {photos.length}/{maxPhotos} photos
        </span>
      </div>

      <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-xl border border-gray-700/50">
        {/* Loading Overlay */}
        {isRendering && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-xl flex items-center justify-center z-10">
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mx-auto mb-3" />
              <p className="text-white font-semibold">Rendering photos...</p>
            </div>
          </div>
        )}

        {/* Error Display */}
        {renderError && (
          <div className="absolute inset-0 bg-red-900/20 backdrop-blur-sm rounded-xl flex items-center justify-center z-10 border-2 border-red-500/50">
            <div className="text-center px-6">
              <p className="text-red-400 font-bold text-lg mb-2">
                ⚠️ Rendering Error
              </p>
              <p className="text-red-300 text-sm">{renderError}</p>
              <button
                onClick={() => setRenderError("")}
                className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg font-semibold transition-all"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        <canvas ref={canvasRef} className="mx-auto rounded-lg shadow-2xl" />
      </div>

      <button
        onClick={downloadPhotoStrip}
        disabled={isRendering || !!renderError}
        className="group relative w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:scale-105 disabled:shadow-none disabled:cursor-not-allowed disabled:scale-100"
      >
        <Download className="w-5 h-5" />
        <span>{isRendering ? "Rendering..." : "Download Photo Strip"}</span>
        <div className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
      </button>
    </div>
  );
};
