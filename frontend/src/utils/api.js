// src/utils/api.js
const API_KEY = 'a6ebdfb4f60a0384b30d95e2e942979d';
const BASE_URL = 'https://api.themoviedb.org/3';

export const searchMovies = async (query) => {
  try {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
};
