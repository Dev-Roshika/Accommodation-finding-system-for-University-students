import React, { useEffect, useState } from "react";
import "../css/home.css";
import Header from "../Components/Header";
import Navbar from "../Components/Navbar";
import SearchItem from "../Components/SearchItem";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [data, setData] = useState([]);
  const [role, setRole] = useState('');
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
  
  useEffect(() => {
    axios.get("http://localhost:8081/boarding-data")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((error) => {
        console.error("Error, fetching data from backend:", error);
      });
      // eslint-disable-next-line
  }, []);
  return (
    <div>
      <Navbar />
      <Header role = {role}/>
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listResult">
            {data.map((item) => (
                <SearchItem key={item.id} data={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
