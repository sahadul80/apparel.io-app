'use client';
import Image from 'next/image';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Alert from './alert';
import StarRating from './Rating';
import { AlertType, Product } from '../types/productDisplay';
import ProductModal from './productModal';
import { useWishlist } from './WishlistContext';
import { Filter } from 'lucide-react';

export type Filters = {
    availability: string[];
    price?: { from: string; to: string };
    colors?: string[];
    search: string;
    rating?: number;
};

interface ProductCollectionProps {
    category?: string;
    division?: string;
    madeFor?: string;
}

const ProductCollection: React.FC<ProductCollectionProps> = () => {
    const [sortBy, setSortBy] = useState<string>('');
    const [filters, setFilters] = useState<Filters>({
        availability: [],
        price: { from: '', to: '' },
        colors: [],
        search: '',
        rating: 0,
    });
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [showFilters, setShowFilters] = useState<boolean>(false);
    
    // Use wishlist context
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

    // Pagination state
    const [currentPage, setCurrentPage] = useState<number>(1);
    const productsPerPage = 10;

    // API call to fetch products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
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
                    title: 'Error Loading Products',
                    messages: ['Failed to load products. Please try again later.'],
                });
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    type SortBy = 'name,asc' | 'name,desc' | 'price,asc' | 'price,desc' | 'rating,asc' | 'rating,desc' | '';

    const { search, availability, price, colors, rating } = filters;

    const filteredProducts = useMemo(() => {
        let filtered = [...products];

        const applySearchFilter = (products: Product[], search?: string): Product[] => {
            if (!search) return products;
            const searchTerm = search.toLowerCase();
            return products.filter(product =>
                product.name.toLowerCase().includes(searchTerm) ||
                (product.description && product.description.toLowerCase().includes(searchTerm)) ||
                product.id.toString().includes(searchTerm)
            );
        };

        const applyAvailabilityFilter = (products: Product[], availability: string[]): Product[] => {
            if (availability.length === 0) return products;
            const inStockSelected = availability.includes('In Stock');
            const outOfStockSelected = availability.includes('Out of Stock');

            return products.filter(product => {
                if (inStockSelected && outOfStockSelected) return true;
                if (inStockSelected) return product.inStock;
                if (outOfStockSelected) return !product.inStock;
                return false;
            });
        };

        const applyPriceRangeFilter = (products: Product[], price: Filters['price']): Product[] => {
            if (!price?.from && !price?.to) return products;
            
            const fromPrice = price?.from ? Number(price.from) : 0;
            const toPrice = price?.to ? Number(price.to) : Infinity;

            return products.filter(product => {
                const productPrice = product.discountedPrice || product.price;
                return productPrice && productPrice >= fromPrice && productPrice <= toPrice;
            });
        };

        const applyColorFilter = (products: Product[], colors: string[]): Product[] => {
            if (!colors || colors.length === 0) return products;
            return products.filter(product =>
                product.colors?.some(color =>
                    colors.includes(color.toLowerCase())
                )
            );
        };

        const applyRatingFilter = (products: Product[], rating: number): Product[] => {
            if (!rating || rating === 0) return products;
            return products.filter(product => product.rating && product.rating >= rating);
        };

        const applySorting = (products: Product[], sortBy: SortBy): Product[] => {
            if (!sortBy) return products;

            const [key, order] = sortBy.split(',') as ['name' | 'price' | 'rating', 'asc' | 'desc'];
            return [...products].sort((a, b) => {
                if (key === "name") {
                    return order === "asc"
                        ? a.name.localeCompare(b.name)
                        : b.name.localeCompare(a.name);
                }
                if (key === "price") {
                    const priceA = a.discountedPrice || a.price || 0;
                    const priceB = b.discountedPrice || b.price || 0;
                    return order === "asc"
                        ? priceA - priceB
                        : priceB - priceA;
                }
                if (key === "rating") {
                    const ratingA = a.rating || 0;
                    const ratingB = b.rating || 0;
                    return order === "asc"
                        ? ratingA - ratingB
                        : ratingB - ratingA;
                }
                return 0;
            });
        };

        // Apply filters sequentially
        filtered = applySearchFilter(filtered, search);
        filtered = applyAvailabilityFilter(filtered, availability);
        filtered = applyPriceRangeFilter(filtered, price);
        filtered = applyColorFilter(filtered, colors || []);
        filtered = applyRatingFilter(filtered, rating || 0);
        filtered = applySorting(filtered, sortBy as SortBy);

        return filtered;
    }, [products, search, availability, price, colors, sortBy, rating]);

    // Pagination calculations
    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * productsPerPage;
        return filteredProducts.slice(startIndex, startIndex + productsPerPage);
    }, [filteredProducts, currentPage]);

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    // Reset to first page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [filters, sortBy]);

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortBy(e.target.value as SortBy);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters(prev => ({
            ...prev,
            search: e.target.value
        }));
    };

    const handleAvailabilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setFilters(prev => ({
            ...prev,
            availability: checked
                ? [...prev.availability, value]
                : prev.availability.filter(item => item !== value)
        }));
    };

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setFilters(prev => ({
            ...prev,
            colors: checked
                ? [...(prev.colors || []), value.toLowerCase()]
                : (prev.colors || []).filter(item => item !== value.toLowerCase())
        }));
    };

    const handleRatingChange = (rating: number) => {
        setFilters(prev => ({
            ...prev,
            rating: prev.rating === rating ? 0 : rating
        }));
    };

    const resetFilters = () => {
        setFilters({
            availability: [],
            price: { from: '', to: '' },
            colors: [],
            search: '',
            rating: 0,
        });
        setSortBy('');
        setCurrentPage(1);
    };

    const goToPage = (page: number) => {
        setCurrentPage(page);
    };

    const goToNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    };

    const goToPrevPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    const openProductModal = useCallback((product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
        setTimeout(() => {
            setSelectedProduct(null);
        }, 300);
    }, []);

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
        e.preventDefault();
        
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

    // Custom Heart Icon Component
    const HeartIcon = ({ filled = false }: { filled?: boolean }) => (
        <svg 
            className="w-5 h-5 transition-all duration-300" 
            fill={filled ? "currentColor" : "none"} 
            stroke="currentColor" 
            viewBox="0 0 24 24"
        >
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
            />
        </svg>
    );

    // Helper function to render star ratings
    const renderStars = (rating: number = 0) => {
        return (
            <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                        key={star}
                        className={`w-4 h-4 ${star <= Math.round(rating) ? 'text-amber-400' : 'text-muted-foreground'}`}
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

    // Filter badge component
    const FilterBadge = ({ label, onRemove }: { label: string; onRemove: () => void }) => (
        <span className="badge badge--outline inline-flex items-center gap-1 bg-white/80 backdrop-blur-sm border-soft-sage">
            {label}
            <button
                type="button"
                onClick={onRemove}
                className="rounded-full hover:bg-soft-sage/30 p-0.5 transition-colors"
            >
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </span>
    );

    // Active filters count
    const activeFiltersCount = useMemo(() => {
        let count = 0;
        if (filters.availability.length > 0) count += filters.availability.length;
        if (filters.price && (filters.price.from || filters.price.to)) count += 1;
        if (filters.colors && filters.colors.length > 0) count += filters.colors.length;
        if (filters.rating && filters.rating > 0) count += 1;
        return count;
    }, [filters]);

    // Loading state
    if (loading) {
        return (
            <section className="section bg-gradient-to-b from-cream-50 to-cream-100">
                <div className="container">
                    <div className="text-center mb-12">
                        <h2 className="text-heading font-bold text-charcoal-900 font-heading mb-4">
                            Our Collection
                        </h2>
                        <p className="text-body-large text-charcoal-600">
                            Discover premium products curated just for you
                        </p>
                    </div>
                    
                    {/* Loading Skeleton */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {[...Array(10)].map((_, index) => (
                            <div key={index} className="card card--elevated rounded-md overflow-hidden animate-pulse">
                                <div className="aspect-product bg-soft-sage/30 rounded-t-md"></div>
                                <div className="p-4 space-y-3">
                                    <div className="h-4 bg-soft-sage/30 rounded"></div>
                                    <div className="h-3 bg-soft-sage/30 rounded w-3/4"></div>
                                    <div className="h-6 bg-soft-sage/30 rounded w-1/2"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="section bg-gradient-to-b from-cream-50 to-cream-100">
            <AnimatePresence>
                {alertState.show && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-4 right-4 w-auto z-50 max-w-sm"
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
                {/* Header */}
                <div className="text-center">
                    <h2 className="text-heading font-bold font-heading text-foreground">
                        Apparel Collection
                    </h2>
                </div>

                {/* Search and Filter Controls */}
                <div className="w-full">
                    <div className="flex flex-row justify-between w-full">
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={filters.search}
                                onChange={handleSearchChange}
                                className="w-full btn--sm border-2 rounded-md backdrop-blur-xl"
                            />
                            <svg
                                className="absolute right-2 top-2 h-6 w-6 text-muted-foreground"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                        <div className="relative flex flex-row justify-around w-auto">
                            {/* Sort By - Compact Version */}
                            <div className="w-full">
                                <select
                                    value={sortBy}
                                    onChange={handleSortChange }
                                    className="select rounded-md border border-border text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                                >
                                    <option value="">Sort by</option>
                                    <option value="name,asc">Name A-Z</option>
                                    <option value="name,desc">Name Z-A</option>
                                    <option value="price,asc">Price: Low to High</option>
                                    <option value="price,desc">Price: High to Low</option>
                                    <option value="rating,desc">Highest Rated</option>
                                </select>
                            </div>
                            <div className="w-full">
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className={`btn btn--sm flex items-center ${
                                        showFilters || activeFiltersCount > 0 ? 'btn--primary' : 'btn--outline backdrop-blur-xl'
                                    }`}
                                >
                                    <Filter/>
                                    <span className="hidden sm:inline">Filters</span>
                                    {activeFiltersCount > 0 && (
                                        <span className="badge--secondary text-xs">
                                            {activeFiltersCount}
                                        </span>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Expanded Filters Panel */}
                    <AnimatePresence>
                        {showFilters && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                            >
                                <div className="relative backdrop-blur-xl border-r border-l border-b rounded-lg card--sm">
                                    <div className="flex flex-col gap-4 md:flex-row justify-between">
                                        {/* Availability */}
                                        <div className="flex flex-col w-auto">
                                            <h3 className="text-sm font-medium text-foreground">Availability</h3>
                                            <div className="flex flex-col gap-2">
                                                {['In Stock', 'Out of Stock'].map((option) => (
                                                    <div key={option} className="flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            id={`Filter${option.replace(' ', '')}`}
                                                            value={option}
                                                            checked={filters.availability.includes(option)}
                                                            onChange={handleAvailabilityChange}
                                                            className="h-4 w-4 rounded border-border text-primary focus:ring-primary transition-colors"
                                                        />
                                                        <label htmlFor={`Filter${option.replace(' ', '')}`} className="ml-2 text-sm text-foreground">
                                                            {option}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Colors */}
                                        <div className="flex flex-col w-auto">
                                            <h3 className="text-sm font-medium text-foreground mb-3">Colors</h3>
                                            <div className="grid grid-cols-4 gap-2 max-h-32 overflow-y-auto">
                                                {['Red', 'Blue', 'Green', 'Black', 'White', 'Gray', 'Navy', 'Yellow'].map((color) => (
                                                    <div key={color} className="flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            id={`Filter${color}`}
                                                            value={color.toLowerCase()}
                                                            checked={filters.colors?.includes(color.toLowerCase())}
                                                            onChange={handleColorChange}
                                                            className="h-4 w-4 rounded border-border text-primary focus:ring-primary transition-colors"
                                                        />
                                                        <label htmlFor={`Filter${color}`} className="ml-2 text-sm text-foreground">
                                                            {color}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Rating */}
                                        <div className="flex flex-col w-auto">
                                            <h3 className="text-sm font-medium text-foreground mb-3">
                                                Minimum Rating
                                            </h3>
                                            <StarRating
                                                rating={filters.rating!}
                                                onChange={handleRatingChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    {/* Results Summary */}
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
                        <p className="text-body text-foreground">
                            Showing <span className="font-semibold">{paginatedProducts.length}</span> of{' '}
                            <span className="font-semibold">{filteredProducts.length}</span> products
                            {filteredProducts.length !== products.length && ' (filtered)'}
                        </p>
                        {/* Active Filters */}
                        {(filters.availability.length > 0 || (filters.colors && filters.colors.length > 0) || (filters.price && (filters.price.from || filters.price.to)) || filters.rating) ? (
                            <div className="flex items-center justify-center gap-2">
                                {filters.availability.map(avail => (
                                    <FilterBadge
                                        key={avail}
                                        label={avail}
                                        onRemove={() => setFilters(prev => ({ ...prev, availability: prev.availability.filter(item => item !== avail) }))}
                                    />
                                ))}
                                {filters.colors?.map(color => (
                                    <FilterBadge
                                        key={color}
                                        label={`Color: ${color.charAt(0).toUpperCase() + color.slice(1)}`}
                                        onRemove={() => handleColorChange({ target: { value: color, checked: false } } as React.ChangeEvent<HTMLInputElement>)}
                                    />
                                ))}
                                {filters.rating && filters.rating > 0 && (
                                    <FilterBadge
                                        label={`Rating: ${filters.rating}+ stars`}
                                        onRemove={() => handleRatingChange(filters.rating!)}
                                    />
                                )}
                                <button
                                    onClick={resetFilters}
                                    className="text-xs text-primary hover:text-primary-hover font-medium transition-colors"
                                >
                                    Clear all
                                </button>
                            </div>
                        ) : null}
                    </div>
                </div>

                {/* Product Grid */}
                <div className="flex-1">
                    {paginatedProducts.length === 0 ? (
                        <div className="text-center py-16 backdrop-blur-glass rounded-md border border-soft-sage">
                            <div className="w-24 h-24 mx-auto mb-6 bg-soft-sage/20 rounded-full flex items-center justify-center">
                                <svg className="w-12 h-12 text-charcoal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-charcoal-900 mb-2">
                                No Products Found
                            </h3>
                            <p className="text-charcoal-600 mb-6 max-w-md mx-auto">
                                {filters.search || activeFiltersCount > 0
                                    ? `We couldn't find any products matching your criteria. Try adjusting your search or filters.`
                                    : 'Our collection is currently being updated. Please check back soon for new arrivals.'
                                }
                            </p>
                            <button
                                onClick={resetFilters}
                                className="btn btn--primary shadow-emerald hover-lift"
                            >
                                Reset All Filters
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-4">
                                {paginatedProducts.map((product, index) => {
                                    const isInWishlistState = isInWishlist(product.id);

                                    return (
                                        <motion.div
                                            key={product.id}
                                            className="card--elevated card--interactive overflow-hidden rounded-md backdrop-blur-glass-enhanced border border-soft-sage/50 hover-lift group"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            whileHover={{ y: -4 }}
                                            onClick={() => openProductModal(product)}
                                        >
                                            {/* Product Image Container */}
                                            <div className="relative aspect-product overflow-hidden">
                                                {product.image && (
                                                    <Image
                                                        src={product.image}
                                                        alt={product.name}
                                                        width={300}
                                                        height={400}
                                                        className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105 cursor-pointer"
                                                        priority={index < 8}
                                                    />
                                                )}
                                                
                                                {/* Wishlist Button */}
                                                <button
                                                    onClick={(e) => handleWishlistToggle(product, e)}
                                                    className={`absolute top-2 right-2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-glass border ${
                                                        isInWishlistState 
                                                            ? 'bg-forest-emerald/10 border-forest-emerald text-red-500' 
                                                            : 'bg-white/80 border-soft-sage text-charcoal-600 hover:border-forest-emerald hover:text-forest-emerald'
                                                    } hover-lift z-10`}
                                                    aria-label={isInWishlistState ? "Remove from wishlist" : "Add to wishlist"}
                                                >
                                                    <HeartIcon filled={isInWishlistState} />
                                                </button>

                                                {/* Stock Status Badge */}
                                                {!product.inStock && (
                                                    <div className="absolute top-3 left-3">
                                                        <span className="badge badge--secondary text-xs">
                                                            Out of Stock
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Product Info */}
                                            <div className="p-2">
                                                <div className="space-y-2">
                                                    <h3 className="text-sm sm:text-lg font-semibold text-charcoal-900 font-subheading line-clamp-1 leading-tight cursor-pointer hover:text-forest-emerald transition-colors">
                                                        {product.name}
                                                    </h3>
                                                    
                                                    {product.division && (
                                                        <span className="inline-block badge badge--outline text-xs bg-soft-sage/20">
                                                            {product.division}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Rating */}
                                                <div className="flex items-center justify-between">
                                                    {renderStars(product.rating)}
                                                </div>

                                                {/* Color Dots */}
                                                {product.colors && product.colors.length > 0 && (
                                                    <div className="flex items-center gap-1 pt-2 border-t border-soft-sage/30">
                                                        <span className="text-xs text-charcoal-500">Colors:</span>
                                                        <div className="flex gap-1">
                                                            {product.colors.slice(0, 4).map((color, index) => (
                                                                <div
                                                                    key={index}
                                                                    className="w-3 h-3 rounded-full border border-soft-sage"
                                                                    style={{ backgroundColor: color.toLowerCase() }}
                                                                    title={color}
                                                                />
                                                            ))}
                                                            {product.colors.length > 4 && (
                                                                <span className="text-xs text-charcoal-400">+{product.colors.length - 4}</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex items-center justify-between mt-12 p-6 backdrop-blur-glass rounded-md border border-soft-sage">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={goToPrevPage}
                                            disabled={currentPage === 1}
                                            className={`btn btn--outline border-forest-emerald text-forest-emerald hover:bg-forest-emerald hover:text-white ${
                                                currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover-lift'
                                            }`}
                                        >
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                            </svg>
                                            Previous
                                        </button>
                                    </div>

                                    <div className="hidden sm:flex items-center gap-2">
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                                            if (
                                                page === 1 ||
                                                page === totalPages ||
                                                (page >= currentPage - 1 && page <= currentPage + 1)
                                            ) {
                                                return (
                                                    <button
                                                        key={page}
                                                        onClick={() => goToPage(page)}
                                                        className={`btn btn--sm min-w-[40px] ${
                                                            currentPage === page 
                                                                ? 'btn--primary' 
                                                                : 'btn--outline border-forest-emerald text-forest-emerald hover:bg-forest-emerald hover:text-white'
                                                        } hover-lift`}
                                                    >
                                                        {page}
                                                    </button>
                                                );
                                            } else if (page === currentPage - 2 || page === currentPage + 2) {
                                                return <span key={page} className="px-3 py-2 text-charcoal-500">...</span>;
                                            }
                                            return null;
                                        })}
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={goToNextPage}
                                            disabled={currentPage === totalPages}
                                            className={`btn btn--outline border-forest-emerald text-forest-emerald hover:bg-forest-emerald hover:text-white ${
                                                currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover-lift'
                                            }`}
                                        >
                                            Next
                                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Product Modal */}
            <ProductModal
                product={selectedProduct}
                isOpen={isModalOpen}
                onClose={closeModal}
            />
        </section>
    );
};

export default ProductCollection;