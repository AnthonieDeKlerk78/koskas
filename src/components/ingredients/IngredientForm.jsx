import { useState, useEffect } from 'react'
import { Check, X, Upload, Image } from 'lucide-react'
import { ChalkInput } from '../ui/ChalkInput'
import { ChalkButton } from '../ui/ChalkButton'
import { Select } from '../ui/Select'
import { NumericStepper } from '../ui/NumericStepper'
import { CATEGORIES, UNITS, LOCATIONS } from '../../utils/constants'
import { supabase } from '../../lib/supabase'

export const IngredientForm = ({ ingredient, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Other',
    quantity: 1,
    unit: 'unit',
    location: 'pantry',
    expiration_date: '',
    notes: '',
    calories: '',
    contents: [],
    image_url: '',
  })
  const [contentInput, setContentInput] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [uploadingImage, setUploadingImage] = useState(false)
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
        calories: ingredient.calories || '',
        contents: ingredient.contents || [],
        image_url: ingredient.image_url || '',
      })
      if (ingredient.image_url) {
        setImagePreview(ingredient.image_url)
      }
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

  const uploadImage = async (file) => {
    try {
      setUploadingImage(true)
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError, data } = await supabase.storage
        .from('ingredient-images')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('ingredient-images')
        .getPublicUrl(filePath)

      return publicUrl
    } catch (err) {
      console.error('Error uploading image:', err)
      throw err
    } finally {
      setUploadingImage(false)
    }
  }

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setErrors({ ...errors, image: 'Please select an image file' })
      return
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors({ ...errors, image: 'Image must be less than 5MB' })
      return
    }

    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
    setErrors({ ...errors, image: null })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    try {
      setLoading(true)

      let imageUrl = formData.image_url

      // Upload new image if selected
      if (imageFile) {
        imageUrl = await uploadImage(imageFile)
      }

      await onSubmit({
        ...formData,
        name: formData.name.trim(),
        expiration_date: formData.expiration_date || null,
        notes: formData.notes.trim() || null,
        calories: formData.calories ? Number(formData.calories) : null,
        contents: formData.contents.length > 0 ? formData.contents : null,
        image_url: imageUrl || null,
      })
    } catch (err) {
      setErrors({ submit: err.message })
    } finally {
      setLoading(false)
    }
  }

  const addContent = () => {
    if (contentInput.trim() && !formData.contents.includes(contentInput.trim())) {
      setFormData({
        ...formData,
        contents: [...formData.contents, contentInput.trim()]
      })
      setContentInput('')
    }
  }

  const removeContent = (contentToRemove) => {
    setFormData({
      ...formData,
      contents: formData.contents.filter(c => c !== contentToRemove)
    })
  }

  const handleContentKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addContent()
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
              <input
                type="radio"
                name="location"
                value={loc.value}
                checked={formData.location === loc.value}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="sr-only"
              />
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

      <ChalkInput
        label="calories (optional)"
        type="number"
        placeholder="e.g. 250"
        value={formData.calories}
        onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
      />

      <div className="flex flex-col gap-2">
        <label className="font-hand text-chalk-faded text-sm">image (optional)</label>
        <div className="flex flex-col gap-3">
          {imagePreview && (
            <div className="relative w-full h-40 rounded-lg overflow-hidden bg-chalk-white/5">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <div className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-chalk-faded rounded-lg hover:border-chalk-white transition-colors">
              {uploadingImage ? (
                <span className="font-hand text-chalk-white">uploading...</span>
              ) : (
                <>
                  <Upload size={20} className="text-chalk-faded" />
                  <span className="font-hand text-chalk-white">
                    {imagePreview ? 'change image' : 'upload image'}
                  </span>
                </>
              )}
            </div>
          </label>
          {errors.image && (
            <p className="font-hand text-chalk-red text-sm">{errors.image}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-hand text-chalk-faded text-sm">contents (optional)</label>
        <div className="flex gap-2">
          <ChalkInput
            placeholder="e.g. sugar, oil, cocoa"
            value={contentInput}
            onChange={(e) => setContentInput(e.target.value)}
            onKeyPress={handleContentKeyPress}
          />
          <ChalkButton
            type="button"
            variant="ghost"
            onClick={addContent}
            className="px-4"
          >
            add
          </ChalkButton>
        </div>
        {formData.contents.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.contents.map((content, index) => (
              <div
                key={index}
                className="flex items-center gap-1 px-3 py-1 bg-chalk-white/10 rounded-full"
              >
                <span className="font-hand text-chalk-white text-sm">{content}</span>
                <button
                  type="button"
                  onClick={() => removeContent(content)}
                  className="text-chalk-faded hover:text-chalk-red transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

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
