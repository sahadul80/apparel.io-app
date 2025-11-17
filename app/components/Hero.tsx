'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Types
interface StatCard {
  number: string;
  label: string;
}

interface HeroProps {
  title: string;
  content: string;
  buttonText: string;
  buttonLink: string;
  stats: StatCard[];
}

const COLORS = {
  primary: {
    50: 'bg-primary-50',
    100: 'bg-primary-100',
    500: 'bg-primary-500',
    600: 'bg-primary-600',
    700: 'bg-primary-700',
  },
  secondary: {
    50: 'bg-secondary-50',
    500: 'bg-secondary-500',
    600: 'bg-secondary-600',
  },
  neutral: {
    50: 'bg-neutral-50',
    100: 'bg-neutral-100',
    500: 'bg-neutral-500',
    600: 'bg-neutral-600',
    700: 'bg-neutral-700',
    900: 'bg-neutral-900',
  },
  white: 'bg-white',
  transparent: 'bg-transparent',
} as const;

const TEXT_COLORS = {
  primary: { 600: 'text-primary-600' },
  neutral: { 600: 'text-neutral-600', 900: 'text-neutral-900' },
} as const;

// Stat Card Component
const StatCard = ({ number, label }: StatCard) => (
  <div className="rounded-xl shadow-lg p-8 text-center transition-all duration-300 hover:shadow-2xl hover:scale-105 border border-neutral-100 backdrop-blur-sm">
    <h2 className={`text-5xl font-bold ${TEXT_COLORS.primary[600]}`}>{number}</h2>
    <p className={`text-lg font-medium ${TEXT_COLORS.neutral[600]}`}>{label}</p>
  </div>
);

// Hero Background Elements with smooth scroll
const HeroBackgroundElements = () => {
  const sunRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);

  useEffect(() => {
    const animate = () => {
      const scrollY = window.scrollY;

      if (sunRef.current) {
        sunRef.current.style.transform = `translateY(${Math.min(scrollY * 0.3, 150)}px) rotate(${scrollY * 0.05}deg)`;
      }
      if (globeRef.current) {
        globeRef.current.style.transform = `translateY(${Math.min(scrollY * 0.2, 100)}px) rotate(${scrollY * 0.02}deg)`;
      }
      if (planeRef.current) {
        planeRef.current.style.transform = `translateX(${Math.min(scrollY * -0.5, -100)}px) translateY(${Math.min(scrollY * 0.1, 50)}px)`;
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <>
      {/* Main Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${COLORS.primary[50]} ${COLORS.secondary[50]} z-0`} />

      {/* Animated Gradient Overlays */}
      <div className="absolute top-0 left-0 w-full h-96 bg-white opacity-40 z-5" />
      <div className="absolute top-0 left-0 w-full h-80 bg-primary-500 opacity-10 z-5" />

      {/* Floating Particles/Orbs */}
      <div className="absolute inset-0 z-1 overflow-hidden">
        <div className="absolute top-1/4 left-1/6 w-6 h-6 rounded-full bg-primary-100 opacity-60 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/5 w-8 h-8 rounded-full bg-secondary-50 opacity-40 animate-pulse delay-300"></div>
        <div className="absolute bottom-1/4 left-1/3 w-4 h-4 rounded-full bg-primary-100 opacity-70 animate-pulse delay-700"></div>
      </div>

      {/* Sun */}
      <div ref={sunRef} className="absolute top-10 right-1/4 z-2 transform-gpu transition-transform duration-200 ease-out">
        <Image src="/sun.png" alt="Sun" width={400} height={400} className="hidden md:block drop-shadow-2xl animate-soft-pulse" priority />
        <Image src="/sun.png" alt="Sun" width={300} height={300} className="md:hidden drop-shadow-2xl animate-soft-pulse" priority />
      </div>

      {/* Plane */}
      <div ref={planeRef} className="absolute top-32 right-20 z-20 transform-gpu transition-transform duration-200 ease-out animate-float">
        <Image src="/plane.webp" alt="Plane" width={200} height={133} className="hidden md:block drop-shadow-xl" priority />
        <Image src="/plane.webp" alt="Plane" width={120} height={80} className="md:hidden drop-shadow-xl" priority />
      </div>

      {/* Globe */}
      <div ref={globeRef} className="absolute -bottom-20 right-10 z-1 transform-gpu transition-transform duration-200 ease-out">
        <Image src="/globe-2.webp" alt="Globe" width={600} height={600} className="hidden lg:block drop-shadow-2xl" priority />
        <Image src="/globe-2.webp" alt="Globe" width={450} height={450} className="hidden md:block lg:hidden drop-shadow-2xl" priority />
        <Image src="/globe-2.webp" alt="Globe" width={300} height={300} className="md:hidden drop-shadow-2xl" priority />
      </div>

      {/* Additional Background Elements */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-white to-transparent z-10" />
      <div className="absolute top-1/2 left-10 w-32 h-32 bg-primary-100 rounded-full blur-3xl opacity-30 animate-pulse delay-1000" />
      <div className="absolute bottom-20 right-1/3 w-24 h-24 bg-secondary-50 rounded-full blur-2xl opacity-40 animate-pulse delay-500" />
    </>
  );
};

// Hero Section Component
export const Hero = ({ title, content, buttonText, buttonLink, stats }: HeroProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="hero-section relative min-h-screen overflow-hidden">
      <HeroBackgroundElements />

      <div className="container mx-auto px-4 py-20 relative z-20">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Text Content */}
          <div className="space-y-8">
            <div className="heading-container">
              <h1 className={`text-5xl md:text-6xl lg:text-7xl font-bold ${TEXT_COLORS.neutral[900]} leading-tight tracking-tight`}>
                <div className="animate-fade-in-up" dangerouslySetInnerHTML={{ __html: title.replace(/\n/g, '<br>') }} />
              </h1>
            </div>

            <div className={`text-xl leading-relaxed space-y-6 max-w-2xl`}>
              {content.split('<p>&nbsp;</p>').map((paragraph, index) => (
                <div key={index} className={`transition-all duration-700 delay-${index * 200} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} dangerouslySetInnerHTML={{ __html: paragraph }} />
              ))}
            </div>

            <ul className="btn-group flex flex-wrap gap-6 pt-4">
              <li className={`transition-all duration-700 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <Link href={buttonLink} className={`btn btn--large inline-block ${COLORS.primary[500]} px-10 py-5 rounded-2xl bg-transparent backdrop-blur-sm hover:${COLORS.primary[600]} transition-all duration-300 font-semibold text-xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 hover:scale-102.5 border-2 border-transparent hover:border-primary-100`}>
                  {buttonText}
                </Link>
              </li>
            </ul>
          </div>

          {/* Stats Cards */}
          <div className={`side-cards grid grid-cols-2 gap-6 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {stats.map((card, index) => (
              <div key={index} className={`transition-all duration-700 delay-${700 + index * 200} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <StatCard number={card.number} label={card.label} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
