import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '../components/sections/Navigation';
import { Footer } from '../components/sections/Footer';
import { Button } from '../components/ui/Button';
import { Icon } from '../components/ui/Icon';
import { Card } from '../components/ui/Card';
import { fadeInUp, slideInLeft, slideInRight, staggerContainer, staggerItem } from '../utils/animations';
import { useState } from 'react';

const examData = [
  {
    id: 'jamb',
    name: 'JAMB UTME',
    icon: 'menu_book',
    description: 'Comprehensive past questions & CBT practice for Joint Admissions and Matriculation Board.',
    meta: '40+ Subjects'
  },
  {
    id: 'waec',
    name: 'WAEC SSCE',
    icon: 'verified',
    description: 'Theory and objective preparation for West African Senior School Certificate Examination.',
    meta: 'May/June & GCE'
  },
  {
    id: 'neco',
    name: 'NECO',
    icon: 'school',
    description: 'National Examination Council prep material including practical guides and theory.',
    meta: 'June/July'
  },
  {
    id: 'post-utme',
    name: 'POST-UTME',
    icon: 'account_balance',
    description: 'Targeted preparation for specific university entrance exams across Nigeria.',
    meta: '50+ Universities'
  },
  {
    id: 'gce',
    name: 'GCE',
    icon: 'history_edu',
    description: 'General Certificate Examination resources for private candidates.',
    meta: 'Nov/Dec'
  },
  {
    id: 'jssce',
    name: 'JSSCE',
    icon: 'edit_note',
    description: 'Junior Secondary School Certificate Examination prep for JS3 students.',
    meta: 'Junior WAEC'
  }
];

export const ExamSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background-light">
      <Navigation />
      <ExamHero />
      <ExamGrid onExamSelect={(examId) => navigate(`/${examId}`)} />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

const ExamHero = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative overflow-hidden bg-background-light pb-12 pt-10 sm:pt-16 lg:pb-20 lg:pt-24">
      <div className="absolute inset-0 z-0 opacity-30" style={{ backgroundImage: 'radial-gradient(#008550 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
          <motion.div 
            className="lg:col-span-6 text-left"
            initial="hidden"
            animate="visible"
            variants={slideInLeft}
          >
            <motion.div 
              className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="flex h-2 w-2 rounded-full bg-accent mr-2 animate-pulse" />
              New 2024 JAMB Past Questions Added
            </motion.div>

            <motion.h1 
              className="text-4xl font-extrabold tracking-tight text-[#0c1d16] sm:text-5xl md:text-6xl lg:leading-tight"
              variants={fadeInUp}
            >
              Master Your Exams with <span className="relative whitespace-nowrap text-primary">
                Confidence
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-accent -z-10" preserveAspectRatio="none" viewBox="0 0 100 10">
                  <path d="M0 5 Q 50 10 100 5" fill="none" opacity="0.4" stroke="currentColor" strokeWidth="8" />
                </svg>
              </span>
            </motion.h1>

            <motion.p 
              className="mt-6 text-lg text-gray-600 leading-relaxed max-w-2xl"
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
            >
              Join Nigeria's smartest students acing JAMB, WAEC, and NECO with our AI-powered platform. Practice with real past questions and get instant feedback.
            </motion.p>

            <motion.div 
              className="mt-8 flex flex-wrap gap-4"
              variants={fadeInUp}
              transition={{ delay: 0.4 }}
            >
              <Button 
                variant="primary" 
                size="lg" 
                className="shadow-lg shadow-primary/30 hover:-translate-y-1"
                onClick={() => navigate('/login', { state: { exam: 'ExamPrep', returnTo: '/' } })}
              >
                Start Learning Now
              </Button>
              <Button variant="secondary" size="lg">
                View Exams
              </Button>
            </motion.div>

            <motion.div 
              className="mt-10 flex items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex -space-x-3">
                <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCRLcGeSKzIy1w6RNdb-pprxiaZbIhrZ9Tsicwd2ZUM1cq9ZDw8t5DuYkTS7_eRr6_nJEh05tWbPBgMopazJqr3iAWUsvR3iJVnznAX6iFD7KKmoLdBNRptW8-eMs3jn6FdOZoAZRymywfNwU7XpgSQxAKYpcZsJ_pe-s-GPC4DNROS9TVpOUApqJfqhLkhKif-e36XqCe9P6NmtKQHD7OXJhNKImlFKdw9M6Dca7rKyCuccYNAqlL267mYAQhNbx6GW1zVbSaH6Y" alt="Student" />
                <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSyDiFFUwtXk_eMeaj6dPVWpm2lMw8o5KEk8xpgYzjdMJt4muGzHryKFtrxD_Mqf1SAtfiisuo033NEAuf37vHaveSgIUEjsaqi_F8fypD8GloPgAoqTON_7pdRF5f7tD9S-KQxjPTqQ_ewEE1y49cmjNjA8LphtTFKyD5ypoUeoAMOodmAGhVdieq8WI_-ybCjqhQFiO1VqnO4rk9RctKsVubf0vCtE5r_8H8PCmYPW5zV4pyljVU76DOZW-76f6DVX9IHJiIIk0" alt="Student" />
                <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtDIWK4qh3qRVOvWab8D37vxRO7n1po7W6DukNqFyXLW0CyVtLUrS6FGPN3XpAkvb_mvIaEgsnOEy6A_ecz7aIPak6tLcMgBbVGEzjFfDYwPobkITk7YxUM3Gc1hof9tJ-ZHVytcojpLJp7fHqdX9KuZDBIk10X3d0HZL2PW1kvQQAy9t3rq9yXrovDF9xwNvfPF_I-se8rRsnDi6-Yezx3lcbuHOJ5TqegbwwCSm-jECkWYslG5DZWBVJqve8iv31tF3FNJesGgQ" alt="Student" />
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e6f4ef] ring-2 ring-white text-xs font-bold text-primary">
                  +175k
                </div>
              </div>
              <div className="text-sm">
                <div className="flex items-center gap-1">
                  <Icon name="star" className="text-accent text-[18px]" />
                  <Icon name="star" className="text-accent text-[18px]" />
                  <Icon name="star" className="text-accent text-[18px]" />
                  <Icon name="star" className="text-accent text-[18px]" />
                  <Icon name="star" className="text-accent text-[18px]" />
                </div>
                <p className="font-medium text-[#0c1d16]">Trusted by students nationwide</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="relative mt-12 lg:col-span-6 lg:mt-0"
            initial="hidden"
            animate="visible"
            variants={slideInRight}
          >
            <div className="relative mx-auto w-full max-w-[500px] lg:max-w-none">
              <div className="relative rounded-2xl bg-white shadow-2xl p-2 ring-1 ring-gray-900/10">
                <img 
                  className="rounded-xl w-full h-auto object-cover aspect-[4/3]" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDX3wPcaZFLCfYX7Ctjc_Bm1_hJGRPJNZUkRj9oork79-QUxdrGKcVrHxUoF6uVn7_lfFbWUJp4F_fLj98BvbnnrbDPa-_XE5tsSDC2bjhBYW62NzDaWQe6uMufcjcwQEma4Xkerq-6RoMDoVcMCTlEk-vJg_CvczP1G8XLttDWA-ogQCtRgNWF_I9hSYSvtyOuuzuzSTCjCQUvAXYWuc1EApJOWHlE336TeYrRILUh3mzXMcCkLUum3qXyQlm1FKF-LS-Hb3AHroE" 
                  alt="Students studying together" 
                />
                <motion.div 
                  className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-gray-100 flex items-center gap-3"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                >
                  <div className="bg-primary/10 p-2 rounded-lg text-primary">
                    <Icon name="check_circle" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Success Rate</p>
                    <p className="text-lg font-bold text-[#0c1d16]">94% Pass</p>
                  </div>
                </motion.div>
              </div>
              <div className="absolute -top-12 -right-12 -z-10 h-[200px] w-[200px] rounded-full bg-accent/20 blur-3xl" />
              <div className="absolute -bottom-12 -left-12 -z-10 h-[200px] w-[200px] rounded-full bg-primary/20 blur-3xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ExamGrid = ({ onExamSelect }) => {
  const navigate = useNavigate();
  
  const handleExamClick = (examId) => {
    // Require login before accessing exam
    navigate('/login', { 
      state: { 
        exam: examId.toUpperCase(), 
        returnTo: `/${examId}` 
      } 
    });
  };
  
  return (
    <section className="py-16 sm:py-24 bg-white relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-[#0c1d16] sm:text-4xl">Choose Your Exam</h2>
          <p className="mt-4 text-lg text-gray-600">Comprehensive resources for every major Nigerian examination. Select your path to success.</p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {examData.map((exam, index) => (
            <motion.div key={exam.id} variants={staggerItem}>
              <Card 
                className="group relative flex flex-col overflow-hidden p-6 transition-all duration-300 hover:shadow-hover hover:-translate-y-1 hover:border-primary/30 cursor-pointer"
                onClick={() => handleExamClick(exam.id)}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <Icon name={exam.icon} className="text-[28px]" />
                </div>
                <h3 className="text-xl font-bold text-[#0c1d16] group-hover:text-primary transition-colors">{exam.name}</h3>
                <p className="mt-2 flex-1 text-sm text-gray-500">{exam.description}</p>
                <div className="mt-6 flex items-center justify-between border-t border-gray-50 pt-4">
                  <span className="text-xs font-semibold text-gray-400">{exam.meta}</span>
                  <div className="flex items-center gap-1 text-sm font-bold text-primary opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                    Start Practice <Icon name="arrow_forward" size="sm" />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-[#f8fcfa]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-bold tracking-wider text-sm uppercase">Why Choose ExamPrep?</span>
            <h2 className="mt-3 text-3xl font-extrabold text-[#0c1d16] sm:text-4xl">Smarter Learning, Better Results</h2>
            <p className="mt-4 text-lg text-gray-600 mb-8">
              We don't just give you questions; we help you understand them. Our platform adapts to your learning style.
            </p>
            <div className="space-y-6">
              {[
                { icon: 'psychology', title: 'AI-Powered Learning', desc: 'Our smart algorithm identifies your weak topics and recommends targeted practice questions to boost your scores.' },
                { icon: 'analytics', title: 'Performance Analytics', desc: 'Track your speed, accuracy, and progress over time with detailed charts and insights.' },
                { icon: 'devices', title: 'Offline Access', desc: 'Download practice questions and study anywhere, anytime, without worrying about data.' }
              ].map((feature, i) => (
                <motion.div 
                  key={i}
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className={`flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-lg ${i === 0 ? 'bg-primary text-white' : 'bg-white border border-gray-200 text-primary'}`}>
                    <Icon name={feature.icon} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#0c1d16]">{feature.title}</h4>
                    <p className="mt-1 text-gray-600">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="lg:w-1/2 w-full"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative rounded-2xl bg-white p-6 shadow-xl border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-gray-800">Your Progress</h3>
                <span className="bg-green-100 text-primary text-xs font-bold px-2 py-1 rounded">Weekly Report</span>
              </div>
              <div className="flex gap-4 mb-6">
                <div className="flex-1 bg-gray-50 p-4 rounded-lg text-center">
                  <span className="block text-2xl font-bold text-[#0c1d16]">85%</span>
                  <span className="text-xs text-gray-500">Average Score</span>
                </div>
                <div className="flex-1 bg-gray-50 p-4 rounded-lg text-center">
                  <span className="block text-2xl font-bold text-[#0c1d16]">12h</span>
                  <span className="text-xs text-gray-500">Study Time</span>
                </div>
                <div className="flex-1 bg-gray-50 p-4 rounded-lg text-center">
                  <span className="block text-2xl font-bold text-[#0c1d16]">450</span>
                  <span className="text-xs text-gray-500">Questions</span>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { subject: 'Mathematics', score: 92, color: 'bg-primary' },
                  { subject: 'English Language', score: 78, color: 'bg-accent' },
                  { subject: 'Physics', score: 88, color: 'bg-primary' }
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">{item.subject}</span>
                      <span className={`font-bold ${item.color === 'bg-primary' ? 'text-primary' : 'text-accent'}`}>{item.score}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <motion.div 
                        className={`${item.color} h-2 rounded-full`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.score}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: i * 0.2 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full bg-accent rounded-2xl opacity-10" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Chinedu O.',
      score: 'JAMB Score: 310',
      quote: 'I was struggling with Physics until I found ExamPrep. The explanations are so clear. I scored 310 in JAMB!',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-lTACvfUG2F_mXOomB4XHgDZx38mM4CadX-jZdKaCxk5hAyaf3TFap-MP0DAUb1lRJjGEEt5bS6Nky8CCo1tGGm8fZxXw9A3RoiiHYKVPPrJTDKb482Dr8Woj062YNlO5r7kIxYkq2NyFzZdg9vZKOH5Bq4MFaNe015vtjrB8DIJI5j8Yu-x80DRPZOgHOSG34gbJ0yBDFAHdDbeb7NeGHQT39EPGQOjsG9MFmVgBH_eICR6CiAeSowgiArlwDPlq2roAlxkR40U',
      featured: false
    },
    {
      name: 'Amina Y.',
      score: 'WAEC: 7 Distinctions',
      quote: 'The CBT practice interface is exactly like the real exam. It helped me manage my time perfectly during the actual test.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9WlWroKJfre_NVPTsRwWK2UN3DBhA7hxzZPNNYU1jEibBhFMFKByzyw59xH1gpOGdzEIFEEGzKvhHmIMLBh_CFqiFPZn0mVnag3zTpVn9LiCU-Tz0grgpFZorLTLRWh6oMSM24T0Kx1IV2OemViTgTKPOKuVTLsKyJifXbfeaiZffiiIyLRdJ6HIbbnl9Tnazk5DAlKWw9l1oKczNRyNbvwr8s5RKk8ui0WYQg-kGlP7auScFkyGKKIqzADuk4jadryJxqCed608',
      featured: true
    },
    {
      name: 'David K.',
      score: 'Admitted to UNILAG',
      quote: 'Post-UTME was a breeze thanks to the university-specific questions. Highly recommended for every student.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvJ4_HXJmzRQapuxpDDkQb-vEtGx2pbtUz-Bw88gX_iS8nfgF_ejDYhadZk-dJpYdFPsUahQ_j_uGP8go0a2Z3r2ak8v89guZPmGMUIVM6Qh8J3KtdjUtj626oWdE1rWC-G2zJ5Ft899SOEEf-0gJUhCk8ws1q8Zukwaooe9HRCAxUGnwS5ugdX6Uh04jh2REc1My7y78PM6XLuRsWe3XsDopasNa-dQeMB3H8EMhkg25NvwMnSpk6PPUcrbwE5GyNARLwJKc6mS4',
      featured: false
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2 
          className="text-3xl font-bold text-[#0c1d16] mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Success Stories
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              className={`flex flex-col items-center p-8 bg-background-light rounded-2xl border border-[#e6f4ef] ${testimonial.featured ? 'scale-105 shadow-xl z-10 relative' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              {testimonial.featured && (
                <div className="absolute top-0 right-0 bg-accent text-[#0c1d16] text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                  Top Scorer
                </div>
              )}
              <img 
                className={`w-16 h-16 rounded-full object-cover mb-4 ring-2 ${testimonial.featured ? 'ring-accent' : 'ring-primary'}`}
                src={testimonial.image}
                alt={testimonial.name}
              />
              <blockquote className="text-gray-600 mb-6 italic">"{testimonial.quote}"</blockquote>
              <div className="mt-auto">
                <h4 className="font-bold text-[#0c1d16]">{testimonial.name}</h4>
                <span className="text-sm text-primary font-semibold">{testimonial.score}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="bg-primary py-16">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.h2 
          className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Ready to ace your exams?
        </motion.h2>
        <motion.p 
          className="mx-auto mt-4 max-w-2xl text-lg text-white/90"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Join thousands of Nigerian students who are studying smarter, not harder. Sign up today for free access to basic materials.
        </motion.p>
        <motion.div 
          className="mt-10 flex justify-center gap-4 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Button 
            variant="secondary" 
            size="lg"
            className="bg-white text-primary hover:bg-gray-50 hover:scale-105 shadow-lg"
            onClick={() => navigate('/login', { state: { exam: 'ExamPrep', returnTo: '/' } })}
          >
            Get Started for Free
          </Button>
          <Button 
            variant="ghost" 
            size="lg"
            className="border border-white/30 bg-primary-dark/30 text-white hover:bg-primary-dark"
          >
            View Pricing
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
