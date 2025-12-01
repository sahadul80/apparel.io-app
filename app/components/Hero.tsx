'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ApparelCarousel from './carousel';

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

// Stat Card Component
const StatCard = ({ number, label }: StatCard) => (
  <div className="card card--glass card--elevated text-center transition-all duration-300 hover-lift backdrop-blur-glass">
    <h2 className="text-display font-bold text-gradient-premium">{number}</h2>
    <p className="font-semibold text-foreground">{label}</p>
  </div>
);

// Floating Background Elements
const FloatingBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
    {/* Animated gradient orbs */}
    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-forest-emerald/20 to-heritage-green/20 rounded-full filter blur-3xl animate-float-enhanced opacity-60"></div>
    <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-muted-gold/15 to-soft-sage/15 rounded-full filter blur-3xl animate-float opacity-50 animation-delay-1000"></div>
    <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-forest-emerald/10 to-muted-gold/10 rounded-full filter blur-3xl animate-particle-float opacity-40"></div>
    
    {/* Grid pattern */}
    <div className="absolute inset-0 opacity-5 bg-[linear-gradient(rgba(10,92,66,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(10,92,66,0.3)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
  </div>
);

// Hero Section Component
export const Hero = ({ title, content, buttonText, buttonLink, stats }: HeroProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="section-sm relative min-h-screen overflow-hidden flex items-center justify-center bg-gradient-apparelio">
      {/* Background Elements */}
      <FloatingBackground />
      
      {/* Main Content */}
      <div className="container mx-auto relative z-20">
        <div className={`grid grid-cols-1 lg:grid-cols-2 items-center transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Text Content */}
          <div className="flex flex-col items-center sm:gap-4 text-center">
            <div className="heading-container">
              <h1 className="text-heading font-bold text-foreground leading-tight tracking-tight">
                <div 
                  className="animate-fade-in-up" 
                  style={{ animationDelay: '200ms' }}
                  dangerouslySetInnerHTML={{ 
                    __html: title.replace(/\n/g, '<br>') 
                  }} 
                />
              </h1>
            </div>

            <div className="leading-tight">
              {content.split('<p>&nbsp;</p>').map((paragraph, index) => (
                paragraph.trim() && (
                  <div 
                    key={index} 
                    className={`text-foreground animate-fade-in-up ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                    style={{ animationDelay: `${400 + index * 150}ms` }}
                    dangerouslySetInnerHTML={{ __html: paragraph }} 
                  />
                )
              ))}
            </div>

            <div className="btn-group flex items-center justify-center gap-4">
              <div 
                className={`animate-fade-in-up ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ animationDelay: '600ms' }}
              >
                <Link 
                  href={buttonLink} 
                  className="btn btn--primary btn--lg shadow-emerald hover-lift"
                >
                  {buttonText}
                </Link>
              </div>
              
              {/* Optional secondary button */}
              <div 
                className={`animate-fade-in-up ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ animationDelay: '700ms' }}
              >
                <Link 
                  href="/about" 
                  className="btn btn--ghost btn--lg border-forest-emerald text-forest-emerald hover:bg-forest-emerald transition-all duration-300"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
          {/* Stats Cards - Desktop */}
          <div className="grid grid-cols-2 gap-2">
            {stats.map((card, index) => (
              <div 
                key={index} 
                className={`animate-fade-in-up ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ animationDelay: `${800 + index * 150}ms` }}
              >
                <StatCard number={card.number} label={card.label} />
              </div>
            ))}
          </div>
        </div>
        <ApparelCarousel />
      </div>
    </section>
  );
};
export default Hero;