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
                    console.log(res.data.Role);
                } else {
                    console.log("Check this");
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
        setSortedData(sortedArray); // Set the sorted data to the state
      };
    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <Header role={role} />
            <div className="listContainer">
                    <div className ="setfilter">
                    <Filter data={data} onSort={handleSort} />
                    </div>
                <div className="listWrapper">

                    
                    
                    <div className="listResult">
                        {
                            sortedData.length > 0 ? (
                            sortedData.map((item) => <SearchItem key={item.id} data={item} />)
                            ) : (
                        data.map((item) => <SearchItem key={item.id} data={item} />)
                            )
                        }
                    </div>
                    
                </div>
            </div>
            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    );
}

export default Home;
