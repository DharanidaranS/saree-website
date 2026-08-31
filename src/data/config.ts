import type { BrandConfig } from '../types';

// ============================================================
// BRAND CONFIGURATION
// Change these values to customize the website for your shop
// ============================================================

export const BRAND: BrandConfig = {
  name: 'AARA SILKS & BOUTIQUE',
  tagline: 'Elegance Woven Into Every Story.',
  logoLine1: 'AARA',
  logoLine2: 'Silks & Boutique',

  // Contact Information
  phone: '+91 XXXXXXXXXX',
  whatsapp: '+91XXXXXXXXXX', // No spaces for WhatsApp API
  email: 'hello@aarasilks.com',
  address: '123, Silk Street, Fashion District',
  city: 'Chennai, Tamil Nadu 600001',

  // Social Media
  instagram: 'https://instagram.com/aarasilks',
  facebook: 'https://facebook.com/aarasilks',
  youtube: 'https://youtube.com/@aarasilks',

  // Shop Settings
  freeShippingThreshold: 1999,
  currency: '₹',

  // Opening Hours
  openingHours: {
    weekdays: 'Monday – Saturday: 10:00 AM – 8:00 PM',
    sunday: 'Sunday: 11:00 AM – 6:00 PM',
  },
};

// ============================================================
// SEO CONFIGURATION
// ============================================================
export const SEO = {
  title: 'AARA Silks & Boutique | Premium Sarees & Women\'s Boutique Fashion',
  description:
    'Discover premium sarees, silk sarees, designer collections and boutique fashion at AARA Silks & Boutique.',
  ogImage: '/images/hero-saree.jpg',
  url: 'https://aarasilks.com',
};

// ============================================================
// NAVIGATION LINKS
// ============================================================
export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Sarees', path: '/sarees' },
  { label: 'New Arrivals', path: '/sarees?filter=new' },
  { label: 'Boutique', path: '/sarees?filter=boutique' },
  { label: 'Collections', path: '/sarees?filter=collections' },
  { label: 'About Us', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

// ============================================================
// FOOTER LINKS
// ============================================================
export const FOOTER_LINKS = {
  shop: [
    { label: 'Sarees', path: '/sarees' },
    { label: 'New Arrivals', path: '/sarees?filter=new' },
    { label: 'Boutique', path: '/sarees?filter=boutique' },
    { label: 'Festive Collection', path: '/sarees?filter=party-wear' },
    { label: 'Best Sellers', path: '/sarees?sort=best-selling' },
  ],
  information: [
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' },
    { label: 'Shipping', path: '/contact' },
    { label: 'Returns', path: '/contact' },
    { label: 'Privacy Policy', path: '/contact' },
    { label: 'Terms & Conditions', path: '/contact' },
  ],
  customerCare: [
    { label: 'WhatsApp', path: `https://wa.me/${BRAND.whatsapp.replace(/\+/g, '')}` },
    { label: 'Contact Us', path: '/contact' },
    { label: 'Track Order', path: '/contact' },
    { label: 'FAQs', path: '/contact' },
  ],
};

// ============================================================
// PRICE FILTER OPTIONS
// ============================================================
export const PRICE_RANGES = [
  { label: 'Under ₹2,000', value: 'under-2000' as const, min: 0, max: 2000 },
  { label: '₹2,000 – ₹3,000', value: '2000-3000' as const, min: 2000, max: 3000 },
  { label: '₹3,000 – ₹5,000', value: '3000-5000' as const, min: 3000, max: 5000 },
  { label: 'Above ₹5,000', value: 'above-5000' as const, min: 5000, max: Infinity },
];

// ============================================================
// COLOR FILTER OPTIONS
// ============================================================
export const COLOR_OPTIONS = [
  { label: 'Red', value: 'red', hex: '#C62828' },
  { label: 'Pink', value: 'pink', hex: '#D4A0A0' },
  { label: 'Blue', value: 'blue', hex: '#1A237E' },
  { label: 'Green', value: 'green', hex: '#2E7D32' },
  { label: 'Gold', value: 'gold', hex: '#C9A96E' },
  { label: 'Black', value: 'black', hex: '#212121' },
  { label: 'Purple', value: 'purple', hex: '#6A1B9A' },
  { label: 'Maroon', value: 'maroon', hex: '#722F37' },
  { label: 'Lavender', value: 'lavender', hex: '#B39DDB' },
  { label: 'White', value: 'white', hex: '#FAFAFA' },
];

// ============================================================
// SORT OPTIONS
// ============================================================
export const SORT_OPTIONS = [
  { label: 'Featured', value: 'featured' as const },
  { label: 'Newest', value: 'newest' as const },
  { label: 'Price: Low to High', value: 'price-low-high' as const },
  { label: 'Price: High to Low', value: 'price-high-low' as const },
  { label: 'Best Selling', value: 'best-selling' as const },
];
