export function getWeatherIcon(condition) {
  const icons = {
    Rain: "🌧️",
    Clouds: "☁️",
    Clear: "☀️",
    Snow: "❄️",
    Thunderstorm: "⛈️",
  };
  return icons[condition] || "🌡️";
}
