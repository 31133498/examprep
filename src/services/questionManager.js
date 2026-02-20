// Question Manager Service
// Handles loading questions from JSON and tracking used questions

class QuestionManager {
  constructor() {
    this.questions = null;
    this.usedQuestions = this.loadUsedQuestions();
    // Map subject slugs to JSON subject names
    this.subjectMap = {
      'english': 'Use of English',
      'mathematics': 'Mathematics',
      'physics': 'Physics',
      'biology': 'Biology',
      'chemistry': 'Chemistry',
      'economics': 'Economics'
    };
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
      const response = await fetch('/questionsdata/JAMB_QUESTIONS_2005_2025 (1).json');
      this.questions = await response.json();
      return this.questions;
    } catch (error) {
      console.error('Error loading questions:', error);
      return [];
    }
  }

  // Get questions for a specific subject
  async getQuestionsForSubject(subjectSlug, count = 40) {
    await this.loadQuestions();
    
    // Map slug to actual subject name in JSON
    const subjectName = this.subjectMap[subjectSlug.toLowerCase()] || subjectSlug;
    
    // Find ALL entries for this subject (across all years)
    const subjectEntries = this.questions.filter(item => 
      item.subject === subjectName
    );

    if (!subjectEntries.length) {
      console.error(`No questions found for subject: ${subjectSlug} (mapped to: ${subjectName})`);
      return [];
    }

    // Combine all questions from all years
    const allQuestions = [];
    subjectEntries.forEach(entry => {
      if (entry.questions && Array.isArray(entry.questions)) {
        allQuestions.push(...entry.questions);
      }
    });

    if (!allQuestions.length) {
      console.error(`No questions array found for subject: ${subjectName}`);
      return [];
    }

    const subjectKey = subjectSlug.toLowerCase();

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
      console.log(`Resetting question pool for ${subjectSlug}`);
      this.usedQuestions[subjectKey] = [];
      return this.getQuestionsForSubject(subjectSlug, count);
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
