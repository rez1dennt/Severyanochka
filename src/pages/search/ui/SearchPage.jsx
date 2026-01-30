import {SearchInput} from "@/widgets/SearchInput/SearchInput.jsx";
import React, { useCallback } from "react";
import cls from "./SearchPage.module.scss";
import { Container } from "@/shared/ui/Container";
import { Text } from "@/shared/ui/Text";
import { Button } from "@/shared/ui/Button";
import { ProductCard } from "@/entities/product";
import { useNavigate } from "react-router-dom";
import { useSearchProducts } from "../model/useSearchProducts";

export const SearchPage = () => {
  
  const navigate = useNavigate();
  
  const handleOpenProduct = useCallback((id) => {
    navigate(`/products/${id}`);
  }, [navigate]);
  
  
  const {
    query,
    items,
    isLoading,
    isLoadingMore,
    hasMore,
    error,
    onChangeQuery,
    onLoadMore,
  } = useSearchProducts();
  
  
  
  
  return (
    <Container>
      <Text as="h1" size="xl" weight="bold" className={cls.title}>
        Поиск
      </Text>
      
      <div className={cls.searchRow}>
        <SearchInput
          value={query}
          onChange={onChangeQuery}
          items={items}
          placeholder="Найти товар"
          onSelect={(text) => onChangeQuery(text)}
        />
      </div>
      
      {error ? (
        <Text as="div" size="md" className={cls.error}>
          Произошла ошибка
        </Text>
      ) : null}
      
      {isLoading ? (
        <div className={cls.loader} size="md"></div>
      ) : (
        <div className={cls.grid}>
          {items.map((p) => (
            <ProductCard
              id={p.id}
              image={p.image}
              title={p.title}
              price={p.price}
              oldPrice={p.oldPrice}
              discount={p.discount}
              meta={p.meta}
              metaRight={p.metaRight}
              country={p.country}
              rating={p.rating}
              isFavorite={p.isFavorite}
              onOpen={handleOpenProduct}
              onFavoriteToggle={() => handleFavToggle(p.id)}
            
            />
          ))}
        </div>
      )}
      
      {hasMore ? (
        <div className={cls.loadMore}>
          <Button
            variant="outlineGreen"
            size="md"
            onClick={onLoadMore}
            disabled={isLoadingMore}
          >
            {isLoadingMore ? "Загрузка..." : "Загрузить ещё"}
          </Button>
        </div>
      ) : null}
    </Container>
  );
};
