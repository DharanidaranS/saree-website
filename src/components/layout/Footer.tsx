import { Link } from 'react-router-dom';
import { Camera as Instagram, Globe as Facebook, Play as Youtube, MapPin, Phone, Mail } from 'lucide-react';
import { BRAND, FOOTER_LINKS } from '../../data/config';
import GoldLine from '../common/GoldLine';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-ivory/80">
      <GoldLine className="!justify-start" width="100%" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-8 py-16 md:py-20">
        {/* Top: Logo & tagline */}
        <div className="text-center mb-16">
          <Link to="/" className="inline-flex flex-col items-center">
            <span className="font-logo text-3xl md:text-4xl tracking-[0.2em] font-semibold text-ivory">
              {BRAND.logoLine1}
            </span>
            <span className="font-logo text-xs tracking-[0.3em] text-gold mt-1">
              {BRAND.logoLine2}
            </span>
          </Link>
          <p className="mt-4 text-sm text-ivory/50 tracking-wider font-body">
            {BRAND.tagline}
          </p>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          {/* Shop */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-gold mb-6 font-body font-medium">
              Shop
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.shop.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-sm text-ivory/60 hover:text-ivory transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-gold mb-6 font-body font-medium">
              Information
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.information.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-sm text-ivory/60 hover:text-ivory transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-gold mb-6 font-body font-medium">
              Customer Care
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.customerCare.map((link) => (
                <li key={link.label}>
                  {link.path.startsWith('http') ? (
                    <a
                      href={link.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-ivory/60 hover:text-ivory transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.path}
                      className="text-sm text-ivory/60 hover:text-ivory transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-gold mb-6 font-body font-medium">
              Get In Touch
            </h4>
            <ul className="space-y-3 text-sm text-ivory/60">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-gold/60" />
                <span>
                  {BRAND.address}
                  <br />
                  {BRAND.city}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-gold/60" />
                <a href={`tel:${BRAND.phone}`} className="hover:text-ivory transition-colors">
                  {BRAND.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-gold/60" />
                <a
                  href={`mailto:${BRAND.email}`}
                  className="hover:text-ivory transition-colors"
                >
                  {BRAND.email}
                </a>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-6">
              <a
                href={BRAND.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ivory/40 hover:text-gold transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={BRAND.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ivory/40 hover:text-gold transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={BRAND.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ivory/40 hover:text-gold transition-colors duration-300"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-ivory/10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-ivory/40 tracking-wider">
            © {new Date().getFullYear()} {BRAND.name}. All Rights Reserved.
          </p>
          <p className="text-xs text-ivory/30 tracking-wider">
            Crafted with love in India.
          </p>
        </div>
      </div>
    </footer>
  );
}
