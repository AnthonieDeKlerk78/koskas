export const CATEGORIES = [
  { name: 'Proteins', icon: 'beef', color: '#FF6B6B' },
  { name: 'Dairy & Alternatives', icon: 'milk', color: '#FFFFFF' },
  { name: 'Vegetables', icon: 'carrot', color: '#7ED687' },
  { name: 'Fruits', icon: 'apple', color: '#FFB347' },
  { name: 'Grains & Starches', icon: 'wheat', color: '#DEB887' },
  { name: 'Herbs & Spices', icon: 'leaf', color: '#7ED687' },
  { name: 'Condiments & Sauces', icon: 'flask-conical', color: '#FF6B9D' },
  { name: 'Oils & Fats', icon: 'droplet', color: '#FFE066' },
  { name: 'Baking Supplies', icon: 'cookie', color: '#DEB887' },
  { name: 'Beverages', icon: 'coffee', color: '#87CEEB' },
  { name: 'Snacks', icon: 'candy', color: '#FF6B9D' },
  { name: 'Other', icon: 'package', color: '#B0B0B0' },
]

export const UNITS = [
  { value: 'unit', label: 'unit' },
  { value: 'piece', label: 'piece' },
  { value: 'dozen', label: 'dozen' },
  { value: 'bunch', label: 'bunch' },
  { value: 'g', label: 'g' },
  { value: 'kg', label: 'kg' },
  { value: 'oz', label: 'oz' },
  { value: 'lb', label: 'lb' },
  { value: 'ml', label: 'ml' },
  { value: 'L', label: 'L' },
  { value: 'cup', label: 'cup' },
  { value: 'tbsp', label: 'tbsp' },
  { value: 'tsp', label: 'tsp' },
  { value: 'fl oz', label: 'fl oz' },
]

export const LOCATIONS = [
  { value: 'pantry', label: 'Pantry' },
  { value: 'fridge', label: 'Fridge' },
  { value: 'freezer', label: 'Freezer' },
]

export const getCategoryColor = (categoryName) => {
  const category = CATEGORIES.find(c => c.name === categoryName)
  return category?.color || '#B0B0B0'
}

export const getCategoryIcon = (categoryName) => {
  const category = CATEGORIES.find(c => c.name === categoryName)
  return category?.icon || 'package'
}
