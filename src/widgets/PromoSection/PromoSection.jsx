import cls from './PromoSection.module.scss'
import clsx from 'clsx'
import { Text } from '@/shared/ui/Text'
import { Container } from '@/shared/ui/Container'
import { ProductCard } from '@/entities/product'

export const PromoSection = ({
                               title = 'Акции',
                               href,
                               items = [],
                               className,
                             }) => {
  return (
    <section className={clsx(cls.section, className)}>
      <Container>
        <div className={cls.head}>
          <Text as="h1" size="xxl" weight="bold" className={cls.title}>
            {title}
          </Text>
          
          {href && (
            <a className={cls.allLink} href={href}>
              <Text as="span" size="md" className={cls.allText}>
                Все акции
              </Text>
              <span className={cls.chevron} aria-hidden="true" />
            </a>
          )}
        </div>
        
        <div className={cls.grid}>
          {items.map((p) => (
            <ProductCard
              key={p.id}
              {...p}
            />
          ))}
        </div>
       
      </Container>
    </section>
  )
}
