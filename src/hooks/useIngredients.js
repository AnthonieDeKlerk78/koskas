import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

export const useIngredients = () => {
  const { user } = useAuth()
  const [ingredients, setIngredients] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchIngredients = useCallback(async () => {
    if (!user) {
      setIngredients([])
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      const { data, error: fetchError } = await supabase
        .from('ingredients')
        .select('*')
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError
      setIngredients(data || [])
    } catch (err) {
      setError(err.message)
      console.error('Error fetching ingredients:', err)
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    fetchIngredients()
  }, [fetchIngredients])

  const addIngredient = async (ingredient) => {
    if (!user) throw new Error('User must be logged in')

    const { data, error: insertError } = await supabase
      .from('ingredients')
      .insert([{ ...ingredient, user_id: user.id }])
      .select()
      .single()

    if (insertError) throw insertError
    setIngredients((prev) => [data, ...prev])
    return data
  }

  const updateIngredient = async (id, updates) => {
    const { data, error: updateError } = await supabase
      .from('ingredients')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (updateError) throw updateError
    setIngredients((prev) =>
      prev.map((item) => (item.id === id ? data : item))
    )
    return data
  }

  const deleteIngredient = async (id) => {
    const { error: deleteError } = await supabase
      .from('ingredients')
      .delete()
      .eq('id', id)

    if (deleteError) throw deleteError
    setIngredients((prev) => prev.filter((item) => item.id !== id))
  }

  return {
    ingredients,
    loading,
    error,
    fetchIngredients,
    addIngredient,
    updateIngredient,
    deleteIngredient,
  }
}
