import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function Slidebar() {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const { id } = useParams();

  const handleHome = () => {
    navigate(`/admin/home/${id}`);
  };

  const handleProfile = () => {
    navigate(`/admin/profile/${id}`);
  };

  const handleNotifications = () => {
    navigate(`/admin/notify/${id}`);
  };

  const handleAdmins = () => {
    navigate(`/admin/info/${id}`);
  };

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:8081/logout');
      window.location.href = '/';
      console.log('Logout was called.');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };


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
    <div class="d-flex flex-column flex-shrink-0 p-3 text-bg-dark" id="Slidebar">
      <br></br>
      <ul class="nav nav-pills flex-column mb-auto">
        
        <li>
          <button onClick={handleHome}  class="btn btn-outline-success d-inline-flex align-items-center" id="Slidebutton">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-door-fill" viewBox="0 0 16 16">
            <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z"/>
          </svg>&ensp;
            Dashboard
          </button>
        </li>

        <li>
          <button href="#" onClick={handleProfile}  class="btn btn-outline-success d-inline-flex align-items-center" id="Slidebutton">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
          </svg>&ensp;
            Profile
          </button>
        </li>

        <li>
          <button href="#" onClick={handleNotifications}  class="btn btn-outline-success d-inline-flex align-items-center" id="Slidebutton">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell-fill" viewBox="0 0 16 16">
            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>
          </svg>&ensp;
            Notifications
          </button>
        </li>

        {
  user.map((cuser) =>
    cuser.Role === 'superadmin' ? (
      <li key={cuser.Id}>
        <button
          href="#"
          onClick={handleAdmins}
          class="btn btn-outline-success d-inline-flex align-items-center"
          id="Slidebutton"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-pencil-square"
            viewBox="0 0 16 16"
          >
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
            <path
              fillRule="evenodd"
              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
            />
          </svg>
          &ensp; Admin Info
        </button>
      </li>
    ) : null
  )
}
        <li>
          <button href="#" onClick={handleLogout}  class="btn btn-outline-success d-inline-flex align-items-center" id="Slidebutton">
          <svg xmlns="http://www.w3.org/2000/svg"   width="16" height="16" fill="currentColor" class="bi bi-hurricane" viewBox="0 0 16 16">
            <path d="M6.999 2.6A5.5 5.5 0 0 1 15 7.5a.5.5 0 0 0 1 0 6.5 6.5 0 1 0-13 0 5 5 0 0 0 6.001 4.9A5.5 5.5 0 0 1 1 7.5a.5.5 0 0 0-1 0 6.5 6.5 0 1 0 13 0 5 5 0 0 0-6.001-4.9zM10 7.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/>
          </svg>&ensp;
            Sign out
          </button>
        </li>

      </ul>
      <hr />
      {user.map(cuser => (
        <div className="dropdown" key={cuser.Id}>
          <h6 style={{color:'#76BF78'}}>{cuser.UserName}</h6>
        </div>
      ))}
    </div>
  )
}

export default Slidebar