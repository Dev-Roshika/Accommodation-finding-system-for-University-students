import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "../Validation/changepassValidation";
import axios from "axios";
import RequiredField from "../Components/RequiredField";
import { FiEye, FiEyeOff } from "react-icons/fi";
function NewPasswordChange() 
 {
    const [values, setValues] = useState({
        password: "",
        cpassword: ""
    }); 
    
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);

    const navigate = useNavigate();

   
    const handleInput = (event) => {
        setErrors((prev) => ({
            ...prev,
            [event.target.name]: "",
        }));
        setValues((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
        
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Values : ");
        console.log(values);
        const validationErrors = Validation(values);
        setErrors(validationErrors);

        // Check if there are any validation errors
        if (
            validationErrors.cpassword !== "" ||
            validationErrors.password !== "" 
        ) {
            return; // Stop further execution of the handleSubmit function
        }

        const formData = new FormData();
       
        formData.append("password", values.password);
        formData.append("cpassword", values.cpassword);
        console.log(values.cpassword);
        console.log("errors"+errors);
        console.log("FormData");
        console.log(formData);
        
        axios.put("http://localhost:8081/passwordChange", values).then((res) => {
                    if (res.data.Status === "Success") {
                        alert("Success!");
                        navigate("/");
                    } else {
                        console.log("error");
                        alert("Error");
                    }
                })
                .catch((err) => console.log(err));
        
    };
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const toggleCPasswordVisibility = () => {
      setShowCPassword(!showCPassword);
  };
    return (
        <div
            className="d-flex justify-content-center align-items-center vh-100"
            style={{
                marginTop: "200px",
                marginBottom: "200px",
            }}
        >
            <div
                className="bg-secondary bg-gradient rounded shadow-sm bg-opacity-10"
                style={{ width: "50%" }}
            >
                <form action="" onSubmit={handleSubmit}>
                    <div
                        className="d-flex justify-content-center flex-column bg-secondary bg-gradient p-5 bg-opacity-50"
                        style={{
                            borderTopLeftRadius: "0.5rem",
                            borderTopRightRadius: "0.5rem",
                            borderBottom: "none",
                        }}
                    >
                        <h1
                            className="text-center text-white"
                            style={{ fontWeight: "bold" }}
                        >
                            Change Password
                        </h1>
                        <h5 className="text-center text-secondary">
                            Fill out your new password !
                        </h5>
                    </div>
                    <div className="p-5">
                   
                        
                         <div className="row">
                                {/* Password */}
                                <div className="col-sm position-relative">
                                    <label htmlFor="password">
                                        <strong style={{ color: "#0d987d" }}>
                                            Password
                                            <RequiredField />
                                        </strong>
                                    </label>
                                    <div className="input-group">
                                        <input
                                            name="password"
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            title="password should be between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character"
                                            required
                                            className="form-control rounded-0"
                                            onChange={handleInput}
                                        />
                                        <div className="input-group-append">
                                            <button
                                                type="button"
                                                className="btn btn-link btn-password-toggle"
                                                onClick={
                                                    togglePasswordVisibility
                                                }
                                                style={{
                                                    backgroundColor: "#0d987d",
                                                    borderTopRightRadius:
                                                        "0.2rem",
                                                    borderBottomRightRadius:
                                                        "0.2rem",
                                                        borderTopLeftRadius: "0",
                                                        borderBottomLeftRadius: "0",
                                                    border: "none",
                                                    paddingLeft: "10px",
                                                    paddingRight: "10px",
                                                }}
                                            >
                                                {showPassword ? (
                                                    <FiEyeOff color="#fff" />
                                                ) : (
                                                    <FiEye color="#fff" />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                    {errors.password && (
                                        <span className="text-danger">
                                            {errors.password}
                                        </span>
                                    )}
                                </div>
                                {/* Confirm password */}
                                <div className="col-sm possion-relative">
                                    <label htmlFor="cpassword">
                                        <strong style={{ color: "#0d987d" }}>
                                            Confirm password
                                            <RequiredField />
                                        </strong>
                                    </label>
                                    <div className="input-group">
                                        <input
                                            name="cpassword"
                                            type={
                                                showCPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            required
                                            className="form-control rounded-0"
                                            onChange={handleInput}
                                        />
                                        <div className="input-group-append">
                                            <button
                                                type="button"
                                                className="btn btn-link btn-password-toggle"
                                                onClick={
                                                    toggleCPasswordVisibility
                                                }
                                                style={{
                                                  backgroundColor: "#0d987d",
                                                  borderTopRightRadius:
                                                      "0.2rem",
                                                  borderBottomRightRadius:
                                                      "0.2rem",
                                                      borderTopLeftRadius: "0",
                                                      borderBottomLeftRadius: "0",
                                                  border: "none",
                                                  paddingLeft: "10px",
                                                  paddingRight: "10px",
                                              }}
                                            >
                                                {showCPassword ? (
                                                    <FiEyeOff color="#fff" />
                                                ) : (
                                                    <FiEye color="#fff" />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                    {errors.cpassword && (
                                        <span className="text-danger">
                                            {errors.cpassword}
                                        </span>
                                    )}
                                </div>
                            </div>

                        <button
                            type="submit"
                            className="btn btn-success w-100 rounded-0 mt-3"
                            style={{
                                backgroundColor: "#0d987d",
                                border: "none",
                            }}
                        >
                            <strong>Finish</strong>
                        </button>
                       
                        <Link
                            to="/profile"
                            className="btn btn-default border w-100 bg-light rounded-0 mb-3"
                            style={{ color: "#0d987d" }}
                        >
                            <strong>Cancel</strong>
                        </Link>
                    </div>
                </form>
                <div
                    className="d-flex justify-content-center bg-secondary bg-gradient p-2"
                    style={{
                        borderBottomLeftRadius: "0.5rem",
                        borderBottomRightRadius: "0.5rem",
                        borderTop: "none",
                    }}
                >
                   
                </div>
            </div>
        </div>
    );
}

export default NewPasswordChange;
