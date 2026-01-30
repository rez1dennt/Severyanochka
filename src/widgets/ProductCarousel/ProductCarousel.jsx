import { useEffect, useMemo, useRef, useState } from 'react'
import cls from './ProductCarousel.module.scss'
import clsx from 'clsx'
import { ProductCard } from '@/entities/product'

import arrowRight from "@/assets/icons/arrowRight.svg"
import arrowLeft from "@/assets/icons/arrowLeft.svg"

export const ProductCarousel = ({ items = [], className }) => {
  const trackRef = useRef(null)
  const itemRefs = useRef([])
  const [index, setIndex] = useState(0)
  
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v))
  const maxIndex = useMemo(() => Math.max(0, items.length - 1), [items.length])
  
  const scrollToIndex = (next) => {
    const track = trackRef.current
    const el = itemRefs.current[next]
    if (!track || !el) return
    
    const trackRect = track.getBoundingClientRect()
    const elRect = el.getBoundingClientRect()
    
    // хотим, чтобы элемент оказался по центру track
    const currentScroll = track.scrollLeft
    const elLeftInTrack = elRect.left - trackRect.left + currentScroll
    const target = elLeftInTrack - (trackRect.width - elRect.width) / 2
    
    track.scrollTo({ left: target, behavior: 'smooth' })
  }
  
  const go = (dir) => {
    const next = clamp(index + dir, 0, maxIndex)
    setIndex(next)
    scrollToIndex(next)
  }
  
  // ✅ при ресайзе заново центрируем текущую карточку
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    
    const ro = new ResizeObserver(() => {
      scrollToIndex(index)
    })
    
    ro.observe(track)
    return () => ro.disconnect()
  }, [index])
  
  return (
    <div className={clsx(cls.carousel, className)}>
      <div className={cls.track} ref={trackRef}>
        {items.map((p, i) => (
          <div
            key={p.id}
            className={cls.item}
            ref={(node) => (itemRefs.current[i] = node)}
          >
            <ProductCard {...p} />
          </div>
        ))}
      </div>
      
      <div className={cls.navRow}>
        <button
          type="button"
          className={cls.navBtn}
          onClick={() => go(-1)}
          disabled={index === 0}
          aria-label="Назад"
        >
          <img
            src={arrowLeft}
            alt=""
          />
        </button>
        
        <button
          type="button"
          className={cls.navBtn}
          onClick={() => go(1)}
          disabled={index === maxIndex}
          aria-label="Вперёд"
        >
          <img
            src={arrowRight}
            alt=""
          />
        </button>
      </div>
    </div>
  )
}
