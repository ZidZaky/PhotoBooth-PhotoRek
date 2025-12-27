import type { LayoutType } from '../types';
import { Layout } from 'lucide-react';

interface LayoutSelectorProps {
  currentLayout: LayoutType;
  onLayoutChange: (layout: LayoutType) => void;
}

const layouts: { value: LayoutType; label: string; icon: string }[] = [
  { value: 'vertical-4', label: '4 Vertical', icon: '║' },
  { value: 'horizontal-2x2', label: '2×2 Grid', icon: '▦' },
  { value: 'single', label: 'Single', icon: '□' },
];

export const LayoutSelector = ({ currentLayout, onLayoutChange }: LayoutSelectorProps) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Layout className="w-5 h-5 text-cyan-400" />
        <h3 className="text-lg font-bold text-white">Layout</h3>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {layouts.map(layout => (
          <button
            key={layout.value}
            onClick={() => onLayoutChange(layout.value)}
            className={`group relative px-3 py-2.5 rounded-lg font-semibold transition-all duration-300 ${
              currentLayout === layout.value
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50 scale-105'
                : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white border border-gray-600/50 backdrop-blur-sm'
            }`}
          >
            <div className="text-xl mb-1">{layout.icon}</div>
            <div className="text-xs">{layout.label}</div>
            {currentLayout === layout.value && (
              <div className="absolute inset-0 rounded-lg bg-white opacity-10"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
