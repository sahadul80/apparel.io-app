// components/Projects.tsx
const Projects = () => {
  const projects = [
    {
      title: 'Commercial Complex Development',
      category: 'Commercial',
      location: 'Dubai, UAE',
      image: '/api/placeholder/400/300',
    },
    {
      title: 'Highway Infrastructure',
      category: 'Infrastructure',
      location: 'Singapore',
      image: '/api/placeholder/400/300',
    },
    {
      title: 'Sustainable Housing Project',
      category: 'Residential',
      location: 'London, UK',
      image: '/api/placeholder/400/300',
    },
  ];

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading-secondary">Featured Projects</h2>
          <p className="text-lead mt-4">
            Showcasing our commitment to excellence through successfully 
            delivered projects across various sectors and geographies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 group"
            >
              <div className="h-48 bg-primary-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary-500 opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl">🏢</span>
                </div>
              </div>
              <div className="p-6">
                <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-3">
                  {project.category}
                </span>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 flex items-center">
                  📍 {project.location}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="/projects" className="btn-primary">
            View All Projects
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;