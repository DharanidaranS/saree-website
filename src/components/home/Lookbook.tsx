import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '../common/ScrollReveal';
import GoldLine from '../common/GoldLine';
import { Link } from 'react-router-dom';

const lookbookImages = [
  { src: '/images/hero-saree.jpg', alt: 'Burgundy silk saree editorial', name: 'Royal Burgundy Silk' },
  { src: '/images/category-silk.jpg', alt: 'Silk fabric closeup', name: 'Gold Zari Weave' },
  { src: '/images/category-kanchipuram.jpg', alt: 'Kanchipuram silk', name: 'Temple Border Classic' },
  { src: '/images/category-designer.jpg', alt: 'Designer saree', name: 'Midnight Embroidery' },
  { src: '/images/boutique-story.jpg', alt: 'Lavender organza', name: 'Lavender Dream' },
  { src: '/images/festive-editorial.jpg', alt: 'Festive saree look', name: 'Festive Gold' },
];

export default function Lookbook() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const nextImage = () =>
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % lookbookImages.length : null
    );
  const prevImage = () =>
    setLightboxIndex((prev) =>
      prev !== null
        ? (prev - 1 + lookbookImages.length) % lookbookImages.length
        : null
    );

  return (
    <section id="lookbook" className="section-padding bg-ivory-warm">
      <div className="max-w-[1440px] mx-auto">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3 font-body">
              Style Inspiration
            </p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-charcoal">
              The AARA Lookbook
            </h2>
            <GoldLine className="mt-6" />
          </div>
        </ScrollReveal>

        {/* Masonry Grid */}
        <ScrollReveal delay={0.2}>
          <div className="masonry-grid">
            {lookbookImages.map((image, index) => (
              <button
                key={index}
                onClick={() => openLightbox(index)}
                className="group block w-full overflow-hidden rounded-sm relative"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/30 transition-colors duration-500 flex items-center justify-center">
                  <span className="text-ivory text-xs tracking-[0.15em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    View Look
                  </span>
                </div>
              </button>
            ))}
          </div>
        </ScrollReveal>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-charcoal/90 z-50"
              onClick={closeLightbox}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-4 md:inset-12 z-50 flex items-center justify-center"
            >
              <button
                onClick={closeLightbox}
                className="absolute top-0 right-0 p-3 text-ivory/60 hover:text-ivory transition-colors"
                aria-label="Close lightbox"
              >
                <X className="h-6 w-6" />
              </button>

              <button
                onClick={prevImage}
                className="absolute left-0 md:left-2 p-3 text-ivory/60 hover:text-ivory transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>

              <div className="max-h-full max-w-full flex flex-col items-center">
                <img
                  src={lookbookImages[lightboxIndex].src}
                  alt={lookbookImages[lightboxIndex].alt}
                  className="max-h-[70vh] max-w-full object-contain rounded-sm"
                />
                <div className="mt-6 text-center">
                  <p className="text-ivory font-heading text-xl mb-3">
                    {lookbookImages[lightboxIndex].name}
                  </p>
                  <Link
                    to="/sarees"
                    onClick={closeLightbox}
                    className="inline-flex items-center gap-2 text-gold text-xs tracking-[0.15em] uppercase hover:text-gold-light transition-colors"
                  >
                    <ShoppingBag className="h-3.5 w-3.5" />
                    Shop This Look
                  </Link>
                </div>
              </div>

              <button
                onClick={nextImage}
                className="absolute right-0 md:right-2 p-3 text-ivory/60 hover:text-ivory transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
