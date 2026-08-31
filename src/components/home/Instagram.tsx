import { Camera as InstagramIcon } from 'lucide-react';
import ScrollReveal from '../common/ScrollReveal';
import GoldLine from '../common/GoldLine';
import { BRAND } from '../../data/config';

const instagramImages = [
  { src: '/images/hero-saree.jpg', alt: 'AARA Silks editorial look' },
  { src: '/images/category-silk.jpg', alt: 'Silk saree detail' },
  { src: '/images/category-designer.jpg', alt: 'Designer saree collection' },
  { src: '/images/boutique-story.jpg', alt: 'Boutique style' },
  { src: '/images/festive-editorial.jpg', alt: 'Festive celebration' },
  { src: '/images/category-kanchipuram.jpg', alt: 'Kanchipuram weave' },
];

export default function Instagram() {
  return (
    <section className="section-padding bg-cream">
      <div className="max-w-[1440px] mx-auto">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3 font-body">
              @aarasilks
            </p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-charcoal">
              Follow Our Journey
            </h2>
            <p className="text-charcoal/50 text-sm mt-4 max-w-md mx-auto font-body">
              Style, stories and sarees — straight from AARA.
            </p>
            <GoldLine className="mt-6" />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {instagramImages.map((image, index) => (
              <a
                key={index}
                href={BRAND.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square overflow-hidden rounded-sm"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-colors duration-500 flex items-center justify-center">
                  <InstagramIcon className="h-6 w-6 text-ivory opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </a>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="text-center mt-10">
            <a
              href={BRAND.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-charcoal/20 text-charcoal text-xs tracking-[0.15em] uppercase font-medium hover:bg-charcoal hover:text-ivory transition-all duration-300"
            >
              <InstagramIcon className="h-4 w-4" />
              Follow Us on Instagram
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
