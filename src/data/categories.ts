import type { Category } from '../types';

// ============================================================
// CATEGORY DATA
// Replace images with your actual category photos
// ============================================================

export const categories: Category[] = [
  {
    id: 'cat-silk',
    name: 'Silk Sarees',
    slug: 'silk',
    description: 'Timeless elegance woven in pure silk.',
    image: '/images/category-silk.jpg',
    productCount: 24,
  },
  {
    id: 'cat-kanchipuram',
    name: 'Kanchipuram Sarees',
    slug: 'kanchipuram',
    description: 'The pride of South Indian weaving tradition.',
    image: '/images/category-kanchipuram.jpg',
    productCount: 18,
  },
  {
    id: 'cat-designer',
    name: 'Designer Sarees',
    slug: 'designer',
    description: 'Contemporary designs for the modern woman.',
    image: '/images/category-designer.jpg',
    productCount: 32,
  },
  {
    id: 'cat-cotton',
    name: 'Cotton Sarees',
    slug: 'cotton',
    description: 'Everyday comfort meets effortless grace.',
    image: '/images/cotton-saree.jpg',
    productCount: 28,
  },
  {
    id: 'cat-party',
    name: 'Party Wear',
    slug: 'party-wear',
    description: 'Show-stopping pieces for every celebration.',
    image: '/images/festive-editorial.jpg',
    productCount: 20,
  },
  {
    id: 'cat-boutique',
    name: 'Boutique Collection',
    slug: 'boutique',
    description: 'Curated contemporary silhouettes.',
    image: '/images/boutique-story.jpg',
    productCount: 15,
  },
];
