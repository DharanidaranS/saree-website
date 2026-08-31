import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';

export default function OrderSuccessPage() {
  const orderNumber = Math.floor(100000 + Math.random() * 900000);

  return (
    <div className="min-h-screen bg-ivory pt-32 pb-12 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white p-8 sm:p-12 border border-beige text-center"
      >
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-16 w-16 text-green-600" />
        </div>
        
        <h1 className="font-heading text-3xl text-charcoal mb-2">Order Confirmed</h1>
        <p className="font-body text-charcoal/60 mb-8">
          Thank you for your purchase. Your order has been received and is being processed.
        </p>

        <div className="bg-beige/30 py-4 px-6 mb-8 rounded-sm">
          <p className="font-body text-sm text-charcoal/70 mb-1">Order Number</p>
          <p className="font-heading text-xl text-charcoal">#{orderNumber}</p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center justify-center w-full gap-2 py-4 bg-charcoal text-ivory text-sm tracking-[0.15em] uppercase font-medium hover:bg-charcoal-light transition-colors"
        >
          Continue Shopping
          <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </div>
  );
}
