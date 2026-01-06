import { Package } from 'lucide-react'
import { IngredientCard } from './IngredientCard'

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

  return (
    <div className="flex flex-col gap-3">
      {ingredients.map((ingredient) => (
        <div key={ingredient.id} className="slide-in">
          <IngredientCard
            ingredient={ingredient}
            onEdit={() => onEdit(ingredient)}
            onDelete={() => onDelete(ingredient.id)}
          />
        </div>
      ))}
    </div>
  )
}
