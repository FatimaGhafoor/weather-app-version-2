import { API_CONFIG } from "./config.js";
import { handleResponseError } from "./errorHandler.js";

export class WeatherService {
  #currentRequest = null;

  async fetchWeather(cityName) {
    this.#abortPending();

    const controller = new AbortController();
    this.#currentRequest = controller;

    try {
      const response = await fetch(this.#buildURL(cityName), {
        signal: controller.signal,
      });

      if (!response.ok) {
        throw handleResponseError(response);
      }

      return await response.json();
    } catch (error) {
      throw error; 
    }
  }

  //  Private 
  #abortPending() {
    if (this.#currentRequest) {
      this.#currentRequest.abort();
    }
  }

  #buildURL(cityName) {
    return `${API_CONFIG.BASE_URL}?q=${cityName}&appid=${API_CONFIG.KEY}&units=${API_CONFIG.UNIT}`;
  }
}
