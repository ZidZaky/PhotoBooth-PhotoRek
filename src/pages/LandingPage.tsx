import { useNavigate } from 'react-router-dom';
import { MapPin, Camera } from 'lucide-react';

export const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8">
        <img src="/src/assets/fotoreklogo.png" alt="FotoRek Logo" className="mx-auto w-48 h-auto" />
        <div className="flex flex-col gap-4">
          <button
            onClick={() => navigate('/offline')}
            className="bg-gradient-to-r from-blue-100 to-blue-300 text-white font-bold py-4 px-6 rounded-xl shadow-md flex items-center justify-center gap-2"
          >
            <MapPin className="w-6 h-6" />
            Lokasi FotoRek Offline
          </button>
          <button
            onClick={() => navigate('/online')}
            className="bg-gradient-to-r from-blue-100 to-blue-300 text-white font-bold py-4 px-6 rounded-xl shadow-md flex items-center justify-center gap-2"
          >
            <Camera className="w-6 h-6" />
            FotoRek Online
          </button>
        </div>
      </div>
    </div>
  );
};