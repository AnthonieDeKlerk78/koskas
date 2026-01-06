import { useState, useMemo, useEffect } from 'react'
import { Search } from 'lucide-react'
import { useIngredients } from '../hooks/useIngredients'
import { ChalkboardFrame } from '../components/layout/ChalkboardFrame'
import { MobileHeader } from '../components/layout/MobileHeader'
import { BottomNav } from '../components/layout/BottomNav'
import { FloatingActionButton } from '../components/layout/FloatingActionButton'
import { BottomSheet } from '../components/ui/BottomSheet'
import { CategoryChips } from '../components/ingredients/CategoryChips'
import { IngredientList } from '../components/ingredients/IngredientList'
import { IngredientForm } from '../components/ingredients/IngredientForm'
import { getDaysUntilExpiration } from '../utils/helpers'
import { debounce } from '../utils/helpers'

export const Dashboard = () => {
  const {
    ingredients,
    loading,
    addIngredient,
    updateIngredient,
    deleteIngredient,
    fetchIngredients,
  } = useIngredients()

  const [activeTab, setActiveTab] = useState('home')

  // Listen for tab change events from BottomNav
  useEffect(() => {
    const handleTabChange = (e) => {
      setActiveTab(e.detail)
    }
    window.addEventListener('tabChange', handleTabChange)
    return () => window.removeEventListener('tabChange', handleTabChange)
  }, [])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [editingIngredient, setEditingIngredient] = useState(null)

  // Filter ingredients based on tab, category, and search
  const filteredIngredients = useMemo(() => {
    let filtered = [...ingredients]

    // Filter by tab
    if (activeTab === 'expiring') {
      filtered = filtered.filter((ing) => {
        const days = getDaysUntilExpiration(ing.expiration_date)
        return days !== null && days <= 7
      })
      // Sort by expiration date (soonest first)
      filtered.sort((a, b) => {
        const daysA = getDaysUntilExpiration(a.expiration_date) ?? Infinity
        const daysB = getDaysUntilExpiration(b.expiration_date) ?? Infinity
        return daysA - daysB
      })
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((ing) => ing.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter((ing) =>
        ing.name.toLowerCase().includes(query)
      )
    }

    return filtered
  }, [ingredients, activeTab, selectedCategory, searchQuery])

  const handleSearchChange = debounce((value) => {
    setSearchQuery(value)
  }, 300)

  const handleAddClick = () => {
    setEditingIngredient(null)
    setIsSheetOpen(true)
  }

  const handleEditClick = (ingredient) => {
    setEditingIngredient(ingredient)
    setIsSheetOpen(true)
  }

  const handleDeleteClick = async (id) => {
    if (window.confirm('Are you sure you want to delete this ingredient?')) {
      try {
        await deleteIngredient(id)
      } catch (err) {
        console.error('Error deleting ingredient:', err)
      }
    }
  }

  const handleFormSubmit = async (data) => {
    if (editingIngredient) {
      await updateIngredient(editingIngredient.id, data)
    } else {
      await addIngredient(data)
    }
    setIsSheetOpen(false)
    setEditingIngredient(null)
  }

  const handleSheetClose = () => {
    setIsSheetOpen(false)
    setEditingIngredient(null)
  }

  const handlePullRefresh = async () => {
    await fetchIngredients()
  }

  return (
    <ChalkboardFrame>
      <div className="flex flex-col min-h-screen pb-20">
        <MobileHeader title="Kos-Kas" />

        <main className="flex-1 px-4 py-4">
          {/* Search bar with decorative frame */}
          <div className="relative mb-6">
            <div className="border-2 border-chalk-white/60 rounded-lg p-2 bg-chalkboard-dark/30">
              <div className="relative">
                <Search
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-chalk-faded/70"
                />
                <input
                  type="text"
                  placeholder="search ingredients..."
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full bg-transparent border-2 border-dashed border-chalk-faded/40 rounded
                             text-chalk-white font-hand py-3 pl-10 pr-4
                             placeholder:text-chalk-faded/50
                             focus:outline-none focus:border-chalk-white/60"
                />
              </div>
            </div>
          </div>

          {/* Category filter - only show if search is active or category is selected */}
          {activeTab === 'home' && (searchQuery || selectedCategory) && (
            <>
              <div className="mb-4">
                <CategoryChips
                  selected={selectedCategory}
                  onSelect={setSelectedCategory}
                />
              </div>

              {/* Decorative divider */}
              <div className="relative mb-6 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-2 border-dashed border-chalk-faded/30"></div>
                </div>
                <div className="relative flex gap-2 bg-chalkboard-black px-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-chalk-faded/40"></div>
                  <div className="w-1 h-1 rounded-full bg-chalk-faded/30"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-chalk-faded/40"></div>
                </div>
              </div>
            </>
          )}

          {/* Ingredient list in menu board style */}
          <div className="space-y-4">
            <IngredientList
              ingredients={filteredIngredients}
              loading={loading}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          </div>
        </main>

        {/* FAB */}
        <FloatingActionButton
          onClick={handleAddClick}
          pulse={ingredients.length === 0}
        />

        {/* Bottom navigation */}
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Add/Edit bottom sheet */}
        <BottomSheet
          isOpen={isSheetOpen}
          onClose={handleSheetClose}
          title={editingIngredient ? '✏️ Edit Ingredient' : '+ Add Ingredient'}
        >
          <IngredientForm
            ingredient={editingIngredient}
            onSubmit={handleFormSubmit}
            onCancel={handleSheetClose}
          />
        </BottomSheet>
      </div>
    </ChalkboardFrame>
  )
}
