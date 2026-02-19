// Question Manager Service
// Handles loading questions from JSON and tracking used questions

class QuestionManager {
  constructor() {
    this.questions = null;
    this.usedQuestions = this.loadUsedQuestions();
  }

  // Load used questions from localStorage
  loadUsedQuestions() {
    const stored = localStorage.getItem('usedQuestions');
    return stored ? JSON.parse(stored) : {};
  }

  // Save used questions to localStorage
  saveUsedQuestions() {
    localStorage.setItem('usedQuestions', JSON.stringify(this.usedQuestions));
  }

  // Load questions from JSON file
  async loadQuestions() {
    if (this.questions) return this.questions;
    
    try {
      const response = await fetch('/questionsdata/JAMB_FINAL_PART_2024_2025 (1).json');
      this.questions = await response.json();
      return this.questions;
    } catch (error) {
      console.error('Error loading questions:', error);
      return [];
    }
  }

  // Get questions for a specific subject
  async getQuestionsForSubject(subjectName, count = 40) {
    await this.loadQuestions();
    
    // Find subject data (case-insensitive match)
    const subjectData = this.questions.find(item => 
      item.subject.toLowerCase() === subjectName.toLowerCase()
    );

    if (!subjectData || !subjectData.questions) {
      console.error(`No questions found for subject: ${subjectName}`);
      return [];
    }

    const allQuestions = subjectData.questions;
    const subjectKey = subjectName.toLowerCase();

    // Initialize used questions for this subject if not exists
    if (!this.usedQuestions[subjectKey]) {
      this.usedQuestions[subjectKey] = [];
    }

    // Get unused questions
    const unusedQuestions = allQuestions.filter(q => 
      !this.usedQuestions[subjectKey].includes(q.id)
    );

    // If we don't have enough unused questions, reset the pool
    if (unusedQuestions.length < count) {
      console.log(`Resetting question pool for ${subjectName}`);
      this.usedQuestions[subjectKey] = [];
      return this.getQuestionsForSubject(subjectName, count);
    }

    // Shuffle and select questions
    const shuffled = this.shuffleArray([...unusedQuestions]);
    const selected = shuffled.slice(0, count);

    // Mark these questions as used
    selected.forEach(q => {
      this.usedQuestions[subjectKey].push(q.id);
    });

    this.saveUsedQuestions();

    // Transform to match our app format
    return selected.map(q => ({
      id: q.id,
      text: q.question,
      options: [q.options.A, q.options.B, q.options.C, q.options.D],
      correct: ['A', 'B', 'C', 'D'].indexOf(q.correct_answer),
      explanation: q.explanation
    }));
  }

  // Shuffle array using Fisher-Yates algorithm
  shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // Reset used questions for a subject
  resetSubject(subjectName) {
    const subjectKey = subjectName.toLowerCase();
    if (this.usedQuestions[subjectKey]) {
      this.usedQuestions[subjectKey] = [];
      this.saveUsedQuestions();
    }
  }

  // Reset all used questions
  resetAll() {
    this.usedQuestions = {};
    localStorage.removeItem('usedQuestions');
  }
}

export const questionManager = new QuestionManager();
