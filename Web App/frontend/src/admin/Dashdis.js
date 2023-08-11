import React from 'react'

const Dashdis = () => {
  
  return (
    <div className="Dashdis">
      <div>
          <header>
            <div class="Header">
              <h5>New Accomodations</h5>&emsp;
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" style={{marginLeft:740}} fill="currentColor" class="bi bi-bell-fill" viewBox="0 0 16 16">
                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>
              </svg>
            </div>
              <hr></hr>
          </header>
          <div class="col-md-12" id="Card">
              <div class="col p-4 d-flex flex-column position-static">
                <strong class="d-inline-block mb-2 text-primary-emphasis">Accomodation 01</strong>
                <div class="mb-1 text-body-secondary">Nov 12</div>
                <p class="card-text mb-auto">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
              </div>
              <div class="Cardbutton">
              <a href="#" class="btn btn-success" role="button">Verify</a>
              </div>
          </div>
            <br></br>
          <div class="col-md-12" id="Card">
            <div class="col p-4 d-flex flex-column position-static">
                <strong class="d-inline-block mb-2 text-primary-emphasis">Accomodation 02</strong>
                <div class="mb-1 text-body-secondary">Nov 12</div>
                <p class="card-text mb-auto">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
            </div>
            <div class="Cardbutton">
              <a href="#" class="btn btn-success" role="button">Verify</a>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Dashdis