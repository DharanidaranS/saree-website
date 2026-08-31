import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Star,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  MessageCircle,
  ChevronDown,
  ChevronRight,
  Truck,
  RotateCcw,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { getProductById, formatPrice, getFeaturedProducts } from '../data/products';
import { BRAND } from '../data/config';
import ScrollReveal from '../components/common/ScrollReveal';
import GoldLine from '../components/common/GoldLine';
import ProductCard from '../components/product/ProductCard';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || '');
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<string | null>('details');

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="font-heading text-3xl text-charcoal mb-4">
            Product Not Found
          </h1>
          <Link
            to="/sarees"
            className="text-gold text-xs tracking-[0.15em] uppercase font-body"
          >
            Browse All Sarees
          </Link>
        </div>
      </div>
    );
  }

  const wishlisted = isInWishlist(product.id);
  const relatedProducts = getFeaturedProducts()
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const handleWhatsApp = () => {
    const message = `Hi ${BRAND.name}, I am interested in the ${product.name} (${formatPrice(product.price)}). Please share availability and details.`;
    window.open(
      `https://wa.me/${BRAND.whatsapp.replace(/\+/g, '')}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  const accordionSections = [
    {
      id: 'details',
      title: 'Product Details',
      content: (
        <div className="space-y-2 text-sm text-charcoal/70 font-body">
          <p><span className="font-medium text-charcoal">Fabric:</span> {product.fabric}</p>
          <p><span className="font-medium text-charcoal">Saree Length:</span> {product.sareeLength || '6.3 meters (including blouse piece)'}</p>
          <p><span className="font-medium text-charcoal">Blouse Piece:</span> {product.blouseIncluded ? 'Included (0.8m)' : 'Not included'}</p>
          <p><span className="font-medium text-charcoal">Color:</span> <span className="capitalize">{product.color}</span></p>
          {product.careInstructions && (
            <div className="pt-2">
              <p className="font-medium text-charcoal mb-1">Care Instructions:</p>
              <ul className="list-disc list-inside space-y-1 text-charcoal/60">
                {product.careInstructions.map((instruction, i) => (
                  <li key={i}>{instruction}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ),
    },
    {
      id: 'shipping',
      title: 'Shipping Information',
      content: (
        <div className="space-y-3 text-sm text-charcoal/70 font-body">
          <div className="flex items-start gap-3">
            <Truck className="h-4 w-4 mt-0.5 text-gold shrink-0" />
            <div>
              <p className="font-medium text-charcoal">Free Shipping</p>
              <p>Free shipping on orders above {BRAND.currency}{BRAND.freeShippingThreshold.toLocaleString('en-IN')}. Standard delivery within 5-7 business days.</p>
            </div>
          </div>
          <p>{product.shippingInfo || 'Free shipping across India. Delivery within 5-7 business days.'}</p>
        </div>
      ),
    },
    {
      id: 'returns',
      title: 'Return Policy',
      content: (
        <div className="space-y-3 text-sm text-charcoal/70 font-body">
          <div className="flex items-start gap-3">
            <RotateCcw className="h-4 w-4 mt-0.5 text-gold shrink-0" />
            <div>
              <p className="font-medium text-charcoal">Easy Returns</p>
              <p>{product.returnPolicy || 'Easy 7-day return policy. Item must be unused with original tags.'}</p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      {/* Breadcrumb */}
      <div className="pt-[110px] pb-4 px-6 md:px-8 max-w-[1440px] mx-auto">
        <nav className="flex items-center gap-2 text-xs text-charcoal/40 font-body">
          <Link to="/" className="hover:text-charcoal transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/sarees" className="hover:text-charcoal transition-colors">Sarees</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-charcoal/70">{product.name}</span>
        </nav>
      </div>

      {/* Product Section */}
      <section className="px-6 md:px-8 pb-16 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image Gallery */}
          <div className="flex flex-col gap-4">
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="aspect-[3/4] overflow-hidden rounded-sm bg-beige group cursor-crosshair"
            >
              <motion.img
                whileHover={{ scale: 1.5 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover origin-center"
              />
            </motion.div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-20 h-24 overflow-hidden rounded-sm border-2 transition-colors ${
                      i === selectedImage
                        ? 'border-gold'
                        : 'border-transparent hover:border-charcoal/20'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="lg:py-4 lg:sticky lg:top-32 lg:h-fit">
            <p className="text-gold text-[11px] tracking-[0.2em] uppercase mb-2 font-body">
              {product.category.replace('-', ' ')}
            </p>

            <h1 className="font-heading text-3xl md:text-4xl text-charcoal mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-5">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.round(product.rating)
                        ? 'text-gold fill-gold'
                        : 'text-beige-dark'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-charcoal/50 font-body">
                ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl font-semibold text-charcoal font-body">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-base text-charcoal/40 line-through font-body">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="px-2 py-0.5 bg-wine/10 text-wine text-xs font-medium font-body rounded-sm">
                    {product.discount}% OFF
                  </span>
                </>
              )}
            </div>

            <GoldLine className="mb-6 !justify-start" width="50px" />

            <p className="text-sm text-charcoal/70 leading-relaxed mb-8 font-body">
              {product.description}
            </p>

            {/* Quantity */}
            <div className="mb-6">
              <p className="text-xs tracking-[0.15em] uppercase text-charcoal/60 mb-3 font-body">
                Quantity
              </p>
              <div className="inline-flex items-center border border-charcoal/15 rounded-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-beige transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-6 text-base font-body font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-beige transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 mb-8">
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => addItem(product, quantity)}
                  className="flex-1 flex items-center justify-center gap-2 py-4 bg-charcoal text-ivory text-xs tracking-[0.15em] uppercase font-medium hover:bg-charcoal-light transition-colors"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Add to Cart
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleItem(product)}
                  className={`p-4 border transition-colors ${
                    wishlisted
                      ? 'border-wine text-wine bg-wine/5'
                      : 'border-charcoal/15 text-charcoal hover:border-wine hover:text-wine'
                  }`}
                  aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart
                    className="h-5 w-5"
                    fill={wishlisted ? 'currentColor' : 'none'}
                  />
                </motion.button>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gold text-charcoal text-xs tracking-[0.15em] uppercase font-medium hover:bg-gold-light transition-colors"
              >
                Buy Now
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleWhatsApp}
                className="w-full flex items-center justify-center gap-2 py-4 bg-[#25D366] text-white text-xs tracking-[0.15em] uppercase font-medium hover:bg-[#20BD5A] transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                Order via WhatsApp
              </motion.button>
            </div>

            {/* Accordions */}
            <div className="border-t border-charcoal/10">
              {accordionSections.map((section) => (
                <div key={section.id} className="border-b border-charcoal/10">
                  <button
                    onClick={() => toggleAccordion(section.id)}
                    className="w-full flex items-center justify-between py-4 text-left"
                  >
                    <span className="text-sm font-medium text-charcoal font-body">
                      {section.title}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-charcoal/40 transition-transform ${
                        openAccordion === section.id ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openAccordion === section.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="pb-4"
                    >
                      {section.content}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="section-padding bg-cream">
          <div className="max-w-[1440px] mx-auto">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="font-heading text-3xl text-charcoal">
                  You May Also Like
                </h2>
                <GoldLine className="mt-4" />
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
