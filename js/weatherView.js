export function getDOMElements() {
  const cityInput = document.getElementById("cityInput");
  const searchBtn = document.getElementById("searchBtn");
  const resultDiv = document.getElementById("result");

  if (!cityInput || !searchBtn || !resultDiv) {
    throw new Error("Required DOM element is missing");
  }

  return { cityInput, searchBtn, resultDiv };
}

export function showLoading(resultDiv) {
  resultDiv.innerHTML = "<p>Loading...</p>";
}

export function showMessage(resultDiv, message, type = "info") {
  const colors = {
    error: "red",
    warning: "orange",
    success: "green",
    info: "blue",
  };
  resultDiv.innerHTML = `<p style="color: ${colors[type]};">${message}</p>`;
}

export function displayWeather(resultDiv, data, createWeatherTable) {
  const table = createWeatherTable([data]);
  resultDiv.innerHTML = "";
  resultDiv.appendChild(table);
}
