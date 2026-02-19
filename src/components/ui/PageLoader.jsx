import { motion } from 'framer-motion';
import { Icon } from './Icon';

export function PageLoader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background-light dark:bg-background-dark z-50 flex items-center justify-center"
    >
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full mx-auto mb-4"
        />
        <p className="text-slate-600 dark:text-slate-400 font-medium">Loading...</p>
      </div>
    </motion.div>
  );
}
