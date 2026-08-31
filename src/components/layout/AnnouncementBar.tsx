import { BRAND } from '../../data/config';

export default function AnnouncementBar() {
  return (
    <div className="bg-wine text-ivory text-xs tracking-[0.15em] overflow-hidden">
      <div className="flex items-center justify-center h-9 whitespace-nowrap">
        <div className="animate-marquee flex gap-12 md:animate-none md:gap-0 md:justify-center">
          <span className="px-4">
            FREE SHIPPING ON ORDERS ABOVE {BRAND.currency}
            {BRAND.freeShippingThreshold.toLocaleString('en-IN')}
          </span>
          <span className="hidden md:inline px-2 text-gold">|</span>
          <span className="px-4">EASY EXCHANGE AVAILABLE</span>
          <span className="md:hidden px-4">
            FREE SHIPPING ON ORDERS ABOVE {BRAND.currency}
            {BRAND.freeShippingThreshold.toLocaleString('en-IN')}
          </span>
          <span className="md:hidden px-4">EASY EXCHANGE AVAILABLE</span>
        </div>
      </div>
    </div>
  );
}
