'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useWishlist } from '../components/WishlistContext';
import ApparelCarousel from '../components/carousel';

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist, isInWishlist } = useWishlist();
  const [removingItemId, setRemovingItemId] = useState<number | null>(null);

  const handleRemoveItem = async (productId: number) => {
    setRemovingItemId(productId);
    // Add a small delay for smooth animation
    await new Promise(resolve => setTimeout(resolve, 300));
    removeFromWishlist(productId);
    setRemovingItemId(null);
  };

  const handleClearWishlist = async () => {
    // Add confirmation dialog for clearing entire wishlist
    if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
      await new Promise(resolve => setTimeout(resolve, 300));
      clearWishlist();
    }
  };

  const calculateTotalPrice = () => {
    return wishlistItems.reduce((total, item) => {
      const price = item.discountedPrice || item.price || 0;
      return total + price;
    }, 0);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4
      }
    },
    exit: {
      opacity: 0,
      x: -100,
      transition: {
        duration: 0.3
      }
    }
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="section">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-emerald p-8 border border-soft-sage"
            >
              <div className="w-24 h-24 mx-auto mb-6 bg-soft-sage/20 rounded-full flex items-center justify-center">
                <svg 
                  className="w-12 h-12 text-forest-emerald" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                  />
                </svg>
              </div>
              
              <h1 className="text-3xl font-bold text-charcoal mb-4">Your Wishlist is Empty</h1>
              <p className="text-stone-600 mb-8 text-lg">
                Start exploring our collection and add items you love to your wishlist!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/products" 
                  className="bg-forest-emerald text-white px-8 py-3 rounded-lg font-semibold hover:bg-heritage-green transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-transform"
                >
                  Browse Products
                </Link>
                <Link 
                  href="/" 
                  className="border-2 border-forest-emerald text-forest-emerald px-8 py-3 rounded-lg font-semibold hover:bg-forest-emerald hover:text-white transition-all duration-200"
                >
                  Go Home
                </Link>
              </div>
            </motion.div>

            {/* Featured Collections */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-16"
            >
              <h2 className="text-2xl font-bold text-charcoal mb-8">Featured Collections</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: 'New Arrivals', href: '/products?sort=newest', color: 'bg-muted-gold/20' },
                  { name: 'Best Sellers', href: '/products?sort=popular', color: 'bg-forest-emerald/20' },
                  { name: 'Sale Items', href: '/products?discounted=true', color: 'bg-soft-sage/20' },
                ].map((collection, index) => (
                  <Link
                    key={collection.name}
                    href={collection.href}
                    className={`${collection.color} rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2`}
                  >
                    <h3 className="font-semibold text-charcoal text-lg">{collection.name}</h3>
                    <p className="text-stone-600 text-sm mt-2">Discover trending products</p>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 to-soft-sage/20 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-charcoal mb-4">My Wishlist</h1>
          <p className="text-stone-600 text-lg">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved for later
          </p>
        </motion.div>

        {/* Actions Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col sm:flex-row justify-between items-center mb-8 p-6 bg-white rounded-xl shadow-emerald border border-soft-sage"
        >
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <span className="text-lg font-semibold text-charcoal">
              Total Value: <span className="text-forest-emerald">TK {calculateTotalPrice().toFixed(2)}</span>
            </span>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={handleClearWishlist}
              className="px-6 py-2 border-2 border-amber-600 text-amber-600 rounded-lg font-medium hover:bg-amber-600 hover:text-white transition-all duration-200"
            >
              Clear All
            </button>
            <Link
              href="/products"
              className="px-6 py-2 bg-forest-emerald text-white rounded-lg font-medium hover:bg-heritage-green transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Continue Shopping
            </Link>
          </div>
        </motion.div>

        {/* Wishlist Items */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {wishlistItems.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                className={`bg-white rounded-xl shadow-emerald border border-soft-sage overflow-hidden transition-all duration-300 ${
                  removingItemId === item.id ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                }`}
              >
                <div className="relative">
                  {/* Product Image */}
                  <div className="aspect-square bg-stone-100 relative overflow-hidden">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-stone-200">
                        <svg className="w-16 h-16 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    
                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      disabled={removingItemId === item.id}
                      className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200 hover:bg-red-500 hover:text-white shadow-lg hover:scale-110"
                      title="Remove from wishlist"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>

                    {/* Wishlist Badge */}
                    <div className="absolute top-3 left-3 bg-forest-emerald text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg">
                      In Wishlist
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="p-6">
                    <h3 className="font-semibold text-charcoal text-lg mb-2 line-clamp-2">
                      {item.name}
                    </h3>
                    
                    {/* Price */}
                    <div className="flex items-center space-x-2 mb-3">
                      {item.discountedPrice ? (
                        <>
                          <span className="text-xl font-bold text-forest-emerald">
                            TK {item.discountedPrice.toFixed(2)}
                          </span>
                          {item.price && item.discountedPrice < item.price && (
                            <span className="text-sm line-through text-stone-500">
                              TK {item.price.toFixed(2)}
                            </span>
                          )}
                        </>
                      ) : (
                        <span className="text-xl font-bold text-forest-emerald">
                          TK {item.price?.toFixed(2) || 'N/A'}
                        </span>
                      )}
                    </div>

                    {/* Color and Size (if available) */}
                    {(item.color || item.size) && (
                      <div className="flex space-x-4 text-sm text-stone-600 mb-4">
                        {item.color && (
                          <span>Color: <strong className="text-charcoal">{item.color}</strong></span>
                        )}
                        {item.size && (
                          <span>Size: <strong className="text-charcoal">{item.size}</strong></span>
                        )}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <Link
                        href={`/products/${item.id}`}
                        className="flex-1 bg-forest-emerald text-white py-3 px-4 rounded-lg font-medium text-center hover:bg-heritage-green transition-colors duration-200"
                      >
                        View Details
                      </Link>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        disabled={removingItemId === item.id}
                        className="px-4 py-3 border border-stone-300 text-stone-600 rounded-lg font-medium hover:bg-stone-100 transition-colors duration-200"
                        title="Remove"
                      >
                        {removingItemId === item.id ? (
                          <div className="w-5 h-5 border-2 border-stone-400 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Quick Actions Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 bg-white rounded-xl shadow-emerald border border-soft-sage p-8"
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold text-charcoal mb-4">Love your wishlist?</h3>
            <p className="text-stone-600 mb-6 max-w-2xl mx-auto">
              Share your wishlist with friends and family or move items to your cart when you're ready to purchase.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-muted-gold text-charcoal rounded-lg font-semibold hover:bg-amber-500 transition-colors duration-200 shadow-lg hover:shadow-xl">
                Share Wishlist
              </button>
              <Link
                href="/cart"
                className="px-8 py-3 border-2 border-forest-emerald text-forest-emerald rounded-lg font-semibold hover:bg-forest-emerald hover:text-white transition-all duration-200"
              >
                View Bag
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Recently Viewed Suggestions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold text-charcoal mb-6 text-center">You Might Also Like</h2>
          <ApparelCarousel/>
        </motion.div>
      </div>
    </div>
  );
};

export default WishlistPage;