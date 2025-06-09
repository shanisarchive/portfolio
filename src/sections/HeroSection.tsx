import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, FileDown } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';

const HeroSection = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const profileRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inView && profileRef.current && bgRef.current) {
      // Set up GSAP animations
      const tl = gsap.timeline();
      
      // Mouse move effect for profile image
      const handleMouseMove = (e: MouseEvent) => {
        if (!profileRef.current || !bgRef.current) return;
        
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        // Calculate mouse position as percentage
        const xPos = (clientX / innerWidth - 0.5) * 20;
        const yPos = (clientY / innerHeight - 0.5) * 20;
        
        // Apply subtle rotation to profile image
        gsap.to(profileRef.current, {
          rotateY: xPos,
          rotateX: -yPos,
          duration: 1,
          ease: 'power2.out'
        });
        
        // Create pulse effect on background when hovering profile
        if (clientX > innerWidth/2 - 150 && 
            clientX < innerWidth/2 + 150 && 
            clientY > innerHeight/2 - 150 && 
            clientY < innerHeight/2 + 150) {
          
          gsap.to(bgRef.current, {
            filter: 'blur(120px) brightness(1.5)',
            duration: 0.5
          });
        } else {
          gsap.to(bgRef.current, {
            filter: 'blur(80px) brightness(1.2)',
            duration: 1
          });
        }
      };

      window.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section id="hero" ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background gradient */}
      <div 
        ref={bgRef}
        className="absolute inset-0 bg-gradient-to-br from-primary-900/40 via-secondary-800/20 to-black"
        style={{ filter: 'blur(80px)' }}
      />
      
      <motion.div
        className="container mx-auto px-4 py-20 relative z-10 flex flex-col items-center justify-center text-center"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Profile Image */}
        <motion.div 
          ref={profileRef}
          className="relative mb-8 w-48 h-48 md:w-64 md:h-64 perspective-500"
          variants={itemVariants}
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ 
            rotateY: [0, 10, 0, -10, 0],
            transition: { 
              duration: 12, 
              ease: "easeInOut", 
              repeat: Infinity,
              repeatType: "mirror"
            }
          }}
          data-cursor-hover="true"
        >
          <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/20 shadow-lg">
            <img 
              src="public/Untitled design (41).png" 
              alt="Karthik Barma" 
              className="w-full h-full object-cover"
              onError={(e) => {
                console.log('Image failed to load');
                e.currentTarget.src = "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
              }}
            />
          </div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary-500/30 to-secondary-500/30 blur-xl -z-10"></div>
        </motion.div>
        
        {/* Main text */}
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-white text-glow tracking-tight"
          variants={itemVariants}
        >
          Hi, I'm Karthik Barma
        </motion.h1>
        
        <motion.h2 
          className="text-xl md:text-2xl font-light mb-8 text-white/90"
          variants={itemVariants}
        >
          Soul Inventor // AI Architect // Composer // Futurist
        </motion.h2>
        
        <motion.p 
          className="text-lg md:text-xl italic max-w-2xl mx-auto mb-12 text-white/80"
          variants={itemVariants}
        >
          "Distorter of Reality, Builder of Sound, Architect of Tomorrow"
        </motion.p>
        
        {/* Call to action buttons */}
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
          <motion.a 
            href="#music"
            className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-800 rounded-full text-white font-medium flex items-center justify-center group relative overflow-hidden"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            data-cursor-hover="true"
          >
            <span className="relative z-10 flex items-center">
              Enter the Distortion
              <ArrowDown className="ml-2 w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-primary-700 to-secondary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </motion.a>
          
          <motion.a 
            href="#"
            className="px-8 py-4 bg-transparent border border-white/30 hover:border-white/60 rounded-full text-white/90 hover:text-white font-medium flex items-center justify-center group"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            data-cursor-hover="true"
          >
            <span className="flex items-center">
              Download CV
              <FileDown className="ml-2 w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </span>
          </motion.a>
        </div>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: [0.3, 1, 0.3], y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowDown className="w-6 h-6 text-white/50" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
