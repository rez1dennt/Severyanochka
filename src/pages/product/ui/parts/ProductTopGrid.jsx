import React from "react";
import { ProductGallery } from "@/entities/product";
import { ProductBuyBox } from "./ProductBuyBox";

export const ProductTopGrid = ({ cls, product }) => (
  <div className={cls.topGrid}>
    <ProductGallery images={product.images} alt={product.title} />
    <ProductBuyBox cls={cls} product={product} />
  </div>
);
