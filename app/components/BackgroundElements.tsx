"use client"
import Image from 'next/image';
import { useRef, useEffect } from "react";

export const BackgroundElements = () => {
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
        planeRef.current.style.transform = `translateX(${Math.min(scrollY * -0.9, -100)}px) translateY(${Math.min(scrollY * 0.1, 50)}px)`;
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-screen h-full overflow-hidden -z-10">
      {/* Main Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream-50 via-cream-100 to-cream-200" />

      {/* Floating Particles/Orbs */}
      <div className="absolute inset-0 z-1 overflow-hidden">
        <div className="absolute top-1/4 left-1/6 w-6 h-6 rounded-full bg-soft-sage opacity-60 animate-soft-pulse"></div>
        <div className="absolute top-1/3 right-1/5 w-8 h-8 rounded-full bg-muted-gold opacity-40 animate-soft-pulse animation-delay-300"></div>
        <div className="absolute bottom-1/4 left-1/3 w-4 h-4 rounded-full bg-soft-sage opacity-70 animate-soft-pulse animation-delay-700"></div>
        <div className="absolute top-2/3 left-1/5 w-5 h-5 rounded-full bg-muted-gold opacity-50 animate-soft-pulse animation-delay-1000"></div>
      </div>

      {/* Sun - Keeping original positioning and size */}
      <div ref={sunRef} className="absolute -left-200 -top-150 z-2 transform-gpu transition-transform duration-200 ease-out">
        <Image 
          src="/sun.png" 
          alt="Sun" 
          width={1600} 
          height={1600} 
          className="hidden lg:block drop-shadow-2xl animate-soft-pulse opacity-90" 
          priority 
        />
        <Image 
          src="/sun.png" 
          alt="Sun" 
          width={400} 
          height={400} 
          className="lg:hidden drop-shadow-2xl animate-soft-pulse opacity-90" 
          priority 
        />
      </div>

      {/* Plane - Keeping original positioning and size */}
      <div ref={planeRef} className="absolute top-40 right-20 z-20 transform-gpu transition-transform duration-200 ease-out animate-float">
        <Image 
          src="/plane.webp" 
          alt="Plane" 
          width={250} 
          height={150} 
          className="hidden md:block drop-shadow-xl" 
          priority 
        />
        <Image 
          src="/plane.webp" 
          alt="Plane" 
          width={150} 
          height={100} 
          className="md:hidden drop-shadow-xl" 
          priority 
        />
      </div>

      {/* Globe - Keeping original positioning and size */}
      <div ref={globeRef} className="absolute -bottom-120 -right-120 z-1 transform-gpu transition-transform duration-200 ease-out">
        <Image 
          src="/globe-2.webp" 
          alt="Globe" 
          width={1200} 
          height={1200} 
          className="hidden xl:block drop-shadow-2xl opacity-90" 
          priority 
        />
        <Image 
          src="/globe-2.webp" 
          alt="Globe" 
          width={600} 
          height={600} 
          className="hidden lg:block xl:hidden drop-shadow-2xl opacity-90" 
          priority 
        />
        <Image 
          src="/globe-2.webp" 
          alt="Globe" 
          width={400} 
          height={400} 
          className="lg:hidden drop-shadow-2xl opacity-90" 
          priority 
        />
      </div>

      {/* Additional Background Elements - Keeping original positioning */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-cream-50 to-transparent z-10" />
      <div className="absolute top-1/2 left-20 w-48 h-48 bg-soft-sage rounded-full blur-3xl opacity-20 animate-soft-pulse animation-delay-1000" />
      <div className="absolute bottom-32 right-1/3 w-32 h-32 bg-muted-gold rounded-full blur-2xl opacity-30 animate-soft-pulse animation-delay-500" />
      
      {/* Solar System Ring Effect - Keeping original positioning */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border-2 border-soft-sage/30 rounded-full z-0 opacity-40"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-soft-sage/20 rounded-full z-0 opacity-30"></div>

      {/* Brand Gradient Overlay */}
      <div className="absolute inset-0 gradient-apparelio z-1" />
    </div>
  );
};