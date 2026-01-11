'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';

// Types
interface Certification {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface CertificationsSectionProps {
  certifications: Certification[];
}

// Certifications Section Component
export const Certifications = ({ certifications }: CertificationsSectionProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Calculate visible certificates
  const getVisibleCertificates = useCallback(() => {
    const visibleCount = isMobile ? 2 : 3;
    const indices = [];
    
    for (let i = 0; i < visibleCount; i++) {
      const index = (activeIndex + i) % certifications.length;
      indices.push(index);
    }
    
    return indices.map(idx => ({
      ...certifications[idx],
      originalIndex: idx
    }));
  }, [activeIndex, certifications, isMobile]);

  // Auto-rotate certificates
  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % certifications.length);
    }, 3000); // Rotate every 3 seconds
    
    return () => clearInterval(interval);
  }, [isHovered, certifications.length]);

  // Manual navigation
  const nextCert = () => {
    setActiveIndex(prev => (prev + 1) % certifications.length);
  };

  const prevCert = () => {
    setActiveIndex(prev => (prev - 1 + certifications.length) % certifications.length);
  };

  // Jump to specific certificate
  const goToCert = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section className="section section--lg relative bg-gradient-to-br from-cream-50 to-cream-100 py-16 md:py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/patterns/certification-grid.svg')] bg-repeat bg-center"></div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-forest-emerald/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-muted-gold/10 rounded-full blur-3xl"></div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Certifications Carousel */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              {/* Carousel Container */}
              <div 
                className="relative"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {/* Navigation Arrows */}
                <button
                  onClick={prevCert}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-soft-sage flex items-center justify-center hover:bg-forest-emerald hover:text-white transition-all duration-300 hover:scale-110 group"
                  aria-label="Previous certification"
                >
                  <svg className="w-5 h-5 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button
                  onClick={nextCert}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-soft-sage flex items-center justify-center hover:bg-forest-emerald hover:text-white transition-all duration-300 hover:scale-110 group"
                  aria-label="Next certification"
                >
                  <svg className="w-5 h-5 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Carousel Cards */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 relative">
                  {getVisibleCertificates().map((cert, displayIndex) => {
                    const isActive = cert.originalIndex === activeIndex;
                    
                    return (
                      <div 
                        key={`${cert.originalIndex}-${displayIndex}`}
                        className={`relative transition-all duration-500 ${
                          isActive 
                            ? 'scale-100 opacity-100 z-10' 
                            : 'scale-95 opacity-80 z-0'
                        } ${
                          displayIndex === 0 && !isActive ? '-rotate-3' : 
                          displayIndex === 2 && !isActive ? 'rotate-3' : ''
                        }`}
                      >
                        <div className="group relative">
                          {/* Active Indicator */}
                          {isActive && (
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-forest-emerald rounded-full flex items-center justify-center z-30 animate-pulse">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                          )}
                          
                          {/* Glow Effect */}
                          <div className={`absolute -inset-1 bg-gradient-to-r from-forest-emerald to-muted-gold rounded-2xl blur transition-all duration-500 ${
                            isActive ? 'opacity-30' : 'opacity-20'
                          } group-hover:opacity-40`}></div>
                          
                          {/* Card */}
                          <div className="card card--glass relative bg-background/80 backdrop-blur-sm p-4 md:p-6 rounded-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl group-hover:border-forest-emerald/30">
                            <div className="relative aspect-square bg-white/50 rounded-lg p-4 flex items-center justify-center">
                              <Image
                                src={cert.src}
                                alt={cert.alt}
                                width={cert.width}
                                height={cert.height}
                                className={`object-contain w-full h-full transition-transform duration-700 ${
                                  isActive ? 'scale-110' : 'scale-100'
                                }`}
                                loading="lazy"
                              />
                            </div>
                            <div className="mt-3 text-center">
                              <p className="text-xs md:text-sm text-charcoal-600 font-medium line-clamp-2">
                                {cert.alt}
                              </p>
                              <div className="mt-2 text-xs text-charcoal-400">
                                #{String(cert.originalIndex + 1).padStart(2, '0')}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Progress Indicator */}
                <div className="mt-6 flex flex-col items-center">
                  <div className="w-full max-w-md h-1 bg-charcoal-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-forest-emerald to-muted-gold transition-all duration-1000 ease-out"
                      style={{
                        width: `${((activeIndex + 1) / certifications.length) * 100}%`
                      }}
                    />
                  </div>
                  <div className="mt-2 text-sm text-charcoal-500">
                    {activeIndex + 1} of {certifications.length}
                  </div>
                </div>

                {/* Pagination Dots */}
                <div className="mt-4 flex justify-center gap-2">
                  {certifications.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToCert(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 hover:scale-125 ${
                        index === activeIndex
                          ? 'bg-forest-emerald w-6'
                          : 'bg-charcoal-300 hover:bg-charcoal-400'
                      }`}
                      aria-label={`Go to certification ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Auto-play Status */}
              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-charcoal-500">
                <div className={`w-2 h-2 rounded-full ${
                  isHovered ? 'bg-amber-500 animate-pulse' : 'bg-forest-emerald'
                }`}></div>
                <span>
                  {isHovered ? 'Paused' : 'Auto-rotating'} • Click to navigate
                </span>
              </div>
            </div>
          </div>

          {/* Certifications Text */}
          <div className="order-1 lg:order-2 space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-forest-emerald/10 rounded-full">
                <span className="w-2 h-2 bg-forest-emerald rounded-full animate-pulse"></span>
                <span className="text-xs font-medium text-forest-emerald uppercase tracking-wider">
                  Accreditations & Standards
                </span>
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-charcoal">
                Our <span className="text-gradient-premium">Certifications</span>
              </h2>
              
              <div className="w-20 h-1 bg-gradient-to-r from-forest-emerald to-muted-gold rounded-full"></div>
            </div>

            <p className="text-lg text-charcoal-700 leading-relaxed">
              The certifications we have attained for our supply base, products and practices 
              give you the confidence that your brand is sourcing using the best partners 
              and techniques.
            </p>

            <div className="space-y-4 text-lg">
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-forest-emerald/20 flex items-center justify-center">
                    <svg className="w-3 h-3 text-forest-emerald" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-charcoal-700">Ethical manufacturing standards</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-forest-emerald/20 flex items-center justify-center">
                    <svg className="w-3 h-3 text-forest-emerald" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-charcoal-700">Sustainable material certifications</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-forest-emerald/20 flex items-center justify-center">
                    <svg className="w-3 h-3 text-forest-emerald" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-charcoal-700">Quality assurance accreditations</span>
                </li>
              </ul>
            </div>

            <div className="pt-10">
              <Link 
                href="/our-promise#certifications"
                className="btn btn--primary btn--lg group inline-flex items-center gap-3"
              >
                <span>Explore All Certifications</span>
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};