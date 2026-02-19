import { motion } from 'framer-motion';
import { Icon } from '../components/ui/Icon';
import { Button } from '../components/ui/Button';
import { Navigation } from '../components/sections/Navigation';
import { useState } from 'react';

export const SubjectSetup = ({ subject, onBack, onStartMock }) => {
  const [questionCount, setQuestionCount] = useState(40);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Navigation />
      
      {/* Back Button */}
      {onBack && (
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
      )}

      <div className="py-8">
      {/* Hero Section */}
      <section className="mb-8 flex flex-col md:flex-row items-center gap-6 bg-white dark:bg-white/5 p-8 rounded-xl border border-primary/5 shadow-sm max-w-7xl mx-auto">
        <div className={`${subject.iconBg} p-6 rounded-2xl`}>
          <Icon name={subject.icon} className={`${subject.iconColor} text-6xl`} />
        </div>
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-wrap items-center gap-3 mb-2 justify-center md:justify-start">
            <h1 className="text-3xl font-bold">{subject.name} Mock Exam</h1>
            <span className="bg-orange-500/10 text-orange-600 text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
              <Icon name="local_fire_department" className="text-xs" /> POPULAR
            </span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl">{subject.fullDescription}</p>
          <div className="flex flex-wrap gap-8 mt-6 justify-center md:justify-start">
            <div className="flex flex-col">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Attempts</span>
              <span className="text-xl font-bold">{subject.attempts}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Avg. Score</span>
              <span className="text-xl font-bold">{subject.avgScore}%</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">XP Reward</span>
              <span className="text-xl font-bold text-primary">+{subject.xpReward} XP</span>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto px-4">
        {/* Left Sidebar: Instructions */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="bg-white dark:bg-white/5 p-6 rounded-xl border border-primary/5">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Icon name="gavel" className="text-primary text-xl" />
              Instructions
            </h3>
            <ul className="space-y-4 text-sm">
              {['Each question has 4 options; only one is correct.', 'Once the timer starts, it cannot be paused.', 'Results will be displayed immediately after submission.'].map((instruction, i) => (
                <li key={i} className="flex gap-3">
                  <span className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 text-[10px] font-bold italic">{i + 1}</span>
                  <p className="text-slate-600 dark:text-slate-300">{instruction}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-red-500/5 border-l-4 border-red-500 p-6 rounded-xl">
            <div className="flex items-center gap-2 text-red-600 font-bold mb-2">
              <Icon name="shield" className="text-xl" />
              Anti-Cheating
            </div>
            <p className="text-xs text-red-800 dark:text-red-200 leading-relaxed">
              Your browser will be locked into fullscreen mode. Switching tabs or minimizing windows will result in automatic submission.
            </p>
          </div>
        </aside>

        {/* Center: Exam Configuration */}
        <section className="lg:col-span-6">
          <div className="bg-white dark:bg-white/5 p-8 rounded-xl border border-primary shadow-sm h-full flex flex-col">
            <h2 className="text-xl font-bold mb-8">Setup Your Exam</h2>
            <div className="space-y-8 flex-1">
              {/* Question Count Selection */}
              <div>
                <label className="text-sm font-semibold text-slate-500 mb-4 block">Select Number of Questions</label>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: 30, label: 'Short Mock' },
                    { value: 40, label: 'Standard' },
                    { value: 50, label: 'Full Prep' }
                  ].map((option) => (
                    <label key={option.value} className="cursor-pointer">
                      <input
                        type="radio"
                        name="questions"
                        value={option.value}
                        checked={questionCount === option.value}
                        onChange={() => setQuestionCount(option.value)}
                        className="peer hidden"
                      />
                      <div className="text-center p-4 rounded-xl border-2 border-slate-100 dark:border-white/10 peer-checked:border-primary peer-checked:bg-primary/5 transition-all">
                        <span className="block text-lg font-bold">{option.value}</span>
                        <span className="text-[10px] text-slate-400 uppercase tracking-tighter">{option.label}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Time Information */}
              <div className="flex items-center justify-between bg-background-light dark:bg-white/5 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <Icon name="schedule" className="text-primary" />
                  <div>
                    <p className="text-sm font-bold leading-tight">Estimated Time</p>
                    <p className="text-xs text-slate-500">Based on standard JAMB pacing</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-primary">{Math.floor(questionCount * 1.125)}:00</span>
              </div>

              {/* Start Button */}
              <motion.button
                onClick={() => {
                  sessionStorage.setItem('questionCount', questionCount.toString());
                  onStartMock();
                }}
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                START MOCK EXAM
                <Icon name="play_arrow" className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>

            {/* Difficulty Chart */}
            <div className="mt-12 pt-8 border-t border-slate-100 dark:border-white/10">
              <div className="flex justify-between items-end mb-4">
                <h3 className="text-xs font-bold uppercase text-slate-400">Current Difficulty Mix</h3>
                <div className="flex gap-3 text-[10px]">
                  <span className="flex items-center gap-1"><i className="w-2 h-2 rounded-full bg-green-500" /> Easy</span>
                  <span className="flex items-center gap-1"><i className="w-2 h-2 rounded-full bg-yellow-500" /> Mid</span>
                  <span className="flex items-center gap-1"><i className="w-2 h-2 rounded-full bg-red-500" /> Hard</span>
                </div>
              </div>
              <div className="flex h-3 w-full rounded-full overflow-hidden bg-slate-100 dark:bg-white/10">
                <div className="bg-green-500 w-[40%]" />
                <div className="bg-yellow-500 w-[35%]" />
                <div className="bg-red-500 w-[25%]" />
              </div>
            </div>
          </div>
        </section>

        {/* Right Sidebar: Leaderboard */}
        <aside className="lg:col-span-3">
          <Leaderboard />
        </aside>
      </div>

      {/* Syllabus Coverage */}
      <footer className="mt-8 max-w-7xl mx-auto px-4">
        <div className="bg-white dark:bg-white/5 p-6 rounded-xl border border-primary/5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h4 className="font-bold">Syllabus Coverage Breakdown</h4>
              <p className="text-xs text-slate-500">Topic distribution for the upcoming mock cycle</p>
            </div>
            <div className="flex flex-wrap gap-4">
              {subject.topics.map((topic, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className={`h-2 w-8 ${topic.color} rounded-full`} />
                  <span className="text-xs font-medium">{topic.name} ({topic.percentage}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
};

const Leaderboard = () => {
  const topThree = [
    { name: 'Chidi Obi', score: 94, medal: '🥇', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
    { name: 'Amina Yusuf', score: 91, medal: '🥈', bg: 'bg-slate-400/10', border: 'border-slate-400/20' },
    { name: 'Tunde Bakare', score: 89, medal: '🥉', bg: 'bg-orange-700/10', border: 'border-orange-700/20' }
  ];

  return (
    <div className="bg-white dark:bg-white/5 p-6 rounded-xl border border-primary/5 flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg">Weekly Hall of Fame</h3>
        <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">WEEK 4</span>
      </div>
      <div className="space-y-4 flex-1">
        <div className="flex flex-col gap-3 mb-6">
          {topThree.map((user, i) => (
            <div key={i} className={`flex items-center gap-3 p-3 rounded-lg ${user.bg} border ${user.border}`}>
              <div className="relative">
                <div className="h-10 w-10 rounded-full overflow-hidden bg-slate-200" />
                <div className="absolute -top-1 -right-1 bg-yellow-400 h-5 w-5 rounded-full flex items-center justify-center text-[10px] border-2 border-white dark:border-background-dark">{user.medal}</div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold truncate">{user.name}</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">Score: {user.score}%</p>
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-3 opacity-60">
          {['Sarah Idowu', 'Ebube Eze', 'Fatimah Garba'].map((name, i) => (
            <div key={i} className="flex justify-between items-center text-xs">
              <span className="font-medium">{i + 4}. {name}</span>
              <span className="font-bold">{88 - i}%</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/10">
        <div className="bg-primary/5 p-4 rounded-xl border border-primary/10">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Your Rank</p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold">#1,244</span>
            <span className="text-xs text-primary font-bold">+12 pos this week</span>
          </div>
        </div>
      </div>
    </div>
  );
};
