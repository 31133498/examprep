import { BrowserRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ExamSelection } from './pages/ExamSelection';
import { JAMBLanding } from './pages/JAMBLanding';
import { SubjectSetup } from './pages/SubjectSetup';
import { MockExamPage } from './pages/MockExamPage';
import { ExamResults } from './pages/ExamResults';
import { PageLoader } from './components/ui/PageLoader';
import { subjects } from './data/subjects';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ExamSelection />} />
        <Route path="/:examId" element={<ExamLandingWrapper />} />
        <Route path="/:examId/:subjectId" element={<SubjectSetupWrapper />} />
        <Route path="/:examId/:subjectId/mock" element={<MockExamPageWrapper />} />
        <Route path="/:examId/:subjectId/results" element={<ExamResults />} />
      </Routes>
    </BrowserRouter>
  );
}

function ExamLandingWrapper() {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleSubjectSelect = (subject) => {
    setLoading(true);
    sessionStorage.setItem('selectedSubject', subject);
    sessionStorage.setItem('selectedExam', examId);
    
    setTimeout(() => {
      navigate(`/${examId}/${subject}`);
    }, 500);
  };

  if (loading) return <PageLoader message="Loading exam details..." />;

  if (examId === 'jamb') {
    return <JAMBLanding onSubjectSelect={handleSubjectSelect} onBackToExams={() => navigate('/')} />;
  }

  navigate('/');
  return null;
}

function SubjectSetupWrapper() {
  const { examId, subjectId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const subject = subjects.find(s => s.slug === subjectId);
  
  if (!subject) {
    navigate(`/${examId}`);
    return null;
  }

  const handleStartMock = () => {
    setLoading(true);
    setTimeout(() => {
      navigate(`/${examId}/${subjectId}/mock`);
    }, 500);
  };

  if (loading) return <PageLoader message="Preparing your exam..." />;

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen">
      <SubjectSetup 
        subject={subject} 
        onBack={() => navigate(`/${examId}`)} 
        onStartMock={handleStartMock}
      />
    </div>
  );
}

function MockExamPageWrapper() {
  return <MockExamPage />;
}

export default App;
