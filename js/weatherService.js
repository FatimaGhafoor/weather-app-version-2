  import {CONFIG} from "./config.js";
  import { handleResponseError } from "./errorHandler.js";

  let currentRequest = null;

  export async function fetchWeather(cityName) {
    if (currentRequest) {
      currentRequest.abort();
    }

    const controller = new AbortController();
    currentRequest = controller;

    const response = await fetch(
      `${CONFIG.API_URL}?q=${cityName}&appid=${CONFIG.API_KEY}&units=${CONFIG.UNIT}`,
      { signal: controller.signal },
    );

    if (!response.ok) {
      throw handleResponseError(response);
    }
    return await response.json();
  };

  
