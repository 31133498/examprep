import { ExamSelection } from './pages/ExamSelection';
import { JAMBLanding } from './pages/JAMBLanding';
import { SubjectSetup } from './pages/SubjectSetup';
import { Navigation } from './components/sections/Navigation';
import { Button } from './components/ui/Button';
import { Icon } from './components/ui/Icon';
import { useState } from 'react';
import { motion } from 'framer-motion';

function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'exam' | 'subject'
  const [selectedExam, setSelectedExam] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const handleExamSelect = (examId) => {
    setSelectedExam(examId);
    setCurrentView('exam');
  };

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    setCurrentView('subject');
  };

  const handleBackToExams = () => {
    setSelectedExam(null);
    setCurrentView('home');
  };

  const handleBackToJAMB = () => {
    setSelectedSubject(null);
    setCurrentView('exam');
  };

  // Level 3: Subject Setup Page
  if (currentView === 'subject' && selectedSubject) {
    return (
      <div className="bg-background-light dark:bg-background-dark">
        <Navigation />
        <motion.div 
          className="fixed top-20 left-4 z-40"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Button 
            variant="secondary" 
            onClick={handleBackToJAMB}
            className="shadow-lg backdrop-blur-sm bg-white/90 dark:bg-slate-800/90"
          >
            <Icon name="arrow_back" size="sm" />
            Back to Subjects
          </Button>
        </motion.div>
        <div className="py-8">
          <SubjectSetup subject={selectedSubject} />
        </div>
      </div>
    );
  }

  // Level 2: JAMB Landing Page (only JAMB for now, expandable for other exams)
  if (currentView === 'exam' && selectedExam === 'jamb') {
    return (
      <JAMBLanding 
        onSubjectSelect={handleSubjectSelect}
        onBackToExams={handleBackToExams}
      />
    );
  }

  // Level 1: Exam Selection (Home)
  return <ExamSelection onExamSelect={handleExamSelect} />;
}

export default App;
