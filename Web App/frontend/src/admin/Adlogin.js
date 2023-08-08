import {React}  from 'react'
import { useNavigate } from 'react-router-dom'

const Adlogin = () => {

	const Navigate = useNavigate();
	
	function handleSubmit(event) {
		event.preventDefault();
		Navigate('/home');
	}
	
	function handleSignup(event) {
		event.preventDefault();
		Navigate('/option');
	}

  	return (
       <div class="box-form">
	        <form class="login" action="" onSubmit={handleSubmit}>
		        <h1>AFS</h1><br/>
		        <p>Don't have an account? <a href="#" onClick={handleSignup}>Creat Your Account</a> it takes less than a minute</p>
		        <div>
			        <input type="text" placeholder="e-mail"></input>
			        <br/>
			        <input type="password" placeholder="password"></input>
		        </div>
			
			    <br/>

                <a href="">forget password?</a>
			
			    <br/><br/>
			    <button type="submit" class="btn btn-success" id="loginbutton">Login</button><br/>
	        </form>
	
        </div>
    )
}

export default Adlogin