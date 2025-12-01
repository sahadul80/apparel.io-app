import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Promise | APPAREL.IO',
  description: 'Our commitment to quality, sustainability, and ethical manufacturing practices',
};

export default function OurPromisePage() {
  const promises = [
    {
      icon: '🌱',
      title: 'Sustainable Manufacturing',
      description: 'We prioritize eco-friendly materials and processes to minimize our environmental impact.',
      color: 'text-forest-emerald'
    },
    {
      icon: '⭐',
      title: 'Quality Assurance',
      description: 'Every product undergoes rigorous quality checks to ensure exceptional standards.',
      color: 'text-muted-gold'
    },
    {
      icon: '🤝',
      title: 'Ethical Practices',
      description: 'Fair labor practices and safe working conditions are fundamental to our operations.',
      color: 'text-heritage-green'
    },
    {
      icon: '💡',
      title: 'Innovation',
      description: 'We continuously invest in new technologies and techniques to improve our products.',
      color: 'text-soft-sage'
    },
    {
      icon: '⏱️',
      title: 'Timely Delivery',
      description: 'We respect deadlines and ensure prompt delivery of all orders.',
      color: 'text-forest-emerald-dark'
    },
    {
      icon: '🔍',
      title: 'Transparency',
      description: 'Clear communication and honest partnerships with all our clients.',
      color: 'text-muted-gold'
    }
  ];

  return (
    <main className="min-h-screen text-foreground">
      {/* Hero Section */}
      <section className="section section--xl bg-gradient-to-br from-cream-50 to-cream-100">
        <div className="container">
          <div className="text-center">
            <h1 className="text-display font-heading font-bold text-charcoal mb-4">Our Promise</h1>
            <p className="text-body-large text-muted-foreground max-w-2xl mx-auto">
              Our commitment to excellence, sustainability, and ethical practices in every aspect of our business
            </p>
          </div>
        </div>
      </section>

      {/* Promises Grid */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {promises.map((promise, index) => (
              <div key={index} className="card card--elevated text-center group hover-lift">
                <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {promise.icon}
                </div>
                <h3 className={`text-subheading font-semibold mb-3 ${promise.color}`}>
                  {promise.title}
                </h3>
                <p className="text-body text-muted-foreground">
                  {promise.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="section bg-charcoal-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-heading text-forest-emerald mb-6">Our Commitment to Excellence</h2>
              <div className="space-y-4 text-body text-charcoal-700">
                <p>
                  At APPAREL.IO, our promise extends beyond delivering quality products. We are committed 
                  to creating positive change in the apparel industry through sustainable practices, 
                  ethical manufacturing, and meaningful partnerships.
                </p>
                <p>
                  We believe that great apparel should not come at the cost of our planet or people. 
                  That's why we continuously innovate to reduce our environmental footprint while 
                  maintaining the highest standards of quality and design.
                </p>
                <p>
                  Our team is dedicated to understanding your unique needs and delivering solutions 
                  that exceed expectations. We see every project as an opportunity to build lasting 
                  relationships based on trust, transparency, and mutual success.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-soft-sage">
              <h3 className="text-subheading text-heritage-green mb-4">Certifications & Standards</h3>
              <ul className="space-y-3 text-body">
                <li className="flex items-center gap-3 p-3 bg-cream-50 rounded-lg">
                  <div className="w-2 h-2 bg-muted-gold rounded-full"></div>
                  ISO 9001:2015 Quality Management
                </li>
                <li className="flex items-center gap-3 p-3 bg-cream-50 rounded-lg">
                  <div className="w-2 h-2 bg-muted-gold rounded-full"></div>
                  OEKO-TEX Standard 100 Certified
                </li>
                <li className="flex items-center gap-3 p-3 bg-cream-50 rounded-lg">
                  <div className="w-2 h-2 bg-muted-gold rounded-full"></div>
                  Sustainable Apparel Coalition Member
                </li>
                <li className="flex items-center gap-3 p-3 bg-cream-50 rounded-lg">
                  <div className="w-2 h-2 bg-muted-gold rounded-full"></div>
                  WRAP Certified Facilities
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}