import React from 'react'
import '../css/navbar.css'
import {Link} from 'react-router-dom'

function Navbar() {
  return (
    <div className='navbar'>
        <div className='navContainer'>
            <span className='logo'>UniAccomodations</span>
            <div className='navItems'>
                <button className='navButton'><Link to ="/profile">Account</Link></button>
                <button className='navButton'>Logout</button>
            </div>
        </div>
    </div>
  )
}

export default Navbar