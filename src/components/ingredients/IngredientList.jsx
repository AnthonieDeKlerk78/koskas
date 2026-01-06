import { Package } from 'lucide-react'
import { IngredientCard } from './IngredientCard'
import { CATEGORIES } from '../../utils/constants'

export const IngredientList = ({ ingredients, loading, onEdit, onDelete }) => {
  if (loading) {
    return (
      <div className="flex flex-col gap-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-20 rounded-lg skeleton"
          />
        ))}
      </div>
    )
  }

  if (ingredients.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="chalk-border rounded-lg p-6 text-center">
          <Package size={48} className="text-chalk-faded mx-auto mb-4" />
          <p className="font-chalk text-xl text-chalk-white chalk-text mb-2">
            empty!
          </p>
          <p className="font-hand text-chalk-faded">
            your pantry is empty
          </p>
          <p className="font-hand text-chalk-faded mt-1">
            tap (+) to add your first ingredient
          </p>
        </div>
        <div className="mt-8 text-chalk-faded text-4xl animate-bounce">
          ↓
        </div>
      </div>
    )
  }

  // Group ingredients by category
  const groupedByCategory = ingredients.reduce((acc, ingredient) => {
    const category = ingredient.category || 'Other'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(ingredient)
    return acc
  }, {})

  // Show all categories from CATEGORIES constant
  const orderedCategories = CATEGORIES.map(cat => cat.name)

  return (
    <div className="flex flex-col gap-8">
      {orderedCategories.map((categoryName) => {
        const category = CATEGORIES.find(c => c.name === categoryName)
        const categoryIngredients = groupedByCategory[categoryName] || []
        const isEmpty = categoryIngredients.length === 0

        return (
          <div key={categoryName} className="slide-in">
            {/* Category Header - Menu Style */}
            <div className="mb-4 relative">
              {/* Decorative line before category name */}
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-chalk-white/40 to-chalk-white/40"></div>
                <div
                  className="w-3 h-3 rotate-45"
                  style={{ backgroundColor: category?.color }}
                ></div>
              </div>

              {/* Category name with decorative underline */}
              <div className="relative inline-block">
                <h2
                  className="font-chalk text-4xl chalk-text transform -rotate-1 relative"
                  style={{ color: category?.color }}
                >
                  {categoryName}
                  {/* Decorative underline */}
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-3"
                    viewBox="0 0 200 12"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0,6 Q50,3 100,6 T200,6"
                      fill="none"
                      stroke={category?.color}
                      strokeWidth="2"
                      opacity="0.4"
                      strokeLinecap="round"
                    />
                  </svg>
                </h2>
              </div>

              {/* Decorative line after category name */}
              <div className="flex items-center gap-3 mt-4">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: category?.color, opacity: 0.6 }}
                ></div>
                <div className="h-px flex-1 bg-gradient-to-r from-chalk-white/40 to-transparent"></div>
              </div>
            </div>

            {/* Ingredients in this category or empty message */}
            <div className="flex flex-col gap-3 pl-2">
              {isEmpty ? (
                <div className="py-3 px-4">
                  <p className="font-hand text-sm text-chalk-faded/50 italic">
                    Empty
                  </p>
                </div>
              ) : (
                categoryIngredients.map((ingredient) => (
                  <div key={ingredient.id}>
                    <IngredientCard
                      ingredient={ingredient}
                      onEdit={() => onEdit(ingredient)}
                      onDelete={() => onDelete(ingredient.id)}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
