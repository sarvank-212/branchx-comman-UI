// Dashboard API endpoints constants
export const DASHBOARD_ENDPOINTS = {
  // Dashboard data
  DASHBOARD_DATA: '/dashboard/data',
  DASHBOARD_STATS: '/dashboard/stats',

  // Orders
  ORDERS: '/orders',
  ORDERS_PAGINATE: '/orders/paginate',
  ORDER_BY_ID: (id) => `/orders/${id}`,

  // Analytics
  ANALYTICS: '/analytics',
  SALES_REPORT: '/analytics/sales',
  USER_ACTIVITY: '/analytics/activity',
}
