'use client';

import Link from 'next/link';

// Types
export interface ContactInfo {
  address: string[];
  phone?: string;
  email?: string;
}

export interface ContactSectionProps {
  title: string;
  description: string;
  contactInfo: ContactInfo;
  className?: string;
}

// Contact Section Component
export const Contact = ({ 
  title, 
  description, 
  contactInfo, 
  className = "" 
}: ContactSectionProps) => {
  return (
    <section className={`bg-charcoal text-white ${className}`}>
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contact Information */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold font-heading">
              {title}
            </h2>
            <p className="text-xl text-soft-sage leading-relaxed font-body">
              {description}
            </p>
            
            <div className="space-y-4">
              <address className="not-italic text-soft-sage font-body">
                {contactInfo.address.map((line, index) => (
                  <div key={index} className="mb-1 last:mb-0">{line}</div>
                ))}
              </address>
              
              {contactInfo.phone && (
                <div className="font-body">
                  <strong className="text-white font-medium">Phone:</strong>{' '}
                  <a 
                    href={`tel:${contactInfo.phone}`} 
                    className="text-soft-sage hover:text-white transition-colors duration-300"
                  >
                    {contactInfo.phone}
                  </a>
                </div>
              )}
              
              {contactInfo.email && (
                <div className="font-body">
                  <strong className="text-white font-medium">Email:</strong>{' '}
                  <a 
                    href={`mailto:${contactInfo.email}`} 
                    className="text-soft-sage hover:text-white transition-colors duration-300"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Contact Form or CTA */}
          <div className="bg-white rounded-lg p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-charcoal mb-4 font-heading">
              Get In Touch
            </h3>
            <p className="text-charcoal/70 mb-6 font-body">
              Ready to start your sustainable apparel journey? Contact us today to discuss your needs.
            </p>
            <Link 
              href="/contact-us"
              className="inline-block bg-heritage-green text-white px-8 py-3 rounded-md hover:bg-forest-emerald transition-all duration-300 font-semibold text-lg w-full text-center font-heading uppercase tracking-wide"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};