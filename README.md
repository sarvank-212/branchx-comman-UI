# Frontend AG Grid Application

A modern React application with Vite, AG Grid, and dynamic API integration.

## Features

- **AG Grid Integration**: High-performance data grid with sorting, filtering, and pagination
- **Dynamic Side Menu**: Menu items fetched from API with expandable modules
- **Dynamic API Endpoints**: Automatically generates API calls based on selected modules
- **JSON Schema Columns**: Configurable column definitions per module
- **Responsive Design**: Clean, modern UI with dark side menu theme
- **Pagination**: Custom pagination controls for better UX

## Project Structure

```
src/
├── components/
│   ├── SideMenu.jsx          # Collapsible side navigation
│   ├── SideMenu.css
│   ├── AGGridComponent.jsx   # Main data grid component
│   └── AGGridComponent.css
├── config/
│   └── columnSchemas.js      # Column definitions for different modules
├── services/
│   └── ApiService.js         # API communication layer
├── App.jsx                   # Main application component
├── App.css
├── main.jsx                  # React entry point
└── index.css                 # Global styles
```

## API Integration

The application expects the following API endpoints:

1. **Initial Menu**: `POST /init` - Returns menu structure
2. **Module Data**: `POST /{module}/paginate` - Returns paginated data for a module

### Sample API Response Format

**Menu Response:**
```json
{
  "data": [
    {
      "id": "admin",
      "name": "Admin",
      "modules": [
        { "id": "users", "name": "Users" },
        { "id": "api_config", "name": "API Configuration" }
      ]
    }
  ]
}
```

**Data Response:**
```json
{
  "data": [...],           // Array of records
  "totalPages": 5,         // Total number of pages
  "currentPage": 1,        // Current page number
  "totalRecords": 50       // Total number of records
}
```

## Column Schemas

Column definitions are configurable per module in `src/config/columnSchemas.js`:

```javascript
const columnSchemas = {
  users: [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    // ... more columns
  ],
  // ... more modules
}
```

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3000
```

## Development

The application is configured with:
- **Port**: 5173 (default Vite port)
- **API Proxy**: Routes `/api/*` to `http://localhost:3000`
- **Hot Module Replacement**: Enabled for fast development

## Technologies Used

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **AG Grid** - Enterprise-grade data grid
- **Axios** - HTTP client for API calls
- **CSS3** - Custom styling with CSS variables

## Browser Support

Modern browsers with ES2020+ support:
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+
