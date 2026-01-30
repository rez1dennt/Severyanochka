import React from "react";
import { Text } from "@/shared/ui/Text";
import { Button } from "@/shared/ui/Button";
import shoppingCart from "@/assets/icons/shopping-cart.svg";
import notifyIcon from "@/assets/icons/notify.svg";
import help from "@/assets/icons/help.svg";

const formatMoney = (v) => {
  const n = Number(v);
  if (Number.isNaN(n)) return "";
  return n.toFixed(2).replace(".", ",");
};

export const ProductBuyBox = ({ cls, product }) => (
  <div className={cls.buyBox}>
    <div className={cls.prices}>
      <div className={cls.priceCol}>
        <Text as="div" size="lg" className={cls.oldPrice}>
          {formatMoney(product.oldPrice)} ₽
        </Text>
        <Text as="div" size="sm" className={cls.oldLabel}>
          Обычная цена
        </Text>
      </div>
      
      <div className={cls.priceColRight}>
        <Text as="div" size="xl" weight="bold" className={cls.price}>
          {formatMoney(product.price)} ₽
        </Text>
        <div className={cls.oldPriceBlock}>
          <Text as="div" size="sm" className={cls.priceHint}>
            С картой Северяночки
          </Text>
          <img src={help} alt="" />
        </div>
      </div>
    </div>
    
    <Button
      variant="primary"
      size="lg"
      fullWidth
      iconLayout="absolute"
      leftIcon={<img src={shoppingCart} alt="" />}
    >
      В корзину
    </Button>
    
    <div className={cls.bonusRow}>
      <span className={cls.bonusDot} />
      <Text as="span" size="xs" className={cls.bonusText}>
        {product.bonusText}
      </Text>
    </div>
    
    <button type="button" className={cls.notifyBtn}>
      <img src={notifyIcon} alt="" />
      <Text as="span" size="xs">{product.noteText}</Text>
    </button>
    
    <div className={cls.table}>
      {product.characteristics.map((row) => (
        <div key={row.label} className={cls.tr}>
          <Text as="span" size="xs" className={cls.tdLeft}>{row.label}</Text>
          <Text as="span" size="xs" weight="bold" className={cls.tdRight}>{row.value}</Text>
        </div>
      ))}
    </div>
  </div>
);
