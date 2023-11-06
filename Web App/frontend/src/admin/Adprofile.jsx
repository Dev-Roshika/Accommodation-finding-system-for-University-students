import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Slidebar from './Slidebar'
import Features from './Features'

const Adprofile = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState([]);
    const { id } = useParams();
	
	function handleEditprofile(event) {
		event.preventDefault();
		navigate(`/admin/editprofile/${id}`);
	}

    useEffect(() => {
        const getUser = async () => {
          try {
            const resp = await axios.get(`http://localhost:8081/admin/show/${id}`);
            console.log('test', resp.data);
            setUser(resp.data); // Assuming the response data is an array
          } catch (err) {
            console.log(err);
          }
        };
        getUser();
      }, []);

  return (
    <div class="Container">
        <Slidebar/>
        {user.map(cuser => (
        <div className="Dashdis" key={cuser.Id}>
                    <form method="post">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="profile-img">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt=""/><br/><br/>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="profile-head">
                                            <h4>{cuser.UserName}</h4>
                                            <h6>{cuser.Position}</h6><br/><br/><br/>
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
                                                        <p>{cuser.FullName}</p>
                                                    </div>
                                                    <div class="col-md-5">
                                                        <label>Gender</label>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <label>:</label>
                                                    </div>
                                                    <div class="col-md-5">
                                                        <p>{cuser.Gender}</p>
                                                    </div>
                                                    <div class="col-md-5">
                                                        <label>Mobile</label>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <label>:</label>
                                                    </div>
                                                    <div class="col-md-5">
                                                        <p>{cuser.Mobile}</p>
                                                    </div>
                                                    <div class="col-md-5">
                                                        <label>E-mail</label>
                                                    </div>
                                                    <div class="col-md-2">
                                                        <label>:</label>
                                                    </div>
                                                    <div class="col-md-5">
                                                        <p>{cuser.Email}</p>
                                                    </div>
                                                </div>
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>           
                </div>
        ))}
            <Features/>
        </div>
    )
    }

export default Adprofile