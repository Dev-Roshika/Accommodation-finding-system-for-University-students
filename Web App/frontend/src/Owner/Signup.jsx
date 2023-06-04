import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "../Validation/SignupValidation";
import axios from "axios";
import RequiredField from "../Components/RequiredField";
import { useEffect } from "react";

function Signup() {
  const [values, setValues] = useState({
    fullname: "",
    username: "",
    mobile: "",
    email: "",
    nidno: "",
    paddress: "",
    password: "",
    cpassword: ""
  });
  const [email, setEmail] = useState("");
  const [emailExists, setEmailExists] = useState(false);
  const [errors, setErrors] = useState({});
  const [file, setFile] = useState();
  const [profilefile, setProfilefile] = useState();

  const navigate = useNavigate();
  const handleFile = (event) => {
    const nidphoto = event.target.files[0];
      setFile(nidphoto);
  };
  const handleProfileImageFile = (event) => {
    const profileimage = event.target.files[0];
    setProfilefile(profileimage);
  };
  const handleInput = (event) => {
    setErrors((prev) => ({
      ...prev,
      [event.target.name]: "",
    }));
    setValues((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
    if(event.target.name === 'email'){
      setEmail(event.target.value);
   }
  };
  useEffect(() => {
    if (email) {
      axios
        .get("http://localhost:8081/owner/check-email", {
          params: { email: email },
        })
        .then((res) => {
          setEmailExists(false);
          if (res.data.result === "EmailExists") {
            setEmailExists(true);
            console.log("Email exists");
          } else if (res.data.result === "EmailDoesNotExists") {
            console.log("Email does not exist");
          } else {
            console.log("Error occurred");
          }
        })
        .catch((err) => console.log(err));
    }
  }, [email]);
  useEffect(() => {
    axios.get('http://localhost:8081')
      .then((res) => {
        if (res.data.Valid && res.data.role === 'owner') {
          navigate('/home')
        } else{
          console.log("User is not logged in")
        }
      })
      .catch((err) => console.log(err))
      // eslint-disable-next-line
  }, [])
  useEffect(() => {
    if(emailExists) {
      setErrors((prev) => ({
        ...prev,
        email: "Email already exists",
      }));
    }
  }, [emailExists])
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors(Validation(values));
    if(emailExists) {
      setErrors((prev) => ({
        ...prev,
        email: "Email already exists",
      }));
    }
    const formData = new FormData();
    formData.append('fullname',values.fullname);
    formData.append('username',values.username);
    formData.append('mobile',values.mobile);
    formData.append('nidno',values.nidno);
    formData.append('nidphoto',file);
    formData.append('profileimage',profilefile);
    formData.append('email',values.email);
    formData.append('paddress',values.paddress);
    formData.append('password',values.password);
    formData.append('cpassword',values.cpassword);
    console.log(errors);
    if(emailExists) { 
      alert("Email already exists");
    }
    if (errors.cpassword === "" && emailExists === false) {
      console.log("No error");
      console.log("errors.email : "+ errors.email)
      console.log(formData);
      axios
        .post("http://localhost:8081/owner/signup", formData)
        .then((res) => {
          if (res.data.Status === "Success") {
            navigate("/owner/login");
          } else {
            alert("Error and not success");
          }
        })
        .catch((err) => console.log(err));
    }
  }
  return (
    <div className="bg-Light m-6">
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
              {errors.fullname && (
                <span className="text-danger">{errors.fullname}</span>
              )}
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
                  {errors.username && (
                    <span className="text-danger">{errors.username}</span>
                  )}
                </div>
              {/* Contact No */}
                <div className="col-sm">
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
                {errors.mobile && (
                    <span className="text-danger">{errors.mobile}</span>
                )}
                </div>
                </div>
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
              {errors.email && (
                <span className="text-danger">{errors.email}</span>
              )}
            </div>
            {/* Profile Image */}
            <div className="mb-3">
              <label htmlFor="profileimage">
                <strong>Profile Image<RequiredField /></strong>
              </label>
              <input
                name="profileimage"
                type="file"
                required
                className="form-control rounded-0"
                onChange={handleProfileImageFile}
              />
              {errors.profileimage && (
                <span className="text-danger">{errors.profileimage}</span>
              )}
            </div> 
            {/* NID */}
            <div className="mb-3">
              <label htmlFor="nidno">
                <strong>NID No<RequiredField /></strong>
              </label>
              <input
                name="nidno"
                type="text"
                required
                className="form-control rounded-0"
                onChange={handleInput}
              />
              {errors.nidno && (
                <span className="text-danger">{errors.nidno}</span>
              )}
            </div>
            {/* NID Photo */}
            <div className="mb-3">
              <label htmlFor="nidphoto">
                <strong>
                NID Photo
                  <RequiredField />
                </strong>
              </label>
              <input
                name="nidphoto"
                type="file"
                required
                className="form-control rounded-0"
                onChange={handleFile}
              />
              {errors.nidphoto && (
                <span className="text-danger">{errors.nidphoto}</span>
              )}
            </div>
            <div className="mb3">
                {/* Private address */}
                <div className="col-sm">
                  <label htmlFor="paddress">
                    <strong>
                    Private address 
                      <RequiredField />
                    </strong>
                  </label>
                  <input
                    name="paddress"
                    type="text"
                    required
                    className="form-control rounded-0"
                    onChange={handleInput}
                  />
                  {errors.paddress && (
                    <span className="text-danger">{errors.paddress}</span>
                  )}
                </div>
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
                    title="password should be between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character"
                    required
                    className="form-control rounded-0"
                    onChange={handleInput}
                  />
                  {errors.password && (
                    <span className="text-danger">{errors.password}</span>
                  )}
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
                  {errors.cpassword && (
                    <span className="text-danger">{errors.cpassword}</span>
                  )}
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
              to="/owner/login"
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
