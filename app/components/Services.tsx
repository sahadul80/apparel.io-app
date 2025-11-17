// components/Services.tsx
const Services = () => {
  const services = [
    {
      icon: '🔧',
      title: 'Engineering Design',
      description: 'Comprehensive engineering solutions with cutting-edge technology and innovative approaches.',
    },
    {
      icon: '🏗️',
      title: 'Construction Management',
      description: 'End-to-end project management ensuring timely delivery and quality execution.',
    },
    {
      icon: '🌱',
      title: 'Sustainable Solutions',
      description: 'Eco-friendly and sustainable construction practices for a better tomorrow.',
    },
    {
      icon: '📊',
      title: 'Project Consulting',
      description: 'Expert consultation services for infrastructure development and planning.',
    },
    {
      icon: '🔍',
      title: 'Quality Assurance',
      description: 'Rigorous quality control and assurance protocols across all projects.',
    },
    {
      icon: '🌍',
      title: 'International Operations',
      description: 'Seamless project execution across global markets and diverse environments.',
    },
  ];

  return (
    <section id="services" className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading-secondary">Our Services</h2>
          <p className="text-lead mt-4">
            Comprehensive engineering and construction services tailored to meet 
            the unique challenges of each project across global markets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group p-8 bg-gray-50 rounded-2xl hover:bg-primary-50 transition-all duration-300 hover:shadow-lg border border-gray-100"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;