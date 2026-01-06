import { useState, useMemo } from 'react'
import { ChefHat, Search, ArrowLeft } from 'lucide-react'
import { useIngredients } from '../hooks/useIngredients'
import { useRecipes } from '../hooks/useRecipes'
import { ChalkboardFrame } from '../components/layout/ChalkboardFrame'
import { MobileHeader } from '../components/layout/MobileHeader'
import { BottomNav } from '../components/layout/BottomNav'
import { ChalkButton } from '../components/ui/ChalkButton'
import { IngredientSelector } from '../components/recipes/IngredientSelector'
import { RecipeCard } from '../components/recipes/RecipeCard'
import { RecipeDetail } from '../components/recipes/RecipeDetail'

export const Recipes = () => {
  const { ingredients, loading: ingredientsLoading } = useIngredients()
  const {
    recipes,
    selectedRecipe,
    loading: recipesLoading,
    error,
    searchRecipes,
    fetchRecipeDetails,
    clearSelectedRecipe,
  } = useRecipes()

  const [selectedIngredientIds, setSelectedIngredientIds] = useState([])
  const [hasSearched, setHasSearched] = useState(false)

  const selectedIngredientNames = useMemo(() => {
    return ingredients
      .filter((ing) => selectedIngredientIds.includes(ing.id))
      .map((ing) => ing.name)
  }, [ingredients, selectedIngredientIds])

  const handleToggleIngredient = (id) => {
    setSelectedIngredientIds((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    )
  }

  const handleSelectAll = () => {
    setSelectedIngredientIds(ingredients.map((ing) => ing.id))
  }

  const handleClearSelection = () => {
    setSelectedIngredientIds([])
  }

  const handleSearchRecipes = async () => {
    if (selectedIngredientNames.length === 0) return
    setHasSearched(true)
    await searchRecipes(selectedIngredientNames)
  }

  const handleRecipeClick = async (recipe) => {
    await fetchRecipeDetails(recipe.id)
  }

  const handleBackToResults = () => {
    clearSelectedRecipe()
  }

  // Show recipe detail view
  if (selectedRecipe) {
    return <RecipeDetail recipe={selectedRecipe} onClose={handleBackToResults} />
  }

  return (
    <ChalkboardFrame>
      <div className="flex flex-col min-h-screen pb-20">
        <MobileHeader title="Find Recipes" />

        <main className="flex-1 px-4 py-4">
          {/* Selection header */}
          <div className="mb-4">
            <p className="font-hand text-chalk-faded mb-3">
              Select ingredients from your pantry to find matching recipes
            </p>

            {/* Selection controls */}
            <div className="flex items-center gap-2 mb-4">
              <ChalkButton
                size="sm"
                onClick={handleSelectAll}
                disabled={ingredients.length === 0}
              >
                Select All
              </ChalkButton>
              <ChalkButton
                size="sm"
                variant="ghost"
                onClick={handleClearSelection}
                disabled={selectedIngredientIds.length === 0}
              >
                Clear
              </ChalkButton>
              <span className="font-hand text-chalk-faded text-sm ml-auto">
                {selectedIngredientIds.length} selected
              </span>
            </div>
          </div>

          {/* Ingredient selector */}
          {ingredientsLoading ? (
            <div className="grid grid-cols-2 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-16 rounded-lg skeleton" />
              ))}
            </div>
          ) : (
            <IngredientSelector
              ingredients={ingredients}
              selectedIds={selectedIngredientIds}
              onToggle={handleToggleIngredient}
            />
          )}

          {/* Search button */}
          <div className="mt-6">
            <ChalkButton
              variant="primary"
              className="w-full flex items-center justify-center gap-2"
              onClick={handleSearchRecipes}
              disabled={selectedIngredientIds.length === 0 || recipesLoading}
            >
              <Search size={20} />
              {recipesLoading ? 'Searching...' : `Find Recipes (${selectedIngredientIds.length} ingredients)`}
            </ChalkButton>
          </div>

          {/* Error message */}
          {error && (
            <p className="mt-4 font-hand text-chalk-red text-center">{error}</p>
          )}

          {/* Results section */}
          {hasSearched && (
            <div className="mt-6">
              <div className="border-t border-dashed border-chalk-faded/30 pt-4 mb-4">
                <h2 className="font-chalk text-xl text-chalk-white chalk-text flex items-center gap-2">
                  <ChefHat size={24} />
                  Recipe Suggestions
                </h2>
                <p className="font-hand text-chalk-faded text-sm mt-1">
                  Based on: {selectedIngredientNames.slice(0, 3).join(', ')}
                  {selectedIngredientNames.length > 3 && ` +${selectedIngredientNames.length - 3} more`}
                </p>
              </div>

              {recipesLoading ? (
                <div className="grid grid-cols-2 gap-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-48 rounded-lg skeleton" />
                  ))}
                </div>
              ) : recipes.length === 0 ? (
                <div className="text-center py-8">
                  <ChefHat size={48} className="text-chalk-faded mx-auto mb-4" />
                  <p className="font-hand text-chalk-faded">
                    No recipes found with these ingredients.
                  </p>
                  <p className="font-hand text-chalk-faded text-sm mt-1">
                    Try selecting different ingredients.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {recipes.map((recipe) => (
                    <RecipeCard
                      key={recipe.id}
                      recipe={recipe}
                      onClick={() => handleRecipeClick(recipe)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </main>

        <BottomNav activeTab="recipes" />
      </div>
    </ChalkboardFrame>
  )
}
