const KEY = "favorites";

export const getFavoriteIds = () => {
  try {
    const raw = localStorage.getItem(KEY);
    const ids = raw ? JSON.parse(raw) : [];
    return Array.isArray(ids) ? ids : [];
  } catch {
    return [];
  }
};

export const toggleFavoriteId = (id) => {
  const current = getFavoriteIds();
  const next = current.includes(id)
    ? current.filter((x) => x !== id)
    : [...current, id];
  
  localStorage.setItem(KEY, JSON.stringify(next));
  return next;
};

export const isFavoriteId = (id) => getFavoriteIds().includes(id);
