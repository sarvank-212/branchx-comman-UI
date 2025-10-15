import SideMenu from './components/layout/SideMenu'
import AGGridComponent from './components/common/AGGridComponent'
import { useAppLogic } from './hooks/useAppLogic'
import './styles/global.css'

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
