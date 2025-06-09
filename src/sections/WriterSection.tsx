import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Book, ArrowRight } from 'lucide-react';

const WriterSection = () => {
  const [ref, inView] = useInView({ threshold: 0.1 });
  const carouselRef = useRef<HTMLDivElement>(null);

  const books = [
    {
      title: "The Kali Ramayana",
      cover: "https://images.pexels.com/photos/5834/nature-grass-leaf-green.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      excerpt: "In this cyberpunk reimagining of the ancient epic, Kali leads a resistance against a dystopian empire powered by dark AI.",
      link: "#"
    },
    {
      title: "1818: The Sea of Secrets",
      cover: "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      excerpt: "A quantum-gothic tale of time-traveling pirates and the mysteries that lie beneath the digital waves.",
      link: "#"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <section id="writer" ref={ref} className="relative min-h-screen py-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 to-black z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.1),transparent_50%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h2 
            className="text-3xl md:text-5xl font-bold mb-4 text-glow"
            variants={itemVariants}
          >
            Echoverse
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Where reality bends and stories transcend
          </motion.p>
        </motion.div>

        <motion.div 
          ref={carouselRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {books.map((book, index) => (
            <motion.div
              key={book.title}
              className="relative group"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              data-cursor-hover="true"
            >
              <div className="relative overflow-hidden rounded-xl glass neon-border">
                <div className="aspect-[3/4] relative overflow-hidden">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-500">
                  <h3 className="text-2xl font-bold mb-2 text-glow">{book.title}</h3>
                  <p className="text-white/80 mb-4 line-clamp-3">{book.excerpt}</p>
                  
                  <motion.a
                    href={book.link}
                    className="inline-flex items-center text-primary-400 hover:text-primary-300 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <Book className="w-4 h-4 mr-2" />
                    Read More
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </motion.a>
                </div>
              </div>

              {/* Floating particles */}
              <div className="absolute -inset-4 z-0">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-primary-500/50 rounded-full"
                    animate={{
                      x: [0, Math.random() * 40 - 20],
                      y: [0, Math.random() * 40 - 20],
                      opacity: [0, 0.8, 0],
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WriterSection;