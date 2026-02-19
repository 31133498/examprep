import { BrowserRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { ExamSelection } from './pages/ExamSelection';
import { JAMBLanding } from './pages/JAMBLanding';
import { SubjectSetup } from './pages/SubjectSetup';
import { LoginPage } from './pages/LoginPage';
import { MockExamPage } from './pages/MockExamPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ExamSelection />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/:examId" element={<ExamLandingWrapper />} />
        <Route path="/:examId/:subjectId" element={<SubjectSetupWrapper />} />
        <Route path="/:examId/:subjectId/mock" element={<MockExamPageWrapper />} />
      </Routes>
    </BrowserRouter>
  );
}

function ExamLandingWrapper() {
  const { examId } = useParams();
  const navigate = useNavigate();

  const handleSubjectSelect = (subject) => {
    // Save subject selection to sessionStorage
    sessionStorage.setItem('selectedSubject', subject);
    sessionStorage.setItem('selectedExam', examId);
    
    // Require login before accessing subject
    navigate('/login', { 
      state: { 
        exam: examId.toUpperCase(), 
        returnTo: `/${examId}/${subject}` 
      } 
    });
  };

  if (examId === 'jamb') {
    return <JAMBLanding onSubjectSelect={handleSubjectSelect} onBackToExams={() => navigate('/')} />;
  }

  // For other exams, redirect to home for now
  navigate('/');
  return null;
}

function SubjectSetupWrapper() {
  const { examId, subjectId } = useParams();
  const navigate = useNavigate();

  const handleStartMock = () => {
    // Save mock exam intent
    sessionStorage.setItem('mockExamIntent', 'true');
    
    // Require login before starting mock exam
    navigate('/login', { 
      state: { 
        exam: examId.toUpperCase(), 
        returnTo: `/${examId}/${subjectId}/mock` 
      } 
    });
  };

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen">
      <SubjectSetup 
        subject={subjectId} 
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
