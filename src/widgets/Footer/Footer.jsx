import cls from './Footer.module.scss'
import clsx from 'clsx'
import { Container } from '@/shared/ui/Container'
import { Text } from '@/shared/ui/Text'

// подставь свои иконки
import instagram from '@/assets/icons/instagram.svg'
import vk from '@/assets/icons/vk.svg'
import facebook from '@/assets/icons/facebook.svg'
import ok from '@/assets/icons/ok.svg'
import phoneIcon from '@/assets/icons/phone.svg'

export const Footer = ({
                         className,
                         links = [
                           { label: 'О компании', href: '#' },
                           { label: 'Контакты', href: '#' },
                           { label: 'Вакансии', href: '#' },
                           { label: 'Статьи', href: '#' },
                           { label: 'Политика обработки персональных данных', href: '#' },
                         ],
                         phone = '8 800 777 33 33',
                       }) => {
  return (
    <footer className={clsx(cls.footer, className)}>
      <Container>
        <div className={cls.inner}>
          <div className={cls.left}>
            <Text as="span" weight="bold" className={cls.brand}>
              Магазин
            </Text>
            
            <div className={cls.nav} aria-label="Ссылки футера">
              {links.map((l) => (
                <a key={l.label} href={l.href} className={cls.link}>
                  <Text as="span" size="xs">{l.label}</Text>
                </a>
              ))}
            </div>
          </div>
          
          <div className={cls.right}>
            <div className={cls.social} aria-label="Социальные сети">
              <a className={cls.iconLink} href="#" aria-label="Instagram">
                <img src={instagram} alt="" />
              </a>
              <a className={cls.iconLink} href="#" aria-label="VK">
                <img src={vk} alt="" />
              </a>
              <a className={cls.iconLink} href="#" aria-label="Facebook">
                <img src={facebook} alt="" />
              </a>
              <a className={cls.iconLink} href="#" aria-label="Одноклассники">
                <img src={ok} alt="" />
              </a>
            </div>
            
            <a className={cls.phone} href={`tel:${phone.replace(/\s/g, '')}`}>
              <img className={cls.phoneIcon} src={phoneIcon} alt="" />
              <Text as="span" size="md" className={cls.phoneText}>{phone}</Text>
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}
