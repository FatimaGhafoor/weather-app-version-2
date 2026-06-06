export const CONFIG = {
  API_URL: "https://api.openweathermap.org/data/2.5/weather",
  API_KEY: "f00c38e0279b7bc85480c3fe775d518c",
  UNIT: "metric",
  CACHE_DURATION: 5 * 60 * 1000,
  SEARCH_DEBOUNCE: 300,
};

export const ErrorMessages = {
  EMPTY_INPUT: "Please enter a city",
  INVALID_INPUT: "City name must be 1-100 characters",
  NOT_FOUND: "City not found. Please check the spelling.",
  NO_CONNECTION: "No internet connection",
  RATE_LIMITED: "Too many requests. Please wait a moment.",
  SERVER_ERROR: "Server error. Please try again later.",
  UNKNOWN_ERROR: "An unexpected error occurred",
};

