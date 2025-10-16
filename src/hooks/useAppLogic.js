import { useState, useEffect, useCallback } from 'react'
import AdminService from '../api/admin/adminService'
import { DEFAULT_MENU_ITEMS } from '../config/constants'
import { getFormFields } from '../config/columnSchemas'

const maskSensitive = (rows) => {
  if (!Array.isArray(rows)) return rows
  return rows.map(r => {
    const copy = { ...r }
    if ('password' in copy) copy.password = '••••••'
    if ('passwordHash' in copy) copy.passwordHash = '••••••'
    return copy
  })
}

export const useAppLogic = () => {
  const [menuItems, setMenuItems] = useState([])
  const [selectedModule, setSelectedModule] = useState(null)
  const [gridData, setGridData] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [formFields, setFormFields] = useState([])

  const fetchMenuItems = useCallback(async () => {
    try {
      const response = await AdminService.getMenuItems()
      if (response && response.data && Array.isArray(response.data)) setMenuItems(response.data)
      else setMenuItems(DEFAULT_MENU_ITEMS)
    } catch (err) {
      setMenuItems(DEFAULT_MENU_ITEMS)
    }
  }, [])

  const fetchModuleData = useCallback(async (module, page = 1) => {
    setLoading(true)
    try {
      const response = await AdminService.getModuleData(module, { pageSize: 1000, page, filters: null, orderBy: [] })
      const rows = response?.data?.data || response?.data || response || []
      setGridData(maskSensitive(rows))
      setTotalPages(response?.data?.totalPages || 1)
    } catch (err) {
      setGridData([])
      setTotalPages(1)
    } finally {
      setLoading(false)
    }
  }, [])

  const handleModuleSelect = async (module) => {
    setSelectedModule(module)
    setCurrentPage(1)
    await fetchModuleData(module, 1)
  }

  const handlePageChange = async (newPage) => {
    if (selectedModule && newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
      await fetchModuleData(selectedModule, newPage)
    }
  }

  useEffect(() => { fetchMenuItems() }, [fetchMenuItems])

  useEffect(() => {
    if (menuItems && menuItems.length > 0 && !selectedModule) {
      const firstModule = menuItems[0]?.modules?.[0]?.id
      if (firstModule) {
        setSelectedModule(firstModule)
        setCurrentPage(1)
        fetchModuleData(firstModule, 1)
      }
    }
  }, [menuItems, selectedModule, fetchModuleData])

  // Generate form fields when selectedModule changes
  useEffect(() => {
    if (selectedModule) {
      const fields = getFormFields(selectedModule)
      setFormFields(fields)
    }
  }, [selectedModule])

  const openAddModal = () => {
    setIsAddModalOpen(true)
  }

  const closeAddModal = () => {
    setIsAddModalOpen(false)
  }

  const handleAddSuccess = async () => {
    await fetchModuleData(selectedModule, currentPage)
  }

  // Expose window functions for grid actions safely
  useEffect(() => {
    window.fetchModuleData = fetchModuleData

    window.importData = async (moduleId) => { alert('Import not implemented') }
    window.exportData = async (moduleId, data) => {
      try {
        if (!data || data.length === 0) { alert('No data to export'); return }
        const headers = Object.keys(data[0])
        const csv = [headers.join(','),
          ...data.map(row => headers.map(h => JSON.stringify(row[h] ?? '')).join(','))].join('\n')
        const blob = new Blob([csv], { type: 'text/csv' })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url; a.download = `${moduleId}_export.csv`; a.click(); window.URL.revokeObjectURL(url)
      } catch (err) { alert('Export failed') }
    }
    window.editRecord = async (id) => { alert(`Edit not implemented for ${id}`) }
    window.deleteRecord = async (id) => {
      if (!confirm('Are you sure?')) return
      try {
        await AdminService.deleteRecord(selectedModule, id)
        await fetchModuleData(selectedModule, currentPage)
      } catch (err) { alert('Delete failed') }
    }
    window.openAddModal = openAddModal

    return () => {
      delete window.fetchModuleData
      delete window.importData
      delete window.exportData
      delete window.editRecord
      delete window.deleteRecord
      delete window.openAddModal
    }
  }, [fetchModuleData, selectedModule, currentPage, openAddModal, closeAddModal, handleAddSuccess])

  return {
    menuItems,
    selectedModule,
    gridData,
    loading,
    currentPage,
    totalPages,
    handleModuleSelect,
    handlePageChange,
    fetchModuleData,
    isAddModalOpen,
    openAddModal,
    closeAddModal,
    handleAddSuccess,
    formFields
  }
}
