import React from 'react'
import { Outlet,Link } from 'react-router-dom'

const Layout = () => {

  return (
    <>
      <nav>
        <ul>
          <li><Link to="/login">Adlogin</Link></li>
          <li><Link to="/signup">Adsignup</Link></li>
          <li><Link to="/option">Loginoption</Link></li>
          <li><Link to="/home">Addashboard</Link></li>
          <li><Link to="/profile">Adprofile</Link></li>
          <li><Link to="/editprofile">Adeditprofile</Link></li>
          <li><Link to="/setting">Adsetting</Link></li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
}

export default Layout