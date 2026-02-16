import { Icon } from '../ui/Icon';

export const GamifiedFeatures = () => {
  const features = [
    {
      icon: 'leaderboard',
      title: 'Weekly Leaderboards',
      description: 'Compete with friends and thousands of students nationwide. Top performers win scholarships and airtime.',
    },
    {
      icon: 'history_toggle_off',
      title: 'Timed CBT Simulations',
      description: 'Our simulator mimics the exact JAMB interface. Build the mental stamina needed for the 2-hour exam.',
    },
    {
      icon: 'analytics',
      title: 'AI-Powered Insights',
      description: 'We analyze your mistakes and tell you exactly which chapters of your textbook to re-read. No more guesswork.',
    },
  ];

  return (
    <section className="py-24 bg-slate-50 dark:bg-background-dark/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-primary font-bold uppercase tracking-widest text-sm block mb-4">
              How we help you win
            </span>
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-10 leading-tight">
              Gamified Learning that Keeps You Hooked
            </h2>
            
            <div className="space-y-10">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex-shrink-0 w-14 h-14 bg-white dark:bg-slate-800 rounded-2xl shadow-lg flex items-center justify-center">
                    <Icon name={feature.icon} size="lg" className="text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-slate-500 dark:text-slate-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-primary/5 rounded-[3rem] p-4">
              <img 
                alt="Student studying" 
                className="rounded-[2.5rem] shadow-2xl border-8 border-white dark:border-slate-800" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqTrFr1LjaTsQZR6RZA4_7RE4B8BkO_YJFrPmBzORabz1X9bF8rf5vY0kib9-MSOw01ar3AzswzvWBv_sIgpKrCVRdGFHG83z9mU-PIjHpmL5KanjHOM-n0TsmrkBqzxDbr-EldJ4J1XRZpziNyLixJgBjIl85DgrjkBwq6HMF1redJwKxr5jEFFPOSq8kg2qa6ez3Kq_pE53Mb8Sy-ompIW62BG4vQSbim-vjlZIG8BrSrEh7uwPUlakrX1yFT45XOnKaslHpijDm" 
              />
            </div>
            
            <div className="absolute -bottom-8 -right-8 bg-accent p-6 rounded-3xl shadow-2xl max-w-xs rotate-3">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-black/10 rounded-full flex items-center justify-center">
                  <Icon name="military_tech" className="text-primary-dark" />
                </div>
                <span className="font-black text-primary-dark text-lg">Scholarship Alert!</span>
              </div>
              <p className="text-sm font-bold text-primary-dark opacity-80 italic">
                "The top 10 students this week will receive ₦50,000 for exam registration."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
