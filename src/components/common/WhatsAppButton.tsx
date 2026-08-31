import { MessageCircle } from 'lucide-react';
import { BRAND } from '../../data/config';

export default function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/${BRAND.whatsapp.replace(/\+/g, '')}?text=${encodeURIComponent(
    `Hi ${BRAND.name}, I'd like to know more about your collections.`
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-300 hover:scale-110 animate-pulse-soft"
    >
      <MessageCircle className="h-7 w-7" fill="white" />
    </a>
  );
}
