import React, { useEffect, useState } from 'react'
import '../css/profile.css';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';

function Profile() {
    const[user,UseUser] = useState([])
    const[selectedImage,setSelectedImage] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleImageSelect = (event) => {
        setSelectedImage(event.target.files[0]);
      };
      const handleImageUpload = async () => {
        try {
          const formData = new FormData();
          formData.append('image', selectedImage);
      
          await axios.post('http://localhost:8081/profile/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
      
          // Image upload success, perform any necessary actions
          console.log('Image uploaded successfully');
          setIsPopupOpen(false);
        } catch (error) {
          console.log(error);
        }
      };  
    useEffect(()=>{
        const getUser = async() =>
        {
            try{
                const resp = await axios.get('http://localhost:8081/student/show/'+20);
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
  return (
<div>
     <Navbar />
     
  <div className="container">
    <div className= "square">     
      <div className="profile">
            {user.map(cuser =>(
        <div key={cuser.Id}>
                    <div className='profileimage'>
                        <img src="./Images/k.jpg" alt="this is saman" height={100} width={100} onClick={openPopup}/>
                    </div> 
                    <div className="rows">
                      <p className='row'><label>User Name :  {cuser.UserName}</label></p>
                      <p className='row'><label>Full Name :  {cuser.FullName}</label></p>
                      <p className='row'><label>Email :  {cuser.Email}</label></p>
                      <p className='row'><label >Contact No :  {cuser.ContactNo} </label></p>
                      <button className='profileupdate'><Link to= "/UpdateProfile">change</Link></button>
                   </div>
                    <Popup open={isPopupOpen} onClose={closePopup}>
                    <div className='pop'>
                        <h3>Let's add a profile picture !!!.</h3>
                        <input type="file" accept="image/*" onChange={handleImageSelect} />
                        <button onClick={handleImageUpload}>Upload Image</button>
                        <button onClick={closePopup}>Cancel</button>
                    </div>
                    </Popup>
        </div>
            ))}
      </div>
    </div>
  </div>
  
  
</div>
  )
}

export default Profile