import { motion } from 'framer-motion';
import { Disc3 } from 'lucide-react';

const Loader = () => {
  return (
    <motion.div 
      className="fixed inset-0 flex flex-col items-center justify-center bg-black z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="flex flex-col items-center justify-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          animate={{ 
            rotate: 360,
            filter: [
              'drop-shadow(0 0 8px rgba(139, 92, 246, 0.7))', 
              'drop-shadow(0 0 15px rgba(94, 234, 212, 0.7))', 
              'drop-shadow(0 0 8px rgba(139, 92, 246, 0.7))'
            ]
          }}
          transition={{ 
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            filter: { duration: 2, repeat: Infinity, ease: "easeInOut" } 
          }}
          className="text-primary-500 mb-4"
        >
          <Disc3 size={80} />
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-lg font-light text-white/80"
        >
          Syncing with Distortion Field...
        </motion.p>

        <div className="mt-8 relative w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary-600 to-secondary-500"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Loader;