import { WeatherTable } from "./weatherTable.js";

export class WeatherView {
  #cityInput;
  #searchBtn;
  #resultDiv;
  #weatherTable;

  constructor() {
    this.#validateDOM();
    this.#weatherTable = new WeatherTable();
  }

  //  Public
  showLoading() {
    this.#resultDiv.innerHTML = "<p>Loading...</p>";
  }

  showMessage(message, type = "info") {
    this.#resultDiv.innerHTML = `<p class="message message--${type}">${message}</p>`;
  }

  displayWeather(data) {
    const table = this.#weatherTable.create([data]);
    this.#resultDiv.innerHTML = "";
    this.#resultDiv.appendChild(table);
  }

  clear() {
    this.#resultDiv.innerHTML = "";
  }

  getCityInput() {
    return this.#cityInput.value.trim();
  }

  clearCityInput() {
    this.#cityInput.value = "";
  }

  // Private 
  #validateDOM() {
    this.#cityInput = document.getElementById("cityInput");
    this.#searchBtn = document.getElementById("searchBtn");
    this.#resultDiv = document.getElementById("result");

    if (!this.#cityInput || !this.#searchBtn || !this.#resultDiv) {
      throw new Error("Required DOM element is missing");
    }
  }
}
