import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github } from 'lucide-react';

const ProjectsSection = () => {
  const [ref, inView] = useInView({ threshold: 0.1 });

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
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