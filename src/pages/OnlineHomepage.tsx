import {
  Camera,
  Wand2,
  Download,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export const OnlineHomepage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <img
            src="/src/assets/fotoreklogo.png"
            alt="FotoRek Logo"
            className="h-32 w-auto"
          />
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 px-4 py-2 rounded-lg font-semibold border border-gray-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Welcome to FotoRek Online
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create amazing photo memories with our professional booth experience
          </p>
        </div>

        {/* Features Grid*/}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Feature 1 */}
          <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
            <div className="bg-blue-100 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
              <Camera className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Auto Capture
            </h3>
            <p className="text-gray-600">
              3-second countdown for perfectly timed shots every time
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
            <div className="bg-blue-100 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
              <Wand2 className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Creative Filters
            </h3>
            <p className="text-gray-600">
              Apply beautiful filters to enhance your photos instantly
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
            <div className="bg-blue-100 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
              <Download className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Instant Download
            </h3>
            <p className="text-gray-600">
              Get your photo strip instantly with FotoRek watermark
            </p>
          </div>
        </div>
        {/* CTA Button */}
        <div className="text-center">
          <button
            onClick={() => navigate("/layout")}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold px-10 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            Start Photo Session
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-5xl mx-auto px-6 py-6 text-center text-sm text-gray-600">
          <p>
            Powered by <strong className="text-gray-900">FotoRek!</strong> • Capture memories, share moments
          </p>
        </div>
      </footer>
    </div>
  );
};