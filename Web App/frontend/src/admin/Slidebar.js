import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Slidebar = () => {

	const Navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
	
	function handleProfile(event) {
		event.preventDefault();
		Navigate('/profile');
    setIsActive(true);
	}

  function handleHome(event) {
		event.preventDefault();
		Navigate('/home');
    setIsActive(true);
	}

  function handleSetting(event) {
		event.preventDefault();
		Navigate('/setting');
    setIsActive(true);
	}

  function handleSignout(event) {
		event.preventDefault();
		Navigate('/');
    setIsActive(true);
	}

  function handleAdmission(event) {
		event.preventDefault();
		Navigate('/signup');
    setIsActive(true);
	}

  return (
    <div class="d-flex flex-column flex-shrink-0 p-3 text-bg-dark" id="Slidebar">
      <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <span class="fs-4">ADMIN</span>
      </a>
      <br></br>
      <ul class="nav nav-pills flex-column mb-auto">
        
        <li>
          <button onClick={handleHome} disabled={isActive} class="btn btn-outline-success d-inline-flex align-items-center" id="Slidebutton">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-door-fill" viewBox="0 0 16 16">
            <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z"/>
          </svg>&ensp;
            Dashboard
          </button>
        </li>

        <li>
          <button href="#" onClick={handleProfile} disabled={isActive} class="btn btn-outline-success d-inline-flex align-items-center" id="Slidebutton">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
          </svg>&ensp;
            Profile
          </button>
        </li>

        <li>
          <button href="#" onClick={handleSetting} disabled={isActive} class="btn btn-outline-success d-inline-flex align-items-center" id="Slidebutton">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear-fill" viewBox="0 0 16 16">
            <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
          </svg>&ensp;
            Setting
          </button>
        </li>

        <li>
          <button href="#" onClick={handleAdmission} disabled={isActive} class="btn btn-outline-success d-inline-flex align-items-center" id="Slidebutton">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
          </svg>&ensp;
            Admission
          </button>
        </li>

        <li>
          <button href="#" onClick={handleSignout} disabled={isActive} class="btn btn-outline-success d-inline-flex align-items-center" id="Slidebutton">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hurricane" viewBox="0 0 16 16">
            <path d="M6.999 2.6A5.5 5.5 0 0 1 15 7.5a.5.5 0 0 0 1 0 6.5 6.5 0 1 0-13 0 5 5 0 0 0 6.001 4.9A5.5 5.5 0 0 1 1 7.5a.5.5 0 0 0-1 0 6.5 6.5 0 1 0 13 0 5 5 0 0 0-6.001-4.9zM10 7.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/>
          </svg>&ensp;
            Sign out
          </button>
        </li>

      </ul>
      <hr></hr>
      <div class="dropdown">
        <img src="https://github.com/mdo.png" alt="" width="32" height="32" class="rounded-circle me-2"></img>
          <strong>Admin Name</strong>
      </div>
    </div>
  )
}

export default Slidebar