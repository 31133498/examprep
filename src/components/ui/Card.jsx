import { motion } from 'framer-motion';

export const Card = ({ children, className = '', hover = false, ...props }) => {
  const hoverStyles = hover ? 'hover:border-primary/40 hover:shadow-xl cursor-pointer' : '';
  
  return (
    <motion.div
      whileHover={hover ? { y: -5, scale: 1.02 } : {}}
      transition={{ duration: 0.3 }}
      className={`bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 transition-all ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};
