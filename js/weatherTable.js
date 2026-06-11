import { getWeatherIcon } from "./utils.js";

export class WeatherTable {
  create(data) {
    const table = this.#createTable();
    const tbody = table.querySelector("tbody");

    data.forEach((city) => {
      tbody.appendChild(this.#createRow(city));
    });

    return table;
  }

  // Private
  #createTable() {
    const table = document.createElement("table");
    table.innerHTML = `
      <thead>
        <tr>
          <th>City Name</th>
          <th>Temperature</th>
          <th>Humidity</th>
          <th>Condition</th>
          <th>Weather Icon</th>
        </tr>
      </thead>
      <tbody></tbody>
    `;
    return table;
  }

  #createRow(city) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${this.#extract(city.name)}</td>
      <td>${this.#extract(city.main?.temp)}°C</td>
      <td>${this.#extract(city.main?.humidity)}%</td>
      <td>${this.#extract(city.weather?.[0]?.main)}</td>
      <td>${getWeatherIcon(city.weather?.[0]?.main)}</td>
    `;
    return row;
  }

  #extract(value) {
    return value !== undefined && value !== null ? value : "N/A";
  }
}
