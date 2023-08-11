//import axios from "axios";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Footer from "./Components/Footer";

function OnBoardPage() {
    const navigate = useNavigate();
    const [Student_Clicked, setStudent_Clicked] = useState(false);
    const [Owner_Clicked, setOwner_Clicked] = useState(false);

    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios
            .get("http://localhost:8081")
            .then((res) => {
                if (
                    res.data.Valid &&
                    (res.data.Role === "student" || res.data.Role === "owner")
                ) {
                    navigate("/home");
                } else if (Student_Clicked) {
                    navigate("/student/login");
                } else if (Owner_Clicked) {
                    navigate("/student/owner");
                } else {
                    navigate("/");
                }
            })
            .catch((err) => console.log(err));
        // eslint-disable-next-line
    }, []);
    return (
      <div className="d-flex flex-column min-vh-100">
      <div className="d-flex justify-content-center align-items-center mb-3 p-3">
                <div className="mb-3 p-3">
                    <a
                        href="http://localhost:3000/student/login"
                        target="_self"
                    >
                        <Button
                            type="submit"
                            variant="outline-dark"
                            size="lg"
                            onClick={() => setStudent_Clicked(true)}
                        >
                            Student
                        </Button>
                    </a>
                </div>
                <div className="mb-3 p-3">
                    <a href="http://localhost:3000/owner/login" target="_self">
                        <Button
                            type="submit"
                            variant="outline-dark"
                            size="lg"
                            onClick={() => setOwner_Clicked(true)}
                        >
                            Owner
                        </Button>
                    </a>
                </div>
                <div className="mb-3 p-3">
                    <a
                        href="http://localhost:3000/admin/login"
                        target="_self"
                    >
                        <Button
                            type="submit"
                            variant="outline-dark"
                            size="lg"
                            //onClick={() => setAdmin_Clicked(true)}
                        >
                            Admin
                        </Button>
                    </a>
                </div>
            </div>
            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    );
}

export default OnBoardPage;
