// components/OurGroup.tsx
import { ReactNode } from 'react';
import { Content, ContentProps } from '../components/Content';
import { Contact, ContactInfo } from '../components/Contact';

interface GalleryItem {
  type: 'image' | 'video';
  src: string;
  title: string;
  description: string;
  category: string;
  alt?: string;
  poster?: string;
}

interface StatItem {
  value: string;
  label: string;
  description?: string;
}

interface LeaderItem {
  name: string;
  role: string;
  bio?: string;
  image?: string;
}

export interface OurGroupSection extends Omit<ContentProps, 'background' | 'className'> {
  // Omit background and className since we handle them differently
}

export interface OurGroupProps {
  // Hero section
  heroTitle: string;
  heroDescription: string;
  heroBackground?: string;
  
  // Content sections
  heritageSection: OurGroupSection;
  valuesSection: OurGroupSection;
  impactSection: OurGroupSection;
  
  // Stats
  stats: StatItem[];
  statsTitle?: string;
  
  // Vision section
  visionTitle: string;
  visionDescription: ReactNode;
  visionButtonText?: string;
  visionButtonLink?: string;
  visionBackground?: string;
  
  // Leadership team
  leadersTitle?: string;
  leaders: LeaderItem[];
  showLeadership?: boolean;
  
  // Contact section
  contactTitle: string;
  contactDescription: string;
  contactInfo: ContactInfo;
  
  // Custom class names
  className?: string;
  contactClassName?: string;
  
  // Sections to show/hide
  showStats?: boolean;
  showVision?: boolean;
  showContact?: boolean;
}

export function OurGroup({
  heroTitle,
  heroDescription,
  heroBackground = 'bg-gradient-to-br from-cream-50 to-cream-100',
  
  heritageSection,
  valuesSection,
  impactSection,
  
  stats,
  statsTitle = 'Our Impact in Numbers',
  
  visionTitle,
  visionDescription,
  visionButtonText,
  visionButtonLink,
  visionBackground = 'bg-gradient-to-br from-forest-emerald/10 to-muted-gold/10',
  
  leadersTitle = 'Our Leadership Team',
  leaders,
  showLeadership = true,
  
  contactTitle,
  contactDescription,
  contactInfo,
  
  className = '',
  contactClassName = 'rounded-t-3xl overflow-hidden shadow-2xl mt-16',
  
  showStats = true,
  showVision = true,
  showContact = true,
}: OurGroupProps) {
  return (
    <main className={`min-h-screen text-foreground ${className}`}>
        <div className="min-h-screen w-full relative">
  {/* Dashed Top Fade Grid */}
  <div
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: `
        linear-gradient(to right, #e7e5e4 1px, transparent 1px),
        linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
      `,
      backgroundSize: "20px 20px",
      backgroundPosition: "0 0, 0 0",
      maskImage: `
        repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
      `,
      WebkitMaskImage: `
 repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
      `,
      maskComposite: "intersect",
      WebkitMaskComposite: "source-in",
    }}
  />
  {/* Hero Section */}
          <div className="text-center">
            <h1 className="text-display font-heading font-bold text-charcoal mb-4">
              {heroTitle}
            </h1>
            <p className="text-body-large text-muted-foreground max-w-2xl mx-auto">
              {heroDescription}
            </p>
          </div>
      {/* Heritage & Legacy Section */}
      <Content {...heritageSection} />

      {/* Values & Philosophy Section */}
      <Content {...valuesSection} />

      {/* Stats Section */}
      {showStats && stats.length > 0 && (
        <section className="section bg-charcoal-50">
          <div className="container">
            <h2 className="text-heading text-center mb-8 text-forest-emerald">
              {statsTitle}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="card card--glass text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <div className="text-display text-forest-emerald font-bold">
                    {stat.value}
                  </div>
                  <div className="text-caption text-charcoal-600 mt-2">
                    {stat.label}
                  </div>
                  {stat.description && (
                    <p className="text-xs text-charcoal-500 mt-2">
                      {stat.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Global Impact Section */}
      <Content {...impactSection} />

      {/* Vision Section */}
      {showVision && (
        <section className={`section ${visionBackground}`}>
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-20 h-1 bg-gradient-to-r from-forest-emerald to-muted-gold mx-auto mb-6 rounded-full"></div>
              <h2 className="text-heading text-charcoal mb-6">{visionTitle}</h2>
              <div className="text-body-large text-charcoal-700 leading-relaxed space-y-6">
                {visionDescription}
              </div>
              {visionButtonText && visionButtonLink && (
                <div className="mt-8">
                  <a 
                    href={visionButtonLink} 
                    className="btn btn--primary btn--lg inline-flex items-center gap-2"
                  >
                    {visionButtonText}
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Leadership Team */}
      {showLeadership && leaders.length > 0 && (
        <section className="section">
          <div className="container">
            <h2 className="text-heading text-center mb-8 text-forest-emerald">
              {leadersTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {leaders.map((leader, index) => (
                <div 
                  key={index} 
                  className="card card--glass text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden bg-gradient-to-br from-soft-sage to-muted-gold/30">
                    {leader.image ? (
                      <img 
                        src={leader.image} 
                        alt={leader.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-forest-emerald">
                        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <h3 className="text-subheading font-semibold text-charcoal mb-1">
                    {leader.name}
                  </h3>
                  <p className="text-caption text-forest-emerald mb-4">{leader.role}</p>
                  {leader.bio && (
                    <p className="text-sm text-charcoal-600">{leader.bio}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      {showContact && (
        <Contact
          title={contactTitle}
          description={contactDescription}
          contactInfo={contactInfo}
          className={contactClassName}
        />
      )}
</div>
    </main>
  );
}