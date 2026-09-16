
export interface Product {
  id: string;
  name: string;
  slug: string;
  category: 'cakes' | 'desserts' | 'hampers' | 'festive' | 'custom' | 'events';
  subCategory?: string;
  tagline: string;
  description: string;
  longDescription?: string;
  price: number;
  startingPrice?: boolean;
  priceUnit?: string;
  images: string[];
  sizes?: { name: string; price: number; serves?: string }[];
  flavours?: string[];
  customizations?: string[];
  occasions?: string[];
  bestseller?: boolean;
  featured?: boolean;
  newArrival?: boolean;
  preparationLeadHours?: number;
  ingredients?: string[];
  storageAdvice?: string;
}

export interface HamperItem {
  id: string;
  name: string;
  shortName?: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  location: string;
  occasion: string;
  productOrdered: string;
  rating: number;
  date: string;
}

export interface InstagramPost {
  id: string;
  type: 'image' | 'video' | 'reel';
  mediaUrl: string;
  caption: string;
  likes: string;
  comments: string;
  permalink: string;
}

export interface CustomOrderState {
  occasion: string;
  date: string;
  guests: string;
  productType: string;
  flavour: string;
  dietaryPreference: string;
  budget: string;
  deliveryLocation: string;
  specialRequests: string;
  name: string;
  phone: string;
}
