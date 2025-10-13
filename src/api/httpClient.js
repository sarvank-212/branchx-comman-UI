import axios from 'axios'

// Create axios instance with base configuration
const httpClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor for adding auth tokens or other headers
httpClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for handling common errors
httpClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Handle common error scenarios
    if (error.response?.status === 401) {
      // Redirect to login or handle unauthorized access
      console.warn('Unauthorized access - redirecting to login')
      // You might want to dispatch a logout action here
    } else if (error.response?.status >= 500) {
      console.error('Server error occurred')
    }
    return Promise.reject(error)
  }
)

export default httpClient
