// ================================
// Product Types
// ================================

export interface Product {
  id: number;
  name: string;
  price?: number;
  discountedPrice?: number;
  category: string;
  division: string;
  image?: string;
  inStock?: boolean;
  colors?: string[];
  description?: string;
  rating?: number;
  madeFor: string[];
  sizes?: string[];
  material?: string;
  features?: string[];
  careInstructions?: string;
  sustainability?: string[];
}

// ================================
// Alert Types
// ================================

export type AlertType = 'success' | 'error' | 'warning' | 'info';

export interface AlertState {
  show: boolean;
  type: AlertType;
  title: string;
  messages: string[];
}

// ================================
// Wishlist Types
// ================================

export interface WishlistItem {
  id: number;
  name: string;
  price?: number;
  discountedPrice?: number;
  image?: string;
  color?: string;
  size?: string;
}

// ================================
// Component Props
// ================================

export interface ApparelCarouselProps {
  addToWishlist?: (wishlistItem: WishlistItem) => void;
}

export interface Slide {
  id: number
  image: string
  name: string
  link: string
}