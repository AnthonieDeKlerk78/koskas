/**
 * Format a date for display
 */
export const formatDate = (dateString) => {
  if (!dateString) return null
  const date = new Date(dateString)
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
  })
}

/**
 * Calculate days until expiration
 */
export const getDaysUntilExpiration = (dateString) => {
  if (!dateString) return null
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const expDate = new Date(dateString)
  expDate.setHours(0, 0, 0, 0)
  const diffTime = expDate - today
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

/**
 * Get expiration status and label
 */
export const getExpirationStatus = (dateString) => {
  const days = getDaysUntilExpiration(dateString)
  if (days === null) return { status: 'none', label: null }
  if (days < 0) return { status: 'expired', label: 'EXPIRED' }
  if (days === 0) return { status: 'today', label: 'TODAY' }
  if (days === 1) return { status: 'tomorrow', label: 'TOMORROW' }
  if (days <= 3) return { status: 'soon', label: `${days} days` }
  return { status: 'ok', label: formatDate(dateString) }
}

/**
 * Format quantity for display
 */
export const formatQuantity = (quantity) => {
  const num = parseFloat(quantity)
  if (Number.isInteger(num)) return num.toString()
  return num.toFixed(1)
}

/**
 * Debounce function for search
 */
export const debounce = (fn, delay) => {
  let timeoutId
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}
