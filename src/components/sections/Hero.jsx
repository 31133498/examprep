import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icon';
import { Card } from '../ui/Card';
import { fadeInUp, slideInLeft, slideInRight } from '../../utils/animations';
import { useState, useEffect } from 'react';

export const Hero = () => {
  return (
    <header className="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={slideInLeft}
          >
            <motion.div 
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              JAMB 2025 Registration Now Open
            </motion.div>
            
            <motion.h1 
              className="text-5xl lg:text-7xl font-bold leading-tight mb-6"
              variants={fadeInUp}
            >
              Ace Your <span className="text-primary">JAMB Exam</span> with Practice Tests
            </motion.h1>
            
            <motion.p 
              className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-lg leading-relaxed"
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
            >
              Join 50,000+ Nigerian students using our AI-powered mock exams to secure university admission. Real questions, real timing, real results.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              variants={fadeInUp}
              transition={{ delay: 0.4 }}
            >
              <Button variant="primary" size="lg" icon="arrow_forward">
                Start Practicing Now
              </Button>
              <Button variant="secondary" size="lg">
                <Icon name="play_circle" className="text-primary" />
                How it Works
              </Button>
            </motion.div>
            
            <motion.div 
              className="mt-12 flex items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex -space-x-3">
                <img className="w-12 h-12 rounded-full border-2 border-white object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAip5KtEFYd69EfAdH9vAMS1HjOpBBW2LtIpRaQqUQ4PeadpxB1FDQU4C3O9387sizaWqMVsg-fUvHthyBl12lx3U-Kh6Z3knqJIjfU15OiK1TAkYezIgfVI7fMKxPj0v75fLGwcKnHzraw3uy21fYmldh1L1IJ3oafoX2O5MvUBi3LQfaVWz0090Asc5oyNS15LSSNj2f22tkq1gfDY8LsK2suN17kBe1uMDDRziL9K4zB5eR5H7jEg6F1tSrkK5FMJVUMew4xlDvq" alt="Student" />
                <img className="w-12 h-12 rounded-full border-2 border-white object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuYtH0cHioCwYDr1StwZC6h_eNepEBG_sCO008Kg9eIa5AQppffyz7-ZAXdUDKBm_nGVZzOQUePo8DIUCg1ldLi2aVQGs1WJq0q6kaTN4RdAGk8x4Q4aKP2nL5GXeXyzO6P6m8W9ZDlCe_ej1KtO_-FokC6rMg4-A6Fvol8kny8pJD-Jcnw9eOsIwIlw3JMjnUYTLdrAzzj2A10iT-u_O9H0Fw8zAEwSm7ZNBthAoCQXSL_T9tj7Ly_mzps91FiSSmIbDfXZ2NBjRy" alt="Student" />
                <img className="w-12 h-12 rounded-full border-2 border-white object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZ0SAtkktaNDR7UuMOdvPdl5q9ieFa3eAkSOIqrntrQX2CQYnV0amkPuqEPEfgtnaXHSVKD_1YXkK5Q8_OtNbFF2DWhv4-i6CoMa_rKCVAcHLRmgpFKrDFGROnkf33RC5Sz6geTsiYnLoo6UwM6F_DHogmwgUpKVOaAaGTS5EnB7g3VRyX6hBbnNTer0t43eBQTihhR-T5kCcxuYq9LonAAiqeetufG91PGDYaJGavUPoGgWedsy_HzM4--MwNplo090W4geYnGDsn" alt="Student" />
                <div className="w-12 h-12 rounded-full border-2 border-white bg-primary text-white flex items-center justify-center text-xs font-bold">+5k</div>
              </div>
              <p className="text-sm font-medium text-slate-500">
                Students improved by <span className="text-primary">35%</span> last week
              </p>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial="hidden"
            animate="visible"
            variants={slideInRight}
          >
            <MockExamCard />
          </motion.div>
        </div>
      </div>
    </header>
  );
};

const MockExamCard = () => {
  const [time, setTime] = useState(5099); // 01:24:59 in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 5099));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative">
      <Card className="p-6 shadow-2xl relative z-20">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Icon name="timer" className="text-blue-600" />
            </div>
            <div>
              <h4 className="font-bold text-sm">JAMB Mock Session</h4>
              <p className="text-xs text-slate-500">Subject: Use of English</p>
            </div>
          </div>
          <div className="text-right text-primary font-bold font-mono">
            {formatTime(time)}
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="font-medium">Which of the following is an example of an intransitive verb?</p>
            <div className="space-y-2 mt-4">
              <OptionButton selected>The boy laughed loudly.</OptionButton>
              <OptionButton>She wrote a beautiful poem.</OptionButton>
              <OptionButton>He bought a new car.</OptionButton>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700 flex justify-between">
          <div className="flex gap-2">
            <motion.div className="w-8 h-2 rounded-full bg-primary" layoutId="progress" />
            <div className="w-8 h-2 rounded-full bg-primary/20" />
            <div className="w-8 h-2 rounded-full bg-primary/20" />
          </div>
          <button className="text-primary font-bold text-sm">Next Question →</button>
        </div>
      </Card>
      
      <motion.div 
        className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ repeat: Infinity, duration: 4 }}
      />
      <motion.div 
        className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-400/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ repeat: Infinity, duration: 5, delay: 1 }}
      />
    </div>
  );
};

const OptionButton = ({ children, selected }) => {
  const styles = selected 
    ? 'border-primary bg-primary/5' 
    : 'border-slate-200 dark:border-slate-700';
  
  return (
    <motion.div 
      className={`p-3 rounded-lg border ${styles} flex items-center gap-3`}
      whileHover={{ x: 5 }}
      transition={{ duration: 0.2 }}
    >
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selected ? 'border-primary' : 'border-slate-300'}`}>
        {selected && <motion.div className="w-2.5 h-2.5 rounded-full bg-primary" layoutId="selected" />}
      </div>
      <span className="text-sm">{children}</span>
    </motion.div>
  );
};
