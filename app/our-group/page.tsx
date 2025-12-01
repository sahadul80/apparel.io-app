import { Metadata } from 'next';
import { Content } from '../components/Content'; // Assuming your Content component is in components/Content
import { Contact, ContactInfo } from '../components/Contact'; // Assuming your Contact component is in components/Contact

export const metadata: Metadata = {
  title: 'Our Group | APPAREL.IO',
  description: 'Learn about our heritage, values, and the story behind APPAREL.IO',
};

export default function OurGroupPage() {
  // Define gallery items with mixed media (images and videos)
  const heritageGallery = [
    {
      type: 'image' as const,
      src: '/images/our-group/heritage-factory.jpg',
      title: 'Our Foundry',
      description: 'Where traditional craftsmanship meets modern technology',
      category: 'Heritage',
      alt: 'Vintage factory with modern equipment'
    },
    {
      type: 'video' as const,
      src: '/videos/our-group/craftsmanship.mp4',
      poster: '/images/our-group/craftsmanship-poster.jpg',
      title: 'Artisanal Craftsmanship',
      description: 'Preserving traditional techniques while embracing innovation',
      category: 'Process'
    },
    {
      type: 'image' as const,
      src: '/images/our-group/sustainable-practices.jpg',
      title: 'Sustainable Practices',
      description: 'Eco-friendly manufacturing from start to finish',
      category: 'Sustainability',
      alt: 'Worker handling sustainable materials'
    }
  ];

  const valuesGallery = [
    {
      type: 'image' as const,
      src: '/images/our-group/quality-control.jpg',
      title: 'Quality Excellence',
      description: 'Rigorous testing and attention to every detail',
      category: 'Quality',
      alt: 'Quality control inspection'
    },
    {
      type: 'video' as const,
      src: '/videos/our-group/innovation.mp4',
      poster: '/images/our-group/innovation-poster.jpg',
      title: 'Innovation Hub',
      description: 'Research and development driving industry advancements',
      category: 'Innovation'
    },
    {
      type: 'image' as const,
      src: '/images/our-group/ethical-manufacturing.jpg',
      title: 'Ethical Standards',
      description: 'Fair wages and safe working conditions for all employees',
      category: 'Ethics',
      alt: 'Happy workers in factory'
    }
  ];

  const impactGallery = [
    {
      type: 'image' as const,
      src: '/images/our-group/global-reach.jpg',
      title: 'Global Presence',
      description: 'Serving clients across 15+ countries worldwide',
      category: 'Global',
      alt: 'World map with our locations'
    },
    {
      type: 'video' as const,
      src: '/videos/our-group/community-impact.mp4',
      poster: '/images/our-group/community-poster.jpg',
      title: 'Community Impact',
      description: 'Supporting local communities and sustainable development',
      category: 'Community'
    },
    {
      type: 'image' as const,
      src: '/images/our-group/future-vision.jpg',
      title: 'Future Vision',
      description: 'Pioneering the next generation of sustainable apparel',
      category: 'Vision',
      alt: 'Futuristic textile technology'
    }
  ];

  const contactData: ContactInfo = {
    address: [
      'APPAREL.IO Group Headquarters',
      '123 Fashion Avenue, Suite 101',
      'New York, NY 10001',
      'United States'
    ],
    phone: '+1 (555) 123-4567',
    email: 'group@apparel.io'
  };

  return (
    <main className="min-h-screen text-foreground">
      {/* Hero Section */}
      <section className="section section--xl bg-gradient-to-br from-cream-50 to-cream-100">
        <div className="container">
          <div className="text-center">
            <h1 className="text-display font-heading font-bold text-charcoal mb-4">Our Group</h1>
            <p className="text-body-large text-muted-foreground max-w-2xl mx-auto">
              Building on a legacy of excellence in the global apparel industry
            </p>
          </div>
        </div>
      </section>

      {/* Heritage & Legacy Section using Content Component */}
      <Content
        alignment="left"
        title="Our Heritage &<br />Legacy"
        content="<p>With over five decades of experience in the apparel manufacturing industry, our group has established itself as a trusted partner for brands worldwide. We combine traditional craftsmanship with innovative technology to deliver exceptional quality.</p><p>&nbsp;</p><p>Our journey began with a simple vision: to create apparel that inspires confidence and comfort while maintaining the highest standards of sustainability and ethical manufacturing.</p>"
        buttonText="Explore Our History"
        buttonLink="/our-history"
        hoverImage="/images/backgrounds/heritage-bg.jpg"
        gallery={heritageGallery}
      />

      {/* Values & Philosophy Section */}
      <Content
        alignment="right"
        title="Our Core<br />Values"
        content="<p>At the heart of everything we do are our core values. These principles guide our decisions, shape our culture, and define our commitment to excellence.</p><p>&nbsp;</p><p>From sustainable practices to ethical manufacturing, we believe in creating value for all stakeholders while minimizing our environmental impact.</p>"
        buttonText="Learn About Our Values"
        buttonLink="/our-values"
        hoverImage="/images/backgrounds/values-bg.jpg"
        gallery={valuesGallery}
      />

      {/* Stats Section */}
      <section className="section bg-charcoal-50">
        <div className="container">
          <h2 className="text-heading text-center mb-8 text-forest-emerald">Our Impact in Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="card card--glass text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="text-display text-forest-emerald font-bold">50+</div>
              <div className="text-caption text-charcoal-600 mt-2">Years Experience</div>
              <p className="text-xs text-charcoal-500 mt-2">Established 1973</p>
            </div>
            <div className="card card--glass text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="text-display text-forest-emerald font-bold">100+</div>
              <div className="text-caption text-charcoal-600 mt-2">Global Partners</div>
              <p className="text-xs text-charcoal-500 mt-2">Luxury brands to startups</p>
            </div>
            <div className="card card--glass text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="text-display text-forest-emerald font-bold">10M+</div>
              <div className="text-caption text-charcoal-600 mt-2">Products Annually</div>
              <p className="text-xs text-charcoal-500 mt-2">Sustainable production</p>
            </div>
            <div className="card card--glass text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="text-display text-forest-emerald font-bold">15+</div>
              <div className="text-caption text-charcoal-600 mt-2">Countries Served</div>
              <p className="text-xs text-charcoal-500 mt-2">Global distribution network</p>
            </div>
          </div>
        </div>
      </section>

      {/* Global Impact Section */}
      <Content
        alignment="left"
        title="Global Reach,<br />Local Impact"
        content="<p>While our operations span across continents, we remain committed to making a positive impact in every community we touch.</p><p>&nbsp;</p><p>Through sustainable initiatives, ethical employment practices, and community development programs, we're building a better future for the apparel industry.</p>"
        buttonText="Our Sustainability Report"
        buttonLink="/sustainability"
        hoverImage="/images/backgrounds/global-bg.jpg"
        gallery={impactGallery}
        compact={true}
      />

      {/* Vision Section */}
      <section className="section bg-gradient-to-br from-forest-emerald/10 to-muted-gold/10">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-1 bg-gradient-to-r from-forest-emerald to-muted-gold mx-auto mb-6 rounded-full"></div>
            <h2 className="text-heading text-charcoal mb-6">Our Vision for the Future</h2>
            <div className="text-body-large text-charcoal-700 leading-relaxed space-y-6">
              <p>
                We envision a world where sustainable fashion is the norm, not the exception. 
                Where every garment tells a story of innovation, quality, and environmental stewardship.
              </p>
              <p>
                Our commitment extends beyond creating exceptional apparel – we're dedicated to 
                transforming the industry through cutting-edge research, circular economy models, 
                and partnerships that drive meaningful change.
              </p>
            </div>
            <div className="mt-8">
              <a 
                href="/our-vision" 
                className="btn btn--primary btn--lg inline-flex items-center gap-2"
              >
                Read Our 2030 Vision
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team (Optional - Add if you have leadership info) */}
      <section className="section">
        <div className="container">
          <h2 className="text-heading text-center mb-8 text-forest-emerald">Our Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Alex Johnson', role: 'CEO & Founder', image: '/images/leadership/ceo.jpg' },
              { name: 'Maria Garcia', role: 'Head of Sustainability', image: '/images/leadership/sustainability.jpg' },
              { name: 'David Chen', role: 'Chief Innovation Officer', image: '/images/leadership/innovation.jpg' }
            ].map((leader, index) => (
              <div key={index} className="card card--glass text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden bg-gradient-to-br from-soft-sage to-muted-gold/30">
                  <div className="w-full h-full flex items-center justify-center text-forest-emerald">
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-subheading font-semibold text-charcoal mb-1">{leader.name}</h3>
                <p className="text-caption text-forest-emerald mb-4">{leader.role}</p>
                <p className="text-sm text-charcoal-600">
                  {index === 0 && 'Over 30 years in apparel manufacturing'}
                  {index === 1 && 'Leading sustainable practices since 2005'}
                  {index === 2 && 'Driving technological innovation'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <Contact
        title="Join Our Journey"
        description="Ready to partner with a global leader in sustainable apparel manufacturing? Our team is here to discuss how we can work together to create exceptional products with purpose."
        contactInfo={contactData}
        className="rounded-t-3xl overflow-hidden shadow-2xl mt-16"
      />
    </main>
  );
}