import React from 'react'
import { useNavigate } from 'react-router-dom'
import Slidebar from './Slidebar'
import Features from './Features'

const Adsignup = () => {

  return (
    <div class="Container">
        <Slidebar/>
        <div class="Dashdis">
        <div class="box-signupform">
        <form class="signup" action="" method="post">
            <h1>Admin Registration</h1>
            <div class="col-md-12" id="Flex">
            <div class="col-md-6">
                <input type="text" placeholder="full name" required></input>
                <input type="text" placeholder="profile name" required></input>
                <input type="text" placeholder="address" required></input>
                <input type="email" placeholder="e-mail" required></input>
                <input type="password" placeholder="password" required></input>
            </div>
            <div class="col-md-1"></div>
            <div class="col-md-5">
                <input type="text" placeholder="position" required></input>
                <input type="text" placeholder="male/female" required></input>
                <input type="text" placeholder="contact number" required></input>                      
                <input type="hidden" name="role" value="admin"></input>
            </div>
            </div>
            <br/><br/>
            <center><button type="submit" class="btn btn-success" id="signupbutton">Register</button></center>
            
        </form>
        
        </div>
        </div>
        <Features/>
    </div>
  )
}

export default Adsignup