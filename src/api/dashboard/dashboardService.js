import httpClient from '../httpClient'
import { DASHBOARD_ENDPOINTS } from './dashboardEndpoints'

class DashboardService {
  // Get dashboard data
  static async getDashboardData() {
    try {
      const response = await httpClient.get(DASHBOARD_ENDPOINTS.DASHBOARD_DATA)
      return response
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      throw error
    }
  }

  // Get dashboard statistics
  static async getDashboardStats() {
    try {
      const response = await httpClient.get(DASHBOARD_ENDPOINTS.DASHBOARD_STATS)
      return response
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
      throw error
    }
  }

  // Orders methods
  static async getOrders(params = {}) {
    try {
      const response = await httpClient.post(DASHBOARD_ENDPOINTS.ORDERS_PAGINATE, {
        pageSize: 10,
        page: 1,
        filters: null,
        orderBy: [],
        ...params,
      })
      return response
    } catch (error) {
      console.error('Error fetching orders:', error)
      throw error
    }
  }

  static async getOrderById(id) {
    try {
      const response = await httpClient.get(DASHBOARD_ENDPOINTS.ORDER_BY_ID(id))
      return response
    } catch (error) {
      console.error(`Error fetching order ${id}:`, error)
      throw error
    }
  }

  // Analytics methods
  static async getAnalytics(params = {}) {
    try {
      const response = await httpClient.post(DASHBOARD_ENDPOINTS.ANALYTICS, params)
      return response
    } catch (error) {
      console.error('Error fetching analytics:', error)
      throw error
    }
  }

  static async getSalesReport(params = {}) {
    try {
      const response = await httpClient.post(DASHBOARD_ENDPOINTS.SALES_REPORT, params)
      return response
    } catch (error) {
      console.error('Error fetching sales report:', error)
      throw error
    }
  }

  static async getUserActivity(params = {}) {
    try {
      const response = await httpClient.post(DASHBOARD_ENDPOINTS.USER_ACTIVITY, params)
      return response
    } catch (error) {
      console.error('Error fetching user activity:', error)
      throw error
    }
  }

  // Generic paginated data fetch for any dashboard module
  static async getModuleData(module, params = {}) {
    try {
      const response = await httpClient.post(`/${module}/paginate`, {
        pageSize: 10,
        page: 1,
        filters: null,
        orderBy: [],
        ...params,
      })
      return response
    } catch (error) {
      console.error(`Error fetching ${module} data:`, error)
      throw error
    }
  }

  // Generic create operation for dashboard modules
  static async createRecord(module, recordData) {
    try {
      const response = await httpClient.post(`/${module}/create`, recordData)
      return response
    } catch (error) {
      console.error(`Error creating record in ${module}:`, error)
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
      console.error(`Error calling ${method} ${endpoint}:`, error)
      throw error
    }
  }
}

export default DashboardService
