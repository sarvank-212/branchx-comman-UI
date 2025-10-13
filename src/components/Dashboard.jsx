import { useState, useEffect } from 'react'
import AdminService from '../../api/admin/adminService'
import DashboardService from '../../api/dashboard/dashboardService'

function Dashboard() {
  const [dashboardStats, setDashboardStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalPinRequests: 0,
    totalPinVerifications: 0,
    recentActivity: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)

      // Load dashboard statistics
      const [usersResponse, productsResponse, pinRequestsResponse, pinVerificationsResponse] = await Promise.allSettled([
        AdminService.getUsers({ page: 1, pageSize: 1 }),
        AdminService.getProducts({ page: 1, pageSize: 1 }),
        AdminService.getPinRequests({ page: 1, pageSize: 1 }),
        AdminService.getPinVerifications({ page: 1, pageSize: 1 })
      ])

      const stats = {
        totalUsers: usersResponse.status === 'fulfilled' ? usersResponse.value.totalRecords || 0 : 0,
        totalProducts: productsResponse.status === 'fulfilled' ? productsResponse.value.totalRecords || 0 : 0,
        totalPinRequests: pinRequestsResponse.status === 'fulfilled' ? pinRequestsResponse.value.totalRecords || 0 : 0,
        totalPinVerifications: pinVerificationsResponse.status === 'fulfilled' ? pinVerificationsResponse.value.totalRecords || 0 : 0,
        recentActivity: []
      }

      setDashboardStats(stats)
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const StatCard = ({ title, value, icon, color = 'blue' }) => (
    <div className={`stat-card stat-card-${color}`}>
      <div className="stat-icon">
        {icon}
      </div>
      <div className="stat-content">
        <h3 className="stat-value">{loading ? '...' : value?.toLocaleString() || '0'}</h3>
        <p className="stat-title">{title}</p>
      </div>
    </div>
  )

  const ActivityItem = ({ activity, time, status }) => (
    <div className="activity-item">
      <div className="activity-content">
        <p className="activity-text">{activity}</p>
        <span className="activity-time">{time}</span>
      </div>
      <div className={`activity-status status-${status}`}>
        {status}
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Loading Dashboard...</div>
      </div>
    )
  }

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <h1>Dashboard Overview</h1>
        <p>Welcome to your admin dashboard</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <StatCard
          title="Total Users"
          value={dashboardStats.totalUsers}
          icon="👥"
          color="blue"
        />
        <StatCard
          title="Total Products"
          value={dashboardStats.totalProducts}
          icon="📦"
          color="green"
        />
        <StatCard
          title="PIN Requests"
          value={dashboardStats.totalPinRequests}
          icon="📱"
          color="orange"
        />
        <StatCard
          title="PIN Verifications"
          value={dashboardStats.totalPinVerifications}
          icon="✅"
          color="purple"
        />
      </div>

      {/* Main Content Grid */}
      <div className="dashboard-content">
        {/* Recent Activity */}
        <div className="activity-section">
          <div className="section-header">
            <h2>Recent Activity</h2>
            <button className="view-all-btn">View All</button>
          </div>
          <div className="activity-list">
            <ActivityItem
              activity="New user registered"
              time="2 minutes ago"
              status="success"
            />
            <ActivityItem
              activity="PIN verification completed"
              time="5 minutes ago"
              status="success"
            />
            <ActivityItem
              activity="Product updated"
              time="10 minutes ago"
              status="info"
            />
            <ActivityItem
              activity="Failed PIN request"
              time="15 minutes ago"
              status="warning"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="actions-section">
          <div className="section-header">
            <h2>Quick Actions</h2>
          </div>
          <div className="actions-grid">
            <button className="action-card">
              <div className="action-icon">➕</div>
              <div className="action-content">
                <h3>Add New User</h3>
                <p>Create a new user account</p>
              </div>
            </button>
            <button className="action-card">
              <div className="action-icon">📦</div>
              <div className="action-content">
                <h3>Add Product</h3>
                <p>Add a new product to inventory</p>
              </div>
            </button>
            <button className="action-card">
              <div className="action-icon">📊</div>
              <div className="action-content">
                <h3>View Reports</h3>
                <p>Generate detailed reports</p>
              </div>
            </button>
            <button className="action-card">
              <div className="action-icon">⚙️</div>
              <div className="action-content">
                <h3>System Settings</h3>
                <p>Configure system preferences</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
