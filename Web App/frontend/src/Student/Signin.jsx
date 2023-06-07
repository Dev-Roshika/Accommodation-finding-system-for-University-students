import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "../Validation/SigninValidation";
import { FiEye, FiEyeOff } from "react-icons/fi";

function Signin() {
    const [values, setValues] = useState({
        email: "",
        password: "",
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
        if (validationErrors.password !== "" || validationErrors.email !== "") {
            return; // Stop further execution of the handleSubmit function
        }
        axios
            .post("http://localhost:8081/student/login", values)
            .then((res) => {
                if (res.data.Status === "Success") {
                    navigate("/home");
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
        <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
            <div className="bg-white w-25 p-3 rounded">
                <form action="" onSubmit={handleSubmit}>
                    <h1>Sign in</h1>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input
                            type="email"
                            name="email"
                            className="form-control rounded-0"
                            onChange={handleInput}
                        />
                        {errors.email && (
                            <span className="text-danger">{errors.email}</span>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">
                            <strong>Password</strong>
                        </label>
                        <div className="position-relative">
                            <input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                className="form-control rounded-0 pr-4"
                                onChange={handleInput}
                            />
                            <button
                                type="button"
                                className="btn btn-link btn-password-toggle position-absolute end-0 top-50 translate-middle-y"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <FiEyeOff /> : <FiEye />}
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
                        className="btn btn-success w-100 rounded-0"
                    >
                        <strong>Login</strong>
                    </button>

                    <Link
                        to="/student/signup"
                        className="btn btn-default border w-100 bg-light rounded-0"
                    >
                        Register
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Signin;
