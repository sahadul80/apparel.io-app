'use client';

import Image from 'next/image';
import Link from 'next/link';

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
  return (
    <section className="section--4 relative bg-gray-50 py-20">
      {/* Background Image */}
      <div 
        className="full-width handshake absolute inset-0 bg-cover bg-center z-0 opacity-10"
        style={{
          backgroundImage: "url('/themes/custom/zxy/images/handshake-background.jpg')"
        }}
      ></div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Certifications Images */}
          <div className="certification-left">
            <ul className="certifications grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-6">
              {certifications.map((cert, index) => (
                <li key={index} className="flex justify-center">
                  <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 max-w-xs">
                    <Image
                      src={cert.src}
                      alt={cert.alt}
                      width={cert.width}
                      height={cert.height}
                      className="mx-auto max-w-full h-auto"
                      loading="lazy"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Certifications Text */}
          <div className="certification-right space-y-6">
            <div className="heading-container">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Our Certifications
              </h1>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed">
              The certifications we have attained for our supply base, products and practices give you the confidence that your brand is sourcing using the best partners and techniques.
            </p>

            <ul className="btn-group">
              <li>
                <Link 
                  href="/our-promise#zxy-certifications"
                  className="btn btn--large inline-block bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  See All Certifications
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};