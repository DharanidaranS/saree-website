import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { SORT_OPTIONS } from '../../data/config';
import type { SortOption } from '../../types';

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const currentLabel = SORT_OPTIONS.find((o) => o.value === value)?.label || 'Sort';

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2.5 border border-charcoal/15 text-xs tracking-[0.1em] text-charcoal font-body rounded-sm"
      >
        Sort: {currentLabel}
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-20" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-full mt-1 w-48 bg-ivory border border-charcoal/10 shadow-lg z-30 rounded-sm">
            {SORT_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-sm font-body transition-colors hover:bg-beige/50 ${
                  value === option.value
                    ? 'text-gold font-medium'
                    : 'text-charcoal/70'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
