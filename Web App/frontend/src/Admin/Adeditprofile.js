import React from 'react'
import { useNavigate } from 'react-router-dom'
import Slidebar from './Slidebar'
import Features from './Features'

const Adeditprofile = () => {

  const Navigate = useNavigate();
	
	function backProfile(event) {
		event.preventDefault();
		Navigate('/profile');
	}

  return (
    <div class="Container">
        <Slidebar/>
        <div className="Dashdis">
            <form  action="" method="post">
                <center><h3>Change profile</h3></center><br/>
                <div class="col-md-12" id="Card">

                    <div class="col-md-6">
                    <label class="form-label">Full name</label><br/>
                    <input type="text" class="form-control" placeholder="full name" required></input><br/>
                    <label class="form-label">Profile name</label><br/>
                    <input type="text" class="form-control" placeholder="profile name" required></input><br/>
                    <label class="form-label">Address</label><br/>
                    <input type="text" class="form-control" placeholder="address" required></input><br/>
                    <label class="form-label">E-mail</label><br/>
                    <input type="email" class="form-control" placeholder="e-mail" required></input><br/>
                    </div>
                    <div class="col-md-1"></div>
                    <div class="col-md-5">
                    <label class="form-label">Gender</label><br/>
                    <input type="text" class="form-control" placeholder="male/female" required></input><br/>
                    <label class="form-label">Contact number</label><br/>
                    <input type="text" class="form-control" placeholder="contact number" required></input><br/>
                    <label class="form-label">Position</label><br/>
                    <input type="text" class="form-control" placeholder="position" required></input><br/>
                    </div>

                </div>
                <br/>
                <center>
                <button type="submit" class="btn btn-info" onClick={backProfile}>Back</button>&emsp;
                <button type="submit" class="btn btn-success">Update</button>
                </center>
            </form>
            </div>
            <Features/>
        </div>
  )
}

export default Adeditprofile