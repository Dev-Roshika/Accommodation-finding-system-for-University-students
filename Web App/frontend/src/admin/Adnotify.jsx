import React from 'react'
import Slidebar from './Slidebar'
import Features from './Features'

function Adnotify () {


  return (
    <div class="Container">
        <Slidebar/>
        
        <div className="Dashdis">
            <div>
            <header>
            <div class="Header">
              <h5>Messages from Users</h5>&emsp;
            </div>
              <hr></hr>
            </header>
            <div class="col-md-12" id="Card">
              <div class="col p-4 d-flex flex-column position-static">
                <strong class="d-inline-block mb-2 text-primary-emphasis">from ---</strong>
                <div class="mb-1 text-body-secondary">Nov 12</div>
                <p class="card-text mb-auto">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
              </div>
              <div class="Cardbutton">
              <a href="#" class="btn btn-success" role="button">Solve</a>
              </div>
            </div>
            </div>
          </div>
            <br></br>

        <Features/>
      </div>
  )
}

export default Adnotify