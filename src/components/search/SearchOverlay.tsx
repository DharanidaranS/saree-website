import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { X, Search as SearchIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearch } from '../../context/SearchContext';
import { formatPrice } from '../../data/products';

export default function SearchOverlay() {
  const { isOpen, query, results, setQuery, closeSearch } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSearch();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [closeSearch]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-ivory-warm/98 z-50 overflow-y-auto"
        >
          <div className="max-w-2xl mx-auto px-6 pt-24 pb-12">
            {/* Close */}
            <button
              onClick={closeSearch}
              className="absolute top-6 right-6 p-3 text-charcoal/60 hover:text-charcoal transition-colors"
              aria-label="Close search"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Search Input */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="relative"
            >
              <SearchIcon className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-6 text-charcoal/30" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="What are you looking for?"
                className="w-full pl-10 pr-4 py-4 bg-transparent border-b-2 border-charcoal/10 text-2xl font-heading text-charcoal placeholder:text-charcoal/25 focus:outline-none focus:border-gold transition-colors"
                aria-label="Search products"
              />
            </motion.div>

            {/* Results */}
            {query.trim() && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8"
              >
                {results.length === 0 ? (
                  <p className="text-charcoal/40 text-sm font-body">
                    No results found for "{query}"
                  </p>
                ) : (
                  <>
                    <p className="text-xs text-charcoal/40 tracking-wider mb-6 font-body uppercase">
                      {results.length} result{results.length !== 1 ? 's' : ''}
                    </p>
                    <div className="space-y-4">
                      {results.map((product) => (
                        <Link
                          key={product.id}
                          to={`/product/${product.id}`}
                          onClick={closeSearch}
                          className="flex items-center gap-4 p-3 rounded-sm hover:bg-beige/50 transition-colors group"
                        >
                          <div className="w-16 h-20 shrink-0 overflow-hidden rounded-sm bg-beige">
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-heading text-base text-charcoal group-hover:text-wine transition-colors truncate">
                              {product.name}
                            </h4>
                            <p className="text-xs text-charcoal/40 capitalize font-body mt-0.5">
                              {product.category.replace('-', ' ')} • {product.fabric}
                            </p>
                            <p className="text-sm font-semibold text-charcoal mt-1 font-body">
                              {formatPrice(product.price)}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </motion.div>
            )}

            {/* Suggestions when empty */}
            {!query.trim() && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-12"
              >
                <p className="text-xs text-charcoal/30 tracking-wider mb-4 font-body uppercase">
                  Popular Searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Silk Saree', 'Kanchipuram', 'Designer', 'Organza', 'Banarasi', 'Party Wear'].map(
                    (term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="px-4 py-2 border border-charcoal/10 text-sm text-charcoal/60 font-body hover:border-gold hover:text-gold transition-colors rounded-sm"
                      >
                        {term}
                      </button>
                    )
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
