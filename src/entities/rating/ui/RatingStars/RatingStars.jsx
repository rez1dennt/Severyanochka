import cls from './RatingStars.module.scss'
import clsx from 'clsx'

export const RatingStars = ({
                              value = 0,
                              max = 5,
                              size = 16,
                              className,
                            }) => {
  const v = Math.max(0, Math.min(max, Math.round(Number(value) || 0)))
  
  return (
    <div className={clsx(cls.stars, className)} aria-label={`Рейтинг ${v} из ${max}`}>
      {Array.from({ length: max }).map((_, i) => {
        const filled = i < v
        return (
          <span key={i} className={cls.star} aria-hidden="true" style={{ width: size, height: size }}>
            <svg viewBox="0 0 24 24" width={size} height={size} fill={filled ? 'currentColor' : 'none'}>
              <path
                d="M12 17.3l-6.2 3.4 1.4-6.9-5.2-5 7.1-.8L12 1.7l2.9 6.3 7.1.8-5.2 5 1.4 6.9z"
                stroke="currentColor"
                strokeWidth="1.2"
              />
            </svg>
          </span>
        )
      })}
    </div>
  )
}
