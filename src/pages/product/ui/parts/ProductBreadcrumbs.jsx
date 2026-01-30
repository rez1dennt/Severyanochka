import React from "react";

import { Text } from "@/shared/ui/Text";
import arrowRight from "@/assets/icons/arrowRight.svg";

export const ProductBreadcrumbs = ({ cls, product }) => (
  <div className={cls.breadcrumbs}>
    <Text as="span" size="xs" className={cls.crumb}>Главная</Text>
    <img src={arrowRight} alt="arrow" />
    
    <Text as="span" size="xs" className={cls.crumb}>Каталог</Text>
    <img src={arrowRight} alt="arrow" />
    
    <Text as="span" size="xs" className={cls.crumb}>
      {product.category || "Категория"}
    </Text>
    
    <div className={cls.crumbLast}>
      <img src={arrowRight} alt="arrow" />
      <Text as="span" size="xs">{product.title}</Text>
    </div>
  </div>
);
