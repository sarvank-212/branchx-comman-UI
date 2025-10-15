import { lazy } from 'react'

// Lazy load pages for better performance
const AdminPage = lazy(() => import('../pages/Admin/AdminPage'))

// Route configuration
export const routes = [
  {
    path: '/admin',
    element: AdminPage,
    title: 'Admin',
    requiresAuth: true,
  },
  {
    path: '/',
    element: AdminPage, // Default to admin
    title: 'Admin',
    requiresAuth: true,
  },
]

// Helper function to get route by path
export const getRouteByPath = (path) => {
  return routes.find(route => route.path === path)
}

// Helper function to get all routes
export const getAllRoutes = () => {
  return routes
}
