import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '../common/ScrollReveal';
import GoldLine from '../common/GoldLine';

export default function BoutiqueStory() {
  return (
    <section className="section-padding bg-ivory-warm overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          {/* Image */}
          <ScrollReveal direction="right">
            <div className="relative aspect-[3/4] lg:aspect-[4/5] overflow-hidden rounded-sm">
              <img
                src="/images/boutique-story.jpg"
                alt="AARA Boutique Collection"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Decorative frame */}
              <div className="absolute inset-4 border border-gold/20 pointer-events-none rounded-sm" />
            </div>
          </ScrollReveal>

          {/* Content */}
          <ScrollReveal direction="left" delay={0.2}>
            <div className="lg:pr-8">
              <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4 font-body">
                The Boutique
              </p>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-[42px] text-charcoal leading-[1.15] mb-6">
                More Than A Saree.
                <br />
                <span className="italic font-light">It's Your Story.</span>
              </h2>
              <GoldLine className="mb-6 !justify-start" />
              <p className="text-charcoal/60 text-sm leading-relaxed mb-4 font-body">
                Our boutique collection brings together contemporary silhouettes,
                traditional craftsmanship and thoughtful detailing for women who
                love to express themselves.
              </p>
              <p className="text-charcoal/60 text-sm leading-relaxed mb-8 font-body">
                Each piece is designed to transition effortlessly between moments —
                from morning celebrations to evening soirées.
              </p>
              <Link
                to="/sarees?filter=boutique"
                className="group inline-flex items-center gap-2 text-charcoal text-xs tracking-[0.15em] uppercase font-medium hover:text-gold transition-colors duration-300"
              >
                Discover Boutique
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
