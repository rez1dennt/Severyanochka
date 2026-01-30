import { httpGet } from "@/shared/api/api.js";

export const getProductById = ({ id, signal }) =>
  httpGet({ path: `/products/${id}`, signal });

export const getProducts = ({ limit = 12, skip = 0, signal }) =>
  httpGet({ path: "/products", params: { limit, skip }, signal });

export const searchProducts = ({ q, limit = 12, skip = 0, signal }) =>
  httpGet({ path: "/products/search", params: { q, limit, skip }, signal });

export const getProductsByCategory = ({ category, limit = 12, skip = 0, signal }) =>
  httpGet({
    path: `/products/category/${encodeURIComponent(category)}`,
    params: { limit, skip },
    signal,
  });

