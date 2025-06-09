import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Atom, Sparkles, Zap, Trophy } from 'lucide-react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';

const ParticleField = () => {
  const points = useRef<THREE.Points>(null);
  
  useFrame(({ clock }) => {
    if (!points.current) return;
    points.current.rotation.y = clock.getElapsedTime() * 0.05;
    points.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.1;
  });

  const particleCount = 1000;
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 10;
    positions[i3 + 1] = (Math.random() - 0.5) * 10;
    positions[i3 + 2] = (Math.random() - 0.5) * 10;
  }

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#8b5cf6"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

const BarmaEffectSection = () => {
  const [ref, inView] = useInView({ threshold: 0.1 });
  const containerRef = useRef<HTMLDivElement>(null);

  const laws = [
    {
      title: "Law of Energy Distortion",
      formula: "E′ = E × (1 + μψ)",
      description: "Energy is neither created nor destroyed, only distorted through the quantum field of consciousness.",
      icon: Atom
    },
    {
      title: "Law of Temporal Echo",
      formula: "Et′ = E + Σ (δψₜ₋ₙ × λ)",
      description: "Every moment creates ripples through time, echoing through the quantum fabric of reality.",
      icon: Sparkles
    },
    {
      title: "Law of Information Resonance",
      formula: "T′ = T + Σ ψI₋ₓ",
      description: "Information transcends its physical form, resonating through consciousness itself.",
      icon: Zap
    }
  ];

  useEffect(() => {
    if (!containerRef.current || !inView) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = containerRef.current!.getBoundingClientRect();
      
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;
      
      const cards = containerRef.current!.querySelectorAll('.law-card');
      cards.forEach((card, index) => {
        const factor = 1 - (index * 0.1);
        (card as HTMLElement).style.transform = 
          `perspective(1000px) rotateY(${x * 10 * factor}deg) rotateX(${-y * 10 * factor}deg)`;
      });
    };

    containerRef.current.addEventListener('mousemove', handleMouseMove);
    return () => {
      containerRef.current?.removeEventListener('mousemove', handleMouseMove);
    };
  }, [inView]);

  return (
    <section id="barma-effect" ref={ref} className="relative min-h-screen py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-primary-900/20 to-black" />
      
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <ParticleField />
        </Canvas>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-glow">The Barma's Laws of Distortion</h2>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-8">
            The world's first published scientific framework where energy distortion is defined through consciousness density.
          </p>
          
          <motion.div 
            className="glass rounded-xl p-4 max-w-xl mx-auto mb-12 border border-primary-500/30"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center justify-center space-x-3">
              <Trophy className="w-6 h-6 text-primary-400" />
              <p className="text-white/90 font-medium">
                World's youngest person to define and name a physics model
              </p>
            </div>
          </motion.div>
        </motion.div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {laws.map((law, index) => (
            <motion.div
              key={law.title}
              className="law-card glass rounded-xl p-8 border border-white/10 hover:border-primary-500/50 transition-all duration-500"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              data-cursor-hover="true"
            >
              <law.icon className="w-12 h-12 text-primary-400 mb-6" />
              
              <h3 className="text-xl font-bold mb-4 text-white">{law.title}</h3>
              
              <div className="mb-6 p-4 bg-white/5 rounded-lg">
                <code className="text-primary-300 font-mono">{law.formula}</code>
              </div>
              
              <p className="text-white/70">{law.description}</p>

              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BarmaEffectSection;