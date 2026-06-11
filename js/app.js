import { WeatherController } from "./weatherController.js";

try {
  new WeatherController().init();
} catch (error) {
  console.error("App initialization failed:", error);
}
