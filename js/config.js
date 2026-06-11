// API
const MINUTES = 60 * 1000;

export const API_CONFIG = Object.freeze({
  BASE_URL: "https://api.openweathermap.org/data/2.5/weather",
  KEY: "f00c38e0279b7bc85480c3fe775d518c",
  UNIT: "metric",
});

// Cache
export const CACHE_CONFIG = Object.freeze({
  DURATION: 5 * MINUTES,
  MAX_SIZE: 50,
});

// UI
export const UI_CONFIG = Object.freeze({
  SEARCH_DEBOUNCE: 300,
  MAX_CITY_LENGTH: 100,
});

// Error Messages
export const ErrorMessages = Object.freeze({
  EMPTY_INPUT: "Please enter a city",
  INVALID_INPUT: "City name must be 1-100 characters",
  NOT_FOUND: "City not found. Please check the spelling.",
  NO_CONNECTION: "No internet connection",
  RATE_LIMITED: "Too many requests. Please wait a moment.",
  SERVER_ERROR: "Server error. Please try again later.",
  UNKNOWN_ERROR: "An unexpected error occurred",
});
