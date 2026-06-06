export function createWeatherController({ elements, services, view, config }) {
  const { cityInput, searchBtn, resultDiv } = elements;
  const { fetchWeather, cache } = services;
  const { showMessage, showLoading, displayWeather } = view;

  function setupEventListeners() {
    searchBtn.addEventListener("click", handleSearch);

    cityInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSearch();
      }
    });
  }

  function setupNetworkListeners() {
    window.addEventListener("offline", () => {
      showMessage("No internet connection", "error");
    });

    window.addEventListener("online", () => {
      showMessage("Back Online", "success");
    });
  }

  async function handleSearch() {
    if (!navigator.onLine) {
      showMessage("No internet connection", "error");
      return;
    }

    const cityName = cityInput.value.trim();

    if (!cityName || cityName.length > 100) {
      showMessage("Enter a valid city name", "warning");
      return;
    }

    const cached = cache.get(cityName);
    const now = Date.now();

    if (cached && now - cached.timestamp < config.CACHE_DURATION) {
      displayWeather(cached.data);
      return;
    }

    showLoading();

    try {
      const data = await fetchWeather(cityName);
      cache.set(cityName, data);
      displayWeather(data);
      cityInput.value = "";
    } catch (error) {
      showMessage(error.message, "error");
    }
  }

  return {
    setupEventListeners,
    setupNetworkListeners,
  };
}
