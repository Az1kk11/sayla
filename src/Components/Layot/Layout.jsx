import React from 'react'
import LeftNavbar from '../../Admin/ux/leftNavbar'
import { useLocation } from 'react-router-dom'
import Routers from '../../Rauters/routers'
import './layout.css'

function Layout() {
  const location = useLocation()
  return (
    <div className={location.pathname.startsWith('/admin') ? 'layout' : 'layout-users'} >
      {location.pathname.startsWith('/admin') ? <LeftNavbar /> : ''}
      <>
        <Routers />
      </>
    </div>
  )
}

export default Layout