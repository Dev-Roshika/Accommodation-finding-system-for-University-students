import React, { useEffect, useState } from "react";
import "../css/home.css";
import Header from "../Components/Header";
import Navbar from "../Components/Navbar";
import Filter from "../Components/Filter";
import SearchItem from "../Components/SearchItem";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";

function Home() {
    const [data, setData] = useState([]);
    const [role, setRole] = useState("");
    const [sortedData, setSortedData] = useState([]);
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios
            .get("http://localhost:8081")
            .then((res) => {
                if (
                    res.data.Valid &&
                    (res.data.Role === "student" || res.data.Role === "owner")
                ) {
                    setRole(res.data.Role);
                } else {
                    navigate("/");
                }
            })
            .catch((err) => console.log(err));
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        axios
            .get("http://localhost:8081/boarding-data")
            .then((res) => {
                console.log(res.data);
                setData(res.data);
            })
            .catch((error) => {
                console.error("Error, fetching data from backend:", error);
            });
        // eslint-disable-next-line
    }, []);
    const handleSort = (sortedArray) => {
        
        setShow(true);
        setSortedData(null);
        setSortedData(sortedArray); // Set the sorted data to the state
    };
    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <Header role={role} />
            <div className="listContainer">
                <div className="sort_filter">
                    Sort by
                        <Filter data={data} onSort={handleSort} />
                </div>
            </div>
            <br></br>
            <div className="listWrapper">
                {show && <p className="try">try</p>}
                <div className="listResult">
                    {sortedData.length > 0
                        ? sortedData.map((item) => (
                              <SearchItem key={item.id} data={item} />
                          ))
                        : data.map((item) => (
                              <SearchItem key={item.id} data={item} />
                          ))}
                </div>
            </div>
            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    );
}

export default Home;
