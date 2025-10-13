// Shared logic utilities

// Deep clone an object
export const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj.getTime())
  if (obj instanceof Array) return obj.map(item => deepClone(item))

  const clonedObj = {}
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      clonedObj[key] = deepClone(obj[key])
    }
  }
  return clonedObj
}

// Check if a value is empty (null, undefined, empty string, empty array, empty object)
export const isEmpty = (value) => {
  if (value == null) return true
  if (typeof value === 'string' && value.trim() === '') return true
  if (Array.isArray(value) && value.length === 0) return true
  if (typeof value === 'object' && Object.keys(value).length === 0) return true
  return false
}

// Generate a unique ID
export const generateId = (prefix = '') => {
  return `${prefix}${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Sleep function for delays
export const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Get nested object property safely
export const get = (obj, path, defaultValue = undefined) => {
  const keys = path.split('.')
  let result = obj

  for (const key of keys) {
    if (result == null) return defaultValue
    result = result[key]
  }

  return result !== undefined ? result : defaultValue
}

// Set nested object property safely
export const set = (obj, path, value) => {
  const keys = path.split('.')
  const lastKey = keys.pop()
  const target = keys.reduce((current, key) => {
    if (!(key in current)) {
      current[key] = {}
    }
    return current[key]
  }, obj)

  target[lastKey] = value
  return obj
}

// Remove duplicates from an array
export const removeDuplicates = (array, key) => {
  if (!Array.isArray(array)) return []

  if (key) {
    const seen = new Set()
    return array.filter(item => {
      const value = get(item, key)
      if (seen.has(value)) return false
      seen.add(value)
      return true
    })
  }

  return [...new Set(array)]
}

// Group array of objects by a key
export const groupBy = (array, key) => {
  if (!Array.isArray(array)) return {}

  return array.reduce((groups, item) => {
    const groupKey = get(item, key) || 'undefined'
    if (!groups[groupKey]) {
      groups[groupKey] = []
    }
    groups[groupKey].push(item)
    return groups
  }, {})
}

// Sort array of objects by multiple keys
export const sortBy = (array, keys) => {
  if (!Array.isArray(array)) return []

  return [...array].sort((a, b) => {
    for (const key of keys) {
      const { field, direction = 'asc' } = typeof key === 'string' ? { field: key } : key
      const aVal = get(a, field)
      const bVal = get(b, field)

      if (aVal < bVal) return direction === 'asc' ? -1 : 1
      if (aVal > bVal) return direction === 'asc' ? 1 : -1
    }
    return 0
  })
}

// Filter array of objects by search term
export const filterBySearch = (array, searchTerm, searchFields) => {
  if (!Array.isArray(array) || !searchTerm) return array

  const term = searchTerm.toLowerCase()

  return array.filter(item => {
    return searchFields.some(field => {
      const value = get(item, field)
      return value && String(value).toLowerCase().includes(term)
    })
  })
}

// Validate email format
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validate phone number format
export const isValidPhoneNumber = (phone) => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
  const cleaned = phone.replace(/\D/g, '')
  return phoneRegex.test(cleaned) && cleaned.length >= 10 && cleaned.length <= 15
}

// Validate URL format
export const isValidUrl = (url) => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// Download data as CSV
export const downloadCSV = (data, filename = 'export.csv') => {
  if (!data || data.length === 0) {
    throw new Error('No data to export')
  }

  const headers = Object.keys(data[0])
  const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(header => {
      const value = row[header]
      // Escape quotes and wrap in quotes if contains comma, quote, or newline
      if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
        return `"${value.replace(/"/g, '""')}"`
      }
      return value
    }).join(','))
  ].join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  window.URL.revokeObjectURL(url)
}
