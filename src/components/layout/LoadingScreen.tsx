import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BRAND } from '../../data/config';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] bg-ivory-warm flex flex-col items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-logo text-5xl md:text-6xl tracking-[0.25em] font-semibold text-charcoal">
              {BRAND.logoLine1}
            </h1>
            <p className="font-logo text-sm md:text-base tracking-[0.4em] text-gold mt-2">
              {BRAND.logoLine2}
            </p>
          </motion.div>

          {/* Animated gold line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '120px' }}
            transition={{ delay: 0.6, duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent mt-8"
          />

          {/* Subtle loading dots */}
          <div className="flex items-center gap-1.5 mt-8">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                className="w-1.5 h-1.5 rounded-full bg-gold/60"
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
