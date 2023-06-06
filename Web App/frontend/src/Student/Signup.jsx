import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "../Validation/SignupValidation";
import axios from "axios";
import RequiredField from "../Components/RequiredField";

function Signup() {
  const [values, setValues] = useState({
    fullname: "",
    username: "",
    univregno: "",
    mobile: "",
    email: "",
    faculty: "",
    dept: "",
    password: "",
    cpassword: "",
    role: "student",
  });
  const [email, setEmail] = useState("");
  const [emailExists, setEmailExists] = useState(false);
  const [username, setUsername] = useState("");
  const [usernameExists, setUsernameExists] = useState(false);
  const [errors, setErrors] = useState({});
  const [profilefile, setProfilefile] = useState();
  const navigate = useNavigate();
  
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
      [event.target.name]: event.target.value,
    }));
    if(event.target.name === 'email'){
       setEmail(event.target.value);
    }
    if(event.target.name === 'username'){
      setUsername(event.target.value);
   }
  };
  useEffect(() => {
    if (email) {
      axios
        .get("http://localhost:8081/student/check-email", {
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
    if (username) {
      axios
        .get("http://localhost:8081/student/check-username", {
          params: { username: username },
        })
        .then((res) => {
          setUsernameExists(false);
          if (res.data.result === "UsernameExists") {
            setUsernameExists(true);
            console.log("Someone already has that username. Try another?");
          } else if (res.data.result === "UsernameDoesNotExists") {
            console.log("Username does not exist");
          } else {
            console.log("Error occurred");
          }
        })
        .catch((err) => console.log(err));
    }
  }, [username]);
  useEffect(() => {
    axios
        .get("http://localhost:8081")
        .then((res) => {
            if (res.data.Valid && res.data.role === "student") {
                navigate("/home");
            } else {
                console.log("User is not logged in");
            }
        })
        .catch((err) => console.log(err));
    // eslint-disable-next-line
}, []);
  useEffect(() => {
    if(emailExists) {
      setErrors((prev) => ({
        ...prev,
        email: "Email already exists",
      }));
    }
  }, [emailExists])
  useEffect(() => {
    if(usernameExists) {
      setErrors((prev) => ({
        ...prev,
        username : "Someone already has that username. Try another?",
      }));
    }
  }, [usernameExists])
  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = Validation(values);
        setErrors(validationErrors);

        // Check if there are any validation errors
        if (
            validationErrors.cpassword !== "" ||
            validationErrors.password !== "" ||
            validationErrors.username !== "" ||
            validationErrors.mobile !== "" ||
            validationErrors.email !== ""
        ) {
            return; // Stop further execution of the handleSubmit function
        }

    const formData = new FormData();
    formData.append('fullname',values.fullname);
    formData.append('username',values.username);
    formData.append('univregno',values.univregno);
    formData.append('mobile',values.mobile);
    formData.append('email',values.email);
    formData.append('profileimage',profilefile);
    formData.append('password',values.password);
    formData.append('cpassword',values.cpassword);
    console.log(errors);
    if(emailExists) { 
      alert("Email already exists");
    }
    if(usernameExists) {
      alert("Someone already has that username. Try another?");
    }
    if (emailExists === false && usernameExists === false) {
      console.log("No error");
      console.log(formData);
      axios
        .post("http://localhost:8081/student/signup", formData)
        .then((res) => {
          if (res.data.Status === "Success") {
            navigate("/student/login");
          } else {
            alert("Error");
          }
        })
        .catch((err) => console.log(err));
    }
  }
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
                  {errors.univregno && (
                    <span className="text-danger">{errors.univregno}</span>
                  )}
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
                placeholder="01XXXXXXXX"
                onChange={handleInput}
              />
              {errors.mobile && (
                <span className="text-danger">{errors.mobile}</span>
              )}
            </div>
            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
              <input
                name="email"
                type="email"
                required
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
                  {errors.faculty && (
                    <span className="text-danger">{errors.faculty}</span>
                  )}
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
                  {errors.dept && (
                    <span className="text-danger">{errors.dept}</span>
                  )}
                </div>
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
