'use client';

import Link from 'next/link';

// Types
interface ContactInfo {
  address: string[];
  phone?: string;
  email?: string;
}

interface ContactSectionProps {
  title: string;
  description: string;
  contactInfo: ContactInfo;
  className?: string;
}

// Contact Section Component
export const ContactSection = ({ 
  title, 
  description, 
  contactInfo, 
  className = "" 
}: ContactSectionProps) => {
  return (
    <section className={`bg-blue-600 text-white ${className}`}>
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contact Information */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold">
              {title}
            </h2>
            <p className="text-xl text-blue-100 leading-relaxed">
              {description}
            </p>
            
            <div className="space-y-4">
              <address className="not-italic text-blue-100">
                {contactInfo.address.map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </address>
              
              {contactInfo.phone && (
                <div>
                  <strong className="text-white">Phone:</strong>{' '}
                  <a href={`tel:${contactInfo.phone}`} className="text-blue-100 hover:text-white">
                    {contactInfo.phone}
                  </a>
                </div>
              )}
              
              {contactInfo.email && (
                <div>
                  <strong className="text-white">Email:</strong>{' '}
                  <a href={`mailto:${contactInfo.email}`} className="text-blue-100 hover:text-white">
                    {contactInfo.email}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Contact Form or CTA */}
          <div className="bg-white rounded-xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Get In Touch</h3>
            <p className="text-gray-600 mb-6">
              Ready to start your sustainable apparel journey? Contact us today to discuss your needs.
            </p>
            <Link 
              href="/contact-us"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 font-semibold text-lg w-full text-center"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};