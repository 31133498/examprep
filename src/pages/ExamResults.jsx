import { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Icon } from '../components/ui/Icon';
import { Button } from '../components/ui/Button';
import { PageLoader } from '../components/ui/PageLoader';

export function ExamResults() {
  const navigate = useNavigate();
  const { examId, subjectId } = useParams();
  const location = useLocation();
  const { score, totalQuestions, timeTaken, skipped, answers, questions } = location.state || {};
  
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(sessionStorage.getItem('user') || '{}');

  useEffect(() => {
    if (!score && score !== 0) {
      navigate(`/${examId}/${subjectId}`);
      return;
    }
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [score, navigate, examId, subjectId]);

  if (!score && score !== 0) return null;
  if (loading) return <PageLoader message="Calculating your results..." />;

  const percentage = ((score / totalQuestions) * 100).toFixed(1);
  const accuracy = percentage;
  const circumference = 2 * Math.PI * 110;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getPerformanceMessage = () => {
    if (percentage >= 80) return "Excellent! You're ready for the real thing. Your performance is well above the national average.";
    if (percentage >= 70) return "Great job! You're on the right track. Keep practicing to reach excellence.";
    if (percentage >= 60) return "Good effort! With more practice, you'll be ready for the exam.";
    return "Keep practicing! Review the topics you struggled with and try again.";
  };

  const getStatusBadge = () => {
    if (percentage >= 80) return { text: 'Elite Status', icon: 'military_tech', color: 'text-yellow-600', bg: 'bg-yellow-50 dark:bg-yellow-900/20' };
    if (percentage >= 70) return { text: 'High Performer', icon: 'star', color: 'text-primary', bg: 'bg-primary/10' };
    if (percentage >= 60) return { text: 'Good Progress', icon: 'trending_up', color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' };
    return { text: 'Keep Practicing', icon: 'fitness_center', color: 'text-orange-600', bg: 'bg-orange-50 dark:bg-orange-900/20' };
  };

  const badge = getStatusBadge();

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Navigation */}
      <nav className="border-b border-primary/10 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
              <Icon name="school" />
            </div>
            <span className="font-bold text-xl tracking-tight">
              <span className="text-primary uppercase">{examId}</span>
              <span className="text-slate-700 dark:text-slate-200">Prep</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-primary/10 text-slate-600 dark:text-slate-300 transition-colors">
              <Icon name="share" />
            </button>
            <div className="h-8 w-[1px] bg-primary/20" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-xs font-bold text-primary">
                  {user.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'JD'}
                </span>
              </div>
              <span className="hidden md:block font-medium text-sm">{user.name || 'John Doe'}</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Hero Celebration Card */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden bg-white dark:bg-slate-900 rounded-xl border border-primary/10 shadow-xl shadow-primary/5 p-8 md:p-12 text-center"
        >
          <div className="absolute inset-0 opacity-10 pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(circle, #008550 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          
          <div className="relative z-10 flex flex-col items-center">
            <div className={`inline-flex items-center justify-center p-2 px-4 ${badge.bg} ${badge.color} rounded-full text-sm font-semibold mb-6`}>
              <Icon name={badge.icon} className="text-sm mr-2" />
              {badge.text}
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold mb-2">
              {percentage >= 70 ? `Great job, ${user.name?.split(' ')[0] || 'there'}!` : `Keep going, ${user.name?.split(' ')[0] || 'there'}!`}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mb-10 max-w-md mx-auto">
              {getPerformanceMessage()}
            </p>

            {/* Circular Progress */}
            <div className="relative w-64 h-64 flex items-center justify-center mb-8">
              <svg className="w-full h-full transform -rotate-90">
                <circle className="text-primary/10" cx="128" cy="128" fill="transparent" r="110" stroke="currentColor" strokeWidth="12" />
                <circle 
                  className="text-primary transition-all duration-1000 ease-out" 
                  cx="128" 
                  cy="128" 
                  fill="transparent" 
                  r="110" 
                  stroke="currentColor" 
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round" 
                  strokeWidth="12" 
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-6xl font-bold text-slate-800 dark:text-white">{score}/{totalQuestions}</span>
                <span className="text-primary font-bold text-xl uppercase tracking-widest mt-1">{percentage}% Score</span>
              </div>
              {percentage >= 80 && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, y: [0, -10, 0] }}
                  transition={{ delay: 0.5, y: { repeat: Infinity, duration: 2 } }}
                  className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-950 p-3 rounded-full shadow-lg border-4 border-white dark:border-slate-900"
                >
                  <Icon name="emoji_events" className="text-2xl" />
                </motion.div>
              )}
            </div>

            <div className="flex flex-wrap justify-center gap-4 w-full max-w-2xl">
              <Button 
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => navigate(`/${examId}/${subjectId}`), 500);
                }}
                className="flex-1 min-w-[200px] bg-white dark:bg-slate-800 border-2 border-primary/20 hover:border-primary text-primary font-bold py-4 px-8 rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <Icon name="refresh" />
                Try Again
              </Button>
            </div>
          </div>
        </motion.section>

        {/* Performance Breakdown */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-primary/5 shadow-md flex items-center gap-4"
          >
            <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-xl flex items-center justify-center">
              <Icon name="timer" className="text-3xl" />
            </div>
            <div>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Time Taken</p>
              <h3 className="text-2xl font-bold">{timeTaken || '45m 12s'}</h3>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-primary/5 shadow-md flex items-center gap-4"
          >
            <div className="w-14 h-14 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
              <Icon name="insights" className="text-3xl" />
            </div>
            <div>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Accuracy</p>
              <h3 className="text-2xl font-bold">{accuracy}%</h3>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-primary/5 shadow-md flex items-center gap-4"
          >
            <div className="w-14 h-14 bg-orange-50 dark:bg-orange-900/20 text-orange-600 rounded-xl flex items-center justify-center">
              <Icon name="skip_next" className="text-3xl" />
            </div>
            <div>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Questions Skipped</p>
              <h3 className="text-2xl font-bold">{skipped || 0} Questions</h3>
            </div>
          </motion.div>
        </section>

        {/* Leaderboard Section */}
        {!showLeaderboard && percentage >= 70 && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-primary/5 border-2 border-dashed border-primary/20 rounded-xl p-8 md:p-12"
          >
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="flex-1 space-y-6">
                <div className="inline-block">
                  <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-full border border-primary/20 shadow-sm">
                    <Icon name="military_tech" className="text-primary text-lg" />
                    <span className="text-sm font-bold text-primary tracking-wide uppercase">Elite Status</span>
                  </div>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                  You're in the <span className="text-primary">Top 30%</span> nationwide!
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-lg">
                  Your hard work is paying off. Secure your spot on the National Leaderboard and get recognized by top universities across Nigeria.
                </p>
              </div>

              <div className="w-full max-w-md">
                <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-2xl border border-primary/10">
                  <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setShowLeaderboard(true); }}>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Display Name</label>
                      <input 
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary focus:border-primary transition-all" 
                        placeholder="e.g. Adebayo Kunle" 
                        type="text"
                        defaultValue={user.name}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-slate-700 dark:text-slate-300">Email Address</label>
                      <input 
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary focus:border-primary transition-all" 
                        placeholder="adebayo@gmail.com" 
                        type="email"
                        defaultValue={user.email}
                      />
                    </div>
                    <button 
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 mt-4"
                    >
                      <Icon name="leaderboard" />
                      Join Leaderboard
                    </button>
                    <p className="text-center text-xs text-slate-400 mt-4 italic">
                      By joining, you agree to show your score on our public board.
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Social Share */}
        <footer className="pt-8 pb-12 text-center space-y-6">
          <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">Share your success</h4>
          <div className="flex justify-center gap-6">
            <a className="w-12 h-12 rounded-full border-2 border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-sm" href="#">
              <Icon name="share" />
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
