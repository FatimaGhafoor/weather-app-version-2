const cache = new Map();

export function setCache(key, data) {
  cache.set(key, {
    data,
    timestamp: Date.now(),
  });
}

export function getCache(key, duration) {
  const cached = cache.get(key);

  if (!cached) {
    return null;
  }

  const now = Date.now();

  if (now - cached.timestamp > duration) {
    cache.delete(key);
    return null;
  }

  return cached.data;
}

export function clearCache() {
  cache.clear();
}
