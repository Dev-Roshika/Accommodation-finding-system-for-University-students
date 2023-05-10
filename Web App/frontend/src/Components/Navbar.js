import React from 'react'
import '../css/navbar.css'

function Navbar() {
  return (
    <div className='navbar'>
        <div className='navContainer'>
            <span className='logo'>UniAccomodations</span>
            <div className='navItems'>
                <button className='navButton'>Account</button>
                <button className='navButton'>Logout</button>
            </div>
        </div>
    </div>
  )
}

export default Navbar