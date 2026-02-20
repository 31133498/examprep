import { Button } from '../ui/Button';
import { Icon } from '../ui/Icon';
import { useNavigate } from 'react-router-dom';

export const Navigation = () => {
  const navigate = useNavigate();
  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="bg-primary p-2 rounded-lg">
              <Icon name="school" className="text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight">
              <span className="text-primary">Exam</span><span className="text-slate-700 dark:text-white">Prep</span>
            </span>
          </button>
          
          <Button variant="primary" onClick={() => navigate('/')}>Browse Exams</Button>
        </div>
      </div>
    </nav>
  );
};
