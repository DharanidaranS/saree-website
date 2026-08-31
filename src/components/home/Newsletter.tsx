import { useState } from 'react';
import { Send } from 'lucide-react';
import ScrollReveal from '../common/ScrollReveal';
import GoldLine from '../common/GoldLine';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  return (
    <section className="section-padding bg-beige noise-overlay relative">
      <div className="max-w-xl mx-auto text-center relative z-10">
        <ScrollReveal>
          <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3 font-body">
            Newsletter
          </p>
          <h2 className="font-heading text-3xl md:text-4xl text-charcoal mb-4">
            Stay In The Loop
          </h2>
          <p className="text-charcoal/50 text-sm mb-8 font-body leading-relaxed">
            Be the first to discover new collections, exclusive offers and
            festive edits.
          </p>
          <GoldLine className="mb-8" />

          <form onSubmit={handleSubmit} className="flex gap-0">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-5 py-3.5 bg-ivory border border-charcoal/10 text-charcoal text-sm font-body placeholder:text-charcoal/30 focus:outline-none focus:border-gold transition-colors rounded-l-sm"
              aria-label="Email address"
            />
            <button
              type="submit"
              className="px-6 py-3.5 bg-charcoal text-ivory text-xs tracking-[0.15em] uppercase font-medium hover:bg-charcoal-light transition-colors flex items-center gap-2 rounded-r-sm"
            >
              <span className="hidden sm:inline">Subscribe</span>
              <Send className="h-4 w-4" />
            </button>
          </form>

          {submitted && (
            <p className="text-gold text-sm mt-4 font-body animate-fade-in">
              Thank you for subscribing! ✨
            </p>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
