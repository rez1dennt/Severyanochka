import React from "react";
import { Container } from "@/shared/ui/Container";
import { Text } from "@/shared/ui/Text";
import cls from "./ProductPage.module.scss";

import { useProductPage } from "@/pages/product/ui/model/useProductPage";

import { ProductBreadcrumbs } from "./parts/ProductBreadcrumbs";
import { ProductTitleRow } from "./parts/ProductTitleRow";
import { ProductTopGrid } from "./parts/ProductTopGrid";
import { ProductRelated } from "./parts/ProductRelated";
import { PromoSectionContainer } from "./parts/PromoSectionContainer";
import { ReviewsSection } from "@/widgets/ReviewSection/ReviewSection.jsx";

export const ProductPage = () => {
  const { isLoading, error, product, related, promos } = useProductPage();
  
  if (isLoading) {
    return (
      <Container>
        <div className={cls.loader} size="md"></div>
      </Container>
    );
  }
  
  if (error || !product) {
    return (
      <Container>
        <Text as="div" size="md">{error || "Товар не найден"}</Text>
      </Container>
    );
  }
  
  return (
    <Container>
      <ProductBreadcrumbs cls={cls} product={product} />
      <ProductTitleRow cls={cls} product={product} />
      <ProductTopGrid cls={cls} product={product} />
      
      <ProductRelated cls={cls} items={related} />
      
      <ReviewsSection />
      
      <PromoSectionContainer items={promos} />
    </Container>
  );
};
