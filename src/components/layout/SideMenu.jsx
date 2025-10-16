// src/components/layout/SideMenu.jsx
import React, { useState, useEffect } from "react";
import "../../styles/global.css";
import "../../styles/SideMenu.css";
import Logo from "../../assets/images/10xFI_Black.svg";

function SideMenu({ menuItems = [], selectedModule, onModuleSelect }) {
  const [expandedItems, setExpandedItems] = useState({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (menuItems?.length > 0) {
      setExpandedItems({ [menuItems[0].id]: true });
    }
  }, [menuItems]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        window.innerWidth <= 768 &&
        !event.target.closest(".side-menu") &&
        !event.target.closest(".mobile-menu-toggle")
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const toggleExpanded = (itemId) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const handleModuleClick = (module) => {
    onModuleSelect?.(module);
    if (window.innerWidth <= 768) setIsMobileMenuOpen(false);
  };

  return (
    <>
      <button
        className="mobile-menu-toggle"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        style={{ display: window.innerWidth <= 768 ? "block" : "none" }}
      >
        ☰ Menu
      </button>

      <div className={`side-menu ${isMobileMenuOpen ? "mobile-open" : ""}`}>
        {/* Company logo area - changed class names to match CSS */}
        <div className="menu-header">
          <div className="menu-logo-wrap">
            <img
              src={Logo}
              alt="Company Logo"
              className="menu-logo"
              draggable="false"
              style={{ cursor: "pointer" }}
              onClick={() => {
                /* quick test: clicking toggles filesize visually via CSS if needed */
                // optional: navigate to dashboard: window.location.href = '/dashboard';
              }}
            />
          </div>
        </div>

        {/* Menu items */}
        <div className="menu-items">
          {menuItems?.length > 0 ? (
            menuItems.map((item) => (
              <div key={item.id} className="menu-item">
                <div
                  className={`menu-item-header ${
                    expandedItems[item.id] ? "expanded" : ""
                  }`}
                  onClick={() => toggleExpanded(item.id)}
                >
                  <span className="menu-icon">
                    {item.id === "admin" ? "🛡️" : "📊"}
                  </span>
                  <span className="menu-name">{item.name}</span>
                  <span className="menu-arrow">
                    {expandedItems[item.id] ? " ▼" : " ▶"}
                  </span>
                </div>

                {expandedItems[item.id] && (
                  <div className="menu-modules">
                    {item.modules?.length > 0 ? (
                      item.modules.map((module) => (
                        <div
                          key={module.id}
                          className={`menu-module ${
                            selectedModule === module.id ? "selected" : ""
                          }`}
                          onClick={() => handleModuleClick(module.id)}
                        >
                          <span className="module-icon">
                            {module.id === "users"
                              ? "👥"
                              : module.id === "products"
                              ? "📦"
                              : module.id === "api_config"
                              ? "🔧"
                              : module.id === "pin_requests"
                              ? "🔑"
                              : module.id === "pin_verifications"
                              ? "✅"
                              : "📄"}
                          </span>
                          <span className="module-name">{module.name}</span>
                        </div>
                      ))
                    ) : (
                      <div className="no-modules">No modules available</div>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="no-menu-items">No menu items available</div>
          )}
        </div>
      </div>

      {isMobileMenuOpen && window.innerWidth <= 768 && (
        <div
          className={`mobile-overlay ${isMobileMenuOpen ? "active" : ""}`}
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </>
  );
}

export default SideMenu;
