import { useState, useRef } from 'react'

export const useSwipe = (onSwipeLeft, onSwipeRight, threshold = 80) => {
  const [offset, setOffset] = useState(0)
  const [isSwiping, setIsSwiping] = useState(false)
  const startX = useRef(0)
  const currentX = useRef(0)

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX
    currentX.current = e.touches[0].clientX
    setIsSwiping(true)
  }

  const handleTouchMove = (e) => {
    if (!isSwiping) return
    currentX.current = e.touches[0].clientX
    const diff = currentX.current - startX.current
    // Limit the swipe distance
    const limitedDiff = Math.max(-150, Math.min(150, diff))
    setOffset(limitedDiff)
  }

  const handleTouchEnd = () => {
    setIsSwiping(false)
    if (offset < -threshold && onSwipeLeft) {
      onSwipeLeft()
    } else if (offset > threshold && onSwipeRight) {
      onSwipeRight()
    }
    setOffset(0)
  }

  return {
    offset,
    isSwiping,
    handlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },
  }
}
