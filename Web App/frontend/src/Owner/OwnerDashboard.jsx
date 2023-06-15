import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Navbar from "../Components/Navbar";
import SearchItem from "../Components/SearchItem";
import "../css/home.css";

function OwnerDashboard() {
    const [data, setData] = useState();
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
            .get("http://localhost:8081/owner/boarding-data")
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
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <Header type="list" />
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "rgba(13,152,125,0.8)",
                    width: "1024px",
                    heiht: "auto",
                    marginTop: "20px",
                    marginLeft: "auto",
                    padding: "20px",
                    marginRight: "auto",
                }}
            >
                <div
                    className="d-flex flex-column align-items-center justify-content-center flex-grow-1"
                    style={{
                        fontSize: "2rem",
                        fontWeight: "bold",
                        color: "white",
                    }}
                >
                    Owner Dashboard
                </div>
            </div>
            <div className="listContainer">
                <div className="listWrapper">
                    <div className="listResult">
                        {data &&
                            data.map((item) => (
                                <SearchItem key={item.id} data={item} ownerDashboard="show" />
                            ))}
                    </div>
                </div>
            </div>
            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    );
}

export default OwnerDashboard;
