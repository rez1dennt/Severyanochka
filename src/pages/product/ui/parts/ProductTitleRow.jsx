import React, { useCallback, useState } from "react";
import { Text } from "@/shared/ui/Text";
import { RatingStars } from "@/entities/rating/ui/RatingStars/RatingStars.jsx";
import share from "@/assets/icons/share.svg";
import heartIcon from "@/assets/icons/heart.svg";
import { getFavoriteIds, toggleFavoriteId } from "@/shared/lib/favorites/favorites.js";

export const ProductTitleRow = ({ cls, product }) => {
  const [favoriteIds, setFavoriteIds] = useState(() => getFavoriteIds());
  const productId = product?.id;
  
  const isFavorite = !!productId && favoriteIds.includes(productId);
  
  const handleToggleFavorite = useCallback(() => {
    if (!productId) return;
    setFavoriteIds(toggleFavoriteId(productId));
  }, [productId]);
  
  return (
    <>
      <Text as="h1" size="xl" weight="bold" className={cls.title}>
        {product.title}
      </Text>
      
      <div className={cls.subRow}>
        <Text as="span" size="xs" className={cls.art}>
          арт. {product.art}
        </Text>
        
        <div className={cls.rate}>
          <div className={cls.stars} aria-label={`Рейтинг: ${product.rating} из 5`}>
            <RatingStars value={product.rating} size={16} />
          </div>
          
          <button type="button" className={cls.reviewsLink}>
            <Text as="span" size="xs">
              {product.reviewsCount} отзыва
            </Text>
          </button>
        </div>
        
        <button type="button" className={cls.actionBtn}>
          <img src={share} alt="" />
          <Text as="span" size="xs">
            Поделиться
          </Text>
        </button>
        
        <button
          type="button"
          className={`${cls.actionBtn} ${isFavorite ? cls.actionBtnActive : ""}`}
          aria-pressed={isFavorite}
          onClick={handleToggleFavorite}
        >
          <img src={heartIcon} alt="" />
          <Text as="span" size="xs">
            {isFavorite ? "В избранном" : "В избранное"}
          </Text>
        </button>
      </div>
    </>
  );
};
