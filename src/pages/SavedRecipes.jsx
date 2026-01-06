import { useState } from 'react'
import { Heart } from 'lucide-react'
import { useSavedRecipes } from '../hooks/useSavedRecipes'
import { ChalkboardFrame } from '../components/layout/ChalkboardFrame'
import { MobileHeader } from '../components/layout/MobileHeader'
import { BottomNav } from '../components/layout/BottomNav'
import { RecipeDetail } from '../components/recipes/RecipeDetail'
import { SavedRecipeCard } from '../components/recipes/SavedRecipeCard'

export const SavedRecipes = () => {
  const { savedRecipes, loading, error } = useSavedRecipes()
  const [selectedRecipe, setSelectedRecipe] = useState(null)

  const handleRecipeClick = (savedRecipe) => {
    // Extract the full recipe data from JSONB
    setSelectedRecipe(savedRecipe.recipe_data)
  }

  const handleBackToResults = () => {
    setSelectedRecipe(null)
  }

  // Show recipe detail view
  if (selectedRecipe) {
    return <RecipeDetail recipe={selectedRecipe} onClose={handleBackToResults} />
  }

  return (
    <ChalkboardFrame>
      <div className="flex flex-col min-h-screen pb-20">
        <MobileHeader title="Saved Recipes" />

        <main className="flex-1 px-4 py-4">
          {/* Header */}
          <div className="mb-4">
            <p className="font-hand text-chalk-faded">
              Your collection of saved recipes
            </p>
          </div>

          {/* Loading state */}
          {loading ? (
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-48 rounded-lg bg-chalkboard-dark/50 animate-pulse"
                />
              ))}
            </div>
          ) : error ? (
            <p className="font-hand text-chalk-red text-center mt-8">{error}</p>
          ) : savedRecipes.length === 0 ? (
            // Empty state
            <div className="text-center py-12">
              <Heart size={64} className="text-chalk-faded mx-auto mb-4" />
              <p className="font-hand text-chalk-white text-lg mb-2">
                No saved recipes yet
              </p>
              <p className="font-hand text-chalk-faded text-sm">
                Save recipes from the search results to view them here
              </p>
            </div>
          ) : (
            // Recipe grid
            <div className="grid grid-cols-2 gap-3">
              {savedRecipes.map((saved) => (
                <SavedRecipeCard
                  key={saved.id}
                  savedRecipe={saved}
                  onClick={() => handleRecipeClick(saved)}
                />
              ))}
            </div>
          )}
        </main>

        <BottomNav activeTab="saved" />
      </div>
    </ChalkboardFrame>
  )
}
