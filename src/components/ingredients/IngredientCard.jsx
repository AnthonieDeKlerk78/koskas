import { Clock, Pencil, Trash2 } from 'lucide-react'
import { getCategoryColor } from '../../utils/constants'
import { formatQuantity, getExpirationStatus } from '../../utils/helpers'

export const IngredientCard = ({ ingredient, onEdit, onDelete }) => {
  const categoryColor = getCategoryColor(ingredient.category)
  const expiration = getExpirationStatus(ingredient.expiration_date)

  const getExpirationClass = () => {
    switch (expiration.status) {
      case 'expired':
        return 'text-chalk-red'
      case 'today':
      case 'tomorrow':
      case 'soon':
        return 'text-chalk-yellow'
      default:
        return 'text-chalk-faded'
    }
  }

  const handleCardClick = (e) => {
    // Don't trigger edit if clicking on action buttons
    if (e.target.closest('button')) return
    onEdit?.()
  }

  const handleDelete = (e) => {
    e.stopPropagation()
    onDelete?.()
  }

  const handleEdit = (e) => {
    e.stopPropagation()
    onEdit?.()
  }

  return (
    <div
      onClick={handleCardClick}
      className="relative cursor-pointer hover:bg-chalkboard-dark/30 active:bg-chalkboard-dark/50 transition-all touch-highlight rounded py-2 px-3 group"
    >
      <div className="flex justify-between items-start gap-3">
        {/* Left side: ingredient info in menu list style */}
        <div className="flex-1 min-w-0 flex items-baseline gap-3">
          {/* Ingredient name - handwritten style */}
          <h3 className="font-hand text-lg text-chalk-white transform -rotate-0.5 relative">
            {ingredient.name}
            {/* Subtle dot leader effect */}
            <span className="absolute left-full ml-2 text-chalk-faded/30 text-xs">
              ...........................
            </span>
          </h3>

          {/* Quantity - smaller text */}
          <span className="font-hand text-sm text-chalk-faded/80 whitespace-nowrap ml-auto">
            {formatQuantity(ingredient.quantity)} {ingredient.unit}
          </span>
        </div>

        {/* Right side: Action buttons - hidden until hover */}
        <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleEdit}
            className="p-1.5 rounded text-chalk-blue hover:bg-chalk-blue/20
                       active:scale-95 transition-all touch-highlight"
            title="Edit"
          >
            <Pencil size={14} />
          </button>
          <button
            onClick={handleDelete}
            className="p-1.5 rounded text-chalk-red hover:bg-chalk-red/20
                       active:scale-95 transition-all touch-highlight"
            title="Delete"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* Secondary info row - location, expiration, notes */}
      <div className="mt-1 flex flex-wrap items-center gap-3 text-xs font-hand">
        {/* Location */}
        {ingredient.location && (
          <span className="text-chalk-faded/70">
            {ingredient.location}
          </span>
        )}

        {/* Expiration */}
        {expiration.label && (
          <span className={`flex items-center gap-1 ${getExpirationClass()}`}>
            <Clock size={10} />
            {expiration.status === 'expired' || expiration.status === 'today' || expiration.status === 'tomorrow'
              ? expiration.label
              : `exp: ${expiration.label}`
            }
          </span>
        )}

        {/* Notes */}
        {ingredient.notes && (
          <span className="text-chalk-faded/60 italic">
            "{ingredient.notes}"
          </span>
        )}
      </div>

      {/* Bottom border line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-30"
        style={{ backgroundColor: categoryColor }}
      ></div>
    </div>
  )
}
