import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useSearch } from '../../context/SearchContext';
import { useAuth } from '../../context/AuthContext';
import { BRAND, NAV_LINKS } from '../../data/config';
import MobileMenu from './MobileMenu';

export default function Navbar() {
  const { isScrolled } = useScrollPosition();
  const { toggleCart, getItemCount } = useCart();
  const { state: wishlistState } = useWishlist();
  const { openSearch } = useSearch();
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';
  const isTransparent = isHome && !isScrolled;

  const itemCount = getItemCount();

  return (
    <>
      <motion.nav
        initial={false}
        animate={{
          backgroundColor: isTransparent
            ? 'rgba(255,255,240,0)'
            : 'rgba(253,248,240,0.97)',
          boxShadow: isTransparent
            ? '0 0 0 rgba(0,0,0,0)'
            : '0 1px 20px rgba(0,0,0,0.06)',
        }}
        transition={{ duration: 0.4 }}
        className="fixed top-9 left-0 right-0 z-40 h-[70px]"
      >
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 h-full flex items-center justify-between">
          {/* Mobile: hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 -ml-2"
            aria-label="Open menu"
          >
            <Menu
              className={`h-6 w-6 transition-colors duration-300 ${
                isTransparent ? 'text-ivory' : 'text-charcoal'
              }`}
            />
          </button>

          {/* Logo */}
          <Link to="/" className="flex flex-col items-center leading-none">
            <span
              className={`font-logo text-2xl md:text-[28px] tracking-[0.2em] font-semibold transition-colors duration-300 ${
                isTransparent ? 'text-ivory' : 'text-charcoal'
              }`}
            >
              {BRAND.logoLine1}
            </span>
            <span
              className={`font-logo text-[10px] md:text-xs tracking-[0.3em] transition-colors duration-300 ${
                isTransparent ? 'text-gold-light' : 'text-gold'
              }`}
            >
              {BRAND.logoLine2}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`link-underline text-[13px] tracking-[0.12em] uppercase transition-colors duration-300 ${
                  isTransparent
                    ? 'text-ivory/90 hover:text-ivory'
                    : 'text-charcoal/80 hover:text-charcoal'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-3 md:gap-5">
            <button
              onClick={openSearch}
              aria-label="Search"
              className={`p-2 transition-colors duration-300 ${
                isTransparent ? 'text-ivory' : 'text-charcoal'
              }`}
            >
              <Search className="h-5 w-5" />
            </button>

            <Link
              to={user ? '/profile' : '/login'}
              className={`p-2 transition-colors duration-300 hidden md:block ${
                isTransparent ? 'text-ivory' : 'text-charcoal'
              }`}
              aria-label="Profile"
            >
              <User className="h-5 w-5" />
            </Link>

            <Link
              to="/wishlist"
              className={`p-2 relative transition-colors duration-300 hidden md:block ${
                isTransparent ? 'text-ivory' : 'text-charcoal'
              }`}
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5" />
              {wishlistState.items.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-wine text-ivory text-[10px] flex items-center justify-center font-medium">
                  {wishlistState.items.length}
                </span>
              )}
            </Link>

            <button
              onClick={toggleCart}
              className={`p-2 relative transition-colors duration-300 ${
                isTransparent ? 'text-ivory' : 'text-charcoal'
              }`}
              aria-label="Shopping bag"
            >
              <ShoppingBag className="h-5 w-5" />
              <AnimatePresence>
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-wine text-ivory text-[10px] flex items-center justify-center font-medium"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
