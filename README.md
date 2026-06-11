# 🌤️ Weather App

A JavaScript weather application that fetches real-time weather data using the [OpenWeatherMap API](https://openweathermap.org/api).

This project exists in two versions — each representing a distinct architectural approach.

---

## 📌 Versions

| Version | Architecture                    | Structure                           |
| ------- | ------------------------------- | ----------------------------------- |
| **v1**  | Class-based, single file        | All logic in one `WeatherApp` class |
| **v2**  | Modular, separation of concerns | Each responsibility in its own file |

---

## 🏗️ v2 Architecture — Separation of Concerns

Every file owns exactly one responsibility. Nothing more.

```
config.js               → Constants, API config, error messages
cacheService.js         → Cache reads, writes, expiry, size limit
errorHandler.js         → HTTP error mapping, runtime error handling
weatherService.js       → API fetch, AbortController, URL building
weatherTable.js         → DOM table creation, row building, icons
weatherView.js          → DOM updates, messages, input management
weatherController.js    → Orchestrates all services, event listeners
app.js                  → Entry point only — boots the controller
```

### Dependency Tree

```
config.js
   ├── cacheService.js
   ├── errorHandler.js
   └── weatherService.js
         └── weatherTable.js
               └── weatherView.js
                     └── weatherController.js
                               └── app.js
```

Each file only imports from files below it in the tree. No circular dependencies.

---

## 🔑 Key Concepts Applied

### 1. Private Class Fields `#`

Internal state is hidden behind a controlled interface. Nothing outside a class can read or mutate its private fields directly.

```js
class CacheService {
  #cache = new Map();  // inaccessible from outside
  #duration;

  get(key) { ... }    // controlled access only
}
```

### 2. Constructor Injection

Dependencies and configuration are passed in at construction time — not hardcoded inside the class. This makes each class independently configurable and testable.

```js
const cache = new CacheService(CACHE_CONFIG.DURATION);
```

### 3. Lookup Objects Over if/else Chains

Repetitive conditionals are replaced with data structures — easier to read and extend.

```js
const STATUS_ERRORS = {
  404: ErrorMessages.NOT_FOUND,
  429: ErrorMessages.RATE_LIMITED,
  500: ErrorMessages.SERVER_ERROR,
};
```

### 4. Immutable Configuration

All config objects are frozen at runtime — preventing accidental mutation.

```js
export const API_CONFIG = Object.freeze({
  BASE_URL: "https://api.openweathermap.org/data/2.5/weather",
  UNIT: "metric",
});
```

### 5. Bounded Cache with Eviction

The cache has a hard size limit. When full, the oldest entry is evicted automatically — preventing memory leaks in long sessions.

```js
if (this.#cache.size >= this.#maxSize) {
  const oldestKey = this.#cache.keys().next().value;
  this.#cache.delete(oldestKey);
}
```

### 6. Safe API Data Handling

Raw API responses are never trusted directly. Optional chaining and fallback values protect the UI from silent crashes.

```js
#extract(value) {
  return value !== undefined && value !== null ? value : "N/A";
}
```

---

## 📁 File Structure

```
weather-app/
├── index.html
├── style.css
└── js/
    ├── app.js
    ├── config.js
    ├── cacheService.js
    ├── errorHandler.js
    ├── weatherService.js
    ├── weatherTable.js
    ├── weatherView.js
    └── weatherController.js
```

---

## 🚀 Getting Started

1. Clone the repository

   ```bash
   git clone https://github.com/your-username/weather-app.git
   ```

2. Add your API key in `config.js`

   ```js
   KEY: "your_openweathermap_api_key";
   ```

3. Open `index.html` in your browser — no build step required.

> ⚠️ Never commit your API key to a public repository.

---

## 🌐 Features

- Real-time weather search by city name
- In-memory cache with configurable duration and size limit
- Automatic cache eviction (oldest-first)
- AbortController — cancels pending requests on new search
- Online/offline network detection
- Graceful error handling for 404, 429, and 500 responses

---

## 📖 What Changed from v1 to v2

| Concern         | v1                                   | v2                                |
| --------------- | ------------------------------------ | --------------------------------- |
| Configuration   | Inline in class                      | `config.js`                       |
| Caching         | Private method in `WeatherApp`       | `CacheService` class              |
| Error handling  | Inline conditionals                  | `errorHandler.js` with lookup map |
| API calls       | Mixed with controller logic          | `WeatherService` class            |
| Table rendering | Mixed with display logic             | `WeatherTable` class              |
| DOM updates     | Mixed with business logic            | `WeatherView` class               |
| Orchestration   | Single `WeatherApp` class            | `WeatherController` class         |
| Entry point     | `new WeatherApp()` at bottom of file | `app.js` — 3 lines                |

---

## 🛠️ Built With

- Vanilla JavaScript (ES2022)
- ES Modules (`import`/`export`)
- OpenWeatherMap API
