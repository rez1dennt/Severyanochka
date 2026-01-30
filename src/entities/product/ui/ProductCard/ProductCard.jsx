import cls from "./ProductCard.module.scss";
import clsx from "clsx";
import { Button } from "@/shared/ui/Button";
import { Text } from "@/shared/ui/Text/Text";
import heartIcon from "@/assets/icons/heart.svg";

export const ProductCard = ({
                              id,
                              image,
                              title,
                              price,
                              oldPrice,
                              discount,
                              meta,
                              metaRight,
                              country,
                              rating = 0,
                              isFavorite = false,
                              
                              onOpen,
                              onFavoriteToggle,
                              onAddToCart,
                              
                              className,
                            }) => {
  const hasOldPrice = typeof oldPrice === "number" && oldPrice > price;
  const showDiscount = typeof discount === "number";
  
  const handleOpen = () => {
    if (!onOpen) return;
    onOpen(id);
  };
  
  return (
    <div className={clsx(cls.card, className)}>
      <div className={cls.media}>
        <img
          className={cls.image}
          src={image}
          alt={title}
          loading="lazy"
          onClick={handleOpen}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleOpen();
          }}
        />
        
        {showDiscount && (
          <Text as="span" size="xs" weight="medium" className={cls.badge}>
            -{discount}%
          </Text>
        )}
        
        <button
          type="button"
          className={cls.fav}
          aria-pressed={isFavorite}
          aria-label={isFavorite ? "Убрать из избранного" : "Добавить в избранное"}
          onClick={onFavoriteToggle}
        >
          <img src={heartIcon} alt="" />
        </button>
      </div>
      
      <div className={cls.body}>
        <div className={cls.prices}>
          <Text as="span" size="md" weight="bold" className={cls.price}>
            {formatPrice(price)}
          </Text>
          
          {hasOldPrice && (
            <Text as="span" size="md" className={cls.oldPrice}>
              {formatPrice(oldPrice)}
            </Text>
          )}
        </div>
        
        <div className={cls.meta}>
          {(meta || metaRight) && (
            <div className={cls.metaRow}>
              {meta && (
                <Text as="span" size="xs" className={cls.metaLine}>
                  {meta}
                </Text>
              )}
              
              {metaRight && (
                <Text as="span" size="xs" className={cls.metaRight}>
                  {metaRight}
                </Text>
              )}
            </div>
          )}
          
          {(title || country) && (
            <Text as="p" size="md" className={cls.title} onClick={handleOpen} role="button" tabIndex={0}>
              {title}
              {country ? `, ${country}` : ""}
            </Text>
          )}
        </div>
        
        <div className={cls.rating} aria-label={`Рейтинг: ${rating} из 5`}>
          {renderStars(rating)}
        </div>
        
        <Button variant="outlineGreen" fullWidth onClick={onAddToCart}>
          В корзину
        </Button>
      </div>
    </div>
  );
};

const formatPrice = (value) => {
  const v = Number(value);
  if (Number.isNaN(v)) return "";
  return `${v.toFixed(2).replace(".", ",")} ₽`;
};

const renderStars = (rating) => {
  const r = Math.max(0, Math.min(5, Math.round(Number(rating) || 0)));
  
  return Array.from({ length: 5 }).map((_, i) => {
    const filled = i < r;
    
    return (
      <span key={i} aria-hidden="true">
        <svg viewBox="0 0 24 24" width="16" height="16" fill={filled ? "currentColor" : "none"}>
          <path
            d="M12 17.3l-6.2 3.4 1.4-6.9-5.2-5 7.1-.8L12 1.7l2.9 6.3 7.1.8-5.2 5 1.4 6.9z"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </svg>
      </span>
    );
  });
};
