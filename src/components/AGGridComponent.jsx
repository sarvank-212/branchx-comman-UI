import { AgGridReact } from 'ag-grid-react'
import { useMemo, useRef, useEffect, useState } from 'react'
import { getColumnSchema, getAllColumns } from '../config/columnSchemas'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import './AGGridComponent.css'

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

  // Helper function to determine column width
  const getColumnWidth = (field, type) => {
    const baseWidths = {
      id: 60,        // Narrow for ID
      name: 150,     // Medium for names
      email: 200,    // Wider for emails
      status: 80,    // Narrow for status
      role: 100,     // Medium for role
      // createdAt: 120,
      // updatedAt: 120
    }
    return baseWidths[field] || 120
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
    minWidth: 50,
    maxWidth: 300,
    flex: 1,
    cellStyle: {
      textAlign: 'center',
      boxSizing: 'border-box'
    }
  }), [])

  // Auto-size columns when data changes
  useEffect(() => {
    if (gridRef.current && data && data.length > 0) {
      // Small delay to ensure grid is fully rendered
      setTimeout(() => {
        gridRef.current.api.sizeColumnsToFit()
      }, 100)
    }
  }, [data, moduleId])

  // Generate columns dynamically from data structure + fallback to schema
  const columnDefs = useMemo(() => {
    try {
      console.log('Generating columns for module:', moduleId, 'with data length:', data?.length || 0)

      if (!data || data.length === 0) {
        console.log('No data available, using fallback schema')
        const schema = getAllColumns(moduleId)
        return schema || getAllColumns('default') || []
      }

      // Get first row to determine available fields
      const firstRow = data[0]
      if (!firstRow) {
        console.log('No first row available')
        const schema = getAllColumns(moduleId)
        return schema || getAllColumns('default') || []
      }

      const availableFields = Object.keys(firstRow).filter(key =>
        key !== 'id' &&
        key !== 'createdAt' &&
        key !== 'updatedAt'
      )
      console.log('Available fields (excluding createdAt/updatedAt):', availableFields)

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
          width: getColumnWidth(field, columnType),
          minWidth: 50,
          maxWidth: 300,
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
          headerClass: 'centered-header'
        }

        console.log(`Created column for field ${field}:`, columnConfig)
        return columnConfig
      })

      // Add Actions column at the end
      dynamicColumns.push({
        field: 'actions',
        headerName: 'Actions',
        width: 120,
        minWidth: 100,
        maxWidth: 150,
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
        headerClass: 'centered-header'
      })

      console.log('Generated columns:', dynamicColumns.length)
      return dynamicColumns
    } catch (error) {
      console.error('Error generating columns:', error)
      const schema = getAllColumns(moduleId)
      return schema || getAllColumns('default') || []
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
    console.log('AGGridComponent: No selectedModule provided')
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

  // Safety check - ensure we have valid data structure
  if (!Array.isArray(data)) {
    console.error('AGGridComponent: data is not an array:', data)
    return (
      <div className="ag-grid-container">
        <div className="no-data">
          <h3>Error Loading Data</h3>
          <p>Invalid data format received</p>
        </div>
      </div>
    )
  }

  // Safety check - ensure filteredData is valid
  const safeFilteredData = Array.isArray(filteredData) ? filteredData : []

  // Handle form submission for adding new record
  const handleAddRecordSubmit = async () => {
    try {
      console.log('Adding new record:', newRecordData)

      // Call the create API endpoint with form data
      const response = await fetch(`http://localhost:3000/${moduleId}/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRecordData)
      })

      if (response.ok) {
        const result = await response.json()
        const createdRecord = result.data || result

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

  // Handle input changes in the form
  const handleInputChange = (field, value) => {
    setNewRecordData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Get available fields from existing data for form
  const getAvailableFields = () => {
    if (!data || data.length === 0) {
      // Fallback to column schema if no data available
      const schema = getAllColumns(moduleId) || []
      return schema
        .filter(col => col.field !== 'id' && col.field !== 'actions')
        .map(col => col.field)
    }

    const firstRow = data[0]
    return Object.keys(firstRow).filter(key =>
      key !== 'id' &&
      key !== 'createdAt' &&
      key !== 'updatedAt'
    )
  }

  try {
    return (
      <div className="ag-grid-container">
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
        <div className="search-section" style={{
          padding: '20px 24px 16px 24px',
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #dee2e6'
        }}>
          <div className="search-container" style={{
            maxWidth: '450px',
            position: 'relative',
            margin: '0 auto'
          }}>
            <input
              type="text"
              placeholder="🔍 Search records..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 16px 10px 45px',
                border: '2px solid #e9ecef',
                borderRadius: '8px',
                fontSize: '15px',
                height: '42px',
                outline: 'none',
                transition: 'all 0.3s ease',
                backgroundColor: '#f8f9fa',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#007bff'
                e.target.style.backgroundColor = '#ffffff'
                e.target.style.boxShadow = '0 0 0 3px rgba(0, 123, 255, 0.1)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e9ecef'
                e.target.style.backgroundColor = '#f8f9fa'
                e.target.style.boxShadow = 'none'
              }}
            />
            <div style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#6c757d',
              fontSize: '16px',
              pointerEvents: 'none',
              zIndex: 1,
              opacity: searchTerm ? 0 : 1,
              transition: 'opacity 0.2s ease'
            }}>
              🔍
            </div>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#6c757d',
                  cursor: 'pointer',
                  fontSize: '16px',
                  padding: '4px',
                  transition: 'color 0.2s ease',
                  zIndex: 1
                }}
                onMouseOver={(e) => e.target.style.color = '#495057'}
                onMouseOut={(e) => e.target.style.color = '#6c757d'}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Action buttons section */}
        <div className="grid-actions" style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          padding: '16px 24px',
          backgroundColor: '#f8f9fa',
          borderBottom: '1px solid #dee2e6',
          gap: '12px'
        }}>
          <button
            className="btn btn-import"
            onClick={() => {
              if (window.importData) {
                window.importData(moduleId)
              }
            }}
            style={{
              backgroundColor: 'transparent',
              border: '2px solid #28a745',
              color: '#28a745',
              padding: '8px 16px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              minWidth: '100px',
              outline: 'none'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#28a745'
              e.target.style.color = 'white'
              e.target.style.transform = 'translateY(-1px)'
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'transparent'
              e.target.style.color = '#28a745'
              e.target.style.transform = 'translateY(0)'
            }}
            onFocus={(e) => {
              e.target.style.boxShadow = '0 0 0 3px rgba(40, 167, 69, 0.2)'
            }}
            onBlur={(e) => {
              e.target.style.boxShadow = 'none'
            }}
            aria-label="Import data"
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
            style={{
              backgroundColor: '#28a745',
              border: '2px solid #28a745',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              minWidth: '100px',
              outline: 'none'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#218838'
              e.target.style.transform = 'translateY(-1px)'
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#28a745'
              e.target.style.transform = 'translateY(0)'
            }}
            onFocus={(e) => {
              e.target.style.boxShadow = '0 0 0 3px rgba(40, 167, 69, 0.3)'
            }}
            onBlur={(e) => {
              e.target.style.boxShadow = 'none'
            }}
            aria-label="Export data"
          >
            📤 Export
          </button>
          <button
            className="btn btn-add"
            onClick={() => {
              // Open add modal instead of directly calling API
              setIsAddModalOpen(true)
              setNewRecordData({})
            }}
            style={{
              backgroundColor: '#007bff',
              border: '2px solid #007bff',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              minWidth: '100px',
              outline: 'none'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#0056b3'
              e.target.style.transform = 'translateY(-1px)'
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#007bff'
              e.target.style.transform = 'translateY(0)'
            }}
            onFocus={(e) => {
              e.target.style.boxShadow = '0 0 0 3px rgba(0, 123, 255, 0.3)'
            }}
            onBlur={(e) => {
              e.target.style.boxShadow = 'none'
            }}
            aria-label="Add new record"
          >
            ➕ Add
          </button>
        </div>

        <div className="ag-theme-quartz" style={{
          height: '100%',
          width: '100%',
          marginTop: '20px'
        }}>
          <AgGridReact
            ref={gridRef}
            rowData={safeFilteredData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            animateRows={true}
            enableRangeSelection={true}
            pagination={false} // We'll handle pagination manually
            paginationPageSize={10}
            paginationPageSizeSelector={[10, 20, 50]}
            suppressColumnVirtualisation={false}
          />
        </div>

        {renderPagination()}

        {/* Add Record Modal */}
        {isAddModalOpen && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '24px',
              width: '90%',
              maxWidth: '500px',
              maxHeight: '80vh',
              overflow: 'auto',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
            }}>
              <div style={{
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
                  onClick={() => setIsAddModalOpen(false)}
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

              <div style={{ marginBottom: '20px' }}>
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

              <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '12px'
              }}>
                <button
                  onClick={() => setIsAddModalOpen(false)}
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
                  onClick={handleAddRecordSubmit}
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
