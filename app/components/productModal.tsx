'use client'
import React, { useState, useCallback } from 'react';
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
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  };

  // Reset form when product changes
  React.useEffect(() => {
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
            className={`w-3 h-3 sm:w-4 sm:h-4 ${star <= Math.round(rating) ? 'text-muted-gold' : 'text-muted-foreground'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="text-xs text-muted-foreground ml-1">({rating})</span>
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

  if (!product) return null;

  const isProductInWishlist = isInWishlist(product.id);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Product Details"
      className="fixed inset-0 flex items-center justify-center z-50 focus:outline-none p-2 sm:p-4"
      overlayClassName="fixed inset-0 bg-charcoal/70 backdrop-blur-sm z-40 transition-opacity"
      shouldCloseOnOverlayClick={true}
      ariaHideApp={false}
    >
      <motion.div
        className="rounded-lg w-auto h-auto min-h-[90vh] max-h-[90vh] min-w-[90vw] max-w-[90vw] overflow-y-auto border border-border card--elevated backdrop-blur-glass-enhanced"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Product Image Section */}
          <div className="relative w-auto h-48 sm:h-64 md:h-84 lg:h-128 rounded-t-lg lg:rounded-l-lg lg:rounded-tr-none overflow-hidden bg-muted">
            {product.image && (
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={400}
                className="object-cover object-center"
              />
            )}
            
            {/* Wishlist Button in Modal */}
            <button
              onClick={handleWishlistToggle}
              className="absolute top-2 right-2 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 border border-border hover:scale-105 z-10 bg-background/80 backdrop-blur-sm"
              aria-label={isProductInWishlist ? "Remove from wishlist" : "Add to wishlist"}
            >
              <svg 
                className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${
                  isProductInWishlist 
                    ? 'text-red-500 fill-red-500 scale-110' 
                    : 'text-muted-foreground hover:text-red-500'
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
          <div className="p-2 sm:p-4 sm:p-6 space-y-3 xs:space-y-4 sm:space-y-6 overflow-y-auto">
            <div className="flex flex-col items-start justify-between space-y-3 xs:space-y-4">
              {/* Product Header */}
              <div className="space-y-2 xs:space-y-3 w-full">
                <h2 className="text-lg sm:text-xl font-bold text-card-foreground font-heading leading-tight">
                  {product.name}
                </h2>
                <div className="flex items-center">
                  {renderStars(product.rating)}
                </div>
                <div className="flex flex-wrap gap-1 xs:gap-2">
                  <span className={`badge text-xs ${product.inStock ? 'badge--primary' : 'badge--secondary'}`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                  <span className="badge badge--outline text-xs">
                    {product.division}
                  </span>
                  {product.madeFor && (
                    <span className="badge badge--premium text-xs">
                      {product.madeFor}
                    </span>
                  )}
                </div>
              </div>

              {/* Product Description */}
              <p className="text-card-foreground leading-relaxed text-sm xs:text-body line-clamp-4 xs:line-clamp-none">
                {product.description || 'No description available.'}
              </p>

              {/* Product Details Grid */}
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 xs:gap-4 text-sm w-full">
                {product.material && (
                  <div>
                    <span className="text-muted-foreground font-bold text-sm">Material:</span>
                    <p className="text-card-foreground text-sm">{product.material}</p>
                  </div>
                )}
                {product.category && (
                  <div>
                    <span className="text-muted-foreground font-bold text-sm">Category:</span>
                    <p className="text-card-foreground text-sm">{product.category}</p>
                  </div>
                )}
              </div>

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="w-full">
                  <p className="text-sm text-card-foreground font-bold">Color:</p>
                  <div className="flex flex-row gap-1 sm:gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        className={`btn btn--xs xs:btn--sm ${
                          selectedColor === color
                            ? 'btn--primary'
                            : 'btn--outline'
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
                <div className="w-full">
                  <p className="text-sm font-bold text-card-foreground">Size:</p>
                  <div className="flex flex-row gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`btn btn--xs ${
                          selectedSize === size
                            ? 'btn--primary'
                            : 'btn--outline'
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
                <div className="bg-accent/20 rounded-lg p-2 xs:p-4 w-full">
                  <h4 className="text-sm font-medium text-card-foreground mb-2">Sustainability Features</h4>
                  <div className="flex flex-wrap gap-1 xs:gap-2">
                    {product.sustainability.map((feature, index) => (
                      <span key={index} className="badge badge--outline text-xs">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Enhanced Wishlist Button */}
              <div className="flex flex-row gap-2 xs:gap-3 w-full">
                <button
                  onClick={handleWishlistToggle}
                  className={`btn btn--sm xs:btn--lg flex-1 ${
                    isProductInWishlist
                      ? 'bg-red-50 border-2 border-red-200 text-red-700 hover:bg-red-100 hover:border-red-300'
                      : 'btn--primary'
                  }`}
                >
                  <svg 
                    className={`w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 transition-all duration-300 ${
                      isProductInWishlist 
                        ? 'text-red-500 fill-red-500 scale-110' 
                        : 'text-primary-foreground'
                    }`} 
                    stroke="currentColor" 
                    fill={isProductInWishlist ? "currentColor" : "none"}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span className="font-semibold text-xs xs:text-sm sm:text-base">
                    {isProductInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  </span>
                </button>
                
                <button
                  onClick={onClose}
                  className="btn btn--sm xs:btn--lg btn--ghost"
                >
                  <span className="text-xs xs:text-sm sm:text-base">Close</span>
                </button>
              </div>

              {/* Wishlist Status Message */}
              {isProductInWishlist && (
                <div className="text-center p-2 xs:p-3 bg-success/10 border border-success/20 rounded-lg w-full">
                  <p className="text-success text-xs xs:text-sm font-medium">
                    ✓ This item is in your wishlist
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </Modal>
  );
};

export default ProductModal;