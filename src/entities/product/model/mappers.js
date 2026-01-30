const clampRatingToStars = (v) => {
  const n = Number(v);
  if (Number.isNaN(n)) return 0;
  return Math.min(5, Math.max(0, Math.round(n)));
};

const calcOldPrice = (price, discountPercentage) => {
  const p = Number(price);
  const d = Number(discountPercentage);
  if (Number.isNaN(p) || Number.isNaN(d) || d <= 0 || d >= 100) return p;
  return p / (1 - d / 100);
};


export const mapApiProductToProductCardProps = (p) => {
  const price = Number(p?.price) || 0;
  const discount = Number(p?.discountPercentage) || 0;
  
  return {
    id: p?.id,
    image: p?.thumbnail || (Array.isArray(p?.images) ? p.images[0] : ""),
    title: p?.title || "",
    price,
    oldPrice: calcOldPrice(price, discount),
    discount: Math.round(discount),
    
    meta: "С картой",
    metaRight: "Обычная",
    
    country: p?.brand || "",
    rating: clampRatingToStars(p?.rating),
    isFavorite: false,
  };
};


export const mapApiProductToCard = (p) => mapApiProductToProductCardProps(p);


export const mapApiProductToPromoCard = (p) => mapApiProductToProductCardProps(p);


export const mapApiProductToProductPage = (p) => {
  const discount = Number(p?.discountPercentage) || 0;
  const price = Number(p?.price) || 0;
  
  return {
    id: p?.id,
    title: p?.title || "",
    art: p?.sku || String(p?.id ?? ""),
    rating: clampRatingToStars(p?.rating),
    reviewsCount: Array.isArray(p?.reviews) ? p.reviews.length : 0,
    discount: Math.round(discount),
    oldPrice: calcOldPrice(price, discount),
    price,
    
    bonusText: "Вы получаете 10 бонусов",
    noteText: "Уведомить о снижении цены",
    
    characteristics: [
      { label: "Бренд", value: p?.brand || "—" },
      { label: "Категория", value: p?.category || "—" },
      { label: "В наличии", value: typeof p?.stock === "number" ? `${p.stock} шт.` : "—" },
    ],
    
    images:
      Array.isArray(p?.images) && p.images.length
        ? p.images
        : [p?.thumbnail].filter(Boolean),
    
    category: p?.category || "",
  };
};
