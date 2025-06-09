import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, PresentationControls, useTexture, Html } from '@react-three/drei';
import { Disc3, Music, Wand2 } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import * as THREE from 'three';

// CD Model component using Three.js
const CDModel = ({ isPlaying, speed = 1 }) => {
  const cdRef = useRef<THREE.Group>(null);
  const vinylRef = useRef<THREE.Mesh>(null);
  
  // Load CD textures
  const cdTexture = useTexture({
    map: 'https://images.pexels.com/photos/1694900/pexels-photo-1694900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  });
  
  // CD rotation animation
  useFrame((state, delta) => {
    if (cdRef.current && vinylRef.current) {
      // Rotate the CD based on playing state and speed
      vinylRef.current.rotation.z += isPlaying ? delta * speed * 0.5 : delta * 0.05;
      
      // Add some floating animation to the entire CD
      cdRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      cdRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.02;
    }
  });

  return (
    <group ref={cdRef} position={[0, 0, 0]} scale={2.2}>
      {/* CD base */}
      <mesh castShadow receiveShadow position={[0, 0, -0.05]}>
        <cylinderGeometry args={[1.2, 1.2, 0.1, 64]} />
        <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Vinyl record */}
      <mesh ref={vinylRef} castShadow receiveShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[1, 1, 0.05, 64]} />
        <meshStandardMaterial 
          color="#222"
          metalness={0.5}
          roughness={0.3}
          emissive="#6d28d9"
          emissiveIntensity={isPlaying ? 0.2 : 0.05}
        />
        
        {/* CD label */}
        <mesh position={[0, 0, 0.03]}>
          <cylinderGeometry args={[0.35, 0.35, 0.01, 32]} />
          <meshStandardMaterial 
            {...cdTexture}
            metalness={0.3}
            roughness={0.4}
          />
        </mesh>
        
        {/* Center hole */}
        <mesh position={[0, 0, 0.03]}>
          <cylinderGeometry args={[0.05, 0.05, 0.1, 16]} />
          <meshStandardMaterial color="#000" />
        </mesh>
      </mesh>
      
      {/* CD reflection */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[3, 3]} />
        <meshStandardMaterial 
          color="#000" 
          metalness={1}
          roughness={0.4}
          opacity={0.1}
          transparent={true}
        />
      </mesh>
    </group>
  );
};

// Audio Waveform component
const AudioWaveform = ({ isPlaying }) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const [bars, setBars] = useState<number[]>(Array(30).fill(0));
  
  useEffect(() => {
    if (!isPlaying) return;
    
    // Simulate audio visualization with random bars
    const interval = setInterval(() => {
      setBars(Array(30).fill(0).map(() => Math.random() * 100));
    }, 100);
    
    return () => clearInterval(interval);
  }, [isPlaying]);
  
  return (
    <div ref={waveformRef} className="flex items-end justify-center h-16 gap-1 mt-4">
      {bars.map((height, index) => (
        <motion.div
          key={index}
          className="w-1 bg-gradient-to-t from-primary-500 to-secondary-400"
          initial={{ height: 2 }}
          animate={{ height: isPlaying ? Math.max(5, height) : 2 }}
          transition={{ duration: 0.2 }}
        />
      ))}
    </div>
  );
};

// Particle system for CD trails
const ParticleTrails = ({ isPlaying }) => {
  const particles = Array(20).fill(0);
  
  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map((_, index) => (
        <motion.div
          key={index}
          className={`absolute w-1 h-1 rounded-full bg-primary-500 opacity-70`}
          initial={{ 
            x: '50%', 
            y: '50%',
            opacity: 0 
          }}
          animate={{ 
            x: `${50 + Math.cos(index / particles.length * Math.PI * 2) * 40}%`,
            y: `${50 + Math.sin(index / particles.length * Math.PI * 2) * 40}%`,
            opacity: isPlaying ? [0.2, 0.8, 0.2] : 0,
            scale: isPlaying ? [0.8, 1.2, 0.8] : 0.5,
          }}
          transition={{ 
            duration: 3 + index % 5,
            repeat: Infinity,
            delay: index * 0.2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

// Lyrics component
const Lyrics = ({ isVisible }) => {
  const lyrics = [
    "Through distorted waves of consciousness",
    "Digital echoes resonate beyond time",
    "Synth dreams cascading through neural pathways",
    "Quantum harmonies in synthetic space",
    "A future sound, reverberating backward"
  ];
  
  return (
    <motion.div 
      className="absolute top-1/2 left-0 transform -translate-y-1/2 w-full pointer-events-none"
      initial={{ opacity: 0, x: -50 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        x: isVisible ? 0 : -50
      }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-6 ml-8">
        {lyrics.map((line, index) => (
          <motion.p 
            key={index}
            className="text-lg md:text-xl text-white/80 font-light italic"
            initial={{ y: 20, opacity: 0 }}
            animate={{ 
              y: isVisible ? 0 : 20, 
              opacity: isVisible ? 1 : 0 
            }}
            transition={{ 
              duration: 0.8, 
              delay: isVisible ? 0.1 * index : 0,
              ease: "easeOut"
            }}
          >
            {line}
          </motion.p>
        ))}
      </div>
    </motion.div>
  );
};

// Main Music Section component
const MusicSection = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: false });
  const [isPlaying, setIsPlaying] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const spotifyRef = useRef<HTMLIFrameElement>(null);
  
  useEffect(() => {
    // Reset playing state when section is not in view
    if (!inView) {
      setIsPlaying(false);
      setShowLyrics(false);
    }
  }, [inView]);
  
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 1,
        staggerChildren: 0.2 
      } 
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section id="music" ref={ref} className="relative min-h-screen py-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black to-primary-900/30 z-0" />
      
      {/* Glow effects */}
      <motion.div 
        className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full bg-primary-600/20 filter blur-[100px] z-0"
        animate={{ 
          opacity: isPlaying ? [0.4, 0.7, 0.4] : 0.3,
          scale: isPlaying ? [1, 1.2, 1] : 1
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div 
        className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-secondary-500/20 filter blur-[80px] z-0"
        animate={{ 
          opacity: isPlaying ? [0.3, 0.6, 0.3] : 0.2,
          scale: isPlaying ? [1, 1.1, 1] : 1
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          variants={sectionVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h2 
            className="text-3xl md:text-5xl font-bold mb-4 text-glow"
            variants={itemVariants}
          >
            Sonic Identity
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            My music isn't just for your ears — it's for your distortion.
          </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* CD Visualization */}
          <motion.div 
            className="relative aspect-square max-w-xl mx-auto" 
            variants={itemVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            data-cursor-hover="true"
          >
            <div className="relative w-full h-full">
              {/* 3D CD Component */}
              <div className="w-full h-full cd-glow">
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                  <ambientLight intensity={0.5} />
                  <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                  <pointLight position={[-10, -10, -10]} intensity={0.5} />
                  <PresentationControls
                    global
                    zoom={0.8}
                    rotation={[0, 0, 0]}
                    polar={[-Math.PI / 4, Math.PI / 4]}
                    azimuth={[-Math.PI / 4, Math.PI / 4]}
                  >
                    <CDModel isPlaying={isPlaying} speed={isPlaying ? 2 : 0.5} />
                  </PresentationControls>
                  
                  {/* HTML overlay for play button */}
                  <Html position={[0, 0, 1]} center>
                    <motion.button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className={`p-3 rounded-full ${isPlaying ? 'bg-white text-black' : 'bg-primary-500 text-white'}`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      data-cursor-hover="true"
                    >
                      {isPlaying ? 
                        <span className="sr-only">Pause</span> :
                        <span className="sr-only">Play</span>
                      }
                      <Music size={20} />
                    </motion.button>
                  </Html>
                </Canvas>
              </div>
              
              {/* Particle effects */}
              <ParticleTrails isPlaying={isPlaying} />
              
              {/* Lyrics overlay */}
              <Lyrics isVisible={showLyrics} />
            </div>
            
            {/* Waveform Visualization */}
            <AudioWaveform isPlaying={isPlaying} />
            
            {/* See Lyrics Button */}
            <div className="mt-8 text-center">
              <motion.button
                onClick={() => setShowLyrics(!showLyrics)}
                className="px-6 py-2 bg-transparent border border-white/20 rounded-full text-white/80 hover:text-white hover:border-white/50 flex items-center justify-center mx-auto group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-cursor-hover="true"
              >
                <Wand2 className="mr-2 w-4 h-4" />
                {showLyrics ? "Hide Lyrics" : "See Lyrics"}
              </motion.button>
            </div>
          </motion.div>
          
          {/* Spotify Embed */}
          <motion.div 
            className="w-full h-full flex flex-col justify-center"
            variants={itemVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <div className="glass rounded-xl p-1 max-w-xl mx-auto w-full neon-border">
              <iframe 
                ref={spotifyRef}
                style={{ borderRadius: "12px" }} 
                src="https://open.spotify.com/embed/artist/4tksImfvzrOS63n1F7bXIi?utm_source=generator" 
                width="100%" 
                height="352" 
                frameBorder="0" 
                allowFullScreen 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
                onLoad={() => {
                  // Simulate that Spotify is loaded and playing
                  setTimeout(() => setIsPlaying(true), 1000);
                }}
              />
            </div>
            
            <motion.div 
              className="mt-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <p className="text-white/60 text-sm italic">
                Experience the synesthetic boundary between code and sound.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MusicSection;