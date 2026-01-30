import React from "react";
import { PromoSection } from "@/widgets/PromoSection";

export const PromoSectionContainer = ({ items }) => {
  if (!items?.length) return null;
  
  return (
    <PromoSection
      title="Акции"
      href="#"
      items={items}
    />
  );
};
