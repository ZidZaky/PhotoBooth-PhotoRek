import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export const LayoutSelectionPage = () => {
  const navigate = useNavigate();
  const [selectedLayout, setSelectedLayout] = useState<'vertical-4' | 'horizontal-2x2' | 'single' | 'grid-2x3'>('vertical-4');

  const layouts = [
    {
      id: 'vertical-4' as const,
      name: 'Layout A',
      description: '4 Vertical Poses',
      preview: '4 Photos',
      grid: 'grid-rows-4 grid-cols-1'
    },
    {
      id: 'horizontal-2x2' as const,
      name: 'Layout B',
      description: '2×2 Grid',
      preview: '4 Photos',
      grid: 'grid-rows-2 grid-cols-2'
    },
    {
      id: 'single' as const,
      name: 'Layout C',
      description: 'Single Photo',
      preview: '1 Photo',
      grid: 'grid-rows-1 grid-cols-1'
    },
    {
      id: 'grid-2x3' as const,
      name: 'Layout D',
      description: '2×3 Grid',
      preview: '6 Photos',
      grid: 'grid-rows-2 grid-cols-3'
    },
  ];

  const handleContinue = () => {
    navigate('/booth', { state: { layout: selectedLayout } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-2">
            Choose your layout
          </h1>
          <p className="text-sm md:text-base text-gray-500">
            Select a layout for your photo session.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8 max-w-2xl mx-auto">
          {layouts.map((layout) => (
            <button
              key={layout.id}
              onClick={() => setSelectedLayout(layout.id)}
              className={`relative bg-white rounded-xl p-6 border border-blue-100 shadow-sm ${
                selectedLayout === layout.id
                  ? 'ring-2 ring-blue-400'
                  : ''
              }`}
            >
              <div className="mb-4 flex items-center justify-center">
                <div className={`grid ${layout.grid} gap-1 bg-blue-50 rounded-lg p-2 ${
                  layout.id === 'vertical-4' ? 'w-20 h-28' :
                  layout.id === 'horizontal-2x2' ? 'w-24 h-24' :
                  layout.id === 'single' ? 'w-24 h-32' :
                  'w-24 h-20'
                }`}>
                  {Array.from({ length: layout.id === 'single' ? 1 : layout.id === 'grid-2x3' ? 6 : 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400 rounded flex items-center justify-center text-white font-bold text-xs"
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>

              <h3 className="text-lg font-black text-gray-900 mb-1">{layout.name}</h3>
              <p className="text-sm text-gray-500 font-semibold">{layout.description}</p>
              
              {selectedLayout === layout.id && (
                <div className="absolute -top-2 -right-2 bg-gradient-to-br from-blue-100 to-blue-300 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                  ✓
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate('/')}
            className="bg-white text-gray-900 font-bold px-8 py-4 rounded-full border border-blue-100 shadow-sm flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          
          <button
            onClick={handleContinue}
            className="bg-gradient-to-r from-blue-100 to-blue-300 text-white font-bold px-12 py-4 rounded-full shadow-md flex items-center gap-2"
          >
            Continue
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};