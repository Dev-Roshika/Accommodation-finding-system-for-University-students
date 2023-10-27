import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import axios from "axios";
import Popup from 'reactjs-popup';

function DispMap({ data }) {
  console.log("DispMap was called.");
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

  
  return (
    <><div>
    <Popup trigger={<button> add location</button>} position="right center">
         {console.log("Data of Boardingid : ",data) }
         <div>Only Owner can Add location</div>
        <div><Link to={`/AddMap?data=${data}`}>Add Location</Link></div>
    </Popup>
  </div>
      {locations.length > 0 && center && (
        <div>
          
          <LoadScript googleMapsApiKey={googleMapsApiKey}>
            <GoogleMap
              id="example-map"
              mapContainerStyle={{
                width: "100%",
                height: "400px"
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
