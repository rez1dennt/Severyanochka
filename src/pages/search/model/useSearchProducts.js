import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getProducts, searchProducts } from "@/entities/product/api/productApi";
import { mapApiProductToProductCardProps } from "@/entities/product/model/mappers";

const LIMIT = 12;
const DEBOUNCE_MS = 400;

export const useSearchProducts = () => {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState("");
  
  const debounceRef = useRef(null);
  const controllerRef = useRef(null);
  
  const hasMore = useMemo(() => items.length < total, [items.length, total]);
  
  const request = useCallback(async ({ q, skip, append }) => {
    if (controllerRef.current) controllerRef.current.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    
    const trimmed = (q || "").trim();
    
    const req = trimmed
      ? searchProducts({ q: trimmed, limit: LIMIT, skip, signal: controller.signal })
      : getProducts({ limit: LIMIT, skip, signal: controller.signal });
    
    const data = await req;
    
    const mapped = (data?.products || []).map(mapApiProductToProductCardProps);
    
    setTotal(Number(data?.total) || 0);
    setItems((prev) => (append ? [...prev, ...mapped] : mapped));
  }, []);
  
  const loadFirst = useCallback(async (q) => {
    try {
      setIsLoading(true);
      setError("");
      await request({ q, skip: 0, append: false });
    } catch (e) {
      if (e?.name === "AbortError") return;
      setError(e?.message || "Ошибка загрузки");
      setItems([]);
      setTotal(0);
    } finally {
      setIsLoading(false);
    }
  }, [request]);
  
  useEffect(() => {
    loadFirst("");
    return () => {
      if (controllerRef.current) controllerRef.current.abort();
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [loadFirst]);
  
  const onChangeQuery = useCallback((value) => {
    setQuery(value);
    
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      loadFirst(value);
    }, DEBOUNCE_MS);
  }, [loadFirst]);
  
  const onLoadMore = useCallback(async () => {
    try {
      setIsLoadingMore(true);
      setError("");
      await request({ q: query, skip: items.length, append: true });
    } catch (e) {
      if (e?.name === "AbortError") return;
      setError(e?.message || "Ошибка загрузки");
    } finally {
      setIsLoadingMore(false);
    }
  }, [items.length, query, request]);
  
  return {
    query,
    items,
    isLoading,
    isLoadingMore,
    hasMore,
    error,
    onChangeQuery,
    onLoadMore,
  };
};
