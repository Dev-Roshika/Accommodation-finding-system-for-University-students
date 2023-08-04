import React, { useEffect, useState } from 'react'
import '../css/profile.css';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChangePassword from '../Components/ChangePassword';

function Profile() {
    const[user,UseUser] = useState([])
    const[selectedImage,setSelectedImage] = useState(null);
    const [role, setRole] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isDeletePopupOpen,setisDeletePopupOpen] = useState(false);
    const [ischangePopupOpen,setisChangePopupOpen] = useState(false);
    const navigate = useNavigate();
    
    axios.defaults.withCredentials = true;

    const handleLogout = async () => {
      try {
        await axios.get('http://localhost:8081/logout');
        window.location.href = '/';
        console.log("logout was called .");
      } catch (error) {
        console.error('Error logging out:', error);
      }
    };

    useEffect(() => {
      axios.get('http://localhost:8081')
        .then((res) => {
          if (res.data.Valid && (res.data.Role === 'student' || res.data.Role === 'owner')) {
            console.log(res.data.Role)
            console.log(res.data.Id)
            console.log(res.data)
            setRole(res.data.Role);
          } else{
            console.log("Check this");
            navigate('/')
          }
        })
        .catch((err) => console.log(err))
        // eslint-disable-next-line
    }, [])
      const handleImageSelect = (event) => {
        setSelectedImage(event.target.files[0]);
      };
      const handleDelete = async() =>{
          try {
           
            const resp = await axios.post('http://localhost:8081/student/delete');
            console.log("delete : ")
            console.log(resp)
            closeChangePopup();
            handleLogout(); 
            
          } catch (error) {
            console.log(error);
          }
      };
      const handleImageUpload = async () => {
      try {
          const formData = new FormData();
          formData.append('profile_image', selectedImage);
      
      await axios.post('http://localhost:8081/profile/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
      });
      // Image upload success, perform any necessary actions
          console.log('Image uploaded successfully');
          setIsPopupOpen(false);
          window.location.reload();
        } catch (error) {
          console.log(error);
          toast.error('Make sure uou are uploading a image file!!!');
        }
      };  
    useEffect(()=>{
        const getUser = async() =>
        {
            try{
                const resp = await axios.get('http://localhost:8081/student/show');
                console.log("test")
                console.log(resp)
                UseUser(resp.data);
            }
            catch(err){
                console.log(err)
            }
        }
        getUser();
    },[])
    const openPopup = () => {
        setIsPopupOpen(true);
      };
    
      const closePopup = () => {
        setIsPopupOpen(false);
      };
      const openDeletePopup = () =>{
        setisDeletePopupOpen(true);
      };
      const closeDeletePopup = () =>{
        setisDeletePopupOpen(false);
      };
      const openChangePopup = () =>{
        setisChangePopupOpen(true);
      };
      const closeChangePopup = () =>{
        setisChangePopupOpen(false);
      };
      
  return (
<div className='ProfilePage' >
     <Navbar />
     
  
  
  
  {user.map(cuser =>(  
       
        <div className="containerProfile" key={cuser.Id} style={{border:"1px solid black"}}>
                    <div className='left'>
                    <div className='profileimage'>
                    
                        <img className="profileimg" src={`http://localhost:8081/images/profile_images/${role}/${cuser.ProfileImage}`} alt='' height={100} width={100} onClick={openPopup}/>
                    </div>
                    <div className='links'>
                      <Link onClick={openDeletePopup}>Change Password</Link><br />
                      <Link onClick={openChangePopup}>delete account</Link>
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
                      </>):role ==='owner'?(<>
                      {/* Display owner-specific content here */}
                      
                      <p className='row'><label>NID :  {cuser.NidNo}</label></p>
                      <p className='row'><label>Address :  {cuser.PrivateAddress}</label></p>
                     
                    </>
                  ) : null}
                    <p className='row'><label>Email :  {cuser.Email}</label></p>
                      <p className='row'><label >Contact No :  {cuser.ContactNo} </label></p>
                      
                      <button className='profileupdate'><Link to= "/UpdateProfile">Edit</Link></button>
                   </div>
                   </div>
                    <Popup open={isPopupOpen} onClose={closePopup}>
                    <div className='pop'>
                        <h3>Let's add a profile picture !!!.</h3>
                        <input className='profileInput' type="file" accept="image/*" onChange={handleImageSelect} />
                        <button onClick={handleImageUpload}>Upload Image</button>
                        
                        <button onClick={closePopup}>Cancel</button>
                        
                    </div>
                    </Popup>
                    <Popup open={isDeletePopupOpen} onClose={closeDeletePopup}>
                    <div className='pop'>

                    <button onClick={closeDeletePopup}>Cancel</button>
                       <ChangePassword />    
                    <button onClick={closeDeletePopup}>Cancel</button>
                        
                    </div>
                    </Popup>
                    <Popup open={ischangePopupOpen} onClose={closeChangePopup}>
                    <div className='pop'>
                      
                       <div>
                        <h2>Are you want to permanently delete your account?</h2>
                        <p>All your data will be lost.</p>
                        <button onClick={handleDelete}>Yes</button>
                        </div>   
                    <button onClick={closeChangePopup}>Cancel</button>
                        
                    </div>
                    </Popup>
                   
        </div>
        
           
     
      
    
     ))}
  
  
  <ToastContainer />
</div>
  )
}

export default Profile
