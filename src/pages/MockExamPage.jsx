import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';

const mockQuestions = {
  physics: [
    { id: 1, text: 'What is the SI unit of force?', options: ['Newton', 'Joule', 'Watt', 'Pascal'], correct: 0 },
    { id: 2, text: 'The acceleration due to gravity is approximately:', options: ['9.8 m/s²', '10 m/s²', '8.9 m/s²', '11 m/s²'], correct: 0 },
    { id: 3, text: 'Which law states that for every action there is an equal and opposite reaction?', options: ['First Law', 'Second Law', 'Third Law', 'Law of Gravitation'], correct: 2 },
    { id: 4, text: 'What is the formula for kinetic energy?', options: ['mgh', '½mv²', 'mv', 'F×d'], correct: 1 },
    { id: 5, text: 'The speed of light in vacuum is:', options: ['3×10⁸ m/s', '3×10⁶ m/s', '3×10⁷ m/s', '3×10⁹ m/s'], correct: 0 }
  ],
  chemistry: [
    { id: 1, text: 'What is the atomic number of Carbon?', options: ['6', '12', '8', '14'], correct: 0 },
    { id: 2, text: 'Which gas is most abundant in Earth\'s atmosphere?', options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'], correct: 2 },
    { id: 3, text: 'What is the pH of pure water?', options: ['7', '0', '14', '1'], correct: 0 },
    { id: 4, text: 'The chemical formula for water is:', options: ['H₂O', 'CO₂', 'O₂', 'H₂SO₄'], correct: 0 },
    { id: 5, text: 'Which element has the symbol Fe?', options: ['Fluorine', 'Iron', 'Francium', 'Fermium'], correct: 1 }
  ],
  mathematics: [
    { id: 1, text: 'What is 15% of 200?', options: ['30', '25', '35', '20'], correct: 0 },
    { id: 2, text: 'Solve: 2x + 5 = 15', options: ['x = 5', 'x = 10', 'x = 7.5', 'x = 2.5'], correct: 0 },
    { id: 3, text: 'What is the area of a circle with radius 7cm? (π = 22/7)', options: ['154 cm²', '44 cm²', '22 cm²', '308 cm²'], correct: 0 },
    { id: 4, text: 'The sum of angles in a triangle is:', options: ['180°', '360°', '90°', '270°'], correct: 0 },
    { id: 5, text: 'What is the square root of 144?', options: ['12', '14', '10', '16'], correct: 0 }
  ],
  english: [
    { id: 1, text: 'Choose the correct spelling:', options: ['Accommodate', 'Acommodate', 'Acomodate', 'Accomodate'], correct: 0 },
    { id: 2, text: 'What is the plural of "child"?', options: ['Children', 'Childs', 'Childes', 'Childrens'], correct: 0 },
    { id: 3, text: 'Identify the verb: "The cat sleeps on the mat"', options: ['sleeps', 'cat', 'mat', 'the'], correct: 0 },
    { id: 4, text: 'Which is a synonym for "happy"?', options: ['Joyful', 'Sad', 'Angry', 'Tired'], correct: 0 },
    { id: 5, text: 'Choose the correct sentence:', options: ['She is taller than me', 'She is more taller than me', 'She is tallest than me', 'She is tall than me'], correct: 0 }
  ],
  biology: [
    { id: 1, text: 'What is the powerhouse of the cell?', options: ['Mitochondria', 'Nucleus', 'Ribosome', 'Chloroplast'], correct: 0 },
    { id: 2, text: 'How many chromosomes do humans have?', options: ['46', '23', '48', '44'], correct: 0 },
    { id: 3, text: 'Which organ pumps blood in the human body?', options: ['Heart', 'Liver', 'Kidney', 'Lungs'], correct: 0 },
    { id: 4, text: 'Photosynthesis occurs in:', options: ['Chloroplasts', 'Mitochondria', 'Nucleus', 'Vacuole'], correct: 0 },
    { id: 5, text: 'What is the basic unit of life?', options: ['Cell', 'Tissue', 'Organ', 'Atom'], correct: 0 }
  ],
  economics: [
    { id: 1, text: 'What does GDP stand for?', options: ['Gross Domestic Product', 'General Domestic Product', 'Gross Development Product', 'Global Domestic Product'], correct: 0 },
    { id: 2, text: 'The law of demand states that:', options: ['Price and quantity demanded are inversely related', 'Price and quantity demanded are directly related', 'Price has no effect on demand', 'Demand is always constant'], correct: 0 },
    { id: 3, text: 'Inflation refers to:', options: ['General increase in prices', 'General decrease in prices', 'Stable prices', 'No change in prices'], correct: 0 },
    { id: 4, text: 'A market with only one seller is called:', options: ['Monopoly', 'Oligopoly', 'Perfect Competition', 'Duopoly'], correct: 0 },
    { id: 5, text: 'The central bank of Nigeria is:', options: ['CBN', 'IMF', 'World Bank', 'NDIC'], correct: 0 }
  ]
};

export function MockExamPage() {
  const navigate = useNavigate();
  const { examId, subjectId } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(45 * 60);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const questions = mockQuestions[subjectId] || mockQuestions.physics;
  const totalQuestions = questions.length;

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (questionId, optionIndex) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmit = () => {
    const score = questions.reduce((acc, q) => {
      return acc + (answers[q.id] === q.correct ? 1 : 0);
    }, 0);
    
    alert(`Exam Submitted!\n\nScore: ${score}/${totalQuestions}\nPercentage: ${((score/totalQuestions)*100).toFixed(1)}%`);
    navigate(`/${examId}/${subjectId}`);
  };

  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f231b] via-[#1a3a2e] to-[#0f231b]">
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="material-icons text-primary text-3xl">school</span>
            <div>
              <h1 className="text-xl font-bold text-white capitalize">{examId} - {subjectId}</h1>
              <p className="text-sm text-white/60">Mock Examination</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">{formatTime(timeLeft)}</div>
              <div className="text-xs text-white/60">Time Remaining</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{answeredCount}/{totalQuestions}</div>
              <div className="text-xs text-white/60">Answered</div>
            </div>
            
            <Button onClick={() => setShowSubmitModal(true)} variant="primary" size="sm">
              Submit Exam
            </Button>
          </div>
        </div>
        
        <div className="h-1 bg-white/10">
          <motion.div 
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <motion.div 
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-primary font-semibold">Question {currentQuestion + 1} of {totalQuestions}</span>
                <span className={`px-3 py-1 rounded-full text-sm ${answers[questions[currentQuestion].id] !== undefined ? 'bg-primary/20 text-primary' : 'bg-white/10 text-white/60'}`}>
                  {answers[questions[currentQuestion].id] !== undefined ? 'Answered' : 'Not Answered'}
                </span>
              </div>

              <h2 className="text-2xl font-semibold text-white mb-8">{questions[currentQuestion].text}</h2>

              <div className="space-y-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(questions[currentQuestion].id, index)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      answers[questions[currentQuestion].id] === index
                        ? 'border-primary bg-primary/10 text-white'
                        : 'border-white/10 bg-white/5 text-white/80 hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        answers[questions[currentQuestion].id] === index
                          ? 'border-primary bg-primary'
                          : 'border-white/30'
                      }`}>
                        {answers[questions[currentQuestion].id] === index && (
                          <span className="material-icons text-white text-sm">check</span>
                        )}
                      </div>
                      <span className="font-medium">{String.fromCharCode(65 + index)}.</span>
                      <span>{option}</span>
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
                <Button
                  onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                  disabled={currentQuestion === 0}
                  variant="secondary"
                >
                  <span className="material-icons">arrow_back</span>
                  Previous
                </Button>
                
                <Button
                  onClick={() => setCurrentQuestion(prev => Math.min(totalQuestions - 1, prev + 1))}
                  disabled={currentQuestion === totalQuestions - 1}
                  variant="primary"
                >
                  Next
                  <span className="material-icons">arrow_forward</span>
                </Button>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-white mb-4">Question Navigator</h3>
              
              <div className="grid grid-cols-5 gap-2 mb-6">
                {questions.map((q, index) => (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestion(index)}
                    className={`aspect-square rounded-lg font-semibold text-sm transition-all ${
                      currentQuestion === index
                        ? 'bg-accent text-black'
                        : answers[q.id] !== undefined
                        ? 'bg-primary text-white'
                        : 'bg-white/10 text-white/60 hover:bg-white/20'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-primary"></div>
                  <span className="text-white/80">Answered ({answeredCount})</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-white/10"></div>
                  <span className="text-white/80">Not Answered ({totalQuestions - answeredCount})</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-accent"></div>
                  <span className="text-white/80">Current</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showSubmitModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#1a3a2e] border border-white/10 rounded-2xl p-8 max-w-md w-full"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Submit Exam?</h3>
            <p className="text-white/70 mb-6">
              You have answered {answeredCount} out of {totalQuestions} questions. 
              {answeredCount < totalQuestions && ` ${totalQuestions - answeredCount} questions remain unanswered.`}
            </p>
            <div className="flex gap-4">
              <Button onClick={() => setShowSubmitModal(false)} variant="secondary" className="flex-1">
                Continue Exam
              </Button>
              <Button onClick={handleSubmit} variant="primary" className="flex-1">
                Submit Now
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
