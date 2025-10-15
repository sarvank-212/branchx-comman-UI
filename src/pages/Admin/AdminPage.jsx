import React from 'react'
import AGGridComponent from '../components/common/AGGridComponent'

const AdminPage = ({ moduleId, data, ...props }) => {
  // This page simply renders a card with the grid inside - the grid handles header/search/actions
  return (
    <div className="main-content">
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <AGGridComponent selectedModule={moduleId} data={data} {...props} />
      </div>
    </div>
  )
}

export default AdminPage
