import SideMenu from './components/layout/SideMenu'
import AGGridComponent from './components/common/AGGridComponent'
import AddModal from './components/common/AddModal'
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
    isAddModalOpen,
    closeAddModal,
    handleAddSuccess,
    formFields
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

      <AddModal
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        selectedModule={selectedModule}
        onSuccess={handleAddSuccess}
        formFields={formFields}
      />
    </div>
  )
}

export default App
