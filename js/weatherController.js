import { WeatherService } from "./weatherService.js";
import { CacheService } from "./cacheService.js";
import { WeatherView } from "./weatherView.js";
import { ErrorMessages, UI_CONFIG } from "./config.js";

export class WeatherController {
  #view;
  #weatherService;
  #cacheService;

  constructor() {
    this.#view = new WeatherView();
    this.#weatherService = new WeatherService();
    this.#cacheService = new CacheService();
  }

  init() {
    this.#setupEventListeners();
    this.#setupNetworkListeners();
  }

  // ─── Private ─────────────────────────────────────
  #setupEventListeners() {
    document
      .getElementById("searchBtn")
      .addEventListener("click", () => this.#handleSearch());

    document.getElementById("cityInput").addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        this.#handleSearch();
      }
    });
  }

  #setupNetworkListeners() {
    window.addEventListener("offline", () => {
      this.#view.showMessage(ErrorMessages.NO_CONNECTION, "error");
    });
    window.addEventListener("online", () => {
      this.#view.showMessage("Back online", "success");
    });
  }

  async #handleSearch() {
    if (!navigator.onLine) {
      this.#view.showMessage(ErrorMessages.NO_CONNECTION, "error");
      return;
    }

    const cityName = this.#view.getCityInput();

    if (!this.#isValidCity(cityName)) {
      this.#view.showMessage(ErrorMessages.INVALID_INPUT, "warning");
      return;
    }

    const cached = this.#cacheService.get(cityName);
    if (cached) {
      this.#view.displayWeather(cached);
      return;
    }

    this.#view.showLoading();

    try {
      const data = await this.#weatherService.fetchWeather(cityName);
      this.#cacheService.set(cityName, data);
      this.#view.displayWeather(data);
      this.#view.clearCityInput();
    } catch (error) {
      this.#view.showMessage(error.message, "error");
    }
  }

  #isValidCity(cityName) {
    return cityName.length > 0 && cityName.length <= UI_CONFIG.MAX_CITY_LENGTH;
  }
}
