import { lazy } from 'react'

// Lazy load pages for better performance
const AdminPage = lazy(() => import('../pages/Admin/AdminPage'))
const DashboardPage = lazy(() => import('../pages/Dashboard/DashboardPage'))

// Route configuration
export const routes = [
  {
    path: '/admin',
    element: AdminPage,
    title: 'Admin',
    requiresAuth: true,
  },
  {
    path: '/dashboard',
    element: DashboardPage,
    title: 'Dashboard',
    requiresAuth: true,
  },
  {
    path: '/',
    element: DashboardPage, // Default to dashboard
    title: 'Dashboard',
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
