import React from "react";
import { Text } from "@/shared/ui/Text";
import { ProductCarousel } from "@/widgets/ProductCarousel";

export const ProductRelated = ({ cls, items }) => {
  if (!items?.length) return null;
  
  return (
    <>
      <Text as="h1" size="xxl" weight="bold" className={cls.sectionTitle}>
        С этим товаром покупают
      </Text>
      
      <ProductCarousel items={items} />
    </>
  );
};
