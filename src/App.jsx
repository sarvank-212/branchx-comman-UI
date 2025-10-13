import SideMenu from './components/layout/SideMenu'
import AGGridComponent from './components/common/AGGridComponent'
import DashboardPage from './pages/Dashboard/DashboardPage'
import { useAppLogic } from './hooks/useAppLogic'
import './App.css'

function App() {
  const {
    menuItems,
    selectedModule,
    gridData,
    loading,
    currentPage,
    totalPages,
    handleModuleSelect,
    handlePageChange,
  } = useAppLogic()

  // Check if dashboard should be shown (when 'dashboard' module is selected)
  const showDashboard = selectedModule === 'dashboard'

  return (
    <div className="app grid-layout">
      <SideMenu
        menuItems={menuItems}
        selectedModule={selectedModule}
        onModuleSelect={handleModuleSelect}
      />

      <div className="main-content">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : showDashboard ? (
          <DashboardPage />
        ) : (
          <AGGridComponent
            data={gridData}
            selectedModule={selectedModule}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  )
}

export default App
