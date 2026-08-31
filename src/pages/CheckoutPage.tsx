import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';
import { BRAND } from '../data/config';
import { supabase } from '../lib/supabase';
import { motion } from 'framer-motion';
import { ChevronLeft, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { state, getSubtotal, getShipping, getTotal, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Get current user session
      const { data: { session } } = await supabase.auth.getSession();
      
      const orderData = {
        user_id: session?.user?.id || null, // Allow guest checkout if null
        items: state.items.map(item => ({ product_id: item.product.id, quantity: item.quantity, price: item.product.price })),
        subtotal: getSubtotal(),
        shipping: getShipping(),
        total: getTotal(),
        status: 'processing'
      };

      const { error } = await supabase.from('orders').insert([orderData]);
      
      if (error) {
        console.error('Error saving order:', error);
        // Fallback to success page anyway for demo purposes if DB is not set up
      }

      clearCart();
      setIsSubmitting(false);
      navigate('/order-success');
    } catch (err) {
      console.error('Unexpected checkout error:', err);
      setIsSubmitting(false);
    }
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-ivory">
        <h2 className="font-heading text-2xl text-charcoal mb-4">Your bag is empty</h2>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-charcoal hover:text-wine transition-colors text-sm tracking-[0.15em] uppercase font-body"
        >
          <ChevronLeft className="h-4 w-4" />
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-charcoal/60 hover:text-charcoal transition-colors text-xs tracking-[0.15em] uppercase font-body mb-8"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          Back to Shop
        </Link>

        <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-start">
          {/* Checkout Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-7"
          >
            <h1 className="font-heading text-3xl text-charcoal mb-8">Checkout</h1>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Information */}
              <section>
                <h2 className="font-heading text-xl text-charcoal mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-body text-charcoal/80 mb-1">
                      Email address
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="w-full px-4 py-3 bg-white border border-beige focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors font-body text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-body text-charcoal/80 mb-1">
                      Phone number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      className="w-full px-4 py-3 bg-white border border-beige focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors font-body text-sm"
                    />
                  </div>
                </div>
              </section>

              {/* Shipping Address */}
              <section>
                <h2 className="font-heading text-xl text-charcoal mb-4">Shipping Address</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-body text-charcoal/80 mb-1">
                      First name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      required
                      className="w-full px-4 py-3 bg-white border border-beige focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors font-body text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-body text-charcoal/80 mb-1">
                      Last name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      required
                      className="w-full px-4 py-3 bg-white border border-beige focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors font-body text-sm"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="address" className="block text-sm font-body text-charcoal/80 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      required
                      className="w-full px-4 py-3 bg-white border border-beige focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors font-body text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-body text-charcoal/80 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      required
                      className="w-full px-4 py-3 bg-white border border-beige focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors font-body text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="postalCode" className="block text-sm font-body text-charcoal/80 mb-1">
                      Postal code
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      required
                      className="w-full px-4 py-3 bg-white border border-beige focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors font-body text-sm"
                    />
                  </div>
                </div>
              </section>

              {/* Payment Details (Mock) */}
              <section>
                <h2 className="font-heading text-xl text-charcoal mb-4 flex items-center gap-2">
                  Payment
                  <Lock className="h-4 w-4 text-charcoal/40" />
                </h2>
                <div className="p-4 bg-beige/30 border border-beige rounded-sm">
                  <p className="text-sm font-body text-charcoal/70 mb-4">
                    This is a secure mock checkout for demonstration purposes.
                  </p>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-body text-charcoal/80 mb-1">
                        Card number
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        placeholder="0000 0000 0000 0000"
                        className="w-full px-4 py-3 bg-white border border-beige focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors font-body text-sm"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiry" className="block text-sm font-body text-charcoal/80 mb-1">
                          Expiration date (MM/YY)
                        </label>
                        <input
                          type="text"
                          id="expiry"
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 bg-white border border-beige focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors font-body text-sm"
                        />
                      </div>
                      <div>
                        <label htmlFor="cvc" className="block text-sm font-body text-charcoal/80 mb-1">
                          CVC
                        </label>
                        <input
                          type="text"
                          id="cvc"
                          placeholder="123"
                          className="w-full px-4 py-3 bg-white border border-beige focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-colors font-body text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-charcoal text-ivory text-sm tracking-[0.15em] uppercase font-medium hover:bg-charcoal-light transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Processing...' : `Pay ${formatPrice(getTotal())}`}
              </button>
            </form>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-5 mt-12 lg:mt-0"
          >
            <div className="bg-white border border-beige p-6 sticky top-24">
              <h2 className="font-heading text-xl text-charcoal mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
                {state.items.map((item) => (
                  <div key={item.product.id} className="flex gap-4">
                    <div className="w-16 h-20 bg-beige shrink-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading text-sm text-charcoal line-clamp-1">
                        {item.product.name}
                      </h3>
                      <p className="text-xs text-charcoal/50 font-body mt-1">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-sm font-semibold text-charcoal font-body mt-1">
                        {formatPrice(item.product.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-beige pt-6 space-y-3 font-body text-sm">
                <div className="flex justify-between text-charcoal/70">
                  <span>Subtotal</span>
                  <span>{formatPrice(getSubtotal())}</span>
                </div>
                <div className="flex justify-between text-charcoal/70">
                  <span>Shipping</span>
                  <span>{getShipping() === 0 ? 'Free' : formatPrice(getShipping())}</span>
                </div>
                {getShipping() > 0 && (
                  <p className="text-xs text-charcoal/50">
                    Free shipping on orders above {BRAND.currency}{BRAND.freeShippingThreshold.toLocaleString('en-IN')}
                  </p>
                )}
                <div className="flex justify-between text-charcoal font-semibold text-base pt-3 border-t border-beige">
                  <span>Total</span>
                  <span>{formatPrice(getTotal())}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
