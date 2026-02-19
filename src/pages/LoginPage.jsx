import { motion } from 'framer-motion';
import { Icon } from '../components/ui/Icon';
import { Button } from '../components/ui/Button';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ identifier: '', password: '', rememberMe: false });
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get exam context from navigation state
  const examContext = location.state?.exam || 'ExamPrep';
  const returnTo = location.state?.returnTo || '/';

  const handleSubmit = (e) => {
    e.preventDefault();
    // For development: just navigate without actual auth
    navigate(returnTo);
  };

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row">
      {/* Left Side: Illustration & Motivation */}
      <LeftPanel examContext={examContext} />

      {/* Right Side: Auth Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-16 bg-background-light dark:bg-background-dark">
        <motion.div 
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Mobile Logo */}
          <div className="flex md:hidden items-center justify-center gap-2 mb-8">
            <div className="bg-primary p-2 rounded-lg">
              <Icon name="school" className="text-white text-2xl" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">{examContext}</span>
          </div>

          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome Back</h2>
            <p className="text-gray-500 dark:text-gray-400">Ready to crush your goals today?</p>
          </div>

          {/* Toggle Tab */}
          <div className="flex p-1 bg-primary/10 dark:bg-primary/5 rounded-xl mb-8">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                isLogin
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-white/5'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                !isLogin
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-white/5'
              }`}
            >
              Create Account
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email/Phone Input */}
            <div>
              <label htmlFor="identifier" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Email or Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon name="alternate_email" className="text-gray-400 text-lg" />
                </div>
                <input
                  id="identifier"
                  type="text"
                  value={formData.identifier}
                  onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  placeholder="example@email.com"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <a href="#" className="text-xs font-semibold text-primary hover:underline">
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon name="lock" className="text-gray-400 text-lg" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="block w-full pl-10 pr-10 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <Icon name={showPassword ? 'visibility_off' : 'visibility'} className="text-lg" />
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600 dark:text-gray-400">
                Keep me logged in
              </label>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-primary/20 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLogin ? 'Sign In to Dashboard' : 'Create Account'}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="mt-8 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-background-light dark:bg-background-dark text-gray-500 uppercase tracking-wider text-xs font-bold">
                Or continue with
              </span>
            </div>
          </div>

          {/* Google Sign In */}
          <div className="mt-8">
            <button className="w-full flex items-center justify-center gap-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 py-3 px-4 rounded-xl text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <GoogleIcon />
              Sign in with Google
            </button>
          </div>

          {/* Reward Banner */}
          <motion.div 
            className="mt-8 bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-xl p-4 flex items-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Icon name="redeem" className="text-primary" />
            <p className="text-sm text-gray-700 dark:text-gray-300">
              First time? <span className="font-bold text-primary">Get 500 Practice Coins</span> when you create your account today!
            </p>
          </motion.div>

          {/* Footer Links */}
          <div className="mt-12 text-center text-xs text-gray-400 dark:text-gray-500 space-x-4">
            <a href="#" className="hover:text-primary">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-primary">Support</a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const LeftPanel = ({ examContext }) => {
  const examName = examContext === 'ExamPrep' ? 'JAMB' : examContext.toUpperCase();
  
  return (
    <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-primary to-[#0d7a32] flex-col justify-between p-12 text-white relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-black/10 rounded-full" />

      <motion.div 
        className="relative z-10"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-2 mb-8">
          <div className="bg-white p-2 rounded-lg">
            <Icon name="school" className="text-primary text-3xl" />
          </div>
          <span className="text-2xl font-bold tracking-tight">{examContext}</span>
        </div>
        <h1 className="text-5xl font-extrabold leading-tight mb-6">
          Ace Your {examName}<br />
          <span className="text-green-200">With Confidence.</span>
        </h1>
        <p className="text-lg text-green-50 max-w-md opacity-90">
          Join over 50,000 Nigerian students practicing with real-time CBT simulations and expert tracking.
        </p>
      </motion.div>

      <motion.div 
        className="relative z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {/* Achievement Card */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 mb-8 max-w-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center">
              <Icon name="emoji_events" className="text-background-dark" />
            </div>
            <div>
              <p className="font-semibold text-sm">New Achievement!</p>
              <p className="text-xs text-green-100">Top 1% in Biology Mock Exam</p>
            </div>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <motion.div 
              className="bg-white h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '75%' }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </div>

        {/* Testimonial */}
        <div className="flex items-center gap-4">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAW-lISuFcs4xnM_WK9Jd0r45Tr1qPEDQkkqQ54-xZQ9xre7jkuxCntdWJQ_Pocjz6JUk7N9qFon3wnJIZX9Nvw-oKD2fyHD3C4tfQOevoPVJRTqgv4DV2S8I36hNhkeWf6tfF7cqBbWCdsTPIO5VwjUDdLS0J2osxjh0U2ZIMstSEQS81XYKRI9zSLAJkitFDs0NCKsQBwyi9f8eKYfLGfRL-0hH8ee35r95oD41lneZGh5888X9YevQ2yr3HoI3yITwTVHXAbc_nD"
            alt="Student Success"
            className="w-12 h-12 rounded-full border-2 border-white object-cover"
          />
          <p className="text-sm italic">
            "This platform helped me score 315 in my UTME! The mock exams are exactly like the real thing."<br />
            <strong>- Chinedu O.</strong>
          </p>
        </div>
      </motion.div>

      {/* Background Icon */}
      <div className="absolute right-0 bottom-0 opacity-20 transform translate-y-1/4">
        <Icon name="auto_stories" className="text-[400px]" />
      </div>
    </div>
  );
};

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);
