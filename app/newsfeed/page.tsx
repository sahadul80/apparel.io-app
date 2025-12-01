import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Newsfeed | APPAREL.IO',
  description: 'Latest news, updates, and insights from the world of apparel manufacturing',
};

export default function NewsfeedPage() {
  const newsItems = [
    {
      id: 1,
      title: 'New Sustainable Fabric Line Launched',
      excerpt: 'We are excited to announce our new eco-friendly fabric collection made from recycled materials.',
      date: '2024-01-15',
      category: 'Sustainability',
      image: '/images/news/sustainable-fabric.jpg',
      readTime: '3 min read'
    },
    {
      id: 2,
      title: 'Expansion into European Markets',
      excerpt: 'Our new manufacturing facility in Turkey strengthens our presence in European markets.',
      date: '2024-01-10',
      category: 'Business',
      image: '/images/news/europe-expansion.jpg',
      readTime: '4 min read'
    },
    {
      id: 3,
      title: 'Innovation in Knitwear Technology',
      excerpt: 'Discover how our latest flat knit technology is revolutionizing sweater production.',
      date: '2024-01-05',
      category: 'Technology',
      image: '/images/news/knitwear-tech.jpg',
      readTime: '5 min read'
    },
    {
      id: 4,
      title: 'Partnership with Fashion Institute',
      excerpt: 'Collaborating with leading design schools to nurture the next generation of talent.',
      date: '2023-12-20',
      category: 'Partnership',
      image: '/images/news/partnership.jpg',
      readTime: '3 min read'
    },
    {
      id: 5,
      title: 'Award for Ethical Manufacturing',
      excerpt: 'Recognized for our commitment to fair labor practices and worker welfare.',
      date: '2023-12-15',
      category: 'Awards',
      image: '/images/news/award.jpg',
      readTime: '2 min read'
    },
    {
      id: 6,
      title: 'Trend Forecast: Spring 2024',
      excerpt: 'Expert insights into the upcoming trends shaping the apparel industry.',
      date: '2023-12-10',
      category: 'Trends',
      image: '/images/news/trend-forecast.jpg',
      readTime: '6 min read'
    }
  ];

  const categories = ['All', 'Sustainability', 'Business', 'Technology', 'Partnership', 'Awards', 'Trends'];

  return (
    <main className="min-h-screen text-foreground">
      {/* Hero Section */}
      <section className="section section--xl bg-gradient-to-br from-cream-50 to-cream-100">
        <div className="container">
          <div className="text-center">
            <h1 className="text-display font-heading font-bold text-charcoal mb-4">Newsfeed</h1>
            <p className="text-body-large text-muted-foreground max-w-2xl mx-auto">
              Stay updated with the latest news, innovations, and insights from APPAREL.IO
            </p>
          </div>
        </div>
      </section>

      {/* News Content */}
      <section className="section">
        <div className="container">
          {/* Categories Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-body font-medium transition-colors ${
                  category === 'All' 
                    ? 'bg-forest-emerald text-white' 
                    : 'bg-cream-100 text-charcoal-700 hover:bg-soft-sage hover:text-charcoal'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems.map((news) => (
              <article key={news.id} className="card card--elevated group hover-lift overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-charcoal-100 to-charcoal-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-forest-emerald/20 to-heritage-green/20 group-hover:opacity-30 transition-opacity duration-300" />
                  <div className="absolute top-4 left-4">
                    <span className="badge badge--primary text-xs">{news.category}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 text-caption text-muted-foreground mb-3">
                    <time>{new Date(news.date).toLocaleDateString()}</time>
                    <span>•</span>
                    <span>{news.readTime}</span>
                  </div>
                  
                  <h3 className="text-subheading text-charcoal font-semibold mb-3 group-hover:text-forest-emerald transition-colors">
                    {news.title}
                  </h3>
                  
                  <p className="text-body text-muted-foreground mb-4">
                    {news.excerpt}
                  </p>
                  
                  <button className="text-body text-forest-emerald font-semibold hover:text-heritage-green transition-colors flex items-center gap-2 group">
                    Read More
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="btn btn--outline border-forest-emerald text-forest-emerald hover:bg-forest-emerald hover:text-white">
              Load More Articles
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section bg-charcoal-50">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-heading text-charcoal mb-4">Stay Updated</h2>
            <p className="text-body-large text-muted-foreground mb-6">
              Subscribe to our newsletter for the latest news and industry insights
            </p>
            <div className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="input flex-1 border-soft-sage focus:border-forest-emerald"
              />
              <button className="btn btn--primary whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}