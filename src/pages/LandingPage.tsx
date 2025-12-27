import { Sparkles, Camera, Image, Wand2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center">
        {/* Logo & Title */}
        <div className="mb-12 animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-black text-white mb-4 drop-shadow-2xl">
            Poto
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-medium">
            Capture Your Moments with Style
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="group bg-gray-800/30 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50 hover:bg-gray-800/50 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/20">
            <Camera className="w-12 h-12 text-cyan-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-white font-bold text-lg mb-2">Auto Capture</h3>
            <p className="text-gray-400 text-sm">3-second countdown for perfect shots</p>
          </div>
          
          <div className="group bg-gray-800/30 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50 hover:bg-gray-800/50 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/20">
            <Wand2 className="w-12 h-12 text-cyan-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-white font-bold text-lg mb-2">Creative Filters</h3>
            <p className="text-gray-400 text-sm">Multiple filters to enhance your photos</p>
          </div>
          
          <div className="group bg-gray-800/30 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50 hover:bg-gray-800/50 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/20">
            <Image className="w-12 h-12 text-cyan-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-white font-bold text-lg mb-2">Instant Download</h3>
            <p className="text-gray-400 text-sm">Download your photo strip instantly</p>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => navigate('/layout')}
          className="group relative bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black text-2xl px-12 py-6 rounded-full shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-110 overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-3 justify-center">
            <Sparkles className="w-8 h-8" />
            START NOW
            <ArrowRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>

        {/* Footer */}
        <p className="mt-12 text-gray-500 text-sm">
          p
        </p>
      </div>
    </div>
  );
};
