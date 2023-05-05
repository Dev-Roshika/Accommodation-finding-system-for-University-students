//import axios from "axios";
import React from "react";
import { Button } from "react-bootstrap";
//import { useNavigate } from "react-router-dom";

function OnBoardPage() {
  //const navigate = useNavigate();
  // const handleStudentSubmit = (event) => {
  //   event.preventDefault();
  //   navigate("/student/home");
  // };

  // const handleOwnerSubmit = (event) => {
  //   event.preventDefault();
  //   axios
  //     .post("http://localhost:8081/owner/login")
  //     .then((res) => {
  //       if (res.data.Login) {
  //         navigate("/owner/home");
  //       } else {
  //         alert("No record");
  //       }
  //       console.log(res);
  //     })
  //     .catch((err) => console.log(err));
  // };
  return (
    <div className="d-flex justify-content-center align-items-center mb-3 p-3">
      <div className="mb-3 p-3">
      <a href="http://localhost:3000/student/login" target="_self">
        <Button
          type="submit"
          //onSubmit={handleStudentSubmit}
          variant="outline-dark"
          size="lg"
        >
          Student
        </Button>
        </a>
      </div>
      <div className="mb-3 p-3">
        <Button
          type="submit"
          // onSubmit={handleOwnerSubmit}
          variant="outline-dark"
          size="lg"
        >
          Owner
        </Button>
      </div>
    </div>
  );
}

export default OnBoardPage;
