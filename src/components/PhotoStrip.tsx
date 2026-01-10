import { useEffect, useRef, useState } from "react";
import type { Photo, FilterType, LayoutType } from "../types";
import { applyFilter } from "../utils/filters";
import { Download, Image as ImageIcon, Loader2 } from "lucide-react";

interface PhotoStripProps {
  photos: Photo[];
  filter: FilterType;
  layout: LayoutType;
  showDownload?: boolean;
}

export const PhotoStrip = ({
  photos,
  filter,
  layout,
  showDownload = true,
}: PhotoStripProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRendering, setIsRendering] = useState(false);
  const [renderError, setRenderError] = useState<string>("");

  useEffect(() => {
    if (photos.length === 0 || !canvasRef.current) return;
    renderPhotoStrip();
  }, [photos, filter, layout]);

  const renderPhotoStrip = async () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setIsRendering(true);
    setRenderError("");

    try {
      
      let CANVAS_WIDTH: number;
      let CANVAS_HEIGHT: number;
      let photoWidth: number;
      let photoHeight: number;
      let maxPhotos: number;
      let cols: number;
      let rows: number;

      const WATERMARK_HEIGHT = 60;
      const FRAME_PADDING = 40;

      
      // Layout B, C, D: 1200×1800 (grid)
      if (layout === "vertical-4") {
        
        CANVAS_WIDTH = 600;
        CANVAS_HEIGHT = 1800;
        cols = 1;
        rows = 4;
        photoWidth = CANVAS_WIDTH - (FRAME_PADDING * 2);
        photoHeight = (CANVAS_HEIGHT - WATERMARK_HEIGHT - (FRAME_PADDING * (rows + 1))) / rows;
        maxPhotos = 4;
      } else if (layout === "horizontal-2x2") {
       
        CANVAS_WIDTH = 1200;
        CANVAS_HEIGHT = 1800;
        cols = 2;
        rows = 2;
        photoWidth = (CANVAS_WIDTH - (FRAME_PADDING * (cols + 1))) / cols;
        photoHeight = (CANVAS_HEIGHT - WATERMARK_HEIGHT - (FRAME_PADDING * (rows + 1))) / rows;
        maxPhotos = 4;
      } else if (layout === "grid-2x3") {
        
        CANVAS_WIDTH = 1200;
        CANVAS_HEIGHT = 1800;
        cols = 2;
        rows = 3;
        photoWidth = (CANVAS_WIDTH - (FRAME_PADDING * (cols + 1))) / cols;
        photoHeight = (CANVAS_HEIGHT - WATERMARK_HEIGHT - (FRAME_PADDING * (rows + 1))) / rows;
        maxPhotos = 6;
      } else {
       
        CANVAS_WIDTH = 1200;
        CANVAS_HEIGHT = 1800;
        cols = 1;
        rows = 1;
        photoWidth = CANVAS_WIDTH - (FRAME_PADDING * 2);
        photoHeight = CANVAS_HEIGHT - WATERMARK_HEIGHT - (FRAME_PADDING * 2);
        maxPhotos = 1;
      }

      // Set canvas to standard size
      canvas.width = CANVAS_WIDTH;
      canvas.height = CANVAS_HEIGHT;

      // White background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Render photos
      const photoPromises = photos.slice(0, maxPhotos).map((photo, index) => {
        return new Promise<void>((resolve, reject) => {
          const img = new Image();
          const timeout = setTimeout(() => {
            reject(new Error(`Timeout loading image ${index + 1}`));
          }, 5000);

          img.onload = () => {
            clearTimeout(timeout);
            try {
              // Calculate position (grid layout)
              const col = index % cols;
              const row = Math.floor(index / cols);
              const x = FRAME_PADDING + col * (photoWidth + FRAME_PADDING);
              const y = FRAME_PADDING + row * (photoHeight + FRAME_PADDING);

              // Create temp canvas for processing
              const tempCanvas = document.createElement("canvas");
              tempCanvas.width = photoWidth;
              tempCanvas.height = photoHeight;
              const tempCtx = tempCanvas.getContext("2d");

              if (!tempCtx) {
                reject(new Error("Failed to get canvas context"));
                return;
              }

              const imgAspect = img.width / img.height;
              const boxAspect = photoWidth / photoHeight;

              let drawWidth: number;
              let drawHeight: number;
              let drawX: number;
              let drawY: number;

              if (imgAspect > boxAspect) {
                // Image lebih lebar - scale berdasarkan height
                drawHeight = photoHeight;
                drawWidth = drawHeight * imgAspect;
                drawX = (photoWidth - drawWidth) / 2;
                drawY = 0;
              } else {
                // Image lebih tinggi - scale berdasarkan width
                drawWidth = photoWidth;
                drawHeight = drawWidth / imgAspect;
                drawX = 0;
                drawY = (photoHeight - drawHeight) / 2;
              }

              // Draw scaled image (FIT mode - no crop, centered)
              tempCtx.drawImage(
                img,
                drawX, drawY, drawWidth, drawHeight
              );

              // Apply filter
              if (filter !== "none") {
                const imageData = tempCtx.getImageData(0, 0, photoWidth, photoHeight);
                const filtered = applyFilter(imageData, filter);
                tempCtx.putImageData(filtered, 0, 0);
              }

              // Draw to main canvas
              ctx.drawImage(tempCanvas, x, y);

              // Add subtle border
              ctx.strokeStyle = "#e0e0e0";
              ctx.lineWidth = 1;
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

      //  ADD WATERMARK
      const watermarkY = canvas.height - 30;
      ctx.font = "bold 16px Arial, sans-serif";
      ctx.fillStyle = "#666666";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("FotoRek!", canvas.width / 2, watermarkY);

      setIsRendering(false);
    } catch (error) {
      console.error("Error rendering photos:", error);
      setRenderError(
        error instanceof Error ? error.message : "Failed to render photos"
      );
      setIsRendering(false);
    }
  };

  const downloadPhotoStrip = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = `fotorek-${Date.now()}.jpg`;
    link.href = canvasRef.current.toDataURL("image/jpeg", 0.95);
    link.click();
  };

  const maxPhotos =
    layout === "single" ? 1
    : layout === "horizontal-2x2" ? 4
    : layout === "grid-2x3" ? 6
    : 4;

  // Get current canvas size for download button
  const canvasSize = layout === "vertical-4" 
    ? "600×1800px"
    : "1200×1800px";

  if (photos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[500px] bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border border-gray-200">
        <div className="text-center">
          <div className="inline-block p-6 bg-white rounded-full mb-4 border border-gray-200 shadow-sm">
            <ImageIcon className="w-16 h-16 text-gray-400" />
          </div>
          <p className="text-gray-600 font-semibold text-lg">No photos yet</p>
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
          <ImageIcon className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-bold text-gray-700">Preview</h3>
        </div>
        <span className="text-sm text-gray-500">
          {photos.length}/{maxPhotos} photos
        </span>
      </div>

      <div className="relative bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-xl border border-gray-200">
        {/* Loading Overlay */}
        {isRendering && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center z-10">
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-3" />
              <p className="text-gray-700 font-semibold">Rendering photos...</p>
            </div>
          </div>
        )}

        {/* Error Display */}
        {renderError && (
          <div className="absolute inset-0 bg-red-50 backdrop-blur-sm rounded-xl flex items-center justify-center z-10 border-2 border-red-200">
            <div className="text-center px-6">
              <p className="text-red-600 font-bold text-lg mb-2">
                ⚠️ Rendering Error
              </p>
              <p className="text-red-500 text-sm">{renderError}</p>
              <button
                onClick={() => setRenderError("")}
                className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        <canvas 
          ref={canvasRef} 
          className="mx-auto rounded-lg shadow-lg"
          style={{
            maxWidth: "100%",
            height: "auto",
            maxHeight: "70vh"
          }}
        />
      </div>

      {showDownload && (
        <button
          onClick={downloadPhotoStrip}
          disabled={isRendering || !!renderError}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:bg-blue-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 shadow-md disabled:cursor-not-allowed"
        >
          <Download className="w-5 h-5" />
          <span>{isRendering ? "Rendering..." : `Download Photo Strip (${canvasSize})`}</span>
        </button>
      )}
    </div>
  );
};