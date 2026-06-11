const WEATHER_ICONS = Object.freeze({
  Rain: "🌧️",
  Clouds: "☁️",
  Clear: "☀️",
  Snow: "❄️",
  Thunderstorm: "⛈️",
});

export function getWeatherIcon(condition) {
  return WEATHER_ICONS[condition] || "🌡️";
}
