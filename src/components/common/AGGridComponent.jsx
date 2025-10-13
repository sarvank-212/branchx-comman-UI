import { AgGridReact } from 'ag-grid-react'
import { useMemo, useRef, useEffect, useState } from 'react'
import { getAllColumns } from '../../config/columnSchemas'
import AdminService from '../../api/admin/adminService'
import DashboardService from '../../api/dashboard/dashboardService'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import '../../styles/global.css'
import '../AGGridComponent.css'

// Actions Cell Component
const ActionsCellRenderer = (props) => {
  const handleEdit = () => {
    if (window.editRecord) {
      window.editRecord(props.data.id)
    }
  }

  const handleDelete = () => {
    if (window.deleteRecord) {
      window.deleteRecord(props.data.id)
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', alignItems: 'center', height: '100%' }}>
      <button
        onClick={handleEdit}
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          border: '1px solid #007bff',
          borderRadius: '6px',
          padding: '4px 8px',
          fontSize: '12px',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          fontWeight: '500',
          minWidth: '28px',
          height: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          outline: 'none'
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = '#0056b3'
          e.target.style.transform = 'scale(1.05)'
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = '#007bff'
          e.target.style.transform = 'scale(1)'
        }}
        onFocus={(e) => {
          e.target.style.boxShadow = '0 0 0 2px rgba(0, 123, 255, 0.3)'
        }}
        onBlur={(e) => {
          e.target.style.boxShadow = 'none'
        }}
        aria-label={`Edit record ${props.data.id || ''}`}
        title="Edit"
      >
        ✏️
      </button>
      <button
        onClick={handleDelete}
        style={{
          backgroundColor: '#dc3545',
          color: 'white',
          border: '1px solid #dc3545',
          borderRadius: '6px',
          padding: '4px 8px',
          fontSize: '12px',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          fontWeight: '500',
          minWidth: '28px',
          height: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          outline: 'none'
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = '#c82333'
          e.target.style.transform = 'scale(1.05)'
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = '#dc3545'
          e.target.style.transform = 'scale(1)'
        }}
        onFocus={(e) => {
          e.target.style.boxShadow = '0 0 0 2px rgba(220, 53, 69, 0.3)'
        }}
        onBlur={(e) => {
          e.target.style.boxShadow = 'none'
        }}
        aria-label={`Delete record ${props.data.id || ''}`}
        title="Delete"
      >
        🗑️
      </button>
    </div>
  )
}

function AGGridComponent({
  data = [],
  selectedModule = null,
  currentPage = 1,
  totalPages = 1,
  onPageChange = () => {}
}) {
  const gridRef = useRef(null)

  // Helper function to get module name from module object or string
  const getModuleName = (module) => {
    if (!module) return ''
    if (typeof module === 'string') return module
    if (typeof module === 'object' && module.name) return module.name
    if (typeof module === 'object' && module.id) return module.id
    return 'Unknown'
  }

  // Helper function to get module id for API calls
  const getModuleId = (module) => {
    if (!module) return ''
    if (typeof module === 'string') return module
    if (typeof module === 'object' && module.id) return module.id
  }

  const moduleName = getModuleName(selectedModule)
  const moduleId = getModuleId(selectedModule)

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newRecordData, setNewRecordData] = useState({})
  const [searchTerm, setSearchTerm] = useState('')
  const [showOnlyNewRecord, setShowOnlyNewRecord] = useState(false)
  const [newRecordId, setNewRecordId] = useState(null)

  // Reset modal and form state when module changes
  useEffect(() => {
    console.log('Module changed, resetting modal state for:', moduleId)
    setIsAddModalOpen(false)
    setNewRecordData({})
    setShowOnlyNewRecord(false)
    setNewRecordId(null)
    setSearchTerm('')
  }, [moduleId])

  // Filter data based on search term and new record filter
  const filteredData = useMemo(() => {
    if (!data || !Array.isArray(data)) {
      return []
    }

    let filtered = data

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(row => {
        if (!row || typeof row !== 'object') return false
        return Object.values(row).some(value => {
          if (value === null || value === undefined) return false
          return value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        })
      })
    }

    // Apply new record filter (show only the newly added record)
    if (showOnlyNewRecord && newRecordId) {
      filtered = filtered.filter(row => row.id === newRecordId)
    }

    return filtered
  }, [data, searchTerm, showOnlyNewRecord, newRecordId])

  // Helper function to determine column width based on header text length
  const getColumnWidth = (field, columnType, headerName) => {
    // Base width calculation based on header text length
    const baseWidth = Math.max(headerName.length * 8, 80) // Minimum 80px, 8px per character

    // Adjust based on field type and common patterns
    const typeAdjustments = {
      id: -20,           // ID columns can be narrower
      email: +40,        // Email fields need more space
      mobile_number: +30, // Phone numbers need more space
      transaction_id: +40, // Transaction IDs need more space
      operator: +20,     // Operator fields need some extra space
      amount: +20,       // Amount fields need space for currency
      price: +20,        // Price fields need space for currency
      pin: +10,          // PIN fields need some extra space
      verification_type: +30, // Verification type needs space
      created_at: +20,   // Date fields need space
      sku: +20,          // SKU fields need space
      category: +30,     // Category fields need space
      status: +10,       // Status fields need some extra space
      role: +15,         // Role fields need space
      name: +25,         // Name fields need space for longer names
      actions: +10,      // Actions column needs some extra space
    }

    // Apply type adjustment
    const adjustment = typeAdjustments[field] || 0
    const finalWidth = baseWidth + adjustment

    // Ensure reasonable bounds
    return Math.max(80, Math.min(finalWidth, 300))
  }

  // Helper function to determine cell styling
  const getCellClass = (field) => {
    if (field === 'id') return 'id-cell'
    if (field.toLowerCase().includes('status')) return 'status-cell'
    if (field.toLowerCase().includes('email')) return 'email-cell'
    return ''
  }

  // Helper function to format cell values
  const getValueFormatter = (field, type) => {
    if (field.toLowerCase().includes('amount') || field.toLowerCase().includes('price')) {
      return (params) => `$${params.value?.toFixed(2) || '0.00'}`
    }
    if (field.toLowerCase().includes('date') || field.includes('At')) {
      return (params) => {
        if (!params.value) return ''
        const date = new Date(params.value)
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        })
      }
    }
    if (type === 'boolean') {
      return (params) => params.value ? '✅ Yes' : '❌ No'
    }
    return null
  }

  // Default column definition with proper sizing
  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    resizable: true,
    minWidth: 100, // Ensure minimum visibility
    maxWidth: 400, // Allow wider columns
    flex: 1,
    cellStyle: {
      textAlign: 'center',
      boxSizing: 'border-box'
    }
  }), [])

  // Auto-size columns when data changes
  useEffect(() => {
    if (gridRef.current && data && data.length > 0) {
      console.log('🔄 Auto-sizing columns for data length:', data.length)
      // Small delay to ensure grid is fully rendered
      setTimeout(() => {
        if (gridRef.current && gridRef.current.api) {
          console.log('📏 Auto-sizing columns...')
          gridRef.current.api.sizeColumnsToFit()
          console.log('✅ Columns auto-sized')
        }
      }, 100)
    }
  }, [data, moduleId])

  // Debug grid ready state
  const onGridReady = (params) => {
    console.log('🎯 AG Grid is ready!')
    console.log('📊 Grid API available:', !!params.api)
    console.log('📋 Column API available:', !!params.columnApi)

    // Auto-size columns when grid is ready
    if (data && data.length > 0) {
      setTimeout(() => {
        params.api.sizeColumnsToFit()
        console.log('🔧 Initial column sizing applied')
      }, 50)
    }
  }

  // Generate columns dynamically from data structure + fallback to schema
  const columnDefs = useMemo(() => {
    try {
      console.log('🔄 Generating columns for module:', moduleId)
      console.log('📊 Data length:', data?.length || 0)
      console.log('📋 Raw data sample:', data?.[0] || 'No data')

      // First try to get columns from schema as fallback
      let fallbackColumns = []
      try {
        fallbackColumns = getAllColumns(moduleId) || getAllColumns('default') || []
        console.log('📋 Fallback columns from schema:', fallbackColumns.length, fallbackColumns)
      } catch (schemaError) {
        console.error('❌ Error getting schema columns:', schemaError)
        fallbackColumns = []
      }

      if (!data || data.length === 0) {
        console.log('⚠️ No data available, using fallback schema columns')
        return fallbackColumns
      }

      // Get first row to determine available fields
      const firstRow = data[0]
      if (!firstRow) {
        console.log('⚠️ No first row available, using fallback columns')
        return fallbackColumns
      }

      const availableFields = Object.keys(firstRow).filter(key =>
        key !== 'id' &&
        key !== 'createdAt' &&
        key !== 'updatedAt' &&
        key !== 'created_at' &&  // Also filter out snake_case versions
        key !== 'updated_at'
      )
      console.log('🔍 Available fields (excluding system fields):', availableFields)

      if (availableFields.length === 0) {
        console.log('⚠️ No available fields found, using fallback columns')
        return fallbackColumns
      }

      // Generate columns dynamically from available fields
      const dynamicColumns = availableFields.map((field, index) => {
        // Determine column type based on value
        const value = firstRow[field]
        let columnType = 'text'

        if (typeof value === 'number') {
          columnType = 'number'
        } else if (typeof value === 'boolean') {
          columnType = 'boolean'
        } else if (value instanceof Date || (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}/.test(value))) {
          columnType = 'date'
        }

        const columnConfig = {
          field: field,
          headerName: field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1'),
          width: getColumnWidth(field, columnType, field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')),
          minWidth: 100, // Ensure minimum visibility
          maxWidth: 400, // Allow wider columns
          flex: field === 'id' ? 0 : 1, // ID column fixed width, others flexible
          sortable: true,
          filter: true,
          resizable: true,
          cellClass: getCellClass(field),
          valueFormatter: getValueFormatter(field, columnType),
          cellStyle: (params) => {
            const baseStyle = {
              textAlign: 'center',
              boxSizing: 'border-box'
            }
            return baseStyle
          },
          headerClass: 'centered-header',
          headerStyle: {
            textAlign: 'center',
            backgroundColor: '#2F5755',
            color: 'white',
            fontWeight: '600',
            fontSize: '14px'
          }
        }

        console.log(`✅ Created column for field ${field}:`, {
          field,
          headerName: columnConfig.headerName,
          type: columnType,
          value: value
        })
        return columnConfig
      })

      // Add Actions column at the end if we have data
      dynamicColumns.push({
        field: 'actions',
        headerName: 'Actions',
        width: getColumnWidth('actions', 'text', 'Actions'),
        minWidth: 120, // Minimum width for actions
        maxWidth: 200, // Maximum width for actions
        sortable: false,
        filter: false,
        resizable: true,
        cellClass: 'actions-cell',
        cellRenderer: ActionsCellRenderer,
        cellStyle: {
          textAlign: 'center',
          boxSizing: 'border-box',
          padding: '2px 4px'
        },
        headerClass: 'centered-header',
        headerStyle: {
          textAlign: 'center',
          backgroundColor: '#2F5755',
          color: 'white',
          fontWeight: '600',
          fontSize: '14px'
        }
      })

      console.log('🎉 Generated columns:', dynamicColumns.length, dynamicColumns.map(col => col.field))
      return dynamicColumns
    } catch (error) {
      console.error('❌ Error generating columns:', error)
      // Return fallback columns on error
      try {
        const fallback = getAllColumns(moduleId) || getAllColumns('default') || []
        console.log('🔄 Using fallback columns due to error:', fallback.length)
        return fallback
      } catch (fallbackError) {
        console.error('❌ Error getting fallback columns:', fallbackError)
        return []
      }
    }
  }, [data, moduleId])

  // Pagination component
  const renderPagination = () => {
    if (totalPages <= 1) return null
    const pages = []
    const maxVisiblePages = 5

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    return (
      <div className="pagination-container">
        <button
          className="pagination-btn"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          Previous
        </button>

        {startPage > 1 && (
          <>
            <button className="pagination-btn" onClick={() => onPageChange(1)}>
              1
            </button>
            {startPage > 2 && <span className="pagination-ellipsis">...</span>}
          </>
        )}

        {pages.map(page => (
          <button
            key={page}
            className={`pagination-btn ${page === currentPage ? 'active' : ''}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="pagination-ellipsis">...</span>}
            <button className="pagination-btn" onClick={() => onPageChange(totalPages)}>
              {totalPages}
            </button>
          </>
        )}

        <button
          className="pagination-btn"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          Next
        </button>
      </div>
    )
  }

  if (!selectedModule) {
    console.log('AGGridComponent: No selectedModule provided - showing welcome message')
    return (
      <div className="ag-grid-container">
        <div className="no-data">
          <h3>Welcome to AG Grid Dashboard</h3>
          <p>Select a module from the side menu to view data</p>
        </div>
      </div>
    )
  }

  console.log('AGGridComponent rendering:', {
    selectedModule,
    moduleName,
    moduleId,
    dataLength: data?.length || 0,
    filteredDataLength: filteredData?.length || 0,
    searchTerm,
    currentPage,
    totalPages,
    columnDefsLength: columnDefs?.length || 0
  })

  // Debug: Check if columnDefs is valid
  if (columnDefs && columnDefs.length > 0) {
    console.log('✅ Column definitions:', columnDefs.map(col => ({ field: col.field, headerName: col.headerName, width: col.width })))
  } else {
    console.log('❌ No column definitions found!')
  }

  // Safety check - ensure filteredData is valid
  const safeFilteredData = Array.isArray(filteredData) ? filteredData : []

  // Debug: Check data
  console.log('📊 Row data length:', safeFilteredData?.length || 0)
  console.log('📋 Sample row data:', safeFilteredData?.[0] || 'No data')

  // Handle input changes in the form
  const handleInputChange = (field, value) => {
    setNewRecordData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Handle form submission for adding new record
  const handleAddRecordSubmit = async () => {
    try {
      console.log('Adding new record:', newRecordData)

      // Call the create API endpoint using appropriate service
      let response
      if (moduleId.startsWith('admin/') || ['users', 'api_config', 'pin_requests', 'pin_verifications', 'products'].includes(moduleId)) {
        response = await AdminService.createRecord(moduleId, newRecordData)
      } else {
        response = await DashboardService.createRecord(moduleId, newRecordData)
      }

      if (response) {
        const createdRecord = response.data || response

        // Set state to show only the newly created record
        setNewRecordId(createdRecord.id)
        setShowOnlyNewRecord(true)

        // Close modal and reset form
        setIsAddModalOpen(false)
        setNewRecordData({})

        // Trigger parent refresh by calling window function
        if (window.refreshGridData) {
          window.refreshGridData()
        }

        console.log('Record created successfully:', createdRecord)
      } else {
        throw new Error('Failed to create record')
      }
    } catch (error) {
      console.error('Error creating record:', error)
      alert('Error creating record. Please try again.')
    }
  }

  try {
    return (
      <div className="ag-grid-container">
        {/* Fixed Header Section - Contains search and actions */}
        <div className="fixed-header-section">
          <div className="grid-header">
            <h2>{moduleName.charAt(0).toUpperCase() + moduleName.slice(1)} Data</h2>
            <div className="grid-info">
              {searchTerm ? (
                <>Showing {safeFilteredData.length} of {data.length} records for "{searchTerm}" | Page {currentPage} of {totalPages}</>
              ) : (
                <>Total Records: {data.length} | Page {currentPage} of {totalPages}</>
              )}
            </div>
          </div>

          {/* Search bar section */}
          <div className="search-section">
            <div className="search-container">
              <input
                type="text"
                placeholder="🔍 Search records..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <div className="search-icon">🔍</div>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="clear-search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Action buttons section */}
          <div className="grid-actions">
            <button
              className="btn btn-import"
              onClick={() => {
                if (window.importData) {
                  window.importData(moduleId)
                }
              }}
            >
              📥 Import
            </button>
            <button
              className="btn btn-export"
              onClick={() => {
                if (window.exportData) {
                  window.exportData(moduleId, data)
                }
              }}
            >
              📤 Export
            </button>
            <button
              className="btn btn-add"
              onClick={() => {
                console.log('Add button clicked, opening modal...')
                setIsAddModalOpen(true)
                setNewRecordData({})
              }}
            >
              ➕ Add
            </button>
          </div>
        </div>

        {/* Scrollable AG Grid Section */}
        <div className="scrollable-grid-section">
          <div className="ag-theme-quartz" style={{
            height: '100%',
            width: '100%',
            minHeight: '400px'
          }}>
            <AgGridReact
              ref={gridRef}
              rowData={safeFilteredData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              animateRows={true}
              enableRangeSelection={true}
              pagination={false}
              paginationPageSize={10}
              paginationPageSizeSelector={[10, 20, 50]}
              suppressColumnVirtualisation={false}
              onGridReady={onGridReady}
              onFirstDataRendered={() => {
                console.log('🎨 First data rendered in grid')
              }}
              suppressRowClickSelection={false}
              rowSelection={'multiple'}
              suppressColumnMoveAnimation={false}
              // Ensure all columns are visible
              enableBrowserTooltips={true}
            />
          </div>

          {renderPagination()}
        </div>

        {/* Add Record Modal */}
        {isAddModalOpen && (
          <div className="modal-overlay" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999
          }}>
            <div className="modal" style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '24px',
              width: '90%',
              maxWidth: '500px',
              maxHeight: '80vh',
              overflow: 'auto',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
            }}>
              <div className="modal-header" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px'
              }}>
                <h3 style={{ margin: 0, color: '#333' }}>Add New Record</h3>
                {showOnlyNewRecord && (
                  <button
                    onClick={() => {
                      setShowOnlyNewRecord(false)
                      setNewRecordId(null)
                    }}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: '#ffc107',
                      color: '#212529',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}
                  >
                    Show All Records
                  </button>
                )}
                <button
                  onClick={() => {
                    console.log('Closing modal...')
                    setIsAddModalOpen(false)
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '24px',
                    cursor: 'pointer',
                    color: '#666',
                    padding: '4px'
                  }}
                >
                  ×
                </button>
              </div>

              <div className="modal-body" style={{ marginBottom: '20px' }}>
                {getAvailableFields().map(field => (
                  <div key={field} style={{ marginBottom: '16px' }}>
                    <label style={{
                      display: 'block',
                      marginBottom: '6px',
                      fontWeight: '500',
                      color: '#333'
                    }}>
                      {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}:
                    </label>
                    <input
                      type="text"
                      value={newRecordData[field] || ''}
                      onChange={(e) => handleInputChange(field, e.target.value)}
                      placeholder={`Enter ${field}`}
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '2px solid #e9ecef',
                        borderRadius: '6px',
                        fontSize: '14px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                ))}
              </div>

              <div className="modal-footer" style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '12px'
              }}>
                <button
                  onClick={() => {
                    console.log('Cancel button clicked')
                    setIsAddModalOpen(false)
                  }}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#6c757d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    console.log('Submit button clicked, form data:', newRecordData)
                    handleAddRecordSubmit()
                  }}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  Add Record
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  } catch (error) {
    console.error('Error rendering AGGridComponent:', error)
    return (
      <div className="ag-grid-container">
        <div className="no-data">
          <h3>Error Loading Grid</h3>
          <p>There was an error rendering the grid. Check console for details.</p>
        </div>
      </div>
    )
  }
}

export default AGGridComponent
