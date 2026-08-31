import { Gem, Shield, Heart, Smartphone } from 'lucide-react';
import ScrollReveal from '../common/ScrollReveal';
import GoldLine from '../common/GoldLine';

const features = [
  {
    icon: Gem,
    title: 'Handpicked Collections',
    description: 'Every piece is carefully selected for quality and style.',
  },
  {
    icon: Shield,
    title: 'Premium Quality',
    description: 'Beautiful fabrics and detailed craftsmanship.',
  },
  {
    icon: Heart,
    title: 'Trusted Service',
    description: 'A shopping experience built around you.',
  },
  {
    icon: Smartphone,
    title: 'Easy Shopping',
    description: 'Simple ordering and convenient support through WhatsApp.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-beige noise-overlay relative">
      <div className="max-w-[1440px] mx-auto relative z-10">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3 font-body">
              Our Promise
            </p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-charcoal">
              Why Women Choose Us
            </h2>
            <GoldLine className="mt-6" />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {features.map((feature, index) => (
            <ScrollReveal key={feature.title} delay={index * 0.1}>
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-gold/30 mb-6 group-hover:border-gold group-hover:bg-gold/5 transition-all duration-500">
                  <feature.icon className="h-7 w-7 text-gold transition-transform duration-500 group-hover:scale-110" />
                </div>
                <h3 className="font-heading text-lg text-charcoal mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-charcoal/50 font-body leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
