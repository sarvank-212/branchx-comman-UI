// Common data formatting helpers

// Format currency values
export const formatCurrency = (value, currency = 'USD') => {
  if (value == null || isNaN(value)) return '$0.00'

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(value)
}

// Format date values
export const formatDate = (date, options = {}) => {
  if (!date) return ''

  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options,
  }

  return new Date(date).toLocaleDateString('en-US', defaultOptions)
}

// Format date and time
export const formatDateTime = (date, options = {}) => {
  if (!date) return ''

  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    ...options,
  }

  return new Date(date).toLocaleString('en-US', defaultOptions)
}

// Format phone numbers
export const formatPhoneNumber = (phone) => {
  if (!phone) return ''

  const cleaned = phone.replace(/\D/g, '')

  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
  }

  return phone
}

// Format file sizes
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Format percentages
export const formatPercentage = (value, decimals = 1) => {
  if (value == null || isNaN(value)) return '0%'

  return `${parseFloat(value).toFixed(decimals)}%`
}

// Truncate text with ellipsis
export const truncateText = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text

  return text.slice(0, maxLength - 3) + '...'
}

// Capitalize first letter of each word
export const capitalize = (str) => {
  if (!str) return ''

  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// Convert string to title case
export const toTitleCase = (str) => {
  if (!str) return ''

  return str
    .toLowerCase()
    .split(/[-_\s]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// Format numbers with commas
export const formatNumber = (num) => {
  if (num == null || isNaN(num)) return '0'

  return num.toLocaleString('en-US')
}

// Debounce function for search inputs
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}
