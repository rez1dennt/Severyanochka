import cls from './ProductGallery.module.scss'
import clsx from 'clsx'
import { useMemo, useState } from 'react'

export const ProductGallery = ({ images = [], alt = '', className }) => {
  const safeImages = useMemo(() => (Array.isArray(images) ? images.filter(Boolean) : []), [images])
  const [activeIndex, setActiveIndex] = useState(0)
  
  const activeSrc = safeImages[activeIndex] || safeImages[0]
  
  return (
    <div className={clsx(cls.gallery, className)}>
      <div className={cls.thumbs}>
        {safeImages.map((src, i) => (
          <button
            key={`${src}-${i}`}
            type="button"
            className={clsx(cls.thumb, i === activeIndex && cls.thumbActive)}
            onClick={() => setActiveIndex(i)}
            aria-label={`Открыть изображение ${i + 1}`}
          >
            <img src={src} alt="" loading="lazy" />
          </button>
        ))}
      </div>
      
      <div className={cls.main}>
        {activeSrc ? (
          <img className={cls.mainImg} src={activeSrc} alt={alt} />
        ) : (
          <div className={cls.placeholder} />
        )}
      </div>
    </div>
  )
}
