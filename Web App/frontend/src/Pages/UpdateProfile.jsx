import React, { useEffect, useState } from 'react'
import '../css/home.css';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/profile.css';

function UpdateProfile() {
    const[user,UseUser] = useState([])
    const [role, setRole] = useState('');
    //const [user, setUser] = useState([]);
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;
    useEffect(() => {
      axios.get('http://localhost:8081')
        .then((res) => {
          if (res.data.Valid && (res.data.Role === 'student' || res.data.Role === 'owner')) {
            setRole(res.data.Role);
            console.log(res.data.Role)
          } else{
            console.log("Check this");
            navigate('/')
          }
        })
        .catch((err) => console.log(err))
        // eslint-disable-next-line
    }, [])
    useEffect(()=>{
        const getUser = async() =>
        {
            try{
                const resp = await axios.get('http://localhost:8081/student/show');
                UseUser(resp.data);
            }
            catch(err){
                console.log(err)
            }
        }
        getUser();
    },[])
    const Navigate = useNavigate();
    const handleClick = async e =>{
        e.preventDefault();
    try{
      await axios.put("http://localhost:8081/student/updateUser",user) 
      console.log("work")
      Navigate("/profile")
    }catch(err){
        console.log(user)
      console.log("error")
      console.log(err)
    }
    }
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        UseUser((prevState) => {
          const updatedUser = [...prevState];
          updatedUser[index] = {
            ...updatedUser[index],
            [name]: value,
          };
          return updatedUser;
        });
      };
    
  return (
<div>
     <Navbar />
     
  <div className="container">
  <div className= "square">     
      <div className="profile">
            {user.map((cuser,index) =>(
                <div key={cuser.Id}>
                    <div  className='profileimage'>
                        <img  className="profileimg" src={`http://localhost:8081/images/profile_images/${role}/${cuser.ProfileImage}`} alt="add a Profile image" height={100} width={100} />
                    </div> 
                    <div className="rows">                    <p className='row'><label>User Name :  {cuser.UserName}</label></p>
                      <p className='row'><label>Full Name :  {cuser.FullName}</label></p>
                       
                     <p className='row'> <input  type="text" placeholder={cuser.Email}  name="Email" value={cuser.Email||''} onChange={(e) => handleInputChange(e, index)}/>
                      </p>
                      <p className='row'><input  type="number" placeholder={cuser.ContactNo} value={cuser.ContactNo||''} onChange={(e) => handleInputChange(e, index)}  name = "ContactNo"/>
              </p>   
              <button className='profileupdate' onClick={handleClick}>Save</button>
                    </div>
                </div>
            ))}

  </div>
  </div>   
        </div>  
</div>
  )
}

export default UpdateProfile