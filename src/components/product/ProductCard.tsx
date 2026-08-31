import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { formatPrice } from '../../data/products';
import type { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const [isHovered, setIsHovered] = useState(false);
  const wishlisted = isInWishlist(product.id);

  return (
    <div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-beige mb-4">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />

          {/* Second image on hover */}
          {product.images[1] && (
            <AnimatePresence>
              {isHovered && (
                <motion.img
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  src={product.images[1]}
                  alt={`${product.name} alternate view`}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              )}
            </AnimatePresence>
          )}
        </Link>

        {/* Discount Badge */}
        {product.discount && (
          <span className="absolute top-3 left-3 bg-wine text-ivory text-[10px] tracking-wider px-2.5 py-1 font-medium">
            -{product.discount}%
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={() => toggleItem(product)}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 ${
            isHovered || wishlisted
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-2'
          } ${
            wishlisted
              ? 'bg-wine text-ivory'
              : 'bg-ivory/80 text-charcoal hover:bg-wine hover:text-ivory'
          }`}
        >
          <Heart
            className="h-4 w-4"
            fill={wishlisted ? 'currentColor' : 'none'}
          />
        </button>

        {/* Bottom Actions */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-3 flex gap-2 transition-all duration-400 ${
            isHovered
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
        >
          <button
            onClick={() => onQuickView?.(product)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-ivory/90 text-charcoal text-[11px] tracking-[0.1em] uppercase font-medium hover:bg-ivory transition-colors"
          >
            <Eye className="h-3.5 w-3.5" />
            Quick View
          </button>
          <button
            onClick={() => addItem(product)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-charcoal/90 text-ivory text-[11px] tracking-[0.1em] uppercase font-medium hover:bg-charcoal transition-colors"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            Add to Bag
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="px-1">
        <p className="text-[11px] text-gold tracking-[0.15em] uppercase font-body mb-1">
          {product.category.replace('-', ' ')}
        </p>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-heading text-base md:text-lg text-charcoal leading-snug mb-1.5 hover:text-wine transition-colors duration-300">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2">
          <span className="font-body text-sm font-semibold text-charcoal">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="font-body text-sm text-charcoal/40 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
