import { useState, useEffect } from 'react'
import { Check } from 'lucide-react'
import { ChalkInput } from '../ui/ChalkInput'
import { ChalkButton } from '../ui/ChalkButton'
import { Select } from '../ui/Select'
import { NumericStepper } from '../ui/NumericStepper'
import { CATEGORIES, UNITS, LOCATIONS } from '../../utils/constants'

export const IngredientForm = ({ ingredient, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Other',
    quantity: 1,
    unit: 'unit',
    location: 'pantry',
    expiration_date: '',
    notes: '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (ingredient) {
      setFormData({
        name: ingredient.name || '',
        category: ingredient.category || 'Other',
        quantity: ingredient.quantity || 1,
        unit: ingredient.unit || 'unit',
        location: ingredient.location || 'pantry',
        expiration_date: ingredient.expiration_date || '',
        notes: ingredient.notes || '',
      })
    }
  }, [ingredient])

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    try {
      setLoading(true)
      await onSubmit({
        ...formData,
        name: formData.name.trim(),
        expiration_date: formData.expiration_date || null,
        notes: formData.notes.trim() || null,
      })
    } catch (err) {
      setErrors({ submit: err.message })
    } finally {
      setLoading(false)
    }
  }

  const categoryOptions = CATEGORIES.map(c => ({ value: c.name, label: c.name }))
  const unitOptions = UNITS
  const locationOptions = LOCATIONS

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <ChalkInput
        label="name *"
        placeholder="e.g. chicken breast"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        error={errors.name}
        autoFocus
      />

      <Select
        label="category"
        options={categoryOptions}
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
      />

      <div className="grid grid-cols-2 gap-4">
        <NumericStepper
          label="quantity"
          value={formData.quantity}
          onChange={(value) => setFormData({ ...formData, quantity: value })}
        />
        <Select
          label="unit"
          options={unitOptions}
          value={formData.unit}
          onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="font-hand text-chalk-faded text-sm">location</label>
        <div className="flex gap-3">
          {locationOptions.map((loc) => (
            <label
              key={loc.value}
              className="flex items-center gap-2 cursor-pointer touch-highlight"
            >
              <div
                className={`
                  w-5 h-5 rounded-full border-2
                  flex items-center justify-center
                  transition-colors
                  ${formData.location === loc.value
                    ? 'border-chalk-white bg-chalk-white'
                    : 'border-chalk-faded'
                  }
                `}
              >
                {formData.location === loc.value && (
                  <div className="w-2 h-2 rounded-full bg-chalkboard-black" />
                )}
              </div>
              <span className="font-hand text-chalk-white">{loc.label}</span>
            </label>
          ))}
        </div>
      </div>

      <ChalkInput
        label="expiration (optional)"
        type="date"
        value={formData.expiration_date}
        onChange={(e) => setFormData({ ...formData, expiration_date: e.target.value })}
      />

      <ChalkInput
        label="notes (optional)"
        placeholder="Any additional notes..."
        value={formData.notes}
        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
      />

      {errors.submit && (
        <p className="font-hand text-chalk-red text-sm">{errors.submit}</p>
      )}

      <div className="flex gap-3 pt-2">
        <ChalkButton
          type="button"
          variant="ghost"
          onClick={onCancel}
          className="flex-1"
        >
          cancel
        </ChalkButton>
        <ChalkButton
          type="submit"
          variant="primary"
          disabled={loading}
          className="flex-1 flex items-center justify-center gap-2"
        >
          <Check size={20} />
          {loading ? 'saving...' : 'save item'}
        </ChalkButton>
      </div>
    </form>
  )
}
