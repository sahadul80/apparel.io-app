import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Global Locations | APPAREL.IO',
  description: 'Our worldwide manufacturing facilities and office locations',
};

export default function GlobalLocationsPage() {
  const locations = [
    {
      country: 'Bangladesh',
      city: 'Dhaka',
      type: 'Headquarters & Manufacturing',
      facilities: ['Corporate Office', 'Design Center', '3 Manufacturing Units'],
      employees: '5,000+',
      established: '1978'
    },
    {
      country: 'Vietnam',
      city: 'Ho Chi Minh City',
      type: 'Manufacturing Hub',
      facilities: ['2 Manufacturing Units', 'Quality Control Lab'],
      employees: '2,500+',
      established: '2005'
    },
    {
      country: 'Turkey',
      city: 'Istanbul',
      type: 'Regional Office & Manufacturing',
      facilities: ['Regional Office', '1 Manufacturing Unit', 'Design Studio'],
      employees: '800+',
      established: '2012'
    },
    {
      country: 'United States',
      city: 'New York',
      type: 'Sales & Design Office',
      facilities: ['North America HQ', 'Showroom', 'Design Collaboration Center'],
      employees: '50+',
      established: '2015'
    },
    {
      country: 'Germany',
      city: 'Berlin',
      type: 'European Office',
      facilities: ['European HQ', 'Client Services', 'Trend Research'],
      employees: '30+',
      established: '2018'
    },
    {
      country: 'United Kingdom',
      city: 'London',
      type: 'Sales Office',
      facilities: ['UK Office', 'Client Showroom'],
      employees: '25+',
      established: '2019'
    }
  ];

  return (
    <main className="min-h-screen text-foreground">
      {/* Hero Section */}
      <section className="section section--xl bg-gradient-to-br from-cream-50 to-cream-100">
        <div className="container">
          <div className="text-center">
            <h1 className="text-display font-heading font-bold text-charcoal mb-4">Global Locations</h1>
            <p className="text-body-large text-muted-foreground max-w-2xl mx-auto">
              Strategically located facilities worldwide to serve our global client base with efficiency and expertise
            </p>
          </div>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {locations.map((location, index) => (
              <div key={index} className="card card--elevated group hover-lift">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-subheading text-charcoal font-semibold">{location.country}</h3>
                      <p className="text-body text-muted-foreground">{location.city}</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-forest-emerald to-heritage-green rounded-full flex items-center justify-center text-white text-lg">
                      {location.country.slice(0, 2)}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <span className="text-caption text-charcoal-600 font-semibold">Type</span>
                      <p className="text-body text-charcoal">{location.type}</p>
                    </div>
                    
                    <div>
                      <span className="text-caption text-charcoal-600 font-semibold">Facilities</span>
                      <ul className="text-body text-charcoal-700">
                        {location.facilities.map((facility, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-muted-gold rounded-full"></div>
                            {facility}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 pt-3 border-t border-soft-sage">
                      <div>
                        <span className="text-caption text-charcoal-600 font-semibold">Employees</span>
                        <p className="text-body text-forest-emerald font-semibold">{location.employees}</p>
                      </div>
                      <div>
                        <span className="text-caption text-charcoal-600 font-semibold">Established</span>
                        <p className="text-body text-charcoal">{location.established}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section bg-charcoal-50">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-heading text-charcoal">Our Global Presence</h2>
            <p className="text-body-large text-muted-foreground">
              Connecting continents through quality apparel manufacturing
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 border border-soft-sage">
            <div className="aspect-video bg-gradient-to-br from-cream-100 to-cream-200 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🌍</div>
                <p className="text-body-large text-muted-foreground">
                  Interactive world map coming soon
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}