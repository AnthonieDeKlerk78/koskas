import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

export const useSavedRecipes = () => {
  const { user } = useAuth()
  const [savedRecipes, setSavedRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch all saved recipes for current user
  const fetchSavedRecipes = useCallback(async () => {
    if (!user) {
      setSavedRecipes([])
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      const { data, error: fetchError } = await supabase
        .from('saved_recipes')
        .select('*')
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError
      setSavedRecipes(data || [])
    } catch (err) {
      setError(err.message)
      console.error('Error fetching saved recipes:', err)
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    fetchSavedRecipes()
  }, [fetchSavedRecipes])

  // Save a recipe (with full details)
  const saveRecipe = async (recipe) => {
    if (!user) throw new Error('User must be logged in')

    const recipeData = {
      user_id: user.id,
      recipe_id: recipe.id,
      recipe_data: recipe, // Store complete recipe object
      title: recipe.title,
      image_url: recipe.image || null,
      ready_in_minutes: recipe.readyInMinutes || null,
      servings: recipe.servings || null,
    }

    const { data, error: insertError } = await supabase
      .from('saved_recipes')
      .insert([recipeData])
      .select()
      .single()

    if (insertError) {
      // Handle duplicate save error gracefully
      if (insertError.code === '23505') {
        throw new Error('Recipe already saved')
      }
      throw insertError
    }

    setSavedRecipes((prev) => [data, ...prev])
    return data
  }

  // Unsave a recipe by recipe_id (from Spoonacular)
  const unsaveRecipe = async (recipeId) => {
    const { error: deleteError } = await supabase
      .from('saved_recipes')
      .delete()
      .eq('recipe_id', recipeId)
      .eq('user_id', user.id)

    if (deleteError) throw deleteError

    setSavedRecipes((prev) =>
      prev.filter((item) => item.recipe_id !== recipeId)
    )
  }

  // Check if a recipe is saved (for UI state)
  const isRecipeSaved = useCallback(
    (recipeId) => {
      return savedRecipes.some((r) => r.recipe_id === recipeId)
    },
    [savedRecipes]
  )

  return {
    savedRecipes,
    loading,
    error,
    fetchSavedRecipes,
    saveRecipe,
    unsaveRecipe,
    isRecipeSaved,
  }
}
