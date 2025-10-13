import { useState, useEffect } from 'react'
import './SideMenu.css'

function SideMenu({ menuItems, selectedModule, onModuleSelect }) {
  const [expandedItems, setExpandedItems] = useState({})
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    // Auto-expand the first menu item
    if (menuItems && Array.isArray(menuItems) && menuItems.length > 0) {
      setExpandedItems({ [menuItems[0].id]: true })
    }
  }, [menuItems])

  useEffect(() => {
    // Close mobile menu when clicking outside
    const handleClickOutside = (event) => {
      if (window.innerWidth <= 768 && !event.target.closest('.side-menu')) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const toggleExpanded = (itemId) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }))
  }

  const handleModuleClick = (module) => {
    onModuleSelect(module)
    if (window.innerWidth <= 768) {
      setIsMobileMenuOpen(false)
    }
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      {/* Mobile menu toggle button */}
      <button
        className="mobile-menu-toggle"
        onClick={toggleMobileMenu}
        style={{ display: window.innerWidth <= 768 ? 'block' : 'none' }}
      >
        ☰ Menu
      </button>

      <div className={`side-menu ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="menu-header">
          <div className="menu-logo company-logo"></div>
          {/* <h3>Navigation</h3> */}
          {window.innerWidth <= 768 && (
            <button className="mobile-close-btn" onClick={() => setIsMobileMenuOpen(false)}>
              ×
            </button>
          )}
        </div>

        <div className="menu-items">
          {menuItems && Array.isArray(menuItems) && menuItems.length > 0 ? (
            menuItems.map((item) => (
              <div key={item.id} className="menu-item">
                <div
                  className={`menu-item-header ${expandedItems[item.id] ? 'expanded' : ''}`}
                  onClick={() => toggleExpanded(item.id)}
                >
                  <span className="menu-icon">
                    {item.id === 'admin' ? '🛡️' : '📊'}
                  </span>
                  <span className="menu-name">{item.name}</span>
                  <span className="menu-arrow">
                    {expandedItems[item.id] ? '▼' : '▶'}
                  </span>
                </div>

                {expandedItems[item.id] && (
                  <div className="menu-modules">
                    {item.modules && item.modules.length > 0 ? (
                      item.modules.map((module) => (
                        <div
                          key={module.id}
                          className={`menu-module ${selectedModule === module.id ? 'selected' : ''}`}
                          onClick={() => handleModuleClick(module.id)}
                        >
                          <span className="module-icon">
                            {module.id === 'users' ? '👥' :
                             module.id === 'products' ? '📦' :
                             module.id === 'api_config' ? '🔧' :
                             module.id === 'pin_requests' ? '🔑' :
                             module.id === 'pin_verifications' ? '✅' :
                             '📄'}
                          </span>
                          <span className="module-name">{module.name}</span>
                        </div>
                      ))
                    ) : (
                      <div className="no-modules">
                        No modules available
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="no-menu-items">
              No menu items available
            </div>
          )}
        </div>
      </div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && window.innerWidth <= 768 && (
        <div className="mobile-overlay" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}
    </>
  )
}

export default SideMenu
