import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '../components/ui/Icon';
import { Button } from '../components/ui/Button';

const mockQuestions = {
  english: [
    { id: 1, text: 'Choose the correct spelling:', options: ['Accommodate', 'Acommodate', 'Acomodate', 'Accomodate'], correct: 0 },
    { id: 2, text: 'What is the plural of "child"?', options: ['Children', 'Childs', 'Childes', 'Childrens'], correct: 0 },
    { id: 3, text: 'Identify the verb: "The cat sleeps on the mat"', options: ['sleeps', 'cat', 'mat', 'the'], correct: 0 },
    { id: 4, text: 'Which is a synonym for "happy"?', options: ['Joyful', 'Sad', 'Angry', 'Tired'], correct: 0 },
    { id: 5, text: 'Choose the correct sentence:', options: ['She is taller than me', 'She is more taller than me', 'She is tallest than me', 'She is tall than me'], correct: 0 },
    { id: 6, text: 'What is an antonym for "difficult"?', options: ['Easy', 'Hard', 'Complex', 'Tough'], correct: 0 },
    { id: 7, text: 'Identify the noun: "The dog barks loudly"', options: ['dog', 'barks', 'loudly', 'the'], correct: 0 },
    { id: 8, text: 'Which word is an adjective?', options: ['Beautiful', 'Run', 'Quickly', 'Jump'], correct: 0 },
    { id: 9, text: 'Choose the correct past tense:', options: ['Went', 'Goed', 'Gone', 'Going'], correct: 0 },
    { id: 10, text: 'What is a pronoun?', options: ['He', 'Table', 'Run', 'Happy'], correct: 0 },
    { id: 11, text: 'Identify the adverb: "She sings beautifully"', options: ['beautifully', 'sings', 'she', 'none'], correct: 0 },
    { id: 12, text: 'Which is a preposition?', options: ['Under', 'Jump', 'Happy', 'Quickly'], correct: 0 },
    { id: 13, text: 'Choose the correct article:', options: ['An apple', 'A apple', 'The apples', 'Some apple'], correct: 0 },
    { id: 14, text: 'What is a conjunction?', options: ['And', 'Run', 'Happy', 'Table'], correct: 0 },
    { id: 15, text: 'Identify the interjection:', options: ['Wow!', 'Run', 'Happy', 'Table'], correct: 0 },
    { id: 16, text: 'Which sentence is in passive voice?', options: ['The ball was thrown', 'He throws the ball', 'She is throwing', 'They throw'], correct: 0 },
    { id: 17, text: 'What is a compound word?', options: ['Sunflower', 'Sun', 'Flower', 'Light'], correct: 0 },
    { id: 18, text: 'Choose the correct comparative:', options: ['Better', 'More good', 'Gooder', 'Best'], correct: 0 },
    { id: 19, text: 'What is a homophone of "there"?', options: ['Their', 'Where', 'Here', 'Were'], correct: 0 },
    { id: 20, text: 'Identify the subject: "The cat sleeps"', options: ['cat', 'sleeps', 'the', 'none'], correct: 0 },
    { id: 21, text: 'Which is a proper noun?', options: ['London', 'city', 'country', 'place'], correct: 0 },
    { id: 22, text: 'Choose the correct superlative:', options: ['Fastest', 'More fast', 'Faster', 'Most fast'], correct: 0 },
    { id: 23, text: 'What is a collective noun?', options: ['Team', 'Player', 'Game', 'Ball'], correct: 0 },
    { id: 24, text: 'Identify the object: "She reads books"', options: ['books', 'reads', 'she', 'none'], correct: 0 },
    { id: 25, text: 'Which is an abstract noun?', options: ['Love', 'Table', 'Chair', 'Book'], correct: 0 },
    { id: 26, text: 'Choose the correct possessive:', options: ['John\'s', 'Johns', 'Johns\'', 'John'], correct: 0 },
    { id: 27, text: 'What is a gerund?', options: ['Swimming', 'Swim', 'Swam', 'Swims'], correct: 0 },
    { id: 28, text: 'Identify the infinitive:', options: ['To run', 'Running', 'Ran', 'Runs'], correct: 0 },
    { id: 29, text: 'Which is a modal verb?', options: ['Can', 'Run', 'Jump', 'Walk'], correct: 0 },
    { id: 30, text: 'Choose the correct tense: "I ___ there yesterday"', options: ['was', 'am', 'will be', 'have been'], correct: 0 },
    { id: 31, text: 'What is a clause?', options: ['A group of words with subject and verb', 'A single word', 'A phrase', 'A sentence'], correct: 0 },
    { id: 32, text: 'Identify the phrase: "in the morning"', options: ['Prepositional phrase', 'Noun phrase', 'Verb phrase', 'Adjective phrase'], correct: 0 },
    { id: 33, text: 'Which is a linking verb?', options: ['Is', 'Run', 'Jump', 'Eat'], correct: 0 },
    { id: 34, text: 'Choose the correct form: "Neither John ___ Mary"', options: ['nor', 'or', 'and', 'but'], correct: 0 },
    { id: 35, text: 'What is an idiom?', options: ['A phrase with figurative meaning', 'A literal phrase', 'A word', 'A sentence'], correct: 0 },
    { id: 36, text: 'Identify the metaphor:', options: ['Time is money', 'He runs fast', 'She is tall', 'The sky is blue'], correct: 0 },
    { id: 37, text: 'Which is a simile?', options: ['As brave as a lion', 'He is brave', 'She runs', 'They jump'], correct: 0 },
    { id: 38, text: 'Choose the correct punctuation:', options: ['Hello, how are you?', 'Hello how are you', 'Hello; how are you', 'Hello: how are you'], correct: 0 },
    { id: 39, text: 'What is alliteration?', options: ['Repetition of initial sounds', 'Rhyming words', 'Similar meanings', 'Opposite meanings'], correct: 0 },
    { id: 40, text: 'Identify the onomatopoeia:', options: ['Buzz', 'Run', 'Happy', 'Table'], correct: 0 },
    { id: 41, text: 'Which is personification?', options: ['The wind whispered', 'The wind blew', 'It was windy', 'Wind is air'], correct: 0 },
    { id: 42, text: 'Choose the correct spelling:', options: ['Definitely', 'Definately', 'Definetly', 'Definitly'], correct: 0 },
    { id: 43, text: 'What is hyperbole?', options: ['Exaggeration', 'Understatement', 'Literal meaning', 'Comparison'], correct: 0 },
    { id: 44, text: 'Identify the oxymoron:', options: ['Bittersweet', 'Sweet', 'Bitter', 'Sour'], correct: 0 },
    { id: 45, text: 'Which is a palindrome?', options: ['Racecar', 'Car', 'Race', 'Speed'], correct: 0 },
    { id: 46, text: 'Choose the correct prefix:', options: ['Unhappy', 'Happyun', 'Happyness', 'Happier'], correct: 0 },
    { id: 47, text: 'What is a suffix?', options: ['Letters added at the end', 'Letters at the start', 'Middle letters', 'All letters'], correct: 0 },
    { id: 48, text: 'Identify the root word in "unhappiness":', options: ['happy', 'unhappy', 'happiness', 'ness'], correct: 0 },
    { id: 49, text: 'Which is a synonym for "big"?', options: ['Large', 'Small', 'Tiny', 'Little'], correct: 0 },
    { id: 50, text: 'Choose the correct contraction:', options: ['Don\'t', 'Dont', 'Do\'nt', 'Donot'], correct: 0 }
  ],
  mathematics: [
    { id: 1, text: 'What is 15% of 200?', options: ['30', '25', '35', '20'], correct: 0 },
    { id: 2, text: 'Solve: 2x + 5 = 15', options: ['x = 5', 'x = 10', 'x = 7.5', 'x = 2.5'], correct: 0 },
    { id: 3, text: 'What is the area of a circle with radius 7cm?', options: ['154 cm²', '44 cm²', '22 cm²', '308 cm²'], correct: 0 },
    { id: 4, text: 'The sum of angles in a triangle is:', options: ['180°', '360°', '90°', '270°'], correct: 0 },
    { id: 5, text: 'What is the square root of 144?', options: ['12', '14', '10', '16'], correct: 0 }
  ],
  physics: [
    { id: 1, text: 'What is the SI unit of force?', options: ['Newton', 'Joule', 'Watt', 'Pascal'], correct: 0 },
    { id: 2, text: 'The acceleration due to gravity is approximately:', options: ['9.8 m/s²', '10 m/s²', '8.9 m/s²', '11 m/s²'], correct: 0 },
    { id: 3, text: 'Which law states that for every action there is an equal and opposite reaction?', options: ['First Law', 'Second Law', 'Third Law', 'Law of Gravitation'], correct: 2 },
    { id: 4, text: 'What is the formula for kinetic energy?', options: ['mgh', '½mv²', 'mv', 'F×d'], correct: 1 },
    { id: 5, text: 'The speed of light in vacuum is:', options: ['3×10⁸ m/s', '3×10⁶ m/s', '3×10⁷ m/s', '3×10⁹ m/s'], correct: 0 }
  ],
  chemistry: [
    { id: 1, text: 'What is the atomic number of Carbon?', options: ['6', '12', '8', '14'], correct: 0 },
    { id: 2, text: 'Which gas is most abundant in Earth atmosphere?', options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'], correct: 2 },
    { id: 3, text: 'What is the pH of pure water?', options: ['7', '0', '14', '1'], correct: 0 },
    { id: 4, text: 'The chemical formula for water is:', options: ['H₂O', 'CO₂', 'O₂', 'H₂SO₄'], correct: 0 },
    { id: 5, text: 'Which element has the symbol Fe?', options: ['Fluorine', 'Iron', 'Francium', 'Fermium'], correct: 1 }
  ],
  biology: [
    { id: 1, text: 'Which of the following processes in a flowering plant requires a high amount of energy from ATP to move substances against a concentration gradient?', options: ['Simple diffusion of oxygen through the stomata', 'Active transport of mineral ions into the root hair cells', 'Osmosis of water from the soil into the roots', 'Transpiration of water vapor from the leaves'], correct: 1 },
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

const subjectIcons = {
  biology: 'biotech',
  chemistry: 'science',
  physics: 'bolt',
  english: 'translate',
  mathematics: 'calculate',
  economics: 'trending_up'
};

export function MockExamPage() {
  const navigate = useNavigate();
  const { examId, subjectId } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  
  // Get question count from sessionStorage (default 40)
  const questionCount = parseInt(sessionStorage.getItem('questionCount') || '40');
  // Calculate time: questionCount * 1.125 minutes converted to seconds
  const examTime = Math.floor(questionCount * 1.125 * 60);
  const [timeLeft, setTimeLeft] = useState(examTime);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const allQuestions = mockQuestions[subjectId] || mockQuestions.biology;
  // Limit questions to selected count
  const questions = allQuestions.slice(0, questionCount);
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / totalQuestions) * 100;

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
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (optionIndex) => {
    setAnswers(prev => ({ ...prev, [questions[currentQuestion].id]: optionIndex }));
  };

  const handleSubmit = () => {
    const score = questions.reduce((acc, q) => {
      return acc + (answers[q.id] === q.correct ? 1 : 0);
    }, 0);
    
    alert(`Exam Submitted!\n\nScore: ${score}/${totalQuestions}\nPercentage: ${((score/totalQuestions)*100).toFixed(1)}%`);
    navigate(`/${examId}/${subjectId}`);
  };

  const goToQuestion = (index) => {
    setCurrentQuestion(index);
  };

  const currentAnswer = answers[questions[currentQuestion].id];

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-primary/10 z-[60]">
        <motion.div 
          className="h-full bg-primary transition-all duration-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <Icon name="auto_stories" className="text-2xl" />
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-primary leading-none uppercase">{examId}</h1>
              <p className="text-[10px] uppercase tracking-widest text-primary/60 font-semibold">Live Mock Exam</p>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex flex-col items-center">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-tighter">Time Remaining</span>
              <div className="flex items-center gap-1.5 text-primary font-bold text-2xl tracking-tight">
                <Icon name="timer" className="text-xl" />
                <span>{formatTime(timeLeft)}</span>
              </div>
            </div>
            
            <div className="h-10 w-[1px] bg-slate-200 dark:bg-slate-700 hidden sm:block" />
            
            <div className="hidden sm:flex flex-col items-center">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-tighter">Current Progress</span>
              <div className="text-slate-800 dark:text-white font-bold text-2xl">
                {answeredCount} <span className="text-slate-400 font-normal">/ {totalQuestions}</span>
              </div>
            </div>
          </div>

          <Button 
            onClick={() => setShowSubmitModal(true)}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 px-6 rounded-lg shadow-lg shadow-red-200 dark:shadow-none transition-all flex items-center gap-2"
          >
            <span>Submit</span>
            <Icon name="send" className="text-sm" />
          </Button>
        </div>
      </header>

      {/* Main Exam Area */}
      <main className="flex-grow flex items-center justify-center p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl w-full bg-white dark:bg-slate-900/50 rounded-xl shadow-xl shadow-primary/5 p-8 md:p-12 border border-slate-100 dark:border-slate-800"
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold uppercase tracking-wide capitalize">
                {subjectId}
              </span>
              <span className="text-slate-400 text-sm">•</span>
              <span className="text-slate-400 text-sm font-medium">
                Question {currentQuestion + 1} of {totalQuestions}
              </span>
            </div>

            <div className="mb-10">
              <h2 className="text-xl md:text-2xl font-medium leading-relaxed text-slate-800 dark:text-slate-100">
                {questions[currentQuestion].text}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {questions[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={`group flex items-center text-left p-5 border-2 rounded-xl transition-all ${
                    currentAnswer === index
                      ? 'border-primary bg-primary/5 dark:bg-primary/10 shadow-md'
                      : 'border-slate-100 dark:border-slate-800 hover:border-primary/50 bg-slate-50/30 dark:bg-slate-800/20'
                  }`}
                >
                  <span className={`w-10 h-10 flex items-center justify-center rounded-lg font-bold mr-4 transition-colors ${
                    currentAnswer === index
                      ? 'bg-primary text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:bg-primary/10 group-hover:text-primary'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className={`text-lg ${
                    currentAnswer === index
                      ? 'text-slate-900 dark:text-white font-semibold'
                      : 'text-slate-700 dark:text-slate-300'
                  }`}>
                    {option}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <footer className="sticky bottom-0 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 p-4 shadow-2xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Button
            onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Icon name="chevron_left" />
            <span>Previous</span>
          </Button>

          <button className="flex flex-col items-center gap-1 group">
            <div className="flex items-center gap-1.5 px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 group-hover:bg-primary/10 transition-colors">
              <Icon name="apps" className="text-slate-600 dark:text-slate-400 group-hover:text-primary" />
              <span className="font-bold text-slate-700 dark:text-slate-300 group-hover:text-primary">Question Grid</span>
            </div>
          </button>

          <Button
            onClick={() => setCurrentQuestion(prev => Math.min(totalQuestions - 1, prev + 1))}
            disabled={currentQuestion === totalQuestions - 1}
            className="flex items-center gap-2 px-8 py-3 rounded-lg font-bold bg-primary text-white shadow-lg shadow-primary/30 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Next Question</span>
            <Icon name="chevron_right" />
          </Button>
        </div>
      </footer>

      {/* Live Session Widget */}
      <div className="fixed right-6 bottom-24 hidden lg:block">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 shadow-xl max-w-[200px]"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Live Session</span>
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-snug">
            You have answered <span className="text-primary font-bold">{answeredCount}</span> of {totalQuestions} questions in the current section.
          </p>
        </motion.div>
      </div>

      {/* Submit Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-8 max-w-md w-full"
          >
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Submit Exam?</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              You have answered {answeredCount} out of {totalQuestions} questions. 
              {answeredCount < totalQuestions && ` ${totalQuestions - answeredCount} questions remain unanswered.`}
            </p>
            <div className="flex gap-4">
              <Button 
                onClick={() => setShowSubmitModal(false)} 
                className="flex-1 px-6 py-3 rounded-lg font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Continue Exam
              </Button>
              <Button 
                onClick={handleSubmit}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all"
              >
                Submit Now
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
