import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import axios from "axios";
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/profile.css';
import Navbar from '../Components/Navbar';
import Header from "../Components/Header";
import Footer from "../Components/Footer";

function AddMap() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const data = queryParams.get("data");
  console.log("Data from query parameter:", data);

  const [user, setUser] = useState([]);
  const [role, setRole] = useState('');
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
        } else {
          console.log("Check this");
          navigate('/')
        }
      })
      .catch((err) => console.log(err))
  }, []);

  const [markerPosition, setMarkerPosition] = useState({
    lat: 9.683894984146999,
    lng: 80.02274055270313,
  }); 

  const googleMapsApiKey = "AIzaSyBqmWNhDW-VOxrjlInrTbew0mhrMGGp0tg";

  useEffect(() => {
    console.log("data : ",data);
    if (data) { 
      axios
        .get(`http://localhost:8081/boarding-locations/${data}`)
        .then((response) => {
          if (response.data.length > 0) {
            const { lat, lng } = response.data[0];
            if (lat && lng) {
              setMarkerPosition({ lat, lng });
            }
            console.log("Location Data:", response.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching location data:", error);
        });
    }
  }, [data]);

  const handleMapClick = ({ lat, lng }) => {
   
    if (lat && lng) {
      setMarkerPosition({ lat, lng });
    }
  };

  const handleSubmit = () => {
    if (data) { 
      
      axios
        .post(`http://localhost:8081/submit-location/${data}`, {
          lat: markerPosition.lat,
          lng: markerPosition.lng,
        })
        .then((response) => {
         
          console.log(response.data.message); 
        })
        .catch((error) => {
          console.error("Error submitting location data:", error);
        });
      navigate("/home");
    }
  };

  return (<div className="mapcontainer">
                <div className="navmap"> <Navbar />
               </div>
                <div  className="map">
                  <LoadScript googleMapsApiKey={googleMapsApiKey}>
                    <GoogleMap
                      mapContainerStyle={{
                        width: "100%",
                        height: "550px",
                      }}
                      center={markerPosition}
                      zoom={14}
                      onClick={handleMapClick}
                    >
                      <MarkerF
                        position={markerPosition}
                        draggable={true}
                        onDragEnd={(event) => {
                          
                          setMarkerPosition({
                            lat: event.latLng.lat(),
                            lng: event.latLng.lng(),
                          });
                        }}
                      />
                    </GoogleMap>
                  </LoadScript>
                  
                 
                   
                  
                </div> 
                <div className="buttonsub"><button className="buttonmap" onClick={handleSubmit}>Submit Location</button></div>
                <div className="foot"><Footer /></div>
                
    </div>
  );
}

export default AddMap;
