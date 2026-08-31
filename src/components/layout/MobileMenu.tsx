import { Link } from 'react-router-dom';
import { X, Heart, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS, BRAND } from '../../data/config';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { state: wishlistState } = useWishlist();
  const { user } = useAuth();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-charcoal/50 z-50"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-ivory-warm z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-beige-dark">
              <Link to="/" onClick={onClose} className="flex flex-col leading-none">
                <span className="font-logo text-2xl tracking-[0.2em] font-semibold text-charcoal">
                  {BRAND.logoLine1}
                </span>
                <span className="font-logo text-[10px] tracking-[0.3em] text-gold">
                  {BRAND.logoLine2}
                </span>
              </Link>
              <button onClick={onClose} aria-label="Close menu" className="p-2">
                <X className="h-6 w-6 text-charcoal" />
              </button>
            </div>

            {/* Links */}
            <nav className="flex-1 overflow-y-auto py-6">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                >
                  <Link
                    to={link.path}
                    onClick={onClose}
                    className="block px-8 py-4 text-[15px] tracking-[0.1em] text-charcoal/80 hover:text-charcoal hover:bg-beige/50 transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                <Link
                  to="/wishlist"
                  onClick={onClose}
                  className="flex items-center gap-3 px-8 py-4 text-[15px] tracking-[0.1em] text-charcoal/80 hover:text-charcoal hover:bg-beige/50 transition-colors"
                >
                  <Heart className="h-4 w-4" />
                  Wishlist
                  {wishlistState.items.length > 0 && (
                    <span className="ml-auto text-xs bg-wine text-ivory rounded-full h-5 w-5 flex items-center justify-center">
                      {wishlistState.items.length}
                    </span>
                  )}
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55, duration: 0.4 }}
              >
                <Link
                  to={user ? '/profile' : '/login'}
                  onClick={onClose}
                  className="flex items-center gap-3 px-8 py-4 text-[15px] tracking-[0.1em] text-charcoal/80 hover:text-charcoal hover:bg-beige/50 transition-colors"
                >
                  <User className="h-4 w-4" />
                  {user ? 'My Profile' : 'Sign In'}
                </Link>
              </motion.div>
            </nav>

            {/* Footer */}
            <div className="p-6 border-t border-beige-dark">
              <p className="text-xs text-charcoal/50 tracking-wider">
                {BRAND.tagline}
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
