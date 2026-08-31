import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface GoldLineProps {
  className?: string;
  width?: string;
  centered?: boolean;
}

export default function GoldLine({
  className = '',
  width = '80px',
  centered = true,
}: GoldLineProps) {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <div
      ref={ref}
      className={`${centered ? 'flex justify-center' : ''} ${className}`}
    >
      <motion.div
        initial={{ width: 0 }}
        animate={isVisible ? { width } : { width: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent"
      />
    </div>
  );
}
