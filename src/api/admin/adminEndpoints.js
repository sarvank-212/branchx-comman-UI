// Admin API endpoints constants
export const ADMIN_ENDPOINTS = {
  // Menu and initialization
  INIT: '/init',

  // User management
  USERS: '/users',
  USER_BY_ID: (id) => `/users/${id}`,

  // API Configuration
  API_CONFIG: '/api-config',
  API_CONFIG_BY_ID: (id) => `/api-config/${id}`,

  // PIN Requests
  PIN_REQUESTS: '/pin-requests',
  PIN_REQUESTS_PAGINATE: '/pin-requests/paginate',
  PIN_REQUEST_BY_ID: (id) => `/pin-requests/${id}`,

  // PIN Verifications
  PIN_VERIFICATIONS: '/pin-verifications',
  PIN_VERIFICATIONS_PAGINATE: '/pin-verifications/paginate',
  PIN_VERIFICATION_BY_ID: (id) => `/pin-verifications/${id}`,

  // Products
  PRODUCTS: '/products',
  PRODUCTS_PAGINATE: '/products/paginate',
  PRODUCT_BY_ID: (id) => `/products/${id}`,
}
