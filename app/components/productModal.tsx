'use client'
import React, { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Modal from 'react-modal';
import { Product, useWishlist } from './WishlistContext';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');

  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  // Animation variants for the modal using Framer Motion
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      y: 20,
      transition: { duration: 0.15 }
    },
  };

  // Reset form when product changes
  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors?.[0] ?? '');
      setSelectedSize(product.sizes?.[0] ?? '');
    }
  }, [product]);

  // Helper function to render star ratings
  const renderStars = (rating: number = 0) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-3 h-3 sm:w-4 sm:h-4 ${star <= Math.round(rating) ? 'text-muted-gold fill-muted-gold' : 'text-gray-300 fill-gray-300'}`}
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="text-xs text-muted-foreground ml-1">({rating.toFixed(1)})</span>
      </div>
    );
  };

  const handleWishlistToggle = useCallback(() => {
    if (!product) return;

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.discountedPrice || product.price,
        discountedPrice: product.discountedPrice,
        image: product.image,
        color: selectedColor,
        size: selectedSize,
      });
    }
  }, [product, selectedColor, selectedSize, addToWishlist, removeFromWishlist, isInWishlist]);

  // Price display helper
  const renderPrice = () => {
    if (!product) return null;
    
    return (
      <div className="flex items-center gap-2 mt-2">
        {product.discountedPrice ? (
          <>
            <span className="text-xl sm:text-2xl font-bold text-forest-emerald">
              ${product.discountedPrice.toFixed(2)}
            </span>
            <span className="text-lg text-charcoal-500 line-through">
              ${product?.price?.toFixed(2)}
            </span>
            <span className="badge badge--primary text-xs">
              Save
            </span>
          </>
        ) : (
          <span className="text-xl sm:text-2xl font-bold text-forest-emerald">
            ${product?.price?.toFixed(2)}
          </span>
        )}
      </div>
    );
  };

  if (!product) return null;

  const isProductInWishlist = isInWishlist(product.id);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Product Details"
      className="fixed inset-0 flex items-center justify-center z-50 focus:outline-none p-2 sm:p-4 md:p-6"
      overlayClassName="fixed inset-0 bg-charcoal/90 backdrop-blur-sm z-40 transition-opacity duration-300"
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      ariaHideApp={false}
      closeTimeoutMS={200}
    >
      <motion.div
        className="relative w-full max-w-6xl max-h-[90vh] bg-background rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col lg:flex-row"
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-accent hover:scale-110 transition-all duration-200"
          aria-label="Close modal"
        >
          <svg className="w-4 h-4 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Product Image Section */}
        <div className="relative w-full lg:w-1/2 h-64 sm:h-80 md:h-96 lg:h-auto min-h-[300px] bg-gradient-to-br from-cream-50 to-cream-100 overflow-hidden">
          {product.image ? (
            <div className="relative w-full h-full">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-fill object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg className="w-24 h-24 text-charcoal-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          
          {/* Wishlist Toggle Button */}
          <button
            onClick={handleWishlistToggle}
            className="absolute top-4 left-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center hover:scale-110 transition-all duration-200 z-10"
            aria-label={isProductInWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <svg 
              className={`w-5 h-5 transition-all duration-300 ${
                isProductInWishlist 
                  ? 'text-red-500 fill-red-500' 
                  : 'text-charcoal hover:text-red-500'
              }`} 
              stroke="currentColor" 
              fill={isProductInWishlist ? "currentColor" : "none"}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        {/* Product Details Section */}
        <div className="w-full lg:w-1/2 flex flex-col p-4 sm:p-6 md:p-8 overflow-y-auto bg-cream-100">
          <div className="flex-1 space-y-4 sm:space-y-6">
            {/* Product Header */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-charcoal font-heading">
                {product.name}
              </h1>
              <div className="flex items-center mt-2">
                {renderStars(product.rating)}
                <span className="text-xs text-charcoal-500 ml-3">
                  {product?.rating || 0} reviews
                </span>
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              <span className={`badge ${product.inStock ? 'badge--success' : 'badge--destructive'}`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
              <span className="badge badge--outline">
                {product.division}
              </span>
              {product.madeFor && (
                <span className="badge badge--premium">
                  Made for {product.madeFor}
                </span>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-charcoal mb-2">Description</h3>
              <p className="text-charcoal-700 leading-relaxed">
                {product.description || 'No description available.'}
              </p>
            </div>

            {/* Product Details */}
            <div className="grid grid-cols-2 gap-4">
              {product.material && (
                <div>
                  <h4 className="text-sm font-medium text-charcoal-600 mb-1">Material</h4>
                  <p className="text-charcoal-900">{product.material}</p>
                </div>
              )}
              {product.category && (
                <div>
                  <h4 className="text-sm font-medium text-charcoal-600 mb-1">Category</h4>
                  <p className="text-charcoal-900">{product.category}</p>
                </div>
              )}
            </div>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-charcoal-600 mb-3">Color</h4>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
                        selectedColor === color
                          ? 'border-forest-emerald bg-forest-emerald/10 text-forest-emerald'
                          : 'border-border hover:border-forest-emerald hover:text-forest-emerald'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-charcoal-600 mb-3">Size</h4>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-lg border flex items-center justify-center transition-all duration-200 ${
                        selectedSize === size
                          ? 'border-forest-emerald bg-forest-emerald text-white'
                          : 'border-border hover:border-forest-emerald'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sustainability Features */}
            {product.sustainability && product.sustainability.length > 0 && (
              <div className="bg-forest-emerald/5 rounded-xl p-4 border border-forest-emerald/20">
                <h4 className="text-lg font-semibold text-forest-emerald mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Sustainability Features
                </h4>
                <div className="flex flex-wrap gap-2">
                  {product.sustainability.map((feature, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-white/50 rounded-full text-sm text-forest-emerald border border-forest-emerald/30"
                    >
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-6 pt-6 border-t border-border space-y-4">
            {/* Wishlist Status */}
            {isProductInWishlist && (
              <div className="flex items-center gap-2 text-sm text-forest-emerald bg-forest-emerald/10 px-4 py-2 rounded-lg">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                This item is in your wishlist
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleWishlistToggle}
                className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-3 ${
                  isProductInWishlist
                    ? 'bg-red-50 text-red-700 border-2 border-red-200 hover:bg-red-100 hover:border-red-300'
                    : 'bg-forest-emerald text-white hover:bg-forest-emerald/90'
                }`}
              >
                <svg 
                  className={`w-5 h-5 ${isProductInWishlist ? 'fill-red-500' : 'fill-white'}`}
                  stroke="currentColor" 
                  fill={isProductInWishlist ? "currentColor" : "none"}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {isProductInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </button>
              
              <button
                onClick={onClose}
                className="flex-1 py-3 px-6 rounded-lg font-medium border-2 border-border text-charcoal hover:bg-accent transition-all duration-200"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </Modal>
  );
};

export default ProductModal;