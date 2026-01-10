import { useNavigate } from 'react-router-dom';
import { MapPin, ArrowLeft, ExternalLink, Clock } from 'lucide-react';

const locations = [
  { 
    id: 1, 
    name: 'FotoRek Booth Jakarta', 
    address: 'Mall XYZ, Jl. Sudirman, Jakarta', 
    hours: '09:00 - 21:00',
    latitude: -6.2088,
    longitude: 106.8456
  },
  { 
    id: 2, 
    name: 'FotoRek Booth Bandung', 
    address: 'Plaza ABC, Jl. Asia Afrika, Bandung', 
    hours: '10:00 - 20:00',
    latitude: -6.9175,
    longitude: 107.6191
  },
];

export const OfflineLocationPage = () => {
  const navigate = useNavigate();

  const openGoogleMaps = (lat: number, lng: number) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

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
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">
            Lokasi FotoRek Offline
          </h1>
          <p className="text-lg text-gray-600">
            Kunjungi booth kami di berbagai lokasi
          </p>
        </div>

        {/* Locations Grid */}
        {locations.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 border border-gray-200 text-center">
            <p className="text-gray-500 text-lg">
              No locations available yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {locations.map((loc) => (
              <button
                key={loc.id}
                onClick={() => openGoogleMaps(loc.latitude, loc.longitude)}
                className="group bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-blue-400 hover:shadow-lg text-left transition-all"
              >
                {/* Header with Icon */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-xl group-hover:bg-blue-200 transition-colors flex-shrink-0">
                      <MapPin className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {loc.name}
                      </h2>
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-500 flex-shrink-0 transition-colors" />
                </div>

                {/* Location Details */}
                <div className="space-y-3 ml-14">
                  <div className="flex items-start gap-2">
                    <span className="text-gray-500 flex-shrink-0">📍</span>
                    <p className="text-gray-700 font-medium">
                      {loc.address}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <p className="text-gray-600">
                      {loc.hours}
                    </p>
                  </div>
                </div>

                {/* CTA Footer */}
                <div className="mt-4 pt-4 border-t border-gray-100 ml-14">
                  <p className="text-blue-600 text-sm font-semibold group-hover:text-blue-700 transition-colors">
                    Click to open in Google Maps →
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-5xl mx-auto px-6 py-6 text-center text-sm text-gray-600">
          <p>Powered by <strong className="text-gray-900">FotoRek!</strong></p>
        </div>
      </footer>
    </div>
  );
};