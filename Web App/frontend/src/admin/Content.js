import React from 'react'

const Content = () => {

    return (
    <div>
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
    )
}

export default Content