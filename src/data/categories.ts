
export interface CategoryMeta {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  image: string;
  itemCount: number;
  highlightText: string;
}

export const CATEGORIES: CategoryMeta[] = [
  {
    id: 'cakes',
    name: 'Celebration Cakes',
    slug: 'cakes',
    tagline: 'Centerpieces for your sweetest milestones',
    description: 'Bespoke tiered cakes, vintage piped designs, minimalist bento cakes, and rich layered gateaux made with premium Belgian chocolate and fresh berries.',
    image: '/images/cake1.webp',
    itemCount: 12,
    highlightText: 'Custom designs & sizes from 0.5kg to 5kg',
  },
  {
    id: 'desserts',
    name: 'Artisanal Desserts',
    slug: 'desserts',
    tagline: 'Parisian craft meets modern indulgence',
    description: 'Delicate Swiss rolls, chocolate dipped strawberries, browned butter financiers, and handcrafted individual patisserie treats.',
    image: '/images/citrus_swiss_roll.webp',
    itemCount: 14,
    highlightText: 'Freshly rolled and baked every morning',
  },
  {
    id: 'hampers',
    name: 'Hampers & Gifting',
    slug: 'hampers',
    tagline: 'Thoughtfully curated luxury gift boxes',
    description: 'Signature lavender gift boxes filled with assorted Swiss rolls, gourmet cookies, financiers, chocolate berries, and artisanal confections.',
    image: '/images/anushka_profile.webp',
    itemCount: 9,
    highlightText: 'Custom branding & personalized stationery',
  },
  {
    id: 'festive',
    name: 'Festive & Occasion Hampers',
    slug: 'festive',
    tagline: 'Celebratory collections for Indian festivals',
    description: 'Diwali, Rakhi, Holi, and New Year curated gift hampers designed with elegant silk ribbons, gold foil accents, and artisanal mithai-inspired patisserie.',
    image: '/images/chocolate_strawberry.webp',
    itemCount: 8,
    highlightText: 'Bulk corporate & family orders welcome',
  },
  {
    id: 'custom',
    name: 'Custom Creations',
    slug: 'custom-orders',
    tagline: 'Made exclusively for your vision',
    description: 'Dream it and our pastry chefs will craft it. Custom color palettes, floral styling, flavor pairings, and bespoke structural cakes.',
    image: '/images/cake2.webp',
    itemCount: 16,
    highlightText: 'One-on-one chef design consultation',
  },
  {
    id: 'events',
    name: 'Events & Celebrations',
    slug: 'events',
    tagline: 'Grand dessert tables and celebration catering',
    description: 'Turnkey dessert styling for baby showers, intimate weddings, cocktail soir�es, kitty parties, and corporate galas across Delhi NCR.',
    image: '/images/cake4.webp',
    itemCount: 6,
    highlightText: 'Full on-site styling & display setups',
  },
];
