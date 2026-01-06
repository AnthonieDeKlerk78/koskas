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
      className="relative p-4 chalk-border rounded-lg bg-chalkboard-dark cursor-pointer
                 hover:bg-chalkboard-dark/80 active:scale-[0.99] transition-all touch-highlight"
      style={{ borderLeftWidth: '4px', borderLeftColor: categoryColor, borderLeftStyle: 'solid' }}
    >
      <div className="flex justify-between items-start gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-hand text-lg text-chalk-white truncate">
            {ingredient.name}
          </h3>
          <p className="font-hand text-sm text-chalk-faded">
            {formatQuantity(ingredient.quantity)} {ingredient.unit}
            {ingredient.location && ` · ${ingredient.location}`}
          </p>
          {expiration.label && (
            <div className={`flex items-center gap-1 mt-1 ${getExpirationClass()}`}>
              <Clock size={14} />
              <span className="font-hand text-xs whitespace-nowrap">
                {expiration.status === 'expired' || expiration.status === 'today' || expiration.status === 'tomorrow'
                  ? expiration.label
                  : `exp: ${expiration.label}`
                }
              </span>
            </div>
          )}
          {ingredient.notes && (
            <p className="mt-1 font-hand text-xs text-chalk-faded/70 truncate">
              {ingredient.notes}
            </p>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            onClick={handleEdit}
            className="p-2 rounded-lg text-chalk-blue hover:bg-chalk-blue/20
                       active:scale-95 transition-all touch-highlight"
            title="Edit"
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 rounded-lg text-chalk-red hover:bg-chalk-red/20
                       active:scale-95 transition-all touch-highlight"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
