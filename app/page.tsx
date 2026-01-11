"use client"
import { useEffect, useState } from 'react';
import ApparelCarousel from './components/carousel';
import { Hero } from './components/Hero';
import { Certifications } from './components/Cretificate';

// Types
interface StatCard {
  number: string;
  label: string;
}

const stats: StatCard[] = [
  { number: "144", label: "Partner Factories" },
  { number: "4", label: "Regional Offices" },
  { number: "850", label: "Global Team Members" },
  { number: "16", label: "Global Recognitions" }
];

// Sample certifications data
const certifications = [
  { 
    src: "/certifications/bci-logo.png", 
    alt: "Better Cotton Initiative Certification",
    width: 160,
    height: 160
  },
  { 
    src: "/certifications/gots-logo.png", 
    alt: "Global Organic Textile Standard",
    width: 160,
    height: 160
  },
  { 
    src: "/certifications/oe-logo.png", 
    alt: "Organic Exchange Standard",
    width: 160,
    height: 160
  },
  { 
    src: "/certifications/sedex-logo.png", 
    alt: "SEDEX Ethical Trade",
    width: 160,
    height: 160
  },
  { 
    src: "/certifications/iso-logo.png", 
    alt: "ISO 9001 Quality Management",
    width: 160,
    height: 160
  },
  { 
    src: "/certifications/bcorp-logo.png", 
    alt: "B Corp Certified",
    width: 160,
    height: 160
  },
];

// Stat Card Component
const StatCard = ({ number, label }: StatCard) => (
  <div className="card card--glass card--elevated text-center transition-all duration-300 hover-lift backdrop-blur-glass">
    <h2 className="text-display font-bold text-gradient-premium">{number}</h2>
    <p className="font-semibold text-foreground">{label}</p>
  </div>
);

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen">
      <Hero 
        title={'Your Global, Local Partner for Sustainable Apparel'} 
        content={'We offer sustainable apparel product development and specialised global sourcing strategies, combined with compliance excellence and intuitive customer service. </br> </br> We strive to always bring newness and innovation to our work, offering an extensive multi-category product range, manufactured in over 100 fully compliant partner factories.'} 
        buttonText={'Product Divisions'} 
        buttonLink={'/product-divisions'}
        stats={stats}
      />
      
      {/* Certifications Section */}
      <Certifications certifications={certifications} />
      
      {/* Apparel Carousel */}
      <ApparelCarousel />
    </main>
  )
}