import { Navigation } from '../components/sections/Navigation';
import { Hero } from '../components/sections/Hero';
import { Stats } from '../components/sections/Stats';
import { Subjects } from '../components/sections/Subjects';
import { Features } from '../components/sections/Features';
import { GamifiedFeatures } from '../components/sections/GamifiedFeatures';
import { Testimonials } from '../components/sections/Testimonials';
import { SuccessStories } from '../components/sections/SuccessStories';
import { CTA } from '../components/sections/CTA';
import { Footer } from '../components/sections/Footer';
import { Button } from '../components/ui/Button';
import { Icon } from '../components/ui/Icon';
import { motion } from 'framer-motion';

export const JAMBLanding = ({ onSubjectSelect, onBackToExams }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Navigation />
      
      {/* Back Button */}
      <motion.div 
        className="fixed top-20 left-4 z-40"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Button 
          variant="secondary" 
          onClick={onBackToExams}
          className="shadow-lg backdrop-blur-sm bg-white/90 dark:bg-slate-800/90"
        >
          <Icon name="arrow_back" size="sm" />
          All Exams
        </Button>
      </motion.div>

      <Hero />
      <Stats />
      <Subjects onSubjectSelect={onSubjectSelect} />
      <Features />
      <GamifiedFeatures />
      <Testimonials />
      <SuccessStories />
      <CTA />
      <Footer />
    </div>
  );
};
