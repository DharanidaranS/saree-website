import { useState } from 'react';
import ScrollReveal from '../common/ScrollReveal';
import GoldLine from '../common/GoldLine';
import ProductGrid from '../product/ProductGrid';
import QuickView from '../product/QuickView';
import { getFeaturedProducts } from '../../data/products';
import type { Product } from '../../types';

export default function FeaturedProducts() {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const featured = getFeaturedProducts();

  return (
    <section className="section-padding bg-cream">
      <div className="max-w-[1440px] mx-auto">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3 font-body">
              Handpicked Styles
            </p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-charcoal">
              Curated For You
            </h2>
            <p className="text-charcoal/50 text-sm mt-4 max-w-md mx-auto font-body">
              Discover pieces that make every moment unforgettable.
            </p>
            <GoldLine className="mt-6" />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <ProductGrid
            products={featured}
            onQuickView={setQuickViewProduct}
          />
        </ScrollReveal>
      </div>

      <QuickView
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  );
}
