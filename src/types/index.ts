// ===== PRODUCT TYPES =====
export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  discount?: number;
  description: string;
  shortDescription?: string;
  fabric: string;
  color: string;
  colorHex: string;
  images: string[];
  rating: number;
  reviewCount: number;
  featured: boolean;
  newArrival: boolean;
  bestSeller?: boolean;
  sareeLength?: string;
  blouseIncluded?: boolean;
  careInstructions?: string[];
  shippingInfo?: string;
  returnPolicy?: string;
}

export type ProductCategory =
  | 'silk'
  | 'kanchipuram'
  | 'designer'
  | 'cotton'
  | 'party-wear'
  | 'boutique'
  | 'organza'
  | 'banarasi';

// ===== CATEGORY TYPE =====
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount?: number;
}

// ===== REVIEW TYPE =====
export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  date?: string;
  productId?: string;
  verified?: boolean;
}

// ===== CART TYPES =====
export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

export type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity?: number } }
  | { type: 'REMOVE_ITEM'; payload: { productId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' };

// ===== WISHLIST TYPES =====
export interface WishlistState {
  items: Product[];
}

export type WishlistAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: { productId: string } }
  | { type: 'TOGGLE_ITEM'; payload: Product }
  | { type: 'CLEAR_WISHLIST' };

// ===== SEARCH TYPE =====
export interface SearchState {
  query: string;
  isOpen: boolean;
  results: Product[];
}

// ===== FILTER TYPES =====
export interface FilterState {
  categories: ProductCategory[];
  priceRange: PriceRange | null;
  colors: string[];
  sort: SortOption;
}

export type PriceRange = 'under-2000' | '2000-3000' | '3000-5000' | 'above-5000';

export type SortOption =
  | 'featured'
  | 'newest'
  | 'price-low-high'
  | 'price-high-low'
  | 'best-selling';

// ===== CONTACT FORM =====
export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

// ===== BRAND CONFIG TYPE =====
export interface BrandConfig {
  name: string;
  tagline: string;
  logoLine1: string;
  logoLine2: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  city: string;
  instagram: string;
  facebook: string;
  youtube: string;
  freeShippingThreshold: number;
  currency: string;
  openingHours: {
    weekdays: string;
    sunday: string;
  };
}
