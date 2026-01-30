import cls from './BottomNav.module.scss'
import clsx from 'clsx'
import { Text } from '@/shared/ui/Text'

import heartIcon from '@/assets/icons/heart.svg'
import boxIcon from '@/assets/icons/box.svg'
import cartIcon from '@/assets/icons/cart.svg'
import userAvatar from '@/assets/icons/user.svg'

export const BottomNav = ({ className, cartCount = 0 }) => {
  return (
    <div className={clsx(cls.bar, className)} role="navigation" aria-label="Нижняя навигация">
      <button type="button" className={cls.item}>
        <span className={cls.burger} aria-hidden="true" />
        <Text as="span" size="xs" className={cls.labelActive}>Каталог</Text>
      </button>
      
      <button type="button" className={cls.item}>
        <img className={cls.icon} src={heartIcon} alt="" />
        <Text as="span" size="xs" className={cls.label}>Избранное</Text>
      </button>
      
      <button type="button" className={cls.item}>
        <img className={cls.icon} src={boxIcon} alt="" />
        <Text as="span" size="xs" className={cls.label}>Заказы</Text>
      </button>
      
      <button type="button" className={cls.item}>
        <span className={cls.cartWrap}>
          <img className={cls.icon} src={cartIcon} alt="" />
          {!!cartCount && <span className={cls.badge}>{cartCount}</span>}
        </span>
        <Text as="span" size="xs" className={cls.label}>Корзина</Text>
      </button>
      
      <button type="button" className={cls.item}>
        <img className={cls.avatar} src={userAvatar} alt="" />
      </button>
    </div>
  )
}
