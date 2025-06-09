import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Calendar, Smartphone, Star } from 'lucide-react';

const ProjectsSection = () => {
  const [ref, inView] = useInView({ threshold: 0.1 });

  const featuredProject = {
    name: 'FounderOS',
    description: 'Revolutionary mobile operating system for entrepreneurs and innovators',
    launchDate: 'July 26, 2025',
    platforms: ['iOS App Store', 'Google Play Store'],
    status: 'Coming Soon',
    icon: 'portfolio/public/ChatGPT Image May 26, 2025, 10_23_37 AM.png',
    tech: ['Mobile OS', 'Innovation Platform', 'Entrepreneur Tools'],
    isFeatured: true
  };

  const projects = [
    {
      name: 'barx',
      description: 'Python package for advanced data processing',
      url: 'https://pypi.org/project/barx',
      tech: ['Python', 'Data Processing', 'PyPI'],
    },
    {
      name: 'AuraCorp',
      description: 'Corporate innovation and AI solutions',
      url: 'https://auracorp.in',
      tech: ['AI', 'Innovation', 'Enterprise'],
    },
    {
      name: 'AirScript',
      description: 'Next-generation programming language',
      url: 'https://airscript.in',
      tech: ['Language Design', 'Compiler'],
    },
    {
      name: 'Zaya OS',
      description: 'Experimental operating system',
      tech: ['Systems', 'OS Development'],
    },
    {
      name: 'Bluu',
      description: 'AI-powered digital assistant',
      tech: ['AI', 'NLP', 'Machine Learning'],
    },
    {
      name: 'SynPulX',
      description: 'Synthetic pulse generation system',
      tech: ['Audio', 'DSP', 'Synthesis'],
    },
  ];

  return (
    <section id="projects" ref={ref} className="relative min-h-screen py-20">
      <div className="absolute inset-0 bg-gradient-to-br from-black to-primary-900/30" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-glow">The Lab</h2>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            Where reality gets distorted and innovation takes form.
          </p>
        </motion.div>

        {/* Featured Project - FounderOS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <div className="glass rounded-2xl p-8 border-2 border-primary-500/50 relative overflow-hidden group max-w-4xl mx-auto">
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden mr-4 border border-white/20">
                    <img 
                      src={featuredProject.icon} 
                      alt="FounderOS Logo" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white group-hover:text-primary-400 transition-colors">
                      {featuredProject.name}
                    </h3>
                    <div className="flex items-center mt-1">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="text-sm text-primary-400 font-medium">Featured Project</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-white/80 mb-6 text-lg">{featuredProject.description}</p>
                
                <div className="space-y-4">
                  <div className="flex items-center text-white/70">
                    <Calendar className="w-5 h-5 mr-3 text-primary-400" />
                    <span>Launch Date: <span className="text-white font-medium">{featuredProject.launchDate}</span></span>
                  </div>
                  
                  <div className="flex items-center text-white/70">
                    <Smartphone className="w-5 h-5 mr-3 text-primary-400" />
                    <span>Platforms: <span className="text-white font-medium">{featuredProject.platforms.join(' & ')}</span></span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-6">
                  {featuredProject.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm rounded-full bg-primary-500/20 text-primary-300 border border-primary-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-square max-w-sm mx-auto relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/30 to-secondary-500/30 rounded-3xl blur-xl" />
                  <div className="relative bg-black/50 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                    <img 
                      src={featuredProject.icon} 
                      alt="FounderOS App Icon" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                
                <motion.div 
                  className="absolute -top-4 -right-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-4 py-2 rounded-full text-sm font-medium"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      '0 0 20px rgba(139, 92, 246, 0.5)',
                      '0 0 30px rgba(139, 92, 246, 0.8)',
                      '0 0 20px rgba(139, 92, 246, 0.5)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {featuredProject.status}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Other Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: (index + 2) * 0.1 }}
              className="glass rounded-xl p-6 border border-white/10 hover:border-primary-500/50 transition-colors group"
              data-cursor-hover="true"
            >
              <h3 className="text-xl font-bold mb-2 text-white group-hover:text-primary-400 transition-colors">
                {project.name}
              </h3>
              <p className="text-white/70 mb-4">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs rounded-full bg-white/5 text-white/60"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary-400 hover:text-primary-300 transition-colors"
                  data-cursor-hover="true"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Visit Project
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
