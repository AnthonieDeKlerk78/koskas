import { Clock, Users } from 'lucide-react'
import { SaveButton } from './SaveButton'
import { useSavedRecipes } from '../../hooks/useSavedRecipes'

export const SavedRecipeCard = ({ savedRecipe, onClick }) => {
  const { unsaveRecipe } = useSavedRecipes()

  return (
    <button
      onClick={onClick}
      className="w-full bg-chalkboard-dark chalk-border rounded-lg overflow-hidden
                 text-left hover:bg-chalkboard-dark/80 active:scale-[0.99]
                 transition-all touch-highlight"
    >
      {/* Recipe image */}
      <div className="relative h-32 bg-chalkboard-black">
        {savedRecipe.image_url ? (
          <img
            src={savedRecipe.image_url}
            alt={savedRecipe.title}
            className="w-full h-full object-cover opacity-80"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-4xl">🍽️</span>
          </div>
        )}

        {/* Save button - top-left */}
        <div className="absolute top-2 left-2">
          <SaveButton
            recipeId={savedRecipe.recipe_id}
            isSaved={true} // Always true on this page
            onUnsave={unsaveRecipe}
            size="small"
          />
        </div>
      </div>

      {/* Recipe info */}
      <div className="p-3">
        <h3 className="font-hand text-chalk-white text-base line-clamp-2 mb-2">
          {savedRecipe.title}
        </h3>

        {/* Quick info */}
        <div className="flex flex-wrap gap-3 text-xs text-chalk-faded">
          {savedRecipe.ready_in_minutes && (
            <div className="flex items-center gap-1">
              <Clock size={12} />
              <span className="font-hand">{savedRecipe.ready_in_minutes} min</span>
            </div>
          )}
          {savedRecipe.servings && (
            <div className="flex items-center gap-1">
              <Users size={12} />
              <span className="font-hand">{savedRecipe.servings}</span>
            </div>
          )}
        </div>
      </div>
    </button>
  )
}
