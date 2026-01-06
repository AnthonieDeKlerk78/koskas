const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY
const BASE_URL = 'https://api.spoonacular.com'

/**
 * Find recipes by ingredients
 * @param {string[]} ingredients - Array of ingredient names
 * @param {number} number - Number of recipes to return (default 10)
 * @returns {Promise<Array>} Array of recipe objects
 */
export const findRecipesByIngredients = async (ingredients, number = 10) => {
  if (!ingredients || ingredients.length === 0) {
    return []
  }

  const ingredientList = ingredients.join(',')
  const url = `${BASE_URL}/recipes/findByIngredients?apiKey=${API_KEY}&ingredients=${encodeURIComponent(ingredientList)}&number=${number}&ranking=2&ignorePantry=true`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Spoonacular API error: ${response.status}`)
  }

  return response.json()
}

/**
 * Get recipe details by ID
 * @param {number} id - Recipe ID
 * @returns {Promise<Object>} Recipe details
 */
export const getRecipeDetails = async (id) => {
  const url = `${BASE_URL}/recipes/${id}/information?apiKey=${API_KEY}`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Spoonacular API error: ${response.status}`)
  }

  return response.json()
}
