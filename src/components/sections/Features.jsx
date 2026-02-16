import { Icon } from '../ui/Icon';
import { AnimatedSection } from '../ui/AnimatedSection';
import { fadeInUp, staggerContainer, staggerItem } from '../../utils/animations';
import { motion } from 'framer-motion';

export const Features = () => {
  const features = [
    {
      icon: 'timer',
      title: 'Timed Practice',
      description: 'Experience the real pressure of the JAMB CBT environment with our synchronized countdown timer and interface.',
    },
    {
      icon: 'leaderboard',
      title: 'Global Leaderboards',
      description: 'Compete with thousands of other candidates across the country. See where you stand and push your limits.',
    },
    {
      icon: 'insights',
      title: 'Performance Analytics',
      description: 'Get detailed breakdowns of your strengths and weaknesses by topic. Know exactly where to focus your study time.',
    },
  ];
  
  return (
    <section className="py-24 bg-background-light dark:bg-background-dark/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection variants={fadeInUp}>
          <div className="text-center mb-20">
            <h2 className="text-3xl font-bold mb-4">Master Your Exam Early</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Our platform is designed to give you the competitive edge through real-world simulation and data-driven insights.
            </p>
          </div>
        </AnimatedSection>
        
        <motion.div 
          className="grid md:grid-cols-3 gap-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} className="flex flex-col items-center text-center" variants={staggerItem}>
              <motion.div 
                className="w-20 h-20 bg-white dark:bg-slate-800 rounded-3xl shadow-lg flex items-center justify-center mb-8"
                whileHover={{ y: -10, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Icon name={feature.icon} size="xl" className="text-primary" />
              </motion.div>
              <h4 className="text-xl font-bold mb-4">{feature.title}</h4>
              <p className="text-slate-500 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
