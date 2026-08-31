import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  };

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image with slow zoom */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="absolute inset-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-zoom-slow"
          style={{ backgroundImage: "url('/images/hero-saree.jpg')" }}
        />
      </motion.div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/40 to-charcoal/70" />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-6 max-w-3xl"
      >
        {/* Label */}
        <motion.p
          variants={itemVariants}
          className="text-gold text-xs md:text-sm tracking-[0.3em] uppercase mb-6 font-body"
        >
          New Collection 2026
        </motion.p>

        {/* Gold Line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '80px' }}
          transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
          className="h-[1px] bg-gold mx-auto mb-8"
        />

        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="font-heading text-4xl md:text-6xl lg:text-7xl text-ivory leading-[1.1] mb-6"
        >
          Elegance Woven
          <br />
          <span className="italic font-light">Into Every Story.</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-ivory/70 text-sm md:text-base max-w-xl mx-auto mb-10 font-body leading-relaxed"
        >
          Discover timeless sarees, contemporary boutique wear and handcrafted
          styles designed to make every occasion unforgettable.
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/sarees"
            className="group inline-flex items-center gap-2 px-8 py-3.5 bg-gold text-charcoal text-xs tracking-[0.15em] uppercase font-medium hover:bg-gold-light transition-all duration-300"
          >
            Shop Collection
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            to="/sarees?filter=boutique"
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-ivory/40 text-ivory text-xs tracking-[0.15em] uppercase font-medium hover:bg-ivory/10 transition-all duration-300"
          >
            Explore Boutique
          </Link>
        </motion.div>

        {/* View Lookbook link */}
        <motion.div variants={itemVariants} className="mt-8">
          <a
            href="#lookbook"
            className="inline-flex items-center gap-1.5 text-ivory/50 text-xs tracking-[0.15em] hover:text-gold transition-colors duration-300"
          >
            View Lookbook
            <ArrowRight className="h-3 w-3" />
          </a>
        </motion.div>
      </motion.div>

      {/* Bottom scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[1px] h-10 bg-gradient-to-b from-ivory/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}
