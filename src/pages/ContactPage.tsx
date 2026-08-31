import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import ScrollReveal from '../components/common/ScrollReveal';
import GoldLine from '../components/common/GoldLine';
import { BRAND } from '../data/config';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Add the message to the 'contactMessages' collection in Firestore
      await addDoc(collection(db, 'contactMessages'), {
        ...formData,
        createdAt: serverTimestamp(),
      });

      setSubmitted(true);
      setFormData({ name: '', phone: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error("Error submitting contact form: ", err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* Hero */}
      <section className="relative h-[300px] md:h-[500px] flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 15, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero-saree.jpg')" }}
        />
        <div className="absolute inset-0 bg-charcoal/60" />
        <div className="relative z-10 text-center">
          <ScrollReveal>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gold text-xs tracking-[0.4em] uppercase mb-6 font-body"
            >
              Get In Touch
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="font-heading text-5xl md:text-6xl text-ivory drop-shadow-md"
            >
              Contact Us
            </motion.h1>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding bg-cream relative overflow-hidden">
        {/* Soft decorative background glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Contact Info */}
            <ScrollReveal direction="right">
              <div className="bg-ivory-warm p-8 md:p-12 rounded-sm shadow-sm border border-beige-dark h-full">
                <h2 className="font-heading text-3xl md:text-4xl text-charcoal mb-4">
                  Visit Our Boutique
                </h2>
                <GoldLine className="mb-10 !justify-start" width="60px" />

                <div className="space-y-0">
                  {[
                    {
                      icon: <MapPin className="h-6 w-6 text-gold" />,
                      title: 'Location',
                      content: (
                        <>
                          {BRAND.address}, <br />
                          {BRAND.city}
                        </>
                      ),
                      link: null
                    },
                    {
                      icon: <Phone className="h-6 w-6 text-gold" />,
                      title: 'Direct Line',
                      content: BRAND.phone,
                      link: `tel:${BRAND.phone}`
                    },
                    {
                      icon: <MessageCircle className="h-6 w-6 text-gold" />,
                      title: 'WhatsApp',
                      content: BRAND.phone,
                      link: `https://wa.me/${BRAND.whatsapp.replace(/\+/g, '')}`
                    },
                    {
                      icon: <Mail className="h-6 w-6 text-gold" />,
                      title: 'Email',
                      content: BRAND.email,
                      link: `mailto:${BRAND.email}`
                    },
                    {
                      icon: <Clock className="h-6 w-6 text-gold" />,
                      title: 'Store Hours',
                      content: (
                        <>
                          {BRAND.openingHours.weekdays}
                          <br className="hidden md:block" />
                          <span className="md:hidden"> • </span>
                          {BRAND.openingHours.sunday}
                        </>
                      ),
                      link: null
                    }
                  ].map((item, index, arr) => (
                    <motion.div 
                      key={item.title}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-6 group"
                    >
                      <div className="w-14 h-14 rounded-full bg-ivory border border-gold/20 flex items-center justify-center shrink-0 group-hover:bg-gold/5 group-hover:border-gold transition-colors duration-500 mt-4">
                        {item.icon}
                      </div>
                      <div className={`pt-5 pb-8 flex-1 ${index !== arr.length - 1 ? 'border-b border-charcoal/5' : ''}`}>
                        <p className="text-gold text-[10px] tracking-[0.25em] uppercase mb-2 font-body font-semibold">
                          {item.title}
                        </p>
                        {item.link ? (
                          <a
                            href={item.link}
                            target={item.title === 'WhatsApp' ? "_blank" : undefined}
                            rel={item.title === 'WhatsApp' ? "noopener noreferrer" : undefined}
                            className="text-lg md:text-xl text-charcoal font-heading block hover:text-gold transition-colors"
                          >
                            {item.content}
                          </a>
                        ) : (
                          <p className="text-lg md:text-xl text-charcoal font-heading leading-relaxed">
                            {item.content}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>


              </div>
            </ScrollReveal>

            {/* Contact Form */}
            <ScrollReveal direction="left" delay={0.2}>
              <div className="pt-4 lg:pl-8">
                <h2 className="font-heading text-3xl md:text-4xl text-charcoal mb-4">
                  Send Us A Message
                </h2>
                <GoldLine className="mb-10 !justify-start" width="60px" />

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="name"
                      className="text-[10px] tracking-[0.25em] text-gold uppercase font-body font-semibold"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-ivory/50 border border-charcoal/10 px-4 py-3.5 text-charcoal text-base font-body focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all rounded-sm"
                      placeholder="Your Full Name"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="phone"
                      className="text-[10px] tracking-[0.25em] text-gold uppercase font-body font-semibold"
                    >
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-ivory/50 border border-charcoal/10 px-4 py-3.5 text-charcoal text-base font-body focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all rounded-sm"
                      placeholder="Your Phone Number"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="email"
                      className="text-[10px] tracking-[0.25em] text-gold uppercase font-body font-semibold"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-ivory/50 border border-charcoal/10 px-4 py-3.5 text-charcoal text-base font-body focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all rounded-sm"
                      placeholder="Your Email Address"
                    />
                  </div>

                  <div className="flex flex-col gap-2 pt-2">
                    <label
                      htmlFor="message"
                      className="text-[10px] tracking-[0.25em] text-gold uppercase font-body font-semibold"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-ivory/50 border border-charcoal/10 px-4 py-4 text-charcoal text-base font-body focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all rounded-sm resize-none"
                      placeholder="How can we assist you today?"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-3 py-4 bg-charcoal text-ivory text-[10px] tracking-[0.3em] uppercase font-bold hover:bg-gold hover:text-charcoal transition-colors shadow-sm mt-8 border border-transparent hover:border-gold disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <Send className={`h-4 w-4 ${isSubmitting ? 'animate-pulse' : ''}`} />
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </motion.button>

                  {error && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-red-50 border border-red-200 rounded-sm text-center mt-4"
                    >
                      <p className="text-red-600 text-sm font-body">
                        {error}
                      </p>
                    </motion.div>
                  )}

                  {submitted && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-gold/5 border border-gold/20 rounded-sm text-center mt-4"
                    >
                      <p className="text-gold-dark text-sm font-body">
                        Thank you! Your inquiry has been received. ✨
                      </p>
                    </motion.div>
                  )}
                </form>
              </div>
            </ScrollReveal>
          </div>

          {/* Full Width Map Section */}
          <ScrollReveal>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 md:mt-24 w-full h-[400px] md:h-[500px] rounded-sm overflow-hidden bg-beige border border-charcoal/10 shadow-sm relative group"
            >
              <iframe
                title="Store location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.7!2d80.27!3d13.08!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDA0JzQ4LjAiTiA4MMKwMTYnMTIuMCJF!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
