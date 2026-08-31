import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import ScrollReveal from '../common/ScrollReveal';

export default function PromoBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <section
      ref={ref}
      className="relative h-[500px] md:h-[600px] overflow-hidden flex items-center justify-center"
    >
      {/* Parallax Image */}
      <motion.div style={{ y }} className="absolute inset-[-10%]">
        <img
          src="/images/festive-editorial.jpg"
          alt="Festive collection editorial"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-charcoal/50" />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <ScrollReveal>
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4 font-body">
            Limited Edition
          </p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-ivory mb-4">
            The Festive Edit
          </h2>
          <p className="text-ivory/70 text-sm md:text-base max-w-md mx-auto mb-8 font-body">
            Celebrate every occasion in timeless elegance.
          </p>
          <Link
            to="/sarees?filter=party-wear"
            className="group inline-flex items-center gap-2 px-8 py-3.5 bg-gold text-charcoal text-xs tracking-[0.15em] uppercase font-medium hover:bg-gold-light transition-all duration-300"
          >
            Shop Festive Collection
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
