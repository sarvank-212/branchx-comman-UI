// Column schemas for different modules
// This defines the structure and properties of columns for each module

const columnSchemas = {
  // Common columns that appear in all modules
  common: [
    { field: 'id', headerName: 'ID', width: 70, pinned: 'left', sortable: true },
  
  ],

  // Module-specific column schemas
  users: [
    { field: 'full_name', headerName: 'Full Name', width: 200, sortable: true, filter: true },
    { field: 'email', headerName: 'Email', width: 250, sortable: true, filter: true },
    { field: 'role', headerName: 'Role', width: 120, sortable: true, filter: true },
    { field: 'status', headerName: 'Status', width: 100, sortable: true, filter: true },
    { field: 'created_at', headerName: 'Created Date', width: 150, sortable: true, filter: true },
  ],

  pin_requests: [
    { field: 'mobile_number', headerName: 'Mobile Number', width: 150, sortable: true, filter: true },
    { field: 'operator', headerName: 'Operator', width: 120, sortable: true, filter: true },
    { field: 'amount', headerName: 'Amount', width: 100, sortable: true, filter: true,
      valueFormatter: (params) => `$${params.value?.toFixed(2) || '0.00'}` },
    { field: 'status', headerName: 'Status', width: 120, sortable: true, filter: true },
    { field: 'request_type', headerName: 'Request Type', width: 130, sortable: true, filter: true },
    { field: 'transaction_id', headerName: 'Transaction ID', width: 150, sortable: true, filter: true },
    { field: 'created_at', headerName: 'Created At', width: 150, sortable: true, filter: true },
    { field: 'api_response', headerName: 'API Response', width: 200, sortable: false, filter: false,
      valueFormatter: (params) => params.value ? JSON.stringify(params.value).substring(0, 100) + '...' : 'No response' },
    { field: 'publisher_response', headerName: 'Publisher Response', width: 200, sortable: false, filter: false,
      valueFormatter: (params) => params.value ? JSON.stringify(params.value).substring(0, 100) + '...' : 'No response' },
  ],

  pin_verifications: [
    { field: 'mobile_number', headerName: 'Mobile Number', width: 150, sortable: true, filter: true },
    { field: 'operator', headerName: 'Operator', width: 120, sortable: true, filter: true },
    { field: 'pin', headerName: 'PIN', width: 100, sortable: true, filter: true },
    { field: 'status', headerName: 'Status', width: 120, sortable: true, filter: true },
    { field: 'verification_type', headerName: 'Verification Type', width: 130, sortable: true, filter: true },
    { field: 'transaction_id', headerName: 'Transaction ID', width: 150, sortable: true, filter: true },
    { field: 'created_at', headerName: 'Created At', width: 150, sortable: true, filter: true },
    { field: 'api_response', headerName: 'API Response', width: 200, sortable: false, filter: false,
      valueFormatter: (params) => params.value ? JSON.stringify(params.value).substring(0, 100) + '...' : 'No response' },
    { field: 'publisher_response', headerName: 'Publisher Response', width: 200, sortable: false, filter: false,
      valueFormatter: (params) => params.value ? JSON.stringify(params.value).substring(0, 100) + '...' : 'No response' },
  ],

  products: [
    { field: 'name', headerName: 'Product Name', width: 200, sortable: true, filter: true },
    { field: 'sku', headerName: 'SKU', width: 120, sortable: true, filter: true },
    { field: 'price', headerName: 'Price', width: 100, sortable: true, filter: true, 
      valueFormatter: (params) => `$${params.value?.toFixed(2) || '0.00'}` },
    { field: 'category', headerName: 'Category', width: 150, sortable: true, filter: true },
    { field: 'stock', headerName: 'Stock', width: 100, sortable: true, filter: true },
    { field: 'isActive', headerName: 'Active', width: 100, sortable: true, filter: true },
  ],

  orders: [
    { field: 'orderNumber', headerName: 'Order #', width: 130, sortable: true, filter: true },
    { field: 'customerName', headerName: 'Customer', width: 180, sortable: true, filter: true },
    { field: 'totalAmount', headerName: 'Total', width: 120, sortable: true, filter: true,
      valueFormatter: (params) => `$${params.value?.toFixed(2) || '0.00'}` },
    { field: 'status', headerName: 'Status', width: 120, sortable: true, filter: true },
    { field: 'orderDate', headerName: 'Order Date', width: 150, sortable: true, filter: true },
  ],

  // Add more module schemas as needed
  default: [
    // Generic columns for unknown modules
    { field: 'name', headerName: 'Name', width: 200, sortable: true, filter: true },
    { field: 'value', headerName: 'Value', width: 150, sortable: true, filter: true },
  ]
}

// Helper function to get column schema for a module
export const getColumnSchema = (module) => {
  return columnSchemas[module] || columnSchemas.default
}

// Helper function to get all columns (common + module-specific)
export const getAllColumns = (module) => {
  const moduleColumns = getColumnSchema(module)
  return [...columnSchemas.common, ...moduleColumns]
}

export default columnSchemas
