// API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Generic fetch wrapper with error handling
const fetchAPI = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Example API methods
export const api = {
  // Fetch all subjects
  getSubjects: () => fetchAPI('/api/subjects'),
  
  // Fetch questions for a subject
  getQuestions: (exam, year, subject, page = 1) => 
    fetchAPI(`/api/questions?exam=${exam}&year=${year}&subject=${subject}&page=${page}`),
  
  // Submit answer
  submitAnswer: (questionId, answer) => 
    fetchAPI('/api/answers', {
      method: 'POST',
      body: JSON.stringify({ questionId, answer }),
    }),
  
  // Get leaderboard
  getLeaderboard: () => fetchAPI('/api/leaderboard'),
  
  // Get user stats
  getUserStats: (userId) => fetchAPI(`/api/users/${userId}/stats`),
};
