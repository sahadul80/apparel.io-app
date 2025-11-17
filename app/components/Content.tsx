'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

interface ContentProps {
  alignment: 'left' | 'right';
  title: string;
  content: string;
  buttonText: string;
  buttonLink: string;
  background?: string;
  hoverImage?: string;
  className?: string;
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
}: ContentProps) => {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let requestId: number;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (bgRef.current) {
        // Smooth parallax effect
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

  return (
    <section className={`relative overflow-hidden ${className}`}>
      {/* Hover/Scroll Background Image */}
      {hoverImage && (
        <div
          ref={bgRef}
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{
            backgroundImage: `url(${hoverImage})`,
            backgroundSize: 'cover',
            backgroundPosition: alignment === 'right' ? 'right center' : 'left center',
            willChange: 'transform', // improves GPU performance
          }}
        />
      )}

      <div className="relative z-10 container mx-auto px-4 py-16">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
            alignment === 'right' ? 'lg:grid-flow-dense' : ''
          }`}
        >
          {/* Text Content */}
          <div className={`space-y-6 ${alignment === 'right' ? 'lg:col-start-2' : ''}`}>
            <div className="heading-container">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                <div dangerouslySetInnerHTML={{ __html: title.replace(/\n/g, '<br>') }} />
              </h1>
            </div>

            <div className="text-lg text-gray-700 leading-relaxed space-y-4">
              {content.split('<p>&nbsp;</p>').map((paragraph, index) => (
                <div key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
              ))}
            </div>

            <ul className="btn-group flex flex-wrap gap-4">
              <li>
                <Link
                  href={buttonLink}
                  className="btn btn--large inline-block px-8 py-4 rounded-lg transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  {buttonText}
                </Link>
              </li>
            </ul>
          </div>

          {/* Empty column for layout balance */}
          <div className={alignment === 'right' ? 'lg:col-start-1' : ''}></div>
        </div>
      </div>
    </section>
  );
};
