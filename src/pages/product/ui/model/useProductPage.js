import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById, getProducts, getProductsByCategory } from "@/entities/product/api/productApi";
import {
  mapApiProductToProductPage,
  mapApiProductToCard,
  mapApiProductToPromoCard,
} from "@/entities/product/model/mappers";

export const useProductPage = () => {
  const params = useParams();
  
  const productId = useMemo(() => {
    const raw = params?.id ?? "1";
    const n = Number(raw);
    return Number.isNaN(n) ? 1 : n;
  }, [params?.id]);
  
  const [state, setState] = useState({
    isLoading: true,
    error: "",
    product: null,
    related: [],
    promos: [],
  });
  
  useEffect(() => {
    const controller = new AbortController();
    
    const load = async () => {
      try {
        setState((prev) => ({ ...prev, isLoading: true, error: "" }));
        
        const apiProduct = await getProductById({ id: productId, signal: controller.signal });
        const product = mapApiProductToProductPage(apiProduct);
        
        const relatedPromise = product.category
          ? getProductsByCategory({
            category: product.category,
            limit: 12,
            skip: 0,
            signal: controller.signal,
          })
          : Promise.resolve({ products: [] });
        
        const promosPromise = getProducts({ limit: 8, skip: 0, signal: controller.signal });
        
        const [relatedRaw, promosRaw] = await Promise.all([relatedPromise, promosPromise]);
        
        const related = (relatedRaw?.products || [])
          .filter((x) => x?.id !== product.id)
          .slice(0, 10)
          .map(mapApiProductToCard);
        
        const promos = (promosRaw?.products || [])
          .slice(0, 8)
          .map(mapApiProductToPromoCard);
        
        setState({
          isLoading: false,
          error: "",
          product,
          related,
          promos,
        });
      } catch (e) {
        setState({
          isLoading: false,
          error: e?.message || "Ошибка загрузки",
          product: null,
          related: [],
          promos: [],
        });
      }
    };
    
    load();
    
    return () => controller.abort();
  }, [productId]);
  
  return state;
};
