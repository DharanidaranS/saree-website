import { X, Minus, Plus, ShoppingBag, ArrowRight, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../data/products';
import { BRAND } from '../../data/config';

export default function CartDrawer() {
  const {
    state,
    closeCart,
    removeItem,
    updateQuantity,
    getSubtotal,
    getShipping,
    getTotal,
    getItemCount,
  } = useCart();

  const subtotal = getSubtotal();
  const freeShippingThreshold = BRAND.freeShippingThreshold;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercentage = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <AnimatePresence>
      {state.isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-charcoal/50 z-50"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-ivory-warm z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-beige-dark">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-charcoal" />
                <h2 className="font-heading text-xl text-charcoal">
                  Shopping Bag
                </h2>
                <span className="text-xs text-charcoal/40 font-body">
                  ({getItemCount()})
                </span>
              </div>
              <button
                onClick={closeCart}
                className="p-2 hover:bg-beige rounded-full transition-colors"
                aria-label="Close cart"
              >
                <X className="h-5 w-5 text-charcoal" />
              </button>
            </div>

            {/* Free Shipping Progress */}
            {state.items.length > 0 && (
              <div className="px-6 py-4 bg-beige/30 border-b border-beige-dark">
                {amountToFreeShipping > 0 ? (
                  <p className="text-xs text-charcoal/70 text-center mb-2 font-body">
                    You're <span className="font-semibold text-charcoal">{formatPrice(amountToFreeShipping)}</span> away from <span className="font-semibold text-charcoal">Free Shipping!</span>
                  </p>
                ) : (
                  <p className="text-xs text-green-700 text-center mb-2 font-body font-medium flex items-center justify-center gap-1">
                    <Truck className="h-3 w-3" />
                    You've unlocked Free Shipping!
                  </p>
                )}
                <div className="h-1.5 w-full bg-beige-dark rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={`h-full ${amountToFreeShipping > 0 ? 'bg-gold' : 'bg-green-500'}`}
                  />
                </div>
              </div>
            )}

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {state.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="h-12 w-12 text-charcoal/20 mb-4" />
                  <p className="font-heading text-lg text-charcoal mb-2">
                    Your bag is empty
                  </p>
                  <p className="text-sm text-charcoal/50 mb-6 font-body">
                    Discover our beautiful collection of sarees.
                  </p>
                  <button
                    onClick={closeCart}
                    className="inline-flex items-center gap-2 text-gold text-xs tracking-[0.15em] uppercase font-body font-medium"
                  >
                    Continue Shopping
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {state.items.map((item) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      className="flex gap-4"
                    >
                      {/* Image */}
                      <Link
                        to={`/product/${item.product.id}`}
                        onClick={closeCart}
                        className="shrink-0 w-20 h-24 overflow-hidden rounded-sm bg-beige"
                      >
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </Link>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/product/${item.product.id}`}
                          onClick={closeCart}
                          className="font-heading text-sm text-charcoal hover:text-wine transition-colors line-clamp-2"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-xs text-charcoal/40 mt-0.5 font-body capitalize">
                          {item.product.category.replace('-', ' ')}
                        </p>
                        <p className="text-sm font-semibold text-charcoal mt-1 font-body">
                          {formatPrice(item.product.price)}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-charcoal/15 rounded-sm">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity - 1
                                )
                              }
                              className="p-1.5 hover:bg-beige transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="px-3 text-sm font-body">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity + 1
                                )
                              }
                              className="p-1.5 hover:bg-beige transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="text-xs text-charcoal/40 hover:text-wine transition-colors font-body underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer - only show when items exist */}
            {state.items.length > 0 && (
              <div className="border-t border-beige-dark p-6 space-y-4">
                {/* Totals */}
                <div className="space-y-2 text-sm font-body">
                  <div className="flex justify-between text-charcoal/60">
                    <span>Subtotal</span>
                    <span>{formatPrice(getSubtotal())}</span>
                  </div>
                  <div className="flex justify-between text-charcoal/60">
                    <span>Shipping</span>
                    <span>
                      {getShipping() === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        formatPrice(getShipping())
                      )}
                    </span>
                  </div>
                  {getShipping() > 0 && (
                    <p className="text-[11px] text-charcoal/40">
                      Free shipping on orders above {BRAND.currency}
                      {BRAND.freeShippingThreshold.toLocaleString('en-IN')}
                    </p>
                  )}
                  <div className="flex justify-between text-charcoal font-semibold pt-2 border-t border-beige-dark">
                    <span>Total</span>
                    <span>{formatPrice(getTotal())}</span>
                  </div>
                </div>

                {/* Buttons */}
                <Link
                  to="/checkout"
                  onClick={closeCart}
                  className="w-full py-3.5 bg-charcoal text-ivory text-xs tracking-[0.15em] uppercase font-medium hover:bg-charcoal-light transition-colors text-center block"
                >
                  Checkout
                </Link>
                <button
                  onClick={closeCart}
                  className="w-full py-3 text-charcoal/60 text-xs tracking-[0.15em] uppercase font-body hover:text-charcoal transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
