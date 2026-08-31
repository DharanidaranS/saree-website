import { motion } from 'framer-motion';
import ScrollReveal from '../components/common/ScrollReveal';
import GoldLine from '../components/common/GoldLine';

const timelineSteps = [
  {
    year: '2018',
    title: 'The Beginning',
    text: 'A small dream was born in the heart of a silk-weaving family — to bring authentic, handcrafted sarees directly to women who value tradition and quality.',
  },
  {
    year: '2020',
    title: 'Growing Together',
    text: 'We expanded our collection to include designer and boutique wear, bridging the gap between traditional elegance and contemporary style.',
  },
  {
    year: '2023',
    title: 'The Boutique',
    text: 'AARA Silks & Boutique was born — a physical and online space where every woman can find a piece that tells her story.',
  },
  {
    year: '2026',
    title: 'Today & Beyond',
    text: 'Today, we serve thousands of women across India with premium sarees, boutique fashion, and a shopping experience built on trust and personal care.',
  },
];

const processImages = [
  '/images/kanchipuram-saree.jpg',
  '/images/banarasi-saree.jpg',
  '/images/boutique-story.jpg',
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[400px] md:h-[600px] flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: 1.1 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/boutique-story.jpg')" }}
        />
        <div className="absolute inset-0 bg-charcoal/60" />
        <div className="relative z-10 text-center px-6">
          <ScrollReveal>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-gold text-xs md:text-sm tracking-[0.4em] uppercase mb-6 font-body"
            >
              Our Story
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="font-heading text-4xl md:text-6xl lg:text-7xl text-ivory leading-tight"
            >
              Woven With Tradition.
              <br />
              <span className="italic font-light text-ivory-warm">Designed For Today.</span>
            </motion.h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-ivory-warm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
          <ScrollReveal>
            <p className="text-charcoal/70 text-lg md:text-xl leading-relaxed font-body mb-6 font-light">
              AARA Silks & Boutique was born from a simple belief — that every woman deserves
              to feel beautiful, confident and connected to her roots. Our journey began
              in the silk-weaving heartland of India, where generations of artisans have
              woven stories into fabric.
            </p>
            <p className="text-charcoal/70 text-lg md:text-xl leading-relaxed font-body font-light">
              Today, we bring together traditional Indian craftsmanship and modern fashion
              sensibility to create sarees and boutique wear that are timeless yet
              contemporary. Each piece in our collection is thoughtfully curated — because
              we believe fashion should tell a story.
            </p>
            <div className="flex justify-center mt-12">
              <GoldLine width="80px" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Our Process Gallery */}
      <section className="py-10 bg-ivory-warm">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {processImages.map((src, i) => (
              <ScrollReveal key={i} delay={i * 0.2}>
                <div className="relative aspect-[4/5] overflow-hidden group rounded-sm shadow-sm">
                  <img 
                    src={src} 
                    alt={`Craftsmanship ${i + 1}`} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-charcoal/10 group-hover:bg-charcoal/0 transition-colors duration-500" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-cream relative">
        <div className="absolute left-0 bottom-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="font-heading text-4xl md:text-5xl text-charcoal">
                Our Journey
              </h2>
              <GoldLine className="mt-8" />
            </div>
          </ScrollReveal>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-gold/0 via-gold/50 to-gold/0 -translate-x-1/2" />

            <div className="space-y-16 md:space-y-24">
              {timelineSteps.map((step, index) => (
                <ScrollReveal
                  key={step.year}
                  direction={index % 2 === 0 ? 'right' : 'left'}
                  delay={index * 0.1}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`relative flex items-start gap-8 md:gap-0 group ${
                      index % 2 === 0
                        ? 'md:flex-row'
                        : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Content */}
                    <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-20 md:text-right' : 'md:pl-20'}`}>
                      <span className="inline-block text-gold font-heading text-3xl md:text-4xl font-semibold mb-2 group-hover:text-gold-light transition-colors">
                        {step.year}
                      </span>
                      <h3 className="font-heading text-2xl text-charcoal mb-4">
                        {step.title}
                      </h3>
                      <p className="text-base text-charcoal/60 leading-relaxed font-body">
                        {step.text}
                      </p>
                    </div>

                    {/* Dot */}
                    <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-cream border-4 border-gold shadow-[0_0_15px_rgba(212,175,55,0.3)] group-hover:scale-125 transition-transform duration-300 z-10" />

                    {/* Spacer for opposite side */}
                    <div className="hidden md:block flex-1" />
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-ivory-warm">
        <div className="max-w-[1440px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-heading text-4xl md:text-5xl text-charcoal">
                What We Stand For
              </h2>
              <GoldLine className="mt-8" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto px-4">
            {[
              {
                title: 'Authentic Craftsmanship',
                text: 'We work directly with weavers and artisans to bring you genuine, handcrafted textiles that honour Indian traditions.',
              },
              {
                title: 'Personal Touch',
                text: 'Every customer is treated like family. From WhatsApp styling advice to careful packaging, your experience matters to us.',
              },
              {
                title: 'Timeless Quality',
                text: 'We never compromise on fabric quality. Every saree is inspected and selected to ensure it meets our standards.',
              },
            ].map((value, i) => (
              <ScrollReveal key={value.title} delay={i * 0.15}>
                <motion.div 
                  whileHover={{ y: -10 }}
                  className="bg-cream p-10 rounded-sm text-center border border-beige-dark shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col items-center justify-center"
                >
                  <div className="w-12 h-1 bg-gold mb-6" />
                  <h3 className="font-heading text-2xl text-charcoal mb-4">
                    {value.title}
                  </h3>
                  <p className="text-base text-charcoal/60 leading-relaxed font-body">
                    {value.text}
                  </p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
