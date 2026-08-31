import type { ProductCategory, PriceRange } from '../../types';
import { PRICE_RANGES, COLOR_OPTIONS } from '../../data/config';

interface FilterSidebarProps {
  selectedCategories: ProductCategory[];
  setSelectedCategories: (categories: ProductCategory[]) => void;
  selectedPriceRange: PriceRange | null;
  setSelectedPriceRange: (range: PriceRange | null) => void;
  selectedColors: string[];
  setSelectedColors: (colors: string[]) => void;
}

const CATEGORY_OPTIONS: { label: string; value: ProductCategory }[] = [
  { label: 'Silk', value: 'silk' },
  { label: 'Kanchipuram', value: 'kanchipuram' },
  { label: 'Designer', value: 'designer' },
  { label: 'Cotton', value: 'cotton' },
  { label: 'Organza', value: 'organza' },
  { label: 'Banarasi', value: 'banarasi' },
  { label: 'Party Wear', value: 'party-wear' },
  { label: 'Boutique', value: 'boutique' },
];

export default function FilterSidebar({
  selectedCategories,
  setSelectedCategories,
  selectedPriceRange,
  setSelectedPriceRange,
  selectedColors,
  setSelectedColors,
}: FilterSidebarProps) {
  const toggleCategory = (category: ProductCategory) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const toggleColor = (color: string) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c) => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  return (
    <div className="space-y-8">
      {/* Category */}
      <div>
        <h4 className="text-xs tracking-[0.2em] uppercase text-charcoal mb-4 font-body font-medium">
          Category
        </h4>
        <div className="space-y-2.5">
          {CATEGORY_OPTIONS.map((cat) => (
            <label
              key={cat.value}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat.value)}
                onChange={() => toggleCategory(cat.value)}
                className="w-4 h-4 rounded-sm border-charcoal/20 text-wine focus:ring-gold accent-wine"
              />
              <span className="text-sm text-charcoal/70 group-hover:text-charcoal transition-colors font-body">
                {cat.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h4 className="text-xs tracking-[0.2em] uppercase text-charcoal mb-4 font-body font-medium">
          Price
        </h4>
        <div className="space-y-2.5">
          {PRICE_RANGES.map((range) => (
            <label
              key={range.value}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="radio"
                name="price"
                checked={selectedPriceRange === range.value}
                onChange={() =>
                  setSelectedPriceRange(
                    selectedPriceRange === range.value ? null : range.value
                  )
                }
                className="w-4 h-4 border-charcoal/20 text-wine focus:ring-gold accent-wine"
              />
              <span className="text-sm text-charcoal/70 group-hover:text-charcoal transition-colors font-body">
                {range.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Color */}
      <div>
        <h4 className="text-xs tracking-[0.2em] uppercase text-charcoal mb-4 font-body font-medium">
          Color
        </h4>
        <div className="flex flex-wrap gap-2.5">
          {COLOR_OPTIONS.map((color) => (
            <button
              key={color.value}
              onClick={() => toggleColor(color.value)}
              className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                selectedColors.includes(color.value)
                  ? 'border-gold scale-110'
                  : 'border-charcoal/10 hover:border-charcoal/30'
              }`}
              style={{ backgroundColor: color.hex }}
              aria-label={color.label}
              title={color.label}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
