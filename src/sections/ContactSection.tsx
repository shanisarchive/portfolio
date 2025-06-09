import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Send, MessageSquare } from 'lucide-react';

const ContactSection = () => {
  const [ref, inView] = useInView({ threshold: 0.1 });
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Reset form
    setFormState({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" ref={ref} className="relative min-h-screen py-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-black to-primary-900/30" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.1),transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-glow">Ping from the Void</h2>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            Send your distortion here...
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="glass rounded-xl p-8 border border-white/10">
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-primary-500 transition-colors"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-primary-500 transition-colors"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-primary-500 transition-colors resize-none"
                    placeholder="What's on your mind?"
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  className="w-full px-6 py-4 bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg text-white font-medium flex items-center justify-center group relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  data-cursor-hover="true"
                >
                  <span className="relative z-10 flex items-center">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-primary-700 to-secondary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>
              </div>
            </div>
          </form>

          {/* AI Assistant Bubble */}
          <motion.div
            className="fixed bottom-8 right-8 glass rounded-full p-4 cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            data-cursor-hover="true"
          >
            <MessageSquare className="w-6 h-6 text-primary-400" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;