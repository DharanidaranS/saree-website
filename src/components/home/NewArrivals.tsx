import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import ScrollReveal from '../common/ScrollReveal';
import GoldLine from '../common/GoldLine';
import ProductCard from '../product/ProductCard';
import QuickView from '../product/QuickView';
import { getNewArrivals } from '../../data/products';
import type { Product } from '../../types';

export default function NewArrivals() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const arrivals = getNewArrivals();

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.clientWidth * 0.7;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="section-padding bg-ivory-warm">
      <div className="max-w-[1440px] mx-auto">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3 font-body">
                Just Arrived
              </p>
              <h2 className="font-heading text-3xl md:text-4xl text-charcoal">
                New Arrivals
              </h2>
              <GoldLine className="mt-4 !justify-start" />
            </div>
            <Link
              to="/sarees?filter=new"
              className="hidden md:inline-flex items-center gap-1.5 text-charcoal/60 text-xs tracking-[0.15em] uppercase hover:text-gold transition-colors"
            >
              View All
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Scroll Controls */}
        <div className="relative">
          <button
            onClick={() => scroll('left')}
            className="hidden md:flex absolute -left-4 top-1/3 z-10 h-10 w-10 items-center justify-center rounded-full bg-ivory shadow-md text-charcoal hover:bg-gold hover:text-ivory transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="hidden md:flex absolute -right-4 top-1/3 z-10 h-10 w-10 items-center justify-center rounded-full bg-ivory shadow-md text-charcoal hover:bg-gold hover:text-ivory transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Scrollable Row */}
          <div
            ref={scrollRef}
            className="flex gap-4 md:gap-6 overflow-x-auto hide-scrollbar scroll-smooth pb-4"
          >
            {arrivals.map((product) => (
              <div
                key={product.id}
                className="shrink-0 w-[72%] sm:w-[45%] md:w-[30%] lg:w-[24%]"
              >
                <ProductCard
                  product={product}
                  onQuickView={setQuickViewProduct}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile View All */}
        <div className="mt-6 text-center md:hidden">
          <Link
            to="/sarees?filter=new"
            className="inline-flex items-center gap-1.5 text-charcoal/60 text-xs tracking-[0.15em] uppercase hover:text-gold transition-colors"
          >
            View All New Arrivals
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      <QuickView
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  );
}
