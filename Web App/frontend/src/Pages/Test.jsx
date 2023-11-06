import React, { useEffect, useState } from "react";

import "../css/boardinghouses.css";

import { useNavigate } from "react-router-dom";
import axios from "axios";


function Test() {
     
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    axios.defaults.withCredentials = true;
 
  const [text, setText] = useState('');
  const [email,setGmail] = useState('');
  const [role,setRole] = useState('');

    useEffect(() => {
        axios
            .get("http://localhost:8081")
            .then((res) => {
                if (
                    res.data.Valid &&
                    (res.data.Role === "student" || res.data.Role === "owner")
                ) {
                    console.log(res.data);
                    console.log(res.data.Role + "is a valid user");
                    setUserData(res.data);
                    setGmail(res.data.Gmail);
                    setRole(res.data.Role); 
               } else {
                    navigate("/");
                }
            })
            .catch((err) => console.log(err));
        // eslint-disable-next-line
    }, []);
    

  const sendMessage = async () => {
    try {
      const response = await fetch('http://localhost:8081/contact_admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email,role,text }),
      });

      if (response.status === 200) {
        alert('message sent successfully');
      } else {
        alert('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="App">
      <h1>message Sender</h1>
      
      <div>
        <label>Message:</label>
        <textarea value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      <button onClick={sendMessage}>Send </button>
    </div>
  );
}


export default Test;
