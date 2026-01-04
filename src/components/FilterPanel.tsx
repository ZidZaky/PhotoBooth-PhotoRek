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
        <Sparkles className="w-5 h-5 text-blue-500" />
        <h3 className="text-lg font-bold text-gray-900">Filter</h3>
      </div>
      <div className="flex gap-2 flex-wrap">
        {filters.map(filter => (
          <button
            key={filter.value}
            onClick={() => onFilterChange(filter.value)}
            className={`px-5 py-3 rounded-lg font-bold border-2 ${
              currentFilter === filter.value
                ? 'bg-gradient-to-r from-blue-100 to-blue-300 text-white border-blue-200'
                : 'bg-blue-50 text-gray-600 border-blue-100'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
};