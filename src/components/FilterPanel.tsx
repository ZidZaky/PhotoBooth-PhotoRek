import type { FilterType } from '../types';
import { Sparkles } from 'lucide-react';

interface FilterPanelProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const filters: { value: FilterType; label: string }[] = [
  { value: 'none', label: 'Original' },
  { value: 'grayscale', label: 'B&W' },
  { value: 'sepia', label: 'Sepia' },
  { value: 'vintage', label: 'Vintage' },
  { value: 'cool', label: 'Cool' },
  { value: 'warm', label: 'Warm' },
];

export const FilterPanel = ({ currentFilter, onFilterChange }: FilterPanelProps) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-cyan-400" />
        <h3 className="text-lg font-bold text-white">Filter</h3>
      </div>
      <div className="flex gap-2 flex-wrap">
        {filters.map(filter => (
          <button
            key={filter.value}
            onClick={() => onFilterChange(filter.value)}
            className={`px-5 py-3 rounded-lg font-bold transition-all duration-300 ${
              currentFilter === filter.value
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50 scale-105'
                : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white border border-gray-600/50'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
};
