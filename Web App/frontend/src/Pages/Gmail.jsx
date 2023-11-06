import React, { useEffect, useState } from "react";

import "../css/boardinghouses.css";

import { useNavigate } from "react-router-dom";
import axios from "axios";


function BoardingHouses() {
     
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    axios.defaults.withCredentials = true;

    const [to, setTo] = useState('');
 
  const [text, setText] = useState('');

    useEffect(() => {
        axios
            .get("http://localhost:8081")
            .then((res) => {
                if (
                    res.data.Valid &&
                    (res.data.Role === "student" || res.data.Role === "owner")
                ) {
                    console.log(res.data.Role + "is a valid user");
                    setUserData(res.data);
                } else {
                    navigate("/");
                }
            })
            .catch((err) => console.log(err));
        // eslint-disable-next-line
    }, []);
    

  const sendEmail = async () => {
    try {
      const response = await fetch('http://localhost:8081/send-email/68', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({  text }),
      });

      if (response.status === 200) {
        alert('Email sent successfully');
      } else {
        alert('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <div className="App">
      <h1>Email Sender</h1>
      
      
      <div>
        <label>Message:</label>
        <textarea value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      <button onClick={sendEmail}>Send Email</button>
    </div>
  );
}


export default BoardingHouses;
