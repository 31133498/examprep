import { Navigation } from './components/sections/Navigation';
import { Hero } from './components/sections/Hero';
import { Stats } from './components/sections/Stats';
import { Subjects } from './components/sections/Subjects';
import { Features } from './components/sections/Features';
import { GamifiedFeatures } from './components/sections/GamifiedFeatures';
import { Testimonials } from './components/sections/Testimonials';
import { SuccessStories } from './components/sections/SuccessStories';
import { CTA } from './components/sections/CTA';
import { Footer } from './components/sections/Footer';
import { SubjectSetup } from './pages/SubjectSetup';
import { useState } from 'react';

function App() {
  const [selectedSubject, setSelectedSubject] = useState(null);

  // Show subject setup page when a subject is selected
  if (selectedSubject) {
    return (
      <div className="bg-background-light dark:bg-background-dark">
        <Navigation />
        <div className="py-8">
          <button
            onClick={() => setSelectedSubject(null)}
            className="max-w-7xl mx-auto px-4 mb-4 text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all"
          >
            ← Back to Home
          </button>
          <SubjectSetup subject={selectedSubject} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Navigation />
      <Hero />
      <Stats />
      <Subjects onSubjectSelect={setSelectedSubject} />
      <Features />
      <GamifiedFeatures />
      <Testimonials />
      <SuccessStories />
      <CTA />
      <Footer />
    </div>
  );
}

export default App;
