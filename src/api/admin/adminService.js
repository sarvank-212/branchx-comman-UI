import httpClient from '../httpClient'
import { ADMIN_ENDPOINTS } from './adminEndpoints'

class AdminService {
  // Get initial menu items
  static async getMenuItems() {
    try {
      const response = await httpClient.post(ADMIN_ENDPOINTS.INIT)
      return response
    } catch (error) {
      console.error('Error fetching menu items:', error)
      throw error
    }
  }

  // User management methods
  static async getUsers(params = {}) {
    try {
      const response = await httpClient.post(ADMIN_ENDPOINTS.USERS, {
        pageSize: 0,
        page: 1,
        filters: null,
        orderBy: [],
        ...params,
      })
      return response
    } catch (error) {
      console.error('Error fetching users:', error)
      throw error
    }
  }

  static async getUserById(id) {
    try {
      const response = await httpClient.get(ADMIN_ENDPOINTS.USER_BY_ID(id))
      return response
    } catch (error) {
      console.error(`Error fetching user ${id}:`, error)
      throw error
    }
  }

  static async createUser(userData) {
    try {
      const response = await httpClient.post(ADMIN_ENDPOINTS.USERS, userData)
      return response
    } catch (error) {
      console.error('Error creating user:', error)
      throw error
    }
  }

  static async updateUser(id, userData) {
    try {
      const response = await httpClient.put(ADMIN_ENDPOINTS.USER_BY_ID(id), userData)
      return response
    } catch (error) {
      console.error(`Error updating user ${id}:`, error)
      throw error
    }
  }

  static async deleteUser(id) {
    try {
      const response = await httpClient.delete(ADMIN_ENDPOINTS.USER_BY_ID(id))
      return response
    } catch (error) {
      console.error(`Error deleting user ${id}:`, error)
      throw error
    }
  }

  // PIN Requests methods
  static async getPinRequests(params = {}) {
    try {
      const response = await httpClient.post(ADMIN_ENDPOINTS.PIN_REQUESTS_PAGINATE, {
        pageSize: 10,
        page: 1,
        filters: null,
        orderBy: [],
        ...params,
      })
      return response
    } catch (error) {
      console.error('Error fetching PIN requests:', error)
      throw error
    }
  }

  // PIN Verifications methods
  static async getPinVerifications(params = {}) {
    try {
      const response = await httpClient.post(ADMIN_ENDPOINTS.PIN_VERIFICATIONS_PAGINATE, {
        pageSize: 10,
        page: 1,
        filters: null,
        orderBy: [],
        ...params,
      })
      return response
    } catch (error) {
      console.error('Error fetching PIN verifications:', error)
      throw error
    }
  }

  // Products methods
  static async getProducts(params = {}) {
    try {
      const response = await httpClient.post(ADMIN_ENDPOINTS.PRODUCTS_PAGINATE, {
        pageSize: 10,
        page: 1,
        filters: null,
        orderBy: [],
        ...params,
      })
      return response
    } catch (error) {
      console.error('Error fetching products:', error)
      throw error
    }
  }

  // Generic paginated data fetch for any admin module
  static async getModuleData(module, params = {}) {
    try {
      const response = await httpClient.post(`/${module}/paginate`, {
        pageSize: 1000, // Large page size to get all records
        page: 1,
        filters: null,
        orderBy: [],
        ...params,
      })
      return response
    } catch (error) {
      throw error
    }
  }

  // Generic create operation for admin modules
  static async createRecord(module, recordData) {
    try {
      const response = await httpClient.post(`/${module}/create`, recordData)
      return response
    } catch (error) {
      throw error
    }
  }

  // Generic method for custom API calls
  static async call(endpoint, method = 'GET', data = null) {
    try {
      const response = await httpClient({
        url: endpoint,
        method,
        data,
      })
      return response
    } catch (error) {
      throw error
    }
  }
}

export default AdminService
