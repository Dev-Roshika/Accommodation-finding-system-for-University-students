import axios from "axios";
import React from "react";
import "../css/navbar.css";
 
function Navbar() {
  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:8081/logout');
      window.location.href = '/';
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  
  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">UniAccomodations</span>
        <div className="navItems">
          <button className="navButton">Account</button>
          <button className="navButton" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
