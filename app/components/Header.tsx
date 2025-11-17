'use client';

import { useState, useRef, useEffect, JSX } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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

// SVG Icons
const ChevronIcon = ({ className = "" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className={`w-3 h-3 transition-transform duration-200 ${className}`}>
    <path fill="currentColor" d="M443.5 162.6l-7.1-7.1c-4.7-4.7-12.3-4.7-17 0L224 351 28.5 155.5c-4.7-4.7-12.3-4.7-17 0l-7.1 7.1c-4.7 4.7-4.7 12.3 0 17l211 211.1c4.7 4.7 12.3 4.7 17 0l211-211.1c4.8-4.7 4.8-12.3.1-17z" />
  </svg>
);

const HeartIcon = () => (
  <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
    <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z" fill="currentColor" />
  </svg>
);

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-5 h-5">
    <path fill="currentColor" d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// Menu Icons
const GroupIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const ProductsIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

const PromiseIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const LocationIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const NewsIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9m0 0v2m0-2a2 2 0 012-2h2a2 2 0 012 2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v2m-6 0h0" />
  </svg>
);

const AllProductsIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
);

const DivisionIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const CategoryIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const CreateIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
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
          src: "/sites/default/files/2022-07/ZF22EM07_1C.jpeg",
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
];

const socialLinks: SocialLink[] = [
  {
    href: "https://bd.linkedin.com/company/zxyinternational",
    icon: <LinkedInIcon />
  }
];

// Desktop Dropdown Component
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
      absolute ${position} top-full min-w-64 shadow-lg border border-gray-200 rounded-lg z-50 transition-all duration-300 ease-in-out transform origin-top
      bg-white
      ${isOpen ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-2 invisible'}
      ${level > 1 ? 'mt-1' : 'mt-3'}
    `}>
      <div className="p-2">
        {items.map((item, index) => (
          <div key={index} className="relative group">
            <Link 
              href={item.href}
              className="flex items-center space-x-3 px-4 py-3 transition-all duration-200 rounded-lg hover:bg-gray-50 group text-gray-900"
            >
              {item.icon && (
                <span className="flex-shrink-0 text-gray-600 group-hover:text-gray-900 transition-colors">
                  {item.icon}
                </span>
              )}
              <span className="font-medium flex-1">{item.label}</span>
              {item.hasDropdown && (
                <ChevronIcon className="transform -rotate-90 flex-shrink-0 transition-transform group-hover:translate-x-0.5 text-gray-600" />
              )}
            </Link>
            
            {item.image && (
              <div className="px-4 py-2 border-t border-gray-100">
                <div className="relative overflow-hidden rounded-lg">
                  <Image 
                    src={item.image.src} 
                    alt={item.image.alt}
                    width={200}
                    height={150}
                    className="w-full h-32 object-cover transition-transform duration-300 hover:scale-105"
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

// Desktop Menu Item Component
const DesktopMenuItem = ({ item, index }: { item: MenuItem; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 150);
  };

  return (
    <div 
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link 
        href={item.href}
        className="flex items-center space-x-1 py-6 transition-all duration-200 font-medium text-gray-900 hover:text-gray-700 group"
      >
        {item.icon && (
          <span className="w-5 h-5 flex items-center justify-center text-gray-600 group-hover:text-gray-900 transition-colors">
            {item.icon}
          </span>
        )}
        <span>{item.label}</span>
        {item.hasDropdown && (
          <ChevronIcon className={`transform transition-transform duration-200 ${isHovered ? 'rotate-180' : ''} text-gray-600`} />
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

// Mobile Menu Component
const MobileMenu = ({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean; 
  onClose: () => void;
}) => {
  const [openSubmenus, setOpenSubmenus] = useState<Set<string>>(new Set());

  const toggleSubmenu = (path: string) => {
    const newOpenSubmenus = new Set(openSubmenus);
    if (newOpenSubmenus.has(path)) {
      newOpenSubmenus.delete(path);
    } else {
      newOpenSubmenus.add(path);
    }
    setOpenSubmenus(newOpenSubmenus);
  };

  const renderMobileMenuItems = (items: MenuItem[], level = 0, parentPath = '') => {
    return (
      <ul className={`${level > 0 ? 'pl-4 bg-gray-50 rounded-lg m-2' : ''}`}>
        {items.map((item, index) => {
          const itemPath = `${parentPath}-${index}`;
          const isSubmenuOpen = openSubmenus.has(itemPath);
          
          return (
            <li key={index} className="border-b border-gray-200 last:border-b-0">
              <div className="flex items-center justify-between">
                <Link 
                  href={item.href}
                  className="flex items-center space-x-3 py-4 flex-1 font-medium text-gray-900 transition-colors"
                  onClick={onClose}
                >
                  {item.icon && (
                    <span className="w-4 h-4 flex items-center justify-center text-gray-600">
                      {item.icon}
                    </span>
                  )}
                  <span>{item.label}</span>
                </Link>
                {item.hasDropdown && (
                  <button
                    onClick={() => toggleSubmenu(itemPath)}
                    className="p-3 transition-colors text-gray-600"
                  >
                    <ChevronIcon className={`transform transition-transform duration-200 ${isSubmenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                )}
              </div>
              
              {item.image && (
                <div className="px-4 pb-3">
                  <div className="relative overflow-hidden rounded-lg">
                    <Image 
                      src={item.image.src} 
                      alt={item.image.alt}
                      width={200}
                      height={120}
                      className="w-full h-24 object-cover"
                    />
                  </div>
                </div>
              )}
              
              {item.hasDropdown && item.children && isSubmenuOpen && (
                <div className="border-t border-gray-100 bg-gray-50 rounded-lg m-2">
                  {renderMobileMenuItems(item.children, level + 1, itemPath)}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className={`
      fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out
      bg-white
      ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      lg:hidden
    `}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex justify-between items-center shadow-sm bg-white">
        <span className="text-lg font-semibold text-gray-900">Menu</span>
        <button
          onClick={onClose}
          className="p-2 transition-colors text-gray-600 hover:text-gray-900"
        >
          <CloseIcon />
        </button>
      </div>
      
      {/* Menu Content */}
      <nav className="h-full overflow-y-auto">
        {renderMobileMenuItems(menuData)}
        
        {/* Social Icons and Contact Button for Mobile */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex space-x-4 mb-4 justify-center">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors p-2 text-gray-600 hover:text-gray-900"
              >
                {link.icon}
              </a>
            ))}
          </div>
          <Link 
            href="/contact-us" 
            className="block w-full text-center border-2 border-gray-300 text-gray-900 px-6 py-3 rounded-lg transition-all duration-200 font-medium hover:bg-gray-100"
            onClick={onClose}
          >
            Contact Us
          </Link>
        </div>
      </nav>
    </div>
  );
};

// Search Component
const SearchBox = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={searchRef} className="relative">
      <button
        onClick={() => setIsSearchOpen(!isSearchOpen)}
        className="p-2 transition-colors duration-200 text-gray-600 hover:text-gray-900"
      >
        <SearchIcon />
      </button>

      {isSearchOpen && (
        <form 
          action="/search" 
          className="absolute right-0 top-full mt-2 border border-gray-200 rounded-lg shadow-lg z-50 min-w-80 p-4 bg-white"
        >
          <label htmlFor="header-search-box" className="sr-only">Search:</label>
          <div className="flex space-x-2">
            <input
              type="text"
              name="keys"
              id="header-search-box"
              placeholder="Search..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white text-gray-900"
              autoFocus
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-lg transition-colors duration-200 font-medium bg-gray-900 text-white hover:bg-gray-800"
            >
              Search
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

// Main Header Component
export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 shadow-sm z-40 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        {/* Main Header Content */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="block">
              <Image
                src="/logo.png"
                alt="Home"
                width={180}
                height={60}
                priority
                className="h-16 w-auto hover:opacity-80 transition-opacity"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {menuData.map((item, index) => (
              <DesktopMenuItem key={index} item={item} index={index} />
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <SearchBox />

            {/* Wishlist */}
            <Link 
              href="/wishlist" 
              className="p-2 transition-colors duration-200 relative text-gray-600 hover:text-gray-900"
              title="Go to wishlist"
            >
              <HeartIcon />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Link>

            {/* LinkedIn - Desktop */}
            <a
              href="https://www.linkedin.com/company/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 transition-colors duration-200 hidden lg:block text-gray-600 hover:text-gray-900"
            >
              <LinkedInIcon />
            </a>

            {/* Contact Button - Desktop */}
            <Link 
              href="/contact-us" 
              className="hidden lg:inline-block border-2 border-gray-900 text-gray-900 px-6 py-2 rounded-lg transition-all duration-200 font-medium hover:bg-gray-900 hover:text-white"
            >
              Contact Us
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 transition-colors duration-200 text-gray-600 hover:text-gray-900"
              aria-label="Toggle menu"
            >
              <div className={`w-6 h-6 flex flex-col justify-between transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''}`}>
                <span className={`block w-full h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
                <span className={`block w-full h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-full h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />

      {/* Overlay for Mobile Menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </header>
  );
}