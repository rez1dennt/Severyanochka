import { useNavigate } from "react-router-dom";
import cls from './Header.module.scss'
import clsx from 'clsx'
import { Container } from '@/shared/ui/Container'
import { Button } from '@/shared/ui/Button'
import { Text } from '@/shared/ui/Text'


import heartIcon from '@/assets/icons/heart.svg'
import boxIcon from '@/assets/icons/box.svg'
import cartIcon from '@/assets/icons/cart.svg'
import userAvatar from '@/assets/icons/user.svg'
import chevron from '@/assets/icons/chevron.svg'

export const Header = ({ className, cartCount = 0, userName = 'Алексей' }) => {
  
  const navigate = useNavigate();
  const handleGoCatalog = () => {
    navigate("/");
  };
  
  return (
    <header className={clsx(cls.header, className)}>
      <Container>
        <div className={cls.inner}>
          
          
          <div className={cls.left}>
            <Text as="h1" weight="bold" size="xl" className={cls.logo}>
              Магазин
            </Text>
            
            <Button onClick={handleGoCatalog}  className={cls.catalogBtn} variant="secondary" leftIcon={<span className={cls.burger} />}>
              Каталог
            </Button>
          </div>
          
          <div className={cls.right}>
            <nav className={cls.actions} aria-label="Панель действий">
              <button type="button" className={cls.action}>
                <img className={cls.actionIcon} src={heartIcon} alt="heart" />
                <Text as="span" size="xs" className={cls.actionText}>Избранное</Text>
              </button>
              
              <button type="button" className={cls.action}>
                <img className={cls.actionIcon} src={boxIcon} alt="box" />
                <Text as="span" size="xs" className={cls.actionText}>Заказы</Text>
              </button>
              
              <button type="button" className={cls.action}>
                <span className={cls.cartIconWrap}>
                  <img className={cls.actionIcon} src={cartIcon} alt="cart" />
                  {!!cartCount && <span className={cls.badge}>{cartCount}</span>}
                </span>
                <Text as="span" size="xs" className={cls.actionText}>Корзина</Text>
              </button>
            </nav>
            
            <button type="button" className={cls.user}>
              <img className={cls.avatar} src={userAvatar} alt="" />
              <Text as="span" size="sm" className={cls.userName}>{userName}</Text>
              <img
                src={chevron}
                alt="chevron"
              />
            </button>
          </div>
        </div>
      </Container>
    </header>
  )
}
