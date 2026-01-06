import { useState, useCallback } from 'react'
import { findRecipesByIngredients, getRecipeDetails } from '../lib/spoonacular'

export const useRecipes = () => {
  const [recipes, setRecipes] = useState([])
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const searchRecipes = useCallback(async (ingredients) => {
    if (!ingredients || ingredients.length === 0) {
      setRecipes([])
      return
    }

    try {
      setLoading(true)
      setError(null)
      const results = await findRecipesByIngredients(ingredients, 12)
      setRecipes(results)
    } catch (err) {
      setError(err.message)
      console.error('Error fetching recipes:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchRecipeDetails = useCallback(async (id) => {
    try {
      setLoading(true)
      setError(null)
      const details = await getRecipeDetails(id)
      setSelectedRecipe(details)
      return details
    } catch (err) {
      setError(err.message)
      console.error('Error fetching recipe details:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  const clearSelectedRecipe = useCallback(() => {
    setSelectedRecipe(null)
  }, [])

  return {
    recipes,
    selectedRecipe,
    loading,
    error,
    searchRecipes,
    fetchRecipeDetails,
    clearSelectedRecipe,
  }
}
