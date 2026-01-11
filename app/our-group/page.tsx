// app/our-group/page.tsx
import { Metadata } from 'next';
import { OurGroup } from '../components/OurGroup'; // Assuming you placed it in components folder

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
      src: '/apparel.mp4',
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

  const contactData = {
    address: [
      'APPAREL.IO Group Headquarters',
      'House 22, Road 113/A',
      'Gulshan-2, Dhaka-1212, Dhaka',
      'Bangladesh'
    ],
    phone: '+1 (555) 123-4567',
    email: 'group@apparel.io'
  };

  const stats = [
    { value: '50+', label: 'Years Experience', description: 'Established 1973' },
    { value: '100+', label: 'Global Partners', description: 'Luxury brands to startups' },
    { value: '10M+', label: 'Products Annually', description: 'Sustainable production' },
    { value: '15+', label: 'Countries Served', description: 'Global distribution network' }
  ];

  const leaders = [
    { 
      name: 'Alex Johnson', 
      role: 'CEO & Founder',
      bio: 'Over 30 years in apparel manufacturing'
    },
    { 
      name: 'Maria Garcia', 
      role: 'Head of Sustainability',
      bio: 'Leading sustainable practices since 2005'
    },
    { 
      name: 'David Chen', 
      role: 'Chief Innovation Officer',
      bio: 'Driving technological innovation'
    }
  ];

  return (
    <OurGroup
      heroTitle="Our Group"
      heroDescription="Building on a legacy of excellence in the global apparel industry"
      
      heritageSection={{
        alignment: 'left',
        title: 'Our Heritage & Legacy',
        content: '<p>With over five decades of experience in the apparel manufacturing industry, our group has established itself as a trusted partner for brands worldwide. We combine traditional craftsmanship with innovative technology to deliver exceptional quality.</p><p>&nbsp;</p><p>Our journey began with a simple vision: to create apparel that inspires confidence and comfort while maintaining the highest standards of sustainability and ethical manufacturing.</p>',
        buttonText: 'Explore Our History',
        buttonLink: '/our-history',
        hoverImage: '/images/backgrounds/heritage-bg.jpg',
        gallery: heritageGallery
      }}
      
      valuesSection={{
        alignment: 'right',
        title: 'Our Core Values',
        content: '<p>At the heart of everything we do are our core values. These principles guide our decisions, shape our culture, and define our commitment to excellence.</p><p>&nbsp;</p><p>From sustainable practices to ethical manufacturing, we believe in creating value for all stakeholders while minimizing our environmental impact.</p>',
        buttonText: 'Learn About Our Values',
        buttonLink: '/our-values',
        hoverImage: '/images/backgrounds/values-bg.jpg',
        gallery: valuesGallery
      }}
      
      impactSection={{
        alignment: 'left',
        title: 'Global Reach, Local Impact',
        content: '<p>While our operations span across continents, we remain committed to making a positive impact in every community we touch.</p><p>&nbsp;</p><p>Through sustainable initiatives, ethical employment practices, and community development programs, we\'re building a better future for the apparel industry.</p>',
        buttonText: 'Our Sustainability Report',
        buttonLink: '/sustainability',
        hoverImage: '/images/backgrounds/global-bg.jpg',
        gallery: impactGallery,
        compact: true
      }}
      
      stats={stats}
      
      visionTitle="Our Vision for the Future"
      visionDescription={
        <>
          <p>
            We envision a world where sustainable fashion is the norm, not the exception. 
            Where every garment tells a story of innovation, quality, and environmental stewardship.
          </p>
          <p>
            Our commitment extends beyond creating exceptional apparel – we're dedicated to 
            transforming the industry through cutting-edge research, circular economy models, 
            and partnerships that drive meaningful change.
          </p>
        </>
      }
      visionButtonText="Read Our 2030 Vision"
      visionButtonLink="/our-vision"
      
      leaders={leaders}
      
      contactTitle="Join Our Journey"
      contactDescription="Ready to partner with a global leader in sustainable apparel manufacturing? Our team is here to discuss how we can work together to create exceptional products with purpose."
      contactInfo={contactData}
    />
  );
}