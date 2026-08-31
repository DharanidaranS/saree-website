import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '../components/common/ScrollReveal';
import ProductCard from '../components/product/ProductCard';
import QuickView from '../components/product/QuickView';
import FilterSidebar from '../components/shop/FilterSidebar';
import SortDropdown from '../components/shop/SortDropdown';
import { products } from '../data/products';
import type { Product, ProductCategory, PriceRange, SortOption } from '../types';
import { PRICE_RANGES } from '../data/config';

export default function SareesPage() {
  const [searchParams] = useSearchParams();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter state
  const [selectedCategories, setSelectedCategories] = useState<ProductCategory[]>(() => {
    const cat = searchParams.get('category');
    return cat ? [cat as ProductCategory] : [];
  });
  const [selectedPriceRange, setSelectedPriceRange] = useState<PriceRange | null>(null);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  // Handle URL params for filter presets
  const filterPreset = searchParams.get('filter');

  // Apply filters
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // URL-based filter presets
    if (filterPreset === 'new') {
      filtered = filtered.filter((p) => p.newArrival);
    } else if (filterPreset === 'boutique') {
      filtered = filtered.filter((p) => p.category === 'boutique');
    } else if (filterPreset === 'party-wear') {
      filtered = filtered.filter((p) => p.category === 'party-wear');
    } else if (filterPreset === 'collections') {
      // Show all — collections overview
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) => selectedCategories.includes(p.category));
    }

    // Price filter
    if (selectedPriceRange) {
      const range = PRICE_RANGES.find((r) => r.value === selectedPriceRange);
      if (range) {
        filtered = filtered.filter(
          (p) => p.price >= range.min && p.price < range.max
        );
      }
    }

    // Color filter
    if (selectedColors.length > 0) {
      filtered = filtered.filter((p) => selectedColors.includes(p.color));
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        filtered = filtered.filter((p) => p.newArrival).concat(
          filtered.filter((p) => !p.newArrival)
        );
        break;
      case 'price-low-high':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'best-selling':
        filtered.sort((a, b) => (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0));
        break;
      case 'featured':
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return filtered;
  }, [selectedCategories, selectedPriceRange, selectedColors, sortBy, filterPreset]);

  const activeFilterCount =
    selectedCategories.length +
    (selectedPriceRange ? 1 : 0) +
    selectedColors.length;

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedPriceRange(null);
    setSelectedColors([]);
  };

  const getPageTitle = () => {
    if (filterPreset === 'new') return 'New Arrivals';
    if (filterPreset === 'boutique') return 'Boutique Collection';
    if (filterPreset === 'party-wear') return 'Festive Collection';
    if (filterPreset === 'collections') return 'All Collections';
    return 'Our Sarees';
  };

  return (
    <>
      {/* Hero Banner */}
      <section className="relative h-[300px] md:h-[400px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/category-silk.jpg')" }}
        />
        <div className="absolute inset-0 bg-charcoal/60" />
        <div className="relative z-10 text-center">
          <ScrollReveal>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-ivory mb-2">
              {getPageTitle()}
            </h1>
            <p className="text-ivory/60 text-sm font-body tracking-wider">
              {filteredProducts.length} pieces to discover
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding bg-ivory-warm">
        <div className="max-w-[1440px] mx-auto">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              {/* Mobile filter toggle */}
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2.5 border border-charcoal/15 text-xs tracking-[0.1em] uppercase text-charcoal font-body rounded-sm"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="ml-1 h-5 w-5 rounded-full bg-wine text-ivory text-[10px] flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* Active filter count on desktop */}
              {activeFilterCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="hidden lg:flex items-center gap-1 text-xs text-charcoal/50 hover:text-wine transition-colors font-body"
                >
                  Clear all filters
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>

            <SortDropdown value={sortBy} onChange={setSortBy} />
          </div>

          <div className="flex gap-10">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block w-64 shrink-0">
              <FilterSidebar
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                selectedPriceRange={selectedPriceRange}
                setSelectedPriceRange={setSelectedPriceRange}
                selectedColors={selectedColors}
                setSelectedColors={setSelectedColors}
              />
            </div>

            {/* Product Grid */}
            <div className="flex-1">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-20">
                  <p className="font-heading text-2xl text-charcoal mb-2">
                    No products found
                  </p>
                  <p className="text-sm text-charcoal/50 font-body mb-6">
                    Try adjusting your filters.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="text-gold text-xs tracking-[0.15em] uppercase font-body font-medium hover:text-gold-dark transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-12">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onQuickView={setQuickViewProduct}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-charcoal/50 z-50"
              onClick={() => setIsMobileFilterOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-ivory-warm z-50 overflow-y-auto"
            >
              <div className="flex items-center justify-between p-6 border-b border-beige-dark">
                <h3 className="font-heading text-lg text-charcoal">Filters</h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  aria-label="Close filters"
                >
                  <X className="h-5 w-5 text-charcoal" />
                </button>
              </div>
              <div className="p-6">
                <FilterSidebar
                  selectedCategories={selectedCategories}
                  setSelectedCategories={setSelectedCategories}
                  selectedPriceRange={selectedPriceRange}
                  setSelectedPriceRange={setSelectedPriceRange}
                  selectedColors={selectedColors}
                  setSelectedColors={setSelectedColors}
                />
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full mt-8 py-3.5 bg-charcoal text-ivory text-xs tracking-[0.15em] uppercase font-medium"
                >
                  Show {filteredProducts.length} Results
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <QuickView
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </>
  );
}
