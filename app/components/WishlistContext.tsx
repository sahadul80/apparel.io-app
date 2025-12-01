'use client';

import React, { createContext, useState, ReactNode, useContext } from 'react';

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

export interface WishlistItem {
  id: number;
  name: string;
  price?: number;
  discountedPrice?: number;
  image?: string;
  color?: string;
  size?: string;
}

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  addToWishlist: (product: Product | WishlistItem) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

interface WishlistProviderProps {
  children: ReactNode;
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  const addToWishlist = (product: Product | WishlistItem) => {
    setWishlistItems(prev => {
      // Check if product already exists in wishlist
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        return prev; // Don't add duplicates
      }

      // Convert Product to WishlistItem if needed
      const wishlistItem: WishlistItem = 'discountedPrice' in product 
        ? {
            id: product.id,
            name: product.name,
            price: product.price,
            discountedPrice: product.discountedPrice,
            image: product.image,
          }
        : product;

      return [...prev, wishlistItem];
    });
  };

  const removeFromWishlist = (productId: number) => {
    setWishlistItems(prev => prev.filter(item => item.id !== productId));
  };

  const isInWishlist = (productId: number) => {
    return wishlistItems.some(item => item.id === productId);
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  return (
    <WishlistContext.Provider value={{
      wishlistItems,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      clearWishlist,
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

// Custom hook to use wishlist context
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};