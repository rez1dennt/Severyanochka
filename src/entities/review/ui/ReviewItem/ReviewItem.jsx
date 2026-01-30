import cls from './ReviewItem.module.scss'
import clsx from 'clsx'
import { Text } from '@/shared/ui/Text'
import { RatingStars } from '@/entities/rating/ui/RatingStars/RatingStars.jsx'

export const ReviewItem = ({
                             name,
                             date,
                             rating,
                             text,
                             className,
                           }) => {
  return (
    <div className={clsx(cls.item, className)}>
      <div className={cls.avatar} aria-hidden="true" />
      
      <div className={cls.content}>
        <div className={cls.top}>
          <Text as="span" size="sm" weight="medium" className={cls.name}>
            {name}
          </Text>
          <Text as="span" size="xs" className={cls.date}>
            {date}
          </Text>
        </div>
        
        <RatingStars value={rating} size={14} className={cls.rating} />
        
        <Text as="p" size="sm" className={cls.text}>
          {text}
        </Text>
      </div>
    </div>
  )
}
