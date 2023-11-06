import React from 'react'
import Slidebar from './Slidebar'
import Dashdis from './Dashdis'
import Features from './Features'
import "../css/admin.css";

const Addashboard = () => {

  return (
    <div class="Container">
        <Slidebar/>
        <Dashdis/>
        <Features/>
    </div>
  )
}

export default Addashboard