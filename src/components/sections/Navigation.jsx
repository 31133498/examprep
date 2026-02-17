import { Button } from '../ui/Button';
import { Icon } from '../ui/Icon';

export const Navigation = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-2 rounded-lg">
              <Icon name="school" className="text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight">
              <span className="text-primary">Exam</span><span className="text-slate-700 dark:text-white">Prep</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#exams" className="font-medium hover:text-primary transition-colors">Exams</a>
            <a href="#features" className="font-medium hover:text-primary transition-colors">Features</a>
            <a href="#pricing" className="font-medium hover:text-primary transition-colors">Pricing</a>
            <a href="#resources" className="font-medium hover:text-primary transition-colors">Resources</a>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden sm:block">Login</Button>
            <Button variant="primary">Get Started</Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
