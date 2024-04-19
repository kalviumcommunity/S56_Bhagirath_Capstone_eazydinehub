import React from 'react'
import AdminNav from '../Components/AdminNav'
import FetchUsers from '../Components/FetchUsers'
function Users() {
  return (
    <div>
        <AdminNav/>
        <div style={{padding:"20px"}}><FetchUsers/></div>
    </div>
  )
}

export default Users