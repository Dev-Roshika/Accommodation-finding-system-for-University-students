import React from 'react'
import Slidebar from './Slidebar'
import Features from './Features'
import { useNavigate } from 'react-router-dom';

function Adchangepassword () {
  const navigate = useNavigate();

  const backChangePassword = async () =>  {
		navigate('/admin/profile');
	}

  const handleUpdatePassword = async () =>  {

	}

  return (
    <div class="Container">
        <Slidebar/>
        <div className="Dashdis">
        <form action="" method="post">
            <center>
            <h3>Change password</h3><br/>
            <div class="col-md-8" id="Card">
            <div class="col-md-12">
                <label class="form-label">Old password</label><br/>
                <input type="text" class="form-control"  required></input><br/>
                <label class="form-label">New password</label><br/>
                <input type="text" class="form-control"  required></input><br/>
                <label class="form-label">Confirm new password</label><br/>
                <input type="text" class="form-control"  required></input><br/>
            </div>
            </div>
            <br/><br/>
            <button type="submit" class="btn btn-info" id="signupbutton" onClick={backChangePassword}>back</button>&emsp;&emsp;
            <button type="submit" class="btn btn-success" id="signupbutton"  onClick={handleUpdatePassword}>Change password</button>
            </center>
        </form>
        </div>
        <Features/>
      </div>
  )
}

export default Adchangepassword