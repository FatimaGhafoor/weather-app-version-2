import { getCache, setCache } from "./cacheService.js";

export function createWeatherController({
  elements,
  services,
  view,
  config,
  messages,
}) {
  const { cityInput, searchBtn, resultDiv } = elements;

  const { fetchWeather } = services;

  const {
    showMessage,
    showLoading,
    displayWeather,
  } = view;

  function setupEventListeners() {
    searchBtn.addEventListener("click", handleSearch);

    cityInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSearch();
      }
    });
  }

  async function handleSearch() {
    if (!navigator.onLine) {
      showMessage(resultDiv, messages.NO_CONNECTION, "error");
      return;
    }

    const cityName = cityInput.value.trim();

    if (!cityName || cityName.length > 100) {
      showMessage(resultDiv, "Enter valid city", "warning");
      return;
    }

    const cachedData = getCache(
      cityName,
      config.CACHE_DURATION
    );

    if (cachedData) {
      displayWeather(resultDiv, cachedData);
      return;
    }

    showLoading(resultDiv);

    try {
      const data = await fetchWeather(cityName);

      setCache(cityName, data);

      displayWeather(resultDiv, data);

      cityInput.value = "";
    } catch (error) {
      showMessage(resultDiv, error.message, "error");
    }
  }

  return {
    setupEventListeners,
  };
}