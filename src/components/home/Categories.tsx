import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollReveal from '../common/ScrollReveal';
import GoldLine from '../common/GoldLine';
import { categories } from '../../data/categories';

export default function Categories() {
  return (
    <section className="section-padding bg-ivory-warm">
      <div className="max-w-[1440px] mx-auto">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3 font-body">
              Curated Collections
            </p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-charcoal">
              Explore Our Collections
            </h2>
            <GoldLine className="mt-6" />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {categories.map((category, index) => (
            <ScrollReveal key={category.id} delay={index * 0.1}>
              <Link
                to={`/sarees?category=${category.slug}`}
                className="group relative block aspect-[3/4] overflow-hidden rounded-sm"
              >
                {/* Image with zoom */}
                <div className="absolute inset-0">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                  />
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <motion.div className="transition-transform duration-500 group-hover:-translate-y-2">
                    <h3 className="font-heading text-xl md:text-2xl text-ivory mb-1">
                      {category.name}
                    </h3>
                    <p className="text-ivory/60 text-sm font-body mb-4">
                      {category.description}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-gold text-xs tracking-[0.15em] uppercase font-body opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                      Explore
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </motion.div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
