import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export const LayoutSelectionPage = () => {
  const navigate = useNavigate();
  const [selectedLayout, setSelectedLayout] = useState<'vertical-4' | 'horizontal-2x2' | 'single' | 'grid-2x3'>('vertical-4');

  // layout definitions
  const layouts = [
    {
      id: 'vertical-4' as const,
      name: 'Layout A',
      description: '4 Vertical Poses',
      preview: '4 Photos',
      cols: 1,
      rows: 4,
      icon: '║'
    },
    {
      id: 'horizontal-2x2' as const,
      name: 'Layout B',
      description: '2×2 Grid',
      preview: '4 Photos',
      cols: 2,
      rows: 2,
      icon: '▦'
    },
    {
      id: 'grid-2x3' as const,
      name: 'Layout C',
      description: '2×3 Grid (Vertical)',
      preview: '6 Photos',
      cols: 2,
      rows: 3, 
      icon: '⊞'
    },
    {
      id: 'single' as const,
      name: 'Layout D',
      description: 'Single Photo',
      preview: '1 Photo',
      cols: 1,
      rows: 1,
      icon: '□'
    },
  ];

  const handleContinue = () => {
    navigate('/booth', { state: { layout: selectedLayout } });
  };

  // 
  const renderGridPreview = (layout: typeof layouts[0]) => {
    const totalPhotos = layout.rows * layout.cols;
    const items = Array.from({ length: totalPhotos }, (_, i) => i + 1);
    
    return (
      <div 
        className="grid gap-1 bg-blue-50 rounded-lg p-2"
        style={{
          gridTemplateColumns: `repeat(${layout.cols}, 1fr)`,
          gridTemplateRows: `repeat(${layout.rows}, 1fr)`,
          // proprotional sizing
          width: layout.cols === 1 ? '60px' : layout.cols === 2 ? '100px' : '120px',
          height: layout.rows === 1 ? '80px' : layout.rows === 2 ? '120px' : layout.rows === 3 ? '150px' : '160px',
        }}
      >
        {items.map((num) => (
          <div
            key={num}
            className="bg-blue-500 rounded flex items-center justify-center text-white font-bold text-xs"
          >
            {num}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">
            Choose Your Layout
          </h1>
          <p className="text-base text-gray-600">
            Select the perfect layout for your photo session
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-2 gap-6 mb-10 max-w-2xl mx-auto">
          {layouts.map((layout) => (
            <button
              key={layout.id}
              onClick={() => setSelectedLayout(layout.id)}
              className={`relative bg-white rounded-2xl p-6 border-2 transition-all ${
                selectedLayout === layout.id
                  ? 'border-blue-500 shadow-lg'
                  : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
              }`}
            >
              {/* Icon Preview */}
              <div className="mb-4 flex items-center justify-center">
                {renderGridPreview(layout)}
              </div>

              {/* Text Content */}
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {layout.name}
              </h3>
              <p className="text-sm text-gray-600 font-medium mb-1">
                {layout.description}
              </p>
              <p className="text-xs text-blue-600 font-semibold">
                {layout.preview}
              </p>

              {/* Selected Checkmark */}
              {selectedLayout === layout.id && (
                <div className="absolute -top-3 -right-3 bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold shadow-lg">
                  ✓
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate('/online')}
            className="bg-white hover:bg-gray-50 text-gray-900 font-bold px-8 py-4 rounded-xl border-2 border-gray-200 flex items-center gap-2 shadow-sm"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          
          <button
            onClick={handleContinue}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold px-12 py-4 rounded-xl flex items-center gap-2 shadow-lg"
          >
            Continue
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};