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
    const [emailError, setEmailError] = useState('');
    const [contactNoError, setContactNoError] = useState('');
   
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
    
    const validateEmail = (email) => {
    // Simple email validation using regex
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateContactNo = (contactNo) => {
    // Remove all non-digit characters and check if the resulting string has a length of 10
    const strippedContactNo = contactNo.replace(/\D/g, '');
    return strippedContactNo.length === 10;
  };
    const handleClick = async e =>{
        e.preventDefault();
        const updatedUser = user[0];
        const { Email, ContactNo } = updatedUser;
       
        // Validate email format
        if (!validateEmail(Email)) {
          setEmailError('Invalid email format');
          return;
        }
        else setEmailError('')
    
        // Validate contact number length
        if (!validateContactNo(ContactNo)) {
          setContactNoError('Contact number should contain exactly 10 numbers');
          return;
        }
        else setContactNoError('')

    try{
      await axios.put("http://localhost:8081/student/updateUser",user) 
      //console.log("work")
      Navigate("/profile")
    }catch(err){
       // console.log(user)
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
     
      
      <div className="profile">
            {user.map((cuser,index) =>(
                <div className='containerProfile' key={cuser.Id}>
                  <div className='left'>
                    <div  className='profileimage'>
                        <img  className="profileimg" src={`http://localhost:8081/images/profile_images/${role}/${cuser.ProfileImage}`} alt='' height={100} width={100} />
                    </div> 
                  </div>
                  <div className='right'>
                  <div className="rows"> 
                       <p className='row'><label>User Name :  {cuser.UserName}</label></p>
                      <p className='row'><label>Full Name :  {cuser.FullName}</label></p>
                       {role ==='student'?(<>
                        <p className='row'><label>Unoversity RegNo :  {cuser.UnivRegNo}</label></p>
                        <p className='row'><label>Faculty :  {cuser.Faculty}</label></p>
                        <p className='row'><label>Department :  {cuser.Dept}</label></p>
                       </>)
                       :role === 'owner'?(<>
                        <p className='row'><label>NID :  {cuser.NidNo}</label></p>
                       <p className='row'> <label>Address :<input className='profileInput' type="text" placeholder={cuser.PrivateAddress}  name="PrivateAddress" value={cuser.PrivateAddress||''} onChange={(e) => handleInputChange(e, index)}/>
                       </label></p>
                       </>):null}

                     <p className='row'> <label>Email : <input className='profileInput' type="text" placeholder={cuser.Email}  name="Email" value={cuser.Email||''} onChange={(e) => handleInputChange(e, index)}/>
                      {emailError && <span className="error">{emailError}</span>}</label></p>
                      
                      <p className='row'><label> Contact No : <input className='profileInput' type='tel' maxLength={10} placeholder={cuser.ContactNo} value={cuser.ContactNo||''} onChange={(e) => handleInputChange(e, index)}  name = "ContactNo"/>
                      {contactNoError && <span className="error">{contactNoError}</span>}</label></p>  

                      <button className='profileupdate' onClick={handleClick}>Save</button>
                    </div>
                  </div>
                    
                </div>
            ))}

  </div>
  </div>   
        
  )
}

export default UpdateProfile