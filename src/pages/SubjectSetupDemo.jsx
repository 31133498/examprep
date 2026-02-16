import { useState } from 'react';
import { SubjectSetup } from './SubjectSetup';
import { subjects } from '../data/subjects';
import { Navigation } from '../components/sections/Navigation';

export const SubjectSetupDemo = () => {
  const [selectedSubject, setSelectedSubject] = useState(subjects[2]); // Default to Physics

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Navigation />
      
      {/* Subject Selector (for demo purposes) */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white dark:bg-white/5 p-4 rounded-xl border border-primary/10 mb-6">
          <p className="text-sm font-semibold mb-3">Demo: Select a subject to view its setup page</p>
          <div className="flex flex-wrap gap-2">
            {subjects.map((subject) => (
              <button
                key={subject.id}
                onClick={() => setSelectedSubject(subject)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedSubject.id === subject.id
                    ? 'bg-primary text-white'
                    : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {subject.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <SubjectSetup subject={selectedSubject} />
    </div>
  );
};
