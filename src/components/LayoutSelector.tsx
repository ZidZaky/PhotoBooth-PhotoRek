import type { LayoutType } from '../types';
import { Layout } from 'lucide-react';

interface LayoutSelectorProps {
  currentLayout: LayoutType;
  onLayoutChange: (layout: LayoutType) => void;
}

const layouts: { value: LayoutType; label: string; icon: string }[] = [
  { value: 'vertical-4', label: '4 Vertical', icon: '║' },
  { value: 'horizontal-2x2', label: '2×2 Grid', icon: '▦' },
  { value: 'grid-2x3', label: '2×3 Grid', icon: '⊞' },
  { value: 'single', label: 'Single', icon: '□' },
];

export const LayoutSelector = ({ currentLayout, onLayoutChange }: LayoutSelectorProps) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Layout className="w-5 h-5 text-blue-500" />
        <h3 className="text-lg font-bold text-gray-900">Layout</h3>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {layouts.map(layout => (
          <button
            key={layout.value}
            onClick={() => onLayoutChange(layout.value)}
            className={`px-4 py-6 rounded-lg font-semibold border-2 ${
              currentLayout === layout.value
                ? 'bg-blue-500 text-white border-blue-600 shadow-md'
                : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'
            }`}
          >
            <div className="text-3xl mb-2">{layout.icon}</div>
            <div className="text-sm">{layout.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
};