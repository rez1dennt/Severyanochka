import cls from './ReviewSection.module.scss'
import { Text } from '@/shared/ui/Text'
import { Button } from '@/shared/ui/Button'
import { RatingStars } from '@/entities/rating/ui/RatingStars/RatingStars.jsx'
import { ReviewItem } from '@/entities/review/ui/ReviewItem/ReviewItem.jsx'
import { useMemo, useState } from 'react'

export const ReviewsSection = () => {
  const reviews = useMemo(() => ([
    { id: 1, name: 'Татьяна', date: '22.02.2020', rating: 5, text: 'приятный вкус' },
    { id: 2, name: 'Мария', date: '22.02.2020', rating: 4, text: 'Масло среднее, есть вкуснее' },
    { id: 3, name: 'Алексей', date: '22.02.2020', rating: 1, text: 'Покупали в том числе в этом весе. Масло по вкусу и органолептическим свойствам совершенно не похоже на натуральное. Упаковка выглядит так как напечатанная на дешёвом принтере. На ваш взгляд продукт является подделкой или контрафактной продукцией. Просим разобраться.' },
  ]), [])
  
  const [myRating, setMyRating] = useState(0)
  const [text, setText] = useState('')
  
    const stats = useMemo(() => {
    const total = reviews.length || 1
    const avg = Math.round((reviews.reduce((acc, r) => acc + r.rating, 0) / total) * 10) / 10
    
    const byStar = [1,2,3,4,5].reduce((acc, s) => {
      acc[s] = reviews.filter((r) => r.rating === s).length
      return acc
    }, {})
    
    return { avg, total: reviews.length, byStar }
  }, [reviews])
  
  const handleSend = () => {
    setText('')
    setMyRating(0)
  }
  
  return (
    <section className={cls.section}>
      <Text as="h2" size="xl" weight="bold" className={cls.title}>
        Отзывы
      </Text>
      
      <div className={cls.grid}>
        {/* LEFT: summary */}
        <aside className={cls.summary}>
          <div className={cls.avgRow}>
            <RatingStars value={Math.round(stats.avg)} size={16} />
            <Text as="span" size="sm" weight="medium" className={cls.avgText}>
              {stats.avg} из 5
            </Text>
          </div>
          
          <div className={cls.breakdown}>
            {[5,4,3,2,1].map((s) => (
              <div key={s} className={cls.line}>
                <Text as="span" size="xs" className={cls.starLabel}>{s}</Text>
                <RatingStars value={s} size={12} className={cls.smallStars} />
                <Text as="span" size="xs" className={cls.count}>
                  {stats.byStar[s]}
                </Text>
              </div>
            ))}
          </div>
        </aside>
        
        {/* RIGHT: list + form */}
        <div className={cls.right}>
          <div className={cls.list}>
            {reviews.map((r) => (
              <ReviewItem key={r.id} {...r} />
            ))}
          </div>
          
          <div className={cls.form}>
            <div className={cls.formTop}>
              <Text as="span" size="sm" weight="medium" className={cls.formTitle}>
                Ваша оценка
              </Text>
              
              <div className={cls.ratePicker}>
                {Array.from({ length: 5 }).map((_, i) => {
                  const value = i + 1
                  const active = value <= myRating
                  return (
                    <button
                      key={value}
                      type="button"
                      className={cls.rateBtn}
                      onClick={() => setMyRating(value)}
                      aria-label={`Поставить ${value} из 5`}
                    >
                      <svg viewBox="0 0 24 24" width="18" height="18" fill={active ? 'currentColor' : 'none'}>
                        <path
                          d="M12 17.3l-6.2 3.4 1.4-6.9-5.2-5 7.1-.8L12 1.7l2.9 6.3 7.1.8-5.2 5 1.4 6.9z"
                          stroke="currentColor"
                          strokeWidth="1.2"
                        />
                      </svg>
                    </button>
                  )
                })}
              </div>
            </div>
            
            <label className={cls.field}>
              <Text as="span" size="xs" className={cls.label}>Отзыв</Text>
              <textarea
                className={cls.textarea}
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={4}
              />
            </label>
            
            <Button variant="primary" size="sm" onClick={handleSend}>
              Отправить отзыв
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
