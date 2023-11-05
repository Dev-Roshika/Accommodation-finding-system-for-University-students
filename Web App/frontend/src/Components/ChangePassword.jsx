import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Validation from "../Validation/SigninValidation";
import { FiEye, FiEyeOff } from "react-icons/fi";
import RequiredField from "../Components/RequiredField";

function Signin() {
    const [values, setValues] = useState({
      
        password: ""
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

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

    axios.defaults.withCredentials = true;
    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = Validation(values);
        setErrors(validationErrors);

        // Check if there are any validation errors
        if (validationErrors.password !== "" ) {
            return; // Stop further execution of the handleSubmit function
        }
        axios
            .post("http://localhost:8081/checkPassword", values)
            .then((res) => {
                if (res.data.Status === "Success") {
                
                    navigate("/NewPasswordChange");
                } else {
                    alert("Error : Check email and password again");
                }
                console.log(res);
            })
            .catch((err) => console.log(err));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (
        <div className="d-flex justify-content-center align-items-center ">
            <div
                className="bg-secondary bg-gradient rounded shadow-sm bg-opacity-10"
                style={{ width: "80%" }}
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
                        
                        <h5 className="text-center text-secondary">
                           Enter your Current Password to your
                            account
                        </h5>
                    </div>
                    <div className="p-5">
                        
                        <div className="mb-3">
                            <label htmlFor="password">
                                <strong style={{ color: "#0d987d" }}>
                                    {" "}
                                    Password
                                    <RequiredField />
                                </strong>
                            </label>
                            <div className="position-relative">
                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    className="form-control rounded-0 pr-4"
                                    placeholder="Current Password"
                                    onChange={handleInput}
                                />
                                <button
                                    type="button"
                                    className="btn btn-link btn-password-toggle rounded-0 position-absolute end-0 top-50 translate-middle-y"
                                    onClick={togglePasswordVisibility}
                                    style={{
                                        backgroundColor: "#0d987d",
                                        borderTopLeftRadius: "0.5rem",
                                        borderBottomLeftRadius: "0.5rem",
                                        border: "none",
                                    }}
                                >
                                    {showPassword ? (
                                        <FiEyeOff color="#fff" />
                                    ) : (
                                        <FiEye color="#fff" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <span className="text-danger">
                                    {errors.password}
                                </span>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="btn btn-success w-100 rounded-0 mb-3"
                            style={{
                                backgroundColor: "#0d987d",
                                border: "none",
                            }}
                        >
                            <strong>Next</strong>
                        </button>
                        
                        
                    </div>
                </form>
               
            </div>
        </div>
    );
}

export default Signin;
