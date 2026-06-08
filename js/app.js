import { createWeatherController } from "./weatherController.js";
import { fetchWeather } from "./weatherService.js";
import {
  getDOMElements,
  showMessage,
  showLoading,
  displayWeather,
} from "./weatherView.js";
import { getCache, setCache } from "./cacheService.js";
import { CONFIG } from "./config.js";

const elements = getDOMElements();

const services = {
  fetchWeather,
  cache: { get: getCache, set: setCache },
};

const view = {
  showMessage,
  showLoading,
  displayWeather,
};

const controller = createWeatherController({
  elements,
  services,
  view,
  config: CONFIG,
});

controller.setupEventListeners();
controller.setupNetworkListeners();
