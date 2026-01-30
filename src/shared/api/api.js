const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://dummyjson.com";

const buildUrl = (path, params) => {
  const url = new URL(API_BASE + path);
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v === undefined || v === null) return;
      url.searchParams.set(k, String(v));
    });
  }
  return url.toString();
};

export const httpGet = async ({ path, params, signal }) => {
  const res = await fetch(buildUrl(path, params), { signal });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status}: ${text || res.statusText}`);
  }
  return res.json();
};
