import { useState, useEffect } from 'react'
import AdminService from '../api/admin/adminService'
import DashboardService from '../api/dashboard/dashboardService'
import { DEFAULT_MENU_ITEMS } from '../config/constants'

// Default menu items configuration (moved to constants)
// export const getDefaultMenuItems = () => {
//   return [
//     {
//       id: 'admin',
//       name: 'Admin',
//       modules: [
//         { id: 'users', name: 'Users' },
//         { id: 'api_config', name: 'API Configuration' },
//         { id: 'pin_requests', name: 'PIN Requests' },
//         { id: 'pin_verifications', name: 'PIN Verifications' },
//         { id: 'products', name: 'Products' }
//       ]
//     }
//   ]
// }

// Custom hook for app state and business logic
export const useAppLogic = () => {
  const [menuItems, setMenuItems] = useState([])
  const [selectedModule, setSelectedModule] = useState(null)
  const [gridData, setGridData] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [pageSize] = useState(10)

  // Fetch initial menu items
  const fetchMenuItems = async () => {
    try {
      const response = await AdminService.getMenuItems()
      // Ensure we have valid data structure
      if (response && response.data && Array.isArray(response.data)) {
        setMenuItems(response.data)
      } else {
        console.warn('Invalid menu items response, using defaults')
        setMenuItems(DEFAULT_MENU_ITEMS)
      }
    } catch (error) {
      console.error('Error fetching menu items:', error)
      // Set default menu items for development
      setMenuItems(DEFAULT_MENU_ITEMS)
    }
  }

  // Fetch module data
  const fetchModuleData = async (module, page) => {
    setLoading(true)

    try {
      let response

      // Use appropriate service based on module type
      if (module.startsWith('admin/') || ['users', 'api_config', 'pin_requests', 'pin_verifications', 'products'].includes(module)) {
        // Admin module data
        response = await AdminService.getModuleData(module, {
          pageSize,
          page,
          filters: null,
          orderBy: []
        })
      } else {
        // Dashboard module data (default fallback)
        response = await DashboardService.getModuleData(module, {
          pageSize,
          page,
          filters: null,
          orderBy: []
        })
      }

      setGridData(response.data?.data || response.data || [])
      setTotalPages(response.data?.totalPages || 1)
    } catch (error) {
      console.error('Error fetching data:', error)
      setGridData([])
      setTotalPages(1)
    } finally {
      setLoading(false)
    }
  }

  // Handle module selection
  const handleModuleSelect = async (module) => {
    setSelectedModule(module)
    setCurrentPage(1)

    // Don't fetch data for dashboard module
    if (module !== 'dashboard') {
      await fetchModuleData(module, 1)
    }
  }

  // Handle page change
  const handlePageChange = async (newPage) => {
    if (selectedModule && newPage >= 1 && newPage <= totalPages && selectedModule !== 'dashboard') {
      setCurrentPage(newPage)
      await fetchModuleData(selectedModule, newPage)
    }
  }

  // Initialize on mount
  useEffect(() => {
    fetchMenuItems()
  }, [])

  // Auto-select first module when menu items are loaded
  useEffect(() => {
    if (menuItems && menuItems.length > 0 && !selectedModule) {
      // Select dashboard if available, otherwise select first available module
      const dashboardModule = menuItems.find(item => item.id === 'dashboard')?.modules?.[0]?.id
      const firstModule = menuItems[0]?.modules?.[0]?.id

      const moduleToSelect = dashboardModule || firstModule

      if (moduleToSelect) {
        console.log('Auto-selecting module:', moduleToSelect)
        setSelectedModule(moduleToSelect)
        setCurrentPage(1)

        // Don't fetch data for dashboard module
        if (moduleToSelect !== 'dashboard') {
          fetchModuleData(moduleToSelect, 1)
        }
      }
    }
  }, [menuItems, selectedModule])
  useEffect(() => {
    // Define global functions for AG Grid actions
    window.addNewRecord = async (moduleId) => {
      console.log('Add new record triggered for module:', moduleId)
      // This function is now handled by the modal in AGGridComponent
      // The modal will open and handle the API call
    }

    window.importData = async (moduleId) => {
      console.log('Importing data for module:', moduleId)
      // Implement import functionality
      alert('Import functionality not yet implemented')
    }

    window.exportData = async (moduleId, data) => {
      console.log('Exporting data for module:', moduleId)
      try {
        // Create CSV content from data
        if (!data || data.length === 0) {
          alert('No data to export')
          return
        }

        const headers = Object.keys(data[0])
        const csvContent = [
          headers.join(','),
          ...data.map(row => headers.map(header => row[header] || '').join(','))
        ].join('\n')

        // Create and download file
        const blob = new Blob([csvContent], { type: 'text/csv' })
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `${moduleId}_export.csv`
        link.click()
        window.URL.revokeObjectURL(url)

        console.log('Data exported successfully')
      } catch (error) {
        console.error('Error exporting data:', error)
        alert('Error exporting data')
      }
    }

    window.editRecord = async (recordId) => {
      console.log('Editing record:', recordId)
      // Implement edit functionality
      alert(`Edit functionality not yet implemented for record ${recordId}`)
    }

    window.deleteRecord = async (recordId) => {
      console.log('Deleting record:', recordId)
      if (confirm('Are you sure you want to delete this record?')) {
        try {
          // Call delete API endpoint using appropriate service
          let response
          if (selectedModule?.startsWith('admin/') || ['users', 'api_config', 'pin_requests', 'pin_verifications', 'products'].includes(selectedModule)) {
            response = await AdminService.deleteRecord(selectedModule, recordId)
          } else {
            response = await DashboardService.deleteRecord(selectedModule, recordId)
          }
          console.log('Delete response:', response)

          // Refresh the data after deleting
          if (selectedModule) {
            await fetchModuleData(selectedModule, currentPage)
          }
        } catch (error) {
          console.error('Error deleting record:', error)
          alert('Error deleting record. Please try again.')
        }
      }
    }

    window.refreshGridData = async () => {
      console.log('Refreshing grid data...')
      try {
        if (selectedModule) {
          await fetchModuleData(selectedModule, currentPage)
        }
      } catch (error) {
        console.error('Error refreshing grid data:', error)
      }
    }

    // Cleanup function to remove global functions
    return () => {
      delete window.addNewRecord
      delete window.importData
      delete window.exportData
      delete window.editRecord
      delete window.deleteRecord
      delete window.refreshGridData
    }
  }, [selectedModule, currentPage, fetchModuleData])

  return {
    menuItems,
    selectedModule,
    gridData,
    loading,
    currentPage,
    handleModuleSelect,
    handlePageChange,
  }
}
