'use client'
import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';
import { motion, AnimatePresence } from 'framer-motion';
import { Product, useWishlist } from './WishlistContext';
import ProductModal from './productModal';
import { AlertState, AlertType } from '../types/productDisplay';
import Alert from './alert';
import Link from 'next/link';

interface ApparelCarouselProps {
  category?: string;
  division?: string;
  madeFor?: string;
  componentSize?: string;
}

const ApparelCarousel: React.FC<ApparelCarouselProps> = ({ 
  category, 
  division,
  madeFor,
  componentSize= "lg"
}) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);


        const [alertState, setAlertState] = useState<{
            show: boolean;
            type: AlertType;
            title: string;
            messages: string[];
        }>({
            show: false,
            type: 'success',
            title: '',
            messages: [],
        });


    // Use wishlist context
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    
        // Add auto-hide functionality
        useEffect(() => {
            if (alertState.show) {
                const timer = setTimeout(() => {
                    setAlertState(prev => ({ ...prev, show: false }));
                }, 3000);
                return () => clearTimeout(timer);
            }
        }, [alertState.show]);
    
        const handleWishlistToggle = useCallback((product: Product, e: React.MouseEvent) => {
            e.stopPropagation();
            
            const selectedColorValue = product.colors?.[0] || '';
            const selectedSizeValue = product.sizes?.[0] || '';
    
            if (isInWishlist(product.id)) {
                removeFromWishlist(product.id);
                setAlertState({
                    show: true,
                    type: "warning",
                    title: 'Removed from Wishlist',
                    messages: [`${product.name} has been removed from your wishlist.`],
                });
            } else {
                addToWishlist({
                    id: product.id,
                    name: product.name,
                    price: product.discountedPrice || product.price,
                    discountedPrice: product.discountedPrice,
                    image: product.image,
                    color: selectedColorValue,
                    size: selectedSizeValue,
                });
                setAlertState({
                    show: true,
                    type: 'success',
                    title: 'Added to Wishlist',
                    messages: [`${product.name} has been added to your wishlist.`],
                });
            }
        }, [addToWishlist, removeFromWishlist, isInWishlist]);
    // API call to fetch apparel products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch('/api/carousel');
                if (!res.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await res.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products: ', error);
                setAlertState({
                    show: true,
                    type: 'error',
                    title: 'Error',
                    messages: ['Failed to load products. Please try again later.'],
                });
            }
        };

        fetchProducts();
    }, []);

    // Filter products based on category, division, and madeFor props
    useEffect(() => {
        let filtered = products;
        
        if (category) {
            filtered = filtered.filter(product => 
                product.category?.toLowerCase() === category.toLowerCase()
            );
        }
        
        if (division) {
            filtered = filtered.filter(product => 
                product.division?.toLowerCase() === division.toLowerCase()
            );
        }

        if (madeFor) {
            filtered = filtered.filter(product => 
                product.madeFor?.[0].toLowerCase() === madeFor.toLowerCase()
            );
        }
        
        setFilteredProducts(filtered);
    }, [products, category, division, madeFor]);

    // Open modal with selected product details
    const openModal = useCallback((product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    }, []);

    // Close modal and reset selected product
    const closeModal = useCallback(() => {
        setIsModalOpen(false);
        setTimeout(() => {
            setSelectedProduct(null);
        }, 300);
    }, []);

    // Handle card click - prevent if clicking on wishlist button
    const handleCardClick = useCallback((product: Product, e: React.MouseEvent) => {
        // Check if the click came from the wishlist button
        const target = e.target as HTMLElement;
        const isWishlistClick = target.closest('button[aria-label="Add to wishlist"]');
        
        if (!isWishlistClick) {
            openModal(product);
        }
    }, [openModal]);

    // Get display title based on active filters
    const getDisplayTitle = () => {
        if (category && division && madeFor) {
            return `${category} - ${division} - ${madeFor}`;
        }
        if (category && division) {
            return `${category} - ${division}`;
        }
        if (category && madeFor) {
            return `${category} - ${madeFor}`;
        }
        if (division && madeFor) {
            return `${division} - ${madeFor}`;
        }
        if (category) return category;
        if (division) return division;
        if (madeFor) return madeFor;
        return 'Featured Collections';
    };

    // Get display description based on active filters
    const getDisplayDescription = () => {
        if (category || division || madeFor) {
            const filters = [category, division, madeFor].filter(Boolean);
            return `${filters.join(' • ')} Collection`;
        }
        return 'Discover our premium apparel selection';
    };

    // Display products based on filters, or all products if no filters
    const displayProducts = filteredProducts.length > 0 ? filteredProducts : products;

    return (
        <div className={`section--${componentSize} text-foreground`}>
            <AnimatePresence>
                {alertState.show && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed bottom-0 right-4 w-auto z-50"
                    >
                        <Alert
                            type={alertState.type}
                            title={alertState.title}
                            messages={alertState.messages}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
            
            <div className="container">
                <div className="flex flex-row justify-between">
                    <div className="text-left items-center">
                        <h2 className="font-bold text-medium sm:text-subheading text-foreground font-heading">
                            {getDisplayTitle()}
                        </h2>
                        <p className="hidden sm:inline text-body-small text-muted-foreground">
                            {getDisplayDescription()}
                        </p>
                    </div>
                    <div className="text-right">
                        <Link href="/products" className={`btn btn--${componentSize==="2xs" ? "xs" : componentSize} btn--primary`}>
                            View All
                        </Link>
                    </div>
                </div>

                {displayProducts.length > 0 ? (
                    <Marquee gradient={false} speed={50} pauseOnHover className="">
                        {displayProducts.map((product) => (
                            <div
                                key={product.id}
                                className="flex items-center p-2 sm:p-4"
                                onClick={(e) => handleCardClick(product, e)}
                            >
                                <div className="card card--elevated card--interactive h-72 sm:h-128 w-48 sm:w-84 overflow-hidden group">
                                    {product.image && (
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            className="object-cover transition-transform duration-300 group-hover:scale-95 rounded-md"
                                            priority
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="w-full">
                                            <h3 className="text-2xl font-bold font-heading text-gradient-premium">{product.name}</h3>
                                            <div className="flex items-center justify-end">
                                                <span className="badge badge--primary">
                                                    {product.division}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Wishlist Button on Product Card */}
                                    <button
                                        onClick={(e) => handleWishlistToggle(product, e)}
                                        className="absolute top-4 left-4 w-10 h-10 bg-background/80 hover:bg-background rounded-full flex items-center justify-center transition-all duration-300 border border-border hover:scale-110 z-10"
                                        aria-label="Add to wishlist"
                                    >
                                        <svg 
                                            className={`w-5 h-5 transition-colors ${
                                                isInWishlist(product.id) 
                                                    ? 'text-red-500 fill-red-500' 
                                                    : 'text-muted-foreground hover:text-red-500'
                                            }`} 
                                            stroke="text-red-500" 
                                            fill={isInWishlist(product.id) ? "text-red-500" : ""}
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </button>
                                    
                                    {/* Stock Status Badge */}
                                    {!product.inStock && (
                                        <div className="absolute top-1 right-1 badge badge--secondary">
                                            Out of Stock
                                        </div>
                                    )}

                                    {/* Category Badge */}
                                    {product.category && (
                                        <div className="absolute bottom-2 left-2 badge badge--outline">
                                            {product.category}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </Marquee>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-body-large text-muted-foreground">
                            No products found {category || division || madeFor ? 'matching your filters' : 'at the moment'}.
                        </div>
                        <div className="text-caption text-muted-foreground mt-2">
                            {category || division || madeFor ? 'Try adjusting your filters or browse all collections.' : 'Please check back later.'}
                        </div>
                    </div>
                )}
            </div>

            {/* Product Modal */}
            <ProductModal
                product={selectedProduct}
                isOpen={isModalOpen}
                onClose={closeModal}
            />
        </div>
    );
};

export default ApparelCarousel;