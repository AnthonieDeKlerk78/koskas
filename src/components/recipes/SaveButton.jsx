import { useState } from 'react'
import { Heart } from 'lucide-react'

export const SaveButton = ({
  recipeId,
  isSaved,
  onSave,
  onUnsave,
  size = 'default',
  className = ''
}) => {
  const [loading, setLoading] = useState(false)

  const handleClick = async (e) => {
    e.stopPropagation() // Prevent parent click handlers

    try {
      setLoading(true)
      if (isSaved) {
        await onUnsave(recipeId)
      } else {
        await onSave()
      }
    } catch (err) {
      console.error('Error toggling save:', err)
      // Could add toast notification here
    } finally {
      setLoading(false)
    }
  }

  const sizeClasses = {
    small: 'p-1.5',
    default: 'p-2',
    large: 'p-3',
  }

  const iconSizes = {
    small: 16,
    default: 20,
    large: 24,
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`
        rounded-full transition-all touch-highlight
        ${isSaved
          ? 'bg-chalk-red/20 text-chalk-red'
          : 'bg-chalkboard-black/60 text-chalk-white hover:bg-chalkboard-black/80'
        }
        ${sizeClasses[size]}
        ${loading ? 'opacity-50 cursor-wait' : ''}
        ${className}
      `}
      aria-label={isSaved ? 'Unsave recipe' : 'Save recipe'}
    >
      <Heart
        size={iconSizes[size]}
        fill={isSaved ? 'currentColor' : 'none'}
        className="transition-all"
      />
    </button>
  )
}
