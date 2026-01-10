import { useNavigate } from 'react-router-dom';
import { MapPin, Camera } from 'lucide-react';

export const LandingPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-white">
      {/* Main Content */}
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-lg w-full">
          {/* Logo Section */}
          <div className="text-center mb-12">
            <img 
              src="/src/assets/fotoreklogo.png" 
              alt="FotoRek Logo" 
              className="mx-auto w-56 h-auto mb-6"
            />
            <h1 className="text-3xl font-black text-gray-900 mb-2">
              Capture Your Moments
            </h1>
            <p className="text-gray-600">
              Choose how you want to experience FotoRek
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={() => navigate('/offline')}
              className="group w-full bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-blue-400 rounded-2xl p-6 text-left shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-4 rounded-xl group-hover:bg-blue-200 transition-colors">
                  <MapPin className="w-7 h-7 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    Lokasi Offline
                  </h3>
                  <p className="text-sm text-gray-600">
                    Kunjungi booth kami di berbagai lokasi
                  </p>
                </div>
                <div className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  →
                </div>
              </div>
            </button>

            <button
              onClick={() => navigate('/online')}
              className="group w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-2xl p-6 text-left shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-4 rounded-xl group-hover:bg-white/30 transition-colors">
                  <Camera className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-1">
                    FotoRek Online
                  </h3>
                  <p className="text-sm text-blue-100">
                    Mulai sesi foto langsung dari browser
                  </p>
                </div>
                <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  →
                </div>
              </div>
            </button>
          </div>

          {/* Footer Info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Powered by <strong className="text-gray-700">FotoRek!</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};