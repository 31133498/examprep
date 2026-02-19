import { motion } from 'framer-motion';
import { Icon } from './Icon';

export function LoadingScreen() {
  const tips = [
    'Read each question carefully before selecting an answer',
    'Manage your time wisely - don\'t spend too long on one question',
    'Review your answers before submitting',
    'Stay calm and focused throughout the exam',
    'Trust your preparation and knowledge'
  ];

  const randomTip = tips[Math.floor(Math.random() * tips.length)];

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-primary via-[#006b40] to-[#004d2e] flex items-center justify-center z-50">
      <div className="max-w-md w-full px-6">
        {/* Animated Logo */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, type: 'spring' }}
        >
          <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center shadow-2xl">
            <Icon name="auto_stories" className="text-primary text-6xl" />
          </div>
        </motion.div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-white mb-2">Preparing Your Exam</h2>
          <p className="text-green-100 text-sm">Setting up questions and timer...</p>
        </motion.div>

        {/* Animated Progress Bar */}
        <div className="mb-8">
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />
          </div>
        </div>

        {/* Floating Dots */}
        <div className="flex justify-center gap-3 mb-8">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-white rounded-full"
              animate={{
                y: [0, -20, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>

        {/* Exam Tip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4"
        >
          <div className="flex items-start gap-3">
            <Icon name="lightbulb" className="text-yellow-300 text-xl flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-yellow-300 uppercase tracking-wider mb-1">Exam Tip</p>
              <p className="text-sm text-white leading-relaxed">{randomTip}</p>
            </div>
          </div>
        </motion.div>

        {/* Spinning Circle */}
        <motion.div
          className="absolute top-10 right-10 w-32 h-32 border-4 border-white/10 border-t-white rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />

        {/* Decorative Elements */}
        <div className="absolute bottom-10 left-10 w-20 h-20 bg-white/5 rounded-full blur-xl" />
        <div className="absolute top-20 left-1/4 w-16 h-16 bg-white/5 rounded-full blur-xl" />
      </div>
    </div>
  );
}
