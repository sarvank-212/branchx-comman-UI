// Application constants

// API base URLs
export const API_BASE_URL = 'http://localhost:3000'

// User roles
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  MANAGER: 'manager',
}

// Status constants
export const STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
}

// Pagination defaults
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  DEFAULT_PAGE: 1,
}

// AG Grid configuration
export const GRID_CONFIG = {
  DEFAULT_PAGE_SIZE: 10,
  CACHE_BLOCK_SIZE: 10,
  MAX_CONCURRENT_REQUESTS: 2,
}

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER_PREFERENCES: 'userPreferences',
  THEME: 'theme',
}

// Theme constants
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto',
}

// Module types
export const MODULE_TYPES = {
  ADMIN: 'admin',
}

// API endpoints (legacy support - use specific service files)
export const ENDPOINTS = {
  INIT: '/init',
  PAGINATE: '/paginate',
}

// Default menu items configuration
export const DEFAULT_MENU_ITEMS = [
  {
    id: 'admin',
    name: 'Admin',
    modules: [
      { id: 'users', name: 'Users' },
      { id: 'api_config', name: 'API Configuration' },
      { id: 'pin_requests', name: 'PIN Requests' },
      { id: 'pin_verifications', name: 'PIN Verifications' },
      { id: 'products', name: 'Products' }
    ]
  }
]

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error occurred. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'A server error occurred. Please try again later.',
}
