import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Products & Services | APPAREL.IO',
  description: 'Discover our comprehensive range of apparel products and manufacturing services',
};

export default function ProductsAndServicesPage() {
  const serviceCategories = [
    {
      title: 'Design & Development',
      description: 'From concept to creation, our design team brings your vision to life',
      color: 'from-forest-emerald to-heritage-green',
      icon: '🎨'
    },
    {
      title: 'Manufacturing',
      description: 'State-of-the-art manufacturing facilities with quality control',
      color: 'from-muted-gold to-gold-600',
      icon: '🏭'
    },
    {
      title: 'Supply Chain',
      description: 'End-to-end supply chain management and logistics',
      color: 'from-soft-sage to-forest-emerald',
      icon: '📦'
    },
    {
      title: 'Quality Assurance',
      description: 'Rigorous quality control at every stage of production',
      color: 'from-heritage-green to-forest-emerald-dark',
      icon: '✅'
    }
  ];

  return (
    <main className="min-h-screen text-foreground">
      {/* Hero Section */}
      <section className="section section--xl bg-gradient-to-br from-cream-100 to-cream-200">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-display font-heading font-bold text-charcoal mb-6">
              Products & Services
            </h1>
            <p className="text-body-large text-muted-foreground mb-8">
              Comprehensive apparel solutions from design to delivery. We partner with you 
              to create exceptional products that stand out in the global market.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/products" className="btn btn--primary">
                Explore Products
              </Link>
              <Link href="/contact-us" className="btn btn--outline">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section">
        <div className="container">
          <h2 className="text-heading text-center text-charcoal mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceCategories.map((service, index) => (
              <div key={index} className="card card--elevated text-center group hover-lift">
                <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center text-2xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>
                <h3 className="text-subheading text-charcoal mb-3">{service.title}</h3>
                <p className="text-body text-muted-foreground">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-charcoal-50">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-heading text-charcoal mb-4">Ready to Start Your Project?</h2>
            <p className="text-body-large text-muted-foreground mb-6">
              Let's discuss how we can bring your apparel vision to life with our comprehensive services.
            </p>
            <Link href="/contact-us" className="btn btn--primary btn--lg">
              Contact Our Team
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}