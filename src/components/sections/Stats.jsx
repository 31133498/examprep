import { AnimatedSection } from '../ui/AnimatedSection';
import { staggerContainer, staggerItem } from '../../utils/animations';
import { motion } from 'framer-motion';

export const Stats = () => {
  const stats = [
    { value: '150,000+', label: 'Total Questions' },
    { value: '50k+', label: 'Active Students' },
    { value: '35%', label: 'Avg Improvement' },
    { value: '98%', label: 'Success Rate' },
  ];
  
  return (
    <section className="py-12 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div key={index} className="text-center text-white" variants={staggerItem}>
              <motion.p 
                className="text-4xl font-bold mb-1"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: 'spring' }}
              >
                {stat.value}
              </motion.p>
              <p className="text-white/80 text-sm font-medium uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
