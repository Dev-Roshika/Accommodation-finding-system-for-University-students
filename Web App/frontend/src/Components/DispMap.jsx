import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import axios from "axios";

import Swal from 'sweetalert2';
import "../css/map.css";

function DispMap({ data }) { 
  const googleMapsApiKey = "AIzaSyBqmWNhDW-VOxrjlInrTbew0mhrMGGp0tg";
  const [locations, setLocations] = useState([]);
  const [center, setCenter] = useState(null);
   
  useEffect(() => {
  
    axios.get(`http://localhost:8081/boarding-locations/${data}`)
      .then((response) => {
        if (Array.isArray(response.data) && response.data.length > 0) {
          
          setLocations(response.data);
          setCenter({
            lat: response.data[0].latitude,
            lng: response.data[0].longitude,
          });
        } else {
          setLocations([]); 
        }
      })
      .catch((error) => {
        console.error("Error fetching boarding location data:", error);
        
      });
  }, [data]);
  
  const handleClick = () => {
    // Use SweetAlert2 to show a message
    Swal.fire({
      title: 'Only Owner Can Add Location',
      html: 'You can add a location as an owner. <br/><a href="/AddMap?data=' + data + '">Proceed to Add Location</a>',
      icon: 'info',
      color: '#016551',
      iconColor:'#016551',
      confirmButtonColor:'#016551'
    });
  };
  
  return (
    <><div className="popupmap">
    
    <h5><Link onClick={handleClick}>add location</Link></h5>
  </div>
      {locations.length > 0 && center && (
        <div className="map">
          
          <LoadScript googleMapsApiKey={googleMapsApiKey}>
            <GoogleMap
              id="example-map"
              mapContainerStyle={{
                width: "100%",
                height: "500px"
              }}
              zoom={14}
              center={center}
            >
              {locations.map((location, index) => (
                <MarkerF
                  key={index}
                  position={{
                    lat: location.latitude,
                    lng: location.longitude
                  }}
                />
              ))}
            </GoogleMap>
          </LoadScript>
        </div>
      )}
    </>
  );
}

export default DispMap;
