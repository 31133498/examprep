import { motion } from 'framer-motion';
import { Icon } from '../components/ui/Icon';
import { Button } from '../components/ui/Button';
import { Navigation } from '../components/sections/Navigation';
import { Footer } from '../components/sections/Footer';
import { PageLoader } from '../components/ui/PageLoader';
import { useState, useEffect } from 'react';

export const SubjectLanding = ({ subject, onBack, onStartPractice }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <PageLoader message={`Loading ${subject.name}...`} />;

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Navigation />
      
      {/* Back Button */}
      <motion.div 
        className="fixed top-20 left-4 z-40"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Button 
          variant="secondary" 
          onClick={onBack}
          className="shadow-lg backdrop-blur-sm bg-white/90 dark:bg-slate-800/90"
        >
          <Icon name="arrow_back" size="sm" />
          Back to Subjects
        </Button>
      </motion.div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-16 px-4">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ 
            backgroundImage: `radial-gradient(circle, ${subject.iconColor.replace('text-', '#')} 1px, transparent 1px)`,
            backgroundSize: '40px 40px' 
          }} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Icon Badge */}
              <motion.div 
                className={`inline-flex items-center gap-3 ${subject.iconBg} p-4 rounded-2xl mb-6`}
                whileHover={{ scale: 1.05 }}
              >
                <Icon name={subject.icon} className={`${subject.iconColor} text-5xl`} />
              </motion.div>

              <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
                Master <span className="text-primary">{subject.name}</span>
              </h1>
              
              <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                {subject.fullDescription}
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <StatCard icon="quiz" label="Questions" value={subject.questions} />
                <StatCard icon="people" label="Attempts" value={subject.attempts} />
                <StatCard icon="trending_up" label="Avg Score" value={`${subject.avgScore}%`} />
              </div>

              {/* CTA Button */}
              <Button
                onClick={onStartPractice}
                className="bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/40 hover:-translate-y-1 transition-all flex items-center gap-2 group"
              >
                Start Practice Now
                <Icon name="arrow_forward" className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>

            {/* Right: Visual Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-2xl border border-slate-100 dark:border-slate-800">
                {/* Topic Breakdown */}
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Icon name="analytics" className="text-primary" />
                  Topic Coverage
                </h3>
                <div className="space-y-4">
                  {subject.topics.map((topic, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-sm">{topic.name}</span>
                        <span className="text-primary font-bold text-sm">{topic.percentage}%</span>
                      </div>
                      <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full ${topic.color} rounded-full`}
                          initial={{ width: 0 }}
                          animate={{ width: `${topic.percentage}%` }}
                          transition={{ duration: 1, delay: 0.6 + i * 0.1 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* XP Reward Badge */}
                <motion.div
                  className="mt-8 bg-gradient-to-r from-primary/10 to-accent/10 p-4 rounded-xl border-2 border-dashed border-primary/30"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-accent p-2 rounded-lg">
                        <Icon name="stars" className="text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-medium">Complete to Earn</p>
                        <p className="text-lg font-bold text-primary">+{subject.xpReward} XP</p>
                      </div>
                    </div>
                    <Icon name="emoji_events" className="text-accent text-3xl" />
                  </div>
                </motion.div>
              </div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-6 -right-6 bg-accent p-4 rounded-2xl shadow-xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Icon name="local_fire_department" className="text-white text-3xl" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            What You'll Get
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon="psychology"
              title="Smart Question Selection"
              description="AI-powered algorithm adapts to your performance and focuses on weak areas"
              delay={0}
            />
            <FeatureCard
              icon="timer"
              title="Real Exam Timing"
              description="Practice with authentic JAMB time constraints to build speed and accuracy"
              delay={0.1}
            />
            <FeatureCard
              icon="insights"
              title="Detailed Analytics"
              description="Track your progress with comprehensive performance reports and insights"
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* Recent Performance */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-primary to-primary-dark text-white rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 opacity-10">
              <Icon name={subject.icon} className="text-[200px]" />
            </div>
            
            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Ready to Excel?</h2>
                <p className="text-green-100 text-lg mb-6">
                  Join {subject.attempts} students who have already practiced {subject.name}. 
                  Start your journey to exam success today!
                </p>
                <Button
                  onClick={onStartPractice}
                  className="bg-white text-primary hover:bg-green-50 font-bold py-4 px-8 rounded-xl shadow-lg hover:-translate-y-1 transition-all"
                >
                  Begin Practice Session
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                  <Icon name="check_circle" className="text-accent text-3xl mb-2" />
                  <p className="text-2xl font-bold">{subject.avgScore}%</p>
                  <p className="text-sm text-green-100">Average Score</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                  <Icon name="workspace_premium" className="text-accent text-3xl mb-2" />
                  <p className="text-2xl font-bold">Top 15%</p>
                  <p className="text-sm text-green-100">Pass Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const StatCard = ({ icon, label, value }) => (
  <motion.div
    className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 text-center"
    whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,133,80,0.1)' }}
  >
    <Icon name={icon} className="text-primary text-2xl mb-2" />
    <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
    <p className="text-xs text-slate-500 uppercase tracking-wider">{label}</p>
  </motion.div>
);

const FeatureCard = ({ icon, title, description, delay }) => (
  <motion.div
    className="bg-background-light dark:bg-slate-900 p-6 rounded-xl border border-slate-100 dark:border-slate-800"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    whileHover={{ y: -5 }}
  >
    <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
      <Icon name={icon} className="text-primary text-2xl" />
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-slate-600 dark:text-slate-400">{description}</p>
  </motion.div>
);
