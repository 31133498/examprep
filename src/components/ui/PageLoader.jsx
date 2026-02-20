import { motion } from 'framer-motion';
import { Icon } from './Icon';

export function PageLoader({ message = 'Loading...' }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background-light dark:bg-background-dark z-50 flex items-center justify-center"
    >
      <div className="text-center space-y-6">
        {/* Animated Logo */}
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center text-white mx-auto shadow-2xl shadow-primary/30"
        >
          <Icon name="school" className="text-4xl" />
        </motion.div>

        {/* Loading Dots */}
        <div className="flex items-center justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ 
                y: [0, -10, 0],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{ 
                duration: 0.8, 
                repeat: Infinity,
                delay: i * 0.2
              }}
              className="w-3 h-3 bg-primary rounded-full"
            />
          ))}
        </div>

        {/* Message */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-slate-600 dark:text-slate-400 font-medium text-lg"
        >
          {message}
        </motion.p>
      </div>
    </motion.div>
  );
}
