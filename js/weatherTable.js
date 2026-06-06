import { getWeatherIcon } from "./utils.js";

export function createWeatherTable(data) {
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

  const tbody = table.querySelector("tbody");

  data.forEach((city) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${city.name}</td>
      <td>${city.main.temp}</td>
      <td>${city.main.humidity}</td>
      <td>${city.weather[0].main}</td>
      <td>${getWeatherIcon(city.weather[0].main)}</td>
    `;
    tbody.appendChild(row);
  });

  return table;
}
