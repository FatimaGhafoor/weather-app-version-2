import { CACHE_CONFIG } from "./config.js";

export class CacheService {
  #cache = new Map();
  #duration;
  #maxSize;

  constructor(
    duration = CACHE_CONFIG.DURATION,
    maxSize = CACHE_CONFIG.MAX_SIZE,
  ) {
    this.#duration = duration;
    this.#maxSize = maxSize;
  }

  set(key, data) {
    if (this.#cache.size >= this.#maxSize) {
      const oldestKey = this.#cache.keys().next().value;
      this.#cache.delete(oldestKey);
    }
    this.#cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  get(key) {
    const cached = this.#cache.get(key);

    if (!cached) return null;

    if (this.#isExpired(cached.timestamp)) {
      this.#cache.delete(key);
      return null;
    }
    return cached.data;
  }

  has(key) {
    return this.get(key) !== null;
  }

  clear() {
    this.#cache.clear();
  }

  // Private 
  #isExpired(timestamp) {
    return Date.now() - timestamp > this.#duration;
  }
}
