// Environment configuration
// This file maps environment variables and provides defaults

// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
}

// App Configuration
export const APP_CONFIG = {
  NAME: import.meta.env.VITE_APP_NAME || 'Frontend AgGrid',
  VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  ENVIRONMENT: import.meta.env.VITE_NODE_ENV || import.meta.env.MODE || 'development',
}

// Feature Flags
export const FEATURES = {
  ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true' || false,
  ENABLE_DEBUG_MODE: import.meta.env.VITE_ENABLE_DEBUG_MODE === 'true' || false,
  ENABLE_MOCK_DATA: import.meta.env.VITE_ENABLE_MOCK_DATA === 'true' || false,
}

// Pagination Configuration
export const PAGINATION_CONFIG = {
  DEFAULT_PAGE_SIZE: parseInt(import.meta.env.VITE_DEFAULT_PAGE_SIZE) || 10,
  MAX_PAGE_SIZE: parseInt(import.meta.env.VITE_MAX_PAGE_SIZE) || 100,
}

// Grid Configuration
export const GRID_CONFIG = {
  DEFAULT_HEIGHT: parseInt(import.meta.env.VITE_GRID_DEFAULT_HEIGHT) || 400,
  ROW_HEIGHT: parseInt(import.meta.env.VITE_GRID_ROW_HEIGHT) || 50,
  HEADER_HEIGHT: parseInt(import.meta.env.VITE_GRID_HEADER_HEIGHT) || 50,
}

// Helper function to check if we're in development
export const isDevelopment = () => {
  return APP_CONFIG.ENVIRONMENT === 'development'
}

// Helper function to check if we're in production
export const isProduction = () => {
  return APP_CONFIG.ENVIRONMENT === 'production'
}

// Helper function to get environment-specific configuration
export const getEnvConfig = (key) => {
  return import.meta.env[key]
}
