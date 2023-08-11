import React from 'react'
import { useNavigate } from 'react-router-dom'
import Slidebar from './Slidebar'
import Features from './Features'

const Adprofile = () => {

    const Navigate = useNavigate();
	
	function handleEditprofile(event) {
		event.preventDefault();
		Navigate('/admin/editprofile');
	}

  return (
    <div class="Container">
        <Slidebar/>
        <div className="Dashdis">
                    <form method="post">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="profile-img">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt=""/><br/><br/>
                                    <center><button class="btn btn-outline-success">Change Photo</button></center>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="profile-head">
                                            <h4>Profile Name</h4>
                                            <h6>position</h6><br/><br/><br/>
                                            <h4> Profile </h4>
                                            <hr/>
                                </div>
                            </div>
                            <div class="col-md-2">
                                <input type="submit" class="btn btn-success" name="btnAddMore" value="Edit Profile" onClick={handleEditprofile}/>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4"></div>
                            <div class="col-md-8">
                                <div class="tab-content profile-tab" id="myTabContent">
                                    <div id="Card" role="tabpanel" aria-labelledby="home-tab">
                                        <div class="col-md-12">
                                                <div class="row">
                                                    <div class="col-md-5">
                                                        <label>Name</label>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <label>:</label>
                                                    </div>
                                                    <div class="col-md-5">
                                                        <p>Thanan</p>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-5">
                                                        <label>User name</label>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <label>:</label>
                                                    </div>
                                                    <div class="col-md-5">
                                                        <p>Thanan123</p>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-5">
                                                        <label>Address</label>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <label>:</label>
                                                    </div>
                                                    <div class="col-md-5">
                                                        <p>Jaffna</p>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-5">
                                                        <label>Position</label>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <label>:</label>
                                                    </div>
                                                    <div class="col-md-5">
                                                        <p>union president</p>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-5">
                                                        <label>Gender</label>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <label>:</label>
                                                    </div>
                                                    <div class="col-md-5">
                                                        <p>male</p>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-5">
                                                        <label>Contact number</label>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <label>:</label>
                                                    </div>
                                                    <div class="col-md-5">
                                                        <p>1234567890</p>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-5">
                                                        <label>E-mail</label>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <label>:</label>
                                                    </div>
                                                    <div class="col-md-5">
                                                        <p>example@gmail.com</p>
                                                    </div>
                                                </div>
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>           
                </div>
            <Features/>
        </div>
    )
    }

export default Adprofile