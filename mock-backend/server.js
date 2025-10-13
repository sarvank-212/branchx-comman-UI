const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data storage
let users = [
  { id: 1, full_name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', created_at: new Date().toISOString() },
  { id: 2, full_name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active', created_at: new Date().toISOString() },
  { id: 3, full_name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'Inactive', created_at: new Date().toISOString() }
];

let pinRequests = [
  { id: 1, mobile_number: '+1234567890', operator: 'Verizon', pin: '1234', status: 'Verified', verification_type: 'SMS', transaction_id: 'REQ001', created_at: new Date().toISOString() },
  { id: 2, mobile_number: '+0987654321', operator: 'AT&T', pin: '5678', status: 'Failed', verification_type: 'Voice', transaction_id: 'REQ002', created_at: new Date().toISOString() }
];

let pinVerifications = [
  { id: 1, mobile_number: '+1234567890', operator: 'Verizon', pin: '1234', status: 'Verified', verification_type: 'SMS', transaction_id: 'VER001', created_at: new Date().toISOString(), api_response: { success: true }, publisher_response: { status: 'completed' } },
  { id: 2, mobile_number: '+0987654321', operator: 'AT&T', pin: '5678', status: 'Failed', verification_type: 'Voice', transaction_id: 'VER002', created_at: new Date().toISOString(), api_response: { success: false }, publisher_response: { status: 'failed' } }
];

let products = [
  { id: 1, name: 'Laptop', sku: 'LT001', price: 999.99, category: 'Electronics', stock: 10, isActive: true },
  { id: 2, name: 'Phone', sku: 'PH001', price: 599.99, category: 'Electronics', stock: 25, isActive: true }
];

// Helper function to get paginated results
function getPaginatedResults(data, page = 1, pageSize = 10) {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = data.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    totalPages: Math.ceil(data.length / pageSize),
    currentPage: page,
    totalRecords: data.length
  };
}

// API Routes

// Initial menu endpoint
app.post('/init', (req, res) => {
  const menuData = {
    data: [
      {
        id: 'admin',
        name: 'Admin',
        modules: [
          { id: 'users', name: 'Users' },
          { id: 'pin_requests', name: 'PIN Requests' },
          { id: 'products', name: 'Products' }
        ]
      }
    ]
  };
  res.json(menuData);
});

// Users endpoints
app.post('/users/paginate', (req, res) => {
  const { page = 1, pageSize = 10 } = req.body;
  const result = getPaginatedResults(users, page, pageSize);
  res.json(result);
});

// PIN Verifications endpoints
app.post('/pin-verifications/paginate', (req, res) => {
  const { page = 1, pageSize = 10 } = req.body;
  const result = getPaginatedResults(pinVerifications, page, pageSize);
  res.json(result);
});

// Products endpoints
app.post('/products/paginate', (req, res) => {
  const { page = 1, pageSize = 10 } = req.body;
  const result = getPaginatedResults(products, page, pageSize);
  res.json(result);
});

// Generic module data endpoint (for other modules)
app.post('/:module/paginate', (req, res) => {
  const { module } = req.params;
  const { page = 1, pageSize = 10 } = req.body;

  let data = [];
  switch (module) {
    case 'users':
      data = users;
      break;
    case 'pin_requests':
      data = pinRequests;
      break;
    case 'pin_verifications':
      data = pinVerifications;
      break;
    case 'products':
      data = products;
      break;
    default:
      data = [
        { id: 1, name: `Sample ${module} 1`, value: 'Sample value 1' },
        { id: 2, name: `Sample ${module} 2`, value: 'Sample value 2' }
      ];
  }

  const result = getPaginatedResults(data, page, pageSize);
  res.json(result);
});

// Create record endpoints
app.post('/:module/create', (req, res) => {
  const { module } = req.params;
  const newRecord = {
    id: Date.now(),
    ...req.body,
    created_at: new Date().toISOString()
  };

  console.log(`Creating record for module: ${module}`, newRecord);

  // Add to appropriate array
  switch (module) {
    case 'users':
      users.push(newRecord);
      break;
    case 'pin_requests':
      pinRequests.push(newRecord);
      break;
    case 'pin_verifications':
      pinVerifications.push(newRecord);
      break;
    case 'products':
      products.push(newRecord);
      break;
    default:
      console.log(`Unknown module: ${module}, adding to default array`);
      // For unknown modules, just return success
      break;
  }

  res.json(newRecord);
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Mock backend server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Mock backend server running on http://localhost:${PORT}`);
  console.log(`📊 Available endpoints:`);
  console.log(`   POST /init - Get menu structure`);
  console.log(`   POST /users/paginate - Get users data`);
  console.log(`   POST /pin-requests/paginate - Get PIN requests data`);
  console.log(`   POST /products/paginate - Get products data`);
  console.log(`   POST /:module/paginate - Get data for any module`);
  console.log(`   POST /:module/create - Create new record`);
  console.log(`   GET /health - Health check`);
});
