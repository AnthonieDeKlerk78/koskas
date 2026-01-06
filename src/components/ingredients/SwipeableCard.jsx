import { Pencil, Trash2 } from 'lucide-react'
import { useSwipe } from '../../hooks/useSwipe'

export const SwipeableCard = ({ children, onEdit, onDelete }) => {
  const { offset, handlers } = useSwipe(
    () => onDelete?.(),
    () => onEdit?.()
  )

  const showEdit = offset > 40
  const showDelete = offset < -40

  return (
    <div className="relative overflow-hidden rounded-lg">
      {/* Edit action (swipe right) */}
      <div
        className={`
          absolute left-0 top-0 bottom-0 w-20
          bg-chalk-blue flex items-center justify-center
          transition-opacity
          ${showEdit ? 'opacity-100' : 'opacity-0'}
        `}
      >
        <Pencil size={24} className="text-chalkboard-black" />
      </div>

      {/* Delete action (swipe left) */}
      <div
        className={`
          absolute right-0 top-0 bottom-0 w-20
          bg-chalk-red flex items-center justify-center
          transition-opacity
          ${showDelete ? 'opacity-100' : 'opacity-0'}
        `}
      >
        <Trash2 size={24} className="text-chalkboard-black" />
      </div>

      {/* Card content */}
      <div
        {...handlers}
        style={{ transform: `translateX(${offset}px)` }}
        className="relative bg-chalkboard-dark transition-transform touch-none"
      >
        {children}
      </div>
    </div>
  )
}
