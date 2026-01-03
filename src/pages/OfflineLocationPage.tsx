import { useNavigate } from 'react-router-dom';
import { MapPin, ArrowLeft, ExternalLink } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <img src="/src/assets/fotoreklogo.png" alt="FotoRek Logo" className="w-32 h-auto" />
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-gray-900">
            <ArrowLeft className="w-5 h-5" /> Back
          </button>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Lokasi FotoRek Offline</h1>
        {locations.length === 0 ? (
          <p className="text-gray-500">No locations available yet. Check back soon!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {locations.map((loc) => (
              <div 
                key={loc.id} 
                className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm cursor-pointer"
                onClick={() => openGoogleMaps(loc.latitude, loc.longitude)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-blue-500" />
                    <h2 className="text-xl font-bold text-gray-900">{loc.name}</h2>
                  </div>
                  <ExternalLink className="w-5 h-5 text-blue-500" />
                </div>
                <p className="text-gray-600 mb-1">📍 {loc.address}</p>
                <p className="text-gray-600">🕒 {loc.hours}</p>
                <p className="text-blue-500 text-sm mt-3">
                  Click to open in Google Maps
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};