import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Directly set position for instant response
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || 
          target.tagName === 'A' || 
          target.getAttribute('data-cursor-hover') === 'true') {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      width: 32,
      height: 32,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 15, // Reduced damping for faster response
        mass: 0.2 // Reduced mass for quicker movement
      }
    },
    hover: {
      x: mousePosition.x - 30,
      y: mousePosition.y - 30,
      width: 60,
      height: 60,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 15,
        mass: 0.2
      }
    }
  };

  const trailVariants = {
    default: {
      x: mousePosition.x - 6,
      y: mousePosition.y - 6,
      opacity: 0.3,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 15,
        mass: 0.2
      }
    },
    hover: {
      x: mousePosition.x - 15,
      y: mousePosition.y - 15, 
      opacity: 0.5,
      scale: 1.8,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 15,
        mass: 0.2
      }
    }
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{ 
          backgroundColor: isHovering ? 'rgba(139, 92, 246, 0.5)' : 'rgba(255, 255, 255, 0.8)'
        }}
        variants={variants}
        animate={isHovering ? 'hover' : 'default'}
      />
      <motion.div 
        className="fixed top-0 left-0 rounded-full pointer-events-none z-40"
        style={{ 
          backgroundColor: isHovering ? 'rgba(94, 234, 212, 0.3)' : 'rgba(255, 255, 255, 0.3)'
        }}
        variants={trailVariants}
        animate={isHovering ? 'hover' : 'default'}
      />
    </>
  );
};

export default CustomCursor;