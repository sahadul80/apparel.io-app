'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Types for Gallery Items
interface GalleryItem {
  image: string;
  title: string;
  description: string;
  category?: string;
}

interface ContentProps {
  alignment: 'left' | 'right';
  title: string;
  content: string;
  buttonText: string;
  buttonLink: string;
  background?: string;
  hoverImage?: string;
  className?: string;
  gallery?: GalleryItem[];
  compact?: boolean; // New prop for compact mode
}

export const Content = ({
  alignment,
  title,
  content,
  buttonText,
  buttonLink,
  background,
  hoverImage,
  className,
  gallery = [],
  compact = false,
}: ContentProps) => {
  const bgRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [imageLoadError, setImageLoadError] = useState<boolean[]>([]);

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying || gallery.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [gallery.length, isAutoPlaying]);

  // Parallax effect
  useEffect(() => {
    let requestId: number;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${scrollY * 0.2}px)`;
      }
      requestId = requestAnimationFrame(handleScroll);
    };

    requestId = requestAnimationFrame(handleScroll);
    window.addEventListener('scroll', handleScroll);

    return () => {
      cancelAnimationFrame(requestId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleImageError = (index: number) => {
    const newErrors = [...imageLoadError];
    newErrors[index] = true;
    setImageLoadError(newErrors);
  };

  // Function to get the current image source with fallback
  const getImageSrc = (index: number) => {
    if (imageLoadError[index] || !gallery[index]?.image) {
      return '/images/placeholders/apparel-placeholder.jpg';
    }
    return gallery[index].image;
  };

  // Determine section padding based on compact mode
  const sectionPadding = compact ? 'section--sm' : 'section--lg';

  return (
    <section className={`${sectionPadding} relative overflow-hidden ${className}`}>      
      {/* Hover/Scroll Background Image */}
      {hoverImage && (
        <div
          ref={bgRef}
          className="absolute inset-0 pointer-events-none opacity-10 lg:opacity-20"
          style={{
            backgroundImage: `url(${hoverImage})`,
            backgroundSize: 'cover',
            backgroundPosition: alignment === 'right' ? 'right center' : 'left center',
            willChange: 'transform',
          }}
        />
      )}
      
      {/* Brand gradient overlay */}
      <div className="absolute inset-0 gradient-apparelio z-1" />

      <div className="relative z-10 container mx-auto">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center ${
            alignment === 'right' ? 'lg:grid-flow-dense' : ''
          }`}
        >
          {/* Text Content */}
          <div className={`space-y-6 lg:space-y-8 ${alignment === 'right' ? 'lg:col-start-2 lg:pl-8 xl:pl-12' : 'lg:pr-8 xl:pr-12'}`}>
            <div className="heading-container">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                <div 
                  className="animate-fade-in-up"
                  dangerouslySetInnerHTML={{ __html: title.replace(/\n/g, '<br>') }} 
                />
              </h1>
            </div>

            <div className="text-base sm:text-lg md:text-body-large text-foreground leading-relaxed space-y-4 lg:space-y-6">
              {content.split('<p>&nbsp;</p>').map((paragraph, index) => (
                <div 
                  key={index} 
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                  dangerouslySetInnerHTML={{ __html: paragraph }} 
                />
              ))}
            </div>

            <div className="btn-group flex flex-wrap gap-4 lg:gap-6 pt-2 lg:pt-4">
              <div className="animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                <Link
                  href={buttonLink}
                  className="btn btn--primary btn--md lg:btn--lg"
                >
                  {buttonText}
                </Link>
              </div>
            </div>
          </div>

          {/* Image Gallery */}
          <div className={`${alignment === 'right' ? 'lg:col-start-1' : ''}`}>
            {gallery.length > 0 ? (
              <div 
                className="relative rounded-xl lg:rounded-2xl overflow-hidden shadow-lg lg:shadow-2xl backdrop-blur-glass-enhanced border border-soft-sage card-hover-lift"
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
              >
                {/* Main Gallery Image */}
                <div className="relative aspect-[4/3] w-full">
                  {gallery.map((item, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                        index === currentImageIndex
                          ? 'opacity-100 scale-100'
                          : 'opacity-0 scale-105'
                      }`}
                    >
                      {/* Image with error handling */}
                      {getImageSrc(index).startsWith('/') ? (
                        <Image
                          src={getImageSrc(index)}
                          alt={item?.title || `Gallery image ${index + 1}`}
                          fill
                          className="object-cover transition-transform duration-700 hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                          onError={() => handleImageError(index)}
                          priority={index === 0}
                        />
                      ) : (
                        // Fallback for external images using regular img tag
                        <img
                          src={getImageSrc(index)}
                          alt={item?.title || `Gallery image ${index + 1}`}
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                          onError={() => handleImageError(index)}
                        />
                      )}
                      
                      {/* Enhanced Image Overlay with Description */}
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-transparent flex items-end transition-all duration-500">
                        <div className="p-4 lg:p-6 text-white w-full transform transition-transform duration-500 hover:translate-y-1">
                          <div className="flex items-start justify-between mb-2 lg:mb-3">
                            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold flex-1 leading-tight">
                              {item?.title || `Gallery ${index + 1}`}
                            </h3>
                            {item?.category && (
                              <span className="badge badge--premium ml-2 flex-shrink-0 text-xs">
                                {item.category}
                              </span>
                            )}
                          </div>
                          <p className="text-soft-sage font-medium text-sm leading-relaxed line-clamp-2">
                            {item?.description || 'Premium collection'}
                          </p>
                          
                          {/* Progress indicator for current image */}
                          {index === currentImageIndex && (
                            <div className="flex items-center space-x-2 mt-2 lg:mt-3">
                              <div className="flex-1 bg-soft-sage/30 rounded-full h-1">
                                <div 
                                  className="bg-gradient-to-r from-forest-emerald to-muted-gold h-1 rounded-full transition-all duration-100"
                                  style={{
                                    width: isAutoPlaying ? '100%' : '0%',
                                    animation: isAutoPlaying ? 'progressBar 4s linear forwards' : 'none'
                                  }}
                                />
                              </div>
                              <span className="text-soft-sage text-xs">
                                {index + 1}/{gallery.length}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Enhanced Navigation Arrows */}
                {gallery.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 w-8 h-8 lg:w-12 lg:h-12 bg-background/90 hover:bg-background text-foreground rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm border border-soft-sage hover:scale-110 shadow-lg z-20 hover:shadow-xl group btn--ghost"
                      aria-label="Previous image"
                    >
                      <svg className="w-4 h-4 lg:w-6 lg:h-6 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 w-8 h-8 lg:w-12 lg:h-12 bg-background/90 hover:bg-background text-foreground rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm border border-soft-sage hover:scale-110 shadow-lg z-20 hover:shadow-xl group btn--ghost"
                      aria-label="Next image"
                    >
                      <svg className="w-4 h-4 lg:w-6 lg:h-6 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}

                {/* Enhanced Indicator Dots */}
                {gallery.length > 1 && (
                  <div className="absolute bottom-3 lg:bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 lg:space-x-3 backdrop-blur-glass bg-white/20 rounded-full p-2 lg:p-3 z-20 border border-white/10">
                    {gallery.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => goToImage(index)}
                        className={`group relative transition-all duration-300 ${
                          index === currentImageIndex
                            ? 'scale-110 lg:scale-125'
                            : 'hover:scale-105 lg:hover:scale-110'
                        }`}
                        aria-label={`View ${item?.title}`}
                      >
                        <div className={`w-2 h-2 lg:w-3 lg:h-3 rounded-full transition-all duration-300 ${
                          index === currentImageIndex
                            ? 'bg-background shadow-lg'
                            : 'bg-background/60 hover:bg-background/80'
                        }`} />
                        {/* Tooltip on hover - hidden on mobile */}
                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-charcoal text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none hidden lg:block">
                          {item?.title}
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Auto-play Toggle */}
                {gallery.length > 1 && (
                  <button
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className="absolute top-2 lg:top-4 right-2 lg:right-4 z-20 w-6 h-6 lg:w-8 lg:h-8 bg-background/90 hover:bg-background rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm border border-soft-sage hover:scale-110 shadow-lg btn--ghost"
                    aria-label={isAutoPlaying ? 'Pause auto-play' : 'Start auto-play'}
                  >
                    <svg 
                      className={`w-3 h-3 lg:w-4 lg:h-4 text-foreground transition-transform duration-300 ${
                        isAutoPlaying ? 'scale-100' : 'scale-90'
                      }`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      {isAutoPlaying ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      )}
                    </svg>
                  </button>
                )}
              </div>
            ) : (
              // Enhanced Fallback placeholder
              <div className="relative rounded-xl lg:rounded-2xl overflow-hidden shadow-lg lg:shadow-2xl backdrop-blur-glass-enhanced border border-soft-sage aspect-[4/3] w-full bg-gradient-to-br from-soft-sage/20 to-muted-gold/10 flex items-center justify-center group card card--glass">
                <div className="text-center p-4 lg:p-8 transform transition-transform duration-300 group-hover:scale-105">
                  <div className="w-12 h-12 lg:w-20 lg:h-20 bg-background/80 rounded-full flex items-center justify-center mx-auto mb-3 lg:mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <svg className="w-6 h-6 lg:w-10 lg:h-10 text-forest-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-foreground font-semibold text-base lg:text-body-large mb-1 lg:mb-2">Image Gallery</p>
                  <p className="text-soft-sage text-xs lg:text-caption">Add gallery items to showcase your content</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};