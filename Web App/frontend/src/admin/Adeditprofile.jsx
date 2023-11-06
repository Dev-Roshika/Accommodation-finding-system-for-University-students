import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Slidebar from './Slidebar';
import Features from './Features';

function Adeditprofile() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState([]);

    console.log(formData);
    const [loading, setLoading] = useState(true);
    const backProfile = () => {
        navigate(`/admin/profile/${id}`);
    };

    useEffect(() => {
        const getUser = async () => {
            try {
                const resp = await axios.get(`http://localhost:8081/admin/show/${id}`);
                console.log('test', resp.data);
                setFormData(resp.data);
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        };
        getUser();
    }, [id]);

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`http://localhost:8081/admin/update/${id}`, formData);
            console.log(response.data);
            navigate(`/admin/profile/${id}`);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="Container">
            <Slidebar />
            {formData.map(cuser =>(
            <div className="Dashdis" key={cuser.Id}>
                <form>
                    <center>
                        <h5>Change profile</h5>
                    </center>
                    <br />
                    <div className="col-md-12" id="Card">
                        <div className="col-md-4">
                            <label className="form-label">Full name</label>
                            <br />
                            <input
                                type="text"
                                className="form-control"
                                placeholder="full name"
                                name="fullname"
                                value={cuser.FullName||''}
                                onChange= {handleChange}
                            ></input>
                            <br />
                          </div>
                          <div className="col-md-2"></div>
                          <div className="col-md-4">
                            <label className="form-label">User name</label>
                            <br />
                            <input
                                type="text"
                                className="form-control"
                                placeholder="user name"
                                name="username"
                                value={cuser.UserName||''}
                                onChange= {handleChange}
                            ></input>
                            <br />
                        </div>
                    </div>
                    <div className="col-md-12" id="Card">
                        <div className="col-md-4">
                            <label className="form-label">Position</label>
                            <br />
                            <input
                                type="text"
                                className="form-control"
                                placeholder="position"
                                name="position"
                                value={cuser.Position||''}
                                onChange= {handleChange}
                            ></input>
                            <br />
                          </div>
                          <div className="col-md-2"></div>
                          <div className="col-md-4">
                          <label className="form-label">Gender</label>
                            <br />
                            <div>
                            <input
                                type="radio"
                                id="male"
                                name="gender"
                                value="male"
                                checked={cuser.Gender === "male"}
                                onChange= {handleChange}
                            />
                            <label htmlFor="male">Male</label>
                            </div>

                            <div>
                            <input
                                type="radio"
                                id="female"
                                name="gender"
                                value="female"
                                checked={cuser.Gender === "female"}
                                onChange= {handleChange}
                            />
                            <label htmlFor="female">Female</label>
                            </div>

                            <br />
                        </div>
                    </div>
                    <div className="col-md-12" id="Card">
                        <div className="col-md-4">
                            <label className="form-label">Email</label>
                            <br />
                            <input
                                type="text"
                                className="form-control"
                                placeholder="email"
                                name="email"
                                value={cuser.Email||''}
                                onChange= {handleChange}
                                required
                            ></input>
                          </div>
                          <div className="col-md-2"></div>
                          <div className="col-md-4">
                            <label className="form-label">Mobile</label>
                            <br />
                            <input
                                type="text"
                                className="form-control"
                                placeholder="mobile"
                                name="mobile"
                                value={cuser.Mobile||''}
                                onChange= {handleChange}
                            ></input>
                          </div>
                    </div>
                    <br />
                    <center>
                        <button type="button" className="btn btn-info" onClick={backProfile}>
                            Back
                        </button>
                        &emsp;
                        <button type="submit" className="btn btn-success" onClick={handleUpdate}>
                            Update
                        </button>
                    </center>
                </form>
            </div>
            ))}
            <Features />
        </div>
    );
}

export default Adeditprofile;
