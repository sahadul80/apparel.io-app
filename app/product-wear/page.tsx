import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Product Portfolio | APPAREL.IO',
  description: 'Design and create your custom product portfolio with our expert team',
};

export default function ProductWearPage() {
  const portfolioSteps = [
    {
      step: 1,
      title: 'Consultation',
      description: 'Discuss your vision, requirements, and target market',
      icon: '💬'
    },
    {
      step: 2,
      description: 'Our designers create concepts based on your specifications',
      icon: '🎨'
    },
    {
      step: 3,
      title: 'Sampling',
      description: 'We produce physical samples for review and feedback',
      icon: '✂️'
    },
    {
      step: 4,
      title: 'Production',
      description: 'Full-scale manufacturing with quality control at every stage',
      icon: '🏭'
    },
    {
      step: 5,
      title: 'Delivery',
      description: 'Timely delivery of your complete product portfolio',
      icon: '📦'
    }
  ];

  return (
    <main className="min-h-screen text-foreground">
      {/* Hero Section */}
      <section className="section section--xl bg-gradient-to-br from-cream-50 to-cream-100">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-display font-heading font-bold text-charcoal mb-6">
              Create Product Portfolio
            </h1>
            <p className="text-body-large text-muted-foreground mb-8">
              Transform your apparel ideas into a complete, market-ready product portfolio. 
              Our end-to-end service takes you from concept to delivery.
            </p>
            <button className="btn btn--primary btn--lg">
              Start Your Portfolio
            </button>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section">
        <div className="container">
          <h2 className="text-heading text-center text-charcoal mb-12">Our Process</h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-soft-sage transform -translate-x-1/2"></div>
              
              {/* Steps */}
              <div className="space-y-12">
                {portfolioSteps.map((step, index) => (
                  <div key={step.step} className="relative flex items-start gap-6">
                    {/* Step number */}
                    <div className="w-16 h-16 bg-gradient-to-br from-forest-emerald to-heritage-green rounded-full flex items-center justify-center text-white font-bold text-lg z-10 flex-shrink-0">
                      {step.icon}
                    </div>
                    
                    {/* Content */}
                    <div className="card card--elevated flex-1 p-6">
                      <h3 className="text-subheading text-charcoal mb-3">
                        {step.title || `Step ${step.step}`}
                      </h3>
                      <p className="text-body text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-charcoal-50">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-heading text-charcoal mb-4">Ready to Create Your Portfolio?</h2>
            <p className="text-body-large text-muted-foreground mb-6">
              Contact our team to discuss your project and get started today.
            </p>
            <div className="flex gap-4 justify-center">
              <button className="btn btn--primary">Schedule Consultation</button>
              <button className="btn btn--outline">Download Brochure</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}