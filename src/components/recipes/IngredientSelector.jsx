import { Check } from 'lucide-react'
import { getCategoryColor } from '../../utils/constants'

export const IngredientSelector = ({ ingredients, selectedIds, onToggle }) => {
  if (ingredients.length === 0) {
    return (
      <p className="font-hand text-chalk-faded text-center py-4">
        No ingredients in your pantry yet
      </p>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      {ingredients.map((ingredient) => {
        const isSelected = selectedIds.includes(ingredient.id)
        const categoryColor = getCategoryColor(ingredient.category)

        return (
          <button
            key={ingredient.id}
            onClick={() => onToggle(ingredient.id)}
            className={`
              p-3 rounded-lg text-left transition-all touch-highlight
              ${isSelected
                ? 'bg-chalk-green/20 border-2 border-chalk-green'
                : 'bg-chalkboard-dark border-2 border-dashed border-chalk-faded/50'
              }
            `}
          >
            <div className="flex items-start gap-2">
              <div
                className={`
                  w-5 h-5 rounded flex-shrink-0 mt-0.5
                  flex items-center justify-center
                  ${isSelected ? 'bg-chalk-green' : 'border-2 border-chalk-faded'}
                `}
              >
                {isSelected && <Check size={14} className="text-chalkboard-black" />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-hand text-chalk-white text-sm truncate">
                  {ingredient.name}
                </p>
                <p className="font-hand text-chalk-faded text-xs">
                  {ingredient.quantity} {ingredient.unit}
                </p>
              </div>
              <div
                className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5"
                style={{ backgroundColor: categoryColor }}
              />
            </div>
          </button>
        )
      })}
    </div>
  )
}
