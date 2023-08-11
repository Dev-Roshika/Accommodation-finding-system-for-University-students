import React from 'react'
import { useNavigate } from 'react-router-dom'

const Features = () => {

	const Navigate = useNavigate();
	
	function handleStudent(event) {
		event.preventDefault();
		Navigate('/admin/student');
	}
    function handleOwner(event) {
		event.preventDefault();
		Navigate('/admin/owner');
	}
    function handleAccomodation(event) {
		event.preventDefault();
		Navigate('/admin/accom');
	}

  return (
    <div className="Features">
        <div>

        <div class="col-lg-4">
            <h5>@Students</h5><br></br>
            <svg class="bd-placeholder-img rounded-circle" width="80" height="80" xmlns="http://www.w3.org/2000/svg" role="button" onClick={handleStudent}>
                <rect width="100%" height="100%" fill="#6ECCAF"/>
            </svg>
        </div><br/><br/><br/>


        <div class="col-lg-4">
            <h5>@Owners</h5><br></br>
            <svg class="bd-placeholder-img rounded-circle" width="80" height="80" xmlns="http://www.w3.org/2000/svg" role="button" onClick={handleOwner}>
                <rect width="100%" height="100%" fill="#F7D060"/>
            </svg>
        </div><br/><br/><br/>


        <div class="col-lg-4">
            <h5>#Accomodations</h5><br></br>
            <svg class="bd-placeholder-img rounded-circle" width="80" height="80" xmlns="http://www.w3.org/2000/svg" role="button" onClick={handleAccomodation}>
                <rect width="100%" height="100%" fill="#95BDFF"/>
            </svg>
        </div>

        </div>
    </div>
  )
}

export default Features