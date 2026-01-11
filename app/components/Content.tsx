'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Types for Gallery Items
interface GalleryItem {
  type: 'image' | 'video';
  src: string;
  title: string;
  description: string;
  category?: string;
  poster?: string; // Optional poster image for videos
  alt?: string; // Optional alt text for images
}

export interface ContentProps {
  alignment: 'left' | 'right';
  title: string;
  content: string;
  buttonText: string;
  buttonLink: string;
  background?: string;
  hoverImage?: string;
  className?: string;
  gallery?: GalleryItem[];
  compact?: boolean;
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
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [mediaLoadError, setMediaLoadError] = useState<boolean[]>([]);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean[]>([]);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean[]>([]);

  // Initialize video playing states
  useEffect(() => {
    if (gallery.length > 0) {
      setMediaLoadError(new Array(gallery.length).fill(false));
      setIsVideoPlaying(new Array(gallery.length).fill(false));
      setIsVideoMuted(new Array(gallery.length).fill(true)); // Start videos muted
    }
  }, [gallery]);

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying || gallery.length <= 1) return;

    const interval = setInterval(() => {
      // Stop current video if playing
      if (gallery[currentMediaIndex].type === 'video' && isVideoPlaying[currentMediaIndex]) {
        videoRefs.current[currentMediaIndex]?.pause();
        const newVideoPlaying = [...isVideoPlaying];
        newVideoPlaying[currentMediaIndex] = false;
        setIsVideoPlaying(newVideoPlaying);
      }
      
      setCurrentMediaIndex((prev) => (prev + 1) % gallery.length);
    }, gallery[currentMediaIndex].type === 'video' ? 8000 : 5000);

    return () => clearInterval(interval);
  }, [gallery.length, isAutoPlaying, currentMediaIndex, gallery, isVideoPlaying]);

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

  const nextMedia = () => {
    // Stop current video if playing
    if (gallery[currentMediaIndex].type === 'video' && isVideoPlaying[currentMediaIndex]) {
      videoRefs.current[currentMediaIndex]?.pause();
      const newVideoPlaying = [...isVideoPlaying];
      newVideoPlaying[currentMediaIndex] = false;
      setIsVideoPlaying(newVideoPlaying);
    }
    
    setCurrentMediaIndex((prev) => (prev + 1) % gallery.length);
  };

  const prevMedia = () => {
    // Stop current video if playing
    if (gallery[currentMediaIndex].type === 'video' && isVideoPlaying[currentMediaIndex]) {
      videoRefs.current[currentMediaIndex]?.pause();
      const newVideoPlaying = [...isVideoPlaying];
      newVideoPlaying[currentMediaIndex] = false;
      setIsVideoPlaying(newVideoPlaying);
    }
    
    setCurrentMediaIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  const goToMedia = (index: number) => {
    // Stop current video if playing
    if (gallery[currentMediaIndex].type === 'video' && isVideoPlaying[currentMediaIndex]) {
      videoRefs.current[currentMediaIndex]?.pause();
      const newVideoPlaying = [...isVideoPlaying];
      newVideoPlaying[currentMediaIndex] = false;
      setIsVideoPlaying(newVideoPlaying);
    }
    
    setCurrentMediaIndex(index);
  };

  const handleMediaError = (index: number) => {
    const newErrors = [...mediaLoadError];
    newErrors[index] = true;
    setMediaLoadError(newErrors);
  };

  const toggleVideoPlay = (index: number) => {
    if (!gallery[index] || gallery[index].type !== 'video') return;
    
    const video = videoRefs.current[index];
    if (!video) return;

    const newVideoPlaying = [...isVideoPlaying];
    
    if (video.paused) {
      video.play()
        .then(() => {
          newVideoPlaying[index] = true;
          setIsVideoPlaying(newVideoPlaying);
        })
        .catch((err) => {
          console.error("Error playing video:", err);
          video.muted = true;
          video.play()
            .then(() => {
              newVideoPlaying[index] = true;
              setIsVideoPlaying(newVideoPlaying);
              setIsVideoMuted(prev => {
                const newMuted = [...prev];
                newMuted[index] = true;
                return newMuted;
              });
            });
        });
    } else {
      video.pause();
      newVideoPlaying[index] = false;
      setIsVideoPlaying(newVideoPlaying);
    }
  };

  const toggleVideoMute = (index: number) => {
    if (!gallery[index] || gallery[index].type !== 'video') return;
    
    const video = videoRefs.current[index];
    if (!video) return;

    const newMuted = [...isVideoMuted];
    video.muted = !video.muted;
    newMuted[index] = video.muted;
    setIsVideoMuted(newMuted);
  };

  const handleVideoEnded = (index: number) => {
    const newVideoPlaying = [...isVideoPlaying];
    newVideoPlaying[index] = false;
    setIsVideoPlaying(newVideoPlaying);
  };

  // Function to get the fallback image source
  const getFallbackSrc = () => '/images/placeholders/apparel-placeholder.jpg';

  // Function to get the current media source
  const getMediaSrc = (index: number) => {
    if (mediaLoadError[index] || !gallery[index]?.src) {
      return getFallbackSrc();
    }
    return gallery[index].src;
  };

  // Determine section padding based on compact mode
  const sectionPadding = compact ? 'section--sm' : 'section--lg';

  return (
    <section className={`${sectionPadding} relative overflow-hidden min-h-[50vh] lg:min-h-[60vh] flex items-center ${className}`}>      
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

      <div className="relative z-10 container mx-auto w-full">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
          alignment === 'right' ? 'lg:grid-flow-dense' : ''
        }`}>
          
          {/* Text Content - Left or Right Based on Alignment */}
          <div className={`flex flex-col justify-center h-full ${
            alignment === 'right' 
              ? 'lg:col-start-2 lg:pl-12 xl:pl-16 order-2 lg:order-1' 
              : 'lg:pr-12 xl:pr-16 order-1'
          }`}>
            <div className="space-y-6 lg:space-y-8">
              {/* Title with proper typography */}
              <div className="heading-container">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal leading-tight tracking-tight font-heading">
                  <div 
                    className="animate-fade-in-up"
                    dangerouslySetInnerHTML={{ __html: title.replace(/\n/g, '<br>') }} 
                  />
                </h1>
              </div>

              {/* Content with improved readability */}
              <div className="text-lg md:text-xl text-charcoal/90 leading-relaxed font-body space-y-4">
                {content.split('<p>&nbsp;</p>').map((paragraph, index) => (
                  <div 
                    key={index} 
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${index * 150}ms` }}
                    dangerouslySetInnerHTML={{ __html: paragraph }} 
                  />
                ))}
              </div>

              {/* Button with brand colors */}
              <div className="btn-group flex flex-wrap gap-4 pt-2">
                <div className="animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                  <Link
                    href={buttonLink}
                    className="btn btn--primary btn--md lg:btn--lg shadow-emerald hover-lift font-heading uppercase tracking-wider"
                  >
                    {buttonText}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Media Gallery - Equal Height to Text Content */}
          <div className={`flex flex-col justify-center h-auto ${
            alignment === 'right' 
              ? 'lg:col-start-1 order-1 lg:order-2' 
              : 'order-2'
          }`}>
            {gallery.length > 0 ? (
              <div 
                className="relative rounded-lg overflow-hidden shadow-lg backdrop-blur-glass border border-soft-sage/30 hover-lift transition-all duration-300"
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
              >
                {/* Main Gallery Media */}
                <div className="relative aspect-[4/3] w-full h-full">
                  {gallery.map((item, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                        index === currentMediaIndex
                          ? 'opacity-100 scale-100'
                          : 'opacity-0 scale-105'
                      }`}
                    >
                      {/* Video Media */}
                      {item.type === 'video' ? (
                        <div className="relative w-full h-full group">
                          <video
                            ref={(el) => {
                              videoRefs.current[index] = el;
                            }}
                            src={getMediaSrc(index)}
                            poster={item.poster || getFallbackSrc()}
                            className="w-full h-full object-cover"
                            controls={false}
                            muted={isVideoMuted[index]}
                            loop={false}
                            onEnded={() => handleVideoEnded(index)}
                            onError={() => handleMediaError(index)}
                            playsInline
                            preload="metadata"
                          />
                          
                          {/* Video Controls Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {/* Play/Pause Button */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <button
                                onClick={() => toggleVideoPlay(index)}
                                className={`w-12 h-12 lg:w-16 lg:h-16 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm border border-soft-sage hover:scale-110 shadow-2xl z-10 ${
                                  isVideoPlaying[index] ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                                }`}
                                aria-label={isVideoPlaying[index] ? 'Pause video' : 'Play video'}
                              >
                                <svg className="w-6 h-6 lg:w-8 lg:h-8 text-heritage-green" fill="currentColor" viewBox="0 0 24 24">
                                  {isVideoPlaying[index] ? (
                                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                                  ) : (
                                    <path d="M8 5v14l11-7z" />
                                  )}
                                </svg>
                              </button>
                            </div>

                            {/* Mute/Unmute Button */}
                            <button
                              onClick={() => toggleVideoMute(index)}
                              className="absolute bottom-3 right-3 lg:bottom-4 lg:right-4 w-8 h-8 lg:w-10 lg:h-10 bg-charcoal/80 hover:bg-charcoal rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm border border-soft-sage hover:scale-110 shadow-lg z-10"
                              aria-label={isVideoMuted[index] ? 'Unmute video' : 'Mute video'}
                            >
                              <svg className="w-4 h-4 lg:w-5 lg:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                {isVideoMuted[index] ? (
                                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                                ) : (
                                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                                )}
                              </svg>
                            </button>

                            {/* Video Time Indicator */}
                            <div className="absolute top-3 left-3 lg:top-4 lg:left-4 px-2 lg:px-3 py-1 bg-charcoal/80 backdrop-blur-sm rounded-full flex items-center space-x-1 lg:space-x-2 text-xs font-medium z-10">
                              <svg className="w-3 h-3 lg:w-4 lg:h-4 text-forest-emerald" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                              </svg>
                              <span className="text-white font-medium text-xs lg:text-sm">Video</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* Image Media */
                        <div className="relative w-full h-full">
                          {getMediaSrc(index).startsWith('/') ? (
                            <Image
                              src={getMediaSrc(index)}
                              alt={item.alt || item.title || `Gallery image ${index + 1}`}
                              fill
                              className="object-cover transition-transform duration-700 hover:scale-105"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                              onError={() => handleMediaError(index)}
                              priority={index === 0}
                            />
                          ) : (
                            // Fallback for external images using regular img tag
                            <img
                              src={getMediaSrc(index)}
                              alt={item.alt || item.title || `Gallery image ${index + 1}`}
                              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                              onError={() => handleMediaError(index)}
                            />
                          )}
                          {/* Image Type Indicator */}
                          <div className="absolute top-3 left-3 lg:top-4 lg:left-4 px-2 lg:px-3 py-1 bg-charcoal/80 backdrop-blur-sm rounded-full flex items-center space-x-1 lg:space-x-2 text-xs font-medium z-10">
                            <svg className="w-3 h-3 lg:w-4 lg:h-4 text-forest-emerald" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-white font-medium text-xs lg:text-sm">Image</span>
                          </div>
                        </div>
                      )}
                      
                      {/* Enhanced Media Overlay with Description */}
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent flex items-end transition-all duration-500">
                        <div className="p-4 lg:p-6 text-white w-full">
                          <div className="flex flex-col mb-2">
                            <div className="flex-1">
                              <h3 className="text-lg lg:text-xl font-bold font-heading leading-tight mb-1">
                                {item.title || `Gallery ${index + 1}`}
                              </h3>
                              <p className="text-soft-sage font-body text-xs lg:text-sm leading-relaxed line-clamp-2">
                                {item.description || 'Premium apparel collection'}
                              </p>
                            </div>
                            {item.category && (
                              <span className="badge badge--primary mt-2 flex-shrink-0 text-xs self-start">
                                {item.category}
                              </span>
                            )}
                          </div>
                          
                          {/* Progress indicator for current media */}
                          {index === currentMediaIndex && (
                            <div className="flex items-center space-x-2 mt-3">
                              <div className="flex-1 bg-soft-sage/30 rounded-full h-1.5">
                                <div 
                                  className="bg-gradient-to-r from-forest-emerald to-muted-gold h-1.5 rounded-full transition-all duration-100"
                                  style={{
                                    width: isAutoPlaying ? '100%' : '0%',
                                    animation: isAutoPlaying 
                                      ? `progressBar ${gallery[index].type === 'video' ? '8s' : '5s'} linear forwards` 
                                      : 'none'
                                  }}
                                />
                              </div>
                              <span className="text-soft-sage text-xs font-medium min-w-[40px] text-right">
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
                      onClick={prevMedia}
                      className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 w-8 h-8 lg:w-10 lg:h-10 bg-white/90 hover:bg-white text-charcoal rounded-full flex items-center justify-around transition-all duration-300 backdrop-blur-sm border border-soft-sage hover:scale-110 shadow-lg z-20 hover:shadow-xl group"
                      aria-label="Previous media"
                    >
                      <svg className="w-4 h-4 lg:w-5 lg:h-5 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={nextMedia}
                      className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 w-8 h-8 lg:w-10 lg:h-10 bg-white/90 hover:bg-white text-charcoal rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm border border-soft-sage hover:scale-110 shadow-lg z-20 hover:shadow-xl group"
                      aria-label="Next media"
                    >
                      <svg className="w-4 h-4 lg:w-5 lg:h-5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}

                {/* Enhanced Indicator Dots */}
                {gallery.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 backdrop-blur-glass bg-white/20 rounded-full p-2 z-20 border border-white/10">
                    {gallery.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => goToMedia(index)}
                        className={`group relative transition-all duration-300 ${
                          index === currentMediaIndex
                            ? 'scale-125'
                            : 'hover:scale-110'
                        }`}
                        aria-label={`View ${item.title}`}
                      >
                        <div className={`w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-full transition-all duration-300 ${
                          index === currentMediaIndex
                            ? 'bg-white shadow-lg'
                            : item.type === 'video'
                              ? 'bg-soft-sage hover:bg-soft-sage/80'
                              : 'bg-soft-sage/60 hover:bg-soft-sage/80'
                        }`} />
                        {/* Tooltip on hover */}
                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-charcoal text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none hidden lg:block font-body">
                          {item.title}
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Auto-play Toggle */}
                {gallery.length > 1 && (
                  <button
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className="absolute top-3 right-3 lg:top-4 lg:right-4 z-20 w-7 h-7 lg:w-8 lg:h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm border border-soft-sage hover:scale-110 shadow-lg"
                    aria-label={isAutoPlaying ? 'Pause auto-play' : 'Start auto-play'}
                  >
                    <svg 
                      className={`w-3 h-3 lg:w-4 lg:h-4 text-charcoal transition-transform duration-300 ${
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
              <div className="relative rounded-lg overflow-hidden shadow-lg backdrop-blur-glass border border-soft-sage/30 aspect-square lg:aspect-[4/3] w-full bg-gradient-to-br from-soft-sage/10 to-forest-emerald/5 flex items-center justify-center group">
                <div className="text-center p-6 transform transition-transform duration-300 group-hover:scale-105">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white/80 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <svg className="w-8 h-8 lg:w-10 lg:h-10 text-heritage-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-charcoal font-bold text-base lg:text-lg mb-2 font-heading">Media Gallery</p>
                  <p className="text-charcoal/70 text-xs lg:text-sm font-body">Add images or videos to showcase your content</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CSS Animation for progress bar */}
      <style jsx>{`
        @keyframes progressBar {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
};