import React from 'react'
import AdminNav from '../Components/AdminNav'
import FetchUsers from '../Components/FetchUsers'
function Users() {
  return (
    <div>
        <AdminNav/>
        <div style={{padding:"30px"}}><FetchUsers/></div>
    </div>
  )
}

export default Users