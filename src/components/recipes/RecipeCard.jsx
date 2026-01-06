import { Clock, Users, Check, X } from 'lucide-react'
import { SaveButton } from './SaveButton'
import { useSavedRecipes } from '../../hooks/useSavedRecipes'
import { getRecipeDetails } from '../../lib/spoonacular'

export const RecipeCard = ({ recipe, onClick }) => {
  const { saveRecipe, unsaveRecipe, isRecipeSaved } = useSavedRecipes()

  const handleSaveRecipe = async (recipe) => {
    // Search results don't have full data - fetch it first
    if (!recipe.extendedIngredients) {
      const fullRecipe = await getRecipeDetails(recipe.id)
      await saveRecipe(fullRecipe)
    } else {
      await saveRecipe(recipe)
    }
  }

  const usedCount = recipe.usedIngredientCount || 0
  const missedCount = recipe.missedIngredientCount || 0
  const totalNeeded = usedCount + missedCount

  return (
    <button
      onClick={onClick}
      className="w-full bg-chalkboard-dark chalk-border rounded-lg overflow-hidden
                 text-left hover:bg-chalkboard-dark/80 active:scale-[0.99]
                 transition-all touch-highlight"
    >
      {/* Recipe image */}
      <div className="relative h-32 bg-chalkboard-black">
        {recipe.image ? (
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover opacity-80"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-4xl">🍽️</span>
          </div>
        )}
        {/* Save button - top-left corner */}
        <div className="absolute top-2 left-2">
          <SaveButton
            recipeId={recipe.id}
            isSaved={isRecipeSaved(recipe.id)}
            onSave={() => handleSaveRecipe(recipe)}
            onUnsave={unsaveRecipe}
            size="small"
          />
        </div>
        {/* Ingredient match badge */}
        <div className="absolute top-2 right-2 bg-chalkboard-black/80 px-2 py-1 rounded">
          <span className="font-hand text-xs text-chalk-green">
            {usedCount}/{totalNeeded} ingredients
          </span>
        </div>
      </div>

      {/* Recipe info */}
      <div className="p-3">
        <h3 className="font-hand text-chalk-white text-base line-clamp-2 mb-2">
          {recipe.title}
        </h3>

        {/* Ingredients summary */}
        <div className="flex flex-wrap gap-2 text-xs">
          {usedCount > 0 && (
            <div className="flex items-center gap-1 text-chalk-green">
              <Check size={12} />
              <span className="font-hand">{usedCount} have</span>
            </div>
          )}
          {missedCount > 0 && (
            <div className="flex items-center gap-1 text-chalk-yellow">
              <X size={12} />
              <span className="font-hand">{missedCount} need</span>
            </div>
          )}
        </div>

        {/* Used ingredients preview */}
        {recipe.usedIngredients && recipe.usedIngredients.length > 0 && (
          <p className="font-hand text-chalk-faded text-xs mt-2 truncate">
            Using: {recipe.usedIngredients.map(i => i.name).join(', ')}
          </p>
        )}
      </div>
    </button>
  )
}
