import { Card } from '../ui/Card';
import { Icon } from '../ui/Icon';
import { AnimatedSection } from '../ui/AnimatedSection';
import { subjects } from '../../data/subjects';
import { fadeInUp, staggerContainer, staggerItem } from '../../utils/animations';
import { motion } from 'framer-motion';

export const Subjects = ({ onSubjectSelect }) => {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection variants={fadeInUp}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-bold uppercase">Phase 01</span>
                <h2 className="text-3xl font-bold">Subject Selection</h2>
              </div>
              <p className="text-slate-600 dark:text-slate-400 max-w-xl">
                Select a subject to configure your mock exam parameters.
              </p>
            </div>
            <div className="relative">
              <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-primary/40 text-sm">search</span>
              <input 
                className="w-full md:w-64 pl-10 pr-4 py-2 rounded-xl border-primary/20 bg-white dark:bg-slate-800 focus:ring-primary focus:border-primary text-sm shadow-sm" 
                placeholder="Search subjects..." 
                type="text"
              />
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection variants={fadeInUp}>
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <button className="px-5 py-2 rounded-full bg-primary text-white text-sm font-medium shadow-lg shadow-primary/20">All Subjects</button>
            <button className="px-5 py-2 rounded-full bg-white dark:bg-slate-800 border border-primary/10 hover:border-primary/40 text-sm font-medium transition-all">Science</button>
            <button className="px-5 py-2 rounded-full bg-white dark:bg-slate-800 border border-primary/10 hover:border-primary/40 text-sm font-medium transition-all">Arts</button>
            <button className="px-5 py-2 rounded-full bg-white dark:bg-slate-800 border border-primary/10 hover:border-primary/40 text-sm font-medium transition-all">Commercial</button>
          </div>
        </AnimatedSection>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {subjects.map((subject) => (
            <motion.div key={subject.id} variants={staggerItem}>
              <SubjectCard subject={subject} onSelect={onSubjectSelect} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const SubjectCard = ({ subject, onSelect }) => {
  return (
    <motion.div
      className="group bg-white dark:bg-slate-800 rounded-2xl p-6 border border-primary/10 shadow-sm relative overflow-hidden flex flex-col"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      {subject.id === 1 && (
        <div className="absolute top-0 right-0 p-3">
          <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Mandatory</span>
        </div>
      )}
      
      <motion.div 
        className={`w-14 h-14 ${subject.iconBg} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.6 }}
      >
        <Icon name={subject.icon} size="lg" className={subject.iconColor} />
      </motion.div>
      
      <h3 className="text-xl font-bold mb-1">{subject.name}</h3>
      <p className="text-sm text-slate-500 mb-6 flex-grow">{subject.description}</p>
      
      <div className="flex items-center justify-between mt-auto">
        <span className="text-xs font-semibold text-primary/70">{subject.questions}</span>
        <motion.button 
          className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect && onSelect(subject)}
        >
          Select
        </motion.button>
      </div>
    </motion.div>
  );
};
