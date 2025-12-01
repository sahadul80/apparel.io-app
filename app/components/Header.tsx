'use client';

import { useState, useRef, useEffect, useCallback, useMemo, JSX } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Product, useWishlist } from './WishlistContext';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import ProductModal from './productModal';
import ReactDOM from 'react-dom';
import { GripIcon, Heart, X } from 'lucide-react';
import ApparelCarousel from './carousel';

// Types
interface MenuItem {
  href: string;
  label: string;
  hasDropdown?: boolean;
  children?: MenuItem[];
  image?: {
    src: string;
    alt: string;
  };
  icon?: JSX.Element;
}

interface SocialLink {
  href: string;
  icon: JSX.Element;
}

// Modal Portal Component
const ModalPortal = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return typeof document !== 'undefined' 
    ? ReactDOM.createPortal(children, document.body)
    : null;
};

// Optimized SVG Icons
const ChevronIcon = ({ className = "" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className={`w-3 h-3 transition-transform duration-300 ${className}`}>
    <path fill="currentColor" d="M443.5 162.6l-7.1-7.1c-4.7-4.7-12.3-4.7-17 0L224 351 28.5 155.5c-4.7-4.7-12.3-4.7-17 0l-7.1 7.1c-4.7 4.7-4.7 12.3 0 17l211 211.1c4.7 4.7 12.3 4.7 17 0l211-211.1c4.8-4.7 4.8-12.3.1-17z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-5 h-5 transition-colors duration-300">
    <path fill="currentColor" d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-5 h-5 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-6 h-6 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// Menu Icons
const GroupIcon = () => (
  <svg className="w-4 h-4 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const ProductsIcon = () => (
  <svg className="w-4 h-4 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

const PromiseIcon = () => (
  <svg className="w-4 h-4 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const LocationIcon = () => (
  <svg className="w-4 h-4 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const NewsIcon = () => (
  <svg className="w-4 h-4 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9m0 0v2m0-2a2 2 0 012-2h2a2 2 0 012 2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v2m-6 0h0" />
  </svg>
);

const AllProductsIcon = () => (
  <svg className="w-4 h-4 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
);

const DivisionIcon = () => (
  <svg className="w-4 h-4 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const CategoryIcon = () => (
  <svg className="w-4 h-4 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const CreateIcon = () => (
  <svg className="w-4 h-4 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

const ContactIcon = () => (
  <svg className="w-4 h-4 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

// Menu Data with Icons
const menuData: MenuItem[] = [
  {
    href: "/our-group",
    label: "Our Group",
    icon: <GroupIcon />
  },
  {
    href: "/products-and-services",
    label: "Products & Services",
    hasDropdown: true,
    icon: <ProductsIcon />,
    children: [
      {
        href: "/products",
        label: "All Products",
        icon: <AllProductsIcon />,
        image: {
          src: "/images/products/denimjacket.jpg",
          alt: "All Products"
        }
      },
      {
        href: "/product-divisions",
        label: "Division",
        hasDropdown: true,
        icon: <DivisionIcon />,
        children: [
          { href: "/products?product_division%5B154%5D=154", label: "Athleisure" },
          { href: "/products?product_division%5B155%5D=155", label: "Corporate" },
          { href: "/products?product_division%5B156%5D=156", label: "Footwear" },
          { href: "/products?product_division%5B157%5D=157", label: "Lifestyle" },
          { href: "/products?product_division%5B158%5D=158", label: "Loungewear" },
          { href: "/products?product_division%5B159%5D=159", label: "PPE" },
          { href: "/products?product_division%5B160%5D=160", label: "Retail" },
          { href: "/products?product_division%5B161%5D=161", label: "Sports" },
          { href: "/products?product_division%5B162%5D=162", label: "Wellness / Spa" },
        ]
      },
      {
        href: "/product-categories",
        label: "Category",
        hasDropdown: true,
        icon: <CategoryIcon />,
        children: [
          { href: "/products?product_category%5B354%5D=354", label: "Chefwear" },
          { href: "/products?product_category%5B355%5D=355", label: "Dresses / Jumpsuits" },
          { href: "/products?product_category%5B356%5D=356", label: "Footwear" },
          { href: "/products?product_category%5B357%5D=357", label: "Innerwear" },
          { href: "/products?product_category%5B358%5D=358", label: "Jackets / Coats" },
          { href: "/products?product_category%5B359%5D=359", label: "Knit Bottoms" },
          { href: "/products?product_category%5B360%5D=360", label: "Knit Tops" },
          { href: "/products?product_category%5B361%5D=361", label: "Knitwear (Flat Knit)" },
          { href: "/products?product_category%5B362%5D=362", label: "Nightwear" },
          { href: "/products?product_category%5B363%5D=363", label: "PPE" },
          { href: "/products?product_category%5B364%5D=364", label: "Swimwear" },
          { href: "/products?product_category%5B365%5D=365", label: "Woven Bottoms" },
          { href: "/products?product_category%5B366%5D=366", label: "Woven Tops" },
          { href: "/products?product_category%5B367%5D=367", label: "Other" },
        ]
      },
      {
        href: "/product-wear",
        label: "Create Product Portfolio",
        icon: <CreateIcon />
      }
    ]
  },
  {
    href: "/our-promise",
    label: "Our Promise",
    icon: <PromiseIcon />
  },
  {
    href: "/global-locations",
    label: "Global Locations",
    icon: <LocationIcon />
  },
  {
    href: "/newsfeed",
    label: "Newsfeed",
    icon: <NewsIcon />
  },
  {
    href: "/contact-us",
    label: "Contact Us",
    icon: <ContactIcon />
  }
];

const socialLinks: SocialLink[] = [
  {
    href: "https://bd.linkedin.com/company/",
    icon: <LinkedInIcon />
  }
];

// Custom hook for active state
const useIsActive = (href: string) => {
  const pathname = usePathname();
  return pathname === href || pathname.startsWith(href + '/');
};

// Enhanced Desktop Dropdown Component
const DesktopDropdown = ({ 
  items, 
  level = 1,
  isOpen = false,
  position = "left-0"
}: { 
  items: MenuItem[]; 
  level?: number;
  isOpen?: boolean;
  position?: string;
}) => {
  return (
    <div className={`
      absolute ${position} top-full min-w-64 shadow-emerald border border-soft-sage rounded-md z-50 transition-all duration-100 ease-in-out transform origin-top backdrop-blur-glass
      ${isOpen ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-2 invisible'}
      ${level > 1 ? 'mt-1' : 'mt-3'}
      bg-card text-card-foreground
    `}>
      <div className="p-2">
        {items.map((item, index) => (
          <div key={index} className="relative group">
            <Link 
              href={item.href}
              className="flex items-center space-x-3 transition-all duration-300 rounded-md hover:bg-soft-sage/20 group text-foreground hover:text-forest-emerald p-2"
            >
              {item.icon && (
                <span className="flex-shrink-0 text-forest-emerald group-hover:text-heritage-green transition-colors">
                  {item.icon}
                </span>
              )}
              <span className="font-medium flex-1">{item.label}</span>
              {item.hasDropdown && (
                <ChevronIcon className="transform -rotate-90 flex-shrink-0 transition-transform group-hover:translate-x-0.5 text-forest-emerald" />
              )}
            </Link>
            
            {item.image && (
              <div className="border-t border-soft-sage mt-2 pt-2">
                <div className="relative overflow-hidden rounded-md">
                  <Image 
                    src={item.image.src} 
                    alt={item.image.alt}
                    width={300}
                    height={400}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </div>
            )}
            
            {item.hasDropdown && item.children && (
              <DesktopDropdown 
                items={item.children} 
                level={level + 1} 
                isOpen={false}
                position={level === 1 ? "left-full top-0 ml-1" : "left-full top-0 ml-1"}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Enhanced Desktop Menu Item Component with Active State
const DesktopMenuItem = ({ item, index }: { item: MenuItem; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>(null);
  const isActive = useIsActive(item.href);

  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 10);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div 
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link 
        href={item.href}
        className={`
          flex items-center transition-all duration-300 font-medium 
          text-foreground hover:text-forest-emerald relative
          ${isActive ? 'text-forest-emerald font-semibold' : ''}
          group px-4 py-2 rounded-md
        `}
      >
        {item.icon && (
          <span className={`w-5 h-5 flex items-center justify-center mr-2 transition-colors
            ${isActive ? 'text-forest-emerald' : 'text-forest-emerald group-hover:text-heritage-green'}
          `}>
            {item.icon}
          </span>
        )}
        <span className="relative">
          {item.label}
          {/* Enhanced Active & Hover Underline */}
          <span className={`
            absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-forest-emerald to-heritage-green 
            transition-all duration-300 rounded-full
            ${(isHovered || isActive) ? 'w-full' : 'w-0'}
          `} />
        </span>
        {item.hasDropdown && (
          <ChevronIcon className={`ml-1 transform transition-transform duration-300 ${isHovered ? 'rotate-180' : ''} text-forest-emerald`} />
        )}
      </Link>
      
      {item.hasDropdown && item.children && (
        <DesktopDropdown 
          items={item.children} 
          isOpen={isHovered}
        />
      )}
    </div>
  );
};

// Enhanced Products & Services Two Column Dropdown
const ProductsServicesDropdown = ({ 
  isOpen = false
}: { 
  isOpen?: boolean;
}) => {
  const productsItem = menuData.find(item => item.label === "Products & Services");
  if (!productsItem?.children) return null;

  const [allProducts, divisionItem, categoryItem, createPortfolio] = productsItem.children;

  return (
    <div className={`
      absolute left-0 top-full min-w-[1000px] shadow-emerald rounded-md z-50 transition-all duration-300 ease-in-out transform origin-top backdrop-blur-glass-enhanced
      ${isOpen ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-2 invisible'}
      bg-card text-card-foreground
    `}>
      <div className="relative">
        <div className="grid grid-cols-3 gap-8 p-4">
          {/* All Products Section */}
          <div className="flex flex-col gap-4">
            <Link 
              href={allProducts.href}
              className="flex items-center transition-all duration-300 rounded-md hover:bg-soft-sage/20 group text-foreground hover:text-forest-emerald p-3"
            >
              {allProducts.icon && (
                <span className="flex-shrink-0 text-forest-emerald group-hover:text-heritage-green transition-colors mr-3">
                  {allProducts.icon}
                </span>
              )}
              <span className="font-semibold text-lg flex-1">{allProducts.label}</span>
            </Link>
            {allProducts.image && (
              <div className="relative overflow-hidden rounded-md border border-soft-sage">
                <Image 
                  src={allProducts.image.src} 
                  alt={allProducts.image.alt}
                  width={300}
                  height={400}
                  className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            )}
            {/* Create Product Portfolio */}
            <div className="rounded-md bg-gradient-to-r from-soft-sage/20 to-muted-gold/10 hover-lift font-semibold">
              <Link 
                href={createPortfolio.href}
                className="flex items-center transition-all duration-300 rounded-md group text-foreground p-3"
              >
                {createPortfolio.icon && (
                  <span className="flex-shrink-0 text-muted-gold group-hover:text-heritage-green transition-colors mr-3">
                    {createPortfolio.icon}
                  </span>
                )}
                <span className="font-semibold flex-1">{createPortfolio.label}</span>
              </Link>
            </div>
          </div>
          
          {/* Division Column */}
          <div className="flex flex-col justify-between gap-4">
            <Link href={divisionItem.href} className="flex items-center space-x-2 bg-forest-emerald/10 gap-2 hover-lift p-3 rounded-md">
              {divisionItem.icon && (
                <span className="text-forest-emerald text-bold">
                  {divisionItem.icon}
                </span>
              )}
              <h3 className="font-bold text-foreground text-lg font-semibold">Division</h3>
            </Link>
            <div className="flex flex-col gap-1">
              {divisionItem.children?.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="transition-all duration-300 rounded-md hover:bg-forest-emerald/10 text-foreground hover:text-forest-emerald hover-lift p-2 font-semibold"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Category Column */}
          <div className="flex flex-col justify-start gap-4">
            <Link href={categoryItem.href} className="flex items-center space-x-2 bg-muted-gold/10 gap-2 hover-lift p-3 rounded-md">
              {categoryItem.icon && (
                <span className="text-muted-gold text-bold">
                  {categoryItem.icon}
                </span>
              )}
              <h3 className="font-bold text-foreground text-lg">Category</h3>
            </Link>
            <div className="flex flex-col gap-1">
              {categoryItem.children?.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="transition-all duration-300 rounded-md hover:bg-muted-gold/10 text-foreground hover:text-forest-emerald hover-lift p-2 font-semibold"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Desktop Menu Item for Products & Services
const DesktopProductsMenuItem = ({ item }: { item: MenuItem }) => {
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>(null);
  const isActive = useIsActive(item.href);

  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 150);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div 
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link 
        href={item.href}
        className={`
          flex items-center space-x-3 transition-all duration-300 font-medium 
          text-foreground hover:text-forest-emerald relative
          ${isActive ? 'text-forest-emerald font-semibold' : ''}
          group px-4 py-2 rounded-md
        `}
      >
        {item.icon && (
          <span className={`w-5 h-5 flex items-center justify-center 
            ${isActive ? 'text-forest-emerald' : 'text-forest-emerald group-hover:text-heritage-green'}
          `}>
            {item.icon}
          </span>
        )}
        <span className="relative">
          {item.label}
          {/* Enhanced Active & Hover Underline */}
          <span className={`
            absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-forest-emerald to-muted-gold 
            transition-all duration-300 rounded-full
            ${(isHovered || isActive) ? 'w-full' : 'w-0'}
          `} />
        </span>
        {item.hasDropdown && (
          <ChevronIcon className={`transform transition-transform duration-300 ${isHovered ? 'rotate-180' : ''} text-forest-emerald`} />
        )}
      </Link>
      
      {item.hasDropdown && (
        <ProductsServicesDropdown isOpen={isHovered} />
      )}
    </div>
  );
};

// Enhanced Search Component - Always visible in navbar
const SearchBox = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Fetch search results
  const fetchSearchResults = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    try {
      setSearchLoading(true);
      const res = await fetch('/api/carousel');
      if (!res.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await res.json();
      
      // Enhanced search filtering with category, division, and madeFor
      const filtered = data.filter((product: Product) => {
        const searchTerm = query.toLowerCase();
        return (
          product.name.toLowerCase().includes(searchTerm) ||
          (product.description && product.description.toLowerCase().includes(searchTerm)) ||
          (product.category && product.category.toLowerCase().includes(searchTerm)) ||
          (product.division && product.division.toLowerCase().includes(searchTerm)) ||
          (product.madeFor && product.madeFor[0].toLowerCase().includes(searchTerm))
        );
      });
      
      setSearchResults(filtered);
      setShowResults(true);
    } catch (error) {
      console.error('Error searching products: ', error);
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSearchResults(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      // If no search query, navigate to products page
      router.push('/products');
      return;
    }

    // Navigate to products page with search query
    router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
    setShowResults(false);
    setSearchQuery('');
  };

  const handleResultClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    setShowResults(false);
    setSearchQuery('');
  };

  const handleViewAllResults = () => {
    const params = new URLSearchParams();
    params.set('search', encodeURIComponent(searchQuery));
    router.push(`/products?${params.toString()}`);
    setShowResults(false);
    setSearchQuery('');
  };

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedProduct(null);
    }, 300);
  }, []);

  return (
    <div ref={searchRef} className="flex-1">
      <form 
        onSubmit={handleSearchSubmit}
        className="flex items-center gap-2"
      >
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchQuery && setShowResults(true)}
            className="w-full px-4 py-2 rounded-lg border border-soft-sage bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-forest-emerald focus:border-transparent transition-all duration-300 text-sm"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-forest-emerald hover:text-heritage-green transition-colors duration-300"
          >
            <SearchIcon />
          </button>
          
          {/* Search Results Dropdown */}
          <AnimatePresence>
            {showResults && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute backdrop-blur-glass-enhanced rounded-md border border-soft-sage shadow-xl max-h-[75vh] overflow-y-auto"
              >
                <div className="p-2">
                  {searchLoading ? (
                    <div className="flex items-center justify-center py-4">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-forest-emerald"></div>
                      <span className="ml-2 text-sm text-charcoal-600">Searching...</span>
                    </div>
                  ) : searchResults.length > 0 ? (
                    <>
                      {searchResults.slice(0, 5).map((product) => (
                        <div
                          key={product.id}
                          className="flex items-center gap-3 p-3 rounded-md hover:bg-soft-sage/20 cursor-pointer transition-colors duration-200 group"
                          onClick={() => handleResultClick(product)}
                        >
                          {product.image && (
                            <div className="flex-shrink-0 w-16 h-16 relative rounded-md overflow-hidden">
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-charcoal-900 truncate group-hover:text-forest-emerald transition-colors">
                              {product.name}
                            </h4>
                            <div className="flex flex-wrap items-center gap-2 mt-1">
                              {product.category && (
                                <span className="text-xs text-charcoal-500 bg-soft-sage/30 px-2 py-1 rounded">
                                  {product.category}
                                </span>
                              )}
                              {product.division && (
                                <span className="text-xs text-charcoal-500 bg-forest-emerald/10 px-2 py-1 rounded">
                                  {product.division}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {searchResults.length > 5 && (
                        <button
                          onClick={handleViewAllResults}
                          className="w-full text-center py-3 text-sm font-semibold text-forest-emerald hover:bg-soft-sage/20 border-t border-soft-sage transition-colors duration-200"
                        >
                          View all {searchResults.length} results
                        </button>
                      )}
                    </>
                  ) : searchQuery ? (
                    <div className="text-center py-6">
                      <svg className="w-8 h-8 text-charcoal-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <p className="text-sm text-charcoal-600">No products found for "{searchQuery}"</p>
                      <p className="text-xs text-charcoal-500 mt-1">Try different keywords</p>
                    </div>
                  ) : null}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </form>

      {/* Product Modal via Portal */}
      {selectedProduct && (
        <ModalPortal>
          <ProductModal
            product={selectedProduct}
            isOpen={isModalOpen}
            onClose={closeModal}
          />
        </ModalPortal>
      )}
    </div>
  );
};

// Mobile Search Component
const MobileSearchBox = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Fetch search results for mobile
  const fetchSearchResults = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    try {
      setSearchLoading(true);
      const res = await fetch('/api/carousel');
      if (!res.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await res.json();
      
      // Enhanced search filtering with category, division, and madeFor
      const filtered = data.filter((product: Product) => {
        const searchTerm = query.toLowerCase();
        return (
          product.name.toLowerCase().includes(searchTerm) ||
          (product.description && product.description.toLowerCase().includes(searchTerm)) ||
          (product.category && product.category.toLowerCase().includes(searchTerm)) ||
          (product.division && product.division.toLowerCase().includes(searchTerm)) ||
          (product.madeFor && product.madeFor[0].toLowerCase().includes(searchTerm))
        );
      });
      
      setSearchResults(filtered);
      setShowResults(true);
    } catch (error) {
      console.error('Error searching products: ', error);
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  // Debounced search for mobile
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSearchResults(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      router.push('/products');
      return;
    }

    const params = new URLSearchParams();
    params.set('search', encodeURIComponent(searchQuery));
    router.push(`/products?${params.toString()}`);
    setShowResults(false);
    setSearchQuery('');
  };

  const handleResultClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    setShowResults(false);
    setSearchQuery('');
  };

  const handleViewAllResults = () => {
    const params = new URLSearchParams();
    params.set('search', encodeURIComponent(searchQuery));
    router.push(`/products?${params.toString()}`);
    setShowResults(false);
    setSearchQuery('');
  };

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedProduct(null);
    }, 300);
  }, []);

  return (
    <div className="relative">
      <form 
        onSubmit={handleSearchSubmit}
        className="w-full"
      >
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchQuery && setShowResults(true)}
            className="w-full px-4 py-3 rounded-lg border border-soft-sage bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-forest-emerald focus:border-transparent transition-all duration-300"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-forest-emerald hover:text-heritage-green transition-colors duration-300"
          >
            <SearchIcon />
          </button>
        </div>
      </form>

      {/* Mobile Search Results */}
      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full rounded-md backdrop-blur-glass-enhanced shadow-xl z-50 max-h-160 overflow-y-auto"
          >
            <div className="p-0">
              {searchLoading ? (
                <div className="flex items-center justify-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-forest-emerald"></div>
                  <span className="ml-2 text-sm text-charcoal-600">Searching...</span>
                </div>
              ) : searchResults.length > 0 ? (
                <>
                  {searchResults.slice(0, 5).map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-4 p-2 rounded-md border hover:bg-soft-sage/20 cursor-pointer transition-colors duration-200 group"
                      onClick={() => handleResultClick(product)}
                    >
                      {product.image && (
                        <div className="flex-shrink-0 w-8 h-16 relative rounded-md overflow-hidden">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-charcoal-900 truncate group-hover:text-forest-emerald transition-colors">
                          {product.name}
                        </h4>
                        <div className="flex flex-wrap items-center gap-2">
                          {product.category && (
                            <span className="text-xs text-charcoal-500 bg-soft-sage/30 rounded">
                              {product.category}
                            </span>
                          )}
                          {product.division && (
                            <span className="text-xs text-charcoal-500 bg-forest-emerald/10 rounded">
                              {product.division}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {searchResults.length > 5 && (
                    <button
                      onClick={handleViewAllResults}
                      className="w-full text-center py-3 text-sm font-semibold text-forest-emerald hover:bg-soft-sage/20 border-t border-soft-sage transition-colors duration-200"
                    >
                      View all {searchResults.length} results
                    </button>
                  )}
                </>
              ) : searchQuery ? (
                <div className="text-center py-6">
                  <svg className="w-8 h-8 text-charcoal-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <p className="text-sm text-charcoal-600">No products found for "{searchQuery}"</p>
                  <p className="text-xs text-charcoal-500 mt-1">Try different keywords</p>
                </div>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Product Modal via Portal */}
      {selectedProduct && (
        <ModalPortal>
          <ProductModal
            product={selectedProduct}
            isOpen={isModalOpen}
            onClose={closeModal}
          />
        </ModalPortal>
      )}
    </div>
  );
};

// Enhanced Wishlist Button
const WishlistButton = () => {
  const { wishlistItems } = useWishlist();
  const wishlistCount = wishlistItems.length;

  return (
    <Link 
      href="/wishlist" 
      className="transition-all duration-300 relative text-forest-emerald hover:text-heritage-green group hover-lift rounded-md touch-target flex items-center hover:bg-soft-sage/20"
      title="Go to wishlist"
    >
      <div className="">
        <Heart fill={wishlistCount > 0 ? "currentColor" : "none"} />
        {wishlistCount > 0 && (
          <span className="absolute top-0 right-0 bg-muted-gold text-charcoal text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold shadow-emerald animate-pulse">
            {wishlistCount > 9 ? '9+' : wishlistCount}
          </span>
        )}
      </div>
    </Link>
  );
};

// Mobile Menu Item Component (Fixed to resolve hook order violation)
const MobileMenuItem = ({ 
  item, 
  level = 0, 
  parentPath = '', 
  isSubmenuOpen, 
  onToggle, 
  onClose 
}: { 
  item: MenuItem; 
  level?: number; 
  parentPath?: string; 
  isSubmenuOpen: boolean; 
  onToggle: () => void; 
  onClose: () => void;
}) => {
  const isActive = useIsActive(item.href);
  
  return (
    <li className="border-b border-soft-sage/30 last:border-b-0">
      <div className="flex items-center justify-between overflow-auto">
        <Link 
          href={item.href}
          className={`
            flex items-center flex-1 font-medium 
            text-card-foreground transition-colors duration-300 relative
            ${isActive ? 'text-forest-emerald font-semibold' : 'hover:text-forest-emerald'}
          `}
          onClick={onClose}
        >
          <span className="relative flex items-center gap-2 p-2">
            {/* Mobile active indicator */}
            {isActive && (
              <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-forest-emerald rounded-full" />
            )}
            {item.icon && (
              <span className={`flex items-center justify-center
                ${isActive ? 'text-forest-emerald' : ''}
              `}>
                {item.icon}
              </span>
            )}
            <span>{item.label}</span>
          </span>
        </Link>
        {item.hasDropdown && item.children && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
            className="transition-all duration-300 text-forest-emerald hover-lift rounded-md touch-target"
            aria-label={`Toggle ${item.label} submenu`}
          >
            <ChevronIcon className={`text-center transform transition-transform duration-300 ${isSubmenuOpen ? 'rotate-180' : ''}`} />
          </button>
        )}
      </div>
      
      {item.image && (
        <div className="p-2">
          <div className="relative overflow-hidden">
            <ApparelCarousel componentSize="2xs"/>
          </div>
        </div>
      )}
      
      {item.hasDropdown && item.children && isSubmenuOpen && (
        <div className="border-t border-soft-sage/30 mb-2">
          <MobileMenuItems 
            items={item.children} 
            level={level + 1} 
            parentPath={parentPath} 
            onClose={onClose}
          />
        </div>
      )}
    </li>
  );
};

// Mobile Menu Items Component
const MobileMenuItems = ({ 
  items, 
  level = 0, 
  parentPath = '', 
  onClose 
}: { 
  items: MenuItem[]; 
  level?: number; 
  parentPath?: string; 
  onClose: () => void;
}) => {
  const [openSubmenus, setOpenSubmenus] = useState<Set<string>>(new Set());

  const toggleSubmenu = useCallback((path: string) => {
    setOpenSubmenus(prev => {
      const newSet = new Set(prev);
      if (newSet.has(path)) {
        newSet.delete(path);
      } else {
        newSet.add(path);
      }
      return newSet;
    });
  }, []);

  return (
    <ul className={`${level > 0 ? 'pl-4 mt-2' : ''} space-y-1`}>
      {items.map((item, index) => {
        const itemPath = `${parentPath}-${index}`;
        const isSubmenuOpen = openSubmenus.has(itemPath);
        
        return (
          <MobileMenuItem
            key={index}
            item={item}
            level={level}
            parentPath={itemPath}
            isSubmenuOpen={isSubmenuOpen}
            onToggle={() => toggleSubmenu(itemPath)}
            onClose={onClose}
          />
        );
      })}
    </ul>
  );
};

// Fixed Mobile Menu Component
const MobileMenu = ({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean; 
  onClose: () => void;
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'static';
      document.body.style.width = 'auto';
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'static';
      document.body.style.width = 'auto';
    };
  }, [isOpen]);

  return (
    <>      
      {/* Mobile Menu Panel */}
      <div 
        ref={menuRef}
        className={`
          fixed top-0 right-0 w-full transform transition-transform duration-300 ease-in-out backdrop-blur-glass-enhanced
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
          lg:hidden shadow-emerald
        `}
      >
        {/* Header */}
        <div className="grid grid-cols-3 flex justify-between items-center">          
          <div></div>
          {/* Mobile Search - Now visible in mobile menu */}
          <MobileSearchBox />
          <button
            onClick={onClose}
            className="transition-all duration-300 text-forest-emerald hover:text-heritage-green hover-lift rounded-md touch-target backdrop-blur-emerald"
            aria-label="Close menu"
          >
            <X/>
          </button>
        </div>
        
        {/* Menu Content */}
        <nav className="h-full overflow-auto p-2">
          <div className="overflow-y-auto p-4">
            <MobileMenuItems items={menuData} onClose={onClose} />
          </div>
          
          {/* Social Icons for Mobile */}
          <div className="border-t border-soft-sage backdrop-blur-lg bg-card/80 p-4">
            <div className="flex space-x-4 justify-center">
              {socialLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all duration-300 p-3 text-forest-emerald hover:text-heritage-green hover-lift rounded-md backdrop-blur-emerald border border-soft-sage/50 touch-target"
                  aria-label="Visit LinkedIn"
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

// Main Header Component
export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Enhanced scroll effect for header background
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  // Memoized desktop navigation
  const desktopNavigation = useMemo(() => (
    <nav className="hidden lg:flex items-center space-x-1">
      {menuData.map((item, index) => (
        item.label === "Products & Services" ? (
          <DesktopProductsMenuItem key={index} item={item} />
        ) : (
          <DesktopMenuItem key={index} item={item} index={index} />
        )
      ))}
    </nav>
  ), []);

  return (
    <header
      className={`
        sticky top-0 z-40 transition-all duration-500 
        ${isScrolled
          ? 'bg-background/95 shadow-emerald backdrop-blur-2xl'
          : 'bg-background/80 backdrop-blur-sm'
        }
        text-foreground
      `}
    >
      <div className="container mx-auto px-4">
        {/* Main Header Content */}
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link 
            href="/" 
            className="hover:opacity-80"
            aria-label="Home"
          >
            <Image
              src="/logo.svg"
              alt="APPAREL.IO"
              height={160}
              width={160}
              className="absolute inset-0 left-2 sm:top-2 w-auto h-12 sm:h-32 hover:scale-95 z-1 rounded"
              priority
            />
          </Link>
          
          {/* Desktop Navigation */}
          {desktopNavigation}

          {/* Right Side Actions */}
          <div className="flex items-center">
            
            {/* Search - Always visible on desktop */}
            <div className="hidden sm:flex">
              <SearchBox />
            </div>

            {/* Wishlist */}
            <div className="z-1">
              <WishlistButton />
            </div>
            

            {/* LinkedIn - Desktop */}
            <a
              href="https://bd.linkedin.com/company/zxyinternational"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all duration-300 hidden lg:flex items-center space-x-2 text-forest-emerald hover:text-heritage-green hover-lift rounded-md touch-target px-3 py-2 hover:bg-soft-sage/20"
              aria-label="Visit our LinkedIn"
            >
              <LinkedInIcon />
            </a>

            {/* Enhanced Mobile Menu Toggle */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden transition-all duration-300 text-forest-emerald hover:text-heritage-green hover-lift rounded-md backdrop-blur-emerald border border-soft-sage/50 p-2 touch-target"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X/> : <GripIcon/>}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={closeMobileMenu} 
      />
    </header>
  );
}