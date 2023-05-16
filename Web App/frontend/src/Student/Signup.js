import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import Validation from "./SignupValidation";
import axios from "axios";
import RequiredField from "../Component/RequiredField";

function Signup() {
  const [values, setValues] = useState({
    fullname: "",
    username: "", 
    univregno: "", 
    mobile: "", 
    email: "",
    faculty: "",
    dept: "",
    paddress: "",
    password: "",
    role:"student"
  });
  const navigate = useNavigate();
  //const [errors, setErrors] = useState({});
  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
   // setErrors(Validation(values));
    axios
      .post("http://localhost:8081/student/signup", values)
      .then(res => {
        console.log(res);
        navigate("/student/login");
      })
      .catch(err => console.log(err));
  };
  return (
    <div className="bg-Light m-3">
      <div className="d-flex justify-content-center align-items-center vh-100 mb-3">
        <div className="bg-light bg-gradient w-50 p-5 rounded shadow-inner">
          <form action="" onSubmit={handleSubmit}>
            <div className="d-flex flex-column justify-content-center align-items-center mb-3">
              <div>
                <h1>Sign up</h1>
              </div>
              <div className="text-muted">Fill out form to get started</div>
            </div>
            {/* FullName */}
            <div className="mb-3">
              <label htmlFor="fullname">
                <strong>
                  Full Name
                  <RequiredField />
                </strong>
              </label>
              <input
                name="fullname"
                type="text"
                required
                className="form-control rounded-0"
                onChange={handleInput}
              />
            </div>
            <div className="mb-3">
              <div className="row">
                {/* User Name */}
                <div className="col-sm">
                  <label htmlFor="username">
                    <strong>
                      User Name
                      <RequiredField />
                    </strong>
                  </label>
                  <input
                    name="username"
                    type="text"
                    required
                    className="form-control rounded-0"
                    onChange={handleInput}
                  />
                </div>
                {/* University Registration Number */}
                <div className="col-sm">
                  <label htmlFor="univregno">
                    <strong>
                      University Registration Number
                      <RequiredField />
                    </strong>
                  </label>
                  <input
                    name="univregno"
                    type="text"
                    required
                    placeholder="20XX/XXX/XXX"
                    className="form-control rounded-0"
                    onChange={handleInput}
                  />
                </div>
              </div>
              
            </div>
            {/* Contact No */}
            <div className="mb-3">
              <label htmlFor="mobile">
                <strong>
                  Contact Number
                  <RequiredField />
                </strong>
              </label>
              <input
                name="mobile"
                type="text"
                required
                className="form-control rounded-0"
                onChange={handleInput}
              />
             
            </div>
            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
              <input
                name="email"
                type="email"
                className="form-control rounded-0"
                onChange={handleInput}
              />
             
            </div>
            <div className="mb-3">
              <div className="row">
                {/* Faculty */}
                <div className="col-sm">
                  <label htmlFor="faculty">
                    <strong>
                      Faculty
                      <RequiredField />
                    </strong>
                  </label>
                  <input
                    name="faculty"
                    type="text"
                    required
                    className="form-control rounded-0"
                    onChange={handleInput}
                  />
                </div>
                {/* Department */}
                <div className="col-sm">
                  <label htmlFor="dept">
                    <strong>
                      Department
                      <RequiredField />
                    </strong>
                  </label>
                  <input
                    name="dept"
                    type="text"
                    required
                    className="form-control rounded-0"
                    onChange={handleInput}
                  />
                </div>
              </div>
              
            </div>
            {/* Private address */}
            <div className="mb-3">
              <label htmlFor="paddress">
                <strong>Private Address</strong>
              </label>
              <input
                name="paddress"
                type="text"
                className="form-control rounded-0"
                onChange={handleInput}
              />
              
            </div>
            <div className="mb-3">
              <div className="row">
                {/* Password */}
                <div className="col-sm">
                  <label htmlFor="password">
                    <strong>
                      Password
                      <RequiredField />
                    </strong>
                  </label>
                  <input
                    name="password"
                    type="password"
                    required
                    className="form-control rounded-0"
                    onChange={handleInput}
                  />
                </div>
                {/* Confirm password */}
                <div className="col-sm">
                  <label htmlFor="cpassword">
                    <strong>
                      Confirm password
                      <RequiredField />
                    </strong>
                  </label>
                  <input
                    name="cpassword"
                    type="password"
                    required
                    className="form-control rounded-0"
                    onChange={handleInput}
                  />
                </div>
              </div>
              
            </div>

            <button type="submit" className="btn btn-success w-100 rounded-0">
              <strong>Signup</strong>
            </button>
            <div className="d-flex justify-content-center align-item-center mt-3">
              <p className="text-secondary">Allready have an account?</p>
            </div>
            <Link
              to="/student/login"
              className="btn btn-default border w-100 bg-light rounded-0"
            >
              Signin
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
