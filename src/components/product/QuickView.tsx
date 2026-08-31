import { useState } from 'react';
import { X, ShoppingBag, MessageCircle, Heart, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { formatPrice } from '../../data/products';
import { BRAND } from '../../data/config';
import type { Product } from '../../types';

interface QuickViewProps {
  product: Product | null;
  onClose: () => void;
}

export default function QuickView({ product, onClose }: QuickViewProps) {
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) return null;

  const wishlisted = isInWishlist(product.id);

  const handleWhatsApp = () => {
    const message = `Hi ${BRAND.name}, I am interested in the ${product.name} (${formatPrice(product.price)}). Please share availability and details.`;
    window.open(
      `https://wa.me/${BRAND.whatsapp.replace(/\+/g, '')}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  return (
    <AnimatePresence>
      {product && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-charcoal/60 z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[90%] md:max-w-3xl md:max-h-[85vh] bg-ivory-warm z-50 overflow-y-auto rounded-sm"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-ivory/80 rounded-full hover:bg-ivory transition-colors"
              aria-label="Close quick view"
            >
              <X className="h-5 w-5 text-charcoal" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {/* Image */}
              <div className="relative aspect-[3/4] md:aspect-auto">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {product.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedImage(i)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          i === selectedImage ? 'bg-gold' : 'bg-ivory/60'
                        }`}
                        aria-label={`View image ${i + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="p-6 md:p-8 flex flex-col justify-center">
                <p className="text-gold text-[11px] tracking-[0.2em] uppercase mb-2">
                  {product.category.replace('-', ' ')}
                </p>

                <h3 className="font-heading text-2xl md:text-3xl text-charcoal mb-3">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${
                        i < Math.round(product.rating)
                          ? 'text-gold fill-gold'
                          : 'text-beige-dark'
                      }`}
                    />
                  ))}
                  <span className="text-xs text-charcoal/50 ml-1">
                    ({product.reviewCount})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xl font-semibold text-charcoal">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="text-sm text-charcoal/40 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                      <span className="text-xs text-wine font-medium">
                        {product.discount}% OFF
                      </span>
                    </>
                  )}
                </div>

                <p className="text-sm text-charcoal/70 leading-relaxed mb-6">
                  {product.shortDescription || product.description.slice(0, 150) + '...'}
                </p>

                {/* Actions */}
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      addItem(product);
                      onClose();
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-charcoal text-ivory text-xs tracking-[0.15em] uppercase font-medium hover:bg-charcoal-light transition-colors"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    Add to Bag
                  </button>

                  <button
                    onClick={handleWhatsApp}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#25D366] text-white text-xs tracking-[0.15em] uppercase font-medium hover:bg-[#20BD5A] transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Order via WhatsApp
                  </button>

                  <button
                    onClick={() => toggleItem(product)}
                    className={`w-full flex items-center justify-center gap-2 py-3.5 border text-xs tracking-[0.15em] uppercase font-medium transition-colors ${
                      wishlisted
                        ? 'border-wine text-wine'
                        : 'border-charcoal/20 text-charcoal hover:border-wine hover:text-wine'
                    }`}
                  >
                    <Heart
                      className="h-4 w-4"
                      fill={wishlisted ? 'currentColor' : 'none'}
                    />
                    {wishlisted ? 'In Wishlist' : 'Add to Wishlist'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
